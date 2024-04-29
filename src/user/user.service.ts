import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    // Проверка существует ли пользователь с таким email или phoneNumber
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: createUserDto.email },
          { phoneNumber: createUserDto.phoneNumber },
        ],
      },
    });

    if (existingUser) {
      throw new ConflictException(
        'Пользователь с таким email или номером телефона уже существует',
      );
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );
    createUserDto.password = hashedPassword;

    // Создаем пользователя
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id: id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id: +id } });
  }
}
