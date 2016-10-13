$(function(){

	$.tabslide();
	//首页
	$.getJSON("js/sql.json",function(json){
		var lanmu=json.lanmu[2].fenlei;
		var dianying=json.dianying;
		var tiyu=json.tiyu;
		var dy=json.dianying;
		var dianshiju=json.dianshiju;
		//首页
		additem({item:lanmu,itemfrom:0,itemto:6,toparent:$("#shouye .at").eq(0),itemredu:true,itemjuqing:true,itemtype:"twoimg",itempaihang:true});
		var shouye2=additem({item:dianying,itemfrom:0,itemto:1,toparent:$("#shouye .at").eq(1),itemredu:false,itemjuqing:true,itemtype:"oneimg",itempaihang:false});
		additem({item:dianying,itemfrom:1,itemto:3,toparent:shouye2,itemredu:false,itemjuqing:true,itemtype:"twoimg",itempaihang:false});
		additem({item:lanmu,itemfrom:0,itemto:4,toparent:$("#shouye .at").eq(2),itemredu:false,itemjuqing:true,itemtype:"twoimg",itempaihang:false});
		additem({item:tiyu,itemfrom:1,itemto:5,toparent:$("#shouye .at").eq(3),itemredu:false,itemjuqing:false,itemtype:"twoimg",itempaihang:false});

		//体育
		var tiyu1=additem({item:tiyu,itemfrom:1,itemto:2,toparent:$("#tiyu").find(".at").eq(1),itemredu:false,itemjuqing:false,itemtype:"oneimg",itempaihang:false});
		additem({item:tiyu,itemfrom:2,itemto:6,toparent:tiyu1,itemredu:false,itemjuqing:false,itemtype:"twoimg",itempaihang:false});
		var tiyu2=additem({item:tiyu,itemfrom:1,itemto:2,toparent:$("#tiyu").find(".at").eq(2),itemredu:false,itemjuqing:false,itemtype:"oneimg",itempaihang:false});
		additem({item:tiyu,itemfrom:2,itemto:6,toparent:tiyu2,itemredu:false,itemjuqing:false,itemtype:"twoimg",itempaihang:false});

		//电影
		additem({item:dy,itemfrom:0,itemto:3,toparent:$("#dianying").find(".at").eq(0),itemredu:false,itemjuqing:false,itemtype:"three-s",itempaihang:false});
		additem({item:dy,itemfrom:3,itemto:9,toparent:$("#dianying").find(".at").eq(1),itemredu:false,itemjuqing:false,itemtype:"three-s",itempaihang:false});
		var dy3=additem({item:dy,itemfrom:0,itemto:1,toparent:$("#dianying").find(".at").eq(2),itemredu:false,itemjuqing:false,itemtype:"oneimg",itempaihang:false});
		additem({item:dy,itemfrom:1,itemto:3,toparent:dy3,itemredu:false,itemjuqing:false,itemtype:"twoimg",itempaihang:false});

		//热剧
		additem({item:dianshiju,itemfrom:1,itemto:4,toparent:$("#reju").find(".scroll").eq(0),itemredu:true,itemjuqing:false,itemtype:"oneimg",itempaihang:true});

		//娱乐
		var yule1=additem({item:dy,itemfrom:0,itemto:1,toparent:$("#yule").find(".at").eq(0),itemredu:false,itemjuqing:false,itemtype:"three-s",itempaihang:false});
		additem({item:lanmu,itemfrom:0,itemto:4,toparent:yule1,itemredu:false,itemjuqing:false,itemtype:"three-h",itempaihang:false});
		additem({item:dy,itemfrom:0,itemto:3,toparent:$("#yule").find(".at").eq(1),itemredu:false,itemjuqing:false,itemtype:"three-s",itempaihang:false});
		additem({item:lanmu,itemfrom:0,itemto:3,toparent:$("#yule").find(".at").eq(2),itemredu:false,itemjuqing:false,itemtype:"three-h",itempaihang:false});
		additem({item:dy,itemfrom:0,itemto:3,toparent:$("#yule").find(".at").eq(3),itemredu:false,itemjuqing:false,itemtype:"three-s",itempaihang:false});
		var xiezhen=json.xiezhen;
		additem({item:xiezhen,itemfrom:0,itemto:6,toparent:$("#yule").find(".at").eq(4),itemredu:false,itemjuqing:false,itemtype:"twoimg",itempaihang:false});

		//G客
		additem({item:lanmu,itemfrom:0,itemto:2,toparent:$("#gke").find(".gkenav").eq(0),itemredu:false,itemjuqing:false,itemtype:"twoimg",itempaihang:false});
		additem({item:dy,itemfrom:0,itemto:3,toparent:$("#gke").find(".at").eq(0),itemredu:false,itemjuqing:false,itemtype:"three-s",itempaihang:false});
		additem({item:dy,itemfrom:4,itemto:7,toparent:$("#gke").find(".at").eq(1),itemredu:false,itemjuqing:false,itemtype:"three-s",itempaihang:false});

		//链接跳转
		$("body").on("click",".aconlist",function(){
			var aim=$(this).find("img").eq(0).attr("src").split("/")[1];
			var itemid=$(this).find(".litxt").eq(0).find("span").eq(0).text();
			window.open(aim+".html?name="+escape(itemid),"_self");
		});
	})
		
	// 直播界面
	$.getJSON("js/sql.json",function(json){
		for (var i = 0; i < json.lanmu.length; i++) {
			if (json.lanmu[i].type=="央视频道") {
				for (var a = 0; a < json.lanmu[i].fenlei.length; a++) {
					var li=$("<li></li>").attr("class","H-wsrl");
					var img=$("<img></img>").attr("class","fl H-wst").attr("src",json.lanmu[i].fenlei[a].src);
					var div=$("<div></div>").attr("class","fl H-wswz");
					var h4=$("<h4></h4>").attr("class","font24 H-wsh4").html(json.lanmu[i].fenlei[a].name);
					var p=$("<p></p>").attr("class","font18").html(json.lanmu[i].fenlei[a].current);
					div.append(h4).append(p);
					li.append(img).append(div).appendTo($(".H-weishir"));
				};
			};
			
		};
		$(".H-wsll").click(function(){
				var c=$(".H-wsll").index(this);
				$(".H-wsll").eq(c).addClass("H-wtapl").siblings().removeClass("H-wtapl");
				$(".H-weishir").html("")
				console.log(c)
				if($(".H-wsll").eq(c).html()=="央视频道"){
					for (var x = 0; x < json.lanmu.length; x++) {
					if (json.lanmu[x].type=="央视频道") {
						for (var y = 0; y < json.lanmu[x].fenlei.length; y++) {
							var li=$("<li></li>").attr("class","H-wsrl")
							var img=$("<img></img>").attr("class","fl H-wst").attr("src",json.lanmu[x].fenlei[y].src)
							var div=$("<div></div>").attr("class","fl H-wswz")
							var h4=$("<h4></h4>").attr("class","font24 H-wsh4").html(json.lanmu[x].fenlei[y].name)
							var p=$("<p></p>").attr("class","font18").html(json.lanmu[x].fenlei[y].current)
							li.append(img).append(div.append(h4).append(p)).appendTo($(".H-weishir"))
							};
						};
					};
				}
				if($(".H-wsll").eq(c).html()=="地方频道"){
					for (var x = 0; x < json.lanmu.length; x++) {
					if (json.lanmu[x].type=="地方频道") {
						for (var y = 0; y < json.lanmu[x].fenlei.length; y++) {
							var li=$("<li></li>").attr("class","H-wsrl")
							var img=$("<img></img>").attr("class","fl H-wst").attr("src",json.lanmu[x].fenlei[y].src)
							var div=$("<div></div>").attr("class","fl H-wswz")
							var h4=$("<h4></h4>").attr("class","font24 H-wsh4").html(json.lanmu[x].fenlei[y].name)
							var p=$("<p></p>").attr("class","font18").html(json.lanmu[x].fenlei[y].current)
							li.append(img).append(div.append(h4).append(p)).appendTo($(".H-weishir"))
							};
						};
					};

				}

				var pingmu=$(".hbout").height();
				$(".H-gund").height(pingmu);
				$(".H-weishil").height(pingmu);
		})	
		var pingmu=$(".hbout").height();
		$(".H-gund").height(pingmu);
		//$(".H-weishil").height(pingmu);
		$('.H-weishi').height(pingmu);
	})

	//大图滚动界面
	$.getJSON("js/sql.json",function(json){
		var zt=json.xinwen;//新闻
		var dy=json.dianying;//电影
		var yl=json.lanmu[2].fenlei[5].juji;//娱乐
		var ty=json.tiyu[1].juji;//体育
		$("#shouye").find(".scroll").eq(0).CreatRoll(zt).imgRoll();
		$("#xinwen").find(".scroll").eq(0).CreatRoll(dy).imgRoll();
		$("#tiyu").find(".scroll").eq(0).CreatRoll(ty).imgRoll();
		$("#dianying").find(".scroll").eq(0).CreatRoll(dy).imgRoll();
		$("#yule").find(".scroll").eq(0).CreatRoll(yl).imgRoll();
		$("#zhuanti").find(".scroll").eq(0).CreatRoll(ty).imgRoll();
		$("#gke").find(".scroll").eq(0).CreatRoll(zt).imgRoll();

		//链接跳转
		$("body").on("click",".sitem",function(){
			var aim=$(this).find("img").eq(0).attr("src").split("/")[1];
			var itemid=$(this).find(".smask").eq(0).text();
			window.open(aim+".html?name="+escape(itemid),"_self");
		});
	})
	//电影界面
/*	$.getJSON("js/sql.json",function(json){
		var dy=json.dianying;
		function addmovie(item,from,to,obj){
			var div=$("<div></div>").attr("class","dy");
			var ul=$("<ul></ul>").attr("class","dys");
			for(var i=from;i<to;i++){
				var li=$("<li></li>").attr("class","dylist fl");
				var img=$('<img />').attr("class","three-s").attr("src",item[i].src);
				var p=$("<p></p>").addClass("font18 H-mp").text(item[i].name);
				li.append(img).append(p).appendTo(ul);
			}
			div.append(ul).insertAfter(obj);
			$(".dy").on("click","li",function(){
				window.location.href='dianyingxiangqing.html?name='+escape($(this).find(".font18").html());
			});
		}
		addmovie(dy,0,3,$("#dianying").find(".at").eq(0));
		addmovie(dy,3,9,$("#dianying").find(".at").eq(1));			
	})*/

	//$(".hbcon").height($(window).height()-$(".header").height()-$(".hnav").height());//直播频道高度

	// $("body").on("click","li",function(){
	// 	var as=$(this).find("img").attr("src").split("/");
	// 	alert($(this));
	// 	// window.location.href='dianyingxiangqing.html?name='+escape($(this).find(".font18").html());
	// });

	// 新闻
	$(function(){
		newlist($("#xinwen"));
		$("#xinwen .news").on("click",".newslist",function(){
			window.location.href="xinwen.html?name="+escape($(this).find(".newstit").html());
		});
	});

	// 专题
	$(function(){
		newlist($("#zhuanti"));
		$("#zhuanti .news").on("click",".newslist",function(){
			window.location.href="zhuanti.html?name="+escape($(this).find(".newstit").html());
		});
	});
	function newlist(obj){
		var i=0;
		var jsn=null;
		$.getJSON("js/sql.json",function(json){
			jsn=json.xinwen.length;
			var xw=json.xinwen;
			for(i;i<6;i++){
				insert(obj);
			}

			function insert(obj){
					var li=$("<li></li>").attr("class","newslist fl");
					var img=$("<img/>").attr("class","newstu fl weishi").attr("src",xw[i].src);
					li.append(img);
					var div=$("<div></div>").attr("class","fl");
					var a=$("<a></a>").attr("class","newstit font18").html(xw[i].name);
					var p=$("<p></p>").attr("class","newscon font16 b3 fl").html(xw[i].neirong);
					div.append(a);
					div.append(p);
					li.append(div);
					obj.find(".news").append(li);
					//$("#zhuanti").find(".news").append(li);	
			}

			var j=0; 
			$(".w-news").on("click",".newsgd",function(){
				$(".news").html("");
				if(j<Math.ceil(jsn/6)){
					for(i=6*j;i<6*j+6;i++){
						insert(i);
					}
					j++;
				}else{
					j=0;
					console.log(j);
					for(i=6*j;i<6*j+6;i++){
						insert(i);
					}
					j++;
				}
			});
		})
	}
})