---
title: "ASP.NET Core Blazor navigation (part 4 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/fundamentals/navigation.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor navigation (part 4 of 5)

## Query strings

Use the `[SupplyParameterFromQuery]` attribute to specify that a component parameter comes from the query string.

Component parameters supplied from the query string support the following types:

* `bool`, `DateTime`, `decimal`, `double`, `float`, `Guid`, `int`, `long`, `string`.
* Nullable variants of the preceding types.
* Arrays of the preceding types, whether they're nullable or not nullable.

The correct culture-invariant formatting is applied for the given type (`System.Globalization.CultureInfo.InvariantCulture`).

> **Note:**
> C# union types aren't supported by `[SupplyParameterFromQuery]` or `[SupplyParameterFromForm]`, which bind string or form values without JSON parsing.

Specify the `[SupplyParameterFromQuery]` attribute's `Microsoft.AspNetCore.Components.SupplyParameterFromQueryAttribute.Name` property to use a query parameter name different from the component parameter name. In the following example, the C# name of the component parameter is `{COMPONENT PARAMETER NAME}`. A different query parameter name is specified for the `{QUERY PARAMETER NAME}` placeholder:

Unlike component parameter properties (`[Parameter]`), `[SupplyParameterFromQuery]` properties can be marked `private` in addition to `public`.

```csharp
[SupplyParameterFromQuery(Name = "{QUERY PARAMETER NAME}")]
private string? {COMPONENT PARAMETER NAME} { get; set; }
```

In the following example with a URL of `/search?filter=scifi%20stars&page=3&star=LeVar%20Burton&star=Gary%20Oldman`:

* The `Filter` property resolves to `scifi stars`.
* The `Page` property resolves to `3`.
* The `Stars` array is filled from query parameters named `star` (`Name = "star"`) and resolves to `LeVar Burton` and `Gary Oldman`.

> **Note:**
> The query string parameters in the following routable page component also work in a *non-routable* component without an `@page` directive (for example, `Search.razor` for a shared `Search` component used in other components).

`Search.razor`:

```razor
@page "/search"

<h1>Search Example</h1>

<p>Filter: @Filter</p>

<p>Page: @Page</p>

@if (Stars is not null)
{
    <p>Stars:</p>

    <ul>
        @foreach (var name in Stars)
        {
            <li>@name</li>
        }
    </ul>
}

@code {
    [SupplyParameterFromQuery]
    private string? Filter { get; set; }

    [SupplyParameterFromQuery]
    private int? Page { get; set; }

    [SupplyParameterFromQuery(Name = "star")]
    private string[]? Stars { get; set; }
}
```

Use `Microsoft.AspNetCore.Components.NavigationManagerExtensions.GetUriWithQueryParameter*` to add, change, or remove one or more query parameters on the current URL.

> **Note:**
> For the following examples throughout this section that call `Microsoft.AspNetCore.Components.NavigationManagerExtensions.GetUriWithQueryParameter*` or `Microsoft.AspNetCore.Components.NavigationManagerExtensions.GetUriWithQueryParameters*`, `Navigation` is an injected `Microsoft.AspNetCore.Components.NavigationManager`:
>
> ```razor
> @inject NavigationManager Navigation
> ```

```csharp
Navigation.NavigateTo(Navigation.GetUriWithQueryParameter("{NAME}", {VALUE}));
```

For the preceding example:

* The `{NAME}` placeholder specifies the query parameter name. The `{VALUE}` placeholder specifies the value as a supported type. Supported types are listed later in this section.
* A string is returned equal to the current URL with a single parameter:
  * Added if the query parameter name doesn't exist in the current URL.
  * Updated to the value provided if the query parameter exists in the current URL.
  * Removed if the type of the provided value is nullable and the value is `null`.
* The correct culture-invariant formatting is applied for the given type (`System.Globalization.CultureInfo.InvariantCulture`).
* The query parameter name and value are URL-encoded.
* All of the values with the matching query parameter name are replaced if there are multiple instances of the type.

Call `Microsoft.AspNetCore.Components.NavigationManagerExtensions.GetUriWithQueryParameters*` to create a URI constructed from `Microsoft.AspNetCore.Components.NavigationManager.Uri` with multiple parameters added, updated, or removed. For each value, the framework uses `value?.GetType()` to determine the runtime type for each query parameter and selects the correct culture-invariant formatting. The framework throws an error for unsupported types.

```csharp
Navigation.NavigateTo(Navigation.GetUriWithQueryParameters({PARAMETERS}));
```

The `{PARAMETERS}` placeholder is a `Dictionary<string, object?>`.

