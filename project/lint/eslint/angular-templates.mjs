/**
 * Theme "angularTemplates" (lint): templates written as Angular advises.
 *
 * The recommended template config of angular-eslint, and the rules below: built-in control flow,
 * class and style bindings, NgOptimizedImage, expressions kept simple.
 */
import { FILES } from '../load.mjs';

export const theme = 'angularTemplates';
export const packages = ['angular-eslint'];
const RULES = {
  // A <button> in a form submits it unless it says type="button".
  '@angular-eslint/template/button-has-type': 'error',
  // Branches of a condition in a template: beyond, compute it in the component.
  '@angular-eslint/template/conditional-complexity': ['error', { maxComplexity: 4 }],
  // Paths through a template: beyond, split the component.
  '@angular-eslint/template/cyclomatic-complexity': ['error', { maxComplexity: 12 }],
  // $any() switches off the type check of the template.
  '@angular-eslint/template/no-any': 'error',
  // An attribute written twice: one of them is lost.
  '@angular-eslint/template/no-duplicate-attributes': 'error',
  // An empty @if, @for or @switch block is a leftover.
  '@angular-eslint/template/no-empty-control-flow': 'error',
  // [class.name] rather than [ngClass].
  '@angular-eslint/template/prefer-class-binding': 'error',
  // @if, @for, @switch rather than *ngIf, *ngFor, ngSwitch.
  '@angular-eslint/template/prefer-control-flow': 'error',
  // ngSrc (NgOptimizedImage) for images: sizes, lazy loading, priority.
  '@angular-eslint/template/prefer-ngsrc': 'error',
};

/**
 * @param {Record<string, any>} loaded The packages of the theme.
 * @returns {object[]} The configs of the theme.
 */
export function configs(loaded) {
  return [
    {
      name: 'lint/angular-templates',
      files: FILES.templates,
      extends: [loaded['angular-eslint'].configs.templateRecommended],
      rules: RULES,
    },
  ];
}
