/**
 * Created by Tiny on 2017/6/13.
 */
//�˶��¼�����            ������Ӧ��ҡһҡ
if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion',deviceMotionHandler,false);
}
//��ȡ���ٶ���Ϣ
//ͨ��������һ����ȡ����x, y, z ֵ��һ��ʱ�䷶Χ�ڵı仯�ʣ������豸�Ƿ��н��лζ����жϡ�
//��Ϊ�˷�ֹ�����ƶ������У���Ҫ���ñ仯������һ�����ʵ��ٽ�ֵ��
var SHAKE_THRESHOLD = 4000;
var last_update = 0;
var speed = 30;//�ٶ�
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
            alert("���н�����");  // Do something
        }
        if(Math.abs(x-last_x) > speed || Math.abs(y-last_y) > speed || Math.abs(z-last_z) > speed) {
            //�򵥵�ҡһҡ��������
            alert('������������Ӧ');
        }
        last_x = x;
        last_y = y;
        last_z = z;
    }
}