import { Injectable, ConflictException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { hash } from 'argon2'

export const roundsOfHashing = 10;
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(dto: UserDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: dto.email },
          { phoneNumber: dto.phoneNumber },
        ],
      },
    });

    if (existingUser) {
      throw new ConflictException(
        'Пользователь с таким email или номером телефона уже существует',
      );
    }

    const hashedPassword = await hash(dto.password)
    dto.password = hashedPassword;

    return this.prisma.user.create({
      data: dto,
    });
  }

  getUsers() {
    return this.prisma.user.findMany({
      select: {
        name: true,
        email: true,
        id: true,
        password: false,
      },
    })
  }

  async getById(id: number) {
    return this.prisma.user.findUnique({ where: { id: id } });
  }

  async getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    })
  }

  async update(id: number, dto: UserDto) {
    if (dto.password) {
      dto.password = await hash(dto.password);
    }

    return this.prisma.user.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id: id } });
  }
}
