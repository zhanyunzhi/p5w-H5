/**
 * Created by user on 2017/4/10.
 */
//import tpl from './index.html';          //引入模板
import './index.scss';                   //引入sass文件
import './music.mp3';                   //引入mp3文件
import Common from '../../lib/js/common.js';                   //引入common文件
function index() {
    $(function(){
        function getTransforms(translate3d){
            return {
                '-webkit-transform': translate3d,
                '-moz-transform': translate3d,
                '-ms-transform':translate3d,
                'transform': translate3d
            };
        }
        var sections = $('.section');
        var translate3d = 'translate3d(0, 0, 0)';
        var bootstrap = function(){
            $('#qj').fullpage({
                continuousVertical: true,
                scrollingSpeed:700,
                afterRender: function(){
                    var effects = sections.eq(0).find('[qj-effect]');
                    for(var j=0;j<effects.length;j++){
                        effects.eq(j).addClass(effects.eq(j).attr('qj-effect'));
                    }
                },
                onLeave: function(index, nextIndex, direction ){
                },
                afterLoad: function(anchorLink, index){     //anchorLink 是锚链接的名称，index 是序号，从1开始计算
                    if(index==1){
                        ($("#qj").css(getTransforms(translate3d)));     //循环回到第一页时强制定位页面到指定位置，不然在iphone下会有问题
                    }
                    var i= 0;
                    for(i;i<sections.length;i++){
                        var effects = sections.eq(i).find('[qj-effect]');
                        if(i===index-1){
                            for(var j=0;j<effects.length;j++){
                                effects.eq(j).addClass(effects.eq(j).attr('qj-effect'));
                            }
                        }else{
                            for(var j=0;j<effects.length;j++) {
                                effects.eq(j).removeClass(effects.eq(j).attr('qj-effect'));
                            }
                        }
                    }
                }
            });
        }
        var shareTitle = $('#wxTitle').html();          //微信分享的标题
        var shareDesc = $('#wxDesc').html();            //微信分享的描述
        var shareLink = location.href;                  //微信分享的链接地址
        var shareImg = location.href.split('index.html')[0] + 'assets/fx.jpg';      //微信分享的图片地址
        var common = new Common();
        common.setWxShare(shareTitle, shareDesc, shareLink, shareImg);          //设置微信分享的内容
        common.setMusic();          //设置音乐播放和启动等
        common.loading(bootstrap);       //图片预加载，加载完成后再启动fullpage

        var eAnimates = $('#shade').find('[qj-effect]');
        //打开遮罩并显示指定的二维码图片
        var showQR = function(index){
            $('#shade').show();
            //$('#showQR').addClass('filter-blur');            //背景图加滤镜
            var i= 0;
            for(i;i<sections.length;i++){
                var effects = sections.eq(i).find('[qj-effect]');
                for(var j=0;j<effects.length;j++){
                    effects.eq(j).addClass('filter-blur');
                }
            }
            //弹窗元素去除动画
            for(var j=0;j<eAnimates.length;j++){
                eAnimates.eq(j).removeClass(eAnimates.eq(j).attr('qj-effect'));
                eAnimates.eq(j).hide();
            }
            //指定的弹窗元素加动画
            eAnimates.eq(index).show();
            eAnimates.eq(index).addClass(eAnimates.eq(index).attr('qj-effect'));
            eAnimates.eq(eAnimates.length-1).addClass(eAnimates.eq(eAnimates.length-1).attr('qj-effect')).show();
        }
        //点击空白处关闭弹窗
        var closeQR = function ($event) {
            var $tmp = $('.shade-img1');
            if ($tmp.filter($event.target).length > 0 || $tmp.find($event.target).length > 0) {
                return false;
            }
            $('#shade').hide();           //隐藏弹窗
            //$('#showQR').removeClass('filter-blur');         //背景图去除滤镜
            var i= 0;
            for(i;i<sections.length;i++){
                var effects = sections.eq(i).find('[qj-effect]');
                for(var j=0;j<effects.length;j++){
                    effects.eq(j).removeClass('filter-blur');
                }
            }
            //弹窗元素去除动画
            for(var j=0;j<eAnimates.length;j++){
                eAnimates.eq(j).removeClass(eAnimates.eq(j).attr('qj-effect'));
                eAnimates.eq(j).hide();
            }
        };
        $('#open1').click(function(){
            showQR(0);
        });
        $('#open2').click(function(){
            showQR(1);
        });
        $('#open3').click(function(){
            showQR(2);
        });
        $('#open4').click(function(){
            showQR(3);
        });
        $('#finger').click(function(){
            showQR(0);
        });
        $('#shade').click(function(){
            closeQR(event);
            $('#finger').hide();
        });
    });
    return {
        name: 'index',
        //tpl: tpl
    }
}

export default index;