/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device"],function(e){"use strict";var s={apiVersion:2};s.render=function(e,s){var n=s._sSymbolId;e.openStart("svg",s);e.class("sapFIllustration");e.openEnd();e.openStart("use");e.attr("href","#"+n);e.openEnd();e.close("use");e.close("svg")};return s},true);