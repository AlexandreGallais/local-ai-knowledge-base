---
title: "ASP.NET Core Blazor AI components for agentic user interfaces (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/components/ai-components.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor AI components for agentic user interfaces (part 2 of 2)

## Display activities

An activity is an app-defined progress item that updates in place while an agent performs longer-running work. For example, a research agent can show that it's searching sources, comparing results, and completing the research without adding a separate message for every update.

`ActivityHandler<TBlock>` is a protocol-neutral extension point that maps provider- or app-specific progress updates into a mutable `ActivityContentBlock`. `TryCreateBlock` initializes and emits the block for the first matching update. `TryUpdateBlock` mutates the same block as later updates arrive and indicates when the activity is complete. Register the handler with `UIAgentOptions.AddBlockHandler`, then provide a `BlockRenderer` for the app-specific block. Activities don't have a default visual representation.

AG-UI's `ACTIVITY_SNAPSHOT` and `ACTIVITY_DELTA` events are one possible source of these updates. `AGUIChatClient` exposes the original event through `ChatResponseUpdate.RawRepresentation`. For example, an app can handle replacing snapshots whose payload includes an app-defined `complete` property:

```csharp
using System.Text.Json;
using Microsoft.AspNetCore.Components.AI;
using AGUI.Abstractions;

public sealed class ResearchActivityBlock : ActivityContentBlock
{
    public string ActivityMessageId { get; set; } = "";
}

public sealed class ResearchActivityHandler
    : ActivityHandler<ResearchActivityBlock>
{
    protected override bool TryCreateBlock(
        BlockMappingContext context,
        ResearchActivityBlock state)
        => TryApplySnapshot(context, state, out _);

    protected override bool TryUpdateBlock(
        BlockMappingContext context,
        ResearchActivityBlock state,
        out bool isCompleted)
        => TryApplySnapshot(context, state, out isCompleted);

    private static bool TryApplySnapshot(
        BlockMappingContext context,
        ResearchActivityBlock state,
        out bool isCompleted)
    {
        isCompleted = false;

        if (context.Update.RawRepresentation is not ActivitySnapshotEvent snapshot ||
            (state.ActivityMessageId.Length > 0 &&
             (state.ActivityMessageId != snapshot.MessageId ||
              snapshot.Replace == false)))
        {
            return false;
        }

        state.ActivityMessageId = snapshot.MessageId;
        state.ActivityType = snapshot.ActivityType;
        state.Content = snapshot.Content;
        isCompleted =
            snapshot.Content.ValueKind == JsonValueKind.Object &&
            snapshot.Content.TryGetProperty("complete", out var complete) &&
            complete.ValueKind == JsonValueKind.True;
        context.MarkUpdateHandled();
        return true;
    }
}
```

The handler stores the AG-UI message ID on the block to correlate later snapshots. Apps that consume `ActivityDeltaEvent` instead apply its RFC 6902 JSON Patch operations to the current `Content` before returning from `TryUpdateBlock`. The app defines the activity payload and completion semantics; Components.AI doesn't include an AG-UI-specific activity handler or JSON Patch implementation.

## Shared state

Agentic UIs often show a shared workspace alongside the conversation, such as a recipe, document, form, or plan that the agent can update. `UIAgent<TState>` exposes this data as typed, observable UI state separately from conversational content.

The app configures a state mapper for the `ChatResponseUpdate` values produced by its `IChatClient`. In an AG-UI integration, the agent server explicitly maps selected tool results to `STATE_SNAPSHOT` or `STATE_DELTA` events. `AGUIChatClient` then exposes those events through `ChatResponseUpdate.RawRepresentation`, where the Blazor app can deserialize them and call `SetState`:

```csharp
using System.Text.Json;
using AGUI.Abstractions;
using Microsoft.AspNetCore.Components.AI;

var agent = new UIAgent<RecipeState>(chatClient, options =>
{
    options.StateMapper = context =>
    {
        if (context.Update.RawRepresentation is StateSnapshotEvent snapshot &&
            snapshot.Snapshot.Deserialize<RecipeState>(
                JsonSerializerOptions.Web) is { } state)
        {
            context.SetState(state);
        }
    };
});
```

Read the current value from `agent.State.Value` and subscribe to `agent.State.OnChanged` when the surrounding component needs to rerender. State mappers can also handle app-specific `AIContent` from other `IChatClient` implementations.

For the corresponding MAF server configuration, including mapping tool results to state snapshots and deltas, see State management with AG-UI.

## Show predictive UI state

Predictive state permits an app to render an agent's proposed state change while the model is still generating it without replacing the committed state. For example, as an agent generates the complete contents of an edited document in a tool argument, the UI can progressively display the proposed document and a diff. When generation finishes, the user can accept the completed proposal or reject it and restore the committed document.

An AG-UI server integration can map streamed arguments for a state-writing tool to provisional state events. The completed tool-call arguments are the authoritative proposal. When creating the `UIAgent<TState>`, configure its state mapper to deserialize those events and call `SetPredictiveState`. `AgentState<TState>` then retains the prior committed value for rollback:

```csharp
using System.Text.Json;
using AGUI.Abstractions;
using Microsoft.AspNetCore.Components.AI;

var agent = new UIAgent<DocumentState>(chatClient, options =>
{
    options.StateMapper = context =>
    {
        if (context.Update.RawRepresentation is StateSnapshotEvent snapshot &&
            snapshot.Snapshot.Deserialize<DocumentState>(
                JsonSerializerOptions.Web) is { } predictedState)
        {
            context.SetPredictiveState(predictedState);
        }
    };

    options.RegisterUIAction(AIFunctionFactory.Create(
        ConfirmChanges,
        name: "confirm_changes",
        description: "Confirm the proposed document changes."));
});
```

The example also registers a `confirm_changes` frontend action. When the action appears, a custom block renderer displays the accept and reject controls. The renderer adds the user's choice as the `accepted` argument and calls `UIActionBlock.InvokeAsync`, which runs the registered callback:

```csharp
private string ConfirmChanges(bool accepted)
{
    if (accepted)
    {
        agent.State.AcceptPredictiveState();
    }
    else
    {
        agent.State.RejectPredictiveState();
    }

    return accepted
        ? "The user accepted the changes."
        : "The user rejected the changes.";
}
```

The provisional value is immediately available from `agent.State.Value`, and `HasPendingPredictiveState` indicates that it isn't committed. The callback commits the completed proposal or restores the baseline, and its return value reports the decision to the agent in a follow-up run. If generation fails, is canceled, or ends without a decision, the provisional value is automatically rolled back. The server-side extraction and mapping of streamed tool arguments must be configured explicitly; see State management with AG-UI.

## Persist and restore conversations

An `IConversationThread` stores completed turns so a UI can rebuild its conversation after the component or app restarts. A thread can also retain protocol metadata, such as the `threadId` and previous `runId` used to continue a server-owned AG-UI conversation.

Pass the thread when constructing `UIAgent`, then call `UIAgent.RestoreAsync` or `AgentContext.RestoreAsync` to explicitly replay the stored updates into content blocks and typed state:

```csharp
var agent = new UIAgent(
    chatClient,
    options => options.Thread = conversationThread);

var restoredBlocks = await agent.RestoreAsync();
```

Passing a thread to `UIAgent` enables new completed turns to be persisted but doesn't automatically restore earlier turns. For MAF-hosted AG-UI agents, see AG-UI conversation continuity.
