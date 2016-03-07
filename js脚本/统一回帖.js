var floors = document.getElementsByClassName("l_post");	
var length = floors.length;
var i = 1;
var time = setInterval(go, 2000);
function go() {
	if (i < length) {
		reply(floors[i]);
		i++;	
	} else {
		clearInterval(time);
	}
}
function getMessage() {
	var num = Math.random()*10;
	num = Math.floor(num);
//	alert(num);
	if (num % 2 == 0) {
		return "晴川沥沥汉阳树，芳草栖栖鹦鹉洲。";
	} else {
		return "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈。";
	}
}
function reply(obj){
		var reply = obj.getElementsByClassName("lzl_link_unfold")[0];
		reply.click();
	//	setTimeout(alert("haha"), 1000);
		var p = obj.getElementsByTagName("p")[2];
		p.innerHTML = getMessage();	
	//	window.alert(p);
		var btn = obj.getElementsByClassName("lzl_panel_submit")[0];
		btn.click();
}

