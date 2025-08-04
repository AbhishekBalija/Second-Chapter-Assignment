import api from './api'
import { Consultation } from '../types'

export const consultationService = {
  async getConsultations(): Promise<Consultation[]> {
    const response = await api.get<Consultation[]>('/consultations')
    return response.data
  },

  async getConsultation(id: string): Promise<Consultation> {
    const response = await api.get<Consultation>(`/consultations/${id}`)
    return response.data
  },
} 