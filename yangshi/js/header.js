jQuery(function($){
	$.fn.extend({
		imgRoll:function(){//图片滚动
			//$(this).CreatRoll();//创建大图滚动
			var self=$(this);//保存this
			self.x=1;//图片下标
			self.timer=null;//计时器
			self.imgW=self.find(".sitem").width();
			self.find(".scon").scrollLeft(self.imgW);

			//自动走
			function autoMove(){
				self.timer=setInterval(function (){
					self.x++;
					if (self.x>=self.find(".sitem").length){
						self.x=1;
						self.find(".scon").scrollLeft(0);
					};
					move();
				},3000)
			}
			autoMove();//进入页面执行

			//一步一步走
			function move(){
				self.find(".scon").stop().animate({scrollLeft:self.imgW*self.x},1000);
				self.find(".img-index").eq(self.x-1).addClass("scurrent").siblings().removeClass("scurrent");
			}

			//点击数字
			self.find(".img-index").click(function (){
				clearInterval(self.timer);
				self.x=$(this).index()+1;
				move();
				autoMove();
			});

			var startpos=0;
			var endpos=0;
			var pres=0;
			self.find(".scon")[0].addEventListener('touchstart', function(event) {
			     // 如果这个元素的位置内只有一个手指的话
			    if (event.targetTouches.length == 1) {
			        startpos = event.targetTouches[0].pageX;
			        pres=self.find(".scon")[0].scrollLeft;
			        endpos = event.targetTouches[0].pageX;
			    }
		    	self.find(".scon")[0].addEventListener('touchmove', function(event) {
		    	     // 如果这个元素的位置内只有一个手指的话
		    	    if (event.targetTouches.length == 1) {
		    	    	event.stopPropagation();
		    	　　　　event.preventDefault();// 阻止浏览器默认事件，重要
		    			clearInterval(self.timer); 
		    	        endpos = event.targetTouches[0].pageX;
		    	        self.find(".scon")[0].scrollLeft=startpos-endpos+pres;
		            }
		    	}, false);
			}, false);
			
			self.find(".scon")[0].addEventListener('touchend', function(event) {
			    if(endpos-startpos>50){
					clearInterval(self.timer);
			    	self.x=self.x-1;
			    	if (self.x<0){
			    		self.x=self.find(".sitem").length-1;
			    		self.find(".scon").scrollLeft(self.imgW*(self.find(".sitem").length));
			    	};
			        move();
					autoMove();
			    }else if(startpos-endpos>50){
					clearInterval(self.timer);
			    	self.x=self.x+1;
			    	if (self.x>=self.find(".sitem").length){
			    		self.x=1;
			    		self.find(".scon").scrollLeft(0);
			    	};
			        move();
					autoMove();
			    }else{
			    	move();
					autoMove();
			    }
			}, false); 
		},
		CreatRoll:function(str){//创建大图滚动
			var scon=$("<div></div>").attr("class","scon");
			var sul=$("<ul></ul>").attr("class","sul");
			for(var i=0;i<4;i++){
				var sitem=$("<li></li>").attr("class","sitem");
				if(i==0){
					sitem.append($("<img />").attr("class","teb-img").attr("src",str[2].src));
				}else{
					sitem.append($("<img />").attr("class","teb-img").attr("src",str[i-1].src));
				}
				sitem.append($("<p></p>").attr("class","smask").text("CCTV体育赛事高清频道"));
				sul.append(sitem);
			}
			var sindex=$("<ul></ul>").attr("class","sindex");
			for(var i=0;i<3;i++){
				var li=$("<li></li>").attr("class","img-index");
				if(i==0){
					li.addClass("scurrent");
				}
				sindex.append(li);
			}
			scon.append(sul);
			$(this).append(scon).append(sindex);
			return $(this);
		},
		listShow:function(){
			// $(this).CreateLS();
			var self=$(this);
			var startpos=0;
			var pres=0;
			var endpos=0;
			self.find(".list_show")[0].addEventListener("touchstart",function(){
				if (event.targetTouches.length == 1) {
			        startpos = event.targetTouches[0].pageX;
			        endpos = event.targetTouches[0].pageX;
			        pres=$(this).scrollLeft();
			    }
			    self.find(".list_show")[0].addEventListener("touchmove",function(){
			    		event.stopPropagation();
			    	 	event.preventDefault();// 阻止浏览器默认事件 
			            endpos = event.targetTouches[0].pageX;
			            self.find(".list_show")[0].scrollLeft=startpos-endpos+pres;
			    },false);
			},false);
			self.find(".list_show")[0].addEventListener("touchend",function(){
				self.find(".list_show")[0].scrollLeft=startpos-endpos+pres;
			},false);
		},
		CreateLS:function(str,boolean){
			var list_show=$("<div></div>").attr("class","list_show");
			var ls_con=$("<ul></ul>").attr("class","ls_con");
			ls_con.css("width",str.length*2.06+"rem");
			for(var i=0;i<str.length;i++){
				var ls_item=$("<li></li>").attr("class","fl ls_item");
				ls_item.append($('<a href="javascript:void(0)"></a>').attr("class","fl").append($("<img />").attr({class:"fl three-h",src:str[i].src})));
				ls_item.append($('<p></p>').attr("class","font18").text(function(){if(boolean){return str[i].time}else{return str[i].name}}));
				ls_con.append(ls_item);
			}
			list_show.append(ls_con);
			$(this).append(list_show);
			/*ls_con.width(function(){return $(".ls_item").eq(0).width()*10})*/
			return $(this);
		}
	});
	$.extend({
		setCookie:function(user,value,day){
			var date=new Date();
			date.setDate(date.getDate()+day);
			document.cookie=user+"="+escape(value)+";expires="+date;
			return $;
		},
		getCookie:function(str){
			var arr1=unescape(document.cookie).split("; ");
			for(var i=0;i<arr1.length;i++){
				var arr2;
				arr2=arr1[i].split("=");
				if(arr2[0]==str){
					return arr2[1];
				}
			}
		},
		removeCookie:function(str){
			return $.setCookie(str,'12',-5);
		},
		tabslide:function(){
			var startpos=0;
			var endpos=0;
			var pres=0;
			var x=0;
			var startY=0;
			var endY=0;
			var isslideShow=false;
			$(".hnav .hnlist").click(function(){
				var index=$(".hnav .hnlist").index(this);
				$(this).addClass("hnselect").siblings().removeClass("hnselect");
				x=index;
				if(x<=6){
					$(".hnlborder").eq(0).animate({left:$(".hnlborder").width()*x});
					$(".hout").eq(0).scrollLeft(0);
					$(".hbout").eq(0).scrollLeft($(window).width()*x);
				}else{
					$(".hnlborder").eq(0).animate({left:$(".hnlborder").width()*6});
					$(".hout").eq(0).scrollLeft($(".hnlborder").width()*(x-6));
					$(".hbout").eq(0).scrollLeft($(window).width()*x);
				}
			});//改变当前导航样式
			$(".hmenu").click(function(){
				if(!isslideShow){
					//x=-1;
					isslideShow=true;
					$(".lslide").animate({
						left:"0rem"
					},1000);
					$(".header").animate({left:"4.1rem"},1000);
					$(".hnav").delay(100).animate({left:"4.1rem"},1000);
					$(".hbody").delay(200).animate({left:"4.1rem"},1000);
				}else{
					//x=0;
					isslideShow=false;
					$(".lslide").animate({
						left:"-4.1rem"
					});
					$(".header").animate({left:"0rem"});
					$(".hnav").animate({left:"0rem"});
					$(".hbody").animate({left:"0rem"});
				}
			});//左侧菜单划出
			$(".hbody")[0].addEventListener("touchstart",function(event){
				if (event.targetTouches.length == 1) {
					startpos = event.targetTouches[0].pageX;
					endpos = event.targetTouches[0].pageX;
					startY = event.targetTouches[0].pageY;
					endY = event.targetTouches[0].pageY;
				    pres=$(".hnlborder").eq(0).position().left;
				}

				$(".hbody")[0].addEventListener("touchmove",function(event){
				    if (event.targetTouches.length == 1) {
				    	event.stopPropagation();
				　　　　event.preventDefault();// 阻止浏览器默认事件，重要 
				        endpos = event.targetTouches[0].pageX;
				        endY = event.targetTouches[0].pageY;
				       // $(this).find(".hout")[0].scrollLeft=startpos-endpos+pres;
				       if(Math.abs(endpos-startpos)<Math.abs(endY-startY)){
				       		$("body").stop().animate({scrollTop:startY-endY+$("body").scrollTop()},"fadeIn");
				       }else{
					       $(".hnlborder").eq(0).stop().animate({left:(startpos-endpos)/3+pres});
					       $(".hbout").scrollLeft((startpos-endpos)/100+$(".hbout").scrollLeft());
				       }
				   };
				},false);
			},false);

			$(".hbody")[0].addEventListener("touchend",function(event){

				//$(".hblist").eq(x).removeClass("hbonescreen").siblings().addClass("hbonescreen");
			    if(endpos-startpos>100){
					if(x<=0&&!isslideShow){
	    				$(".lslide").animate({
	    					left:"0rem"
	    				},1000);
	    				$(".header").animate({left:"4.1rem"},1000);
	    				$(".hnav").delay(100).animate({left:"4.1rem"},1000);
	    				$(".hbody").delay(200).animate({left:"4.1rem"},1000);
	    				isslideShow=true;
	    				$(".hbout").eq(0).scrollLeft($(window).width()*x);
			    		$(".hnlborder").eq(0).animate({left:$(".hnlborder").width()*x});
	    				return;
					}
			    	x=x-1;
			    	//$(".hout").eq(0).scrollLeft($(".hnlborder").width()*x);
			    	$(".hblist").eq(x).removeClass("hbonescreen").siblings().addClass("hbonescreen");
			    	$(".hbout").eq(0).scrollLeft($(window).width()*x);
			    	if(x<=6){
			    		$(".hout").eq(0).scrollLeft(0);
			    		$(".hnlborder").eq(0).animate({left:$(".hnlborder").width()*x});
			    		if (x<=0){
			    			$(".hout").eq(0).scrollLeft(0);
			    			$(".hnlborder").eq(0).stop().animate({left:0});
			    			$(".hbout").eq(0).scrollLeft(0);
			    		};
			    	}else{
			    		$(".hout").eq(0).scrollLeft($(".hnlborder").width()*(x-6));
			    		$(".hnlborder").eq(0).animate({left:$(".hnlborder").width()*6});
			    	}
			    }else if(endpos-startpos<-100){
				    	if(isslideShow){
				    		$(".lslide").animate({
				    			left:"-4.1rem"
				    		});
				    		$(".header").animate({left:"0rem"});
				    		$(".hnav").animate({left:"0rem"});
				    		$(".hbody").animate({left:"0rem"});
				    		isslideShow=false;
				    		$(".hbout").eq(0).scrollLeft($(window).width()*x);
			    			$(".hnlborder").eq(0).animate({left:$(".hnlborder").width()*x});
				    		return;
				    	}
				    	x++;
				    	$(".hblist").eq(x).removeClass("hbonescreen").siblings().addClass("hbonescreen");
				    	$(".hbout").eq(0).scrollLeft($(window).width()*x);
				    	if(x>=6){
				    		$(".hout").eq(0).scrollLeft($(".hnlborder").width()*(x-6));
				    		$(".hnlborder").eq(0).animate({left:$(".hnlborder").width()*6});
				    		if (x>=$(".hnlist").length){
				    			x=$(".hnlist").length-1;
				    			$(".hout").eq(0).scrollLeft($(".hnlborder").width()*(x-6));
				    			// $(".hnlborder").eq(0).stop().animate({left:$(".hnlborder").width()*$(".hnlist").length});
				    			$(".hbout").eq(0).scrollLeft($(window).width()*x);
				    		};
				    	}else{
				    		$(".hout").eq(0).scrollLeft(0);
				    		$(".hnlborder").eq(0).animate({left:$(".hnlborder").width()*x});
				    	}
			    }else{
			    	$(".hbout").eq(0).scrollLeft($(window).width()*x);
			    	$(".hnlborder").eq(0).animate({left:$(".hnlborder").width()*x});
			    }
				$(".hnav .hnlist").eq(x).addClass("hnselect").siblings().removeClass("hnselect");
			},false);
		},
		touchclick:function(){
			$("html").click(function(e){
				$(".click").css({top:(e.pageY-$(".click").height()/2),left:(e.pageX-$(".click").width()/2)}).show();
				$(".click").children().eq(0).fadeIn(0).animate({width:"0.8rem",height:"0.8rem",top:"0rem",left:"0rem"},600).queue(function(){$(this).hide();$(this).animate({width:"0rem",height:"0rem",top:"50%",left:"50%"});$(this).dequeue();});

				$(".click").children().eq(1).delay(150).fadeIn(0).animate({width:"0.54rem",height:"0.54rem",top:"0.13rem",left:"0.13rem"},450).queue(function(){$(this).hide();$(this).animate({width:"0rem",height:"0rem",top:"50%",left:"50%"});$(".click").hide();$(this).dequeue();});
			});
		},
		creatClick:function(){
			$("<div></div>").addClass("click").append($("<div></div>").addClass("water")).append($("<div></div>").addClass("water")).prependTo($("body"));
		}
	});

	$.creatClick();
	$.touchclick();
	$(".hfind").eq(0).click(function(){
		var w=document.documentElement.clientHeight;
		$(".sfind").css("height",w).show();
		$(".hotf").fadeIn();
		$(".sfind").find(".hfind").animate({
			marginRight:"5.7rem"
		},500);
		$(".fipt").css("border","1px solid #ccc");
		$(".fipt").show().delay(90).animate({
			width:"4.9rem"
		},410,function(){$(".fcencel").show()});
	});//搜索按钮
	$(".fcencel").click(function(){
		$(".fipt").css("border","none");
		$(".fipt").animate({
			width:"0rem"
		},500,function(){$(".fcencel").hide();});
		$(".sfind").find(".hfind").animate({
			marginRight:"0.2rem"
		},410);
		$(".hotf").fadeOut(function(){$(".sfind").hide();});
	});//搜索按钮取消
	$(".hback").click(function(){
		window.history.go(-1);
	});//后退
	$(".ltx").click(function(){
		window.open("personal_center.html","_self");
	});//点击头像登录
	$(".lptext").click(function(){
		window.open("personal_center.html","_self");
	});//点击文字登录

	$(".mllist1").eq(0).click(function(){
		$(".lslide").animate({
			left:"-4.1rem"
		});
		$(".header").animate({left:"0rem"});
		$(".hnav").animate({left:"0rem"});
		$(".hbody").animate({left:"0rem"});
	});//首页
	$(".mllist2").eq(0).click(function(){
		window.open("mysc.html","_self");
	});//我的收藏
	$(".mllist3").eq(0).click(function(){
		window.open("myjl.html","_self");
	});//观看记录
	$(".mllist4").eq(0).click(function(){
		window.open("404.html","_self");
	});//我的预约
	$(".mllist5").eq(0).click(function(){
		window.open("404.html","_self");
	});//意见反馈
	$(".mllist6").eq(0).click(function(){
		window.open("404.html","_self");
	});//设置
	$(".mllist7").eq(0).click(function(){
		window.history.back();
	});//退出
	$(".ata").click(function(){
		window.open("404.html","_self");
	});//更多
	$(".H-dx").click(function(){
		window.open("video.html?src="+escape($(this).find("img").attr("src")),"_self");
	})

})

