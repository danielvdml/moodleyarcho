YUI.add("moodle-atto_table-button",function(e,t){var n="atto_table",r='<form class="{{CSS.FORM}}"><label for="{{elementid}}_atto_table_caption">{{get_string "caption" component}}</label><input class="{{CSS.CAPTION}} fullwidth" id="{{elementid}}_atto_table_caption" required /><br/><br/><label for="{{elementid}}_atto_table_headers" class="sameline">{{get_string "headers" component}}</label><select class="{{CSS.HEADERS}}" id="{{elementid}}_atto_table_headers"><option value="columns">{{get_string "columns" component}}</option><option value="rows">{{get_string "rows" component}}</option><option value="both">{{get_string "both" component}}</option></select><br/><div class="mdl-align"><br/><button class="submit" type="submit">{{get_string "updatetable" component}}</button></div></form>',i='<form class="{{CSS.FORM}}"><label for="{{elementid}}_atto_table_caption">{{get_string "caption" component}}</label><input class="{{CSS.CAPTION}} fullwidth" id="{{elementid}}_atto_table_caption" required /><br/><br/><label for="{{elementid}}_atto_table_headers" class="sameline">{{get_string "headers" component}}</label><select class="{{CSS.HEADERS}}" id="{{elementid}}_atto_table_headers"><option value="columns">{{get_string "columns" component}}</option><option value="rows">{{get_string "rows" component}}</option><option value="both">{{get_string "both" component}}</option></select><br/><label for="{{elementid}}_atto_table_rows" class="sameline">{{get_string "numberofrows" component}}</label><input class="{{CSS.ROWS}}" type="number" value="3" id="{{elementid}}_atto_table_rows" size="8" min="1" max="50"/><br/><label for="{{elementid}}_atto_table_columns" class="sameline">{{get_string "numberofcolumns" component}}</label><input class="{{CSS.COLUMNS}}" type="number" value="3" id="{{elementid}}_atto_table_columns" size="8" min="1" max="20"/><br/><div class="mdl-align"><br/><button class="{{CSS.SUBMIT}}" type="submit">{{get_string "createtable" component}}</button></div></form>',s={CAPTION:"caption",HEADERS:"headers",ROWS:"rows",COLUMNS:"columns",SUBMIT:"submit",FORM:"atto_form"},o={CAPTION:"."+s.CAPTION,HEADERS:"."+s.HEADERS,ROWS:"."+s.ROWS,COLUMNS:"."+s.COLUMNS,SUBMIT:"."+s.SUBMIT,FORM:".atto_form"};e.namespace("M.atto_table").Button=e.Base.create("button",e.M.editor_atto.EditorPlugin,[],{_currentSelection:null,_contextMenu:null,_lastTarget:null,_menuOptions:null,initializer:function(){this.addButton({icon:"e/table",callback:this._displayTableEditor,tags:"table"}),e.UA.gecko&&(document.execCommand("enableInlineTableEditing",!1,!1),document.execCommand("enableObjectResizing",!1,!1))},_displayDialogue:function(){this._currentSelection=this.get("host").getSelection();if(this._currentSelection!==!1&&!this._currentSelection.collapsed){var e=this.getDialogue({headerContent:M.util.get_string("createtable",n),focusAfterHide:!0,focusOnShowSelector:o.CAPTION});e.set("bodyContent",this._getDialogueContent()).show()}},_displayTableEditor:function(e){var t=this._getSuitableTableCell();return t?(e.tableCell=t,this._showTableMenu(e)):this._displayDialogue(e)},_stopAtContentEditableFilter:function(e){this.editor.contains(e)},_getEditDialogueContent:function(){var t=e.Handlebars.compile(r);return this._content=e.Node.create(t({CSS:s,elementid:this.get("host").get("elementid"),component:n})),this._content.one(".submit").on("click",this._updateTable,this),this._content},_getDialogueContent:function(){var t=e.Handlebars.compile(i);return this._content=e.Node.create(t({CSS:s,elementid:this.get("host").get("elementid"),component:n})),this._content.one(".submit").on("click",this._setTable,this),this._content},_getSuitableTableCell:function(){var e=null,t=this.get("host");t.getSelectedNodes().some(function(t){if(t.ancestor("td, th, caption",!0,this._stopAtContentEditableFilter)){e=t;var n=t.ancestor("caption",!0,this._stopAtContentEditableFilter);if(n){var r=n.get("parentNode");r&&(e=r.one("td, th"))}return!0}});if(e){var n=t.getSelectionFromNode(e);t.setSelection(n)}return e},_changeNodeType:function(t,n){var r=e.Node.create("<"+n+"></"+n+">");return r.setAttrs(t.getAttrs()),t.get("childNodes").each(function(e){r.append(e.remove())}),t.replace(r),r},_updateTable:function(t){var n,r,i,s;t.preventDefault(),this.getDialogue({focusAfterHide:null}).hide(),n=t.currentTarget.ancestor(o.FORM).one(o.CAPTION),r=t.currentTarget.ancestor(o.FORM).one(o.HEADERS),i=this._lastTarget.ancestor("table"),s=i.one("caption"),s||(s=e.Node.create("<caption></caption"),i.insert(s,0)),s.setHTML(n.get("value")),(r.get("value")==="rows"||r.get("value")==="both")&&i.all("tr").each(function(e){var t=e.all("th, td"),n=t.shift(),r;n.get("tagName")==="TD"?(r=this._changeNodeType(n,"th"),r.setAttribute("scope","row")):n.setAttribute("scope","row"),t.each(function(e){e.get("tagName")==="TH"&&(r=this._changeNodeType(e,"td"),r.removeAttribute("scope"))},this)},this);if(r.get("value")==="columns"||r.get("value")==="both"){var u=i.all("tr"),a=u.shift(),f;a.all("td, th").each(function(e){e.get("tagName")==="TD"?(f=this._changeNodeType(e,"th"),f.setAttribute("scope","col")):e.setAttribute("scope","col")},this),u.each(function(e){var t=e.all("th, td");r.get("value")==="both"&&t.shift(),t.each(function(e){e.get("tagName")==="TH"&&(f=this._changeNodeType(e,"td"),f.removeAttribute("scope"))},this)},this)}this.markUpdated()},_setTable:function(t){var n,r,i,s,u,a,f;t.preventDefault(),this.getDialogue({focusAfterHide:null}).hide(),n=t.currentTarget.ancestor(o.FORM).one(o.CAPTION),r=t.currentTarget.ancestor(o.FORM).one(o.ROWS),i=t.currentTarget.ancestor(o.FORM).one(o.COLUMNS),s=t.currentTarget.ancestor(o.FORM).one(o.HEADERS),this.get("host").setSelection(this._currentSelection);var l="\n";u="<br/>"+l+"<table>"+l,u+="<caption>"+e.Escape.html(n.get("value"))+"</caption>"+l,a=0;if(s.get("value")==="columns"||s.get("value")==="both"){a=1,u+="<thead>"+l+"<tr>"+l;for(f=0;f<parseInt(i.get("value"),10);f++)u+='<th scope="col"></th>'+l;u+="</tr>"+l+"</thead>"+l}u+="<tbody>"+l;for(;a<parseInt(r
.get("value"),10);a++){u+="<tr>"+l;for(f=0;f<parseInt(i.get("value"),10);f++)f!==0||s.get("value")!=="rows"&&s.get("value")!=="both"?u+="<td></td>"+l:u+='<th scope="row"></th>'+l;u+="</tr>"+l}u+="</tbody>"+l,u+="</table>"+l+"<br/>",this.get("host").insertContentAtFocusPoint(u),this.markUpdated()},_findColumnCells:function(){var t=this._getColumnIndex(this._lastTarget),n=this._lastTarget.ancestor("table").all("tr"),r=new e.NodeList,i=new e.NodeList,s=new e.NodeList;return n.each(function(e){var n=e.all("td, th"),o=n.item(t),u=n.item(t-1),a=n.item(t+1);r.push(o),u&&i.push(u),a&&s.push(a)}),{current:r,prev:i,next:s}},_hideInvalidEntries:function(e){var t=this._lastTarget.ancestor("table"),n=this._lastTarget.ancestor("tr"),r=t.all("tr"),i=r.indexOf(n),s=r.item(i-1),o=s?s.one("td"):null;!n||!o?e.one('[data-change="moverowup"]').hide():e.one('[data-change="moverowup"]').show();var u=r.item(i+1),a=n?n.one("td"):!1;!n||!u||!a?e.one('[data-change="moverowdown"]').hide():e.one('[data-change="moverowdown"]').show();var f=this._findColumnCells();f.prev.filter("td").size()>0?e.one('[data-change="movecolumnleft"]').show():e.one('[data-change="movecolumnleft"]').hide();var l=f.current.filter("td").size()>0;f.next.size()>0&&l?e.one('[data-change="movecolumnright"]').show():e.one('[data-change="movecolumnright"]').hide(),f.current.filter("td").size()>0?e.one('[data-change="deletecolumn"]').show():e.one('[data-change="deletecolumn"]').hide(),!n||!n.one("td")?e.one('[data-change="deleterow"]').hide():e.one('[data-change="deleterow"]').show()},_showTableMenu:function(t){t.preventDefault();var r;this._contextMenu||(this._menuOptions=[{text:M.util.get_string("addcolumnafter",n),data:{change:"addcolumnafter"}},{text:M.util.get_string("addrowafter",n),data:{change:"addrowafter"}},{text:M.util.get_string("moverowup",n),data:{change:"moverowup"}},{text:M.util.get_string("moverowdown",n),data:{change:"moverowdown"}},{text:M.util.get_string("movecolumnleft",n),data:{change:"movecolumnleft"}},{text:M.util.get_string("movecolumnright",n),data:{change:"movecolumnright"}},{text:M.util.get_string("deleterow",n),data:{change:"deleterow"}},{text:M.util.get_string("deletecolumn",n),data:{change:"deletecolumn"}},{text:M.util.get_string("edittable",n),data:{change:"edittable"}}],this._contextMenu=new e.M.editor_atto.Menu({items:this._menuOptions}),r=this._contextMenu.get("boundingBox"),r.delegate("click",this._handleTableChange,"a",this)),r=this._contextMenu.get("boundingBox"),this._lastTarget=t.tableCell.ancestor(".editor_atto_content td, .editor_atto_content th",!0),this._hideInvalidEntries(r),e.Array.each(this.get("host").openMenus,function(e){e.set("focusAfterHide",null)});var i=this.buttons[this.name];this.get("host")._setTabFocus(i),this._contextMenu.show(),this._contextMenu.align(this.buttons.table,[e.WidgetPositionAlign.TL,e.WidgetPositionAlign.BL]),this._contextMenu.set("focusAfterHide",i),r.one("a")&&r.one("a").focus(),this.get("host").openMenus=[this._contextMenu]},_handleTableChange:function(e){e.preventDefault(),this._contextMenu.set("focusAfterHide",this.get("host").editor),this._contextMenu.hide(e);switch(e.target.getData("change")){case"addcolumnafter":this._addColumnAfter();break;case"addrowafter":this._addRowAfter();break;case"deleterow":this._deleteRow();break;case"deletecolumn":this._deleteColumn();break;case"edittable":this._editTable();break;case"moverowdown":this._moveRowDown();break;case"moverowup":this._moveRowUp();break;case"movecolumnleft":this._moveColumnLeft();break;case"movecolumnright":this._moveColumnRight()}},_getRowIndex:function(e){var t=e.ancestor("table"),n=e.ancestor("tr");if(!t||!n)return;var r=t.all("tr");return r.indexOf(n)},_getColumnIndex:function(e){var t=e.ancestor("tr");if(!t)return;var n=t.all("td, th");return n.indexOf(e)},_deleteRow:function(){var e=this._lastTarget.ancestor("tr");e&&e.one("td")&&e.remove(!0),this.markUpdated()},_moveRowUp:function(){var e=this._lastTarget.ancestor("tr"),t=e.previous("tr");if(!e||!t)return;e.swap(t),this.markUpdated()},_moveColumnLeft:function(){var e=this._findColumnCells();if(e.current.size()>0&&e.prev.size()>0&&e.current.size()===e.prev.size()){var t=0;for(t=0;t<e.current.size();t++){var n=e.current.item(t),r=e.prev.item(t);n.swap(r)}}this.markUpdated()},_addCaption:function(){var t=this._lastTarget.ancestor("table"),n=t.one("caption");n||t.insert(e.Node.create("<caption>&nbsp;</caption>"),1)},_removeCaption:function(){var e=this._lastTarget.ancestor("table"),t=e.one("caption");t&&t.remove(!0)},_moveColumnRight:function(){var e=this._findColumnCells();if(e.next.size()>0&&e.current.size()===e.next.size()&&e.current.filter("td").size()>0){var t=0;for(t=0;t<e.current.size();t++){var n=e.current.item(t),r=e.next.item(t);n.swap(r)}}this.markUpdated()},_moveRowDown:function(){var e=this._lastTarget.ancestor("tr"),t=e.next("tr");if(!e||!t||!e.one("td"))return;e.swap(t),this.markUpdated()},_editTable:function(){var e=this.getDialogue({headerContent:M.util.get_string("edittable",n),focusAfterHide:!1,focusOnShowSelector:o.CAPTION}),t=this._getEditDialogueContent(),r=t.one(o.CAPTION),i=t.one(o.HEADERS),s=this._lastTarget.ancestor("table"),u=s.one("caption");u?r.set("value",u.getHTML()):r.set("value","");var a="columns";s.one('th[scope="row"]')&&(a="rows",s.one('th[scope="col"]')&&(a="both")),i.set("value",a),e.set("bodyContent",t).show()},_deleteColumn:function(){var t=this._getColumnIndex(this._lastTarget),n=this._lastTarget.ancestor("table"),r=n.all("tr"),i=new e.NodeList,s=!1;r.each(function(e){var n=e.all("td, th"),r=n.item(t);r.get("tagName")==="TD"&&(s=!0),i.push(r)}),s&&i.remove(!0),this.markUpdated()},_addRowAfter:function(){var t=this._lastTarget.ancestor("tr"),n=this._lastTarget.ancestor("table").one("tbody");n||(n=this._lastTarget.ancestor("table"));var r=n.one("tr");r||(r=this._lastTarget.ancestor("table").one("tr"));if(!r)return;var i=r.cloneNode(!0);i.all("th, td").each(function(t){if(t.get("tagName")==="TH"&&t.getAttribute("scope")!=="row"
){var n=e.Node.create("<td></td>");t.replace(n),t=n}t.setHTML("&nbsp;")}),t.ancestor("thead")?(t=r,n.insert(i,t)):t.insert(i,"after"),this.markUpdated()},_addColumnAfter:function(){var t=this._findColumnCells(),n=!0,r=t.next;t.next.size()<=0&&(n=!1,r=t.current),e.each(r,function(e){var t=e.cloneNode();t.setHTML("&nbsp;"),n?e.get("parentNode").insert(t,e):(e.get("parentNode").insert(t,e),e.swap(t))},this),this.markUpdated()}})},"@VERSION@",{requires:["moodle-editor_atto-plugin","moodle-editor_atto-menu","event","event-valuechange"]});
