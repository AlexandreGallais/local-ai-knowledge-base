---
title: "prerendering"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/includes/prerendering.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# prerendering

*This section applies to server-side apps that prerender Razor components. Prerendering is covered in Prerender ASP.NET Core Razor components.*

During prerendering, calling into JavaScript (JS) isn't possible. The following example demonstrates how to use JS interop as part of a component's initialization logic in a way that's compatible with prerendering.

The following `scrollElementIntoView` function:

* Scrolls to the passed element with `scrollIntoView`.
* Returns the element's `top` property value from the `getBoundingClientRect` method.

```javascript
window.scrollElementIntoView = (element) => {
  element.scrollIntoView();
  return element.getBoundingClientRect().top;
}
```

Where `Microsoft.JSInterop.IJSRuntime.InvokeAsync*` calls the JS function in component code, the `Microsoft.AspNetCore.Components.ElementReference` is only used in `Microsoft.AspNetCore.Components.ComponentBase.OnAfterRenderAsync*` and not in any earlier lifecycle method because there's no HTML DOM element until after the component is rendered.

`StateHasChanged` (reference source) is called to enqueue rerendering of the component with the new state obtained from the JS interop call (for more information, see ASP.NET Core Razor component rendering). An infinite loop isn't created because `Microsoft.AspNetCore.Components.ComponentBase.StateHasChanged*` is only called when `scrollPosition` is `null`.

`PrerenderedInterop.razor`:

_Code sample not included: ~/../blazor-samples/8.0/BlazorSample_BlazorWebApp/Components/Pages/PrerenderedInterop.razor._
The preceding example pollutes the client with a global function. For a better approach in production apps, see JavaScript isolation in JavaScript modules.
