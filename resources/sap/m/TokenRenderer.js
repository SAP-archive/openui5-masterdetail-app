/*!

* OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.

*/
sap.ui.define(["sap/ui/core/library","sap/ui/core/InvisibleText"],function(e,t){"use strict";var a=e.TextDirection;var i={apiVersion:2};i.render=function(e,a){var r=a._getTooltip(a,a.getEditable()&&a.getProperty("editableParent")),n=[],o={role:"option"};e.openStart("div",a).attr("tabindex","-1").class("sapMToken");if(a.getSelected()){e.class("sapMTokenSelected")}if(!a.getEditable()){e.class("sapMTokenReadOnly")}if(a.getTruncated()){e.class("sapMTokenTruncated")}if(r){e.attr("title",r)}n.push(t.getStaticId("sap.m","TOKEN_ARIA_LABEL"));if(a.getEditable()&&a.getProperty("editableParent")){n.push(t.getStaticId("sap.m","TOKEN_ARIA_DELETABLE"))}if(a.getSelected()){n.push(t.getStaticId("sap.m","TOKEN_ARIA_SELECTED"))}o.describedby={value:n.join(" "),append:true};e.accessibilityState(a,o);e.openEnd();i._renderInnerControl(e,a);if(a.getEditable()){e.renderControl(a._deleteIcon)}e.close("div")};i._renderInnerControl=function(e,t){var i=t.getTextDirection();e.openStart("span").class("sapMTokenText");if(i!==a.Inherit){e.attr("dir",i.toLowerCase())}e.openEnd();var r=t.getText();if(r){e.text(r)}e.close("span")};return i},true);