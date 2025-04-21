import { GlobalResponse } from '@common'
import { StaffOptional, StaffRequired } from '../../../staff'

export declare interface StaffSignInRequest extends Pick<StaffRequired, 'password' | 'username'> {}

export declare interface AuthModifyResponse extends GlobalResponse {
	data: null
}

export declare interface AuthSignOutRequest {
	staff: StaffOptional
}

export declare interface AuthGetValidTokensRequest {
	staff: StaffOptional
}
