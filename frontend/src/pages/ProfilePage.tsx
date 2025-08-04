import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '../services/authService'
import { useAuthStore } from '../stores/authStore'
import Input from '../components/atoms/Input'
import Button from '../components/atoms/Button'

const ProfilePage = () => {
  const { user, updateUser } = useAuthStore()
  const queryClient = useQueryClient()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: authService.getProfile,
    initialData: user,
  })

  const updateProfileMutation = useMutation({
    mutationFn: authService.updateProfile,
    onSuccess: (data) => {
      updateUser(data)
      queryClient.setQueryData(['profile'], data)
      setIsEditing(false)
      setErrors({})
    },
    onError: (error: any) => {
      setErrors({ general: error.response?.data?.message || '프로필 업데이트에 실패했습니다.' })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Validation
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = '이름을 입력해주세요.'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    updateProfileMutation.mutate(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleCancel = () => {
    setFormData({
      name: profile?.name || '',
      phone: profile?.phone || '',
    })
    setIsEditing(false)
    setErrors({})
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900">마이페이지</h1>
          <p className="text-gray-600 text-sm lg:text-base">개인정보를 관리하세요.</p>
        </div>
        {!isEditing && (
          <Button 
            onClick={() => setIsEditing(true)}
            className="mt-4 sm:mt-0"
          >
            프로필 수정
          </Button>
        )}
      </div>

      <div className="card max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white text-lg lg:text-2xl font-bold">
                {profile?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div>
              <h3 className="text-base lg:text-lg font-semibold text-gray-900">
                {profile?.name || '사용자'}
              </h3>
              <p className="text-gray-600 text-sm lg:text-base">{profile?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            <Input
              label="이름"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              disabled={!isEditing}
            />
            <Input
              label="전화번호"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              disabled={!isEditing}
              placeholder="010-1234-5678"
            />
          </div>

          <div className="space-y-3 lg:space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">이메일</label>
              <p className="mt-1 text-sm text-gray-900">{profile?.email}</p>
              <p className="text-xs text-gray-500">이메일은 변경할 수 없습니다.</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">가입일</label>
              <p className="mt-1 text-sm text-gray-900">
                {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : '-'}
              </p>
            </div>
          </div>

          {errors.general && (
            <div className="text-red-600 text-sm">
              {errors.general}
            </div>
          )}

          {isEditing && (
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <Button
                type="submit"
                disabled={updateProfileMutation.isPending}
                className="w-full sm:w-auto"
              >
                {updateProfileMutation.isPending ? '저장 중...' : '저장'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={updateProfileMutation.isPending}
                className="w-full sm:w-auto"
              >
                취소
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default ProfilePage 