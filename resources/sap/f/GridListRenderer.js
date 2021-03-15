/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/m/ListBaseRenderer"],function(t,r){"use strict";var e=t.extend(r);e.apiVersion=2;e.renderContainerAttributes=function(t,e){r.renderContainerAttributes.apply(this,arguments);t.class("sapFGridList")};e.renderListStartAttributes=function(t,e){r.renderListStartAttributes.apply(this,arguments);this.renderGridAttributes(t,e)};e.renderGridAttributes=function(t,r){var e=r.getGridLayoutConfiguration();if(e){e.renderSingleGridLayout(t)}else{t.class("sapFGridListDefault")}if(r.isGrouped()){t.class("sapFGridListGroup")}};return e},true);