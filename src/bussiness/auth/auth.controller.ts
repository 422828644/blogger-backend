import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LoginModel} from '../../model/loginModel';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    @Post('login')
    async login(@Body() loginModel: LoginModel) {
        return await this.authService.login(loginModel);
    }
}
