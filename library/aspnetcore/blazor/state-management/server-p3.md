---
title: "ASP.NET Core Blazor server-side state management (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/state-management/server.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor server-side state management (part 3 of 3)

## Server-side storage

Data can be stored temporarily or permanently in server-side scenarios.

### Supported property types for temporary data and session

The `[SupplyParameterFromTempData]` and `[SupplyParameterFromSession]` attributes support the same stored-value types for component properties during static server-side rendering:

Type | Supported values
--- | ---
Scalar | `string`, `int`, `bool`, `Guid`, `DateTime`, and enums with an `int` underlying type
Nullable scalar | Nullable forms of the supported value types, such as `int?`
Collection | One-dimensional arrays (`T[]`), `List<T>`, `HashSet<T>`, and `Collection<T>`, where `T` is a supported scalar or nullable scalar type
Dictionary | `Dictionary<string, T>`, where `T` is a supported scalar or nullable scalar type
Object array | `object[]`, whose elements are serialized individually and must have supported types

Null values are supported. An empty collection remains distinct from a null collection after a round trip. A nullable property explicitly set to null and one never set both read back as null; this alone doesn't establish whether a storage key was present.

Arbitrary JSON-serializable types aren't supported. For example, a user-defined class, a list of user-defined classes, or an enum backed by `byte` isn't supported. The supported types are determined by the stored-data serializer, not by whether `System.Text.Json` can serialize the type.

### Temporary data persistence

To persist temporary data between HTTP requests during static server-side rendering (static SSR), Blazor supports `TempData`. `TempData` is ideal for scenarios such as flash messages after form submissions, passing data during redirects (POST-Redirect-GET pattern), and one-time notifications.

> **Important:**
> This feature is only available during static server-side rendering (static SSR). During interactive SSR and interactive client-side rendering (CSR), the `TempData` value isn't supplied, and the property retains its default value.
`TempData`:

* Is available when `Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents*` is called in the app's `Program` file.
* Is provided as a cascading value with the `[CascadingParameter]` attribute or the `[SupplyParameterFromTempData]` parameter attribute.
* Is accessed by key (string).
* Supports the stored-value types listed earlier.
* Stores `object?` values, requiring runtime casting (example: `var message = TempData["Message"] as string`). IntelliSense and type checking aren't supported.
* Uses case-insensitive keys, so `TempData["message"]` and `TempData["Message"]` retrieve the same value.

```csharp
[CascadingParameter]
public ITempData? TempData { get; set; }
```

When supplied to a parameter for simple read/write of a single value, use the `[SupplyParameterFromTempData]` attribute without or with a key (string):

```csharp
[SupplyParameterFromTempData]
public string? Message { get; set; }

[SupplyParameterFromTempData(Name = "flash_message")]
public string? FlashMessage { get; set; }
```

A key (string) is useful to distinguish multiple parameters because properties can't share a temporary data value.

The `ITempData` interface provides the following methods for controlling value lifecycle:

* `Get`: Gets the value associated with the specified key and schedules the data for deletion.
* `Peek`: Returns the value associated with the specified key <example-value> marking the data for deletion.
* `Keep`: Marks all keys in the dictionary for retention. Values are available on the next request.
* `Keep(string)`: Marks a specified key (string) for retention. The value is available on the next request.

Data stored in `TempData` is automatically removed after the data is read unless `Keep`/`Keep(string)` is called or the data is accessed via `Peek`.

The default cookie-based provider uses Data Protection for encryption. If the cookie is tampered with or can't be decrypted, `TempData` has no value for that request. The provider removes the unreadable cookie in the response rather than displaying an error page, so the next request starts without it. In a multi-server deployment, configure Data Protection so instances can read each other's cookies. Normal key <example-value> doesn't make existing cookies unreadable when the previous keys are retained.

To change the Blazor `TempData` cookie settings in the following table, configure `TempDataCookie` when calling `AddRazorComponents` in the app's `Program` file.

Parameter | API | Notes
--- | --- | ---
Name | `Name` | The default value is `.AspNetCore.Components.TempData`.
HTTP Only | `HttpOnly` | The default value is `true`.
SameSite value | `SameSite` | The default value is `Microsoft.AspNetCore.Http.SameSiteMode.Lax`.
Secure policy | `SecurePolicy` | The default value is `Microsoft.AspNetCore.Http.CookieSecurePolicy.SameAsRequest`, which marks the cookie as secure when the request uses HTTPS.

