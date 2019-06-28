
/**
 * 
 * 监听后台返回前台页面事件
 */
document.addEventListener("resume", function () {
	var copyText = copyToClip();
	 if(copyText!=''){
	 	
	 	if(copyText.indexOf('https://item.taobao.com/item.htm?id=')!=-1||copyText.indexOf('https://m.tb.cn/')!=-1||copyText.indexOf('https://item.taobao.com/item.htm?id=')!=-1){
			var userId = plus.storage.getItem(sign_user_id);
			if(userId==null||userId==''){
				
				mui.confirm(copyText, '<img src="../../images/zhinengsearch.png" style="width:100%;height:100%;"/>', ['取消',  '立即搜索'], function(e) {
					if(e.index == 1) {
						
						mui.openWindow({
							id:'view/login/login.html',
							url:'/view/login/login.html',
				   			show:{
								aniShow:'slide-in-right'
							},
				            waiting: {
				                 autoShow: false //自动显示等待框，默认为true
				            }
						})
					} 
				},'div')
				
				
				return;
			}
			mui.post(httpUrl,{
				method:'goods00014',
				module:goodApi,
				requestId:requestId,
				sign:signMd5,
				timeStamp:timeStamp,
				keyword:copyText,
				uid:userId
			},function(data){
				if(data.respCode=='0000'){
					addToStorage(data.result.title);
						mui.confirm(data.result.title, '<img src="'+data.result.imgSrc+'" style="width:100%;height:100%;"/>', ['取消',  '立即搜索'], function(e) {
							if(e.index == 1) {
								
								var titleNView = {  
								    backgroundColor: '#f7f7f7',//导航栏背景色  
								    titleText: data.result.title,//导航栏标题  
								    titleColor: '#000000',//文字颜色  
								    type:'transparent',//透明渐变样式  
								    autoBackButton: true,//自动绘制返回箭头  
								    splitLine:{//底部分割线  
								        color:'#cccccc'  
								    }  
								}  
						
								mui.openWindow({
									id:'view/goods/details/goodsDetails.html',
									url:'/view/goods/details/goodsDetails.html',
									extras:{
										keyword:data.result.thirdId,
										goods:data.result,
										goodsList:null
									},
									show:{
										aniShow:'slide-in-right'
									},
						            waiting: {
						                 autoShow: false //自动显示等待框，默认为true
						            },
						             styles:{  
								        titleNView:titleNView,
							        	popGesture: 'none'  
								    }  
								})
							} 
						},'div')
					return;
				}
				copyText = copyText.substr(1,copyText.lastIndexOf("】")-1);
				mui.confirm(copyText, '<img src="../../images/zhinengsearch.png" style="width:100%;height:100%;"/>', ['取消',  '立即搜索'], function(e) {
					if(e.index == 1) {
						addToStorage(copyText);
						open_copy_search(copyText);
					} 
				},'div')
			},'json');
	
			
			return;
	    }
	 	
		mui.confirm(copyText, '<img src="../../images/zhinengsearch.png" style="width:100%;height:100%;"/>', ['取消',  '立即搜索'], function(e) {
			if(e.index == 1) {
				addToStorage(copyText);
				open_copy_search(copyText);
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
	    
	    
	   if(typeof(copyText)!='undefined'&&copyText!=''&&copyText!=null){
			if(copyText.indexOf('https://item.taobao.com/item.htm?id=')!=-1){
				plus.android.invoke(clip, "setText","");
		    }else if(copyText.length>5){
		    	
	    		if(/.*[\u4e00-\u9fa5]+.*$/.test(copyText)){
			    	plus.android.invoke(clip, "setText","");
			    }else{
			    	copyText = '';
			    }
			    
	    	}else{
	    		
	    		copyText = '';
	    		
	    	}
	    	
	    }else{
	    	copyText = '';
	    }
	    //清空剪切板
 	}else{
 		var UIPasteboard = plus.ios.importClass("UIPasteboard");
		var generalPasteboard = UIPasteboard.generalPasteboard();
		//获取剪切板
		copyText = generalPasteboard.plusCallMethod({valueForPasteboardType:"public.utf8-plain-text"}); 
		
		if(typeof(copyText)!='undefined'&&copyText!=''&&copyText!=null){
			if(copyText.indexOf('https://item.taobao.com/item.htm?id=')!=-1){
				 //清空剪切板
			 	generalPasteboard.plusCallMethod({setValue:'', forPasteboardType: "public.utf8-plain-text"});
			}else if(copyText.length>5){
	    	
			    if(/.*[\u4e00-\u9fa5]+.*$/.test(copyText)){
			    	 //清空剪切板
			 		generalPasteboard.plusCallMethod({setValue:'', forPasteboardType: "public.utf8-plain-text"});
			    }else{
			    	copyText = '';
			    }
		    }else{
		    	copyText = '';
		    }
	     }else{
	    	copyText = '';
	    }
		
 	}
 	return copyText;
}
 
 
 
 function open_copy_search(keyword){
	var userId = plus.storage.getItem(sign_user_id);
	if(userId==null||userId==''){
		mui.openWindow({
			id:'view/login/login.html',
			url:'/view/login/login.html',
   			show:{
				aniShow:'slide-in-right'
			},
            waiting: {
                 autoShow: false //自动显示等待框，默认为true
            }
		})
		return;
	}
	
	
	mui.openWindow({
		url:'/view/goods/goodsSearch.html',
		id: 'view/goods/goodsSearch.html',
		show:{
			aniShow:'slide-in-right'
		},
		waiting: {
			autoShow: false
		},
		extras:{
			keyword:keyword
		}
	})
	
}
 