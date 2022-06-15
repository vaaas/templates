import * as path from 'path'

const babel_options = {
	plugins: [
		["@babel/plugin-transform-react-jsx", {
			"pragma": "h",
			"pragmaFrag": "Fragment",
		}]
	],
}

const prod = process.env.ENV === 'production'

export default {
	mode: prod ? 'production' : 'development',

	watch: !prod,

	entry: path.resolve(path.join('.', 'src', 'index.tsx')),

	output: {
		path: path.resolve(path.join('.', 'build')),
		filename: 'index.js',
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js'],

		alias: {
			'react': 'preact/compat',
			'react-dom': 'preact/compat',
		},
	},

	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},

			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: babel_options,
			},

			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		]
	},
}
