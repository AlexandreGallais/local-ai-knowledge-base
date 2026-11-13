---
title: "ASP.NET Core Blazor startup (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/fundamentals/startup.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor startup (part 2 of 3)

## Load client-side boot resources

When an app loads in the browser, the app downloads boot resources from the server:

* JavaScript code to bootstrap the app
* .NET runtime and assemblies
* Locale specific data

Customize how these boot resources are loaded using the `loadBootResource` API. The `loadBootResource` function overrides the built-in boot resource loading mechanism. Use `loadBootResource` for the following scenarios:

* Load static resources, such as timezone data or `dotnet.wasm`, from a CDN.
* Load compressed assemblies using an HTTP request and decompress them on the client for hosts that don't support fetching compressed contents from the server.
* Alias resources to a different name by redirecting each `fetch` request to a new name.

> **Note:**
> External sources must return the required Cross-Origin Resource Sharing (CORS) headers for browsers to allow cross-origin resource loading. CDNs usually provide the required headers.

`loadBootResource` parameters appear in the following table.

| Parameter    | Description |
| ------------ | ----------- |
| `type`       | The type of the resource. Permissible types include: `assembly`, `pdb`, `dotnetjs`, `dotnetwasm`, and `timezonedata`. You only need to specify types for custom behaviors. Types not specified to `loadBootResource` are loaded by the framework per their default loading behaviors. The `dotnetjs` boot resource (`dotnet.*.js`) must either return `null` for default loading behavior or a URI for the source of the `dotnetjs` boot resource. |
| `name`       | The name of the resource. |
| `defaultUri` | The relative or absolute URI of the resource. |
| `integrity`  | The integrity string representing the expected content in the response. |

The `loadBootResource` function can return a URI string to override the loading process. In the following example, the following files from `bin/Release/{TARGET FRAMEWORK}/wwwroot/_framework` are served from a CDN at `https://cdn.example.com/blazorwebassembly/{VERSION}/`:

* `dotnet.*.js`
* `dotnet.wasm`
* Timezone data

The `{TARGET FRAMEWORK}` placeholder is the target framework moniker (for example, `net7.0`). The `{VERSION}` placeholder is the shared framework version (for example, `7.0.0`).

```html
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
<script>
  Blazor.start({
    webAssembly: {
      loadBootResource: function (type, name, defaultUri, integrity) {
        console.log(`Loading: '${type}', '${name}', '${defaultUri}', '${integrity}'`);
        switch (type) {
          case 'dotnetjs':
          case 'dotnetwasm':
          case 'timezonedata':
            return `https://cdn.example.com/blazorwebassembly/{VERSION}/${name}`;
        }
      }
    }
  });
</script>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script, see ASP.NET Core Blazor project structure.

To customize more than just the URLs for boot resources, the `loadBootResource` function can call `fetch` directly and return the result. The following example adds a custom HTTP header to the outbound requests. To retain the default integrity checking behavior, pass through the `integrity` parameter.

