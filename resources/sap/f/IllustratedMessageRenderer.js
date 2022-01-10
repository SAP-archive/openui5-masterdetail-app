/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={apiVersion:2};e.render=function(e,t){var n=t._getIllustration(),r=t._getTitle(),o=t._getDescription(),s=t.getAdditionalContent();e.openStart("figure",t);e.class("sapFIllustratedMessage");e.openEnd();e.renderControl(n);e.openStart("figcaption").openEnd();e.renderControl(r);e.renderControl(o.addStyleClass("sapFIllustratedMessageDescription"));e.close("figcaption");e.openStart("div");e.class("sapFIllustratedMessageAdditionalContent");e.openEnd();s.forEach(function(t){e.renderControl(t)});e.close("div");e.close("figure")};return e},true);