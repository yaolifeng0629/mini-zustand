import { request } from '@/utils/request';

export function TestApi() {
    return request({
        url: '/test',
        method: 'get',
        path: ''
    });
}