// 手机端适配
function reset(){
	var html=document.getElementsByTagName('html')[0];
	var w=document.documentElement.clientWidth||document.body.clientWidth;
	html.style.fontSize=w/640*100+'px';
	window.onresize=function(){
		reset();
	}
}
reset();

// 添加列表
function additem(obj){
	//item,from,to,obj,bofangliang,type
	//item为绑定的数据来源，类型为数组，from从第几个开始，to到第几个结束（不包括to这个数字），obj为承载元素添加的节点，bofangliang为是否读取播放量这个参数；
	// if(arguments.length==1){var obj=$("body").eq(0);var from=0;var to=item.length;var from=0;}else if(arguments.length==2){
	// 	if(isNaN(arguments[1])){var obj=arguments[1];var from=0;var to=item.length;}else{var obj=$("body").eq(0);var from=0;var to=arguments[1];}
	// 	}else if(arguments.length==3){var obj=arguments[2];var to=arguments[1];var from=0;}
	//console.log(to)
	if(obj.item==null){alert("滚犊子，啥都不给，咋创建！");}
	if(obj.itemfrom==null){obj.itemfrom=0;}
	if(obj.itemto==null){obj.itemto=item.length;}
	if(obj.toparent==null){obj.toparent=0;}
	if(obj.itemredu==null){obj.itemredu=false;}
	if(obj.itempaihang==null){obj.itempaihang=false;}
	if(obj.itemjuqing==null){obj.itemjuqing=false;}
	if(obj.itemtype==null){obj.itemtype="oneimg";}

	var div=$("<div></div>").attr("class","hid");
	var ul=$("<ul></ul>").attr("class","allcon hid");
	for(var i=obj.itemfrom;i<obj.itemto;i++){
		var src=obj.item[i].src?obj.item[i].src:obj.item[i].juji[0].src;
		var li=$("<li></li>").attr("class","aconlist fl");
		var a=$("<a href='javascript:void(0)'></a>").attr("class","listhreftop pos-re fl listhreftop"+(i-obj.itemfrom+1));
		if(!obj.itempaihang){
			a.removeClass("listhreftop");
		}
		var img1=$("<img />").attr("class",obj.itemtype).attr("src",src);
		a.append(img1);
		li.append(a);
		var p1=$("<p></p>").attr("class","litxt");
		var span1=$("<span></span>").attr("class","fl font20").text(obj.item[i].name.slice(0,9));
		p1.append(span1)
		if(obj.itemredu){
			var span2=$("<span></span>").attr("class","redu fr pos-re font14 c9").text(obj.item[i].bofangliang.slice(0,4));
			p1.append(span2);
		}
		if(obj.itemjuqing){
			var p2=$("<p></p>").attr("class","litxt font16 c6").text(obj.item[i].juqing);
		}

		li.append(p1).append(p2);
		ul.append(li);
	}
	div.append(ul);
	obj.toparent.after(div);
	return div;
}

