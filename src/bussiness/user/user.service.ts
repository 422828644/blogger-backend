import {Injectable, CacheStore} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../../entities/user.entity';
import {Repository} from 'typeorm';
import {Utils} from '../../utils/common.utils';
import * as crypto from 'crypto-js';
import {UserModel} from '../../model/userModel';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly cacheStore: CacheStore,
    ) {
    }

    async create(user: User) {
        user.salt = Utils.getRandomSalt();
        const passwordMd5 = crypto.MD5(user.password);
        user.password = crypto.MD5(passwordMd5 + user.salt).toString();
        return await this.userRepository.save(user);
    }

    async delete(user: User) {
        return await this.userRepository.delete([user.account]);
    }

    async deleteById(id: number) {
        return await this.userRepository.delete([id]);
    }

    async update(user: User) {
        return await this.userRepository.update(user.account, user);
    }

    async findOne(account: string) {
        return await this.userRepository.findOne({account});
    }

    async findAll() {
        return await this.userRepository.find();
    }

    async signIn(userModel: UserModel) {
        const user = await this.userRepository.findOne({account: userModel.account});
        if (user) {
            const passwordMd5 = crypto.MD5(userModel.password);
            const password = crypto.MD5(passwordMd5 + user.salt).toString();
            if (user.password === password) {
                return user;
            }
        }
        return null;
    }

    async findOneByToken(token: string) {
        return this.cacheStore.get(token);
    }
}
