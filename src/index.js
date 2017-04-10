/**
 * Created by user on 2017/4/10.
 */
import Layer from './components/test/test.js';
const App = function() {
    var dom = document.getElementById('app');
    var layer = new Layer();
    dom.innerHTML = layer.tpl;
};

new App();