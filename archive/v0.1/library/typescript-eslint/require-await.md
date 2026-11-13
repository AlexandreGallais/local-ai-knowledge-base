---
title: "require-await"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/require-await.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# require-await

It uses type information to allow promise-returning functions to be marked as `async` without containing an `await` expression.

**Note:**
`yield` expressions in async generator functions behave differently from sync generator functions (they unwrap promises), so the base rule never checks async generator functions. On the other hand, our rule uses type information and can detect async generator functions that both never use `await` and always yield non-promise values.

## Examples

**❌ Incorrect**

```ts
async function returnNumber() {
  return 1;
}

async function* asyncGenerator() {
  yield 1;
}

const num = returnNumber();
const callAsyncGenerator = () => asyncGenerator();
```

**✅ Correct**

```ts
function returnNumber() {
  return 1;
}

function* syncGenerator() {
  yield 1;
}

const num = returnNumber();
const callSyncGenerator = () => syncGenerator();
```
