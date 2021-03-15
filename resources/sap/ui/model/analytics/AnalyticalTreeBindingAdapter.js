/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/TreeBinding","./AnalyticalBinding","sap/ui/model/TreeAutoExpandMode","sap/ui/model/ChangeReason","sap/ui/model/odata/ODataTreeBindingAdapter","sap/ui/model/TreeBindingAdapter","sap/ui/model/TreeBindingUtils","sap/base/assert","sap/base/Log","sap/ui/thirdparty/jquery"],function(e,t,o,n,a,i,r,s,d,u){"use strict";var l=function(){if(!(this instanceof e)||this._bIsAdapted){return}a.apply(this);for(var t in l.prototype){if(l.prototype.hasOwnProperty(t)){this[t]=l.prototype[t]}}this.setAutoExpandMode(this.mParameters.autoExpandMode||o.Bundled)},h="sap.ui.model.analytics.AnalyticalTreeBindingAdapter";l.prototype.getGrandTotalContext=function(){if(this._oRootNode){return this._oRootNode.context}};l.prototype.getGrandTotalNode=function(){if(this._oRootNode){return this._oRootNode}};l.prototype.getGrandTotalContextInfo=function(){return this._oRootNode};l.prototype.getLength=function(){if(!this._oRootNode){return 0}if(this._oRootNode&&this._oWatermark&&this._isRunningInAutoExpand(o.Bundled)){if(this._oWatermark.groupID===this._oRootNode.groupID){return this._oRootNode.magnitude+this._oRootNode.numberOfTotals}return this._oWatermark.absoluteNodeIndex+this._oRootNode.numberOfTotals+1}return this._oRootNode.magnitude+this._oRootNode.numberOfTotals};l.prototype.getContextByIndex=function(e){if(this._oRootNode&&e===this.getLength()-1&&this.providesGrandTotal()&&this.hasTotaledMeasures()){return this._oRootNode.context}var t=this.findNode(e);if(!t||!t.context){t={context:this.getContexts(e,1,0)[0]}}return t?t.context:undefined};l.prototype.getNodeByIndex=function(e){if(e===this.getLength()-1&&this.providesGrandTotal()&&this.hasTotaledMeasures()){return this._oRootNode}if(e>=this.getLength()){return undefined}return this.findNode(e)};l.prototype._isNodeSelectable=function(e){if(!e){return false}return e.isLeaf&&!e.isArtificial};l.prototype.getContexts=function(e,t,n,a){if(!t){t=this.oModel.iSizeLimit}if(!n){n=0}this._iPageSize=t;this._iThreshold=Math.max(this._iThreshold,n);this._aRowIndexMap=[];this._buildTree(e,t);var i=[];if(this._oRootNode){i=this._retrieveNodeSection(this._oRootNode,e,t)}this._updateRowIndexMap(i,e);var r=[];var s;for(var d=0;d<i.length;d++){var l=i[d];if(this._isRunningInAutoExpand(o.Bundled)&&this._oWatermark){if(l.groupID===this._oWatermark.groupID||this._oWatermark.groupID===this._oRootNode.groupID&&e+d+1==this.getLength()-1){this._autoExpandPaging()}}if(!l.context){s=s||{};var h=l.parent;s[h.groupID]=h;this._updateNodeSections(h.groupID,{startIndex:l.positionInParent,length:1})}r.push(l.context)}if(s){var p=this;u.each(s,function(e,t){t.magnitude=0;t.numberOfTotals=0;p._loadChildContexts(t,{absoluteNodeIndex:t.absoluteNodeIndex})});r=[];for(var f=0;f<i.length;f++){var l=i[f];r.push(l.context)}}if(a){return i}else{return r}};l.prototype._autoExpandPaging=function(){s(this._oWatermark,"No watermark was set!");s(this._isRunningInAutoExpand(o.Bundled),"Optimised AutoExpand Paging can only be used with TreeAutoExpandMode.Bundled!");var e=this.getNodeContexts(this._oWatermark.context,{startIndex:this._oWatermark.startIndex,length:this._iPageSize,threshold:this._iThreshold,level:this._oWatermark.level,numberOfExpandedLevels:this._oWatermark.autoExpand});return e};l.prototype._afterMatchHook=function(e,t,o,n,a,i){if(e.sumNode&&e!==this._oRootNode){if(t.length===o){return true}var r=n.call(this,e.sumNode,e.sumNode.positionInParent,i);if(r){t.push(e.sumNode)}}};l.prototype._afterMapHook=function(e,t){if(e.sumNode&&e!==this._oRootNode){t.call(this,e.sumNode)}};l.prototype._createSumNode=function(e){var t;if(this.bProvideGrandTotals&&!this.mParameters.sumOnTop&&this.hasTotaledMeasures()&&e.children.length>1){t=this._createNode({parent:e.parent,positionInParent:e.children.length,context:e.context,level:e.level});t.nodeState=this._createNodeState({groupID:t.groupID,sum:true,expanded:false})}return t};l.prototype._buildTree=function(e,t){this._oRootNode=undefined;this._oWatermark=undefined;var n=this.mParameters&&this.getNumberOfExpandedLevels();var a=this.getRootContexts({startIndex:0,length:this._iPageSize,threshold:this._iThreshold,numberOfExpandedLevels:this._autoExpandMode===o.Bundled?n:undefined});var i;if(a==null){d.warning("AnalyticalTreeBindingAdapter: No Dimensions given. An artificial rootContext has be created. Please check your Table/Service definition for dimension columns!")}else{i=a[0]}if(!i){return}var r=this._getNodeState("/");if(!r){r=this._updateTreeState({groupID:"/",expanded:true,sum:true});this._updateNodeSections("/",{startIndex:0,length:t})}this._oRootNode=this._createNode({context:i,parent:null,level:0,nodeState:r,isLeaf:false,autoExpand:n,absoluteNodeIndex:-1});this._oRootNode.isArtificial=true;this._loadChildContexts(this._oRootNode,{absoluteNodeIndex:-1})};l.prototype._loadChildContexts=function(e,t){var n=e.nodeState;var a=this.getGroupSize(e.context,e.level);if(a>=0){if(!e.children[a-1]){e.children[a-1]=undefined}if(e.level===this.aAggregationLevel.length){n.leafCount=a}e.sumNode=this._createSumNode(e)}for(var i=0;i<n.sections.length;i++){var r=n.sections[i];if(r.startIndex>e.children.length){continue}var s;if(a===-1){s=r.length}else{s=Math.min(r.length,a-r.startIndex)}var u=false;if(e.autoExpand>=0&&this._isRunningInAutoExpand(o.Bundled)){u=true;s=Math.max(0,a)}var l=this.getNodeContexts(e.context,{startIndex:r.startIndex,length:s,threshold:u?0:this._iThreshold,level:e.level,supressRequest:u});for(var h=0;h<l.length;h++){var p=l[h];var f=h+r.startIndex;var g=e.children[f];var c={context:l[h],parent:e,level:e.level+1,positionInParent:f,autoExpand:Math.max(e.autoExpand-1,-1),absoluteNodeIndex:++t.absoluteNodeIndex};if(g){g.context=c.context;g.parent=c.parent;g.level=c.level;g.positionInParent=c.positionInParent;g.magnitude=0;g.numberOfTotals=0;g.totalNumberOfLeafs=0;g.autoExpand=c.autoExpand;g.absoluteNodeIndex=c.absoluteNodeIndex;var x;if(p){x=this._calculateGroupID(g)}g.groupID=x}else{g=this._createNode(c)}g.nodeState=this._getNodeState(g.groupID);if(!g.nodeState){g.nodeState=this._createNodeState({groupID:g.groupID,expanded:false})}g.nodeState.parentGroupID=e.groupID;g.isLeaf=!this.nodeHasChildren(g);e.children[f]=g;if(g.isLeaf){e.numberOfLeafs+=1}if(g.parent.nodeState.selectAllMode&&!this._mTreeState.deselected[g.groupID]&&g.isLeaf){this.setNodeSelection(g.nodeState,true)}if((g.autoExpand>=0||g.nodeState.expanded)&&this.isGrouped()){if(!this._mTreeState.collapsed[g.groupID]){if(g.autoExpand>=0&&g.parent.nodeState.selectAllMode&&!this._mTreeState.deselected[g.groupID]){if(g.nodeState.selectAllMode===undefined){g.nodeState.selectAllMode=true}}this._updateTreeState({groupID:g.nodeState.groupID,fallbackNodeState:g.nodeState,expanded:true});this._loadChildContexts(g,t)}e.magnitude+=g.magnitude;e.numberOfTotals+=g.numberOfTotals;e.numberOfLeafs+=g.numberOfLeafs}if(g&&g.isLeaf){e.totalNumberOfLeafs=a}else{e.totalNumberOfLeafs+=g.totalNumberOfLeafs}}}a=this._isRunningInAutoExpand(o.Bundled)?e.children.length:a;e.magnitude+=Math.max(a||0,0);if(!a&&!this._isRunningInAutoExpand(o.Bundled)){d.warning("AnalyticalTreeBindingAdapter: iMaxGroupSize("+a+") is undefined for node '"+e.groupID+"'!")}if(e.sumNode||e===this._oRootNode&&this.providesGrandTotal()&&this.hasTotaledMeasures()){e.numberOfTotals+=1}if(this._isRunningInAutoExpand(o.Bundled)&&e.autoExpand!=-1){if(!this._oWatermark&&!e.isLeaf&&!this.mFinalLength[e.groupID]){this._oWatermark={groupID:e.groupID,context:e.context,absoluteNodeIndex:e.absoluteNodeIndex,startIndex:e.children.length,level:e.level,autoExpand:e.autoExpand}}}};l.prototype._calculateGroupID=function(e){var t;var o=this.aAggregationLevel.length;if(!this.isGrouped()&&e&&e.positionInParent){t="/"+e.positionInParent+"/"}else{if(e.level>o){t=this._getGroupIdFromContext(e.context,o);s(e.positionInParent!=undefined,"If the node level is greater than the number of grouped columns, the position of the node to its parent must be defined!");t+=e.positionInParent+"/"}else{t=this._getGroupIdFromContext(e.context,e.level)}}return t};l.prototype.collapse=function(e){var t,a;if(typeof e==="object"){t=e}else if(typeof e==="number"){a=this.findNode(e);s(a&&a.nodeState,"AnalyticalTreeBindingAdapter.collapse("+e+"): No node found!");if(!a){return}t=a.nodeState}this._updateTreeState({groupID:t.groupID,expanded:false});t.selectAllMode=false;var i=false;if(this.bCollapseRecursive||this._isRunningInAutoExpand(o.Bundled)){var r=t.groupID;if(this._isRunningInAutoExpand(o.Bundled)&&this._oWatermark&&(typeof r=="string"&&r.length>0&&this._oWatermark.groupID.startsWith(r))){if(a&&a.parent){this._oWatermark={groupID:a.parent.groupID,context:a.parent.context,absoluteNodeIndex:a.parent.absoluteNodeIndex,startIndex:a.positionInParent+1,level:a.parent.level,autoExpand:a.parent.autoExpand}}this._autoExpandPaging();i=true}var d=this;u.each(this._mTreeState.expanded,function(e,t){if(typeof r=="string"&&r.length>0&&e.startsWith(r)){d._updateTreeState({groupID:e,expanded:false})}});var l=[];u.each(this._mTreeState.selected,function(e,t){if(typeof r=="string"&&r.length>0&&e.startsWith(r)){t.selectAllMode=false;d.setNodeSelection(t,false);l.push(e)}});if(l.length){var h={rowIndices:[]};var p=0;this._map(this._oRootNode,function(e){if(!e||!e.isArtificial){p++}if(e&&l.indexOf(e.groupID)!==-1){if(e.groupID===this._sLeadSelectionGroupID){h.oldIndex=p;h.leadIndex=-1}h.rowIndices.push(p)}});this._publishSelectionChanges(h)}}if(!i){this._fireChange({reason:n.Collapse})}};l.prototype.collapseToLevel=function(e){this.setNumberOfExpandedLevels(e,true);i.prototype.collapseToLevel.call(this,e)};l.prototype.nodeHasChildren=function(e){s(e,"AnalyticalTreeBindingAdapter.nodeHasChildren: No node given!");if(!e||!e.parent||e.nodeState.sum){return false}else if(e.isArtificial){return true}else{return t.prototype.hasChildren.call(this,e.context,{level:e.level})}};l.prototype.resetData=function(e,o){var a=t.prototype.resetData.call(this,e,o);this._aRowIndexMap=[];this._oRootNode=undefined;this._oWatermark=undefined;this._iPageSize=0;this._iThreshold=0;if(!o||o.reason!==n.Sort){this.clearSelection();this._createTreeState(true)}return a};l.prototype.hasTotaledMeasures=function(){var e=false;u.each(this.getMeasureDetails()||[],function(t,o){if(o.analyticalInfo.total){e=true;return false}});return e};l.prototype.isGrouped=function(){return this.aAggregationLevel.length>0};l.prototype._isRunningInAutoExpand=function(e){if(this.getNumberOfExpandedLevels()>0&&this._autoExpandMode===e){return true}else{return false}};l.prototype.setNumberOfExpandedLevels=function(e,t){var o;e=e||0;if(e<0){d.warning("Number of expanded levels was set to 0. Negative values are prohibited",this,h);e=0}o=this.aAggregationLevel.length;if(e>o){d.warning("Number of expanded levels was reduced from "+e+" to "+o+" which is the number of grouped dimensions",this,h);e=o}if(!t){this.resetData()}this.mParameters.numberOfExpandedLevels=e};l.prototype.getNumberOfExpandedLevels=function(){return this.mParameters.numberOfExpandedLevels};l.prototype._getSelectableNodesCount=function(e){if(e){return e.totalNumberOfLeafs}else{return 0}};return l},true);