Pass a URI string to `Microsoft.AspNetCore.Components.NavigationManagerExtensions.GetUriWithQueryParameters*` to generate a new URI from a provided URI with multiple parameters added, updated, or removed. For each value, the framework uses `value?.GetType()` to determine the runtime type for each query parameter and selects the correct culture-invariant formatting. The framework throws an error for unsupported types. Supported types are listed later in this section.

```csharp
Navigation.NavigateTo(Navigation.GetUriWithQueryParameters("{URI}", {PARAMETERS}));
```

* The `{URI}` placeholder is the URI with or without a query string.
* The `{PARAMETERS}` placeholder is a `Dictionary<string, object?>`.

Supported types are identical to supported types for route constraints:

* `bool`
* `DateOnly`
* `DateTime`
* `decimal`
* `double`
* `float`
* `Guid`
* `int`
* `long`
* `string`
* `TimeOnly`

Supported types include:

* Nullable variants of the preceding types.
* Arrays of the preceding types, whether they're nullable or not nullable.

> **Warning:**
> With compression, which is enabled by default, avoid creating secure (authenticated/authorized) interactive server-side components that render data from untrusted sources. Untrusted sources include route parameters, query strings, data from JS interop, and any other source of data that a third-party user can control (databases, external services). For more information, see ASP.NET Core Blazor SignalR guidance and Threat mitigation guidance for ASP.NET Core Blazor interactive server-side rendering.

### Replace a query parameter value when the parameter exists

```csharp
Navigation.NavigateTo(
    Navigation.GetUriWithQueryParameter("full name", "Morena Baccarin"));
```

Current URL | Generated URL
--- | ---
`scheme://host/?full%20name=David%20Krumholtz&age=42` | `scheme://host/?full%20name=Morena%20Baccarin&age=42`
`scheme://host/?fUlL%20nAmE=David%20Krumholtz&AgE=42` | `scheme://host/?full%20name=Morena%20Baccarin&AgE=42`
`scheme://host/?full%20name=Jewel%20Staite&age=42&full%20name=Summer%20Glau` | `scheme://host/?full%20name=Morena%20Baccarin&age=42&full%20name=Morena%20Baccarin`
`scheme://host/?full%20name=&age=42` | `scheme://host/?full%20name=Morena%20Baccarin&age=42`
`scheme://host/?full%20name=` | `scheme://host/?full%20name=Morena%20Baccarin`

### Append a query parameter and value when the parameter doesn't exist

```csharp
Navigation.NavigateTo(
    Navigation.GetUriWithQueryParameter("name", "Morena Baccarin"));
```

Current URL | Generated URL
--- | ---
`scheme://host/?age=42` | `scheme://host/?age=42&name=Morena%20Baccarin`
`scheme://host/` | `scheme://host/?name=Morena%20Baccarin`
`scheme://host/?` | `scheme://host/?name=Morena%20Baccarin`

### Remove a query parameter when the parameter value is `null`

```csharp
Navigation.NavigateTo(
    Navigation.GetUriWithQueryParameter("full name", (string)null));
```

Current URL | Generated URL
--- | ---
`scheme://host/?full%20name=David%20Krumholtz&age=42` | `scheme://host/?age=42`
`scheme://host/?full%20name=Sally%20Smith&age=42&full%20name=Summer%20Glau` | `scheme://host/?age=42`
`scheme://host/?full%20name=Sally%20Smith&age=42&FuLl%20NaMe=Summer%20Glau` | `scheme://host/?age=42`
`scheme://host/?full%20name=&age=42` | `scheme://host/?age=42`
`scheme://host/?full%20name=` | `scheme://host/`

### Add, update, and remove query parameters

In the following example:

* `name` is removed, if present.
* `age` is added with a value of `25` (`int`), if not present. If present, `age` is updated to a value of `25`.
* `eye color` is added or updated to a value of `green`.

```csharp
Navigation.NavigateTo(Navigation.GetUriWithQueryParameters(
    new Dictionary<string, object?>
    {
        ["name"] = null,
        ["age"] = (int?)25,
        ["eye color"] = "green"
    }));
```

Current URL | Generated URL
--- | ---
`scheme://host/?name=David%20Krumholtz&age=42` | `scheme://host/?age=25&eye%20color=green`
`scheme://host/?NaMe=David%20Krumholtz&AgE=42` | `scheme://host/?age=25&eye%20color=green`
`scheme://host/?name=David%20Krumholtz&age=42&keepme=true` | `scheme://host/?age=25&keepme=true&eye%20color=green`
`scheme://host/?age=42&eye%20color=87` | `scheme://host/?age=25&eye%20color=green`
`scheme://host/?` | `scheme://host/?age=25&eye%20color=green`
`scheme://host/` | `scheme://host/?age=25&eye%20color=green`

### Support for enumerable values

