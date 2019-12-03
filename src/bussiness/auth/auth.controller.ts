import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UserModel} from '../../model/userModel';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    @Post('login')
    async login(@Body() loginModel: UserModel) {
        return await this.authService.signIn(loginModel);
    }
}
