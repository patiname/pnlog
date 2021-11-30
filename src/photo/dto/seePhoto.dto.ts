import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { PageinationOutput, PaginationInput } from 'src/common/dto/pagination';
import { Photo } from '../entities/photo.entity';

@InputType()
export class SeePhotoInput extends PaginationInput {}

@ObjectType()
export class SeePhotoOutput extends PageinationOutput {
  @Field((type) => [Photo], { nullable: true })
  photos?: Photo[];
}