In the following example:

* `full name` is added or updated to `Morena Baccarin`, a single value.
* `ping` parameters are added or replaced with `35`, `16`, `87` and `240`.

```csharp
Navigation.NavigateTo(Navigation.GetUriWithQueryParameters(
    new Dictionary<string, object?>
    {
        ["full name"] = "Morena Baccarin",
        ["ping"] = new int?[] { 35, 16, null, 87, 240 }
    }));
```

Current URL | Generated URL
--- | ---
`scheme://host/?full%20name=David%20Krumholtz&ping=8&ping=300` | `scheme://host/?full%20name=Morena%20Baccarin&ping=35&ping=16&ping=87&ping=240`
`scheme://host/?ping=8&full%20name=David%20Krumholtz&ping=300` | `scheme://host/?ping=35&full%20name=Morena%20Baccarin&ping=16&ping=87&ping=240`
`scheme://host/?ping=8&ping=300&ping=50&ping=68&ping=42` | `scheme://host/?ping=35&ping=16&ping=87&ping=240&full%20name=Morena%20Baccarin`

### Navigate with an added or modified query string

To navigate with an added or modified query string, pass a generated URL to `Microsoft.AspNetCore.Components.NavigationManager.NavigateTo*`.

The following example calls:

* `Microsoft.AspNetCore.Components.NavigationManagerExtensions.GetUriWithQueryParameter*` to add or replace the `name` query parameter using a value of `Morena Baccarin`.
* Calls `Microsoft.AspNetCore.Components.NavigationManager.NavigateTo*` to trigger navigation to the new URL.

```csharp
Navigation.NavigateTo(
    Navigation.GetUriWithQueryParameter("name", "Morena Baccarin"));
```

## Navigate to an element at the current URI

Use the `GetUriWithFragment` extension method to construct a URI with a hash fragment. This helper method provides an efficient, zero-allocation way to append hash fragments to the current URI. The following example demonstrates two use cases:

* Inline call that jumps to Section 1 (`id="section-1"`) of the rendered page.
* Method call that receives a section identifier (`sectionId`) and navigates to the section of the page.

```razor
@inject NavigationManager Navigation

<a href="@Navigation.GetUriWithFragment("section-1")">
    Jump to Section 1
</a>

@code {
    private void NavigateToSection(string sectionId)
    {
        var uri = Navigation.GetUriWithFragment(sectionId);
        Navigation.NavigateTo(uri);
    }
}
```

The method uses `string.Create` for optimal performance and works correctly with non-root base URIs (for example, when using `<base href="/app/">`).

## Navigate to an element with a hashed (`#`) reference

Navigate to an element using the following approaches with a hashed (`#`) reference to the element. Routes to elements within the component and routes to elements in external components use root-relative paths. A leading forward slash (`/`) is optional.

Examples for each of the following approaches demonstrate navigation to an element with an `id` of `targetElement` in the `Counter` component:

* Anchor element (``) with an `href`:

  ```razor
  <a href="/counter#targetElement">
  ```

* `Microsoft.AspNetCore.Components.Routing.NavLink` component with an `href`:

  ```razor
  <NavLink href="/counter#targetElement">
  ```

* `Microsoft.AspNetCore.Components.NavigationManager.NavigateTo*` passing the relative URL:

  ```csharp
  Navigation.NavigateTo("/counter#targetElement");
  ```

The following example demonstrates navigating to an H2 heading in an external component.

> **Note:**
> For element navigation at the same URI, see Navigate to an element at the current URI.

In the `Home` (`Home.razor`) and `Counter` (`Counter.razor`) components, place the following markup at the bottoms of the existing component markup to serve as navigation targets. The `` creates artificial vertical space to demonstrate browser scrolling behavior:

```razor
<div class="border border-info rounded bg-info" style="height:500px"></div>

<h2 id="targetElement">Target H2 heading</h2>
<p>Content!</p>
```

Add the following `FragmentRouting` component to the app.

`FragmentRouting.razor`:

```razor
@page "/fragment-routing"
@inject NavigationManager Navigation

<PageTitle>Fragment routing</PageTitle>

<h1>Fragment routing to elements</h1>

<ul>
    <li>
        <a href="/#targetElement">
            Anchor to the <code>Home</code> component
        </a>
    </li>
    <li>
        <a href="/counter#targetElement">
            Anchor to the <code>Counter</code> component
        </a>
    </li>
    <li>
        <button @onclick="NavigateToElement">
            Navigate with <code>NavigationManager</code> to the 
            <code>Counter</code> component
        </button>
    </li>
</ul>

@code {
    private void NavigateToElement()
    {
        Navigation.NavigateTo("/counter#targetElement");
    }
}
```
