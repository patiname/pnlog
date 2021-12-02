import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Photo } from './entities/photo.entity';
import { PhotoComments } from './entities/photoComments.entity';
import { PhotoCommentsResolver, PhotoResolver } from './photo.resolver';
import { PhotoService } from './photo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, User, PhotoComments])],
  providers: [PhotoResolver, PhotoService, PhotoCommentsResolver],
})
export class PhotoModule {}
