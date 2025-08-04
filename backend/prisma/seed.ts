import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create a test user
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      password: hashedPassword,
      name: '김철수',
      phone: '010-1234-5678',
      profileImage: 'https://via.placeholder.com/150',
    },
  });

  // Create sample quotations
  const quotations = await Promise.all([
    prisma.quotation.create({
      data: {
        title: '웹사이트 개발 견적',
        description: '회사 웹사이트를 새로 개발하고 싶습니다. 반응형 디자인이 필요합니다.',
        category: '웹개발',
        budget: 5000000,
        status: 'pending',
        providerName: '디자인스튜디오',
        providerContact: '010-9876-5432',
        userId: user.id,
      },
    }),
    prisma.quotation.create({
      data: {
        title: '로고 디자인 견적',
        description: '스타트업을 위한 로고 디자인이 필요합니다. 심플하고 모던한 스타일을 원합니다.',
        category: '디자인',
        budget: 1000000,
        status: 'accepted',
        providerName: '크리에이티브랩',
        providerContact: '010-5555-1234',
        userId: user.id,
      },
    }),
    prisma.quotation.create({
      data: {
        title: '모바일 앱 개발 견적',
        description: 'iOS와 Android 앱을 동시에 개발하고 싶습니다. 사용자 인증 기능이 필요합니다.',
        category: '앱개발',
        budget: 8000000,
        status: 'completed',
        providerName: '모바일솔루션',
        providerContact: '010-7777-8888',
        userId: user.id,
      },
    }),
  ]);

  // Create sample consultations
  const consultations = await Promise.all([
    prisma.consultation.create({
      data: {
        title: '웹사이트 기획 상담',
        description: '웹사이트 기획에 대한 상담을 받고 싶습니다. 어떤 기능들이 필요한지 논의하고 싶습니다.',
        category: '웹개발',
        status: 'active',
        scheduledAt: new Date('2024-01-15T10:00:00Z'),
        duration: 60,
        notes: '첫 번째 상담입니다. 기본적인 요구사항을 파악하는 시간입니다.',
        userId: user.id,
      },
    }),
    prisma.consultation.create({
      data: {
        title: '로고 디자인 컨셉 상담',
        description: '로고 디자인 컨셉에 대한 상담을 받고 싶습니다. 브랜드 아이덴티티를 논의하고 싶습니다.',
        category: '디자인',
        status: 'completed',
        scheduledAt: new Date('2024-01-10T14:00:00Z'),
        duration: 90,
        notes: '브랜드 컨셉과 로고 디자인 방향을 확정했습니다.',
        userId: user.id,
      },
    }),
    prisma.consultation.create({
      data: {
        title: '앱 개발 기술 상담',
        description: '모바일 앱 개발에 사용할 기술 스택에 대한 상담을 받고 싶습니다.',
        category: '앱개발',
        status: 'active',
        scheduledAt: new Date('2024-01-20T16:00:00Z'),
        duration: 120,
        notes: 'React Native vs Flutter 기술 비교 상담 예정입니다.',
        userId: user.id,
      },
    }),
  ]);

  console.log('Seed data created successfully!');
  console.log('User:', user.email);
  console.log('Quotations created:', quotations.length);
  console.log('Consultations created:', consultations.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 