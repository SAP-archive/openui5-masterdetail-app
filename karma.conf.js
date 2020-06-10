/* global module*/

module.exports = function(config) {
	"use strict";

	var chromeFlags = [
		"--window-size=1280,1024"
	];

	config.set({

		frameworks: ['ui5'],

		reporters: ['progress'],

		browserConsoleLogOptions: {
			level: 'warn'
		},

		autoWatch: true,

		customLaunchers: {
			CustomChrome: {
				base: "Chrome",
				flags: chromeFlags
			},
			CustomChromeHeadlessNoSandbox: {
				base: "ChromeHeadless",
				flags: [
					...chromeFlags,
					"--no-sandbox"
				]
			}
		},

		browsers: ['CustomChrome'],

		singleRun: false
	});
};
