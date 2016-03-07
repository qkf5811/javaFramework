var reply = document.getElementById("quick_reply");
function build() {
	reply.click();
	var p = document.getElementById("ueditor_replace").getElementsByTagName("p")[0];
//	alert(p.innerHTML);
	p.innerHTML = "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈。";
	var submit = document.getElementsByClassName("poster_submit")[0];
	submit.click();
}
setInterval(build, 1000);
