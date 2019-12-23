/**
 *   转换金额格式
 *     如： 1000  ——>  1,000
 */
export function toMoneyString(val) {
    if (!val) return '';
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}