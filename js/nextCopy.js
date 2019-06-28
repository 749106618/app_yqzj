
/**
 * 
 * 监听后台返回前台页面事件
 */
document.addEventListener("resume", function () {
	var copyText = copyToClip();
	 if(copyText!=''){
		mui.confirm(copyText, '<img src="../../../images/zhinengsearch.png" style="width:100%;height:100%;"/>', ['取消',  '立即搜索'], function(e) {
			if (e.index == 1) {
				open_goodsSearch(copyText);
			} 
		},'div')
	 }
}, false);


/**
 * 从剪切板获取内容
 */
 function copyToClip() {
 	var copyText = '';
 	if(plus.os.name=='Android'){
 		var Context = plus.android.importClass("android.content.Context");
	    var main = plus.android.runtimeMainActivity();
	    var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
	    //获取剪切板
	    copyText = plus.android.invoke(clip, "getText");
	    if(copyText!=''){
	    	if(copyText.length>5){
	    		if(/.*[\u4e00-\u9fa5]+.*$/.test(copyText)){
			    	plus.android.invoke(clip, "setText","");
			    }else{
			    	copyText = '';
			    }
	    	}else{
	    		copyText = '';
	    	}
	    	
	    }
	    //清空剪切板
 	}else{
 		var UIPasteboard = plus.ios.importClass("UIPasteboard");
		var generalPasteboard = UIPasteboard.generalPasteboard();
		//获取剪切板
		copyText = generalPasteboard.plusCallMethod({valueForPasteboardType:"public.utf8-plain-text"}); 
		
		if(copyText!=''){
			if(copyText.length>5){
	    	
			    if(/.*[\u4e00-\u9fa5]+.*$/.test(copyText)){
			    	 //清空剪切板
			 		generalPasteboard.plusCallMethod({setValue:'', forPasteboardType: "public.utf8-plain-text"});
			    }else{
			    	copyText = '';
			    }
		    }else{
		    	copyText = '';
		    }
	    }
		
 	}
 	return copyText;
}
 