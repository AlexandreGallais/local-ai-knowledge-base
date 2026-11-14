---
title: "no-extra-strict"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-extra-strict.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-extra-strict

Disallows strict mode directives when already in strict mode.

**Important:**
This rule was removed in ESLint v1.0.0 and replaced by the strict rule. The `"global"` or `"function"` options in the new rule are similar to the removed rule.

The `"use strict";` directive applies to the scope in which it appears and all inner scopes contained within that scope. Therefore, using the `"use strict";` directive in one of these inner scopes is unnecessary.

```js
"use strict";

(function () {
    "use strict";
    var foo = true;
}());
```

## Rule Details

This rule is aimed at preventing unnecessary `"use strict";` directives. As such, it will warn when it encounters a `"use strict";` directive when already in strict mode.

Example of **incorrect** code for this rule:

**Incorrect:**

```js
"use strict";

(function () {
    "use strict";
    var foo = true;
}());
```

Examples of **correct** code for this rule:

**Correct:**

```js
"use strict";

(function () {
    var foo = true;
}());
```

**Correct:**

```js
(function () {
    "use strict";
    var foo = true;
}());
```
