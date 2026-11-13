---
title: "import-x/no-nodejs-modules"
tool: "import-x"
version: "4.18"
source: "https://github.com/un-ts/eslint-plugin-import-x/blob/522c2c259cb080030afca4359561c932505ebe80/docs/rules/no-nodejs-modules.md"
commit: "522c2c259cb080030afca4359561c932505ebe80"
license: "MIT"
---

# import-x/no-nodejs-modules

Forbid the use of Node.js builtin modules. Can be useful for client-side web projects that do not have access to those modules.

## Options

This rule supports the following options:

- `allow`: Array of names of allowed modules. Defaults to an empty array.

## Rule Details

### Fail

```js
import fs from 'fs'
import path from 'path'

var fs = require('fs')
var path = require('path')
```

### Pass

```js
import _ from 'lodash'
import foo from 'foo'
import foo from './foo'

var _ = require('lodash')
var foo = require('foo')
var foo = require('./foo')

/* eslint import-x/no-nodejs-modules: ["error", {"allow": ["path"]}] */
import path from 'path'
```

## When Not To Use It

If you have a project that is run mainly or partially using Node.js.
