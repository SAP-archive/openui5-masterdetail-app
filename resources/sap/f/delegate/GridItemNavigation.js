/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/delegate/ItemNavigation","sap/ui/events/KeyCodes"],function(e,t){"use strict";var a=e.extend("sap.f.delegate.GridItemNavigation",{metadata:{library:"sap.f",properties:{},events:{}}});a.prototype.onsapnext=function(t){e.prototype.onsapnext.call(this,t)};a.prototype.onsapprevious=function(t){e.prototype.onsapprevious.call(this,t)};return a});