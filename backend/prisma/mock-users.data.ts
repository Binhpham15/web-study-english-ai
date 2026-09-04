import { UserRole, CefrLevel } from '@prisma/client';

export interface MockUserConfig {
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
  level: CefrLevel;
  newWordsPerDay: number;
  maxReviewsPerDay: number;
}

export const MOCK_USERS: MockUserConfig[] = [
  {
    email: 'admin@wsea.com',
    password: 'Admin@123',
    fullName: 'Quản trị viên Hệ thống',
    role: UserRole.ADMIN,
    level: CefrLevel.B2,
    newWordsPerDay: 20,
    maxReviewsPerDay: 50,
  },
  {
    email: 'learner.new@wsea.com',
    password: 'User@123',
    fullName: 'Nguyễn Văn Khởi Đầu',
    role: UserRole.USER,
    level: CefrLevel.A1,
    newWordsPerDay: 15,
    maxReviewsPerDay: 40,
  },
  {
    email: 'learner.active@wsea.com',
    password: 'User@123',
    fullName: 'Trần Học Chăm Chỉ',
    role: UserRole.USER,
    level: CefrLevel.B1,
    newWordsPerDay: 25,
    maxReviewsPerDay: 100,
  },
  {
    email: 'learner.pro@wsea.com',
    password: 'User@123',
    fullName: 'Lê Thành Thạo',
    role: UserRole.USER,
    level: CefrLevel.B2,
    newWordsPerDay: 30,
    maxReviewsPerDay: 120,
  },
];
