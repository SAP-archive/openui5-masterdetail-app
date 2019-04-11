/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/m/ListBaseRenderer","sap/ui/layout/cssgrid/GridLayoutBase"],function(r,t,e){"use strict";var i=r.extend(t);i.renderContainerAttributes=function(r,e){r.addClass("sapFGridList");t.renderContainerAttributes.apply(this,arguments)};i.renderListStartAttributes=function(r,e){t.renderListStartAttributes.apply(this,arguments);this.renderGrid(r,e)};i.renderGrid=function(r,t){var e=t.getGridLayoutConfiguration();if(e){e.renderSingleGridLayout(r)}else{r.addClass("sapFGridListDefault")}if(t.isGrouped()){r.addClass("sapFGridListGroup")}};return i});