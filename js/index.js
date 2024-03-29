import { quotes } from "./quotes.js";

// init quote
function _init_quote(){
	const getQuote = ()=>{
		const n = quotes.length;
		const r = Math.floor(Math.random()*n);
		return quotes[r];
	};
	const contentE = document.querySelector(".quote-content");
	const authorE = document.querySelector(".quote-author");
	const quote = getQuote();
	contentE.textContent = quote.content;
	authorE.textContent = quote.author;
}
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
		btn.addEventListener("click", ()=>{
			window.location.search = `?doc=${btn.id}`;
		});
	});

	// init quote
	_init_quote();
}

// load remote file to element docE
function loadDoc(docName, docE) {

	const docFile = `md/${docName}-faq.md`;
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function() {
		docE.innerHTML = marked.parse(this.responseText);
	}
	xhttp.open("GET", docFile, true);
	xhttp.send();
}


window.addEventListener('DOMContentLoaded', ()=> {
	init();
	var docName ="bash"; // default doc
	const docE = document.querySelector("#content");
	const urlParams = new URLSearchParams(window.location.search);
	if(urlParams.has('doc')){
		docName = urlParams.get('doc');
	}
	loadDoc(docName, docE);
});
