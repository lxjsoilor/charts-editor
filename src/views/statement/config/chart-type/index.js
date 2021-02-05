const modulesFiles = require.context('./', true, /\.js$/);

const configs = [];
modulesFiles.keys().forEach(item => {
	item = item.replace(/\.js$/, '');
	if (item != './index') {
    item = item.replace('./', '');
    let libPath = `/chart-type/${item}.js`;
    let lib = require('@/views/statement/config' + libPath).default;
    configs.push(lib)
	}
});

export default configs;
