/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={apiVersion:2};e.render=function(e,r){var n=r.mBindingInfos;e.openStart("div",r).class("sapFCardHeaderSideIndicator");if(n.title||n.number||n.unit){e.class("sapFCardHeaderItemBinded")}e.openEnd();var a=r.getAggregation("_title");if(a){a.addStyleClass("sapFCardHeaderSITitle");e.renderControl(a)}e.openStart("div").class("sapFCardHeaderSINumber");if(n.title||n.number||n.unit){e.class("sapFCardHeaderItemBinded")}e.openEnd();var t=r.getAggregation("_number");if(t){e.renderControl(t)}var i=r.getAggregation("_unit");if(i){e.renderControl(i)}e.close("div");e.close("div")};return e},true);