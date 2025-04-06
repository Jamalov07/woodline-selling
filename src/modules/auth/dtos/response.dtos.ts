import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { StaffSignInData, StaffSignInResponse, TokenData, Tokens } from '../interfaces'
import { StaffRequired, StaffRequiredDto } from '../../staff'
import { GlobalModifyResponseDto, GlobalResponseDto } from '@common'

export class TokensDto implements Tokens {
	@ApiProperty({ type: String })
	accessToken: string

	@ApiProperty({ type: String })
	refreshToken: string
}
export class StaffTokenData
	extends IntersectionType(PickType(StaffRequiredDto, ['companyId', 'name', 'role']))
	implements TokenData, Pick<StaffRequired, 'name' | 'role' | 'companyId'>
{
	@ApiProperty({ type: String })
	token: string
}

export class StaffSignInDataDto implements StaffSignInData {
	@ApiProperty({ type: StaffTokenData })
	token: TokenData & Pick<StaffRequired, 'name' | 'role' | 'companyId'>
}

export class StaffSignInResponseDto extends GlobalResponseDto implements StaffSignInResponse {
	@ApiProperty({ type: StaffSignInDataDto })
	data: StaffSignInData
}

export class AuthModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) {}
