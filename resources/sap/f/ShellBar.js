/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","./shellBar/Factory","./shellBar/AdditionalContentSupport","./shellBar/ResponsiveHandler","./shellBar/Accessibility","./ShellBarRenderer"],function(t,o,e,i,r){"use strict";var s=t.extend("sap.f.ShellBar",{metadata:{library:"sap.f",interfaces:["sap.f.IShellBar"],properties:{title:{type:"string",group:"Appearance",defaultValue:""},secondTitle:{type:"string",group:"Appearance",defaultValue:""},homeIcon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:""},showMenuButton:{type:"boolean",group:"Appearance",defaultValue:false},showNavButton:{type:"boolean",group:"Appearance",defaultValue:false},showCopilot:{type:"boolean",group:"Appearance",defaultValue:false},showSearch:{type:"boolean",group:"Appearance",defaultValue:false},showNotifications:{type:"boolean",group:"Appearance",defaultValue:false},showProductSwitcher:{type:"boolean",group:"Appearance",defaultValue:false},notificationsNumber:{type:"string",group:"Appearance",defaultValue:""}},aggregations:{menu:{type:"sap.m.Menu",multiple:false,forwarding:{getter:"_getMenu",aggregation:"menu"}},profile:{type:"sap.f.Avatar",multiple:false,forwarding:{getter:"_getProfile",aggregation:"avatar"}},additionalContent:{type:"sap.f.IShellBar",multiple:true,singularName:"additionalContent"},_overflowToolbar:{type:"sap.m.OverflowToolbar",multiple:false,visibility:"hidden"}},events:{homeIconPressed:{parameters:{icon:{type:"sap.m.Image"}}},menuButtonPressed:{parameters:{button:{type:"sap.m.Button"}}},navButtonPressed:{parameters:{button:{type:"sap.m.Button"}}},copilotPressed:{parameters:{image:{type:"sap.m.Image"}}},searchButtonPressed:{parameters:{button:{type:"sap.m.Button"}}},notificationsPressed:{parameters:{button:{type:"sap.m.Button"}}},productSwitcherPressed:{parameters:{button:{type:"sap.m.Button"}}},avatarPressed:{parameters:{avatar:{type:"sap.f.Avatar"}}}}}});e.apply(s.prototype);s.prototype.init=function(){this._oFactory=new o(this);this._bOTBUpdateNeeded=true;this._oOverflowToolbar=this._oFactory.getOverflowToolbar();this.setAggregation("_overflowToolbar",this._oOverflowToolbar);this._oToolbarSpacer=this._oFactory.getToolbarSpacer();this._oControlSpacer=this._oFactory.getControlSpacer();this._oResponsiveHandler=new i(this);this._aOverflowControls=[];this._oAcc=new r(this)};s.prototype.onBeforeRendering=function(){var t=this.getNotificationsNumber();this._assignControlsToOverflowToolbar();if(this.getShowNotifications()&&t!==undefined){this._updateNotificationsIndicators(t)}};s.prototype.exit=function(){this._oResponsiveHandler.exit();this._oFactory.destroy();this._oAcc.exit()};s.prototype.setHomeIcon=function(t){if(t){if(!this._oHomeIcon){this._oHomeIcon=this._oFactory.getHomeIcon()}this._oHomeIcon.setSrc(t)}else{this._oHomeIcon=null}this._bOTBUpdateNeeded=true;return this.setProperty("homeIcon",t)};s.prototype.setTitle=function(t){this._sTitle=t;if(t){if(!this._oMegaMenu){this._oMegaMenu=this._oMegaMenu=this._oFactory.getMegaMenu()}this._oMegaMenu.setText(t)}else{this._oMegaMenu=null}this._bOTBUpdateNeeded=true;return this.setProperty("title",t)};s.prototype.setSecondTitle=function(t){if(t){if(!this._oSecondTitle){this._oSecondTitle=this._oFactory.getSecondTitle()}this._oSecondTitle.setText(t)}else{this._oSecondTitle=null}this._bOTBUpdateNeeded=true;return this.setProperty("secondTitle",t)};s.prototype.setShowCopilot=function(t){if(t){if(!this._oCopilot){this._oCopilot=this._oFactory.getCopilot()}}else{this._oCopilot=null}this._bOTBUpdateNeeded=true;return this.setProperty("showCopilot",t)};s.prototype.setShowSearch=function(t){if(t){if(!this._oSearch){this._oSearch=this._oFactory.getSearch()}}else{this._oSearch=null}this._bOTBUpdateNeeded=true;return this.setProperty("showSearch",t)};s.prototype.setShowNotifications=function(t){if(t){if(!this._oNotifications){this._oNotifications=this._oFactory.getNotifications()}}else{this._oNotifications=null}this._bOTBUpdateNeeded=true;return this.setProperty("showNotifications",t)};s.prototype.setShowProductSwitcher=function(t){if(t){if(!this._oProductSwitcher){this._oProductSwitcher=this._oFactory.getProductSwitcher()}}else{this._oProductSwitcher=null}this._bOTBUpdateNeeded=true;return this.setProperty("showProductSwitcher",t)};s.prototype.setShowNavButton=function(t){if(t){if(!this._oNavButton){this._oNavButton=this._oFactory.getNavButton()}}else{this._oNavButton=null}this._bOTBUpdateNeeded=true;return this.setProperty("showNavButton",t)};s.prototype.setShowMenuButton=function(t){if(t){if(!this._oMenuButton){this._oMenuButton=this._oFactory.getMenuButton()}}else{this._oMenuButton=null}this._bOTBUpdateNeeded=true;return this.setProperty("showMenuButton",t)};s.prototype.setNotificationsNumber=function(t){if(this.getShowNotifications()&&t!==undefined){this._updateNotificationsIndicators(t);this._oAcc.updateNotificationsNumber(t)}return this.setProperty("notificationsNumber",t,true)};s.prototype._assignControlsToOverflowToolbar=function(){var t;if(!this._oOverflowToolbar){return}if(!this._bOTBUpdateNeeded){return}this._aOverflowControls=[];this._oOverflowToolbar.removeAllContent();if(this._oNavButton){this._oOverflowToolbar.addContent(this._oNavButton)}if(this._oMenuButton){this._oOverflowToolbar.addContent(this._oMenuButton)}if(this._oHomeIcon){this._oOverflowToolbar.addContent(this._oHomeIcon)}if(this._oMegaMenu){this._oOverflowToolbar.addContent(this._oMegaMenu)}if(this._oSecondTitle){this._oOverflowToolbar.addContent(this._oSecondTitle)}if(this._oControlSpacer){this._oOverflowToolbar.addContent(this._oControlSpacer)}if(this._oCopilot){this._oOverflowToolbar.addContent(this._oCopilot)}this._oOverflowToolbar.addContent(this._oToolbarSpacer);if(this._oSearch){this._oOverflowToolbar.addContent(this._oSearch);this._aOverflowControls.push(this._oSearch)}if(this._oNotifications){this._oOverflowToolbar.addContent(this._oNotifications);this._aOverflowControls.push(this._oNotifications)}t=this.getAdditionalContent();if(t){t.forEach(function(t){this._oOverflowToolbar.addContent(t);this._aOverflowControls.push(t)}.bind(this))}if(this._oAvatarButton){this._oOverflowToolbar.addContent(this._oAvatarButton)}if(this._oProductSwitcher){this._oOverflowToolbar.addContent(this._oProductSwitcher);this._aOverflowControls.push(this._oProductSwitcher)}this._bOTBUpdateNeeded=false};s.prototype._updateNotificationsIndicators=function(t){this._oOverflowToolbar._getOverflowButton().data("notifications",t,true);this._oNotifications.data("notifications",t,true)};s.prototype._getProfile=function(){this._oAvatarButton=this._oFactory.getAvatarButton();return this._oAvatarButton};s.prototype._getMenu=function(){if(!this._oMegaMenu){this._oMegaMenu=this._oFactory.getMegaMenu()}return this._oMegaMenu};s.prototype._getOverflowToolbar=function(){return this._oOverflowToolbar};return s},true);