//发布评论
function pingLun(){
	
	//获取评论时间
	var date=new Date();
	var y=date.getFullYear();
	var m=date.getMonth()+1;
	var d=date.getDate();

	$(".postcomipt").focus(function(){
		if($(".postcomipt").val()=="写评论")
		$(".postcomipt").val("");
	});

	$(".postcomipt").blur(function(){
		if($(".postcomipt").val()=="")
		$(".postcomipt").val("写评论");
	});

	$(".postbtn1").click(function(){
		if($(".postcomipt").val()=="写评论"){
				return;
		}
		var newli=$("<li></li>").attr("class","plli2");
		var span1=$("<span></span>").attr("class","pl1 fl");
		var span2=$("<span></span>").attr("class","pl1tt font16 fl");
		span2.html("我就是阿翔");
		var span3=$("<span></span>").attr("class","pl1t font12");
		span3.html(y+"-"+m+"-"+d);
		var newp=$("<p></p>").attr("class","plli2p font16 fl");
		newp.html($(".postcomipt").val());
		var a1=$("<a></a>").attr("class","huifu fl");
		a1.html("查看全部20条回复");
		var a2=$("<a></a>").attr("class","pldz fr");
		var a3=$("<a></a>").attr("class","plfx fr");
		newli.append(span1);
		newli.append(span2);
		newli.append(span3);
		newli.append(newp);
		newli.append(a1);
		newli.append(a2);
		newli.append(a3);
		$(".postcom").before(newli);
		$(".postcomipt").val("写评论");
	});
}

//跳转
function huifuDEtail(){
	$(".pinglun").on("click",".huifu",function(){
	window.location.href="huifuxiangqing.html?name="+escape($(this).find(".huifu").html())+"&pl="+escape($(this).parent().find(".pl1t").html());
	});
}
huifuDEtail();

