/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={};e.render=function(e,r){e.write("<div");e.writeControlData(r);e.addClass("sapFCardHeaderSideIndicator");e.writeClasses();e.writeStyles();e.write(">");var t=r.getAggregation("_title");if(t){t.addStyleClass("sapFCardHeaderSITitle");e.renderControl(t)}e.write("<div");e.addClass("sapFCardHeaderSINumber");e.writeClasses();e.write(">");var i=r.getAggregation("_number");if(i){e.renderControl(i)}var a=r.getAggregation("_unit");if(a){e.renderControl(a)}e.write("</div>");e.write("</div>")};return e},true);