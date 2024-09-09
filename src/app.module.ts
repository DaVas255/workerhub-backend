import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha'
import { getGoogleRecaptchaConfig } from './config/google-recaptcha.config'
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ReviewModule } from './review/review.module';
import { CityModule } from './city/city.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }
  ), GoogleRecaptchaModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: getGoogleRecaptchaConfig,
    inject: [ConfigService]
  }), TaskModule, AuthModule, UserModule, ReviewModule, CityModule],
})
export class AppModule { }
