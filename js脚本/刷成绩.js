function get() {
	var left = document.getElementById('Menu');
	var table = left.contentWindow.document.getElementsByTagName('table')[0];
	var menu = table.getElementsByTagName('tr')[4];
	var a = menu.getElementsByTagName('tr')[6].getElementsByTagName('a')[0];
//	alert(a.textContent);
	a.click();

	var mainFrame = document.getElementById('MainFrame');
	var doc = mainFrame.contentWindow.document;
	var allTable = doc.getElementsByClassName('MsoTableGrid');
//	alert(allTable.length);
	var rows = allTable[5].getElementsByTagName('tr');
//alert('ÓÐ '  + (rows.length - 1) + " ÐÐÊý¾Ý!");
	for (var i = 1; i < rows.length; ++i) {
    	var tds = rows[i].getElementsByTagName('td');
   // alert("ÓÐ " + tds.length + " ÁÐ.");
   // for (var j = 0; j < cols.length; ++j) {
    	var p = tds[1].getElementsByTagName('p');
    //    alert("¸ÃÐÐÓÐ " + ps.length + " ÁÐ" );
    	if(p[0].textContent.match("大学物理")) {
    		if (tds[4].getElementsByTagName('p')[0].textContent > 60)
    			alert("出成绩了！已过！哈哈哈！");
    		else 
    			alert("挂了...");
    		for (var j = 0; j < tds.length; ++j) {
    			console.log(tds[j].getElementsByTagName('p')[0].textContent);
    		}
    	}
	}
}
setInterval(get, 5000);