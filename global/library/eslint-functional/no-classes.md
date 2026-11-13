---
title: "functional/no-classes"
tool: "eslint-functional"
version: "10.0"
source: "https://github.com/eslint-functional/eslint-plugin-functional/blob/d7aa1dd4ae4ef804f3010a92d3e7b385153415d8/docs/rules/no-classes.md"
commit: "d7aa1dd4ae4ef804f3010a92d3e7b385153415d8"
license: "MIT"
---

# functional/no-classes

📝 Disallow classes.

💼🚫 This rule is enabled in the following configs:  `noOtherParadigms`, ✅ `recommended`, 🔒 `strict`. This rule is _disabled_ in the ☑️ `lite` config.

Disallow use of the `class` keyword.

## Rule Details

### ❌ Incorrect

```js
/* eslint functional/no-classes: "error" */

class Dog {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  get ageInDogYears() {
    return 7 * this.age;
  }
}

const dogA = new Dog("Jasper", 2);

console.log(`${dogA.name} is ${dogA.ageInDogYears} in dog years.`);
```

### ✅ Correct

```js
/* eslint functional/no-classes: "error" */

function getAgeInDogYears(age) {
  return 7 * age;
}

const dogA = {
  name: "Jasper",
  age: 2,
};

console.log(`${dogA.name} is ${getAgeInDogYears(dogA.age)} in dog years.`);
```

## Options

This rule accepts an options object of the following type:

```ts
type Options = {
  ignoreIdentifierPattern?: string[] | string;
  ignoreCodePattern?: string[] | string;
};
```

### Default Options

```ts
const defaults = {};
```

### `ignoreIdentifierPattern`

This option takes a RegExp string or an array of RegExp strings.
It allows for the ability to ignore violations based on the class's name.

### `ignoreCodePattern`

This option takes a RegExp string or an array of RegExp strings.
It allows for the ability to ignore violations based on the code itself.
