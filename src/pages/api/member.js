// 根据账户编码获取产品列表
import { _POST } from '../../utils/fetch';

export async function create_qrCode(mobilephone) {
    return await _POST(`/api/mms/spread/member/${mobilephone}`);
}
