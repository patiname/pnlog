import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePhotoInput, CreatePhotoOutput } from './dto/createPhoto.dto';
import { SeePhotoInput, SeePhotoOutput } from './dto/seePhoto.dto';
import { Photo } from './entities/photo.entity';
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
}
