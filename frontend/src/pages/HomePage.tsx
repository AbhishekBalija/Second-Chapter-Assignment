import { useQuery } from '@tanstack/react-query'
import { quotationService } from '../services/quotationService'
import { consultationService } from '../services/consultationService'
import { useAuthStore } from '../stores/authStore'
import { FileText, MessageSquare, Clock, CheckCircle } from 'lucide-react'

const HomePage = () => {
  const { user } = useAuthStore()

  const { data: quotations = [] } = useQuery({
    queryKey: ['quotations'],
    queryFn: quotationService.getQuotations,
  })

  const { data: consultations = [] } = useQuery({
    queryKey: ['consultations'],
    queryFn: consultationService.getConsultations,
  })

  const pendingQuotations = quotations.filter(q => q.status === 'pending')
  const activeConsultations = consultations.filter(c => c.status === 'active')

  return (
    <div className="space-y-4 lg:space-y-6">
      <div>
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
          안녕하세요, {user?.name}님!
        </h1>
        <p className="text-gray-600 text-sm lg:text-base">
          오늘도 좋은 하루 되세요.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        <div className="card p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600" />
            </div>
            <div className="ml-3 lg:ml-4">
              <p className="text-xs lg:text-sm font-medium text-gray-600">전체 견적</p>
              <p className="text-lg lg:text-2xl font-bold text-gray-900">{quotations.length}</p>
            </div>
          </div>
        </div>

        <div className="card p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-5 w-5 lg:h-6 lg:w-6 text-yellow-600" />
            </div>
            <div className="ml-3 lg:ml-4">
              <p className="text-xs lg:text-sm font-medium text-gray-600">대기 중인 견적</p>
              <p className="text-lg lg:text-2xl font-bold text-gray-900">{pendingQuotations.length}</p>
            </div>
          </div>
        </div>

        <div className="card p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <MessageSquare className="h-5 w-5 lg:h-6 lg:w-6 text-green-600" />
            </div>
            <div className="ml-3 lg:ml-4">
              <p className="text-xs lg:text-sm font-medium text-gray-600">활성 상담</p>
              <p className="text-lg lg:text-2xl font-bold text-gray-900">{activeConsultations.length}</p>
            </div>
          </div>
        </div>

        <div className="card p-4 lg:p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CheckCircle className="h-5 w-5 lg:h-6 lg:w-6 text-purple-600" />
            </div>
            <div className="ml-3 lg:ml-4">
              <p className="text-xs lg:text-sm font-medium text-gray-600">완료된 상담</p>
              <p className="text-lg lg:text-2xl font-bold text-gray-900">
                {consultations.filter(c => c.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <div className="card">
          <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">
            최근 견적
          </h3>
          <div className="space-y-2 lg:space-y-3">
            {quotations.slice(0, 3).map((quotation) => (
              <div key={quotation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm lg:text-base truncate">{quotation.title}</p>
                  <p className="text-xs lg:text-sm text-gray-600">{quotation.category}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ml-2 flex-shrink-0 ${
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
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">
            최근 상담
          </h3>
          <div className="space-y-2 lg:space-y-3">
            {consultations.slice(0, 3).map((consultation) => (
              <div key={consultation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm lg:text-base truncate">{consultation.title}</p>
                  <p className="text-xs lg:text-sm text-gray-600">{consultation.category}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ml-2 flex-shrink-0 ${
                  consultation.status === 'active' ? 'bg-green-100 text-green-800' :
                  consultation.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {consultation.status === 'active' ? '진행중' :
                   consultation.status === 'completed' ? '완료' : '취소됨'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage 