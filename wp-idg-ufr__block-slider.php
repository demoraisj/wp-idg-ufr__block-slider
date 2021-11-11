<?php
/**
 * Plugin Name:       Blocos WP-IDG-UFR - Slider de Imagens e Postagens
 * Description:       Componente do DSGOV para o tema WP da Universidade Federal de Rondonópolis.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            UFR
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wp-idg-ufr__block-slider
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */
function create_block_wp_idg_ufr_block_slider_block_init() {
	global $blocks_url;

	$blocks_url = array_merge($block_url ?? [], ['slider' => plugin_dir_url(__FILE__)]);

	register_block_type( __DIR__ );
}
add_action( 'init', 'create_block_wp_idg_ufr_block_slider_block_init' );
