import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CoreOutput } from 'src/common/dto/CoreOutput';

@InputType()
export class DeletePhotoInput {
  @Field((type) => Number)
  @IsNumber()
  photoId: number;
}

@ObjectType()
export class DeletePhotoOutput extends CoreOutput {}
