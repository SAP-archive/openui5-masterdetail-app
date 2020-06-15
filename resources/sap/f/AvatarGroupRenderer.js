/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/f/library"],function(r){"use strict";var o={apiVersion:2};o.render=function(r,o){var t="sapFAvatarGroup",e=o.getGroupType(),a=t+e,s=o.getItems(),i=o._shouldShowMoreButton();r.openStart("div",o).class(t).class(a).class(t+o.getAvatarDisplaySize());if(i){r.class("sapFAvatarGroupShowMore")}if(o._bAutoWidth){r.style("width","auto")}if(e==="Group"){r.attr("role","button")}r.openEnd();for(var n=0;n<o._iAvatarsToShow;n++){r.renderControl(s[n])}if(i){r.renderControl(o._oShowMoreButton)}r.close("div")};return o},true);