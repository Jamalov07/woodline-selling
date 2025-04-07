import { PaginationRequest, RequestOtherFields } from '@common'
import { StaffOptional, StaffRequired } from './fields.interfaces'

//query
export declare interface StaffFindManyRequest extends Pick<StaffOptional, 'phone' | 'name'>, PaginationRequest, Pick<RequestOtherFields, 'ids' | 'isDeleted' | 'search'> {}

//query
export declare interface StaffFindOneRequest extends Pick<StaffOptional, 'id' | 'phone' | 'name' | 'token'>, Pick<RequestOtherFields, 'isDeleted'> {}

//query
export declare interface StaffGetManyRequest extends Pick<StaffOptional, 'phone' | 'name'>, PaginationRequest, Pick<RequestOtherFields, 'ids' | 'isDeleted' | 'search'> {}

//query
export declare interface StaffGetOneRequest extends Pick<StaffOptional, 'id' | 'phone' | 'name' | 'token'>, Pick<RequestOtherFields, 'isDeleted'> {}

//body
export declare interface StaffCreateOneRequest extends Pick<StaffRequired, 'phone' | 'password' | 'name' | 'companyId' | 'role'> {}

//body
export declare interface StaffUpdateOneRequest
	extends Pick<StaffOptional, 'phone' | 'name' | 'deletedAt' | 'password' | 'token' | 'role' | 'botAccess' | 'companyId' | 'telegramId'> {}

//query
export declare interface StaffDeleteOneRequest extends Pick<StaffRequired, 'id'>, Pick<RequestOtherFields, 'method'> {}
