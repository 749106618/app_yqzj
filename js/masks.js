var versionServer = "http://47.110.159.241/user/version.htm";
// 下载wgt文件
function update() {
	 mui.getJSON("manifest.json", null, function(manifest){
	 	
        var version = manifest.version.name;
        mui.post(versionServer, {version: version}, function(data) {
        	data = JSON.parse(data);
        	if(data.respCode=='1'){
        		var masks = mui.createMask(function() {
				    return false;
				}); 
				plus.storage.setItem('down_app','1');				//标识为1  有版本跟新
				plus.storage.setItem('app_version_message',data.respMsg);
        		setTimeout(function(){
					masks.show();
				},800)
        	}else{
        		plus.storage.setItem('down_app','0');				//标识为0 没有新版本
        	}
		})
        
    });
    
}    
    

mui.os.plus && !mui.os.stream && mui.plusReady(update);