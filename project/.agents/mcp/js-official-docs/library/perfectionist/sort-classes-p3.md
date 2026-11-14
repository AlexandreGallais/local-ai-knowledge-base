---
title: "sort-classes (part 3 of 4)"
tool: "perfectionist"
version: "5.13"
source: "https://github.com/azat-io/eslint-plugin-perfectionist/blob/9ee9e5b6edbec9e3b9936e5677105404fe656a0b/docs/content/rules/sort-classes.mdx"
commit: "9ee9e5b6edbec9e3b9936e5677105404fe656a0b"
license: "MIT"
---

# sort-classes (part 3 of 4)

### groups

  type:
  ```ts
    Array<
      | string
      | string[]
      | { newlinesBetween: number | 'ignore' }
      | {
          group: string | string[];
          type?: 'alphabetical' | 'natural' | 'line-length' | 'custom' | 'unsorted';
          order?: 'asc' | 'desc';
          fallbackSort?: { type: string; order?: 'asc' | 'desc' };
          newlinesInside?: number | 'ignore';
        }
    >
  ```

  default:
  ```ts
  [
    'index-signature',
    ['static-property', 'static-accessor-property'],
    ['static-get-method', 'static-set-method'],
    ['protected-static-property', 'protected-static-accessor-property'],
    ['protected-static-get-method', 'protected-static-set-method'],
    ['private-static-property', 'private-static-accessor-property'],
    ['private-static-get-method', 'private-static-set-method'],
    'static-block',
    ['property', 'accessor-property'],
    ['get-method', 'set-method'],
    ['protected-property', 'protected-accessor-property'],
    ['protected-get-method', 'protected-set-method'],
    ['private-property', 'private-accessor-property'],
    ['private-get-method', 'private-set-method'],
    'constructor',
    ['static-method', 'static-function-property'],
    ['protected-static-method', 'protected-static-function-property'],
    ['private-static-method', 'private-static-function-property'],
    ['method', 'function-property'],
    ['protected-method', 'protected-function-property'],
    ['private-method', 'private-function-property'],
    'unknown',
  ]
  ```

Specifies a list of class member groups for sorting. Groups help organize class members into categories, prioritizing them during sorting.

Each class member will be assigned a single group specified in the `groups` option (or the `unknown` group if no match is found).
The order of items in the `groups` option determines how groups are ordered.

Within a given group, members will be sorted according to the `type`, `order`, `ignoreCase`, etc. options.

Individual groups can be combined together by placing them in an array. The order of groups in that array does not matter.
All members of the groups in the array will be sorted together as if they were part of a single group.

Predefined groups are characterized by a single selector and potentially multiple modifiers. You may enter modifiers in any order, but the selector must always come at the end.

#### Constructors

- Selector: `constructor`.
- Modifiers: `protected`, `private`, `public`.
- Example: `protected-constructor`, `private-constructor`, `public-constructor` or `constructor`.

#### Methods

- Selectors: `get-method`, `set-method`, `method`.
- Modifiers: `static`, `abstract`, `decorated`, `override`, `protected`, `private`, `public`, `optional`, `async`.
- Example: `private-static-accessor-property`, `protected-abstract-override-method` or `static-get-method`.

The `optional` modifier is incompatible with the `get-method` and `set-method` selectors.

The `abstract` modifier is incompatible with the `static`, `private` and `decorated` modifiers.

`constructor`, `get-method` and `set-method` elements will also be matched as `method`.

#### Accessors

- Selector: `accessor-property`.
- Modifiers: `static`, `abstract`, `decorated`, `override`, `protected`, `private`, `public`.
- Example: `private-static-accessor-property`, `protected-abstract-override-method` or `static-get-method`.

The `abstract` modifier is incompatible with the `static`, `private` and `decorated` modifiers.

#### Properties

- Selectors: `function-property`, `property`.
- Modifiers: `static`, `declare`, `abstract`, `decorated`, `override`, `readonly`, `protected`, `private`, `public`, `optional`, `async`.
- Example: `readonly-decorated-property`.

The `abstract` modifier is incompatible with the `static`, `private` and `decorated` modifiers.

The `declare` modifier is incompatible with the `override` and `decorated` modifiers.

The `function-property` selector will match properties whose values are defined functions or arrow-functions.
As such, the `declare` and `abstract` modifiers are incompatible with this selector.

The `async` modifier is reserved for the `function-property` selector.

#### Index-signatures

- Selector: `index-signature`.
- Modifiers: `static`, `readonly`.
- Example: `static-readonly-index-signature`.

#### Static-blocks

- Selector: `static-block`.
- Modifiers: No modifier available.
- Example: `static-block`.

#### Important notes

##### Scope of the `private` modifier

