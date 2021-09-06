import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/CoreOutput';
import { User } from '../entities/user.entity';

@InputType()
export class CreateAccountInput extends PickType(User, [
  'userId',
  'password',
]) {}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {}
