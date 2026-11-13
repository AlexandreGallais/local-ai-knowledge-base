---
title: "WorkletSharedStorage: remainingBudget() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workletsharedstorage/remainingbudget/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkletSharedStorage: remainingBudget() method

The **`remainingBudget()`** method of the
`WorkletSharedStorage` interface returns the remaining navigation budget for the current origin.

The navigation budget is the number of entropy bits permitted inside a `<fencedframe>` due to the `WindowSharedStorage.selectURL()` calls per origin every 24 hours. This is not the same as the number of navigations; rather, it is based on the number of potential navigations in each call. Each time a `selectURL()` navigation occurs, the corresponding origin's budget decreases by the logarithm (base 2) of the number of URL choices.

Navigation budget is a mechanism designed to limit the rate of leakage of cross-site data to the destination pages navigated to in fenced frames.

## Syntax

```js
remainingBudget()
```

### Parameters

None.

### Return value

A `Promise` that fulfills with a number representing the remaining navigation budget.

### Exceptions

- `TypeError`
    Thrown if the worklet module has not yet been added with `addModule()` or if the calling site does not have the Shared Storage API included in a successful privacy sandbox enrollment process.

## Examples

```js
// remainingBudget() available inside a shared storage worklet module

async function retrieveBudget() {
  const budget = await this.sharedStorage.remainingBudget();
  console.log(budget);
}
```

## See also

- Shared Storage API
