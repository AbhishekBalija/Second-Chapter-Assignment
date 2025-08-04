import { useQuery } from '@tanstack/react-query'
import { consultationService } from '../services/consultationService'

const ConsultationsPage = () => {
  const { data: consultations = [], isLoading } = useQuery({
    queryKey: ['consultations'],
    queryFn: consultationService.getConsultations,
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
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900">상담내역</h1>
        <p className="text-gray-600 text-sm lg:text-base">서비스 상담 내역을 확인하세요.</p>
      </div>

      <div className="grid gap-4 lg:gap-6">
        {consultations.map((consultation) => (
          <div key={consultation.id} className="card">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">
                  {consultation.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm lg:text-base">{consultation.description}</p>
                
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs lg:text-sm text-gray-500 mb-4">
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

              <div className="mt-4 lg:mt-0 lg:ml-6">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  consultation.status === 'active' ? 'bg-green-100 text-green-800' :
                  consultation.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {consultation.status === 'active' ? '진행중' :
                   consultation.status === 'completed' ? '완료' : '취소됨'}
                </span>
              </div>
            </div>
          </div>
        ))}

        {consultations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">아직 상담 내역이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConsultationsPage 