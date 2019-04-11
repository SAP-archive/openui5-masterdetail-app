/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/f/cards/BaseContent","sap/ui/core/ComponentContainer"],function(t,n){"use strict";var e=t.extend("sap.f.cards.ComponentContent",{renderer:{}});e.prototype.setConfiguration=function(e){t.prototype.setConfiguration.apply(this,arguments);if(!e){return}var o=new n({manifest:e.manifest||e,async:true,componentCreated:function(){this.fireEvent("_updated")}.bind(this),componentFailed:function(){this._handleError("Card content failed to create component")}.bind(this)});this.setAggregation("_content",o)};return e});