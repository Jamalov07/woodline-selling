import { RequestOtherFields } from '../../../common'
import { ClientOptional, ClientRequired } from './fields.interfaces'

export declare interface ClientFindManyRequest extends Pick<ClientOptional, 'name' | 'phone' | 'whereFrom'>, Pick<RequestOtherFields, 'ids' | 'isDeleted'> {}

export declare interface ClientFindOneRequest extends Pick<ClientRequired, 'id'>, Pick<RequestOtherFields, 'isDeleted'> {}

export declare interface ClientCreateOneRequest extends Pick<ClientRequired, 'name' | 'phone' | 'whereFrom'> {}

export declare interface ClientUpdateOneRequest extends Pick<ClientOptional, 'name' | 'phone' | 'whereFrom' | 'deletedAt'> {}

export declare interface ClientDeleteOneRequest extends Pick<ClientRequired, 'id'>, Pick<RequestOtherFields, 'isDeleted' | 'method'> {}
