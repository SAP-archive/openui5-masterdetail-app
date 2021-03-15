/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([], function () {
	"use strict";

	return {
		/**
		 * @param {sap.ui.core.Control} oItem Item from the GridContainer
		 * @param {HTMLElement} oElement HTML Element
		 * @returns {boolean} Whether oElement is above oItem
		 */
		isAbove: function (oItem, oElement) {
			var fY1 = oItem.getDomRef().getBoundingClientRect().top,
				fY2 = oElement.getBoundingClientRect().top;

			return fY2 - fY1 < 0;
		},

		/**
		 * @param {sap.ui.core.Control} oItem Item from the GridContainer
		 * @param {HTMLElement} oElement HTML Element
		 * @returns {boolean} Whether oElement is below oItem
		 */
		isBelow: function (oItem, oElement) {
			var fY1 = oItem.getDomRef().getBoundingClientRect().top,
				fY2 = oElement.getBoundingClientRect().top;

			return fY2 - fY1 > 0;
		},

		/**
		 * @param {sap.ui.core.Control} oItem The item around which the closest will be searched
		 * @param {*} aElements Elements, which will be searched
		 * @returns {HTMLElement} The closest element to oItem
		 */
		findClosest: function  (oItem, aElements) {
			var oClosestItem = null,
				fClosestDistance = Number.POSITIVE_INFINITY,
				fX1 = oItem.getDomRef().getBoundingClientRect().left,
				fY1 = oItem.getDomRef().getBoundingClientRect().top;

			aElements.forEach(function (oElement) {

				var fX2 = oElement.getBoundingClientRect().left,
					fY2 = oElement.getBoundingClientRect().top;

				var fDistSquared = (fX2 - fX1) * (fX2 - fX1) + (fY2 - fY1) * (fY2 - fY1);

				if (fDistSquared < fClosestDistance) {
					oClosestItem = oElement;
					fClosestDistance = fDistSquared;
				}
			});

			return oClosestItem;
		},

		/**
		 * @param {sap.ui.core.Control} oItem The closest Grid Container will be searched
		 * @param {*} aElements Elements, which will be searched
		 * @returns {HTMLElement} The closest element to oItem
		 */
		findClosestGridContainer: function  (oItem, aElements) {
			var oClosestGridContainer = null,
				fClosestDistance = Number.POSITIVE_INFINITY,
				fY1 = oItem.getDomRef().getBoundingClientRect().top;

			aElements.forEach(function (oElement) {

				var fY2 = oElement.getBoundingClientRect().top;

				var fDistSquared = (fY2 - fY1) * (fY2 - fY1);

				if (fDistSquared < fClosestDistance) {
					oClosestGridContainer = oElement;
					fClosestDistance = fDistSquared;
				}
			});

			return oClosestGridContainer;
		}
	};
});