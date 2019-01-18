/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/UIComponent"],function(t,e){"use strict";var o=e.extend("sap.f.cards.CardComponent",{constructor:function(t){e.apply(this,arguments);this._mSettings=t},metadata:{}});o.prototype.applySettings=function(){e.prototype.applySettings.apply(this,arguments)};o.prototype.createContent=function(){return e.prototype.createContent.apply(this,arguments)};o.prototype.render=function(t){var e=this.getRootControl();if(e&&t){t.renderControl(e)}};return o});