!function(e){function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}var t={};n.m=e,n.c=t,n.i=function(e){return e},n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=4)}([,function(e,n,t){"use strict";function i(){var e=$("#wxTitle").html(),n=$("#wxDesc").html(),t=location.href,i=location.href.split("index.html")[0]+"assets/fx.png",r=new u.default;return r.setWxShare(e,n,t,i),r.setMusic(),{name:"index"}}Object.defineProperty(n,"__esModule",{value:!0}),t(5),t(6);var r=t(7),u=function(e){return e&&e.__esModule?e:{default:e}}(r);n.default=i},,,function(e,n,t){"use strict";var i=t(1),r=function(e){return e&&e.__esModule?e:{default:e}}(i);new function(){new r.default}},function(e,n){},function(e,n,t){e.exports=t.p+"music.mp3"},function(e,n,t){"use strict";function i(){function e(e,n,t,i){wx.onMenuShareAppMessage({title:e,desc:n,link:t,imgUrl:i,trigger:function(e){$("#mcover").hide()},fail:function(e){alert(JSON.stringify(e))}})}function n(e,n,t,i){wx.onMenuShareTimeline({title:e,link:t,imgUrl:i,trigger:function(e){$("#mcover").hide()},fail:function(e){alert(JSON.stringify(e))}})}function t(e,n,t,i){wx.onMenuShareQQ({title:e,desc:n,link:t,imgUrl:i,trigger:function(e){$("#mcover").hide()},fail:function(e){alert(JSON.stringify(e))}})}function i(e,n,t,i){wx.onMenuShareWeibo({title:e,desc:n,link:t,imgUrl:i,trigger:function(e){$("#mcover").hide()},fail:function(e){alert(JSON.stringify(e))}})}function r(r,u,o,a){var c=location.href.split("#").toString();$.ajax({url:"http://inews.p5w.net/wx/sign.php",type:"post",dataType:"json",data:{url:c},error:function(e,n,t){},success:function(c){if(c){var s=c.appId,l=c.nonceStr,f=c.signature,d=c.timestamp;wx.config({debug:!1,appId:s,timestamp:d,nonceStr:l,signature:f,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo"]}),wx.ready(function(){e(r,u,o,a),n(r,u,o,a),t(r,u,o,a),i(r,u,o,a)})}}})}function u(){var e=document.getElementById("bgMusic");$("#audioBtn").click(function(){e.paused?(e.play(),$("#audioBtn").removeClass("pause").addClass("play")):(e.pause(),$("#audioBtn").removeClass("play").addClass("pause"))}),document.getElementById("bgMusic").play(),document.addEventListener("WeixinJSBridgeReady",function(){document.getElementById("bgMusic").play(),document.getElementById("video").play()},!1)}return{setWxShare:r,setMusic:u}}Object.defineProperty(n,"__esModule",{value:!0}),n.default=i}]);