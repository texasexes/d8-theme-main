<?php
/**
 * @file
 * Add "bem" function for Pattern Lab & Drupal
 */

use Drupal\Core\Template\Attribute;

$function = new Twig_SimpleFunction('bem2', function ($context, $base_class, $modifiers = array(), $blockname = '', $extra = array()) {
  $classes = [];

  // If using a blockname to override default class.
  if ($blockname) {
    // Set blockname class.
    $classes[] = $blockname . '__' . $base_class;

    // Set blockname--modifier classes for each modifier.
    if (isset($modifiers) && is_array($modifiers)) {
      foreach ($modifiers as $modifier) {
        $classes[] = $blockname . '__' . $base_class . '--' . $modifier;
      };
    }
  }
  // If not overriding base class.
  else {
    // Set base class.
    $classes[] = $base_class;
    // Set base--modifier class for each modifier.
    if (isset($modifiers) && is_array($modifiers)) {
      foreach ($modifiers as $modifier) {
        $classes[] = $base_class . '--' . $modifier;
      };
    }
  }

  // If extra non-BEM classes are added.
  if (isset($extra) && is_array($extra)) {
    foreach ($extra as $extra_class) {
      $classes[] = $extra_class;
    };
  }
    return $classes;


}, array('needs_context' => true, 'is_safe' => array('html')));
