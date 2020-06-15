/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/DataType","sap/ui/core/library"],function(o,t){"use strict";sap.ui.getCore().initLibrary({name:"sap.ui.layout",version:"1.78.1",dependencies:["sap.ui.core"],designtime:"sap/ui/layout/designtime/library.designtime",types:["sap.ui.layout.BackgroundDesign","sap.ui.layout.BlockBackgroundType","sap.ui.layout.BlockLayoutCellColorSet","sap.ui.layout.BlockLayoutCellColorShade","sap.ui.layout.BlockRowColorSets","sap.ui.layout.BoxesPerRowConfig","sap.ui.layout.GridIndent","sap.ui.layout.GridPosition","sap.ui.layout.GridSpan","sap.ui.layout.SideContentFallDown","sap.ui.layout.SideContentPosition","sap.ui.layout.SideContentVisibility","sap.ui.layout.form.ColumnsXL","sap.ui.layout.form.ColumnsL","sap.ui.layout.form.ColumnsM","sap.ui.layout.form.ColumnCells","sap.ui.layout.form.EmptyCells","sap.ui.layout.form.GridElementCells","sap.ui.layout.form.SimpleFormLayout","sap.ui.layout.cssgrid.CSSGridAutoFlow","sap.ui.layout.cssgrid.CSSGridTrack","sap.ui.layout.cssgrid.CSSGridLine","sap.ui.layout.cssgrid.CSSGridGapShortHand"],interfaces:["sap.ui.layout.cssgrid.IGridConfigurable"],controls:["sap.ui.layout.AlignedFlowLayout","sap.ui.layout.DynamicSideContent","sap.ui.layout.FixFlex","sap.ui.layout.Grid","sap.ui.layout.HorizontalLayout","sap.ui.layout.ResponsiveFlowLayout","sap.ui.layout.ResponsiveSplitter","sap.ui.layout.ResponsiveSplitterPage","sap.ui.layout.Splitter","sap.ui.layout.VerticalLayout","sap.ui.layout.BlockLayoutCell","sap.ui.layout.BlockLayoutRow","sap.ui.layout.BlockLayout","sap.ui.layout.form.Form","sap.ui.layout.form.FormLayout","sap.ui.layout.form.GridLayout","sap.ui.layout.form.ColumnLayout","sap.ui.layout.form.ResponsiveGridLayout","sap.ui.layout.form.ResponsiveLayout","sap.ui.layout.form.SimpleForm","sap.ui.layout.cssgrid.CSSGrid"],elements:["sap.ui.layout.BlockLayoutCellData","sap.ui.layout.GridData","sap.ui.layout.ResponsiveFlowLayoutData","sap.ui.layout.SplitterLayoutData","sap.ui.layout.form.FormContainer","sap.ui.layout.form.FormElement","sap.ui.layout.form.GridContainerData","sap.ui.layout.PaneContainer","sap.ui.layout.SplitPane","sap.ui.layout.form.GridElementData","sap.ui.layout.form.ColumnElementData","sap.ui.layout.form.ColumnContainerData","sap.ui.layout.cssgrid.GridItemLayoutData"],extensions:{flChangeHandlers:{"sap.ui.layout.BlockLayout":{moveControls:"default"},"sap.ui.layout.BlockLayoutRow":{moveControls:"default",hideControl:"default",unhideControl:"default"},"sap.ui.layout.BlockLayoutCell":"sap/ui/layout/flexibility/BlockLayoutCell","sap.ui.layout.DynamicSideContent":{moveControls:"default",hideControl:"default",unhideControl:"default"},"sap.ui.layout.form.SimpleForm":"sap/ui/layout/flexibility/SimpleForm","sap.ui.layout.Grid":{moveControls:"default",hideControl:"default",unhideControl:"default"},"sap.ui.layout.FixFlex":{moveControls:"default",hideControl:"default",unhideControl:"default"},"sap.ui.layout.form.Form":"sap/ui/layout/flexibility/Form","sap.ui.layout.form.FormContainer":"sap/ui/layout/flexibility/FormContainer","sap.ui.layout.form.FormElement":"sap/ui/layout/flexibility/FormElement","sap.ui.layout.HorizontalLayout":{moveControls:"default",hideControl:"default",unhideControl:"default"},"sap.ui.layout.Splitter":{moveControls:"default",hideControl:"default",unhideControl:"default"},"sap.ui.layout.VerticalLayout":{moveControls:"default",hideControl:"default",unhideControl:"default"}},"sap.ui.support":{publicRules:true,internalRules:true}}});sap.ui.layout.BackgroundDesign={Solid:"Solid",Transparent:"Transparent",Translucent:"Translucent"};sap.ui.layout.GridIndent=o.createType("sap.ui.layout.GridIndent",{isValid:function(o){return/^(([Xx][Ll](?:[0-9]|1[0-1]))? ?([Ll](?:[0-9]|1[0-1]))? ?([Mm](?:[0-9]|1[0-1]))? ?([Ss](?:[0-9]|1[0-1]))?)$/.test(o)}},o.getType("string"));sap.ui.layout.GridPosition={Left:"Left",Right:"Right",Center:"Center"};sap.ui.layout.GridSpan=o.createType("sap.ui.layout.GridSpan",{isValid:function(o){return/^(([Xx][Ll](?:[1-9]|1[0-2]))? ?([Ll](?:[1-9]|1[0-2]))? ?([Mm](?:[1-9]|1[0-2]))? ?([Ss](?:[1-9]|1[0-2]))?)$/.test(o)}},o.getType("string"));sap.ui.layout.BlockBackgroundType={Default:"Default",Light:"Light",Mixed:"Mixed",Accent:"Accent",Dashboard:"Dashboard"};sap.ui.layout.BlockRowColorSets={ColorSet1:"ColorSet1",ColorSet2:"ColorSet2",ColorSet3:"ColorSet3",ColorSet4:"ColorSet4"};sap.ui.layout.BlockLayoutCellColorSet={ColorSet1:"ColorSet1",ColorSet2:"ColorSet2",ColorSet3:"ColorSet3",ColorSet4:"ColorSet4",ColorSet5:"ColorSet5",ColorSet6:"ColorSet6",ColorSet7:"ColorSet7",ColorSet8:"ColorSet8",ColorSet9:"ColorSet9",ColorSet10:"ColorSet10",ColorSet11:"ColorSet11"};sap.ui.layout.BlockLayoutCellColorShade={ShadeA:"ShadeA",ShadeB:"ShadeB",ShadeC:"ShadeC",ShadeD:"ShadeD",ShadeE:"ShadeE",ShadeF:"ShadeF"};sap.ui.layout.form=sap.ui.layout.form||{};sap.ui.layout.form.GridElementCells=o.createType("sap.ui.layout.form.GridElementCells",{isValid:function(o){return/^(auto|full|([1-9]|1[0-6]))$/.test(o)}},o.getType("string"));sap.ui.layout.form.SimpleFormLayout={ResponsiveLayout:"ResponsiveLayout",GridLayout:"GridLayout",ResponsiveGridLayout:"ResponsiveGridLayout",ColumnLayout:"ColumnLayout"};sap.ui.layout.SideContentVisibility={AlwaysShow:"AlwaysShow",ShowAboveL:"ShowAboveL",ShowAboveM:"ShowAboveM",ShowAboveS:"ShowAboveS",NeverShow:"NeverShow"};sap.ui.layout.SideContentFallDown={BelowXL:"BelowXL",BelowL:"BelowL",BelowM:"BelowM",OnMinimumWidth:"OnMinimumWidth"};sap.ui.layout.SideContentPosition={End:"End",Begin:"Begin"};sap.ui.layout.form.ColumnsXL=o.createType("sap.ui.layout.form.ColumnsXL",{isValid:function(o){if(o>0&&o<=4){return true}else{return false}}},o.getType("int"));sap.ui.layout.form.ColumnsL=o.createType("sap.ui.layout.form.ColumnsL",{isValid:function(o){if(o>0&&o<=3){return true}else{return false}}},o.getType("int"));sap.ui.layout.form.ColumnsM=o.createType("sap.ui.layout.form.ColumnsM",{isValid:function(o){if(o>0&&o<=2){return true}else{return false}}},o.getType("int"));sap.ui.layout.form.ColumnCells=o.createType("sap.ui.layout.form.ColumnCells",{isValid:function(o){if(o>0&&o<=12){return true}else{return false}}},o.getType("int"));sap.ui.layout.form.EmptyCells=o.createType("sap.ui.layout.form.EmptyCells",{isValid:function(o){if(o>=0&&o<12){return true}else{return false}}},o.getType("int"));if(!sap.ui.layout.form.FormHelper){sap.ui.layout.form.FormHelper={createLabel:function(o){throw new Error("no Label control available!")},createButton:function(o,t,a){throw new Error("no Button control available!")},setButtonContent:function(o,t,a,e,u){throw new Error("no Button control available!")},addFormClass:function(){return null},setToolbar:function(o){return o},bArrowKeySupport:true,bFinal:false}}if(!sap.ui.layout.GridHelper){sap.ui.layout.GridHelper={getLibrarySpecificClass:function(){return""},bFinal:false}}sap.ui.layout.cssgrid.CSSGridTrack=o.createType("sap.ui.layout.cssgrid.CSSGridTrack",{isValid:function(o){var t=/(auto|inherit|(([0-9]+|[0-9]*\.[0-9]+)([rR][eE][mM]|[eE][mM]|[eE][xX]|[pP][xX]|[cC][mM]|[mM][mM]|[iI][nN]|[pP][tT]|[pP][cC]|[vV][wW]|[vV][hH]|[vV][mM][iI][nN]|[vV][mM][aA][xX]|%))|calc\(\s*(\(\s*)*[-+]?(([0-9]+|[0-9]*\.[0-9]+)([rR][eE][mM]|[eE][mM]|[eE][xX]|[pP][xX]|[cC][mM]|[mM][mM]|[iI][nN]|[pP][tT]|[pP][cC]|[vV][wW]|[vV][hH]|[vV][mM][iI][nN]|[vV][mM][aA][xX]|%)?)(\s*(\)\s*)*(\s[-+]\s|[*\/])\s*(\(\s*)*([-+]?(([0-9]+|[0-9]*\.[0-9]+)([rR][eE][mM]|[eE][mM]|[eE][xX]|[pP][xX]|[cC][mM]|[mM][mM]|[iI][nN]|[pP][tT]|[pP][cC]|[vV][wW]|[vV][hH]|[vV][mM][iI][nN]|[vV][mM][aA][xX]|%)?)))*\s*(\)\s*)*\))/g;o=o.replace(/(minmax|repeat|fit-content|max-content|min-content|auto-fill|auto-fit|fr|min|max)/g,"");o=o.replace(t,"");o=o.replace(/\(|\)|\+|\-|\*|\/|calc|\%|\,/g,"");o=o.replace(/[0-9]/g,"");o=o.replace(/\s/g,"");return o.length===0},parseValue:function(o){return o.trim().split(/\s+/).join(" ")}},o.getType("string"));sap.ui.layout.cssgrid.CSSGridGapShortHand=o.createType("sap.ui.layout.cssgrid.CSSGridGapShortHand",{isValid:function(o){var a=true,e=o.split(/\s+/);e.forEach(function(o){if(!t.CSSSize.isValid(o)){a=false}});return a},parseValue:function(o){return o.trim().split(/\s+/).join(" ")}},o.getType("string"));sap.ui.layout.cssgrid.CSSGridLine=o.createType("sap.ui.layout.cssgrid.CSSGridLine",{isValid:function(o){return/^(auto|inherit|((span)?(\s)?-?[0-9]+(\s\/\s(span)?(\s)?-?[0-9]*)?)?)$/.test(o)}},o.getType("string"));sap.ui.layout.cssgrid.CSSGridAutoFlow={Row:"Row",Column:"Column",RowDense:"RowDense",ColumnDense:"ColumnDense"};sap.ui.layout.BoxesPerRowConfig=o.createType("sap.ui.layout.BoxesPerRowConfig",{isValid:function(o){return/^(([Xx][Ll](?:[1-9]|1[0-2]))? ?([Ll](?:[1-9]|1[0-2]))? ?([Mm](?:[1-9]|1[0-2]))? ?([Ss](?:[1-9]|1[0-2]))?)$/.test(o)}},o.getType("string"));return sap.ui.layout});