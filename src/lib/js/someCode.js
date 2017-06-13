/**
 * Created by Tiny on 2017/6/13.
 */
//运动事件监听            重力感应和摇一摇
if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion',deviceMotionHandler,false);
}
//获取加速度信息
//通过监听上一步获取到的x, y, z 值在一定时间范围内的变化率，进行设备是否有进行晃动的判断。
//而为了防止正常移动的误判，需要给该变化率设置一个合适的临界值。
var SHAKE_THRESHOLD = 4000;
var last_update = 0;
var speed = 30;//速度
var x, y, z, last_x = 0, last_y = 0, last_z = 0;
function deviceMotionHandler(eventData) {
    var acceleration =eventData.accelerationIncludingGravity;
    var curTime = new Date().getTime();
    if ((curTime-last_update)> 10) {
        var diffTime = curTime -last_update;
        last_update = curTime;
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;
        var speed = Math.abs(x +y + z - last_x - last_y - last_z) / diffTime * 10000;
        if (speed > SHAKE_THRESHOLD) {
            alert("你中奖啦！");  // Do something
        }
        if(Math.abs(x-last_x) > speed || Math.abs(y-last_y) > speed || Math.abs(z-last_z) > speed) {
            //简单的摇一摇触发代码
            alert('触发了重力感应');
        }
        last_x = x;
        last_y = y;
        last_z = z;
    }
}