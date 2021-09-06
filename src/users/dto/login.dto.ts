import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/CoreOutput';
import { User } from '../entities/user.entity';

@InputType()
export class LoginInput extends PickType(User, ['userId', 'password']) {}

@ObjectType()
export class LoginOutput extends CoreOutput {
  @Field((type) => String, { nullable: true })
  token?: string;
}
