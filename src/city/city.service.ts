import { Injectable } from '@nestjs/common';
import { CityDto } from './dto/city.dto';
import { PrismaService } from 'prisma/prisma.service';


@Injectable()
export class CityService {
  constructor(private prisma: PrismaService) { }

  findAll() {
    return this.prisma.city.findMany();
  }
}
