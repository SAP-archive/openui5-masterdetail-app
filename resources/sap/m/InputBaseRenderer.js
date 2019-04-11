/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/ui/core/library","sap/ui/Device"],function(e,t,i){"use strict";var r=t.TextDirection;var n=t.ValueState;var a={};a.render=function(t,a){var s=a.getValueState(),d=a.getTextDirection(),l=e.getTextAlign(a.getTextAlign(),d),u=sap.ui.getCore().getConfiguration().getAccessibility(),o=a.getAggregation("_beginIcon")||[],c=a.getAggregation("_endIcon")||[],g,p;t.write("<div");t.writeControlData(a);this.addOuterStyles(t,a);this.addControlWidth(t,a);t.writeStyles();t.addClass("sapMInputBase");this.addPaddingClass(t,a);this.addCursorClass(t,a);this.addOuterClasses(t,a);if(!a.getEnabled()){t.addClass("sapMInputBaseDisabled")}if(!a.getEditable()){t.addClass("sapMInputBaseReadonly")}t.writeClasses();this.writeOuterAttributes(t,a);var b=a.getTooltip_AsString();if(b){t.writeAttributeEscaped("title",b)}t.write(">");t.write("<div ");t.writeAttribute("id",a.getId()+"-content");t.addClass("sapMInputBaseContentWrapper");if(!a.getEnabled()){t.addClass("sapMInputBaseDisabledWrapper")}else if(!a.getEditable()){t.addClass("sapMInputBaseReadonlyWrapper")}if(s!==n.None){this.addValueStateClasses(t,a)}if(o.length){g=o.filter(function(e){return e.getVisible()});g.length&&t.addClass("sapMInputBaseHasBeginIcons")}if(c.length){p=c.filter(function(e){return e.getVisible()});p.length&&t.addClass("sapMInputBaseHasEndIcons")}t.writeClasses();this.addWrapperStyles(t,a);t.writeStyles();t.write(">");if(o.length){this.writeIcons(t,o)}t.write("<div");t.addClass("sapMInputBaseDynamicContent");t.writeClasses();this.writeAccAttributes(t,a);t.write(">");this.prependInnerContent(t,a);this.openInputTag(t,a);this.writeInnerId(t,a);if(a.getName()){t.writeAttributeEscaped("name",a.getName())}if(!a.bShowLabelAsPlaceholder&&a._getPlaceholder()){t.writeAttributeEscaped("placeholder",a._getPlaceholder())}if(a.getMaxLength&&a.getMaxLength()>0){t.writeAttribute("maxlength",a.getMaxLength())}if(!a.getEnabled()){t.writeAttribute("disabled","disabled")}else if(!a.getEditable()){t.writeAttribute("readonly","readonly")}if(d!=r.Inherit){t.writeAttribute("dir",d.toLowerCase())}this.writeInnerValue(t,a);if(u){this.writeAccessibilityState(t,a)}if(i.browser.mozilla){if(b){t.writeAttributeEscaped("x-moz-errormessage",b)}else{t.writeAttribute("x-moz-errormessage"," ")}}this.writeInnerAttributes(t,a);t.addClass("sapMInputBaseInner");this.addInnerClasses(t,a);t.writeClasses();if(l){t.addStyle("text-align",l)}this.addInnerStyles(t,a);t.writeStyles();t.write(">");this.writeInnerContent(t,a);this.closeInputTag(t,a);t.write("</div>");if(c.length){this.writeIcons(t,c)}t.write("</div>");this.writeDecorations(t,a);if(u){this.renderAriaLabelledBy(t,a);this.renderAriaDescribedBy(t,a)}t.write("</div>")};a.getAriaRole=function(e){return"textbox"};a.getAriaLabelledBy=function(e){if(this.getLabelledByAnnouncement(e)){return e.getId()+"-labelledby"}};a.getLabelledByAnnouncement=function(e){return e._getPlaceholder()||""};a.renderAriaLabelledBy=function(e,t){var i=this.getLabelledByAnnouncement(t);if(i){e.write("<span");e.writeAttribute("id",t.getId()+"-labelledby");e.writeAttribute("aria-hidden","true");e.addClass("sapUiInvisibleText");e.writeClasses();e.write(">");e.writeEscaped(i.trim());e.write("</span>")}};a.getAriaDescribedBy=function(e){if(this.getDescribedByAnnouncement(e)){return e.getId()+"-describedby"}};a.getDescribedByAnnouncement=function(e){return e.getTooltip_AsString()||""};a.renderAriaDescribedBy=function(e,t){var i=this.getDescribedByAnnouncement(t);if(i){e.write("<span");e.writeAttribute("id",t.getId()+"-describedby");e.writeAttribute("aria-hidden","true");e.addClass("sapUiInvisibleText");e.writeClasses();e.write(">");e.writeEscaped(i.trim());e.write("</span>")}};a.getAccessibilityState=function(e){var t=this.getAriaLabelledBy(e),i=this.getAriaDescribedBy(e),r=this.getAriaRole(e),a={};if(r){a.role=r}if(e.getValueState()===n.Error){a.invalid=true}if(t){a.labelledby={value:t.trim(),append:true}}if(i){a.describedby={value:i.trim(),append:true}}return a};a.writeAccessibilityState=function(e,t){e.writeAccessibilityState(t,this.getAccessibilityState(t))};a.openInputTag=function(e,t){e.write("<input")};a.writeInnerValue=function(e,t){e.writeAttributeEscaped("value",t.getValue())};a.addCursorClass=function(e,t){};a.addPaddingClass=function(e,t){e.addClass("sapMInputBaseHeightMargin")};a.addOuterStyles=function(e,t){};a.addControlWidth=function(e,t){if(t.getWidth()){e.addStyle("width",t.getWidth())}else{e.addClass("sapMInputBaseNoWidth")}};a.addOuterClasses=function(e,t){};a.writeOuterAttributes=function(e,t){};a.writeAccAttributes=function(e,t){};a.addInnerStyles=function(e,t){};a.addWrapperStyles=function(e,t){e.addStyle("width","100%")};a.addInnerClasses=function(e,t){};a.writeInnerAttributes=function(e,t){};a.prependInnerContent=function(e,t){};a.writeInnerContent=function(e,t){};a.writeIcons=function(e,t){e.write("<div");e.writeAttribute("tabindex","-1");e.addClass("sapMInputBaseIconContainer");e.writeClasses();e.write(">");t.forEach(function(t){e.renderControl(t)});e.write("</div>")};a.writeDecorations=function(e,t){};a.closeInputTag=function(e,t){};a.addPlaceholderStyles=function(e,t){};a.addPlaceholderClasses=function(e,t){};a.addValueStateClasses=function(e,t){e.addClass("sapMInputBaseContentWrapperState");e.addClass("sapMInputBaseContentWrapper"+t.getValueState())};a.writeInnerId=function(e,t){e.writeAttribute("id",t.getId()+"-inner")};return a},true);