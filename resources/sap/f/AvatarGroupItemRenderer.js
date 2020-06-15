/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/f/library"],function(a){"use strict";var r={apiVersion:2};r.render=function(a,r){a.openStart("div",r).class("sapFAvatarGroupItem").class("sapFAvatarGroupItem"+r._sAvatarDisplaySize);if(r._getGroupType()==="Individual"){a.attr("tabindex",0)}a.openEnd();a.renderControl(r._getAvatar());a.close("div")};return r},true);