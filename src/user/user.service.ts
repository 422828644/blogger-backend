import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../entities/user.entity';
import {Repository} from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
                private readonly userRepository: Repository<User>,
    ) { }

    async create(user: User) {
        return this.userRepository.save(user);
    }

    async delete(user: User) {
        return this.userRepository.delete([user.account]);
    }

    async update(user: User) {
        return this.userRepository.update(user.account, user);
    }

    async findOne(account: string) {
        return await this.userRepository.findOne({account});
    }

    async findAll() {
        return await this.userRepository.find();
    }
}
