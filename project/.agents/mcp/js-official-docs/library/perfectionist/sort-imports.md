---
title: "sort-imports (part 1 of 3)"
tool: "perfectionist"
version: "5.13"
source: "https://github.com/azat-io/eslint-plugin-perfectionist/blob/9ee9e5b6edbec9e3b9936e5677105404fe656a0b/docs/content/rules/sort-imports.mdx"
commit: "9ee9e5b6edbec9e3b9936e5677105404fe656a0b"
license: "MIT"
---

# sort-imports

Enforce sorted imports.

Maintaining a consistent and sorted order of imports is crucial for improving code readability and organization.

This rule ensures that imports are easily locatable and quickly scannable, especially in modules with numerous import statements.

By reducing the likelihood of errors caused by import conflicts and providing a clear structure, this rule helps developers manage imports efficiently and maintain a tidy codebase.

<Important>
If you use the `sort-imports` rule or the `order` rule from the `eslint-plugin-import` plugin, it is highly recommended to disable them to avoid conflicts.

If you use the `prettier-plugin-sort-imports` plugin, remove them from the prettier config to avoid conflicts.

</Important>

Rule `perfectionist/sort-imports` works in a similar way to rule `import/order`, but with some differences:

1. Supporting for new import types:
  - `'side-effect'`
  - `'style'`
  - `'type-builtin'`
  - `'type-import'`
  - `'type-internal'`
  - `'type-parent'`
  - `'type-sibling'`
  - `'type-index'`
2. Supporting for adding custom import groups
3. Sorting not only alphabetically, but also naturally and by line length

## Try it out

<CodeExample
  rule="sort-imports"
  alphabetical={dedent`
    import type { Response, Request } from 'express'

    import bodyParser from 'body-parser'
    import express from 'express'
    import session from 'express-session'
    import defaultsDeep from 'lodash/defaultsDeep'
    import map from 'lodash/map'
    import mongoose from 'mongoose'
    import fs from 'node:fs/promises'
    import path from 'node:path'
    import passport from 'passport'

    import initializePassport from '~/config/passport'
    import logger from '~/middleware/logger'
    import User from '~/models/User'
    import authRoutes from '~/routes/auth'

    import dbConfig from './db'
  `}
  lineLength={dedent`
    import type { Response, Request } from 'express'

    import defaultsDeep from 'lodash/defaultsDeep'
    import session from 'express-session'
    import bodyParser from 'body-parser'
    import fs from 'node:fs/promises'
    import mongoose from 'mongoose'
    import passport from 'passport'
    import express from 'express'
    import path from 'node:path'
    import map from 'lodash/map'

    import initializePassport from '~/config/passport'
    import logger from '~/middleware/logger'
    import authRoutes from '~/routes/auth'
    import User from '~/models/User'

    import dbConfig from './db'
  `}
  initial={dedent`
    import User from '~/models/User'
    import bodyParser from 'body-parser'
    import initializePassport from '~/config/passport'
    import mongoose from 'mongoose'
    import express from 'express'

    import type { Response, Request } from 'express'
    import passport from 'passport'
    import path from 'node:path'
    import defaultsDeep from 'lodash/defaultsDeep'
    import logger from '~/middleware/logger'

    import map from 'lodash/map'

    import dbConfig from './db'
    import session from 'express-session'
    import fs from 'node:fs/promises'
    import authRoutes from '~/routes/auth'
  `}
  client:load
  lang="tsx"
/>