The `private` modifier will currently match any of the following:
- Elements with the `private` keyword.
- Elements with their name starting with `#`.

##### Scope of the `public` modifier

Elements that are not `protected` nor `private` will be matched with the `public` modifier, even if the keyword is not present.

##### The `unknown` group

Members that don't fit into any group specified in the `groups` option will be placed in the `unknown` group. If the `unknown` group is not specified in the `groups` option,
the members will remain in their original order.

##### Behavior when multiple groups match an element

The lists of selectors and modifiers above are both sorted by importance, from most to least important.
In case of multiple groups matching an element, the following rules will be applied:

1. Selector priority: `constructor`, `get-method` and `set-method` groups will always take precedence over `method` groups.
2. If the selector is the same, the group with the most modifiers matching will be selected.
3. If modifiers quantity is the same, order will be chosen based on modifier importance as listed above.

Example 1:

```ts
abstract class Class {

    protected abstract get field();

}
```

`field` can be matched by the following groups, from most to least important:
- `abstract-protected-get-method` or `protected-abstract-get-method`.
- `abstract-get-method`.
- `protected-get-method`.
- `get-method`.
- `abstract-protected-method` or `protected-abstract-method`.
- `abstract-method`.
- `protected-method`.
- `method`.
- `unknown`.

Example 2 (The most important group is written in the comments):

```ts
abstract class Example extends BaseExample {

  // 'index-signature'
  [key: <example-value>]: any;

  // 'public-static-property'
  static instance: Example;

  // 'declare-protected-static-readonly-property'
  declare protected static readonly value: string;

  // 'static-block'
  static {
    console.log("I am a static block");
  }

  // 'public-property'
  public description: string;

  // 'public-decorated-property'
  @SomeDecorator
  public value: number;

  // 'public-decorated-accessor-property'
  @SomeDecorator
  public accessor value: number;

  // 'public-decorated-get-method'
  @SomeDecorator
  get decoratedValue() {
    return this._value;
  }

  // 'public-decorated-set-method'
  @SomeDecorator
  set decoratedValue(value: number) {
    this._value = value;
  }

  // 'public-decorated-get-method'
  @SomeDecorator
  get value() {
    return this._value;
  }

  // 'public-get-method'
  get value() {
    return this._value;
  }

  // 'public-set-method'
  set value(value: number) {
    this._value = value;
  }

  // 'protected-abstract-override-readonly-decorated-property'
  @SomeDecorator
  protected abstract override readonly _value: number;

  // 'protected-decorated-accessor-property'
  @SomeDecorator
  protected accessor _value: number;

  // 'protected-property'
  protected name: string;

  // 'protected-decorated-get-method'
  @SomeDecorator
  protected get value() {
    return this._value;
  }

  // 'private-decorated-property'
  @SomeDecorator
  private _value: number;

  // 'private-decorated-accessor-property'
  @SomeDecorator
  private accessor _value: number;

  // 'private-property'
  private name: string;

  // 'private-decorated-get-method'
  @SomeDecorator
  private get value() {
    return this._value;
  }

  // 'public-constructor'
  constructor(value: number) {
    this._value = value;
  }

  // 'public-static-method'
  static getInstance() {
    return this.instance;
  }

  // 'protected-static-method'
  protected static initialize() {
    this.instance = new Example(0);
  }

  // 'private-static-method'
  private static initialize() {
    this.instance = new Example(0);
  }

  // 'public-decorated-method'
  @SomeDecorator
  public decoratedMethod() {
    return this._value;
  }

  // 'public-method'
  public display() {
    console.log(this._value);
  }

  // 'protected-method'
  protected calculate() {
    return this._value * 2;
  }

  // private-function-property
  private arrowProperty = () => {};

  // 'private-method'
  private calculate() {
    return this._value * 2;
  }

  // private-function-property
  private functionProperty = function() {};
}
```

##### Group with overridden settings

You may directly override options for a specific group by using an object with the `group` property and other option overrides.

- `type` — Overrides the `type` option for that group.
- `order` — Overrides the `order` option for that group.
- `fallbackSort` — Overrides the `fallbackSort` option for that group.
- `newlinesInside` — Overrides the `newlinesInside` option for that group.

```ts
{
  groups: [
    'property',
    { group: 'method', type: 'unsorted' }, // Elements from this group will not be sorted
  ]
}
```

##### Newlines between groups

You may place `newlinesBetween` objects between your groups to enforce the newline behavior between two specific groups.

See the `newlinesBetween` option.

This feature is only applicable when `partitionByNewLine` is `false`.

```ts
{
  newlinesBetween: 1,
  groups: [
    'a',
    { newlinesBetween: 0 }, // Overrides the global newlinesBetween option
    'b',
  ]
}
```
