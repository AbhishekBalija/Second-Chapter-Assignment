import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { authService } from '../services/authService'
import { useAuthStore } from '../stores/authStore'
import Input from '../components/atoms/Input'
import Button from '../components/atoms/Button'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      login(data.user, data.access_token)
      navigate('/')
    },
    onError: (error: any) => {
      setErrors({ general: error.response?.data?.message || '로그인에 실패했습니다.' })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Validation
    const newErrors: Record<string, string> = {}
    if (!formData.email) newErrors.email = '이메일을 입력해주세요.'
    if (!formData.password) newErrors.password = '비밀번호를 입력해주세요.'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    loginMutation.mutate(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div>
          <h2 className="mt-6 text-center text-2xl lg:text-3xl font-extrabold text-gray-900">
            모두의 권리
          </h2>
          <p className="mt-2 text-center text-sm lg:text-base text-gray-600">
            서비스 매칭 플랫폼에 로그인하세요
          </p>
        </div>
        <form className="mt-8 space-y-4 lg:space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-3 lg:space-y-4">
            <Input
              label="이메일"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="test@example.com"
              required
            />
            <Input
              label="비밀번호"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="password123"
              required
            />
          </div>

          {errors.general && (
            <div className="text-red-600 text-sm text-center">
              {errors.general}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? '로그인 중...' : '로그인'}
          </Button>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              테스트 계정: test@example.com / password123
            </p>
            <p className="text-sm text-gray-600">
              계정이 없으신가요?{' '}
              <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-medium">
                회원가입
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage 