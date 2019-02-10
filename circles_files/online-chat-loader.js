request.get(`https://support_alfa.cs.money/support/views/online_chat1.handlebars?v=14&language=${getCookie('language')}`, (err, response) => {
	if (err) return console.log(err);
	
	console.time('online_chat_load');
	
	//if (getCookie('language') === 'en') return;

	const script_sources = [
		'https://support_alfa.cs.money/online_chat/online_chat.min.js?v=81'
	];

	const online_chat_html = document.createElement('div');
	online_chat_html.innerHTML = response;
	for (let i = 0; i < script_sources.length; i++) {
		let script = document.createElement('script');
		script.setAttribute('src', script_sources[i]);
		online_chat_html.appendChild(script);
	}
	const link = document.createElement('link');
	link.setAttribute('rel', 'stylesheet');
	link.setAttribute('type', 'text/css');
	link.setAttribute('href', 'https://support_alfa.cs.money/support/css/online_chat.css?v=36');
	document.body.appendChild(link);
	
	link.onload = function() {
		document.body.appendChild(online_chat_html);
	};

	console.timeEnd('online_chat_load');
});