/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([],
	function() {
	"use strict";

	/**
	 * ControlSpacer renderer.
	 * @namespace
	 */
	var ControlSpacerRenderer = {};

	ControlSpacerRenderer.render = function(rm, oControl) {
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass("sapMTBSpacer");

		var sWidth = oControl.getWidth();
		if (sWidth) {
			rm.addStyle("width", sWidth);
		}

		rm.writeStyles();
		rm.writeClasses();
		rm.write("></div>");
	};

	return ControlSpacerRenderer;

}, /* bExport= */ true);
