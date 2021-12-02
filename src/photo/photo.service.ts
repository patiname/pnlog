import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
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

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo) private readonly photos: Repository<Photo>,
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(PhotoComments)
    private readonly photoComments: Repository<PhotoComments>,
  ) {}

  async createPhoto({
    photoImg,
    photoTitle,
    photoDesc,
  }: CreatePhotoInput): Promise<CreatePhotoOutput> {
    try {
      await this.photos.save(
        this.photos.create({ photoImg, photoTitle, photoDesc }),
      );

      return { ok: true };
    } catch (error) {
      return { ok: false, error: '사진을 등록할수 없습니다.' };
    }
  }

  async seePhoto({ page }: SeePhotoInput): Promise<SeePhotoOutput> {
    try {
      const [photos, totalResult] = await this.photos.findAndCount({
        take: 6,
        skip: (page - 1) * 6,
      });

      return {
        ok: true,
        photos,
        totalPage: Math.ceil(totalResult / 6),
        totalResult,
      };
    } catch (error) {
      return { ok: false, error: '사진을 불러올수 없습니다.' };
    }
  }

  async editPhoto(editPhotoInput: EditPhotoInput): Promise<EditPhotoOutput> {
    try {
      const photo = await this.photos.findOne(editPhotoInput.photoId);
      if (!photo) {
        return { ok: false, error: '사진이 없습니다' };
      }

      await this.photos.save([
        {
          id: editPhotoInput.photoId,
          ...editPhotoInput,
        },
      ]);

      return { ok: true };
    } catch (error) {
      return { ok: false, error: '수정할수 없습니다.' };
    }
  }

  async deletePhoto({ photoId }: DeletePhotoInput): Promise<DeletePhotoOutput> {
    try {
      const photo = await this.photos.findOne(photoId);
      if (!photo) {
        return { ok: false, error: '사진이 없습니다.' };
      }

      await this.photos.delete(photoId);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: '삭제 할 수 없습니다.' };
    }
  }

  async createPhotoComment(
    authUser: User,
    { photoId, comment }: CreatePhotoCommentInput,
  ): Promise<CreatePhotoCommentOutput> {
    try {
      const user = await this.users.findOne(authUser.id);
      if (!user) {
        return { ok: false, error: '없는 유저입니다' };
      }

      const photo = await this.photos.findOne(photoId, {
        relations: ['comments'],
      });
      if (!photo) {
        return { ok: false, error: '등록할 댓글의 사진이 없습니다.' };
      }
      console.log(photo);

      await this.photoComments.save(
        this.photoComments.create({ user, photo, comment }),
      );
      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        error: '댓글을 등록 할 수 없습니다, 로그인 해주세요',
      };
    }
  }
}
