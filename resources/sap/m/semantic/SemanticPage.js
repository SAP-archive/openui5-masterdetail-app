/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/semantic/SegmentedContainer","sap/m/semantic/SemanticConfiguration","sap/m/Button","sap/m/Title","sap/m/Page","sap/m/OverflowToolbar","sap/m/ToolbarSpacer","sap/m/Bar","sap/ui/core/CustomData","sap/ui/base/ManagedObject","sap/m/PageAccessibleLandmarkInfo","sap/ui/base/ManagedObjectObserver","sap/ui/core/Control","sap/ui/core/library","sap/m/library","./SemanticPageRenderer","sap/base/Log","sap/ui/thirdparty/jquery"],function(t,e,o,n,r,i,a,s,g,p,u,d,h,l,c,f,_,m){"use strict";var y=c.ButtonType;var S=c.PageBackgroundDesign;var v=c.semantic.SemanticRuleSetType;var C=l.TitleLevel;var P=h.extend("sap.m.semantic.SemanticPage",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Misc",defaultValue:null},titleLevel:{type:"sap.ui.core.TitleLevel",group:"Appearance",defaultValue:C.Auto},showNavButton:{type:"boolean",group:"Appearance",defaultValue:false},showSubHeader:{type:"boolean",group:"Appearance",defaultValue:true},enableScrolling:{type:"boolean",group:"Behavior",defaultValue:true},showFooter:{type:"boolean",group:"Appearance",defaultValue:true},floatingFooter:{type:"boolean",group:"Appearance",defaultValue:false},semanticRuleSet:{type:"sap.m.semantic.SemanticRuleSetType",group:"Misc",defaultValue:v.Classic},backgroundDesign:{type:"sap.m.PageBackgroundDesign",group:"Appearance",defaultValue:S.Standard}},defaultAggregation:"content",aggregations:{subHeader:{type:"sap.m.IBar",multiple:false},content:{type:"sap.ui.core.Control",multiple:true,singularName:"content",forwarding:{getter:"_getPage",aggregation:"content"}},customHeaderContent:{type:"sap.m.Button",multiple:true,singularName:"customHeaderContent"},customFooterContent:{type:"sap.m.Button",multiple:true,singularName:"customFooterContent"},landmarkInfo:{type:"sap.m.PageAccessibleLandmarkInfo",multiple:false,forwarding:{getter:"_getPage",aggregation:"landmarkInfo"}},_page:{type:"sap.m.Page",multiple:false,visibility:"hidden"}},events:{navButtonPress:{}},dnd:{draggable:false,droppable:true},designtime:"sap/m/designtime/semantic/SemanticPage.designtime"}});P.prototype.init=function(){this._oHeaderObserver=new d(P.prototype._updateHeaderVisibility.bind(this));this._currentMode=e._PageMode.display;this._getPage().setCustomHeader(this._getInternalHeader());this._getPage().setFooter(new i(this.getId()+"-footer"));this.setLandmarkInfo(new u);this._getPage().setShowHeader(false)};P.prototype.exit=function(){if(this._oInternalHeader){this._oInternalHeader.destroy();this._oInternalHeader=null}if(this._oWrappedFooter){this._oWrappedFooter.destroy();this._oWrappedFooter=null}if(this._oTitle){this._oTitle.destroy();this._oTitle=null}if(this._oNavButton){this._oNavButton.destroy();this._oNavButton=null}if(this._oHeaderObserver){this._oHeaderObserver.disconnect();this._oHeaderObserver=null}this._oPositionsMap=null};P.prototype.setSubHeader=function(t,e){this._getPage().setSubHeader(t,e);return this};P.prototype.getSubHeader=function(){return this._getPage().getSubHeader()};P.prototype.destroySubHeader=function(t){this._getPage().destroySubHeader(t);return this};P.prototype.getShowSubHeader=function(){return this._getPage().getShowSubHeader()};P.prototype.setShowSubHeader=function(t,e){this._getPage().setShowSubHeader(t,e);this.setProperty("showSubHeader",t,true);return this};P.prototype.getShowFooter=function(){return this._getPage().getShowFooter()};P.prototype.setShowFooter=function(t,e){this._getPage().setShowFooter(t,e);this.setProperty("showFooter",t,true);return this};P.prototype.setFloatingFooter=function(t,e){this._getPage().setFloatingFooter(t,e);this.setProperty("floatingFooter",t,true);return this};P.prototype.setTitle=function(t){var e=this._getTitle();if(e){e.setText(t);if(!e.getParent()){this._getInternalHeader().addContentMiddle(e)}}this.setProperty("title",t,true);return this};P.prototype.setTitleLevel=function(t){this.setProperty("titleLevel",t,true);this._getTitle().setLevel(t);return this};P.prototype.setShowNavButton=function(t){var e=this._getNavButton();if(e){e.setVisible(t);if(!e.getParent()){this._getInternalHeader().addContentLeft(e)}}this.setProperty("showNavButton",t,true);return this};P.prototype.setEnableScrolling=function(t){this._getPage().setEnableScrolling(t);this.setProperty("enableScrolling",t,true);return this};P.prototype.setBackgroundDesign=function(t){this.setProperty("backgroundDesign",t,true);this._getPage().setBackgroundDesign(t);return this};P.prototype.getCustomFooterContent=function(){return this._getSegmentedFooter().getSection("customRight").getContent()};P.prototype.addCustomFooterContent=function(t,e){this._getSegmentedFooter().getSection("customRight").addContent(t,e);return this};P.prototype.indexOfCustomFooterContent=function(t){return this._getSegmentedFooter().getSection("customRight").indexOfContent(t)};P.prototype.insertCustomFooterContent=function(t,e,o){this._getSegmentedFooter().getSection("customRight").insertContent(t,e,o);return this};P.prototype.removeCustomFooterContent=function(t,e){return this._getSegmentedFooter().getSection("customRight").removeContent(t,e)};P.prototype.removeAllCustomFooterContent=function(t){return this._getSegmentedFooter().getSection("customRight").removeAllContent(t)};P.prototype.destroyCustomFooterContent=function(t){var e=this.getCustomFooterContent();if(!e){return this}if(t){this.iSuppressInvalidate++}this._getSegmentedFooter().getSection("customRight").destroy(t);if(!this.isInvalidateSuppressed()){this.invalidate()}if(t){this.iSuppressInvalidate--}return this};P.prototype.getCustomHeaderContent=function(){return this._getSegmentedHeader().getSection("customRight").getContent()};P.prototype.addCustomHeaderContent=function(t,e){this._getSegmentedHeader().getSection("customRight").addContent(t,e);return this};P.prototype.indexOfCustomHeaderContent=function(t){return this._getSegmentedHeader().getSection("customRight").indexOfContent(t)};P.prototype.insertCustomHeaderContent=function(t,e,o){this._getSegmentedHeader().getSection("customRight").insertContent(t,e,o);return this};P.prototype.removeCustomHeaderContent=function(t,e){return this._getSegmentedHeader().getSection("customRight").removeContent(t,e)};P.prototype.removeAllCustomHeaderContent=function(t){return this._getSegmentedHeader().getSection("customRight").removeAllContent(t)};P.prototype.destroyCustomHeaderContent=function(t){var e=this.getCustomHeaderContent();if(!e){return this}if(t){this.iSuppressInvalidate++}this._getSegmentedHeader().getSection("customRight").destroy(t);if(!this.isInvalidateSuppressed()){this.invalidate()}if(t){this.iSuppressInvalidate--}return this};P.prototype.setAggregation=function(t,o,n){var r=this.mAggregations[t];if(r===o){return this}o=this.validateAggregation(t,o,false);var i=this.getMetadata().getManagedAggregation(t).type;if(e.isKnownSemanticType(i)){if(r){this._stopMonitor(r);this._removeFromInnerAggregation(r._getControl(),e.getPositionInPage(i),n)}if(o){this._initMonitor(o);this._addToInnerAggregation(o._getControl(),e.getPositionInPage(i),e.getSequenceOrderIndex(i),n)}return p.prototype.setAggregation.call(this,t,o,true)}return p.prototype.setAggregation.call(this,t,o,n)};P.prototype.destroyAggregation=function(t,o){var n=this.getMetadata().getAggregations()[t];if(n&&e.isKnownSemanticType(n.type)){var r=p.prototype.getAggregation.call(this,t);if(r){this._stopMonitor(r);if(!r._getControl().bIsDestroyed){this._removeFromInnerAggregation(r._getControl(),e.getPositionInPage(n.type),o)}}}return p.prototype.destroyAggregation.call(this,t,r,o)};P.prototype._updateHeaderVisibility=function(){var t=this._getInternalHeader();var e=t.getContentLeft().length===0&&t.getContentMiddle().length===0&&t.getContentRight().length===0;this._getPage().setShowHeader(!e)};P.prototype._getTitle=function(){if(!this._oTitle){this._oTitle=new n(this.getId()+"-title",{text:this.getTitle()})}return this._oTitle};P.prototype._getNavButton=function(){if(!this._oNavButton){this._oNavButton=new o(this.getId()+"-navButton",{type:y.Up,tooltip:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("PAGE_NAVBUTTON_TEXT"),press:m.proxy(this.fireNavButtonPress,this)})}return this._oNavButton};P.prototype._initMonitor=function(t){var o=t._getConfiguration();if(o.triggers){t.attachEvent("press",this._updateCurrentMode,this)}var n=o.states,r=this;if(n){m.each(e._PageMode,function(e,o){if(n[e]){r.attachEvent(e,t._onPageStateChanged,t)}})}};P.prototype._stopMonitor=function(t){t.detachEvent("press",this._updateCurrentMode,this);var o=t._getConfiguration();var n=o.states,r=this;if(n){m.each(e._PageMode,function(e,o){if(n[e]){r.detachEvent(e,t._onPageStateChanged,t)}})}};P.prototype._updateCurrentMode=function(t){var e=t.oSource._getConfiguration();if(typeof e.triggers==="string"){this._currentMode=e.triggers}else{var o=e.triggers.length;if(o&&o>0){for(var n=0;n<o;n++){var r=e.triggers[n];if(r&&r.inState===this._currentMode){this._currentMode=r.triggers;break}}}}this.fireEvent(this._currentMode)};P.prototype._removeFromInnerAggregation=function(t,e,o){var n=this._getSemanticPositionsMap()[e];if(n&&n.oContainer&&n.sAggregation){n.oContainer["remove"+H(n.sAggregation)](t,o)}};P.prototype._addToInnerAggregation=function(t,e,o,n){if(!t||!e){return}var r=this._getSemanticPositionsMap()[e];if(!r||!r.oContainer||!r.sAggregation){return}if(typeof o!=="undefined"){t.addCustomData(new g({key:"sortIndex",value:o}))}return r.oContainer["add"+H(r.sAggregation)](t,n)};P.prototype._getSemanticPositionsMap=function(t,o){if(!this._oPositionsMap){this._oPositionsMap={};this._oPositionsMap[e.prototype._PositionInPage.headerLeft]={oContainer:this._getInternalHeader(),sAggregation:"contentLeft"};this._oPositionsMap[e.prototype._PositionInPage.headerRight]={oContainer:this._getSegmentedHeader().getSection("semanticRight"),sAggregation:"content"};this._oPositionsMap[e.prototype._PositionInPage.headerMiddle]={oContainer:this._getInternalHeader(),sAggregation:"contentMiddle"};this._oPositionsMap[e.prototype._PositionInPage.footerLeft]={oContainer:this._getSegmentedFooter().getSection("semanticLeft"),sAggregation:"content"};this._oPositionsMap[e.prototype._PositionInPage.footerRight_IconOnly]={oContainer:this._getSegmentedFooter().getSection("semanticRight_IconOnly"),sAggregation:"content"};this._oPositionsMap[e.prototype._PositionInPage.footerRight_TextOnly]={oContainer:this._getSegmentedFooter().getSection("semanticRight_TextOnly"),sAggregation:"content"}}return this._oPositionsMap};P.prototype._getPage=function(){var t=this.getAggregation("_page");if(!t){this.setAggregation("_page",new r(this.getId()+"-page"));t=this.getAggregation("_page")}return t};P.prototype._getInternalHeader=function(){if(!this._oInternalHeader){this._oInternalHeader=new s(this.getId()+"-intHeader");if(this._oHeaderObserver){this._oHeaderObserver.observe(this._oInternalHeader,{aggregations:["contentLeft","contentMiddle","contentRight"]})}}return this._oInternalHeader};P.prototype._getAnyHeader=function(){return this._getInternalHeader()};P.prototype._getSegmentedHeader=function(){if(!this._oWrappedHeader){var e=this._getInternalHeader();if(!e){_.error("missing page header",this);return null}this._oWrappedHeader=new t(e,"contentRight");this._oWrappedHeader.addSection({sTag:"customRight"});this._oWrappedHeader.addSection({sTag:"semanticRight"})}return this._oWrappedHeader};P.prototype._getSegmentedFooter=function(){if(!this._oWrappedFooter){var e=this._getPage().getFooter();if(!e){_.error("missing page footer",this);return null}this._oWrappedFooter=new t(e);this._oWrappedFooter.addSection({sTag:"semanticLeft"});this._oWrappedFooter.addSection({sTag:"spacer",aContent:[new a]});this._oWrappedFooter.addSection({sTag:"semanticRight_TextOnly",fnSortFunction:b});this._oWrappedFooter.addSection({sTag:"customRight"});this._oWrappedFooter.addSection({sTag:"semanticRight_IconOnly",fnSortFunction:b})}return this._oWrappedFooter};function H(t){return t.substring(0,1).toUpperCase()+t.substring(1)}function b(t,e){var o=t.data("sortIndex");var n=e.data("sortIndex");if(typeof o==="undefined"||typeof n==="undefined"){_.warning("sortIndex missing",this);return null}return o-n}return P});