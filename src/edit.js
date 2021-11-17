import { useBlockProps } from '@wordpress/block-editor';
import { UFRBlockHeader, UFRSelect, UFRCheckbox, UFRGaleryBtn, UFRInput } from 'wp-idg-ufr__block-components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { Fragment } from 'react';
import Render from "./render";
import './editor.scss';
import {v1 as uuid} from "uuid";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function edit({ attributes, setAttributes, isSelected }) {
	/**
	 * Desestruturação dos atributos do bloco registrados em block.json -> "attributes"
	 */
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

	const [categoryOptions, setCategoryOptions] = useState([]);

	/**
	 * Opções para configuração de posição do botão
	 *
	 * @type { {label: string, value: string}[] }
	 */
	const positioningOptions = [
		{ label: 'Esquerda', value: 'start' },
		{ label: 'Centro', value: 'center' },
		{ label: 'Direita', value: 'end' },
	];

	const postTypeOptions = [
		{ label: 'Mais recentes', value: 'most-recent' },
		{ label: 'Mais visitados', value: 'most-seen' },
		{ label: 'Por categoria', value: 'category' },
	];

	if (!sliderID) setAttributes({ sliderID: `slider-${uuid()}` })

	useEffect(async () => {
		const categories = await apiFetch({ path: '/wp/v2/categories' });
		const options = [];

		categories.map(category => {
            options.push({
                label: category.name,
                value: category.id
            });
        });

		setCategoryOptions(options);
	}, []);

	/**
	 * Renderiza o conteúdo. Esconde as configurações do bloco quando ele não está selecionado.
	 *
	 * @param { boolean } selected
	 * @return {JSX.Element} Elemento principal condicional
	 */
	function ConditionalMainContentRender(selected) {
		return selected ? (
			// Visuzalização quando selecionado
			<div
				{...useBlockProps({
					className: 'edit block-responsive ufr-block-component',
				})}
			>
				<div className="row align-items-center">
					<div className="col config">
						<UFRBlockHeader
							title="Slider de Imagens e Postagens"
							description="Configure a aparenência do slider abaixo. Outras configurações podem estar disponíveis no menu á direita."
						/>

						<UFRCheckbox
							label="Usar Postagens no Slider"
							checked={usePosts}
							attr="usePosts"
							setter={setAttributes}
						/>

						{usePosts ? (
							<Fragment>
								<UFRSelect
									label="Tipo de Postagens"
									options={postTypeOptions}
									value={postType}
									attr="postType"
									setter={setAttributes}
								/>

								<UFRInput
									label="Quantidade de Postagens"
									value={postsQuantity}
									attr="postsQuantity"
									setter={setAttributes}
								/>

								{postType === 'category' && <UFRSelect
									label="Selecione a Categoria"
									options={categoryOptions}
									value={postCategory}
									attr="postCategory"
									setter={setAttributes}
								/>}
							</Fragment>
						) : (
							<Fragment>
								<UFRGaleryBtn
									text="Selecionar Imagens"
									icon="fa fa-picture-o"
									allowedTypes={['image']}
									value={images}
									attr={'images'}
									multiple
									setter={setAttributes}
								/>

								<span style={{ color: 'darkred' }}>
									{images.length} imagens selecionadas.
								</span>
							</Fragment>
						)}

						<h3>Configurações Opcionais</h3>

						<UFRInput
							label="Altura do Slider (Incluir unidade de medida. Ex.: 400px)"
							value={height}
							type="text"
							attr="height"
							setter={setAttributes}
						/>

						<UFRInput
							label="Duração de Exibição dos Slides em Segundos"
							value={duration}
							type="number"
							attr="duration"
							setter={setAttributes}
						/>

						<UFRCheckbox
							label="Slides são trocados automáticamente"
							checked={autoplay}
							attr="autoplay"
							setter={setAttributes}
						/>

						<UFRCheckbox
							label="Mostrar Descrição na Imagem"
							checked={legend}
							attr="legend"
							setter={setAttributes}
						/>

						<UFRCheckbox
							label="Envolver Slider em um Bloco Colorido"
							checked={useContainer}
							attr="useContainer"
							setter={setAttributes}
						/>

						{useContainer &&
							<UFRInput
								label="Cor de Fundo do Bloco Envolvente"
								value={containerColor}
								type="color"
								attr="containerColor"
								setter={setAttributes}
							/>
						}
					</div>
				</div>
			</div>
		) : (
			// Visuzalização quando não selecionado
			<div
				{...useBlockProps({
					className: 'show block-responsive ufr-block-component',
				})}
			>
				<div className="row">
					<div className="col-12">
						<Render attributes={attributes} />
					</div>
				</div>
			</div>
		);
	}

	return (
		<Fragment>
			{ConditionalMainContentRender(isSelected)}
		</Fragment>
	);
}
