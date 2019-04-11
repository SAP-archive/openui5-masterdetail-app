/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer"],function(e){"use strict";return{render:function(e,i){var t=i._oAcc,r=t.getRootAttributes(),a=i.getTitle();e.write("<div");e.addClass("sapFShellBar");if(i.getShowNotifications()){e.addClass("sapFShellBarNotifications")}e.writeAccessibilityState({role:r.role,label:r.label});e.writeControlData(i);e.writeClasses();e.write(">");if(a){e.write('<div id="'+i.getId()+'-titleHidden" role="heading" aria-level="1" class="sapFShellBarTitleHidden">');e.writeEscaped(a);e.write("</div>")}e.renderControl(i._getOverflowToolbar());e.write("</div>")}}},true);