import { PaginationRequest, RequestOtherFields } from '../../../common'
import { PartnerInfoOptional, PartnerInfoRequired, UserOptional, UserRequired } from './fields.interfaces'

export declare interface UserFindManyRequest extends PaginationRequest, Pick<UserOptional, 'fullname' | 'phone' | 'username'> {}

export declare interface UserFindOneRequest extends Pick<UserRequired, 'id'> {}

export declare interface UserGetManyRequest extends PaginationRequest, Pick<UserOptional, 'fullname' | 'phone' | 'username'>, Pick<RequestOtherFields, 'ids' | 'isDeleted'> {}

export declare interface UserGetOneRequest extends Pick<UserOptional, 'id' | 'fullname' | 'phone' | 'token' | 'username'>, Pick<RequestOtherFields, 'isDeleted'> {}

export declare interface UserCreateOneRequest
	extends Pick<UserRequired, 'phone' | 'fullname'>,
		Pick<UserOptional, 'username' | 'password'>,
		Pick<PartnerInfoRequired, 'balance' | 'whereFrom'>,
		Pick<RequestOtherFields, 'rolesToConnect' | 'actionsToConnect'> {}

export declare interface UserUpdateOneRequest
	extends Pick<UserOptional, 'fullname' | 'password' | 'phone' | 'token' | 'username' | 'deletedAt'>,
		Pick<PartnerInfoOptional, 'balance' | 'whereFrom'>,
		Pick<RequestOtherFields, 'rolesToConnect' | 'rolesToDisconnect' | 'actionsToConnect' | 'actionsToDisconnect'> {}

export declare interface UserDeleteOneRequest extends Pick<UserRequired, 'id'>, Pick<RequestOtherFields, 'method'> {}

//===

export declare interface StaffCreateOneRequest extends Required<Omit<UserCreateOneRequest, 'balance' | 'whereFrom'>> {}

export declare interface PartnerCreateOneRequest extends UserCreateOneRequest {}
