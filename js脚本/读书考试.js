
function Err(){
	return true;
}
onerror=Err;

function Enable(){
	if (event != null){
		event.returnValue=true;
		event.cancelBubble=false;
		return true;
	}
}

function ChangEvent(obj){
	obj.onmousedown=Enable;
	obj.oncontextmenu=Enable;
	obj.onmouseup=Enable;
	obj.onselectstart=Enable;
	obj.ondragstart=Enable;
	obj.onbeforecopy=Enable;
	obj.oncopy=Enable;
}

function SearchFrame(obj){
var frame=obj.frames;
	if (frame != null){
		var count = frame.length;
		var i = 0;
		while (i < count){
			ChangeObj(frame[i].document);
			i++;
		}
	}
}

function ChangeObj(obj){
	ChangEvent(obj);
	ChangEvent(obj.body);
	SearchFrame(obj);
}

ChangeObj(document);