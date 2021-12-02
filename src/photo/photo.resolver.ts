import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/authUser.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreatePhotoInput, CreatePhotoOutput } from './dto/createPhoto.dto';
import {
  CreatePhotoCommentInput,
  CreatePhotoCommentOutput,
} from './dto/createPhotoComment.dto';
import { DeletePhotoInput, DeletePhotoOutput } from './dto/deletePhoto.dto';
import { EditPhotoInput, EditPhotoOutput } from './dto/editPhoto.dto';
import { SeePhotoInput, SeePhotoOutput } from './dto/seePhoto.dto';
import { Photo } from './entities/photo.entity';
import { PhotoComments } from './entities/photoComments.entity';
import { PhotoService } from './photo.service';

@Resolver((of) => Photo)
export class PhotoResolver {
  constructor(private readonly photoService: PhotoService) {}

  @Mutation((returns) => CreatePhotoOutput)
  createPhoto(
    @Args('input') createPhotoInput: CreatePhotoInput,
  ): Promise<CreatePhotoOutput> {
    return this.photoService.createPhoto(createPhotoInput);
  }

  @Query((returns) => SeePhotoOutput)
  seePhoto(
    @Args('input') seePhotoInput: SeePhotoInput,
  ): Promise<SeePhotoOutput> {
    return this.photoService.seePhoto(seePhotoInput);
  }

  @Mutation((returns) => EditPhotoOutput)
  editPhoto(
    @Args('input') editPhotoInput: EditPhotoInput,
  ): Promise<EditPhotoOutput> {
    return this.photoService.editPhoto(editPhotoInput);
  }

  @Mutation((returns) => DeletePhotoOutput)
  deletePhoto(
    @Args('input') deletePhotoInput: DeletePhotoInput,
  ): Promise<DeletePhotoOutput> {
    return this.photoService.deletePhoto(deletePhotoInput);
  }
}
/* photo end */

@Resolver((of) => PhotoComments)
export class PhotoCommentsResolver {
  constructor(private readonly photoService: PhotoService) {}

  @Mutation((returns) => CreatePhotoOutput)
  createPhotoComment(
    @AuthUser() authUser: User,
    @Args('input') createPhotoComment: CreatePhotoCommentInput,
  ): Promise<CreatePhotoCommentOutput> {
    return this.photoService.createPhotoComment(authUser, createPhotoComment);
  }
}
