import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CoreOutput } from 'src/common/dto/CoreOutput';
import { Photo } from '../entities/photo.entity';

@InputType()
export class EditPhotoInput extends PickType(Photo, [
  'photoImg',
  'photoTitle',
  'photoDesc',
]) {
  @Field((type) => Number)
  @IsNumber()
  photoId: number;
}

@ObjectType()
export class EditPhotoOutput extends CoreOutput {}
