/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/f/library","sap/m/Button","sap/f/shellBar/ContentButtonRenderer"],function(t,e,a){"use strict";var r=t.AvatarSize;var n=e.extend("sap.f.shallBar.ContentButton",{metadata:{library:"sap.f",aggregations:{avatar:{type:"sap.f.Avatar",multiple:false}}},renderer:a});n.prototype.setAvatar=function(t){t.setDisplaySize(r.XS);return this.setAggregation("avatar",t)};n.prototype._getText=function(){if(this._bInOverflow){return e.prototype._getText.call(this)}return""};return n});