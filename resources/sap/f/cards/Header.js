/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/f/library","sap/ui/core/Control","sap/m/Text","sap/f/Avatar","sap/ui/Device","sap/f/cards/Data","sap/ui/model/json/JSONModel","sap/f/cards/HeaderRenderer","sap/f/cards/ActionEnablement"],function(t,e,i,a,s,r,n,l,o){"use strict";var p=t.AvatarShape;var g=e.extend("sap.f.cards.Header",{metadata:{interfaces:["sap.f.cards.IHeader"],properties:{title:{type:"string",defaultValue:""},subtitle:{type:"string",defaultValue:""},statusText:{type:"string",defaultValue:""},iconDisplayShape:{type:"sap.f.AvatarShape",defaultValue:p.Circle},iconSrc:{type:"sap.ui.core.URI",defaultValue:""},iconInitials:{type:"string",defaultValue:""}},aggregations:{_title:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_subtitle:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_avatar:{type:"sap.f.Avatar",multiple:false,visibility:"hidden"}},events:{press:{}}},constructor:function(t,i){if(typeof t!=="string"){i=t}if(i&&i.serviceManager){this._oServiceManager=i.serviceManager;delete i.serviceManager}e.apply(this,arguments)}});g.prototype._getTitle=function(){var t=this.getAggregation("_title");if(!t){t=new i({maxLines:3}).addStyleClass("sapFCardTitle");this.setAggregation("_title",t)}return t};g.prototype._getSubtitle=function(){var t=this.getAggregation("_subtitle");if(!t){t=new i({maxLines:2}).addStyleClass("sapFCardSubtitle");this.setAggregation("_subtitle",t)}return t};g.prototype._getAvatar=function(){var t=this.getAggregation("_avatar");if(!t){t=(new a).addStyleClass("sapFCardIcon");this.setAggregation("_avatar",t)}return t};g.prototype.onBeforeRendering=function(){this._getTitle().setText(this.getTitle());this._getSubtitle().setText(this.getSubtitle());this._getAvatar().setDisplayShape(this.getIconDisplayShape());this._getAvatar().setSrc(this.getIconSrc());this._getAvatar().setInitials(this.getIconInitials())};g.prototype._getHeaderAccessibility=function(){var t=this._getTitle()?this._getTitle().getId():"",e=this._getSubtitle()?this._getSubtitle().getId():"",i=this._getAvatar()?this._getAvatar().getId():"";return t+" "+e+" "+i};g.prototype.onAfterRendering=function(){if(s.browser.msie){if(this.getTitle()){this._getTitle().clampText()}if(this.getSubtitle()){this._getSubtitle().clampText()}}};g.prototype.ontap=function(){this.firePress()};g.create=function(t,e){var i={title:t.title,subtitle:t.subTitle};if(t.icon){i.iconSrc=t.icon.src;i.iconDisplayShape=t.icon.shape;i.iconInitials=t.icon.text}if(t.status){i.statusText=t.status.text}if(e){i.serviceManager=e}var a=new g(i);return a};g._handleData=function(t,e){var i=new n;var a=e.request;if(e.json&&!a){i.setData(e.json)}if(a){r.fetch(a).then(function(e){i.setData(e);i.refresh();t.fireEvent("_updated")}).catch(function(t){})}t.setModel(i).bindElement({path:e.path||"/"})};o.enrich(g);return g});