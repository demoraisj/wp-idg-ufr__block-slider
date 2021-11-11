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
		position,
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
		gliderID,
	} = attributes;

	return (
		<Fragment>
			<div className="glider-contain">
				<div className="glider"
				     id={gliderID}
				     data-slidesToShow={slidesToShow}
				     data-slidesToScroll={slidesToScroll}
				     data-duration={duration}
				     data-responsive={responsive}
				     data-itemWidth={itemWidth}
				     data-exactWidth={exactWidth}
				     data-dots={dots}
				     data-arrows={arrows}
				>
					<div>your content here</div>
					<div>your content here</div>
					<div>your content here</div>
					<div>your content here</div>
				</div>

				{arrows &&
					<Fragment>
						<button aria-label="Anterior" className="glider-prev">
							<i className="fas fa-arrow-alt-circle-left fa-2x" />
						</button>

						<button aria-label="Próximo" className="glider-next">
							<i className="fas fa-arrow-alt-circle-right fa-2x" />
						</button>
					</Fragment>
				}

				{dots &&
					<div role="tablist" className="dots" />
				}
			</div>

			<script>
				{`
					var renderSlidesArgs = {
						usePosts: ${usePosts},
						slidesNumber: ${usePosts ? slidesNumber : images.length},
						postCategory: "${postCategory}",
						images: ${images.length > 0 ? JSON.stringify(images) : '[]'},
						postType: "${postType}",
						gliderID: "${gliderID}",
						itemWidth: "${itemWidth}",
					};

					window.addEventListener('ufr-block-dependencies-loaded', function() {
						ufrGlobals.blockScripts.renderSlides(renderSlidesArgs);
					});
				`}
			</script>
		</Fragment>
	);
}
