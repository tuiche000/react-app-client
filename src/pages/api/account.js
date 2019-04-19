// 根据账户编码获取收入详情列表
import { _GET } from '../../utils/fetch';

export async function income(code, options) {
    return await _GET(`/balance/account/${code}/income`, options);
}

export async function spending(code ,options) {
    return await _GET(`/balance/account/${code}/spending` ,options);
}