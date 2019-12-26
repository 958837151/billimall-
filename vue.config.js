module.exports = {
	configureWebpack: {
		devServer: {
			proxy: {
				'/api': {
					// target: 'http://api.bm.com',
					// target: 'http://www.pc.com:80',
					// target: 'http://pc.bm.com',
					changeOrigin: true, //是否跨域
					pathRewrite: {
						'^/api': '' //规定请求地址以什么作为开头
					}
				}
			}
		}
	}
}
