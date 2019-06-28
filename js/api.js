
/**
 * 正式环境
 */

var httpUrl = "http://65655.51vip.biz:32724/api/invoke"

/** 
 * 正式环境
 */


var htmlUrl = "https://tts.ngrok.xiaomiqiu.cn/";

var htmlImgUrl = 'https://tts.ngrok.xiaomiqiu.cn/res/';

var redPack = 'http://web.yunjuhe.vip/loan/list/v1.0/500382';


//var aliyunUrl = "taobao://oauth.taobao.com/authorize?response_type=code&view=wap&client_id=24948986&redirect_uri=http://www.tqqgl.com/user/oauthNotify.htm&state=";

//测试
var aliyunUrl = "taobao://oauth.taobao.com/authorize?response_type=code&view=wap&client_id=24924190&redirect_uri=https://tts.ngrok.xiaomiqiu.cn/user/oauthNotify.htm&state=";

//用户存储用户登录id标识
var sign_user_id = "userId";    

var is_aouth = 'user_isAouth';

var history_search = 'history_search';


var request_URL = 'reqeustUrl';


var flg = function isLogin(){
	var userId = plus.storage.getItem(sign_user_id);	
	if(userId==''||userId==null||userId==undefined){
		return false;
	}
	return true;
}


var userApi = 'user-api';  //用户接口

var goodApi = 'goods-api'; //商品接口

var tradeApi = 'trade-api'; //交易接口

var thirdApi = 'third-api'; //第三方接口

var baseApi = 'base-api';   //主模块

var requestId = '1527765597521';

var signMd5 = '089050fe2fe964292a8b996d25c16014';

var timeStamp = '20180531191957';

var  circle00004 = 'circle00004';

var hotSearch00001 = 'hotSearch00001';   // 热门搜索

/**
 * 热门搜索
 */
var hotSearch00001Data = {
	method:hotSearch00001,
	module:goodApi,
	requestId:requestId,
	sign:signMd5,
	timeStamp:timeStamp
}

/***
 * 滚动图
 */
var adPosition00001 = 'adPosition00001';
var adPosition00001Data = {
	method:adPosition00001,
	module:goodApi,
	requestId:requestId,
	sign:signMd5,
	timeStamp:timeStamp,
	position:'1',
	orgId:''
}


/**
 * 我要分享
 */
var circle00004Data = {
	method:circle00004,
	module:goodApi,
	requestId:requestId,
	sign:signMd5,
	timeStamp:timeStamp
}




function open_login(){
	mui.openWindow({
		id:'login.html',
		url:'/view/login/login.html',
		show:{
			aniShow:'slide-in-right'
		},
        waiting: {
             autoShow: false //自动显示等待框，默认为true
        }
	})
}



Date.prototype.format =function(format)
{
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(), //day
        "h+" : this.getHours(), //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3), //quarter
        "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format)){
        console.log(RegExp.$1.length);
        format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4- RegExp.$1.length));
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(format)){              
            format = format.replace(RegExp.$1,RegExp.$1.length==1? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        }
    }
    return format;
}