```html
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
<script>
  Blazor.start({
    webAssembly: {
      loadBootResource: function (type, name, defaultUri, integrity) {
        if (type == 'dotnetjs') {
          return null;
        } else {
          return fetch(defaultUri, {
            cache: 'no-cache',
            integrity: integrity,
            headers: { 'Custom-Header': 'Custom Value' }
          });
        }
      }
    }
  });
</script>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script, see ASP.NET Core Blazor project structure.

When the `loadBootResource` function returns `null`, Blazor uses the default loading behavior for the resource. For example, the preceding code returns `null` for the `dotnetjs` boot resource (`dotnet.*.js`) because the `dotnetjs` boot resource must either return `null` for default loading behavior or a URI for the source of the `dotnetjs` boot resource.

The `loadBootResource` function can also return a `Response` promise. For an example, see Host and deploy ASP.NET Core Blazor WebAssembly.

For more information, see ASP.NET Core Blazor WebAssembly caching and integrity check failures.

## Control headers in C# code

Control headers at startup in C# code using the following approaches.

In the following examples, a Content Security Policy (CSP) is applied to the app via a CSP header. The `{POLICY STRING}` placeholder is the CSP policy string. For more information on CSPs, see Enforce a Content Security Policy for ASP.NET Core Blazor.

> **Note:**
> Headers can't be set after the response starts. The approaches in this section only set headers before the response starts, so the approaches described here are safe. For more information, see IHttpContextAccessor/HttpContext in ASP.NET Core Blazor apps.

### Server-side and prerendered client-side scenarios

Use ASP.NET Core middleware to control the headers collection.

In the `Program` file:

```csharp
app.Use(async (context, next) =>
{
    context.Response.Headers.Append("Content-Security-Policy", "{POLICY STRING}");
    await next();
});
```

The preceding example uses inline middleware, but you can also create a custom middleware class and call the middleware with an extension method in the `Program` file. For more information, see Write custom ASP.NET Core middleware.

## Client-side loading indicators

A loading indicator shows that the app is loading normally and that the user should wait until loading is finished.

### Blazor Web App loading indicator

The loading indicator used in Blazor WebAssembly apps isn't present in an app created from the Blazor Web App project template. Usually, a loading indicator isn't desirable for interactive WebAssembly components because Blazor Web Apps prerender client-side components on the server for fast initial load times. For mixed-render-mode situations, the framework or developer code must also be careful to avoid the following problems:

* Showing multiple loading indicators on the same rendered page.
* Inadvertently discarding prerendered content while the .NET WebAssembly runtime is loading.

A future release of .NET might provide a framework-based loading indicator. In the meantime, you can add a custom loading indicator to a Blazor Web App.

#### Per-component Interactive WebAssembly rendering with prerendering

*This scenario applies to per-component Interactive WebAssembly rendering (`@rendermode InteractiveWebAssembly` applied to individual components).*

Create a `ContentLoading` component in the `Layout` folder of the `.Client` app that calls `System.OperatingSystem.IsBrowser*`:

* When `false`, display a loading indicator.
* When `true`, render the requested component's content.

To load CSS styles for the indicator, add the styles to `<head>` content with the `Microsoft.AspNetCore.Components.Web.HeadContent` component. For more information, see Control head content in ASP.NET Core Blazor apps.

`Layout/ContentLoading.razor`:

```razor
@if (!RendererInfo.IsInteractive)
{
    <!-- OPTIONAL ...
    <HeadContent>
        <style>
            ...
        </style>
    </HeadContent>
    -->
    <progress id="loadingIndicator" aria-label="Content loading…"></progress>
}
else
{
    @ChildContent
}

@code {
    [Parameter]
    public RenderFragment? ChildContent { get; set; }
}
```

If you didn't already have a `Layout` folder in the `.Client` project, add the namespace for the `Layout` folder to the imports file (`_Imports.razor`). In the following example, the project's namespace is `BlazorSample.Client`:

```razor
@using BlazorSample.Client.Layout
```

In a component that adopts Interactive WebAssembly rendering, wrap the component's Razor markup with the `ContentLoading` component. The following example demonstrates the approach with the `Counter` component of an app created from the Blazor Web App project template.

`Pages/Counter.razor`:

```razor
@page "/counter"
@rendermode InteractiveWebAssembly

<PageTitle>Counter</PageTitle>

<ContentLoading>
    <h1>Counter</h1>

    <p role="status">Current count: @currentCount</p>

    <button class="btn btn-primary" @onclick="IncrementCount">Click me</button>
</ContentLoading>

@code {
    private int currentCount = 0;

    private void IncrementCount()
    {
        currentCount++;
    }
}
```

#### Global Interactive WebAssembly rendering with prerendering

*This scenario applies to global Interactive WebAssembly rendering with prerendering (`@rendermode="InteractiveWebAssembly"` on the `HeadOutlet` and `Routes` components in the `App` component).*

Create a `ContentLoading` component in the `Layout` folder of the `.Client` app that calls `Microsoft.AspNetCore.Components.RendererInfo.IsInteractive`:

* When `false`, display a loading indicator.
* When `true`, render the requested component's content.

To load CSS styles for the indicator, add the styles to `<head>` content with the `Microsoft.AspNetCore.Components.Web.HeadContent` component. For more information, see Control head content in ASP.NET Core Blazor apps.

`Layout/ContentLoading.razor`:

```razor
@if (!RendererInfo.IsInteractive)
{
    <!-- OPTIONAL ...
    <HeadContent>
        <style>
            ...
        </style>
    </HeadContent>
    -->
    <progress id="loadingIndicator" aria-label="Content loading…"></progress>
}
else
{
    @ChildContent
}

