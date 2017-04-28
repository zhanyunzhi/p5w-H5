/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

__webpack_require__(6);

__webpack_require__(7);

var _common = __webpack_require__(8);

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//引入common文件
//引入sass文件
function index() {
    $(function () {
        function getTransforms(translate3d) {
            return {
                '-webkit-transform': translate3d,
                '-moz-transform': translate3d,
                '-ms-transform': translate3d,
                'transform': translate3d
            };
        }
        var sections = $('.section');
        var translate3d = 'translate3d(0, 0, 0)';
        var timer1 = null;
        var timer2 = null;
        var bootstrap = function bootstrap() {
            $('#qj').fullpage({
                continuousVertical: true,
                scrollingSpeed: 700,
                afterRender: function afterRender() {
                    var effects = sections.eq(0).find('[qj-effect]');
                    for (var j = 0; j < effects.length; j++) {
                        effects.eq(j).addClass(effects.eq(j).attr('qj-effect'));
                    }
                },
                onLeave: function onLeave(index, nextIndex, direction) {},
                afterLoad: function afterLoad(anchorLink, index) {
                    //anchorLink 是锚链接的名称，index 是序号，从1开始计算
                    if (index == 1) {
                        $("#qj").css(getTransforms(translate3d)); //循环回到第一页时强制定位页面到指定位置，不然在iphone下会有问题
                    }
                    if (index == 8) {
                        setTimeout(function () {
                            $("#logo").animate({ opacity: '1' }, 1000);
                        }, 2000);
                        setTimeout(function () {
                            $("#code").animate({ opacity: '1' }, 1000);
                        }, 4000);
                        timer1 = setInterval(function () {
                            $("#logo").fadeIn(1000);
                            setTimeout(function () {
                                $("#logo").fadeOut(1000);
                            }, 4000);
                        }, 8000);
                        timer2 = setInterval(function () {
                            $("#code").fadeOut(1000);
                            setTimeout(function () {
                                $("#code").fadeIn(1000);
                            }, 4000);
                        }, 8000);
                    } else {
                        $("#logo").animate({ opacity: '0' }, 10);
                        $("#code").animate({ opacity: '0' }, 10);
                        timer1 && clearInterval(timer1);
                        timer2 && clearInterval(timer2);
                    }
                    var i = 0;
                    for (i; i < sections.length; i++) {
                        var effects = sections.eq(i).find('[qj-effect]');
                        if (i === index - 1) {
                            for (var j = 0; j < effects.length; j++) {
                                effects.eq(j).addClass(effects.eq(j).attr('qj-effect'));
                            }
                        } else {
                            for (var j = 0; j < effects.length; j++) {
                                effects.eq(j).removeClass(effects.eq(j).attr('qj-effect'));
                            }
                        }
                    }
                }
            });
        };
        var shareTitle = $('#wxTitle').html(); //微信分享的标题
        var shareDesc = $('#wxDesc').html(); //微信分享的描述
        var shareLink = location.href; //微信分享的链接地址
        var shareImg = location.href.split('index.html')[0] + 'assets/fx.png'; //微信分享的图片地址
        var common = new _common2.default();
        common.setWxShare(shareTitle, shareDesc, shareLink, shareImg); //设置微信分享的内容
        common.setMusic(); //设置音乐播放和启动等
        common.loading(bootstrap); //图片预加载，加载完成后再启动fullpage
    });
    return {
        name: 'index'
    };
} //引入mp3文件
/**
 * Created by user on 2017/4/10.
 */
//import tpl from './index.html';          //引入模板
exports.default = index;

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(1);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App() {
  var layer = new _index2.default();
  //document.body.innerHTML = layer.tpl;
}; /**
    * Created by user on 2017/4/10.
    */


new App();

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "music.mp3";

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/**
 * Created by Tiny on 2017/4/17.
 */
