/* global module*/

module.exports = function(config) {
	"use strict";

	var chromeFlags = [
		"--window-size=1280,1024"
	];

	config.set({

		frameworks: ['ui5'],

		reporters: ['progress'],

		logLevel: config.LOG_INFO,

		browserConsoleLogOptions: {
			level: 'warn'
		},

		autoWatch: true,

		customLaunchers: {
			CustomChrome: {
				base: "Chrome",
				flags: chromeFlags
			},
			CustomChromeHeadless: {
				base: "ChromeHeadless",
				flags: chromeFlags
			}
		},

		browsers: ['CustomChrome'],

		singleRun: false
	});
};
