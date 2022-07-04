// load remote file
function loadDoc(filename) {
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function() {
		document.getElementById('content').innerHTML =
			marked.parse(this.responseText);
	}
	xhttp.open("GET", filename, true);
	xhttp.send();
}


window.onload = function() {
	loadDoc("bash-faq.md");
}
