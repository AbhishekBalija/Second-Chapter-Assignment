import { Quotation } from '../../types'
import Badge from '../atoms/Badge'

interface QuotationCardProps {
  quotation: Quotation
}

const QuotationCard = ({ quotation }: QuotationCardProps) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning'
      case 'accepted':
        return 'success'
      case 'completed':
        return 'default'
      case 'rejected':
        return 'error'
      default:
        return 'default'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return '대기중'
      case 'accepted':
        return '승인됨'
      case 'completed':
        return '완료'
      case 'rejected':
        return '거절됨'
      default:
        return status
    }
  }

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {quotation.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {quotation.description}
          </p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <span>카테고리: {quotation.category}</span>
            {quotation.budget && (
              <span>예산: {quotation.budget.toLocaleString()}원</span>
            )}
            <span>등록일: {new Date(quotation.createdAt).toLocaleDateString()}</span>
          </div>

          {quotation.providerName && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">
                제공업체: {quotation.providerName}
              </p>
              {quotation.providerContact && (
                <p className="text-sm text-gray-600">
                  연락처: {quotation.providerContact}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="ml-6">
          <Badge variant={getStatusVariant(quotation.status)}>
            {getStatusText(quotation.status)}
          </Badge>
        </div>
      </div>
    </div>
  )
}

export default QuotationCard 