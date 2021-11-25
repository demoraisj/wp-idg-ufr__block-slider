function ufrSetUpSliders(params) {
	const { autoplay, height, sliderID } = params;

	async function getPosts(postType, postCategory, postTag, postsQuantity) {
		const postsUrl = ufrGlobals.siteUrl + `/wp-json/wp/v2/posts?_embed=&_locale=user&per_page=${postsQuantity}`

		switch (postType) {
			case 'most-recent':
				return (await fetch(postsUrl)).json();

			case 'most-seen':
				return (await fetch(ufrGlobals.siteUrl + `/wp-json/ufr/most-seen-posts?quantity=${postsQuantity}`)).json();

			case 'category':
				return (await fetch(postsUrl + `&categories=${postCategory}`)).json();

			case 'tag':
				return (await fetch(postsUrl + `&tags=${postTag}`)).json();
		}
	}

	async function holdRenderForPosts(params) {
		const {
			usePosts,
			postType,
			postCategory,
			sliderID,
			postsQuantity,
			duration,
			postTag,
			showExcerpt,
			showTitle
		} = params;

		const ufrLoadPosts = new Event('ufrLoadPosts');

		if (!usePosts) return window.dispatchEvent(ufrLoadPosts);

		const mainSlider = document.getElementById(sliderID);
		const thumbnailSlider = document.getElementById(`${sliderID}-thumbnail`);
		const mainList = mainSlider.querySelector('.splide__list');
		const thumbnailList = thumbnailSlider.querySelector('.splide__list');

		// Loader

		const posts = await getPosts(postType, postCategory, postTag, postsQuantity);

		if (posts) {
			posts.forEach(({ link, title, _embedded, thumbnail, excerpt }) => {
				let img = ufrGlobals.themeUrl + '/assets/img/logo/ufr-bg.png';
				let imgAlt = '';

				const embeddedImgAltTxt = _embedded ? _embedded['wp:featuredmedia']?.[0]?.alt_text: undefined;
				const embeddedImg = _embedded ? _embedded['wp:featuredmedia']?.[0]?.source_url : undefined;

				if (embeddedImg) img = embeddedImg;
				if (embeddedImgAltTxt) imgAlt = embeddedImgAltTxt;
				if (thumbnail) img = thumbnail;
				if (!(postType === 'most-seen')) title = title.rendered;
				if (!(postType === 'most-seen')) excerpt = excerpt.rendered;

				const useLegends = showTitle || showExcerpt;
				const legend = useLegends ? `
					<div class="description">
						<span class="title">${title}</span>
						<br/>
						${excerpt}
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

	window.addEventListener('ufrLoadPosts', function() {
		const main = document.getElementById(sliderID);
		const thumb = document.getElementById(`${sliderID}-thumbnail`);

		const splideMain = new Splide(main, {
			type      : 'fade',
			rewind    : true,
			pagination: false,
			arrows    : true,
			cover     : true,
			height,
			autoplay,
		});

		const splideThumbnails = new Splide(thumb, {
			fixedWidth  : 100,
			fixedHeight : 60,
			gap         : 10,
			rewind      : true,
			pagination  : false,
			cover       : true,
			arrows      : false,
			isNavigation: true,
			breakpoints : {
				600: {
					fixedWidth : 60,
					fixedHeight: 44,
				},
			},
		});

		splideMain.sync(splideThumbnails);
		splideMain.mount();
		splideThumbnails.mount();
	});

	void holdRenderForPosts(params);
}
