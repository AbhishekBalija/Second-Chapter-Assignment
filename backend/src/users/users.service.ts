import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        profileImage: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async create(userData: any) {
    return this.prisma.user.create({
      data: userData,
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        profileImage: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updateProfile(id: string, data: any) {
    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        profileImage: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
} 