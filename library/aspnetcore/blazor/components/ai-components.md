---
title: "ASP.NET Core Blazor AI components for agentic user interfaces (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/components/ai-components.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor AI components for agentic user interfaces

> **Important:**
> This information relates to a pre-release product that may be substantially modified before it's commercially released. Microsoft makes no warranties, express or implied, with respect to the information provided here.

-->
This file is named not-ga-yet.md so that it sorts next to not-latest-version.md
in the include folder.
-->

Modern AI apps increasingly provide rich interactions with agents. A complete agentic user interface might need to stream ongoing work, visualize agent reasoning and progress, request approval before tools act, accept multimodal input, and synchronize state between the app and the agent. The Blazor AI components are designed to provide building blocks for creating these experiences using Blazor's component model.

The `Microsoft.AspNetCore.Components.AI` NuGet package includes a set of Blazor AI components for streaming chat, rich-text and tool rendering, human approval flows, and typed, shared, and predictive UI state.

> **Important:**
> The `Microsoft.AspNetCore.Components.AI` package is a prerelease, experimental package throughout .NET 11. Experimental features are provided for the purpose of exploring feature viability and might not ship in a stable version.

## Packages

Add the following package references to the Blazor app:

* `Microsoft.AspNetCore.Components.AI`
* `AGUI.Client`

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

Basic chat and the Components.AI block model work with any `IChatClient`. The `AGUI.Client` package provides API for connecting the Blazor app to a remote agent over the Agent User Interaction Protocol (AG-UI).

`AGUI.Client` includes a transitive reference to the `AGUI.Abstractions` NuGet package, which provides the AG-UI event types used in examples later in this article.

## Get started

Register an `AGUIChatClient` as the app's `IChatClient`:

```csharp
using AGUI.Client;
using Microsoft.Extensions.AI;

builder.Services.AddHttpClient("Agent", client =>
{
    client.Timeout = Timeout.InfiniteTimeSpan;
});

builder.Services.AddScoped<IChatClient>(services =>
{
    var httpClient = services.GetRequiredService<IHttpClientFactory>()
        .CreateClient("Agent");

    return new AGUIChatClient(
        new AGUIChatClientOptions(httpClient, "https://api.example.com/agent"));
});
```

`AGUIChatClient` streams AG-UI events as `ChatResponseUpdate` values. The Blazor AI components render the conversational content from these updates, while apps can use the additional AG-UI event information to build richer agentic interactions. While basic chat functionality is supported with any `IChatClient`, AG-UI is required when a remote server and the Blazor client must exchange frontend tool declarations, backend tool events, approval interrupts, shared-state events, or AG-UI conversation identifiers.

Microsoft Agent Framework (MAF) can expose an `AIAgent` through an ASP.NET Core AG-UI endpoint. For the server-side setup, see AG-UI integration with Agent Framework and its .NET getting-started guide.

## Build a basic <example-value> conversation

The first step in an agentic UI is often a basic <example-value> that streams responses and retains message history across turns. Chat support is provider- and protocol-neutral. Apps supply an `IChatClient` from `Microsoft.Extensions.AI`, and `UIAgent` converts its streaming responses into observable content blocks.

`ChatPage` is a complete chat shell that combines three lower-level components:

* `AgentBoundary` creates and cascades the conversation state.
* `MessageList` renders each turn as it streams and provides default typing, error, and retry UI.
* `MessageInput` sends messages from a text area and disables input while a response is streaming.

The following component creates a `UIAgent` over an app-provided `IChatClient` and renders the conversation with `ChatPage`:

```razor
@rendermode InteractiveServer
@using Microsoft.AspNetCore.Components.AI
@using Microsoft.Extensions.AI
@implements IDisposable
@inject IChatClient ChatClient

<ChatPage Agent="agent" Placeholder="Type a message...">
    <WelcomeContent>
        <p>Ask the agent a question.</p>
    </WelcomeContent>
</ChatPage>

@code {
    private UIAgent agent = default!;

    protected override void OnInitialized()
    {
        agent = new UIAgent(ChatClient);
    }

    public void Dispose() => agent.Dispose();
}
```

`Placeholder` sets the hint shown in the empty message input. `WelcomeContent` supplies the content shown before the first message is sent.

Include the component styles in the `App` component (`Components/App.razor`):

```razor
<link rel="stylesheet" href="@Assets["_content/Microsoft.AspNetCore.Components.AI/ai-chat.css"]" />
```

## Render content blocks

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

## Render structured rich text

Rich-text support permits an agent to return a structured presentation model instead of plain text. `RichTextContent` is response content that contains both plain text and `RichTextNode` values for headings, paragraphs, emphasis, links, lists, code blocks, tables, and other presentation elements. `UIAgent` maps it to the same `RichContentBlock` used for plain `TextContent` but uses the supplied node tree instead of creating simple paragraphs.

Apps can produce `RichTextContent` directly or use `IChatClient` middleware to transform streamed `TextContent`, such as by parsing Markdown into `RichTextNode` values. The package doesn't require or include a particular Markdown implementation. Each `RichTextContent` is a complete snapshot, so it atomically replaces the previous content for the same message as streaming progresses. `ChatPage` and `MessageList` then render the structured content without requiring a custom `BlockRenderer`.

