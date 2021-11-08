import {Fragment} from "react";
import { v4 as uuidv4 } from 'uuid';

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
	} = attributes;

	const gliderID = `glider-${uuidv4()}`;

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
				/>

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
