import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { Role } from '@prisma/client'
import { CurrentUser } from '@/auth/decorators/user.decorator'
import { Auth } from '@/auth/decorators/auth.decorator'
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(+id);
  }

  @Auth()
  @Get('profile')
  async getProfile(@CurrentUser('id') id: string) {
    return this.userService.getById(+id)
  }

  @Auth(Role.PREMIUM)
  @Get('premium')
  async getPremium() {
    return { text: 'Premium content' }
  }

  @Auth([Role.ADMIN, Role.MANAGER])
  @Get('manager')
  async getManagerContent() {
    return { text: 'Manager content' }
  }

  @Auth(Role.ADMIN)
  @Get('list')
  async getList() {
    return this.userService.getUsers()
  }
}
