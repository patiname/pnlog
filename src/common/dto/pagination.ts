import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CoreOutput } from './CoreOutput';

@InputType()
export class PaginationInput {
  @Field((type) => Number, { defaultValue: 1 })
  @IsNumber()
  page: number;
}

@ObjectType()
export class PageinationOutput extends CoreOutput {
  @Field((type) => Number, { nullable: true })
  @IsNumber()
  totalPage?: number;

  @Field((type) => Number, { nullable: true })
  @IsNumber()
  totalResult?: number;
}
