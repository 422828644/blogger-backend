export class Result {
    static success(msg: string, data: any) {
        return {
            message: msg || 'success',
            code: 200,
            data: data || {},
        };
    }

    static fail(msg: string) {
        return {
            message: msg || 'fail',
            code: 100,
            data: {},
        };
    }
}
