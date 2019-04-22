// 根据账户编码获取产品列表
import { _GET } from '../../utils/fetch';

export async function create_qrCode(mobilephone) {
    return await _GET(`/api/mms/spread/member/${mobilephone}`);
}
