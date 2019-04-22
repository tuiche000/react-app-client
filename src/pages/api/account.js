// 根据账户编码获取收支详情列表
import { _GET } from '../../utils/fetch';

export async function income(code, options) {
    return await _GET(`/api/mms/spread/balance/account/${code}/income`, options);
}

export async function spending(code ,options) {
    return await _GET(`/api/mms/spread/balance/account/${code}/spending` ,options);
}

export async function account_current() {
    return await _GET(`/sys/crm/account/current`);
}