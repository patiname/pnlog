import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { Repository } from 'typeorm';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dto/createAccount.dto';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,

    private readonly jwtService: JwtService,
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

  async login({ userId, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.users.findOne({ userId });
      if (!user) {
        return { ok: false, error: '없는 아이디 입니다' };
      }

      const passwordOk = await user.checkPassword(password);
      if (!passwordOk) {
        return { ok: false, error: '비밀번호가 틀렸습니다' };
      }

      const token = this.jwtService.sign(user.id);

      return { ok: true, token };
    } catch (error) {
      return { ok: false, error: '로그인 할수 없습니다.' };
    }
  }

  async findById(id: number): Promise<User> {
    return this.users.findOne({ id });
  }
}
