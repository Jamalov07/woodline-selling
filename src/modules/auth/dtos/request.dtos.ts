import { IntersectionType, PickType } from '@nestjs/swagger'
import { UserSignInRequest } from '../interfaces'
import { UserRequiredDto } from '../../user'

export class UserSignInRequestDto extends IntersectionType(PickType(UserRequiredDto, ['password', 'username'])) implements UserSignInRequest {}
