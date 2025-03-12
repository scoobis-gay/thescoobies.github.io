module.exports = {
	maximumFileSizeToCacheInBytes: 5000000000,
	globDirectory: 'celeste-wasm/',
	globPatterns: [
		'**/*.{ico,png,jpg,js,data,html,json,css,txt,wasm,dat}'
	],
	swDest: 'celeste-wasm/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};