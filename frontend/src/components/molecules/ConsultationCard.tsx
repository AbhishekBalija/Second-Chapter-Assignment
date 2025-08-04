import { Consultation } from '../../types'
import Badge from '../atoms/Badge'

interface ConsultationCardProps {
  consultation: Consultation
}

const ConsultationCard = ({ consultation }: ConsultationCardProps) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'completed':
        return 'default'
      case 'cancelled':
        return 'error'
      default:
        return 'default'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return '진행중'
      case 'completed':
        return '완료'
      case 'cancelled':
        return '취소됨'
      default:
        return status
    }
  }

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {consultation.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {consultation.description}
          </p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <span>카테고리: {consultation.category}</span>
            {consultation.scheduledAt && (
              <span>상담일: {new Date(consultation.scheduledAt).toLocaleDateString()}</span>
            )}
            {consultation.duration && (
              <span>소요시간: {consultation.duration}분</span>
            )}
            <span>등록일: {new Date(consultation.createdAt).toLocaleDateString()}</span>
          </div>

          {consultation.notes && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900 mb-1">상담 노트</p>
              <p className="text-sm text-gray-600">{consultation.notes}</p>
            </div>
          )}
        </div>

        <div className="ml-6">
          <Badge variant={getStatusVariant(consultation.status)}>
            {getStatusText(consultation.status)}
          </Badge>
        </div>
      </div>
    </div>
  )
}

export default ConsultationCard 