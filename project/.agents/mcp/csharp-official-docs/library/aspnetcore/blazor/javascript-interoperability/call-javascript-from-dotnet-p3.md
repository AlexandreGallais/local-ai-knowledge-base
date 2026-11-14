---
title: "Call JavaScript functions from .NET methods in ASP.NET Core Blazor (part 3 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/javascript-interoperability/call-javascript-from-dotnet.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Call JavaScript functions from .NET methods in ASP.NET Core Blazor (part 3 of 4)

## Capture references to elements

Some JavaScript (JS) interop scenarios require references to HTML elements. For example, a UI library may require an element reference for initialization, or you might need to call command-like APIs on an element, such as `click` or `play`.

Capture references to HTML elements in a component using the following approach:

* Add an `@ref` attribute to the HTML element.
* Define a field of type `Microsoft.AspNetCore.Components.ElementReference` whose name matches the value of the `@ref` attribute.

The following example shows capturing a reference to the `username` `` element:

```razor
<input @ref="username" ... />

@code {
    private ElementReference username;
}
```

> **Warning:**
> Only use an element reference to mutate the contents of an empty element that doesn't interact with Blazor. This scenario is useful when a third-party API supplies content to the element. Because Blazor doesn't interact with the element, there's no possibility of a conflict between Blazor's representation of the element and the DOM.
>
> In the following example, it's *dangerous* to mutate the contents of the unordered list (`ul`) using `MyList` via JS interop because Blazor interacts with the DOM to populate this element's list items (``) from the `Todos` object:
>
> ```razor
>
>     @foreach (var item in Todos)
>     {
>         @item.Text
>     }
>
> ```
>
>
> Using the `MyList` element reference to merely read DOM content or trigger an event is supported.
>
> If JS interop *mutates the contents* of element `MyList` and Blazor attempts to apply diffs to the element, the diffs won't match the DOM. Modifying the contents of the list via JS interop with the `MyList` element reference is ***not supported***.
>
> For more information, see ASP.NET Core Blazor JavaScript interoperability (JS interop).

An `Microsoft.AspNetCore.Components.ElementReference` is passed through to JS code via JS interop. The JS code receives an `HTMLElement` instance, which it can use with normal DOM APIs. For example, the following code defines a .NET extension method (`TriggerClickEvent`) that enables sending a mouse click to an element.

The JS function `clickElement` creates a `click` event on the passed HTML element (`element`):

```javascript
window.interopFunctions = {
  clickElement : function (element) {
    element.click();
  }
}
```

To call a JS function that doesn't return a value, use `Microsoft.JSInterop.JSRuntimeExtensions.InvokeVoidAsync*`. The following code triggers a client-side `click` event by calling the preceding JS function with the captured `Microsoft.AspNetCore.Components.ElementReference`:

```razor
@inject IJSRuntime JS

<button @ref="exampleButton">Example Button</button>

<button @onclick="TriggerClick">
    Trigger click event on <code>Example Button</code>
</button>

@code {
    private ElementReference exampleButton;

    public async Task TriggerClick()
    {
        await JS.InvokeVoidAsync(
            "interopFunctions.clickElement", exampleButton);
    }
}
```

To use an extension method, create a static extension method that receives the `Microsoft.JSInterop.IJSRuntime` instance:

```csharp
public static async Task TriggerClickEvent(this ElementReference elementRef, 
    IJSRuntime js)
{
    await js.InvokeVoidAsync("interopFunctions.clickElement", elementRef);
}
```

The `clickElement` method is called directly on the object. The following example assumes that the `TriggerClickEvent` method is available from the `JsInteropClasses` namespace:

```razor
@inject IJSRuntime JS
@using JsInteropClasses

<button @ref="exampleButton">Example Button</button>

<button @onclick="TriggerClick">
    Trigger click event on <code>Example Button</code>
</button>

@code {
    private ElementReference exampleButton;

    public async Task TriggerClick()
    {
        await exampleButton.TriggerClickEvent(JS);
    }
}
```

