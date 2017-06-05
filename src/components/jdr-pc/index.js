/**
 * Created by user on 2017/4/10.
 */
//import tpl from './index.html';          //引入模板
import './index.scss';                   //引入sass文件
//import './music.mp3';                   //引入mp3文件
import './controllers.js';                   //引入controller文件
import './data.json';                   //引入数据文件
import '../../lib/js/swiper.min.js';                   //引入swiper文件
function index() {
    $(function(){
        /*var swiper2 = new Swiper('.swiper-container2', {
            observer:true,//修改swiper自己或子元素时，自动初始化swiper             不加这两个参数无法滑动
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
            grabCursor: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
        });
        var swiper2016 = new Swiper('.swiper-container2016', {
            observer:true,//修改swiper自己或子元素时，自动初始化swiper             不加这两个参数无法滑动
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
            grabCursor: true,
            pagination: '.swiper-pagination2016',
            paginationType : 'custom',
            paginationClickable: true,
            paginationCustomRender: function (swiper2016, current, total) {
                var _html = '';
                var ss = $('.swiper-pagination2016').data('city').split(',');
                for (var i = 1; i <= total; i++) {
                    if (current == i) {
                        _html += '<li class="" data-index="' + i + '"><img src="./assets/coordinate.png" /><span>' + ss[i-1] + '</span><span class="active">' + ss[i-1] +'</span></li>';
                    }else{
                        _html += '<li class="" data-index="' + i + '"><img src="./assets/coordinate.png" /><span>' + ss[i-1]  + '</span></li>';
                    }
                }
                return _html;//返回所有的页码html
            }
        });
        //给每个页码绑定跳转的事件
        $('.swiper-container2016').on('click','li',function(){
            var index = $(this).data('index');
            swiper2016.slideTo(index-1, 500, false);//切换到第一个slide，速度为1秒
        })
        var swiper2015 = new Swiper('.swiper-container2015', {
            observer:true,//修改swiper自己或子元素时，自动初始化swiper             不加这两个参数无法滑动
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
            grabCursor: true,
            pagination: '.swiper-pagination2015',
            paginationClickable: true,
            paginationBulletRender: function (swiper2015, index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';
            }
        });*/
    });
    return {
        name: 'index',
        //tpl: tpl
    }
}

export default index;