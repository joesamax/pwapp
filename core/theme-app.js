;define(function(require,exports){'use strict';var o=require('underscore'),p=require('backbone'),i=require('core/region-manager'),c=require('core/messages'),n=require('core/app'),s=require('core/lib/hooks'),d=require('core/app-dynamic-data'),l=require('core/theme-tpl-tags'),v=require('core/phonegap/utils'),t={};var a=o.extend({},p.Events);t.trigger=function(e,t){a.trigger(e,t)};t.on=function(e,t){if(o.contains(['screen:leave','screen:showed','screen:before-transition','menu:rendered','header:rendered'],e)){i.on(e,t)}else if(o.contains(['refresh:start','refresh:end'],e)){n.on(e,t)}else{a.on(e,t)}};n.on('all',function(e,t){var n=f(e,t),r=s.applyFilters('stop-theme-event',!1,[n,e]);if(!r){if(n.type=='error'||n.type=='info'||n.type=='network'){a.trigger(e,n);a.trigger(n.type,n)}}});var f=function(e,t){var n={event:e,type:'',subtype:t!==undefined&&t.hasOwnProperty('type')?t.type:'',message:'',core_data:t};if(e.indexOf('error:')===0){n.type='error';n.event=e.replace('error:','');if(t.type=='ajax'){n.message=c.get('error_remote_connexion_failed')}else{n.message=c.get('error_occured_undefined')}}else if(e.indexOf('info:')===0){n.type='info';n.event=e.replace('info:','');if(e=='info:no-content'){n.message=c.get('info_no_content')}}else if(e.indexOf('network:')===0){n.type='network';n.event=e.replace('network:','');if(e=='network:online'){n.message=c.get('info_network_online')}else if(e=='network:offline'){n.message=c.get('info_network_offline')}};n.message=s.applyFilters('theme-event-message',n.message,[n,e]);return n},g=function(e,t,n){e=e===!0||e===1||e==='1';t=!o.isUndefined(t)&&o.isString(t)?t:'';n=!o.isUndefined(n)?n:{};return{ok:e,message:t,data:n}};t.filter=function(e,t,n){s.addFilter(e,t,n)};t.action=function(e,t,n){s.addAction(e,t,n)};t.setParam=function(e,t){n.setParam(e,t)};var u=0;t.refresh=function(e,t){u++;n.sync(function(t){i.buildMenu(function(){n.resetDefaultRoute();var r=n.getParam('go-to-default-route-after-refresh');if(r){n.router.default_route()};p.history.stop();p.history.start({silent:!1});u--;if(t){t.resolve(g(!0))};if(e){e()}},!0)},function(e,n){u--;var r=f(e.event,e);if(t){t(r)};var o=g(!1,r.message,r);if(n){n.reject(o)}},!0)};t.isRefreshing=function(){return u>0};t.navigate=function(e){if(!n.isLaunching()){n.router.navigate(e,{trigger:!0})}};t.navigateToDefaultRoute=function(){if(!n.isLaunching()){n.router.default_route()}};t.navigateToPreviousScreen=function(){var e=n.getPreviousScreenLink();a.trigger('navigate:previous-screen',{previous_screen:n.getPreviousScreenData(),current_screen:n.getCurrentScreenData(),previous_screen_link:e});t.navigate(e)};t.reloadCurrentScreen=function(){var e=p.history.getFragment();n.router.navigate('WpakDummyRoute');n.router.navigate(e,{trigger:!0})};t.rerenderCurrentScreen=function(){var e=i.getCurrentView();e.render()};t.getCurrentView=function(){var e=i.getCurrentView();return e};t.getBackButtonDisplay=function(){var e='',t=n.getPreviousScreenData();if(!o.isEmpty(t)){e='show'}else{e='hide'};return e};t.getGetMoreLinkDisplay=function(){var e={display:!1,nb_left:0};var r=n.getCurrentScreenData();if(r.screen_type=='list'){var i=n.components.get(r.component_id);if(i){var t=i.get('data');if(t.hasOwnProperty('ids')){var o=t.total-t.ids.length;e.nb_left=o;e.display=o>0}}};e=s.applyFilters('get-more-link-display',e,[r]);return e};t.getMoreComponentItems=function(e,r){var o=n.getCurrentScreenData();if(o.screen_type==='list'){n.getMoreOfComponent(o.component_id,function(t){var n=i.getCurrentView();n.addPosts(t.new_items);n.render();e(t.is_last,t.new_items,t.nb_left)},function(e){var n=t.getGetMoreLinkDisplay();r(f(e.event,e),n)})}};t.displayPostComments=function(e,r,o){n.getPostComments(e,function(o,i,s){r(o.toJSON(),i.toJSON(),s);t.navigate(n.getScreenFragment('comments',{item_id:e}))},function(e){o(f(e.event,e))})};t.updateCurrentCommentScreen=function(e,t){var r=this.getCurrentScreenObject();if(r.screen_type!=='comments'){return};var o=r.post.id,s=this;n.getPostComments(o,function(t,n){var r=i.getCurrentView();r.comments=t;s.rerenderCurrentScreen();e(t,n)},function(e){t(e)},!0)};t.getComponents=function(){return n.getComponents()};t.getCurrentComponentId=function(){var t='',e=n.getCurrentScreenData();if(e.component_id&&n.componentExists(e.component_id)){t=e.component_id};return t};t.getCurrentComponent=function(){var e=null,r=t.getCurrentComponentId();if(r!==''){e=n.getComponentData(r)};return e};t.liveQuery=function(e,t){var o=null;if(t.success){o=t.success;delete t.success};var r=null;if(t.error){r=t.error;delete t.error};n.liveQuery(e,o,r,t)};t.refreshComponent=function(e){e=e||{};var r=e.component_id?e.component_id:t.getCurrentComponentId(),n={};if(e.success){n.success=e.success};if(e.error){n.error=e.error};if(e.refresh_type){n.type=e.refresh_type};if(e.hasOwnProperty('persistent')){n.persistent=e.persistent};t.liveQuery({wpak_component_slug:r,wpak_query_action:'get-component'},n)};t.refreshComponentItems=function(e,r,i){if(e===undefined){e=l.getCurrentComponentId()};var a=n.components.get(e);if(a){if(r===undefined||r===''||r===0||(o.isArray(r)&&r.length===0)){var s=a.get('data');if(s&&s.ids){r=s.ids}else{r=null}};if(r!==null){t.liveQuery({wpak_component_slug:e,wpak_query_action:'get-items',wpak_items_ids:r},{type:i.hasOwnProperty('refresh_type')?i.refresh_type:'replace-keep-global-items',persistent:i.hasOwnProperty('persistent')?i.persistent:!1,auto_interpret_result:!0,success:function(e){if(i!==undefined&&i.success){var n=e;if(!i.hasOwnProperty('autoformat_answer')||i.autoformat_answer===!0){if(e.globals){n=e.globals;var t=[];o.each(e.globals,function(e,n){t.push(n)});if(t.length===1){if(o.isArray(r)){n=e.globals[t[0]]}else{n=o.first(o.toArray(e.globals[t[0]]))}}}};i.success(n)}},error:function(e){if(i!==undefined&&i.error){i.error(e)}}})}}};t.getDynamicData=function(e){return d.getDynamicData(e)};var m=function(e,t){if(!o.isEmpty(e)){var n=t==undefined?$('body'):$('#'+t);n.removeClass(function(e,t){return(t.match(/\app-\S+/g)||[]).join(' ')});n.addClass('app-'+e.screen_type);n.addClass('app-'+e.fragment)}};t.setAutoContextClass=function(e,t){if(e){i.on('screen:showed',function(e){m(e,t)});m(n.getCurrentScreenData(),t)}};t.getTransitionDirection=function(e,t){var n='default';if(t.screen_type=='list'||t.screen_type=='custom-component'){if(e.screen_type=='single'){n='previous-screen'}else{n='default'}}else if(t.screen_type=='single'){if(e.screen_type=='list'||e.screen_type=='custom-component'){n='next-screen'}else if(e.screen_type=='comments'){n='previous-screen'}else{n='default'}}else if(t.screen_type=='comments'){n='next-screen'}else{n='default'};var n=s.applyFilters('transition-direction',n,[e,t]);return n};t.getNetworkState=function(e){return v.getNetworkState(e)};t.showCustomPage=function(e,t,r,o){if(e===undefined){e='custom'};if(t===undefined){t={}};if(r===undefined){r='auto-custom-page'};if(o===undefined){o=!0};n.showCustomPage(e,t,r,o)};t.addCustomRoute=function(e,t,r){e=e.replace('#','');if(t===undefined){t='custom'};if(r===undefined){r={}};n.addCustomRoute(e,t,r)};t.removeCustomRoute=function(e){e=e.replace('#','');n.removeCustomRoute(e)};t.getItems=function(e,t,r){var o=null;t=t||'posts';r=r||'slice';switch(r){case'slice':o=n.getGlobalItemsSlice(t,e);break;case'array':o=n.getGlobalItems(t,e);break};return o};t.getItem=function(e,t){t=t||'posts';return n.getGlobalItem(t,e)};t.getItemsFromRemote=function(e,t){n.getItemsFromRemote(e,t)};t.getCurrentScreen=function(){return n.getCurrentScreenData()};t.getPreviousScreenInHistory=function(){return n.getPreviousScreenData()};t.getPreviousScreen=function(){return n.getPreviousScreenMemoryData()};t.getHistory=function(){return n.getHistory()};t.getLastHistoryAction=function(){return n.getLastHistoryAction()};t.getCurrentScreenObject=function(){var t={};var e=n.getCurrentScreenData(),r=i.getCurrentView();switch(e.screen_type){case'list':t={title:e.label,component_id:e.component_id,posts:r.posts.toJSON()};o.extend(t,e.data);break;case'single':if(e.data.post){t=e.data.post}else if(e.data.item){t=e.data.item};break;case'comments':t={post:r.post.toJSON(),comments:r.comments.toJSON()};break;case'page':t=e.data.post;t.component=l.getComponent(e.component_id);break;case'custom-page':t={id:e.item_id,route:e.item_id,title:r.custom_page_data&&r.custom_page_data.hasOwnProperty('title')?r.custom_page_data.title:'',data:r.custom_page_data?r.custom_page_data:{},template:r.template_name};break;case'custom-component':t={component_id:e.component_id,title:e.label,route:e.fragment,data:e.data,template:r.template_name};break};t.screen_type=e.screen_type;return t};t.renderMenu=function(){var e=i.getMenuView();if(e){e.render()}};o.extend(exports,t)});