---
title: "import-x/no-webpack-loader-syntax"
tool: "import-x"
version: "4.18"
source: "https://github.com/un-ts/eslint-plugin-import-x/blob/522c2c259cb080030afca4359561c932505ebe80/docs/rules/no-webpack-loader-syntax.md"
commit: "522c2c259cb080030afca4359561c932505ebe80"
license: "MIT"
---

# import-x/no-webpack-loader-syntax

Forbid Webpack loader syntax in imports.

Webpack allows specifying the loaders to use in the import source string using a special syntax like this:

```js
var moduleWithOneLoader = require('my-loader!./my-awesome-module')
```

This syntax is non-standard, so it couples the code to Webpack. The recommended way to specify Webpack loader configuration is in a Webpack configuration file.

## Rule Details

### Fail

```js
import myModule from 'my-loader!my-module'
import theme from 'style!css!./theme.css'

var myModule = require('my-loader!./my-module')
var theme = require('style!css!./theme.css')
```

### Pass

```js
import myModule from 'my-module'
import theme from './theme.css'

var myModule = require('my-module')
var theme = require('./theme.css')
```

## When Not To Use It

If you have a project that doesn't use Webpack you can safely disable this rule.
