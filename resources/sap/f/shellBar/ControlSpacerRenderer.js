/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var t={};t.render=function(t,e){t.write("<div");t.writeControlData(e);t.addClass("sapMTBSpacer");var i=e.getWidth();if(i){t.addStyle("width",i)}t.writeStyles();t.writeClasses();t.write("></div>")};return t},true);