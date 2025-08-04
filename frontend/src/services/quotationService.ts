import api from './api'
import { Quotation } from '../types'

export const quotationService = {
  async getQuotations(): Promise<Quotation[]> {
    const response = await api.get<Quotation[]>('/quotations')
    return response.data
  },

  async getQuotation(id: string): Promise<Quotation> {
    const response = await api.get<Quotation>(`/quotations/${id}`)
    return response.data
  },
} 