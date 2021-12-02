import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CoreOutput } from 'src/common/dto/CoreOutput';
import { PhotoComments } from '../entities/photoComments.entity';

@InputType()
export class CreatePhotoCommentInput extends PickType(PhotoComments, [
  'comment',
]) {
  @Field((type) => Number)
  @IsNumber()
  photoId: number;
}

@ObjectType()
export class CreatePhotoCommentOutput extends CoreOutput {}
