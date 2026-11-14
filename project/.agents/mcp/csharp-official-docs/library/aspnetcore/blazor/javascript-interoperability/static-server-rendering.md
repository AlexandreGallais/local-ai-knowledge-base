---
title: "ASP.NET Core Blazor JavaScript with static server-side rendering (static SSR)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/javascript-interoperability/static-server-rendering.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor JavaScript with static server-side rendering (static SSR)

This article explains how to load JavaScript (JS) in a Blazor Web App with static server-side rendering (static SSR) and enhanced navigation.

Some apps depend on JS to perform initialization tasks that are specific to each page. When using Blazor's enhanced navigation feature, which allows the user to avoid reloading the entire page, page-specific JS may not be executed again as expected each time an enhanced page navigation occurs.

To avoid this problem, we don't recommended relying on page-specific `<script>` elements placed outside of the layout file applied to the component. Instead, scripts should register an `afterWebStarted` JS initializer to perform initialization logic and use an event listener to listen for page updates caused by enhanced navigation.

## Events

In the following event listener examples, the `{CALLBACK}` placeholder is the callback function.

* Enhanced navigation start (`enhancednavigationstart`) triggers a callback before an enhanced navigation occurs:

  ```javascript
  blazor.addEventListener("enhancednavigationstart", {CALLBACK});
  ```

* Enhanced navigation end (`enhancednavigationend`) triggers a callback after an enhanced navigation occurs:

  ```javascript
  blazor.addEventListener("enhancednavigationend", {CALLBACK});
  ```

* Enhanced navigation page load (`enhancedload`) triggers a callback each time the page updates due to an enhanced navigation, including streaming updates:

  ```javascript
  blazor.addEventListener("enhancedload", {CALLBACK});
  ```

## Enhanced page load script example

The following example demonstrates one way to configure JS code to run when a statically-rendered page with enhanced navigation is initially loaded or updated.

The following `PageWithScript` component example is a component in the app that requires scripts to run with static SSR and enhanced navigation. The following component example includes a `PageScript` component from a Razor class library (RCL) that's added to the solution later in this article.

`Components/Pages/PageWithScript.razor`:

```razor
@page "/page-with-script"
@using BlazorPageScript

<PageTitle>Enhanced Load Script Example</PageTitle>

<PageScript Src="./Components/Pages/PageWithScript.razor.js" />

Welcome to my page.
```

In the Blazor Web App, add the following collocated JS file:

* `onLoad` is called when the script is added to the page.
* `onUpdate` is called when the script still exists on the page after an enhanced update.
* `onDispose` is called when the script is removed from the page after an enhanced update.

`Components/Pages/PageWithScript.razor.js`:

```javascript
export function onLoad() {
  console.log('Loaded');
}

export function onUpdate() {
  console.log('Updated');
}

export function onDispose() {
  console.log('Disposed');
}
```

In a Razor Class Library (RCL) (the example RCL is named `BlazorPageScript`), add the following module, which is a JS initializer.

`wwwroot/BlazorPageScript.lib.module.js`:

```javascript
const pageScriptInfoBySrc = new Map();

function registerPageScriptElement(src) {
  if (!src) {
    throw new Error('Must provide a non-empty value for the "src" attribute.');
  }

  let pageScriptInfo = pageScriptInfoBySrc.get(src);

  if (pageScriptInfo) {
    pageScriptInfo.referenceCount++;
  } else {
    pageScriptInfo = { referenceCount: 1, module: null };
    pageScriptInfoBySrc.set(src, pageScriptInfo);
    initializePageScriptModule(src, pageScriptInfo);
  }
}

function unregisterPageScriptElement(src) {
  if (!src) {
    return;
  }

  const pageScriptInfo = pageScriptInfoBySrc.get(src);
  
  if (!pageScriptInfo) {
    return;
  }

  pageScriptInfo.referenceCount--;
}

async function initializePageScriptModule(src, pageScriptInfo) {
  if (src.startsWith("./")) {
    src = new URL(src.substr(2), document.baseURI).toString();
  }

  const module = await import(src);

  if (pageScriptInfo.referenceCount <= 0) {
    return;
  }

  pageScriptInfo.module = module;
  module.onLoad?.();
  module.onUpdate?.();
}

function onEnhancedLoad() {
  for (const [src, { module, referenceCount }] of pageScriptInfoBySrc) {
    if (referenceCount <= 0) {
      module?.onDispose?.();
      pageScriptInfoBySrc.delete(src);
    }
  }

  for (const { module } of pageScriptInfoBySrc.values()) {
    module?.onUpdate?.();
  }
}

export function afterWebStarted(blazor) {
  customElements.define('page-script', class extends HTMLElement {
    static observedAttributes = ['src'];

    attributeChangedCallback(name, oldValue, newValue) {
      if (name !== 'src') {
        return;
      }

      this.src = newValue;
      unregisterPageScriptElement(oldValue);
      registerPageScriptElement(newValue);
    }

    disconnectedCallback() {
      unregisterPageScriptElement(this.src);
    }
  });

  blazor.addEventListener('enhancedload', onEnhancedLoad);
}
```

Do ***not*** add a `<script>` tag to the app's root component, typically the `App` componennt, for `BlazorPageScript.lib.module.js` because the module in this case is a JS initializer (`afterWebStarted`). JS initializers are detected and loaded automatically by the Blazor framework.

In the RCL, add the following `PageScript` component.

`PageScript.razor`:

```razor
<page-script src="@Src"></page-script>

@code {
    [Parameter]
    [EditorRequired]
    public string Src { get; set; } = default!;
}
```

The `PageScript` component functions normally on the top-level of a page.

If you place the `PageScript` component in an app's layout (for example, `MainLayout.razor`), which results in a shared `PageScript` among pages that use the layout, then the component only runs `onLoad` after a full page reload and `onUpdate` when any enhanced page update occurs, including enhanced navigation.

To reuse the same module among pages, but have the `onLoad` and `onDispose` callbacks invoked on each page change, append a query string to the end of the script so that it's recognized as a different module. An app could adopt the convention of using the component's name as the query string value. In the following example, the query string is "`counter`" because this `PageScript` component reference is placed in a `Counter` component. This is merely a suggestion, and you can use whatever query string scheme that you prefer.

```razor
<PageScript Src="./Components/Pages/PageWithScript.razor.js?counter" />
```

To monitor changes in specific DOM elements, use the `MutationObserver` pattern in JS on the client. For more information, see ASP.NET Core Blazor JavaScript interoperability (JS interop).

## Implementation without using an RCL

The approach described in this article can be implemented directly in a Blazor Web App without using a Razor class library (RCL) by moving the assets of the RCL into the app. However, the use of an RCL is convenient because the RCL can be packaged into a NuGet package for consumption by Blazor apps across an organization.

If you move the assets into a Blazor Web App, be sure to rename the module (`BlazorPageScript.lib.module.js`) to match the app per the file naming rules for JS initializers. If the file isn't named correctly, Blazor can't detect and load the module, and the `afterWebStarted` event doesn't execute automatically when the app starts.
