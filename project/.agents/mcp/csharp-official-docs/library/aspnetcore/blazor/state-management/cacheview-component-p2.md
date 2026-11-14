---
title: "ASP.NET Core Blazor CacheView component (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/state-management/cacheview-component.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor CacheView component (part 2 of 2)

## Limitations

### Request and streaming rendering restrictions

`CacheView` only caches static SSR output for `GET` requests. Caching is skipped for other HTTP methods or interactive renders.

A `CacheView` rendered inside a streaming rendering subtree also isn't cached. However, a streaming child inside a `CacheView` is supported: the streaming child renders fresh on each request while the surrounding content is cached.

### Nested cache views

A `CacheView` can't be nested inside another `CacheView`. The inner output would become part of the outer cache entry, which could freeze per-request content such as antiforgery tokens, authentication-dependent output, or interactive component markers.

Move the inner `CacheView` outside the outer cached subtree.

### Live component parameters are captured once

Components marked with `CacheBehavior.Rerender` run their lifecycle on every request, but their parameter values are captured when the cache entry is created and replayed unchanged on cache hits.

For example, this live component receives the current user's name as a parameter:

```razor
@attribute [CacheBehavior(CacheBehavior.Rerender)]

<p>Welcome, @UserName!</p>

@code {
    [Parameter]
    public string? UserName { get; set; }
}
```

The following usage is unsafe:

```razor
<CacheView>
    <UserGreeting UserName="@CurrentUserName" />
</CacheView>

@code {
    [CascadingParameter]
    private HttpContext? HttpContext { get; set; }

    private string? CurrentUserName => HttpContext?.User.Identity?.Name;
}
```

If Alice creates the cache entry, `"Alice"` is captured as the `UserName` parameter. When Bob requests the page, `UserGreeting` runs its lifecycle again, but it receives the captured `"Alice"` value. Vary the cache by user so that each identity has a separate entry:

```razor
<CacheView VaryByUser="true">
    <UserGreeting UserName="@CurrentUserName" />
</CacheView>
```

Alternatively, move `UserGreeting` outside the `CacheView`.

### Live components can't have render fragment parameters

A live component can't have a `RenderFragment` or `RenderFragment<T>` parameter, including `ChildContent`. The parameter would capture content and references from the request that created the cache entry and couldn't be safely replayed on later requests.

For example, the following live component exposes a `ChildContent` parameter:

```razor
@attribute [CacheBehavior(CacheBehavior.Rerender)]

<div class="current-request-panel">
    @ChildContent
</div>

@code {
    [Parameter]
    public RenderFragment? ChildContent { get; set; }
}
```

Using the component inside a `CacheView` isn't supported:

```razor
<CacheView>
    <CurrentRequestPanel>
        <p>Content for @DateTimeOffset.Now</p>
    </CurrentRequestPanel>
</CacheView>
```

`CacheView` throws an `InvalidOperationException` instead of creating the cache entry. Remove the `ChildContent` parameter, move `CurrentRequestPanel` outside the `CacheView`, or introduce a live wrapper without render fragment parameters.

For example, the wrapper can render `CurrentRequestPanel` and its child content internally:

```razor
@attribute [CacheBehavior(CacheBehavior.Rerender)]

<CurrentRequestPanel>
    <p>Content for @DateTimeOffset.Now</p>
</CurrentRequestPanel>
```

The wrapper itself has no `ChildContent` or other `RenderFragment` parameter, so it can be used as the live component inside the cache:

```razor
<CacheView>
    <CurrentRequestPanelWrapper />
</CacheView>
```

On a cache hit, `CurrentRequestPanelWrapper` and its subtree render fresh. The wrapper provides a component boundary between the cached content and the component that receives `ChildContent`.

### Sliding expiration with HybridCache

`ExpiresSliding` isn't supported when the backing store uses `HybridCache`. Use `ExpiresAfter` or `ExpiresOn` for absolute expiration.
