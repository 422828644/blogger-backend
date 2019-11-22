import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';
import {ApiOperation, ApiUseTags} from '@nestjs/swagger';

@Controller()
@ApiUseTags('默认')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({title: '首页'})
  getHello(): string {
    return this.appService.getHello();
  }
}
