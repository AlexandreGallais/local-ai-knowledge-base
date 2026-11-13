---
title: "ASP.NET Core Blazor CacheView component (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/state-management/cacheview-component.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor `CacheView` component

The `CacheView` component caches the rendered output of a Razor component subtree during static server-side rendering (static SSR). On a cache hit, cached markup is replayed without instantiating or running the lifecycle of the child components that were included in the cached output.

`CacheView` is useful for expensive, mostly static sections of a page that don't require the entire response to be cached.

```razor
<CacheView VaryByQuery="category" ExpiresAfter="TimeSpan.FromMinutes(5)">
    <ProductList Category="@Category" />
</CacheView>
```

Caching is enabled by default. Set `Enabled="false"` to render the content normally without reading or writing a cache entry.

## Cache keys and vary-by values

Each `CacheView` has a key based on its position in the component tree. Set `CacheKey` when the same component containing a `CacheView` is rendered multiple times, such as in a loop, so that each instance has a distinct entry.

For example, every `CacheView` produced by this loop has the same position in the render tree:

```razor
@for (var i = 0; i < 3; i++)
{
    <CacheView ExpiresAfter="TimeSpan.FromHours(1)"
               VaryByQuery="testId">
        <p>@Guid.NewGuid()</p>
    </CacheView>
}
```

The instances therefore resolve to the same key during the request, and `CacheView` throws an `InvalidOperationException`. Assign a unique `CacheKey` to each iteration, as demonstrated by the CacheView E2E tests:

```razor
@for (var i = 0; i < 3; i++)
{
    <CacheView CacheKey="@($"loop-{i}")"
               ExpiresAfter="TimeSpan.FromHours(1)"
               VaryByQuery="testId">
        <p class="cached-value">@Guid.NewGuid()</p>
    </CacheView>
}
```

Each iteration now creates and reuses an independent cache entry.

The default tree-position key is computed from the immediate parent component type and sequence number, not the full ancestor chain. Multiple `CacheView` instances with the same immediate parent component, such as `<ErrorBoundary>` or a custom wrapper component, and the same position in its render tree produce the same tree-position key. Unless `VaryBy*` parameters, such as `VaryByRoute`, already differentiate the calculated cache key, the instances resolve to the same cache key:

* Within the same request (on the same page), `CacheView` throws an `System.InvalidOperationException` (`Multiple CacheView components resolved to the same cache key`).
* Across different pages or requests, no exception is thrown, and the instances silently share the same cache entry.

When the calculated keys would otherwise be the same, set `CacheKey` to distinguish between them.

Page 1:

```razor
<ErrorBoundary>
    <CacheView>
        <p>Component One</p>
    </CacheView>
</ErrorBoundary>
```

Page 2:

```razor
<ErrorBoundary>
    <CacheView CacheKey="SecondComponent">
        <p>Component Two</p>
    </CacheView>
</ErrorBoundary>
```

The following parameters add request-specific values to the cache key:

| Parameter | Cache varies by |
|---|---|
| `VaryByQuery` | A comma-separated list of query parameter names. Use `"*"` for all query parameters. |
| `VaryByRoute` | A comma-separated list of route parameter names. |
| `VaryByHeader` | A comma-separated list of HTTP header names. |
| `VaryByCookie` | A comma-separated list of cookie names. |
| `VaryByUser` | The authenticated user identity. |
| `VaryByCulture` | The current culture and UI culture. |
| `VaryBy` | An application-defined string value. |

`VaryByUser="true"` separates authenticated identities, but it doesn't automatically vary by every claim or permission. When a nonempty name identifier claim is present, other claims aren't included in the user portion of the key. If cached content depends on claims or permissions, also set `VaryBy` to an application-defined string that reflects all relevant values and changes when they do:

```razor
<CacheView VaryByUser="true" VaryBy="@currentPermission">
    <PermissionSensitiveContent />
</CacheView>
```

