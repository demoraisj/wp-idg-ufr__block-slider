async function getPosts(postType, postCategory, postsQuantity) {
	var postsUrl = ufrGlobals.siteUrl + `/wp-json/wp/v2/posts?_embed=&_locale=user&per_page=${postsQuantity}`

	switch (postType) {
		case 'most-recent':
			return (await fetch(postsUrl)).json();

		case 'most-seen':
			return (await fetch(ufrGlobals.siteUrl + `/wp-json/ufr/most-seen-posts?quantity=${postsQuantity}`)).json();

		case 'category':
			return (await fetch(postsUrl + `&categories=${postCategory}`)).json();
	}
}

async function holdRenderForPosts(usePosts, useLegends, postType, postCategory, sliderID, postsQuantity, duration) {
	var ufrLoadPosts = new Event('ufrLoadPosts');

	if (!usePosts) return window.dispatchEvent(ufrLoadPosts);

	var mainSlider = document.getElementById(sliderID);
	var thumbnailSlider = document.getElementById(`${sliderID}-thumbnail`);
	var mainList = mainSlider.querySelector('.splide__list');
	var thumbnailList = thumbnailSlider.querySelector('.splide__list');

	function suppressErrors(cb) {
		try {
			cb();
		} catch (error) {
			//
		}
	}

	// Loader

	var posts = await getPosts(postType, postCategory, postsQuantity);

	if (posts) {
		posts.forEach(({ link, title, _embedded, thumbnail }) => {
			var img = ufrGlobals.themeUrl + '/assets/img/logo/ufr-bg.png';
			var imgAlt = '';

			if (postType === 'most-seen') {
				suppressErrors(function () {
					if (thumbnail) img = thumbnail;
				})
			} else {
				title = title.rendered;

				suppressErrors(function () {
					if (_embedded['wp:featuredmedia'][0].source_url) img = _embedded['wp:featuredmedia'][0].source_url;
				})

				suppressErrors(function () {
					if (_embedded['wp:featuredmedia'][0].alt_text) imgAlt = _embedded['wp:featuredmedia'][0].alt_text;
				})
			}

			var legend = useLegends ? `
				<div class="description">
		        	${title}
                </div>
			` : '';

			mainList.innerHTML += `
				<li class="splide__slide"
					data-splide-interval="${duration * 1000}"
					style="cursor: pointer;"
					onclick="location.href = '${link}'"
					onauxclick="window.open('${link}', '_blank')"
				>
					<img src="${img}" alt="${imgAlt}" />

					${legend}
				</li>
			`;

			thumbnailList.innerHTML += `
				<li class="splide__slide">
					<img src="${img}" alt="${imgAlt}" />
				</li>
			`;
		})
	}

	window.dispatchEvent(ufrLoadPosts);
}
