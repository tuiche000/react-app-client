// 根据账户编码获取拉新列表
import { _GET } from '../../utils/fetch';

export async function lachinList(options) {
    return await _GET(`/recommends/members`, options);
}
export async function recommendList(options) {
    return await _GET(`/recommends/products`, options);
}