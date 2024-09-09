import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { PrismaService } from 'prisma/prisma.service';

//TODO: Fix Unique constraint failed on the (not available)
@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) { }

  // create(createReviewDto: CreateReviewDto) {
  //   return this.prisma.review.create({ data: createReviewDto });
  // }

  // async findAllByUserId(userId: number) {
  //   return this.prisma.review.findMany({ where: { userId: userId } });
  // }

  // findOne(id: number) {
  //   return this.prisma.review.findUnique({ where: { id: id } });
  // }
}
