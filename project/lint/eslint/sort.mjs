/**
 * Theme "sort" (format): what has no order of its own is sorted, in natural order (2 before 10).
 *
 * - imports and exports, by kind then by name, and the names inside each of them;
 * - union and intersection types, the interfaces a class implements, the decorators;
 * - class members, by kind: injected fields first, then fields, constructor, accessors, methods.
 *
 * The recommended config of eslint-plugin-perfectionist, without the rules that sort what a person
 * orders on purpose: object keys, interface members, the functions of a module, enum members,
 * switch cases, maps and sets.
 */
import { FILES } from '../load.mjs';

export const theme = 'sort';
export const packages = ['eslint-plugin-perfectionist'];
/** The rules of the recommended config that would sort an order chosen by a person. */
const KEPT_IN_ORDER = [
  'perfectionist/sort-enums',
  'perfectionist/sort-interfaces',
  'perfectionist/sort-maps',
  'perfectionist/sort-modules',
  'perfectionist/sort-object-types',
  'perfectionist/sort-objects',
  'perfectionist/sort-sets',
  'perfectionist/sort-switch-case',
];
/** Class members by kind; the fields set by inject() first, since the others use them. */
const CLASS_GROUPS = [
  'injected-property',
  'index-signature',
  ['static-property', 'static-accessor-property'],
  'static-block',
  ['property', 'accessor-property'],
  ['protected-property', 'protected-accessor-property'],
  ['private-property', 'private-accessor-property'],
  'constructor',
  ['get-method', 'set-method'],
  'static-method',
  'method',
  'protected-method',
  'private-method',
  'unknown',
];

/**
 * @param {Record<string, any>} loaded The packages of the theme.
 * @returns {object[]} The configs of the theme.
 */
export function configs(loaded) {
  return [
    {
      name: 'format/sort',
      files: FILES.scripts,
      extends: [loaded['eslint-plugin-perfectionist'].configs['recommended-natural']],
      rules: {
        ...Object.fromEntries(KEPT_IN_ORDER.map((rule) => [rule, 'off'])),
        'perfectionist/sort-classes': [
          'error',
          {
            type: 'natural',
            customGroups: [
              {
                groupName: 'injected-property',
                selector: 'property',
                elementValuePattern: String.raw`^inject\(`,
              },
            ],
            groups: CLASS_GROUPS,
          },
        ],
      },
    },
  ];
}
