// init quote
function _init_quote(){
	const quotes = [
		{
			content: "By studying the masters and not their pupils.",
			author: "Niels Henrik Abel",
		},
		{
			content: "Simplicity is complex. It's never simple to keep things simple. Simple solutions require the most advanced thinking.",
			author: "Richie Norton",
		},
		{
			content: "The human race is always faced with a choice: to seek equality in poverty or to seek freedom in inequality.", 
			author: "Hayek?",
		},
		{
			content: "知而不行，是为不知；行而不知，可以致知。",
			author: "王阳明",
		},
		{
			content: "笼鸡有食汤锅近，野鹤无粮天地宽。",
			author: "罗洪先《醒世诗》",
		},
	];
	const getQuote = ()=>{
		const n = quotes.length;
		const r = Math.floor(Math.random()*n);
		return quotes[r];
	};
	contentE = document.querySelector(".quote-content");
	authorE = document.querySelector(".quote-author");
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


window.onload = function() {
	init();
	var docName ="bash"; // default doc
	const docE = document.querySelector("#content");
	const urlParams = new URLSearchParams(window.location.search);
	if(urlParams.has('doc')){
		docName = urlParams.get('doc');
	}
	loadDoc(docName, docE);
}
