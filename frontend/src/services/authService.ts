import api from './api'
import { LoginCredentials, LoginResponse } from '../types'

export interface SignupCredentials {
  name: string
  email: string
  password: string
  phone?: string
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', credentials)
    return response.data
  },

  async signup(credentials: SignupCredentials): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/signup', credentials)
    return response.data
  },

  async getProfile() {
    const response = await api.get('/users/profile')
    return response.data
  },

  async updateProfile(data: Partial<LoginResponse['user']>) {
    const response = await api.put('/users/profile', data)
    return response.data
  },
} 