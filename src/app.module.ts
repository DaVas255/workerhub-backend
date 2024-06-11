import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ReviewModule } from './review/review.module';
import { ConfigModule } from '@nestjs/config'
import { CityModule } from './city/city.module';

@Module({
  imports: [ConfigModule.forRoot(), TaskModule, AuthModule, UserModule, ReviewModule, CityModule],
})
export class AppModule { }
