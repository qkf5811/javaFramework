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
			if(tds[3].innerText.match("¾­")) {
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
setInterval(go, 2500);