Example (sets default values):

```csharp
builder.Services.AddRazorComponents(options =>
{
    options.TempDataCookie.Name = ".AspNetCore.Components.TempData";
    options.TempDataCookie.HttpOnly = true;
    options.TempDataCookie.SameSite = SameSiteMode.Lax;
    options.TempDataCookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
});
```

> **Note:**
Unsupported non-null `TempData` values fail when the response is persisted, which can occur after the component has rendered. Blazor WebAssembly and interactive server rendering aren't supported.

Browsers enforce a 4 KB cookie size limit. `TempData` automatically uses `Microsoft.AspNetCore.Authentication.Cookies.ChunkingCookieManager` to split cookies across multiple cookie headers, but developers storing a large amount of data must switch to session storage, which introduces session affinity requirements.

In the following example, a form displays a message that's retained in `TempData` after the form is submitted (a new request).

`Pages/TempDataExample1.razor`:

```razor
@page "/tempdata-example-1"
@inject NavigationManager NavigationManager

<p>@message</p>

<form method="post" @formname="SetMessage" @onsubmit="Submit">
    <AntiforgeryToken />
    <button type="submit">Submit</button>
</form>

@code {
    [CascadingParameter]
    public ITempData? TempData { get; set; }

    private string? message;

    protected override void OnInitialized()
    {
        // Get removes the value after reading (one-time use)
        message = TempData?.Get("Message") as string ?? "No message";
    }

    private void Submit()
    {
        TempData!["Message"] = "Form submitted successfully!";
        NavigationManager.NavigateTo("/tempdata-example-1", forceLoad: true);
    }
}
```

Reading without deleting (`Peek`):

```csharp
protected override void OnInitialized()
{
    var notification = TempData?.Peek("Message") as string;
}
```

Keep a specific value for another request (`Keep(string)`):

```csharp
protected override void OnInitialized()
{
    var message = TempData?.Get("Message") as string;
    TempData?.Keep("Message");
}
```

Keep all values for another request (`Keep`):

```csharp
protected override void OnInitialized()
{
    TempData?.Keep();
}
```

Similar to the preceding example but when only simple read/write of a single value is required, the following example uses the `[SupplyParameterFromTempData]` attribute.

`Pages/TempDataExample2.razor`:

```razor
@page "/tempdata-example-2"
@inject NavigationManager NavigationManager

<p>@Message</p>

<form method="post" @formname="SetMessage" @onsubmit="Submit">
    <AntiforgeryToken />
    <button type="submit">Submit</button>
</form>

@code {
    [SupplyParameterFromTempData]
    public string? Message { get; set; }

    private void Submit()
    {
        Message = "Form submitted successfully!";
        NavigationManager.NavigateTo("/tempdata-example-2", forceLoad: true);
    }
}
```

#### Streaming server-side rendering

During streaming server-side rendering (streaming SSR), cookie-backed `TempData` values can't be saved after the response starts because the provider must write a cookie to the response headers. Setting a value before an `await` doesn't avoid this limitation if the response is flushed before `TempData` is persisted. To persist values during streaming SSR, use the session-storage provider.

Configure session services and middleware as described in Session data persistence. A new session needs its session cookie issued before the first response flush. After the session is established, session-backed values can be persisted during streaming SSR.

### Session data persistence

Session data persistence reads and writes cookie-based HTTP session values during static server-side rendering (static SSR), which is useful for scenarios such as shopping cart IDs or multi-step form progress. Unlike temporary data persistence (`ITempData`), session values aren't cleared after reading. Values persist across multiple requests for the session lifetime.

> **Important:**
> This feature is only available during static server-side rendering (static SSR). During interactive SSR and interactive client-side rendering (CSR), the session value isn't supplied, and the property retains its default value.

Session storage:

* Requires explicit session state configuration.
* Has no practical size limits (within session constraints).
* Serializes values with `System.Text.Json` with `System.Text.Json.JsonSerializerDefaults`.
* Requires session affinity (sticky sessions) in load-balanced environments. Without it, users may lose data. For more information, see ASP.NET Core Blazor SignalR guidance.