> **Important:**
> The `exampleButton` variable is only populated after the component is rendered. If an unpopulated `Microsoft.AspNetCore.Components.ElementReference` is passed to JS code, the JS code receives a value of `null`. To manipulate element references after the component has finished rendering, use the `OnAfterRenderAsync` or `OnAfterRender` component lifecycle methods.

When working with generic types and returning a value, use `System.Threading.Tasks.ValueTask`1`:

```csharp
public static ValueTask<T> GenericMethod<T>(
        this ElementReference elementRef, IJSRuntime js) => 
    js.InvokeAsync<T>("{JAVASCRIPT FUNCTION}", elementRef);
```

The `{JAVASCRIPT FUNCTION}` placeholder is the JS function identifier.

`GenericMethod` is called directly on the object with a type. The following example assumes that the `GenericMethod` is available from the `JsInteropClasses` namespace:

```razor
@inject IJSRuntime JS
@using JsInteropClasses

<input @ref="username" />

<button @onclick="OnClickMethod">Do something generic</button>

<p>
    returnValue: @returnValue
</p>

@code {
    private ElementReference username;
    private string? returnValue;

    private async Task OnClickMethod()
    {
        returnValue = await username.GenericMethod<string>(JS);
    }
}
```

## Reference elements across components

An `Microsoft.AspNetCore.Components.ElementReference` can't be passed between components because:

* The instance is only guaranteed to exist after the component is rendered, which is during or after a component's `Microsoft.AspNetCore.Components.ComponentBase.OnAfterRender*`/`Microsoft.AspNetCore.Components.ComponentBase.OnAfterRenderAsync*` method executes.
* An `Microsoft.AspNetCore.Components.ElementReference` is a `struct`, which can't be passed as a component parameter.

For a parent component to make an element reference available to other components, the parent component can:

* Allow child components to register callbacks.
* Invoke the registered callbacks during the `Microsoft.AspNetCore.Components.ComponentBase.OnAfterRender*` event with the passed element reference. Indirectly, this approach allows child components to interact with the parent's element reference.

```html
<style>
    .red { color: red }
</style>
```

```html
<script>
  function setElementClass(element, className) {
    var myElement = element;
    myElement.classList.add(className);
  }
</script>
```

> **Note:**
> For general guidance on JS location and our recommendations for production apps, see JavaScript location in ASP.NET Core Blazor apps.

`CallJs7.razor` (parent component):

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/CallJs7.razor._
`CallJs7.razor.cs`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_WebAssembly/Pages/CallJs7.razor.cs._
In the preceding example, the namespace of the app is `BlazorSample`. If testing the code locally, update the namespace.

`SurveyPrompt.razor` (child component):

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/SurveyPrompt.razor._
`SurveyPrompt.razor.cs`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/SurveyPrompt.razor.cs._
In the preceding example, the namespace of the app is `BlazorSample` with shared components in the `Shared` folder. If testing the code locally, update the namespace.

## Harden JavaScript interop calls

*This section only applies to Interactive Server components, but client-side components may also set JS interop timeouts if conditions warrant it.*

In server-side apps with server interactivity, JavaScript (JS) interop may fail due to networking errors and should be treated as unreliable. Blazor apps use a one minute timeout for JS interop calls. If an app can tolerate a more aggressive timeout, set the timeout using one of the following approaches.

Set a global timeout in the `Program.cs` with `Microsoft.AspNetCore.Components.Server.CircuitOptions.JSInteropDefaultCallTimeout`:

```csharp
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents(options => 
        options.JSInteropDefaultCallTimeout = {TIMEOUT});
