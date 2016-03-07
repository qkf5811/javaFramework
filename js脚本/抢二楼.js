var ul;
var themes;                                    //所有帖子
var name = PageData.forum.name_url;            //url编码后的贴吧名                                //回帖的四个参数:1:name, 2:fid, 3:tbd, 4:回帖内容
var fid = PageData.forum.id;                   //fid
var xhr1 = createXMLHttpRequest();
var xhr = createXMLHttpRequest();
//alert(name + " " + fid);
//console.log(themes[0].getElementsByClassName("threadlist_rep_num")[0].textContent);
//var field = JSON.parse(themes[0].getAttribute("data-field"));
//alert(field.id);
//themes[0].getElementsByTagName("a")[0].click();
var field;                                     //保存tbs的对象
var add;										
//var xhr = createXMLHttpRequest();
function filter() {
//	console.log("主题数: " + themes.length);
	for (var i = 0; i < themes.length; ++i) {
		var count = parseInt(themes[i].getElementsByClassName("threadlist_rep_num")[0].textContent);
	//	alert("count: " + count);
		if (count != null && count == 0) {
			//得到tid
			field = JSON.parse(themes[i].getAttribute("data-field"));
	//		console.log("tid: " + field.id);
			get(themes[i], field);
			break;
		}
	}
	document.getElementsByClassName("tbui_fbar_refresh")[0].click();
}

