


//var versionServer = "http://web.ngrok.xiaomiqiu.cn/user/version.htm";
//var uploadAppUrl = "http://web.ngrok.xiaomiqiu.cn/user/downloadPackage.htm";

var versionServer = "http://47.110.159.241/user/version.htm";
var uploadAppUrl = "http://47.110.159.241/user/downloadPackage.htm";


// 下载wgt文件 
function update() {
	var flg = plus.storage.getItem('down_app');    //获取本地版本跟新信息  1为可跟新  0 为无须跟新
	
	if(flg=='1'){
		var masks = mui.createMask(function() {
		    //设置点击蒙板不会自动消失
		    //但调用close方法关闭mask时，必须返回true
		    return false;
		}); 
		masks.show();
		document.getElementById("mui_card_centent").innerText = plus.storage.getItem("app_version_message");
		document.getElementById("mui_card").classList.remove("display");
	}
    
}    
    

mui.os.plus && !mui.os.stream && mui.plusReady(update);




document.getElementById("update_btn").addEventListener("tap",function(){
	
	this.setAttribute("disabled",true);
	
	var dtask = plus.downloader.createDownload(uploadAppUrl, {}, function (download,status) {  
	    if ( status == 200 ) { 
	    	plus.push.createMessage("下载成功，正在安装");
	        var path = download.filename;  

	        plus.runtime.install(path,{force:true},function(e){
			 	plus.nativeUI.toast('安装成功');
			 	plus.runtime.restart();
	        },function(e){
	        	plus.nativeUI.toast('安装失败');
	        	
			});
			
	    } else {
	        mui.alert( "下载失败: " + status );   
	    }    
	});  
	
	dtask.start();
	var update_btn = document.getElementById("update_btn");
	dtask.addEventListener( "statechanged", function(task,status){  
        switch(task.state) {  
            case 1: // 开始  
                update_btn.innerText = " 开始下载";
           		 break;  
            case 2: // 已连接到服务器  
                update_btn.innerText = " 已连接到服务器";
            	break;  
            case 3:  
            	var progressbar = mui("#mui_card");
                var a = task.downloadedSize/task.totalSize*100;  
                update_btn.innerText = "已下载"+parseInt(a)+"%";
            	break;  
            case 4: // 下载完成  
            	break;  
        }  
    } );  
	
})

