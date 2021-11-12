import { useBlockProps } from '@wordpress/block-editor';
import Render from "./render";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
	/**
	 * Desestruturação dos atributos do bloco registrados em block.json -> "attributes"
	 */

	return (
		<div {...useBlockProps.save()}>
			<div className="row">
				<div className="col-12">
					<Render attributes={attributes} />
				</div>
			</div>
		</div>
	);
}
