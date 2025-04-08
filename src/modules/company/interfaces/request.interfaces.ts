import { PaginationRequest, RequestOtherFields } from '../../../common'
import { CompanyOptional, CompanyRequired } from './fields.interfaces'

export declare interface CompanyFindManyRequest extends Pick<CompanyOptional, 'name' | 'sheetId'>, Pick<RequestOtherFields, 'ids' | 'isDeleted'>, PaginationRequest {}

export declare interface CompanyFindOneRequest extends Pick<CompanyRequired, 'id'>, Pick<RequestOtherFields, 'isDeleted'> {}

export declare interface CompanyGetManyRequest extends Pick<CompanyOptional, 'name' | 'sheetId'>, Pick<RequestOtherFields, 'ids' | 'isDeleted'>, PaginationRequest {}

export declare interface CompanyGetOneRequest extends Pick<CompanyOptional, 'id' | 'name' | 'sheetId'>, Pick<RequestOtherFields, 'isDeleted'> {}

export declare interface CompanyCreateOneRequest extends Pick<CompanyRequired, 'name' | 'sheetId'> {}

export declare interface CompanyUpdateOneRequest extends Pick<CompanyOptional, 'name' | 'sheetId' | 'deletedAt'> {}

export declare interface CompanyDeleteOneRequest extends Pick<CompanyRequired, 'id'>, Pick<RequestOtherFields, 'isDeleted' | 'method'> {}
