import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/CoreOutput';
import { User } from '../entities/user.entity';

@InputType()
export class EditProfileInput extends PartialType(
  PickType(User, ['userId', 'password']),
) {}

@ObjectType()
export class EditProfileOutput extends CoreOutput {}
