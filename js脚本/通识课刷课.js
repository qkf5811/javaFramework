javascript: 
//Ìø×ªµ½Í¨Ê¶¿ÎÒ³Ãæ
document.getElementById('m7').getElementsByTagName('a')[0].onclick();
//¿Î³ÌtableµÄid=lvClassCourses_itemPlaceholderContainer
//¿Î³ÌµÄtr
javascript:alert(document.getElementById('win').contentWindow.document.getElementById('form1').getElementsByTagName('div')[2].getElementsByTagName('table')[1].getElementsByTagName('tr').length);
//Êä³öËùÓÐ¿Î³ÌÀàÐÍ
javascript:var trs = document.getElementById('win').contentWindow.document.getElementById('form1').getElementsByTagName('div')[2].getElementsByTagName('table')[1].getElementsByTagName('tr');for(var i = 1; i < trs.length; ++i){var tds = trs[i].getElementsByTagName('td');alert(tds[3].innerText);};
avascript:var trs = document.getElementById('win').contentWindow.document.getElementById('form1').getElementsByTagName('div')[2].getElementsByTagName('table')[1].getElementsByTagName('tr');for(var i = 1; i < trs.length; ++i){var tds = trs[i].getElementsByTagName('td');if(tds[3].innerText.match("ÈËÎÄ")) {tds[0].getElementsByTagName('input')[0].checked=true;}};
//v1.0 每次全选
javascript:
function go(){
	var flag = false;var trs = document.getElementById('win').contentWindow.document.getElementById('form1').getElementsByTagName('div')[2].getElementsByTagName('table')[1].getElementsByTagName('tr');
	for(var i = 1; i < trs.length; ++i){
		var tds = trs[i].getElementsByTagName('td');
		if(tds[3].innerText.match("经济")) {
			tds[0].getElementsByTagName('input')[0].checked=true;
			flag = true;
		}
	}if(flag == true) {
			setTimeout(document.getElementById('win').contentWindow.document.getElementById('selOK').click(), 10);
			setTimeout(document.getElementById('win').contentWindow.document.getElementById('Button1').click(), 200);
	}
	var flash = document.getElementById('m7').getElementsByTagName('a')[0];
	flash.onclick();
}setInterval(go, 1300);
//v1.0 每次一门
javascript:
function go(){
	var flash = document.getElementById('m7').getElementsByTagName('a')[0];
	flash.click();
	var btn = document.getElementById('win').contentWindow.document.getElementById('Button1');
	if (btn != null) {
		btn.click();
	}	
	var trs = document.getElementById('win').contentWindow.document.getElementById('form1').getElementsByTagName('div')[2].getElementsByTagName('table')[1].getElementsByTagName('tr');
	for(var i = 1; i < trs.length; ++i){
		var tds = trs[i].getElementsByTagName('td');
		if(tds[3].innerText.match("经济")) {
			tds[0].getElementsByTagName('input')[0].checked=true;
			document.getElementById('win').contentWindow.document.getElementById('selOK').click();
		}	
	}	
}
setInterval(go, 1000);
//v1.1
javascript:
function go(){
	var flag = false;
	var flash = document.getElementById('m7').getElementsByTagName('a')[0];
	flash.click();
	var btn = document.getElementById('win').contentWindow.document.getElementById('Button1');
	if (btn != null) {
		btn.click();
	} else {
		var trs = document.getElementById('win').contentWindow.document.getElementById('form1').getElementsByTagName('div')[2].getElementsByTagName('table')[1].getElementsByTagName('tr');
		for(var i = 1; i < trs.length; ++i){
			var tds = trs[i].getElementsByTagName('td');
			if(tds[3].innerText.match("经")) {
				tds[0].getElementsByTagName('input')[0].checked=true;
				flag = true;
				break;
			}	
		}
		if (flag == true) {
			document.getElementById('win').contentWindow.document.getElementById('selOK').click();
		}
	}
}
setInterval(go, 1300);
//test
javascript:
function go(){
	var flash = document.getElementById('m7').getElementsByTagName('a')[0];
			flash.click();
	var flag = false;
	var btn = document.getElementById('win').contentWindow.document.getElementById('Button1');
	if (btn != null) {
		document.getElementById('win').contentWindow.document.form1.submit();
		
	} else {
		var trs = document.getElementById('win').contentWindow.document.getElementById('form1').getElementsByTagName('div')[2].getElementsByTagName('table')[1].getElementsByTagName('tr');
		for(var i = 1; i < trs.length; ++i){
			var tds = trs[i].getElementsByTagName('td');
			if(tds[3].innerText.match("经")) {
				tds[0].getElementsByTagName('input')[0].checked=true;
				flag = true;
				break;
			}	
		}
		if (flag == true) {
			document.getElementById('win').contentWindow.document.form1.submit();
		} else {
			var flash = document.getElementById('m7').getElementsByTagName('a')[0];
			flash.click();
		}
	}
}
setInterval(go, 900);