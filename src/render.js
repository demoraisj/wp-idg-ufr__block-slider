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
		duration,
		images,
		sliderID,
		useContainer,
		containerColor,
		postsQuantity,
		legend,
		height,
		autoplay,
	} = attributes;

	const containerStyle = () => useContainer ? {
		background: containerColor,
		padding: '15px',
		borderRadius: '3px',
	} : {};

	function RenderFromImages({ thumbnail = false }) {
	    return images.map(({ caption, alt, url }) => {
			const useLegend = !thumbnail && caption && legend;

            return (
	            <li className="splide__slide" data-splide-interval={duration * 1000}>
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
					window.addEventListener('ufrLoadPosts', function() {
							var main = document.getElementById('${sliderID}');
							var thumb = document.getElementById('${sliderID}-thumbnail');

                            var splideMain = new Splide(main, {
                                type      : 'fade',
                                rewind    : true,
                                pagination: false,
                                arrows    : true,
                                cover     : true,
                                height    : '${height}',
                                autoplay  : ${autoplay},
							});

							var splideThumbnails = new Splide(thumb, {
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

					document.addEventListener('DOMContentLoaded', function() {
						holdRenderForPosts(
							${usePosts},
							${legend},
							'${postType}',
							'${postCategory}',
							'${sliderID}',
							${postsQuantity},
							${duration}
						);
					});
				`}
			</script>
		</Fragment>
	);
}
