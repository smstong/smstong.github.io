// init marked
function init(){
	marked.setOptions({
	  renderer: new marked.Renderer(),
	  highlight: function(code, lang) {
		const language = hljs.getLanguage(lang) ? lang : 'plaintext';
		return hljs.highlight(code, { language }).value;
	  },
	  langPrefix: 'language-', 
	  pedantic: false,
	  gfm: true,
	  breaks: false,
	  sanitize: false,
	  smartLists: true,
	  smartypants: false,
	  xhtml: false
	});
}
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
	init();
	loadDoc("bash-faq.md");
}