```

The `{TIMEOUT}` placeholder is a `System.TimeSpan` (for example, `TimeSpan.FromSeconds(80)`).

Set a per-invocation timeout in component code. The specified timeout overrides the global timeout set by `Microsoft.AspNetCore.Components.Server.CircuitOptions.JSInteropDefaultCallTimeout`:

```csharp
var result = await JS.InvokeAsync<string>("{ID}", {TIMEOUT}, [ "Arg1" ]);
```

In the preceding example:

* The `{TIMEOUT}` placeholder is a `System.TimeSpan` (for example, `TimeSpan.FromSeconds(80)`).
* The `{ID}` placeholder is the identifier for the function to invoke. For example, the value `someScope.someFunction` invokes the function `window.someScope.someFunction`.

Although a common cause of JS interop failures are network failures with server-side components, per-invocation timeouts can be set for JS interop calls for client-side components. Although no Blazor-SignalR circuit exists for a client-side component, JS interop calls might fail for other reasons that apply.

For more information on resource exhaustion, see Threat mitigation guidance for ASP.NET Core Blazor interactive server-side rendering.

## Avoid circular object references

Objects that contain circular references can't be serialized on the client for either:

* .NET method calls.
* JavaScript method calls from C# when the return type has circular references.

## JavaScript libraries that render UI

Sometimes you may wish to use JavaScript (JS) libraries that produce visible user interface elements within the browser DOM. At first glance, this might seem difficult because Blazor's diffing system relies on having control over the tree of DOM elements and runs into errors if some external code mutates the DOM tree and invalidates its mechanism for applying diffs. This isn't a Blazor-specific limitation. The same challenge occurs with any diff-based UI framework.

Fortunately, it's straightforward to embed externally-generated UI within a Razor component UI reliably. The recommended technique is to have the component's code (`.razor` file) produce an empty element. As far as Blazor's diffing system is concerned, the element is always empty, so the renderer does not recurse into the element and instead leaves its contents alone. This makes it safe to populate the element with arbitrary externally-managed content.

The following example demonstrates the concept. Within the `if` statement when `firstRender` is `true`, interact with `unmanagedElement` outside of Blazor using JS interop. For example, call an external JS library to populate the element. Blazor leaves the element's contents alone until this component is removed. When the component is removed, the component's entire DOM subtree is also removed.

```razor
<h1>Hello! This is a Razor component rendered at @DateTime.Now</h1>

<div @ref="unmanagedElement"></div>

@code {
    private ElementReference unmanagedElement;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            ...
        }
    }
}
```

Consider the following example that renders an interactive map using open-source Mapbox APIs.

The following JS module is placed into the app or made available from a Razor class library.

> **Note:**
> To create the Mapbox map, obtain an access token from Mapbox Sign in and provide it where the `{ACCESS TOKEN}` appears in the following code.

`wwwroot/mapComponent.js`:

```javascript
import 'https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js';

mapboxgl.accessToken = '<example-value>';

export function addMapToElement(element) {
  return new mapboxgl.Map({
    container: element,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-74.5, 40],
    zoom: 9
  });
}

export function setMapCenter(map, latitude, longitude) {
  map.setCenter([longitude, latitude]);
}
```

To produce correct styling, add the following stylesheet tag to the host HTML page.

Add the following `<link>` element to the `<head>` element markup (location of `<head>` content):

```html
<link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" 
    rel="stylesheet" />
```

`CallJs8.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/CallJs8.razor._
The preceding example produces an interactive map UI. The user:

* Can drag to scroll or zoom.
* Select buttons to jump to predefined locations.

In the preceding example:

* The `` with `@ref="mapElement"` is left empty as far as Blazor is concerned. The `mapbox-gl.js` script can safely populate the element and modify its contents. Use this technique with any JS library that renders UI. You can embed components from a third-party JS SPA framework inside Razor components, as long as they don't try to reach out and modify other parts of the page. It is **not** safe for external JS code to modify elements that Blazor does not regard as empty.
* When using this approach, bear in mind the rules about how Blazor retains or destroys DOM elements. The component safely handles button click events and updates the existing map instance because DOM elements are retained where possible. If you were rendering a list of map elements from inside a `@foreach` loop, you want to use `@key` to ensure the preservation of component instances. Otherwise, changes in the list data could cause component instances to retain the state of previous instances in an undesirable manner. For more information, see how to use the `@key` directive attribute to preserve the relationship among elements, components, and model objects.
* The example encapsulates JS logic and dependencies within a JavaScript module and loads the module dynamically using the `import` identifier. For more information, see JavaScript isolation in JavaScript modules.
