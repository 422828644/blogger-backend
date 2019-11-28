import {Injectable} from '@nestjs/common';
import {UserService} from '../user/user.service';
import {JwtService} from '@nestjs/jwt';
import {LoginModel} from '../../model/loginModel';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async signIn(loginModel: LoginModel) {
        const {account, password} = loginModel;
        const result = await this.userService.findOne(account);
        return this.jwtService.sign(loginModel);
    }

    async validateUser(payload: any) {
        return await this.userService.findOneByToken(payload.token);
    }
}
