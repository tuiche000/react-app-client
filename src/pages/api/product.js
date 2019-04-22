// 根据账户编码获取产品列表
import { _GET } from '../../utils/fetch';

export async function productList(options) {
    return await _GET(`/api/mms/spread/product/recommendlist`, options);
}
