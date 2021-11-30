import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/CoreOutput';
import { Photo } from '../entities/photo.entity';

@InputType()
export class CreatePhotoInput extends PickType(Photo, [
  'photoImg',
  'photoTitle',
  'photoDesc',
]) {}

@ObjectType()
export class CreatePhotoOutput extends CoreOutput {}
