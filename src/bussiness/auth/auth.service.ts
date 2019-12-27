import {Injectable} from '@nestjs/common';
import {UserService} from '../user/user.service';
import {UserModel} from '../../model/userModel';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
    ) {
    }

    async validateUser(payload: UserModel) {
        const user = await this.userService.findOne(payload.account);
        if (user && user.password === payload.password) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }
}
