export class BaseController {

    async success(msg?: string, data?: any) {
        return {
            message: msg || 'success',
            code: 200,
            data: data || {},
        };
    }

    async fail(msg: string) {
        return {
            message: msg || 'fail',
            code: 100,
            data: {},
        };
    }
}
