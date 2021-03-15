/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/Avatar","sap/m/AvatarRenderer","./library"],function(e,r){"use strict";var t=e.extend("sap.f.Avatar",{metadata:{library:"sap.f",properties:{},designtime:"sap/f/designtime/Avatar.designtime"},renderer:r});t.prototype._getDefaultTooltip=function(){return sap.ui.getCore().getLibraryResourceBundle("sap.f").getText("AVATAR_TOOLTIP")};return t});