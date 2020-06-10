/* global module require*/

module.exports = function(config) {
	"use strict";

	require("./karma.conf")(config);

	process.env.CHROME_BIN = require("puppeteer").executablePath();

	config.set({

		preprocessors: {
			'{webapp,webapp/!(test)}/*.js': ['coverage']
		},

		coverageReporter: {
			includeAllSources: true,
			reporters: [
				{
					type: 'html',
					dir: 'coverage'
				},
				{
					type: 'text'
				}
			],
			check: {
				global: {
					statements: 90,
					branches: 70,
					functions: 90,
					lines: 90
				}
			}
		},

		reporters: ['progress', 'coverage'],

		browsers: ['CustomChromeHeadlessNoSandbox'],

		singleRun: true
	});
};

