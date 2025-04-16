import { GlobalResponse } from '@common'
import { UserOptional, UserRequired } from '../../user'

export declare interface UserSignInRequest extends Pick<UserRequired, 'password' | 'username'> {}

export declare interface AuthModifyResponse extends GlobalResponse {
	data: null
}

export declare interface AuthSignOutRequest {
	user: UserOptional
}

export declare interface AuthGetValidTokensRequest {
	user: UserOptional
}
