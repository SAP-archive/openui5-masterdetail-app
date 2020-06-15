/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([
		'sap/ui/core/Renderer',
		'sap/m/PlanningCalendarRenderer'
	],
	function(Renderer, PlanningCalendarRenderer) {
	"use strict";

	/**
	 * PlanningCalendar renderer.
	 * @namespace
	 */
	var PlanningCalendarInCardRenderer = Renderer.extend(PlanningCalendarRenderer);
	PlanningCalendarInCardRenderer.apiVersion = 2;

	/**
	 * Includes additional class, specific for the control.
	 *
	 * @private
	 * @override
	 * @param {Object} oRm The render manager object.
	 */
	PlanningCalendarInCardRenderer.addAdditionalClasses = function (oRm) {
		oRm.class("sapMPlanCalInCard");
	};

	return PlanningCalendarInCardRenderer;

}, /* bExport= */ true);
