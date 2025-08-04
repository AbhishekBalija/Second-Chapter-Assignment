export interface User {
  id: string
  email: string
  name: string
  phone?: string
  profileImage?: string
  createdAt: string
  updatedAt: string
}

export interface Quotation {
  id: string
  title: string
  description: string
  category: string
  budget?: number
  status: 'pending' | 'accepted' | 'rejected' | 'completed'
  providerName?: string
  providerContact?: string
  createdAt: string
  updatedAt: string
  userId: string
}

export interface Consultation {
  id: string
  title: string
  description: string
  category: string
  status: 'active' | 'completed' | 'cancelled'
  scheduledAt?: string
  duration?: number
  notes?: string
  createdAt: string
  updatedAt: string
  userId: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
  user: User
}

export interface ApiError {
  message: string
  statusCode: number
} 