## Render server tool calls

An agent can call a tool that runs on its server while the Blazor app renders the operation using app-specific UI. For example, the agent can call a weather tool, and the app can show the requested location immediately, followed by a weather card when the server returns the result.

Server tool calls become `FunctionInvocationContentBlock` instances, which pair the `FunctionCallContent` with its eventual `FunctionResultContent` and expose the tool name, arguments, and completion state.

The package's source generator creates a strongly typed block handler from a class annotated with `ToolBlock`, `ToolParameter`, and `ToolResult`:

```csharp
[ToolBlock("get_weather")]
public partial class WeatherToolBlock : FunctionInvocationContentBlock
{
    [ToolParameter(Name = "location")]
    public string? Location { get; set; }

    [ToolResult]
    public WeatherInfo? Weather { get; set; }
}
```

Register the generated handlers when constructing the `UIAgent`:

```csharp
var agent = new UIAgent(
    chatClient,
    options => options.AddGeneratedToolBlocks());
```

Render the generated block in `MessageListContent`:

```razor
<ChatPage Agent="agent">
    <MessageListContent>
        <BlockRenderer TBlock="WeatherToolBlock">
            @if (context.HasResult)
            {
                <p>@context.Location: @context.Weather?.Temperature&deg;C</p>
            }
            else
            {
                <p>Checking the weather for @context.Location...</p>
            }
        </BlockRenderer>
    </MessageListContent>
</ChatPage>
```

As the call arguments stream, the generated handler updates `Location` while `HasResult` remains `false`. When the result arrives, it populates `Weather`, sets `HasResult` to `true`, and rerenders the same block as the completed weather card.

When MAF hosts the remote agent, backend tools use its normal tool pipeline and AG-UI transports the call and result to the client. For more information, see Backend tool rendering with AG-UI.

## Run frontend tools

Frontend tools run in the client app rather than on the agent server. For example, a Blazor app can expose a tool that changes UI state, reads a local preference, or asks the user for input. Create the tool with `AIFunctionFactory` from `Microsoft.Extensions.AI`, then register it with `UIAgentOptions.RegisterUIAction`.

`RegisterUIAction` advertises the `AIFunction` to the agent. When the agent requests it, `UIAgent` creates a `UIActionBlock` instead of executing the function immediately:

```csharp
var setAccentColor = AIFunctionFactory.Create(
    async (string color) =>
    {
        await InvokeAsync(() =>
        {
            accentColor = color;
            StateHasChanged();
        });
        return $"Changed the accent color to {color}.";
    },
    name: "set_accent_color");

var agent = new UIAgent(
    chatClient,
    options => options.RegisterUIAction(setAccentColor));
```

Place a `BlockRenderer<UIActionBlock>` in `MessageListContent` to handle the function call requested by the agent. For example, the renderer can use a component that automatically invokes the function and displays its progress:

```razor
<ChatPage Agent="agent">
    <MessageListContent>
        <BlockRenderer TBlock="UIActionBlock"
                       When='@(action => action.ToolName == "set_accent_color")'
                       Context="action">
            <AutoInvokeAction Action="action" />
        </BlockRenderer>
    </MessageListContent>
</ChatPage>
```

The `AutoInvokeAction` component calls `InvokeAsync` when it receives the block:

```razor
@if (Action.IsComplete)
{
    <span>Accent color updated</span>
}
else
{
    <span>Updating accent color...</span>
}

@code {
    [Parameter, EditorRequired]
    public UIActionBlock Action { get; set; } = default!;

    protected override async Task OnInitializedAsync()
    {
        if (!Action.IsComplete)
        {
            await Action.InvokeAsync();
        }
    }
}
```

Calling `InvokeAsync` executes the registered function with the arguments supplied by the agent. The function runs wherever the Blazor UI runs: in the server-side circuit for Blazor Server or in the browser for WebAssembly. When the function completes, `UIAgent` sends its result back to the agent and continues the conversation. Use the renderer's `When` predicate to provide different handling for each `action.ToolName`. A renderer can invoke the action automatically, as shown here, or present UI that collects input or confirmation first.

## Require approval before tools run

An app can require the user to approve a consequential tool call, such as scheduling a meeting, before the agent proceeds. Tool approval requests become `FunctionApprovalBlock` instances. The conversation pauses until the UI calls `Approve` or `Reject`:

```razor
<ChatPage Agent="agent">
    <MessageListContent>
        <BlockRenderer TBlock="FunctionApprovalBlock" Context="approval">
            <p>Allow <code>@approval.ToolName</code> to run?</p>
            <button @onclick="approval.Approve">Approve</button>
            <button @onclick="() => approval.Reject()">Reject</button>
        </BlockRenderer>
    </MessageListContent>
</ChatPage>
```

For a MAF agent, the server decides which functions require approval, and AG-UI transports the request and decision. For more information, see Human-in-the-loop with AG-UI.
