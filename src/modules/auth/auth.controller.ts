import { Body, Controller, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthModifyResponseDto, UserSignInRequestDto, UserSignInResponseDto } from './dtos'
import { CRequest, AuthOptions, RefreshTokenInterceptor } from '@common'

@Controller('auth')
export class AuthController {
	private readonly authService: AuthService
	constructor(authService: AuthService) {
		this.authService = authService
	}

	@Post('sign-in')
	@ApiOperation({ summary: 'sign in user' })
	@ApiOkResponse({ type: UserSignInResponseDto })
	async signIn(@Req() request: CRequest, @Body() body: UserSignInRequestDto): Promise<UserSignInResponseDto> {
		return this.authService.signIn(body)
	}

	@Post('sign-out')
	@AuthOptions(true, true)
	@ApiOperation({ summary: 'sign out user' })
	@ApiOkResponse({ type: AuthModifyResponseDto })
	async signOut(@Req() request: CRequest): Promise<AuthModifyResponseDto> {
		return this.authService.signOut({ user: request.user })
	}

	@Post('refresh-token')
	@ApiOperation({ summary: 'refresh token' })
	@ApiOkResponse({ type: UserSignInResponseDto })
	@UseInterceptors(RefreshTokenInterceptor)
	async getValidTokensWithRefresh(@Req() request: CRequest) {
		return this.authService.getValidTokens({ user: request.user })
	}
}
