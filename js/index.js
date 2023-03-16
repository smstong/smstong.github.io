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
	
	const docBtns = document.querySelectorAll(".DocBtn");
	docBtns.forEach((btn)=>{
		const docFile = `md/${btn.id}-faq.md`;
		window.location.search = `?doc=${docFile}`;
	});
}
// load remote file to element docE
function loadDoc(filename, docE) {

	const xhttp = new XMLHttpRequest();
	xhttp.onload = function() {
		docE.innerHTML = marked.parse(this.responseText);
	}
	xhttp.open("GET", filename, true);
	xhttp.send();
}


window.onload = function() {
	init();
	var docName = "md/bash-faq.md"; // default doc
	const docE = document.querySelector("#content");
	const urlParams = new URLSearchParams(window.location.search);
	if(urlParams.has('doc')){
		docName = urlParams.get('doc');
	}
	loadDoc(docName, docE);
}
