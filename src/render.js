import {Fragment} from "react";

/**
 * Componente para renderizar o bloco.
 * É aplicado em dois locais diferentes em edit.js e um em save.js
 *
 * @param {boolean} preview Determina se está em modo preview (bloco isSelected), para renderizar diferente, se necessário
 * @return {JSX.Element} Renderização do bloco
 */
export default function Render({ preview, attributes }) {
	const {
		usePosts,
		postType,
		postCategory,
		exactWidth,
		itemWidth,
		responsive,
		duration,
		slidesToScroll,
		slidesToShow,
		images,
		arrows,
		dots,
		slidesNumber,
		sliderID,
		useContainer,
		containerColor,
		legend,
		height,
		autoplay,
	} = attributes;

	const containerStyle = () => !useContainer ?? {
		background: containerColor,
		padding: '15px',
		borderRadius: '3px',
	}

	async function getPosts() {
		//
	}

	async function holdRenderForPosts(usePosts) {
		if (!usePosts) return window.dispatchEvent('ufrLoadPosts');
		const mainSlider = document.getElementById(sliderID);
		const thumbnailSlider = document.getElementById(`${sliderID}-thumbnail`);
		const mainList = mainSlider.querySelector('.splide__list');
		const thumbnailList = thumbnailSlider.querySelector('.splide__list');

		// Loader

		const posts = await getPosts();

		window.dispatchEvent('ufrLoadPosts');
    }

	function RenderFromImages({ thumbnail = false }) {
	    return images.map(({ caption, alt, url }) => {
			const useLegend = !thumbnail && caption && legend;

            return (
	            <li className="splide__slide">
		            <img src={url} alt={alt ?? ''} />

		            {useLegend &&
		                <div className="description">
			                {caption}
		                </div>
					}
	            </li>
            );
        });
	}

	function RenderFromPosts({ thumbnail = false }) {
		return images.map(({ caption, alt, url }) => {
			const useLegend = !thumbnail && caption && legend;

			return (
				<li className="splide__slide">
					<img src={url} alt={alt ?? ''} />

					{useLegend &&
					<div className="description">
						{caption}
					</div>
					}
				</li>
			);
		});
	}

	return (
		<Fragment>
			<div className="splide-container" style={containerStyle()}>
				<div className="splide splide-main" id={sliderID}>
					<div className="splide__track">
						<ul className="splide__list">
							{!usePosts && <RenderFromImages />}
						</ul>
					</div>
				</div>

				<div className="splide splide-thumbnail" id={`${sliderID}-thumbnail`}>
					<div className="splide__track">
						<ul className="splide__list">
							{!usePosts && <RenderFromImages thumbnail />}
						</ul>
					</div>
				</div>
			</div>

			<script>
				{`
					var holdRenderForPosts = ${holdRenderForPosts};

					holdRenderForPosts(${usePosts});

					document.addEventListener('DOMContentLoaded', function() {
						window.addEventListener('ufrLoadPosts', function() {
							var splideThumbnails = new Splide( '#${sliderID}-thumbnails', {
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

                            var splideMain = new Splide( '#${sliderID}', {
                                type      : 'fade',
                                rewind    : true,
                                pagination: false,
                                arrows    : true,
                                cover     : true,
                                height    : '${height}px',
                                autoplay  : ${autoplay},
							});

							splideMain.sync(splideThumbnails);
							splideMain.mount();
							splideThumbnails.mount();
						});
					});
				`}
			</script>
		</Fragment>
	);
}
