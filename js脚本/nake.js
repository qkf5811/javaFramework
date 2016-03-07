var kcArrs= 35;

//	d.setTime(d.getTime()-1);
//	console.log("3112003000_XZKC" + "=XZKC=0100" + kcArrs + "0_0_%E5%BD%93%E4%BB%A3%E5%9B%BD%E7%B1%8D%E8%B4%B8%E6%98%93%E5%AF%BC%E8%AE%BA_0.5"+';expires='+d.toGMTString()+';');
//	document.cookie ="3112003000_XZKC" + "=;expires=" + d.toGMTString(); + ';';
//	d.setTime(new Date().getTime());

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

function g() {
	
//	console.log("cookie:" + document.cookie)
var xhr1 = createXMLHttpRequest();
var xhr2 = createXMLHttpRequest();

	var d = new Date();
	d.setTime(d.getTime()+3600*24);//0100350_0_当代国籍贸易导论_0.5_计划课程
	document.cookie =" 3112003000_XZKC" + "=XZKC=0100390_0_%E5%BD%93%E4%BB%A3%E5%9B%BD%E7%B1%8D%E8%B4%B8%E6%98%93%E5%AF%BC%E8%AE%BA_0.5_%E8%AE%A1%E5%88%92%E8%AF%BE%E7%A8%8B" + ';expires='+d.toGMTString()+';';
	xhr1.open("get", "http://202.192.240.54/tbx/txkc/savesel.aspx", true);
//	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); http://202.192.240.54/tbx/txkc/confirm.aspx
	xhr1.setRequestHeader("Referer", "http://202.192.240.54/tbx/txkc/confirm.aspx");
	xhr1.send();
	xhr1.onreadystatechange = function() {
						
						if (xhr1.readyState == 4 && xhr1.status == 302) {
							console.log("success!");
					//		kcArrs += 1;
							//刷新
						//	document.getElementsByClassName("tbui_fbar_refresh")[0].click();
						//	ul =  document.getElementById("thread_list");
						//	themes = ul.getElementsByClassName("j_thread_list");
						} else {
						//	console.log("回帖失败!");
						}
					} 
	
	xhr2.open("get", "http://202.192.240.54/tbx/jhkc/savesel.aspx", true);
//	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); http://202.192.240.54/tbx/txkc/confirm.aspx
	xhr2.setRequestHeader("Referer", "http://202.192.240.54/tbx/jhkc/confirm.aspx");
	xhr2.send();
	xhr2.onreadystatechange = function() {
						
						if (xhr2.readyState == 4 && xhr2.status == 302) {
							console.log("success!");
					//		kcArrs += 1;
							//刷新
						//	document.getElementsByClassName("tbui_fbar_refresh")[0].click();
						//	ul =  document.getElementById("thread_list");
						//	themes = ul.getElementsByClassName("j_thread_list");
						} else {
						//	console.log("回帖失败!");
						}
					} 
}
setTimeout(g, 1000);