

	/**
	 *   首页滚动图片参数可自定义
	 * 1、将服务端返回数据，转换成前端需要的格式
	 * 2、若服务端返回格式和前端所需格式相同，则不需要改功能
	 * 
	 */
	function convertBanner(items,len) {
		var newItems = [];
		items.forEach(function(item) {
			newItems.push({
				id:item.id,
				name:item.name,
				type:item.type,
				picturePath: item.picturePath,
				bannerLength : len,
				commodityLink:item.commodityLink
			});
		});
		return newItems;
	}
	
	/**
	 *    商品
	 * 1、将服务端返回数据，转换成前端需要的格式
	 * 2、若服务端返回格式和前端所需格式相同，则不需要改功能
	 * 
	 * @param {Array} items 
	 */
	function convertGoods(items) {
		var newItems = [];
		items.forEach(function(item) {
			newItems.push({
				goodId: item.id,
				type : item.type,
				thirdId:item.thirdId,
				smallImg:item.smallImg,
				imgSrc: item.imgSrc,
				monthlySale:item.monthlySale,
				sellerId:item.sellerId,
				title: item.title,
				couponAmt: item.couponAmt,
				commission: item.commission,
				salePrice: item.salePrice,
				price: item.price,
				thirdUrl: item.thirdUrl
			});
		});
		return newItems;
	}
	
	/**
	 *    商品分类
	 * 1、将服务端返回数据，转换成前端需要的格式
	 * 2、若服务端返回格式和前端所需格式相同，则不需要改功能
	 * 
	 * @param {Array} items 
	 */
	function convertCategory(items) {
		var newItems = [];
		items.forEach(function(item) {
			newItems.push({
				id: item.id,
				name:item.name,
				icon: item.icon,
				keyword: item.keyword
			});
		});
		return newItems;
	}
	
	
	/**
	 *    图片切割
	 * 1、将服务端返回数据，转换成前端需要的格式
	 * 2、若服务端返回格式和前端所需格式相同，则不需要改功能
	 * 
	 * @param {Array} items 
	 */
	function convertGoodsDetaImage(items,lengths) {
		var newItems = [];
		items.forEach(function(item) {
			newItems.push({
				path: item,
				lengths:lengths
			});
		});
		return newItems;
	}
	
	
	
	function isLogin(){
		var login_userId = plus.storage.getItem(sign_user_id);
		if(login_userId==''||login_userId==null){
			return false;
		}
		return true;
	}
	
	function copyShareUrl(text) {
			// 复制链接到剪切板
			var copy_content = text;
			// 判断是安卓还是 ios
			if(mui.os.ios) {
				//ios
				var UIPasteboard = plus.ios.importClass("UIPasteboard");
				var generalPasteboard = UIPasteboard.generalPasteboard();
				// 设置 / 获取文本内容:
				generalPasteboard.plusCallMethod({
					setValue: copy_content,
					forPasteboardType: "public.utf8-plain-text"
				});
				generalPasteboard.plusCallMethod({
					valueForPasteboardType: "public.utf8-plain-text"
				});
			} else {
				// 安卓
				var context = plus.android.importClass("android.content.Context");
				var main = plus.android.runtimeMainActivity();
				var clip = main.getSystemService(context.CLIPBOARD_SERVICE);
				plus.android.invoke(clip, "setText", copy_content);
			}
			mui.toast("复制成功")
	}
	
	
	function saveImg(picurl) {
			
		plus.nativeUI.showWaiting('加载中...');
		var dtask = plus.downloader.createDownload(picurl, {}, function ( d, status ) {
			// 下载完成
			if ( status == 200 ) { 
				//	alert( "Download success: " + d.filename );
				plus.gallery.save(d.filename,function() {//保存到相册方法
					plus.nativeUI.closeWaiting();
					mui.toast('已保存到手机相册');
				}, function() {
					plus.nativeUI.closeWaiting();
					mui.toast('保存失败，请重试！');
				});
			} else {
				mui.toast("保存失败");
			}
		});
		dtask.start();//开始下载
	}
 
 
 
 
 /***
  * 存储搜索历史到本地
  */
 
 function addToStorage(keyword){
 	var histor =  plus.storage.getItem(history_search);
				
	if(histor==null){
		plus.storage.setItem(history_search,keyword+",");
	}else{
		var arr = histor.split(",");
		
		for(var i = 0;i < arr.length ; i++){
			if(keyword == arr[i]){
				return;
			}
		}
		
		var len = arr.length;
		if(len < 9){
			plus.storage.setItem(history_search,histor + keyword + ",");
		}else{
			var add = '';
			
			for(var i = 0; i<=9;i++){
				add = add + arr[i] + ',';
			}
		
			plus.storage.removeItem(history_search);
			
			plus.storage.setItem(history_search,keyword + "," + add);
		}
		
		
	}
 }
 
	
	
	// 判断启动方式
function checkArguments() {
    if(plus.runtime.launcher == "default"){
        return
    }else if(plus.runtime.launcher == "scheme"){
            var args = plus.runtime.arguments;
            //alert(JSON.stringify(args))
        }
        
    }
   // 处理从后台恢复
/*document.addEventListener('newintent', function () {
    checkArguments();
}, false);*/
