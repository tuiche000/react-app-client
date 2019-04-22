// 根据账户编码获取拉新列表
import { _GET } from '../../utils/fetch';

export async function lachineList(options) {
    return await _GET(`/api/mms/spread/recommends/members`, options);
}
export async function recommendList(options) {
    return await _GET(`/api/mms/spread/recommends/products`, options);
}