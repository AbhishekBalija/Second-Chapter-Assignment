import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { authService } from '../services/authService'
import { useAuthStore } from '../stores/authStore'
import Input from '../components/atoms/Input'
import Button from '../components/atoms/Button'

const SignupPage = () => {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const signupMutation = useMutation({
    mutationFn: authService.signup,
    onSuccess: (data) => {
      login(data.user, data.access_token)
      navigate('/')
    },
    onError: (error: any) => {
      setErrors({ general: error.response?.data?.message || '회원가입에 실패했습니다.' })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Validation
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = '이름을 입력해주세요.'
    if (!formData.email) newErrors.email = '이메일을 입력해주세요.'
    if (!formData.password) newErrors.password = '비밀번호를 입력해주세요.'
    if (formData.password.length < 6) newErrors.password = '비밀번호는 6자 이상이어야 합니다.'
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    signupMutation.mutate({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
    })
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
            새로운 계정을 만들어보세요
          </p>
        </div>
        <form className="mt-8 space-y-4 lg:space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-3 lg:space-y-4">
            <Input
              label="이름"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="홍길동"
              required
            />
            <Input
              label="이메일"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="user@example.com"
              required
            />
            <Input
              label="전화번호"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              placeholder="010-1234-5678"
            />
            <Input
              label="비밀번호"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="6자 이상 입력해주세요"
              required
            />
            <Input
              label="비밀번호 확인"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="비밀번호를 다시 입력해주세요"
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
            disabled={signupMutation.isPending}
          >
            {signupMutation.isPending ? '회원가입 중...' : '회원가입'}
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              이미 계정이 있으신가요?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                로그인
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignupPage 