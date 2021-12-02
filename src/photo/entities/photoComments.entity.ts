import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Photo } from './photo.entity';

@InputType('PhotoCommentInput', { isAbstract: true })
@ObjectType()
@Entity()
export class PhotoComments extends CoreEntity {
  @Field((type) => String)
  @Column()
  comment: string;

  @Field((type) => Photo)
  @ManyToOne((type) => Photo, (photo) => photo.comments, {
    onDelete: 'SET NULL',
  })
  photo: Photo;

  @RelationId((photoComments: PhotoComments) => photoComments.photo)
  @IsNumber()
  photoId: number;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.photoComment)
  user: User;

  @RelationId((photoComments: PhotoComments) => photoComments.user)
  @IsNumber()
  userId: number;
}
