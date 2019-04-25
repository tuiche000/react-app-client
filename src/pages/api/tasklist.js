// 获取首页推荐任务
import { _GET } from '../../utils/fetch';

export async function tasklist(options) {
    return await _GET(`/api/mms/spread/product/tasklist`, options);
}
