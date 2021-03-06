import {Body, Controller, Get, Post, Req, Res} from '@nestjs/common';
import {ApiOperation, ApiUseTags} from '@nestjs/swagger';
import * as crypto from 'crypto';
import {AppService} from './app.service';
import {BaseController} from './base.controller';
import {UserService} from './bussiness/user/user.service';
import {UserModel} from './model/userModel';
import {Base64} from 'js-base64';

@Controller()
@ApiUseTags('默认')
export class AppController extends BaseController {
    constructor(private readonly appService: AppService,
                private readonly userService: UserService,) {
        super();
    }

    private readonly SECRET_TOKEN = 'ecP6bWXJfnwhSPzz';

    @Get()
    @ApiOperation({title: '首页'})
    async getHello() {
        return this.appService.getHello();
    }

    @ApiOperation({title: '登录'})
    @Post('auth/login')
    async login(@Body() userModel: UserModel) {
        return await this.userService.signIn(userModel)
            .then(res => {
                return this.success('', res);
            })
            .catch(err => {
                return this.fail(err.message);
            });
    }

    @ApiOperation({title: 'backend-webhook'})
    @Post('/github-webhooks')
    async githubWebhooks(@Req() req, @Res() res) {
        const reg = /^sha1=/;
        let sha1 = req.headers['x-hub-signature'];
        if (reg.test(sha1)) {
            sha1 = sha1.replace(reg, '');
            const payload = JSON.stringify(req.body);
            const hash = crypto.createHmac('sha1', this.SECRET_TOKEN).update(payload);
            const token = hash.digest('hex');
            if (token !== sha1) {
                res.writeHead(401);
                res.end('unauthorized');
                return;
            }
            res.writeHead(200);
            res.end('webhooks success');
            await this.appService.gitHubPull();
            return;
        } else {
            res.writeHead(401);
            res.end('unauthorized');
            return;
        }
    }

    @ApiOperation({title: 'front-webhook'})
    @Post('/gitee-webhooks')
    async giteeWebhooks(@Req() req, @Res() res) {
        const token = req.headers['x-gitee-token'];
        if (token) {
            const timestamp = new Date().getUTCMilliseconds();
            const stringToSign = timestamp + '\n' + this.SECRET_TOKEN;
            const hash = crypto.createHmac('HmacSHA256', stringToSign).digest('hex');
            const signToken = Base64.encode(hash);
            if (token !== signToken) {
                res.writeHead(401);
                res.end('unauthorized');
                return;
            }
            res.writeHead(200);
            res.end('webhooks success');
            await this.appService.giteePull();
            return;
        } else {
            res.writeHead(401);
            res.end('unauthorized');
            return;
        }
    }

    @ApiOperation({title: '测试123'})
    @Get('/test')
    async test() {
        return this.success();
    }
}
