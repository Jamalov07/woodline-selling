import { GlobalResponse } from '@common'
import { StaffRequired } from '../../staff'

export declare interface Tokens {
	accessToken: string
	refreshToken: string
}

export declare interface TokenData {
	token: string
}
export declare interface StaffSignInData {
	token: TokenData & Pick<StaffRequired, 'companyId' | 'role' | 'name'>
}

export declare interface StaffSignInResponse extends GlobalResponse {
	data: StaffSignInData
}
