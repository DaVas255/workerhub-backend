import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TaskModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