setInterval(flesh, 2000);
function flesh() {
	ul =  document.getElementById("thread_list");
	themes = ul.getElementsByClassName("j_thread_list");
	filter();
}
//xhr
function createXMLHttpRequest() {
	try {
		return new XMLHttpRequest();	
	} catch(e) {
		try {
			return new ActiveXObject("Msxml2.XMLHTTP");		
		} catch(e) {
			try {
				return new ActiveXObject("Microsoft.XMLHTTP");
			} catch(e) {
				concole.log("该浏览器不支持XMLHttpRequest!");
				throw new RuntimeException(e);			
			}
		}
	}
}
function post(field, tbs) {
//	console.log("get请求接受成功！");
//send
//五邑大学
/*ie=utf-8&kw=%E4%BA%94%E9%82%91%E5%A4%A7%E5%AD%A6&fid=373184&tid=" + 
						field.id +"&vcode_md5=&floor_num=1205&rich_text=1&tbs=" + tbs + "&content=" + 
						"-------------------------------------------------------------------------------------" + getMessage() +  
						"&files=%5B%5D&mouse_pwd=110%2C101%2C110%2C112%2C109%2C104%2C106%2C108%2C109%2C85%2C109%2C112%2C108%2C112%2C109%2C112%2C108%2C112%2C109%2C112%2C108%2C112%2C109%2C112%2C108%2C112%2C109%2C112%2C108%2C85%2C101%2C104%2C101%2C100%2C85%2C109%2C111%2C106%2C106%2C112%2C107%2C106%2C100%2C14285819767920&mouse_pwd_t=1428581976792&mouse_pwd_isclick=0&__type__=reply*/					
//测试
/*ie=utf-8&kw=%E6%9D%A5%E5%9B%9E%E8%B8%B1%E6%AD%A5&fid=11541458&tid=" + 
						field.id +"&vcode_md5=&floor_num=3&rich_text=1&tbs=" + tbs + "&content=" + 
						"-------------------------------------------------------------------------------------" + getMessage() +  
						"&files=%5B%5D&mouse_pwd=39%2C38%2C34%2C56%2C37%2C33%2C37%2C44%2C29%2C37%2C56%2C36%2C56%2C37%2C56%2C36%2C56%2C37%2C56%2C36%2C56%2C37%2C56%2C36%2C56%2C37%2C56%2C36%2C29%2C37%2C36%2C34%2C33%2C39%2C29%2C37%2C39%2C34%2C34%2C56%2C35%2C34%2C44%2C14285865078200&mouse_pwd_t=1428586507820&mouse_pwd_isclick=0&__type__=reply*/
//武林post体
/*ie=utf-8&kw=%E6%AD%A6%E6%9E%97%E7%BE%A4%E4%BE%A0%E4%BC%A0&fid=20528&tid=" + 
						field.id +"&vcode_md5=&floor_num=13&rich_text=1&tbs=" + tbs + "&content=" + getMessage() +  
						"&files=%5B%5D&mouse_pwd=40%2C43%2C35%2C55%2C34%2C47%2C41%2C42%2C18%2C42%2C55%2C43%2C55%2C42%2C55%2C43%2C55%2C42%2C55%2C43%2C55%2C42%2C55%2C43%2C55%2C42%2C55%2C43%2C18%2C42%2C42%2C46%2C35%2C43%2C18%2C42%2C40%2C45%2C45%2C55%2C44%2C45%2C35%2C14285868966270&mouse_pwd_t=1428586896627&mouse_pwd_isclick=0&__type__=reply*/
					//并发送post请求
					//console.log(themes[i].getElementsByClassName("j_th_tit")[0].textContent);
					
					xhr1.open("post", "http://tieba.baidu.com/f/commit/post/add", true);
					xhr1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	//				xhr1.setRequestHeader("Referer", add.href);
	
		//			console.log("tid: " + field.id + ", tbs: " + tbs);
					//-----------------------下面这个括号里的替换成其他请求体源码-------------------------------------

					xhr1.send("ie=utf-8&kw=" + name + "&fid=" + fid + "&tid=" + field.id +"&tbs=" + tbs + "&content=" + getMessage());
					xhr1.onreadystatechange = function() {
						if (xhr1.readyState == 4 && xhr1.status == 200) {
							console.log("success!");
							//刷新
							document.getElementsByClassName("tbui_fbar_refresh")[0].click();
							ul =  document.getElementById("thread_list");
							themes = ul.getElementsByClassName("j_thread_list");
						} else {
							console.log("回帖失败!");
						}
					} 

}
function get(obj, field) {
			add = obj.getElementsByTagName("a")[0];
	//		console.log("向" + add.href + "发送get请求!");		
		//	console.log(get.href);
			//发送get请求获取document,在通过document获取tbs
			
			xhr.open("get", add.href, true);
			xhr.send(null);
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && xhr.status == 200) {
					//获取tbs
					var text = xhr.responseText;
					var start = text.indexOf("PageData");
					var tbs = text.substr(start+28, 26);
			//		console.log("tbs"  + tbs);
					post(field, tbs);
				} else {
					console.log("get请求接受失败!");		
				}
			}
}
function getMessage() {
	var num = Math.random()*10;
	num = Math.floor(num);
	if ( num % 2 == 0) 
		return getsj();
	else 
		return getdz();
}

