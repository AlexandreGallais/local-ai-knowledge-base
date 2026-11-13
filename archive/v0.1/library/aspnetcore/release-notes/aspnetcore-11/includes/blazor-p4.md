---
title: "blazor (part 4 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-11/includes/blazor.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# blazor (part 4 of 4)

### QuickGrid APIs from Virtualize are exposed

The following new `QuickGrid` component APIs are exposed when a grid is virtualized (`Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.Virtualize` set to `true`):

* `InitialItemIndex`: Scrolls the grid to the given zero-based row index on the first interactive render. The value is applied once and clamped to the valid range. This forwards to the inner `Virtualize` component. For more information, see ASP.NET Core Razor component virtualization.
* `ScrollToItemAsync`: Programmatically scrolls the grid to the given zero-based row index, aligning it to the top. The last call wins, and the method throws an `System.InvalidOperationException` when virtualization is disabled or the grid isn't rendered yet. This forwards to the inner `Virtualize` component. For more information, see ASP.NET Core Razor component virtualization.
* `AnchorMode`: Controls how the viewport behaves at list edges when items are dynamically added (default: `Start`). This is an experimental API that requires opting in to the `ASP0030` diagnostic, and it forwards to the inner `Virtualize` component. For more information, see ASP.NET Core Razor component virtualization.
* `ItemComparer`: A comparer used to detect whether items were prepended or appended between data loads, which is useful for class-typed items supplied by an `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.ItemsProvider`. This is an experimental API that requires opting in to the `ASP0030` diagnostic, and it forwards to the inner `Virtualize` component. For more information, see ASP.NET Core Razor component virtualization.

For more information, see ASP.NET Core Blazor \`QuickGrid\` component.

### Cache rendered output of a component subtree during static SSR

The new `CacheView` component caches the rendered output of a Razor component subtree during static server-side rendering (static SSR). On a cache hit, cached markup is replayed without instantiating or running the lifecycle of the child components that were included in the cached output.

`CacheView` is useful for expensive, mostly static sections of a page that don't require the entire response to be cached:

```razor
<CacheView VaryByQuery="category" ExpiresAfter="TimeSpan.FromMinutes(5)">
    <ProductList Category="@Category" />
</CacheView>
```

For more information, see ASP.NET Core Blazor CacheView component.

### Blazor Server circuits update after authentication refresh

Interactive Server components can now receive the refreshed `ClaimsPrincipal` without reconnecting the circuit. The Blazor component hub and client enable authentication refresh automatically, so no additional configuration is required.

After the connection refreshes its authentication, Blazor updates the authentication state and raises `AuthenticationStateChanged`. Components that consume `AuthenticationStateProvider`, including `AuthorizeView`, rerender using the refreshed identity and claims. This behavior is useful when a user's roles or permissions change during an active circuit or when a component should reload user-specific content after claims are refreshed. The UI can reflect the new authentication state without forcing the user to reconnect or reload the page.

For more information, see the following resources:

* [Blazor] Propagate SignalR authentication refresh to server circuits (`dotnet/aspnetcore` #68221)
* [release/11.0-rc1] Harden SignalR authentication refresh (`dotnet/aspnetcore` #68593)

Please don't comment on closed issues and PRs. If you have feedback on this feature, please open a new issue on the `dotnet/aspnetcore` GitHub repository.

### Experimental Blazor AI components for agentic user interfaces

Modern AI apps increasingly provide rich interactions with agents. A complete agentic user interface may need to stream ongoing work, visualize agent reasoning and progress, request approval before tools act, accept multimodal input, and synchronize state between the app and the agent. The Blazor AI components are designed to provide building blocks for creating these experiences using Blazor's component model.

The new `Microsoft.AspNetCore.Components.AI` NuGet package includes an initial set of Blazor AI components for streaming chat, rich-text and tool rendering, human approval flows, and typed, shared, and predictive UI state.

Blazor AI chat interface showing a conversation with a travel planning agent:

For more information, see ASP.NET Core Blazor AI components for agentic user interfaces.

#### Render content blocks

An `IChatClient` streams model-facing content, such as `TextContent`, `RichTextContent`, and `FunctionCallContent`, in `ChatResponseUpdate` values. `UIAgent` maps this response content into UI-facing `ContentBlock` objects that retain rendering state and can update in place while the response streams. For example, both plain-text fragments and structured rich-text snapshots map to a `RichContentBlock`.

The built-in block types include:

* `RichContentBlock` for streamed text and structured rich content.
* `FunctionInvocationContentBlock` for a server function call and its eventual result.
* `UIActionBlock` for a function that runs in the Blazor app.
* `FunctionApprovalBlock` for a function call that is waiting for user approval.
* `ActivityContentBlock` for application-defined progress that updates in place.

`ChatPage` and `MessageList` include default rendering for `RichContentBlock` and `FunctionApprovalBlock`. Add a `BlockRenderer<TBlock>` to `ChatPage.MessageListContent` to replace this default rendering or render another block type. Its child content receives the matching block as `context`, including its current properties as they change during streaming.

The following example replaces the default rendering for conversational content:

```razor
<ChatPage Agent="agent">
    <MessageListContent>
        <BlockRenderer TBlock="RichContentBlock" Context="block">
            <div class="agent-response">@block.RawText</div>
        </BlockRenderer>
    </MessageListContent>
</ChatPage>
```

Use the renderer's `When` predicate to only handle selected blocks of a type. If multiple renderers match, the most recently registered renderer takes precedence. Apps can also define custom `ContentBlock` types and map response content to them with a `ContentBlockHandler<TState>`.

### Validation attributes are no longer experimental

`Microsoft.Extensions.Validation.ValidatableTypeAttribute` and `Microsoft.Extensions.Validation.SkipValidationAttribute` from the `Microsoft.Extensions.Validation` package are no longer marked experimental. If you suppressed `ASP0029` to use either attribute, remove the suppression.

For more information, see the following resources:

* Upgrade from the experimental `ValidatableTypeAttribute` and `SkipValidationAttribute` in .NET 10
* Validation in ASP.NET Core
* Validation in ASP.NET Core
