import {Injectable} from '@nestjs/common';
import {UserService} from '../user/user.service';
import {JwtService} from '@nestjs/jwt';
import {UserModel} from '../../model/userModel';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async signIn(loginModel: UserModel) {
        const result = await this.userService.signIn(loginModel);
        return this.jwtService.sign(result);
    }

    async validateUser(payload: UserModel) {
        return await this.userService.findOneByToken(payload.token);
    }
}
