import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dto/createAccount.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount({
    userId,
    password,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const exist = await this.users.findOne({ userId });
      if (exist) {
        return { ok: false, error: '이미 있는 계정입니다' };
      }

      await this.users.save(this.users.create({ userId, password }));

      return { ok: true };
    } catch (error) {
      return { ok: false, error: '계정을 생성할수 없습니다' };
    }
  }
}
