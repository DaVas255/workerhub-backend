import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [TaskModule, AuthModule, UserModule, ReviewModule],
})
export class AppModule {}