For streaming SSR, establish a new session before the first response flush. Place a `[SupplyParameterFromSession]` parameter on a component rendered before that flush or write to the session directly before an `await` that triggers it. If the first session-backed component is rendered only after streaming starts, the session cookie can't be issued for a new session and its values won't persist to the next request.

When supplied to a parameter, use the `[SupplyParameterFromSession]` attribute without or with a key (string):

```csharp
[SupplyParameterFromSession]
public string? Message { get; set; }

[SupplyParameterFromSession(Name = "flash_message")]
public string? FlashMessage { get; set; }
```

A key (string) is useful to distinguish multiple parameters because properties can't share a session value.

The supported property types are the same as for `[SupplyParameterFromTempData]`. For an unsupported concrete property type, `[SupplyParameterFromSession]` throws when the component subscribes to the session value. The exception identifies the property, component, attribute, and property type. This differs from the later `TempData` persistence failure, which identifies the unsupported value type.

Call `AddSession` on the service collection in the app's `Program` file passing `SessionOptions` to change the cookie's parameters.

Parameter | API | Notes
--- | --- | ---
Name | `Name` | The default value is `Microsoft.AspNetCore.Session.SessionDefaults.CookieName*` (`.AspNetCore.Session`).
Path | `Path` | The default value is `Microsoft.AspNetCore.Session.SessionDefaults.CookiePath*` (`/`).
HTTP Only | `HttpOnly` | The default value is `true`.
SameSite value | `SameSite` | The default value is `Microsoft.AspNetCore.Http.SameSiteMode.Lax`.
Secure policy | `SecurePolicy` | Some browsers don't allow insecure endpoints to set cookies with a 'secure' flag or overwrite cookies whose 'secure' flag is set. Since mixing secure and insecure endpoints is a common scenario in apps, the framework relaxes the restriction on secure policy on some cookies by setting them to 'None'. Cookies related to authentication or authorization use a stronger policy than 'None'. The default value is `CookieSecurePolicy.None`.
Is Essential | `IsEssential` | Session is considered non-essential, as it's designed for ephemeral data. The default value is `false`.
Idle Timeout | `IdleTimeout` | Indicates how long the session can be idle before its contents are abandoned (default value: 20 minutes). Each session access resets the timeout. This setting only applies to the content of the session, not the cookie.
IO Timeout | `IOTimeout` | The maximum amount of time allowed to load a session from the store or to commit it back to the store (default value: 1 minute). This may only apply to asynchronous operations. The timeout is disabled using `System.Threading.Timeout.InfiniteTimeSpan*`.

After configuring session services with `AddSession`, call `UseSession` in the request processing pipeline. The following example demonstrates default values:

```csharp
builder.Services.AddDistributedMemoryCache();

builder.Services.AddSession(options =>
{
    options.Name = ".AspNetCore.Session";
    options.Path = "/";
    options.HttpOnly = true;
    options.SecurePolicy = CookieSecurePolicy.None;
    options.SameSite = SameSiteMode.Lax;
    options.IsEssential = false;
    options.IdleTimeout = TimeSpan.FromMinutes(20);
    options.IOTimeout =  TimeSpan.FromMinutes(1);
});

builder.Services.AddRazorComponents();

var app = builder.Build();

app.UseSession();
```

`Pages/Checkout.razor`:

```razor
@page "/checkout"

<p>Current step: @CurrentStep</p>

<EditForm Model="Input" FormName="checkout" OnSubmit="NextStep">
    <button type="submit">Next</button>
</EditForm>

@code {
    [SupplyParameterFromSession(Name = "checkout_step")]
    public int CurrentStep { get; set; }

    private object Input { get; } = new();

    private void NextStep() => CurrentStep++;
}
```

### Permanent data persistence

For permanent data persistence that spans multiple users and devices, the app can use server-side storage. Options include:

* Blob storage
* Key-value storage
* Relational database
* Table storage

After data is saved, the user's state is retained and available in any new circuit.

For more information on Azure data storage options, see the following:

* Azure Databases
* Azure Storage Documentation

## Browser storage

For more information, see ASP.NET Core Blazor state management using protected browser storage.

## Related content

* State management using the URL
* In-memory state container service
* Cascading values and parameters
* Managing state via an external server API
