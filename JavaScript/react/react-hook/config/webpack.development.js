const { join } = require('path')
const devConfig = {
    devServer: {
        port: 3009,
        hot: true,
        contentBase: join(__dirname, '../dist')
    }
}
//#endregion
module.exports = devConfig