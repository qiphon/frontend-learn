/**
 *  手机号正则
 *      移动  134 / 135 / 136 / 137 / 138 / 139 / 147 / 148 / 150 / 151 / 152 / 157 / 158 / 159 / 172 / 178 / 182 / 183 / 184 / 187 / 188 / 198 
 *      联通  130 / 131 / 132 / 145 / 146 / 155 / 156 / 166 / 171 / 175 / 176 / 185 / 186
 *      电信  133 / 149 / 153 / 173 / 174 / 177 / 180 / 181 / 189 / 199
 *      虚拟号 170
 */

function phoneTest(phone) {
    phone = phone && trim(phone);
    let reg = /^1((3[0-9])|(4[5-9])|(5[0-35689])|(66)|(7[0-8])|(8[0-9])|(9[89]))\d{8}$/;
    return reg.test(phone)
}

// console.log(phoneTest(13700000000))

/**
 *   去空格正则 （左右空格）
 * 
 */

function trim(text) {
    if (typeof text === "string") {
        return text.replace(/(^\s*)|(\s*$)/gm, '')
    }
    return text;
}
// console.log(trim("  1231  \n\t\r      ")+111)

/**
 *   人名正则 
 * 
 *   校验规则：汉字、英文，长度为1-20个字符
 * 
 */

function nameTest(name) {
    name = trim(name);
    var reg = /^[\u4e00-\u9fa5A-z]{1,20}$/;
    return reg.test(name)
}
// console.log(nameTest("里Ddf"))