function getsj() {
	var num = Math.random()*10;
	num = Math.floor(num);
	if (num == 0) {
		return "人生若只如初见，何事秋风悲画扇。 —— 纳兰性德《木兰词·拟古决绝词柬友》";
	} else if (num == 1) {
		return "故人西辞黄鹤楼，烟花三月下扬州。 —— 李白《黄鹤楼送孟浩然之广陵》";
	} else if (num == 2) {
		return "寂寞空庭春欲晚，梨花满地不开门。 —— 刘方平《春怨》";
	} else if (num == 3) {
		return "清明时节雨纷纷，路上行人欲断魂。 —— 杜牧《清明》";
	} else if (num == 4) {
		return "被酒莫惊春睡重，赌书消得泼茶香，当时只道是寻常。 —— 纳兰性德《浣溪沙·谁念西风独自凉》";
	} else if (num == 5) {
		return "冠盖满京华，斯人独憔悴。 —— 杜甫《梦李白二首·其二》";
	} else if (num == 6) {
		return "沾衣欲湿杏花雨，吹面不寒杨柳风。 —— 志南《绝句》";
	} else if (num == 7) {
		return "古人学问无遗力，少壮工夫老始成。 —— 陆游《冬夜读书示子聿》";
	} else if (num == 8) {
		return "莫愁前路无知己，天下谁人不识君。 —— 高適《别董大二首》";
	} else if (num == 9) {
		return "红豆生南国，春来发几枝。 —— 王维《相思》";
	}
}
function getdz() {
		var num = Math.random()*10;
	num = Math.floor(num);
	if (num == 0) {
		return "作为二楼，我深感责任重大，要是我不回复，楼主还以为自己玩的是单机版的百度，另外我要摸四楼的狗头，我之所以不摸三楼，是因为怕有孙子跟我抢二楼，一不小心就摸了自己。";
	} else if (num == 1) {
		return "作为2楼，我表示压力很大，小霸王F5，双飞燕鼠标这是必备的，眼要贼，手要快，看见0回复果断进，Ctrl+V Ctrl+Enter这要一气呵成，晚1秒就可能成孙子了，经验拿到了，马上走。";
	} else if (num == 2) {
		return "没错，我又来抢二楼了，最近有好多人问我说：你为什么老抢二楼呢，我总是摸摸他的头语重心长的回答，孩子，你还小，有很多事你还不懂，抢二楼要并不只是技巧，同时这在磨练一个人的心态，意志，反应能力，良好素质，就拿我说吧，见到那些小喽喽，从未有过一丝畏惧，从容面对。";
	} else if (num == 3) {
		return "كما في الطابق الثاني، أشعر بالمسؤولية الثقيلة، وإذا كنت لا ترد، ويعتقد أن المالك هو لعب إصدار مستقل من بايدو، وأري";
	} else if (num == 4) {
		return "这排字,叫谁都写不工整：厂下广卞廿士十一卉半与本二上旦上二本与半卉一十士廿卞广下厂下广卞廿士十一卉半与本二上旦上二本与半卉一十士廿卞广下厂下广卞廿士十一卉半与本二上旦上 二本与半卉一十士廿卞广下厂下广卞廿士十一卉半与本二上旦上二本与半卉一十士廿卞广下厂下广卞廿士";
	} else if (num == 5) {
		return "抢二楼不仅仅关系到一个贴的内涵，还有可能关系到各国与各国的和平，所以，抢二楼不能带一丝恶意，更不能带有侮辱性，不能有粗口，你要记住，你是抢二楼的，那么就必须要温柔，素质，有爱，孩子，这一点很重要，别看现在抢二楼并没什么，其实，这是在考验你。";
	} else if (num == 6) {
		return "抢二楼事关到你将来的路，你的人生，抢二楼可以看出一个人的文化修养，抢二楼可以知道一个人的素质程度，例如我，从不计较某些人的粗口，一如既往守护二楼，不让任何图谋不轨的人占夺，抢二楼重要的是心态，在你绷紧神经的那一刻就注定这场战争不可避免。";
	} else if (num == 7) {
		return "当然，抢二楼更讲究的是快，准，狠，就说我吧，我抢二楼总是毫不犹豫，下手果断，要做到楼不出我不复制，当然，你看到了那个遍体前的回复和点击了吗，抓紧时机，当你看到0这个字眼你就该感到敏感，果断点击标题，进行复制，当然，F5 Ctrl+V键都必须是南非真钻，耐磨度高，不易受损。";
	} else if (num == 8) {
		return "此时或许三楼会对我有些许憎恨，但不必在乎，因为抢二楼令三楼憎恨是不可免的，调理好自己的心态才是最重要的，想要做到世界顶峰级的抢二楼高手那是不可能的，一山更有一山高，虽然如此，不能放弃，虽然做不到顶峰，但至少超越自己 。";
	} else if (num == 9) {
		return "以上所说的都是抢二楼必备的。";
	}
}