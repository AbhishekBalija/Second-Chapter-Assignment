import { useQuery } from '@tanstack/react-query'
import { quotationService } from '../services/quotationService'

const QuotationsPage = () => {
  const { data: quotations = [], isLoading } = useQuery({
    queryKey: ['quotations'],
    queryFn: quotationService.getQuotations,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      <div>
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900">받은 견적</h1>
        <p className="text-gray-600 text-sm lg:text-base">서비스 제공업체로부터 받은 견적들을 확인하세요.</p>
      </div>

      <div className="grid gap-4 lg:gap-6">
        {quotations.map((quotation) => (
          <div key={quotation.id} className="card">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">
                  {quotation.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm lg:text-base">{quotation.description}</p>
                
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs lg:text-sm text-gray-500 mb-4">
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

              <div className="mt-4 lg:mt-0 lg:ml-6">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  quotation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  quotation.status === 'accepted' ? 'bg-green-100 text-green-800' :
                  quotation.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {quotation.status === 'pending' ? '대기중' :
                   quotation.status === 'accepted' ? '승인됨' :
                   quotation.status === 'completed' ? '완료' : '거절됨'}
                </span>
              </div>
            </div>
          </div>
        ))}

        {quotations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">아직 받은 견적이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuotationsPage 