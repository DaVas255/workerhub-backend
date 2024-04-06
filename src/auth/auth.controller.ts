import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { LoginDto } from './dto/login.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }
}