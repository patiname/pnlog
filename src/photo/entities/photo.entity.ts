import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { PhotoComments } from './photoComments.entity';

@InputType('PhotoInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Photo extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  photoImg: string;

  @Field((type) => String)
  @Column()
  @IsString()
  photoTitle: string;

  @Field((type) => String, { nullable: true })
  @Column()
  @IsString()
  photoDesc?: string;

  @Field((type) => [PhotoComments])
  @OneToMany((type) => PhotoComments, (photoComments) => photoComments.photo, {
    nullable: true,
  })
  comments?: PhotoComments[];
}
