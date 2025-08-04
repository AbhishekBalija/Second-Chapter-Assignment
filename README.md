# 모두의 권리 (Everyone's Rights) - Service Matching Platform

A full-stack service matching platform similar to Korea's 숨고 (Soomgo), built with modern web technologies. This platform connects service providers with customers, allowing users to manage quotations and consultations efficiently.

## 🚀 Live Demo

- **Frontend**: [Deployed on Vercel](https://modu-ui-gwonri.vercel.app)
- **Backend**: [Deployed on Render](https://modu-api-gwonri.onrender.com)
- **API Documentation**: [Swagger UI](https://modu-api-gwonri.onrender.com/api)

## 📋 Features

### 🔐 Authentication & User Management
- **Secure JWT-based authentication**
- **User registration and login**
- **Profile management with photo upload**
- **Password validation and security**

### 📱 Responsive Design
- **Mobile-first responsive design**
- **Collapsible sidebar navigation**
- **Touch-friendly interface**
- **Cross-platform compatibility (mobile, tablet, desktop)**

### 🏠 Dashboard & Analytics
- **User dashboard with service overview**
- **Real-time statistics (quotations, consultations)**
- **Recent activity tracking**
- **Quick access to important features**

### 💰 Quotation Management
- **View received quotations**
- **Track quotation status (pending, accepted, completed, rejected)**
- **Provider information and contact details**
- **Budget and category management**

### 📞 Consultation System
- **Consultation history tracking**
- **Scheduled consultation management**
- **Status tracking (active, completed, cancelled)**
- **Consultation notes and details**

### 👤 User Profile
- **Personal information management**
- **Profile photo upload**
- **Contact information updates**
- **Account settings**

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **Zustand** - Lightweight state management
- **TanStack Query** - Server state management with caching
- **React Router v6** - Client-side routing
- **Tailwind CSS v4** - Utility-first CSS framework
- **Axios** - HTTP client for API communication
- **Lucide React** - Beautiful icon library

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type safety and better development experience
- **PostgreSQL** - Relational database
- **Prisma** - Type-safe database client and ORM
- **JWT** - Token-based authentication
- **bcrypt** - Password hashing and security
- **class-validator** - Input validation and sanitization
- **Swagger** - API documentation

## 🏗 Architecture

### Frontend Architecture (Atomic Design Pattern)

```
frontend/src/
├── components/
│   ├── atoms/          # Basic building blocks
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Badge.tsx
│   ├── molecules/      # Simple combinations
│   │   ├── QuotationCard.tsx
│   │   └── ConsultationCard.tsx
│   ├── organisms/      # Complex UI sections
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   └── templates/      # Page layouts
│       └── Layout.tsx
├── pages/              # Route components
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   ├── HomePage.tsx
│   ├── QuotationsPage.tsx
│   ├── ConsultationsPage.tsx
│   └── ProfilePage.tsx
├── stores/             # Zustand stores
│   └── authStore.ts
├── services/           # API services
│   ├── api.ts
│   ├── authService.ts
│   ├── quotationService.ts
│   └── consultationService.ts
├── types/              # TypeScript definitions
│   └── index.ts
└── utils/              # Utility functions
    └── cn.ts
```

### Backend Architecture (Domain-Driven Design)

```
backend/src/
├── auth/               # Authentication module
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── auth.controller.ts
│   ├── dto/
│   │   ├── login.dto.ts
│   │   └── signup.dto.ts
│   ├── guards/
│   │   └── jwt-auth.guard.ts
│   └── strategies/
│       ├── jwt.strategy.ts
│       └── local.strategy.ts
├── users/              # User management
│   ├── users.module.ts
│   ├── users.service.ts
│   ├── users.controller.ts
│   └── dto/
│       └── update-profile.dto.ts
├── quotations/         # Quotation management
│   ├── quotations.module.ts
│   ├── quotations.service.ts
│   └── quotations.controller.ts
├── consultations/      # Consultation history
│   ├── consultations.module.ts
│   ├── consultations.service.ts
│   └── consultations.controller.ts
├── prisma/             # Database configuration
│   ├── prisma.module.ts
│   └── prisma.service.ts
└── main.ts             # Application entry point
```

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+**
- **PostgreSQL 14+**
- **npm or yarn**

### 1. Clone the Repository
```bash
git clone <repository-url>
cd assignment
```

### 2. Install Dependencies
```bash
# Install all dependencies (frontend + backend)
./install.sh

# Or install separately:
cd frontend && npm install
cd ../backend && npm install
```

### 3. Environment Setup

#### Backend Environment
```bash
cd backend
cp env.example .env
```

Edit `.env` file:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/modugwonri"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
PORT=3001
FRONTEND_URL="http://localhost:5173"
```

#### Frontend Environment
```bash
cd frontend
cp env.example .env
```

Edit `.env` file:
```env
VITE_API_URL="http://localhost:3001"
VITE_APP_NAME="모두의 권리"
```

### 4. Database Setup
```bash
cd backend
npm run db:generate    # Generate Prisma client
npm run db:migrate     # Run database migrations
npm run db:seed        # Seed initial data
```

### 5. Start Development Servers
```bash

# Terminal 1 - Backend
cd backend && npm run start:dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

### 6. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api

## 📱 Pages & Features

### 1. **Authentication Pages**
- **Login Page** (`/login`) - Email/password authentication
- **Signup Page** (`/signup`) - User registration with validation

### 2. **Main Application**
- **Home** (`/`) - Dashboard with statistics and recent activity
- **받은 견적** (`/quotations`) - View and manage received quotations
- **상담내역** (`/consultations`) - Track consultation history
- **마이페이지** (`/profile`) - User profile management

### 3. **Test Account**
```
Email: test@example.com
Password: password123
```

## 🔐 Authentication Flow

1. **Registration**: User creates account with email/password
2. **Login**: User authenticates with credentials
3. **Token Generation**: Backend generates JWT token
4. **Token Storage**: Frontend stores token in localStorage
5. **Protected Routes**: Routes check token validity
6. **Auto Logout**: Automatic logout on token expiration

## 🎨 Design System

### Atomic Design Pattern
- **Atoms**: Basic components (Button, Input, Badge)
- **Molecules**: Simple combinations (QuotationCard, ConsultationCard)
- **Organisms**: Complex sections (Header, Sidebar)
- **Templates**: Page layouts (Layout)

### Responsive Design
- **Mobile-first approach**
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible layouts** that adapt to screen size
- **Touch-friendly** interface elements

### Color Scheme
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)
- **Neutral**: Gray scale

## 🧪 Testing Strategy

### Frontend Testing
- **Unit Tests**: Component testing with React Testing Library
- **Integration Tests**: API integration testing
- **E2E Tests**: Critical user flows with Playwright

### Backend Testing
- **Unit Tests**: Service and controller testing
- **Integration Tests**: Database and API endpoint testing
- **E2E Tests**: Complete API workflow testing

## 🚀 Deployment

### Frontend Deployment (Vercel)
```bash
# Build the application
cd frontend
npm run build

# Deploy to Vercel
vercel --prod
```

### Backend Deployment (Render)
1. Connect GitHub repository to Render
2. Configure environment variables
3. Set build command: `npm install && npm run build`
4. Set start command: `npm run start:prod`

### Environment Variables for Production
```env
# Backend
DATABASE_URL="postgresql://..."
JWT_SECRET="production-secret-key"
FRONTEND_URL="https://your-frontend-domain.com"

# Frontend
VITE_API_URL="https://your-backend-domain.com"
```

## 🔮 Future Improvements

### Planned Features
- [ ] **Real-time notifications** using WebSockets
- [ ] **File upload functionality** for documents and images
- [ ] **Advanced search and filtering** for quotations
- [ ] **Payment integration** for service payments
- [ ] **Admin dashboard** for platform management
- [ ] **Multi-language support** (Korean/English)
- [ ] **Progressive Web App (PWA)** features
- [ ] **Performance monitoring** and analytics
- [ ] **Comprehensive test coverage** (90%+)

### Technical Improvements
- [ ] **Caching strategy** with Redis
- [ ] **Rate limiting** for API endpoints
- [ ] **API versioning** for backward compatibility
- [ ] **Microservices architecture** for scalability
- [ ] **Docker containerization** for easy deployment
- [ ] **CI/CD pipeline** with automated testing

## 📝 Development Challenges & Solutions

### 1. **Database Schema Design**
- **Challenge**: Designing flexible schema for quotations and consultations
- **Solution**: Used Prisma with proper relationships and constraints

### 2. **Authentication Security**
- **Challenge**: Implementing secure JWT token handling
- **Solution**: Proper token validation, refresh tokens, and secure storage

### 3. **Responsive Design**
- **Challenge**: Ensuring consistent experience across devices
- **Solution**: Mobile-first approach with Tailwind CSS breakpoints

### 4. **State Management**
- **Challenge**: Balancing local and server state effectively
- **Solution**: Zustand for UI state, TanStack Query for server state

### 5. **API Integration**
- **Challenge**: Creating robust error handling system
- **Solution**: Centralized error handling with proper HTTP status codes

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow **TypeScript** best practices
- Use **ESLint** and **Prettier** for code formatting
- Write **comprehensive tests** for new features
- Update **documentation** for API changes
- Follow **conventional commits** for commit messages

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **숨고 (Soomgo)** for inspiration
- **Tailwind CSS** team for the amazing framework
- **NestJS** team for the robust backend framework
- **Vercel** and **Render** for hosting services

---

**Built with ❤️ for the Korean service marketplace community** 