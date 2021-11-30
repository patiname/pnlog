import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhotoInput, CreatePhotoOutput } from './dto/createPhoto.dto';
import { SeePhotoInput, SeePhotoOutput } from './dto/seePhoto.dto';
import { Photo } from './entities/photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo) private readonly photos: Repository<Photo>,
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
}