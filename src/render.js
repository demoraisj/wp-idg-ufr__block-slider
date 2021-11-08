/**
 * Componente para renderizar o bloco.
 * É aplicado em dois locais diferentes em edit.js e um em save.js
 *
 * @param {boolean} preview Determina se está em modo preview (bloco isSelected), para renderizar diferente, se necessário
 * @return {JSX.Element} Renderização do bloco
 */
import {Fragment} from "react";

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
		slidesToShow
	} = attributes;

	return (
		<Fragment>
			<div className="glider-contain">
				<div className="glider"
				     data-slidesToShow={slidesToShow}
				     data-slidesToScroll={slidesToScroll}
				     data-duration={duration}
				     data-responsive={responsive}
				     data-itemWidth={itemWidth}
				     data-exactWidth={exactWidth}
				>
					<div>1</div>
					<div>2</div>
					<div>3</div>
					<div>4</div>
				</div>

				<button aria-label="Anterior" className="glider-prev">
					<i className="fas fa-arrow-alt-circle-left fa-2x" />
				</button>

				<button aria-label="Próximo" className="glider-next">
					<i className="fas fa-arrow-alt-circle-right fa-2x" />
				</button>

				<div role="tablist" className="dots" />
			</div>

			<script>

			</script>
		</Fragment>
	);
}
