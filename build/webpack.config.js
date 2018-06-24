const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
    entry:{index:[
            'babel-polyfill',
            'react-hot-loader/patch', //设置这里  
             path.resolve(__dirname, '../src/index.js')
         ],
         vendor: ['react', 'react-dom', 'react-router-dom']
        },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'js/[name].js',
        publicPath:'/'
    },
    devtool: 'inline-source-map',
    devServer:{
        compress:false,//是否压缩
        inline:true,
        host:'localhost',
        port: '8080',
        hot:true,
		proxy: {

		},
    },
    externals:{//单独打包分割
        // 'react':'React',
        // 'react-dom':'ReactDom'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                query:{
                    presets:['es2015','react']
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'    // 可以用来加载模板
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
			title: '',//设置生成的 html 文件的标题
			filename: 'index.html',//生成 html 文件的文件名
			favicon: '',//html 文件生成一个 favicon。属性值为 favicon 文件所在的路径名。
			template: 'src/index.html',//根据自己的指定的模板文件来生成特定的 html 文件
			inject: true,//注入选项。有四个选项值 true 默认值，script标签位于html文件的 body 底部, body 同 true, headscript 标签位于 head 标签内, false 不插入生成的 js 文件，只是单纯的生成一个 html 文件
			minify: false,//minify 的作用是对 html 文件进行压缩
			hash: true,//hash选项的作用是 给生成的 js 文件一个独特的 hash 值，该 hash 值是该次 webpack 编译的 hash 值。默认值为 false 
		})
    ]

}