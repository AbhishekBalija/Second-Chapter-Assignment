import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './stores/authStore'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'
import QuotationsPage from './pages/QuotationsPage'
import ConsultationsPage from './pages/ConsultationsPage'
import ProfilePage from './pages/ProfilePage'
import Layout from './components/templates/Layout'

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <Routes>
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
      } />
      <Route path="/signup" element={
        isAuthenticated ? <Navigate to="/" replace /> : <SignupPage />
      } />
      <Route path="/" element={
        isAuthenticated ? <Layout /> : <Navigate to="/login" replace />
      }>
        <Route index element={<HomePage />} />
        <Route path="quotations" element={<QuotationsPage />} />
        <Route path="consultations" element={<ConsultationsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  )
}

export default App 