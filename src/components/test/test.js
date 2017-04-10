/**
 * Created by user on 2017/4/10.
 */
import tpl from './test.html';          //引入模板
import './test.scss';                   //引入sass文件
function test() {
    return {
        name: 'test',
        tpl: tpl
    }
}

export default test;