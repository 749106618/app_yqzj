

/***
 * 商品转链
 */
function processGoods(url,thirdId,uid,title,imgSrc){
	mui.getJSON(httpUrl,{
			method:'goods00012',
			module:goodApi,
			requestId:requestId,
			sign:signMd5,
			timeStamp:timeStamp,
			thirdId:thirdId,
			uid:uid,
			imgSrc:imgSrc,
			title:title
		},function(res){
			//console.log(JSON.stringify(res))
			if(res.respCode=='0000'){
				vm.thirdUrl = res.result.thirdUrl;
				return;
			}
			if(res.respMsg=='not close json text, token : error'){
				mui.toast('商品已下架');
			}else{
				mui.toast(res.respMsg);
			}
		});
}

/***
 * 商品详情图文详情
 */
function getGoodsDetails(thirdId,thirdUrl){
	var userId = plus.storage.getItem(sign_user_id);
	mui.getJSON(httpUrl,{
			method:'goods00003',
			module:goodApi,
			requestId:requestId,
			sign:signMd5,
			timeStamp:timeStamp,
			thirdId:thirdId,
			thirdUrl:thirdUrl
		},function(res){
			if(res.respCode=='0000'){
				if(res.result.html===''){
					return;
				}
				document.getElementById("ajax_detail").innerHTML = res.result.html;
				var gallery = mui('#slider');
				gallery.slider({
					  interval:0//自动轮播周期，若为0则不自动播放，默认为0；
				});
			}
		});
		
}

/***
 * 店铺详情
 */
function getShopName(shopName,sellerId){
	mui.getJSON(httpUrl,{
			method:'goods00009',
			module:goodApi,
			requestId:requestId,
			sign:signMd5,
			timeStamp:timeStamp,
			sellerId:sellerId,
			shopName:shopName
		},function(res){
			if(res.respCode=='0000'){
				vm.shop = res.result;
			}
		});
}


/**
 * 商品收藏
 * @param {Object} uid
 * @param {Object} thirdId
 */
function collection00002(uid,thirdId){
	mui.getJSON(httpUrl,{
			method:'collection00002',
			module:goodApi,
			requestId:requestId,
			sign:signMd5,
			timeStamp:timeStamp,
			uid:uid,
			type:1,
			thirdId:thirdId
		},function(res){
			mui.toast(res.respMsg)
		});
}

/***
 * 取消收藏
 * @param {Object} uid
 * @param {Object} thirdId
 */
function collection00003(uid,thirdId){
	mui.getJSON(httpUrl,{
			method:'collection00003',
			module:goodApi,
			requestId:requestId,
			sign:signMd5,
			timeStamp:timeStamp,
			uid:uid,
			thirdId:thirdId
		},function(res){
			mui.toast(res.respMsg)
		});
}


/**
 * 用户领劵之前先判断
 * 用户是否已经授权登录
 */
function coupon_get_already(href){
	//获取本地存储用户id
	var uid = plus.storage.getItem(sign_user_id);
	//发送ajax请求
	mui.post(httpUrl,{
			method:'user00010',
			module:'user-api',
			requestId:requestId,
			sign:signMd5,
			timeStamp:timeStamp,
			uid:uid
		},function(res){
			if(res.respCode=='0000'){
				var isAouth = res.result.isAouth;
				
				if(isAouth==0||isAouth+''=='0'||isAouth==''||isAouth==null){
					plus.runtime.openURL(aliyunUrl+uid);
					        
					return;
				}
				mui.openWindow({
					url:'/view/inclued/openPage.html',
					id: '/view/inclued/openPage.html',
					show:{
						aniShow:'slide-in-right'
					},
		            waiting: {
		                 autoShow: false //自动显示等待框，默认为true
		            },
		            extras:{
			           		url:href,
			           		title:'领取优惠券'
			        }
				})
				
				
			}
		},'json'
	);
	
	
	
}
