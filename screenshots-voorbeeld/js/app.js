let xhr = new XMLHttpRequest();
xhr.responseType = 'json';
xhr.open('GET', 'data/screenshots.json');
xhr.send();

let contentEl = document.querySelector('.content');
let template = [];

function heading(key, text) {
	return `<h2 id="${key}">${text}</h2>`;
}

function subheading(key, nestedKey, text) {
	return `<a class="expand-link" href="#${key}-${nestedKey}" id="${key}-${nestedKey}"><h3>${text}</h3></a>`;
}

function image(imageURL) {
	return `<img data-src="screenshots/${imageURL}" alt="" />`;
}

xhr.addEventListener('load', () => {
	const response = xhr.response;
	const dateKeys = Object.keys(response).reverse();

	dateKeys.forEach((dateKey) => {
		template.push(heading(dateKey, dateKey));

		const timeKeys = Object.keys(response[dateKey]).reverse();

		timeKeys.forEach((timeKey) => {
			template.push(subheading(dateKey, timeKey, `${timeKey.replace('-', ':')} uur`));

			template.push(`<ul class="images" data-for="${dateKey}-${timeKey}" hidden>`);
			response[dateKey][timeKey].forEach((imageURL) => {
				template.push(`<li>${image(imageURL)}</li>`);
			});

			template.push(`</ul>`);
		});
	});

	contentEl.innerHTML = template.join('');

	let expandLinks = document.querySelectorAll('.expand-link');

	expandLinks.forEach((link) => {
		link.addEventListener('click', (ev) => {
			console.log('click!', );
			let expandTarget = document.querySelector(`[data-for="${ev.currentTarget.getAttribute('href').replace('#', '')}"]`);


			console.log(expandTarget);

			expandTarget.querySelectorAll('img[data-src]').forEach(img => {
				img.setAttribute('src', img.getAttribute('data-src'));
			});

			expandTarget.scrollIntoView(true,
				{
					behavior: 'smooth',
					block: 'start'
				}
			);
		});
	});
});
