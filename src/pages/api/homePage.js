// 获取首页数据
import { _GET } from '../../utils/fetch';

export async function reCount() {
    return await _GET(`/api/mms/spread/account/type/PRIZE`);
}

export async function shareUrl(options) {
    return await _GET(`/api/mms/spread/member/share-url`, options);
}