function Common(){
    function shareFriend(shareTitle,descContent,lineLink,shareImg) {
        wx.onMenuShareAppMessage({
            title: shareTitle,
            desc: descContent,
            link: lineLink,
            imgUrl: shareImg,
            trigger: function (res) {
                $('#mcover').hide();
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
    }

    function shareTimeline(shareTitle,descContent,lineLink,shareImg) {
        wx.onMenuShareTimeline({
            title: shareTitle,
            link: lineLink,
            imgUrl: shareImg,
            trigger: function (res) {
                $('#mcover').hide();
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
    }

    function shareQQ(shareTitle,descContent,lineLink,shareImg){
        wx.onMenuShareQQ({
            title: shareTitle,
            desc: descContent,
            link: lineLink,
            imgUrl: shareImg,
            trigger: function (res) {
                $('#mcover').hide();
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
    };

    function shareWeibo(shareTitle,descContent,lineLink,shareImg){
        wx.onMenuShareWeibo({
            title: shareTitle,
            desc: descContent,
            link: lineLink,
            imgUrl: shareImg,
            trigger: function (res) {
                $('#mcover').hide();
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
    };
    function setWxShare(share_title, share_desc, share_link,share_img) {
        var url = location.href.split('#').toString();
        $.ajax({
            url: 'http://inews.p5w.net/wx/sign.php',
            type: 'post',
            dataType: 'json',
            data: {'url': url},
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            },
            success: function (signPackage) {
                if (signPackage) {
                    var share_appid = signPackage.appId;
                    var share_nonceStr = signPackage.nonceStr;
                    var share_signature = signPackage.signature;
                    var share_timestamp = signPackage.timestamp;

                    wx.config({
                        debug: false,
                        appId: share_appid,
                        timestamp: share_timestamp,
                        nonceStr: share_nonceStr,
                        signature: share_signature,
                        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo']
                    });

                    wx.ready(function () {

                        //发送给好友
                        shareFriend(share_title, share_desc, share_link, share_img);

                        //分享到朋友圈
                        shareTimeline(share_title, share_desc, share_link, share_img);

                        //分享给QQ好友
                        shareQQ(share_title, share_desc, share_link, share_img);

                        //分享到微博
                        shareWeibo(share_title, share_desc, share_link, share_img);
                    });

                }
            }
        });
    };
    function setMusic(){
        //点击暂停和启动音乐
        var music = document.getElementById("bgMusic");
        $("#audioBtn").click(function(){
            if(music.paused){music.play();
                $("#audioBtn").removeClass("pause").addClass("play");
            }else{music.pause();
                $("#audioBtn").removeClass("play").addClass("pause");
            }
        });
        //手动出发启动音乐
        if(!document.getElementById('bgMusic') == undefined) {
            document.getElementById('bgMusic').play();
        }  //一般情况下，这样就可以自动播放了，但是一些奇葩iPhone机不可以
        document.addEventListener("WeixinJSBridgeReady", function () {  //必须在微信Weixin JSAPI的WeixinJSBridgeReady才能生效
            document.getElementById('bgMusic').play();
            document.getElementById('video').play();
        }, false);
    };
    function loading(callback) {
        var images = [];                //存放所有的图片src的数组
        var imgs = document.images;     //获取所有image节点
        //通过dom方法获取页面中的所有img，包括<img>标签和css中的background-image
        for (var i = 0; i < imgs.length; i++) {
            images.push(imgs[i].src);       //保存dom中的图片src
        }
        var cssImages = getallBgimages();       //获得背景图
        for (var j = 0; j < cssImages.length; j++) {
            images.push(cssImages[j]);          //保存背景图等的src
        }
        console.log(images);
        var imgNum = images.length;
        var loadImgProgress = 0;
        $.imgpreload(images, {
            each: function () {
                var status = $(this).data('loaded') ? 'success' : 'error';
                if (status == 'success') {
                    loadImgProgress++;
                    var percent = Math.ceil(loadImgProgress / imgNum * 100);
                    $('#progress').html(percent + '%');
                }
            },
            all: function () {
                 setTimeout(function(){
                    $('#loading').fadeOut();
                 },300)
                callback();
            }
        });
    }
    //get all images in style（此方法引用其他博客的）
    function getallBgimages() {
        var url, B = [], A = document.getElementsByTagName('*');
        A = B.slice.call(A, 0, A.length);
        while (A.length) {
            url = deepCss(A.shift(), 'background-image');
            if (url) url = /url\(['"]?([^")]+)/.exec(url) || [];
            url = url[1];
            if (url && B.indexOf(url) == -1) B[B.length] = url;
        }
        return B;
    }
    function deepCss (who, css) {
        if (!who || !who.style) return '';
        var sty = css.replace(/\-([a-z])/g, function (a, b) {
            return b.toUpperCase();
        });
        if (who.currentStyle) {
            return who.style[sty] || who.currentStyle[sty] || '';
        }
        var dv = document.defaultView || window;
        return who.style[sty] ||
            dv.getComputedStyle(who, "").getPropertyValue(css) || '';
    }
    Array.prototype.indexOf = Array.prototype.indexOf ||
        function (what, index) {
            index = index || 0;
            var L = this.length;
            while (index < L) {
                if (this[index] === what) return index;
                ++index;
            }
            return -1;
        }

    return {
        setWxShare: setWxShare,
        setMusic: setMusic,
        loading: loading
    };
}
/* harmony default export */ __webpack_exports__["default"] = (Common);


/***/ })
/******/ ]);