Here, `currentPermission` is the current permission value used by the child content. Authorization logic inside cached child content isn't rerun on a cache hit. Move content that must recheck authorization on every request outside the `CacheView`.

Without a matching vary-by parameter, requests with different values share the same cached output.

If a `<form>` or `Microsoft.AspNetCore.Components.Forms.EditForm` without an explicit `action` attribute is rendered inside a `CacheView`, its automatically generated `action` URL, including the query string, is cached with the markup. Configure `VaryByQuery` on the `CacheView` so that requests with different query strings don't share a cached form `action`.

## Expiration and cache storage

`CacheView` supports three expiration parameters:

* `ExpiresAfter` sets an absolute lifetime relative to entry creation.
* `ExpiresOn` sets an absolute expiration date and time.
* `ExpiresSliding` expires an entry after a period without access.

When no expiration is specified, entries expire after 30 seconds.

### Sliding expiration is bounded by an absolute expiration

`ExpiresSliding` doesn't keep an entry alive indefinitely. Every entry also carries an absolute expiration in the following order:

1. `ExpiresOn`, if set.
1. `ExpiresAfter`, if set.
1. The 30-second default.

An entry expires when either the sliding window elapses without access or the absolute expiration is reached, whichever comes first.

For example, consider `ExpiresSliding` set to 10 seconds with `ExpiresAfter` set to two minutes. Requests spaced less than 10 seconds apart reuse the cached output, and each access restarts the sliding window. A gap longer than 10 seconds expires the entry, so the next request creates a new entry. No matter how often the entry is accessed, it's never served more than two minutes after it's created.

Now consider `ExpiresSliding` set to 10 seconds without `ExpiresAfter` or `ExpiresOn`. The 30-second default absolute expiration applies, so repeated access within the 10-second window only keeps the entry alive until it's 30 seconds old. A gap longer than 10 seconds expires the entry earlier.

When you measure this behavior, report the configured expiration options together with the observed expiry because the sliding window alone doesn't determine when an entry is evicted.

The default in-memory store has a 100 MB cache size limit. Configure the limit with `RazorComponentsServiceOptions.CacheViewSizeLimit`. A value of `0` prevents entries from being cached. When the limit is reached, no new entries are cached until existing entries expire. The content still renders, but it isn't saved in the cache.

```csharp
builder.Services.AddRazorComponents(options =>
{
    options.CacheViewSizeLimit = 50 * 1024 * 1024;
});
```

If a `HybridCache` service is registered in dependency injection, `CacheView` uses it automatically. For example, register it in the `Program` file:

```csharp
builder.Services.AddHybridCache();
```

To use a specific `HybridCache` instance for `CacheView` without registering it in dependency injection, create the instance and assign it to `RazorComponentsServiceOptions.CacheViewHybridCache`. `CacheViewSizeLimit` applies only to the default in-memory store; a configured `HybridCache` uses its own backing-store limits and eviction behavior. Sliding expiration isn't supported with `HybridCache`; use `ExpiresAfter` or `ExpiresOn`.

Concurrent requests for the same key are coalesced so that only one request creates the cache entry.

## Declare component cache compatibility

Some components contain per-request content that must not be baked into shared cached markup. Component authors can apply `CacheBehaviorAttribute` and `CacheConditionAttribute` to control how their component behaves inside a `CacheView`.

The following table describes how the attributes work together.

Attributes | Condition isn't satisfied | Condition is satisfied
--- | --- | ---
No attributes | The component is included in cached output. | Not applicable.
`[CacheBehavior(CacheBehavior.Rerender)]` | The component renders live on every request. | Not applicable.
`[CacheBehavior(CacheBehavior.Throw)]` | The component throws an `InvalidOperationException`. | Not applicable.
`[CacheCondition(...)]` | The component renders live on every request using the default `CacheBehavior.Rerender` behavior. | The component is included in cached output.
`[CacheBehavior(CacheBehavior.Rerender)]` with `[CacheCondition(...)]` | The component renders live on every request. | The component is included in cached output.
`[CacheBehavior(CacheBehavior.Throw)]` with `[CacheCondition(...)]` | The component throws an `InvalidOperationException`. | The component is included in cached output.

