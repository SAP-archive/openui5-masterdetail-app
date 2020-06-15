/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/ButtonRenderer","sap/ui/core/Renderer"],function(e,r){"use strict";var t=r.extend(e);t.writeImgHtml=function(e,r){var t=r.getAvatar();if(t){e.renderControl(t)}};return t},true);