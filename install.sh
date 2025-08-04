#!/bin/bash

echo "🚀 모두의 권리 플랫폼 설치를 시작합니다..."

# Backend 설치
echo "📦 Backend 의존성 설치 중..."
cd backend
npm install

# Frontend 설치
echo "📦 Frontend 의존성 설치 중..."
cd ../frontend
npm install

echo "✅ 설치가 완료되었습니다!"
echo ""
echo "다음 단계:"
echo "1. backend/env.example을 backend/.env로 복사하고 데이터베이스 설정을 완료하세요"
echo "2. PostgreSQL 데이터베이스를 설정하고 마이그레이션을 실행하세요"
echo "3. 'npm run dev' 명령어로 개발 서버를 시작하세요"
echo ""
echo "Backend: cd backend && npm run start:dev"
echo "Frontend: cd frontend && npm run dev" 