```csharp
[CacheBehavior(CacheBehavior.Rerender)]
public sealed class CurrentRequestTime : ComponentBase
{
}
```

`CacheBehavior.Rerender` keeps the component live: its lifecycle runs on every request while the surrounding markup is served from the cache. The component's parameters are captured when the cache entry is created and replayed unchanged on cache hits.

`CacheBehavior.Throw` rejects use inside a `CacheView` unless a matching `CacheConditionAttribute` is satisfied.

Component authors can use `CacheBehavior.Throw` for components that are never safe to cache:

```razor
@attribute [CacheBehavior(CacheBehavior.Throw)]

<span class="user-badge">User: @UserName</span>

@code {
    [Parameter]
    public string? UserName { get; set; }
}
```

Adding vary-by parameters to the enclosing `CacheView` doesn't make this component cacheable because the component doesn't declare a cache condition. Move the component outside the cache boundary.

Combine `CacheBehavior.Throw` with `CacheConditionAttribute` for components that are cacheable only when the enclosing `CacheView` varies by specific request dimensions:

```csharp
[CacheBehavior(CacheBehavior.Throw)]
[CacheCondition(CacheVaryBy.User)]
public sealed class UserSpecificComponent : ComponentBase
{
}
```

In this example, the component can be included in cached output only when the enclosing `CacheView` sets `VaryByUser="true"`. Otherwise, rendering throws an `InvalidOperationException`.

Combine `CacheBehavior.Rerender` with `CacheConditionAttribute` when a component can render live if a required vary-by dimension isn't active and can be included in cached output when the dimension is active:

```razor
@using Microsoft.AspNetCore.Http
@attribute [CacheBehavior(CacheBehavior.Rerender)]
@attribute [CacheCondition(CacheVaryBy.Cookie)]

<p>Price selection: @PriceSelection</p>

@code {
    [CascadingParameter]
    private HttpContext? HttpContext { get; set; }

    private string PriceSelection =>
        HttpContext?.Request.Cookies["price-selection"] ?? "standard";
}
```

Without `VaryByCookie`, this component runs on every request. The following cache boundary satisfies the condition, so the component is included in cached output:

```razor
<CacheView VaryByCookie="price-selection">
    <PricePanel />
</CacheView>
```

`CacheConditionAttribute` checks vary-by dimensions, not individual query parameter, route parameter, header, or cookie names. For example, `[CacheCondition(CacheVaryBy.Cookie)]` is satisfied when `VaryByCookie` contains any value. It doesn't verify that `VaryByCookie` contains the correct cookie names. A component author must document every name that affects the component's output, and the consumer must include those exact names in the corresponding `CacheView` parameter. In the preceding example, specifying a cookie other than `price-selection` satisfies the declared condition but results in an unsafe cache key.

`CacheVaryBy` is a flags enum in which each value represents a request dimension. Combine dimensions with the logical OR operator (`|`):

```csharp
[CacheCondition(CacheVaryBy.User | CacheVaryBy.Query)]
```

In this example, both user variation and query string variation must be active to satisfy the condition.

You can only apply one `CacheConditionAttribute` to a component. Conditions don't have an evaluation order.

Built-in components use these policies:

| Component | Behavior inside `CacheView` |
|---|---|
| `AuthorizeView` | Requires `VaryByUser="true"` or throws. |
| `QuickGrid` | Requires `VaryByQuery` or throws. |
| `Virtualize` | Always throws. |
| Antiforgery tokens, `HeadOutlet`, interactive render mode boundaries, and streaming children | Render fresh on every request while surrounding content remains cached. |

When `CacheBehavior.Throw` rejects a component, the exception identifies the component and either lists the required vary-by dimensions or directs the developer to move the component outside the `CacheView`.
