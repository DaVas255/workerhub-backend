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
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  findAll() {
    return this.userService.getUsers();
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(+id);
  }
}
