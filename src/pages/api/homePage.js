// 获取首页数据
import { _GET } from '../../utils/fetch';

export async function reCount(code) {
    return await _GET(`/api/mms/spread/account/${code}`);
}

