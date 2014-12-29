Package.describe({
	name: 'wolas:alerts',
	summary: 'Comprehensive system for displaying alerts to users',
	version: '1.0.0',
	git: 'https://github.com/wolasss/alerts.git'
});

Package.on_use(function (api, where) {
	api.use(['minimongo', 'mongo-livedata', 'templating'], 'client');

	api.add_files(['alerts.js', 'alerts_list.html', 'alerts_list.js'], 'client');

	if (api.export) 
		api.export('Alerts');
});

Package.on_test(function(api) {
	api.use('alerts', 'client');
	api.use(['tinytest', 'test-helpers', 'spacebars', 'templating'], 'client');  

	api.add_files(['tests/client.js', 'tests/client.html'], 'client');
});