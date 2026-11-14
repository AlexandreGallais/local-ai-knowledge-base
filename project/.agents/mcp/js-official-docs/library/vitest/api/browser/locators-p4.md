---
title: "Locators | Browser Mode (part 4 of 4)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/api/browser/locators.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Locators | Browser Mode (part 4 of 4)

## Custom Locators <Version>3.2.0</Version> <Badge type="danger">advanced</Badge> {#custom-locators}

You can extend built-in locators API by defining an object of locator factories. These methods will exist as methods on the `page` object and any created locator.

These locators can be useful if built-in locators are not enough. For example, when you use a custom framework for your UI.

The locator factory needs to return a selector string or a locator itself.

**Tip:**
The selector syntax is identical to Playwright locators. Please, read their guide to better understand how to work with them.

```ts
import { locators } from 'vitest/browser'

locators.extend({
  getByArticleTitle(title) {
    return `[data-title="${title}"]`
  },
  getByArticleCommentsCount(count) {
    return `.comments :text("${count} comments")`
  },
  async previewComments() {
    // you have access to the current locator via "this"
    // beware that if the method was called on `page`, `this` will be `page`,
    // not the locator!
    if (this !== page) {
      await this.click()
    }
    // ...
  }
})

// if you are using typescript, you can extend LocatorSelectors interface
// to have the autocompletion in locators.extend, page.* and locator.* methods
declare module 'vitest/browser' {
  interface LocatorSelectors {
    // if the custom method returns a string, it will be converted into a locator
    // if it returns anything else, then it will be returned as usual
    getByArticleTitle(title: string): Locator
    getByArticleCommentsCount(count: number): Locator

    // Vitest will return a promise and won't try to convert it into a locator
    previewComments(this: Locator): Promise<void>
  }
}
```

If the method is called on the global `page` object, then selector will be applied to the whole page. In the example below, `getByArticleTitle` will find all elements with an attribute `data-title` with the value of `title`. However, if the method is called on the locator, then it will be scoped to that locator.

```html
<article data-title="Hello, World!">
  Hello, World!
  <button id="comments">2 comments</button>
</article>

<article data-title="Hello, Vitest!">
  Hello, Vitest!
  <button id="comments">0 comments</button>
</article>
```

```ts
const articles = page.getByRole('article')
const worldArticle = page.getByArticleTitle('Hello, World!') // ✅
const commentsElement = worldArticle.getByArticleCommentsCount(2) // ✅
const wrongCommentsElement = worldArticle.getByArticleCommentsCount(0) // ❌
const wrongElement = page.getByArticleTitle('No Article!') // ❌

await commentsElement.previewComments() // ✅
await wrongCommentsElement.previewComments() // ❌
```
