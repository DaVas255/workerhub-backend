import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { Auth } from './decorators/auth.decorator'
import { CurrentUser } from './decorators/user.decorator'
import { AuthDto } from './dto/auth.dto'
import { UserService } from 'src/user/user.service'
import { UserDto } from 'src/user/dto/user.dto'
import { Recaptcha } from '@nestlab/google-recaptcha'
import { RefreshTokenService } from './refresh-token.service'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly refreshTokenService: RefreshTokenService
  ) { }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Recaptcha()
  @Post('login')
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const { refreshToken, ...response } = await this.authService.login(dto)

    this.refreshTokenService.addRefreshTokenToResponse(res, refreshToken)

    return response
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Recaptcha()
  @Post('register')
  async register(
    @Body() dto: UserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    dto.cityId = +dto.cityId

    const { refreshToken, ...response } = await this.authService.register(dto)
    this.refreshTokenService.addRefreshTokenToResponse(res, refreshToken)
    return response
  }

  @HttpCode(200)
  @Get('verify-email')
  async verifyEmail(@Query('token') token?: string) {
    if (!token) {
      throw new UnauthorizedException('Token not passed')
    }

    return this.authService.verifyEmail(token)
  }

  @HttpCode(200)
  @Post('access-token')
  async getNewTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const refreshTokenFromCookies =
      req.cookies[this.refreshTokenService.REFRESH_TOKEN_NAME]

    if (!refreshTokenFromCookies) {
      this.refreshTokenService.removeRefreshTokenFromResponse(res)
      throw new UnauthorizedException('Refresh token not passed')
    }

    const { refreshToken, ...response } = await this.authService.getNewTokens(
      refreshTokenFromCookies
    )

    this.refreshTokenService.addRefreshTokenToResponse(res, refreshToken)

    return response
  }

  @HttpCode(200)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    this.refreshTokenService.removeRefreshTokenFromResponse(res)

    return true
  }
}
