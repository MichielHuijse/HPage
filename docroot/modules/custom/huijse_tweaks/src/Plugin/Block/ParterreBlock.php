<?php

namespace Drupal\huijse_tweaks\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Provides a 'ParterreBlock' block.
 *
 * @Block(
 *  id = "parterre_block",
 *  admin_label = @Translation("Parterre block"),
 * )
 */
class ParterreBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return [
        'text' => [
          'value' => '',
          'format' => 'full_html',
        ],
        'label_display' => FALSE,
      ] + parent::defaultConfiguration();
  }

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {
    $form['text'] = [
      '#type' => 'text_format',
      '#title' => $this->t('Text'),
      '#description' => $this->t('Port of Partnership logo here.'),
      '#default_value' => $this->configuration['text']['value'],
      '#format' => $this->configuration['text']['format'],
      '#weight' => '0',
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state) {
    $this->configuration['text'] = $form_state->getValue('text');
    $this->configuration['image'] = $form_state->getValue('image');
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];
    $build['text']['#markup'] = check_markup($this->configuration['text']['value'], $this->configuration['text']['format']);

    return $build;
  }
}