@code {
    [Parameter]
    public RenderFragment? ChildContent { get; set; }
}
```

If you didn't already have a `Layout` folder in the `.Client` project, add the namespace for the `Layout` folder to the imports file (`_Imports.razor`). In the following example, the project's namespace is `BlazorSample.Client`:

```razor
@using BlazorSample.Client.Layout
```

In the `MainLayout` component (`Layout/MainLayout.razor`) of the `.Client` project, wrap the `Microsoft.AspNetCore.Components.LayoutComponentBase.Body` property (`@Body`) with the `ContentLoading` component:

In `Layout/MainLayout.razor`:

```diff
+ <ContentLoading>
    @Body
+ </ContentLoading>
```

#### Global Interactive WebAssembly rendering without prerendering

*This scenario applies to global Interactive WebAssembly rendering without prerendering (`@rendermode="new InteractiveWebAssemblyRenderMode(prerender: false)"` on the `HeadOutlet` and `Routes` components in the `App` component).*

Add a JavaScript initializer to the app. In the following JavaScript module file name example, the `{ASSEMBLY NAME}` placeholder is the assembly name of the server project (for example, `BlazorSample`). The `wwwroot` folder where the module is placed is the `wwwroot` folder in the server-side project, not the `.Client` project.

The following example uses a `progress` indicator that doesn't indicate the actual progress of  delivering client-side boot resources to the client, but it serves as a general approach for further development if you want the progress indicator to show the actual progress of loading the app's boot resources.

`wwwroot/{ASSEMBLY NAME}.lib.module.js`:

```javascript
export function beforeWebStart(options) {
  var progress = document.createElement("progress");
  progress.id = 'loadingIndicator';
  progress.ariaLabel = 'Blazor loading…';
  progress.style = 'position:absolute;top:50%;left:50%;margin-right:-50%;' +
    'transform:translate(-50%,-50%);';
  document.body.appendChild(progress);
}

export function afterWebAssemblyStarted(blazor) {
  var progress = document.getElementById('loadingIndicator');
  progress.remove();
}
```

### Blazor WebAssembly app loading progress

The project template contains Scalable Vector Graphics (SVG) and text indicators that show the loading progress of the app.

The progress indicators are implemented with HTML and CSS using two CSS custom properties (variables) provided by Blazor:

* `--blazor-load-percentage`: The percentage of app files loaded.
* `--blazor-load-percentage-text`: The percentage of app files loaded, rounded to the nearest whole number.

Using the preceding CSS variables, you can create custom progress indicators that match the styling of your app.

In the following example:

* `resourcesLoaded` is an instantaneous count of the resources loaded during app startup.
* `totalResources` is the total number of resources to load.

```javascript
const percentage = resourcesLoaded / totalResources * 100;
document.documentElement.style.setProperty(
  '--blazor-load-percentage', `${percentage}%`);
document.documentElement.style.setProperty(
  '--blazor-load-percentage-text', `"${Math.floor(percentage)}%"`);
```

The default round progress indicator is implemented in HTML in the `wwwroot/index.html` file:

```html
<div id="app">
    <svg class="loading-progress">
        <circle r="40%" cx="50%" cy="50%" />
        <circle r="40%" cx="50%" cy="50%" />
    </svg>
    <div class="loading-progress-text"></div>
</div>
```

To review the project template markup and styling for the default progress indicators, see the ASP.NET Core reference source:

* `wwwroot/index.html`
* `app.css`

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

Instead of using the default round progress indicator, the following example shows how to implement a linear progress indicator.

Add the following styles to `wwwroot/css/app.css`:

```css
.linear-progress {
    background: silver;
    width: 50vw;
    margin: 20% auto;
    height: 1rem;
    border-radius: 10rem;
    overflow: hidden;
    position: relative;
}

.linear-progress:after {
    content: '';
    position: absolute;
    inset: 0;
    background: blue;
    scale: var(--blazor-load-percentage, 0%) 100%;
    transform-origin: left top;
    transition: scale ease-out 0.5s;
}
```

A CSS variable (`var(...)`) is used to pass the value of `--blazor-load-percentage` to the `scale` property of a blue pseudo-element that indicates the loading progress of the app's files. As the app loads, `--blazor-load-percentage` is updated automatically, which dynamically changes the progress indicator's visual representation.

In `wwwroot/index.html`, remove the default SVG round indicator in `...` and replace it with the following markup:

```html
<div class="linear-progress"></div>
```
