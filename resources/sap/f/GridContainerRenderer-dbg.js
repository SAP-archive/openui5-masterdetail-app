/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([ "sap/ui/Device"],
	function(Device) {
		"use strict";
		/* global Map */

		/**
		 * GridContainer renderer
		 * @namespace
		 */
		var GridContainerRenderer = {};

		/**
		 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
		 *
		 * @param {sap.ui.core.RenderManager} rm the RenderManager that can be used for writing to the render output buffer
		 * @param {sap.ui.core.Control} control an object representation of the control that should be rendered
		 */
		GridContainerRenderer.render = function(rm, control) {

			rm.write('<div');
			rm.writeControlData(control);


			//TODO roledescription
			rm.writeAccessibilityState(control, {
				role: "list",
				roledescription: control._oRb.getText("GRIDCONTAINER_ROLEDESCRIPTION")
			});
			rm.addClass("sapFGridContainer");

			if (control.getSnapToRow()) {
				rm.addClass("sapFGridContainerSnapToRow");
			}

			if (control.getAllowDenseFill()) {
				rm.addClass("sapFGridContainerDenseFill");
			}

			rm.writeClasses();

			// Add inline styles
			if (control.getWidth()) {
				rm.addStyle("width", control.getWidth());
			}
			this.addGridStyles(rm, control);
			rm.writeStyles();

			// Add tooltip
			var tooltip = control.getTooltip_AsString();
			if (tooltip) {
				rm.writeAttributeEscaped("title", tooltip);
			}

			// Close opening tag
			rm.write(">");
			// dummy keyboard handling area
			this.renderDummyArea(rm, control, "before", -1);

			var iIndex = 0,
				aItems = control.getItems();
			 for (iIndex = 0; iIndex < aItems.length; iIndex++) {
				 this.renderItem(rm, aItems[iIndex], control, iIndex, aItems.length);
			}

			// dummy keyboard handling area
			this.renderDummyArea(rm, control, "after", -1);
			rm.write("</div>");
		};

		/**
		 * Adds grid styles depending on the layout settings
		 *
		 * @param {sap.ui.core.RenderManager} rm the RenderManager that can be used for writing to the render output buffer
		 * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
		 */
		GridContainerRenderer.addGridStyles = function(rm, oControl) {
			var mStyles = oControl._getActiveGridStyles();
			for (var sName in mStyles) {
				rm.addStyle(sName, mStyles[sName]);
			}
		};

		/**
		 * Renders a single item in the grid.
		 * @param {sap.ui.core.RenderManager} rm The RenderManager that can be used for writing to the render output buffer
		 * @param {sap.ui.core.Control} oItem The grid item
		 * @param {sap.ui.core.Control} oControl The grid
		 */
		GridContainerRenderer.renderItem = function(rm, oItem, oControl, iIndex, iSize) {
			var mStylesInfo = GridContainerRenderer.getStylesForItemWrapper(oItem, oControl),
				mStyles = mStylesInfo.styles,
				aClasses = mStylesInfo.classes;

			rm.write("<div");

			rm.writeAttribute("id", oControl.getId() + "-item-" + iIndex);
			rm.writeAccessibilityState(oControl, {
				role: "listitem",
				keyshortcuts: oControl._oRb.getText("GRIDCONTAINER_ITEM_KEYSHORTCUTS"),
				labelledby: oItem.getId()
			});
			mStyles.forEach(function (sValue, sKey) {
				rm.addStyle(sKey, sValue);
			});

			aClasses.forEach(function (sValue) {
				rm.addClass(sValue);
			});

			rm.writeAttribute("tabindex", "0");
			rm.writeClasses();
			rm.writeStyles();
			rm.write(">");

			oItem.addStyleClass("sapFGridContainerItemInnerWrapper");
			rm.writeClasses();
			rm.renderControl(oItem);
			rm.write("</div>");
		};

		/**
		 * Gets styles and classes which has to be applied to an item's wrapper element.
		 * @param {sap.ui.core.Control} oItem The grid item
		 * @param {sap.ui.core.Control} oControl The grid
		 * @returns {object} An object containing styles and classes
		 */
		GridContainerRenderer.getStylesForItemWrapper = function(oItem, oControl) {
			var mStyles = new Map(),
				aClasses = ["sapFGridContainerItemWrapper"];

			var oLayoutData = oItem.getLayoutData();
			if (oLayoutData) {
				var iItemColumns = oLayoutData.getColumns(),
					iTotalColumns = oControl.getActiveLayoutSettings().getColumns();

				if (iItemColumns && iTotalColumns) {
					// do not allow items to have more columns than total columns, else the layout brakes
					iItemColumns = Math.min(iItemColumns, iTotalColumns);
				}

				if (iItemColumns) {
					mStyles.set("grid-column", "span " + iItemColumns);
				}

				if (oControl.getInlineBlockLayout()) {
					mStyles.set("grid-row", "span 1");
				} else if (oLayoutData.getRows() || oLayoutData.getMinRows()) {
					mStyles.set("grid-row", "span " + oLayoutData.getActualRows());
				}

				if (!oLayoutData.hasAutoHeight()) {
					aClasses.push("sapFGridContainerItemFixedRows");
				}
			}

			if (!oItem.getVisible()) {
				aClasses.push("sapFGridContainerInvisiblePlaceholder");
			}

			return {
				styles: mStyles,
				classes: aClasses
			};
		};

		GridContainerRenderer.renderDummyArea = function(rm, control, sAreaId, iTabIndex) {
			rm.write("<div");
			rm.writeAttribute("id", control.getId() + "-" + sAreaId);
			rm.writeAttribute("tabindex", iTabIndex);
			rm.class("sapFGridContainerDummyArea");
			rm.writeClasses();
			rm.writeStyles();
			rm.write(">");
			rm.write("</div>");
		};

		return GridContainerRenderer;

	}, /* bExport= */ true);
