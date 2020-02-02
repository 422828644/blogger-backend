import {Injectable, Logger} from '@nestjs/common';
import {exec} from 'child_process';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }

    gitHubPull() {
        exec('cd ~/soft/', (err, stdout) => {
            Logger.debug(stdout);
        });
        exec('git pull https://github.com/422828644/blogger-backend.git', (error, stdout) => {
            Logger.debug(stdout);
        });
    }

    giteePull() {
        exec('cd ~/front/', ((error, stdout) => {
            Logger.debug(stdout);
        }))
        exec('git pull origin master', ((error, stdout) => {
            Logger.debug(stdout);
        }))
    }
}
