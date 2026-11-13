---
title: "ASP.NET Core Blazor event handling (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/components/event-handling.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor event handling

-->
-->

This article explains Blazor's event handling features, including event argument types, event callbacks, and managing default browser events.

The `Microsoft.AspNetCore.Components.Web` NuGet package (`Microsoft.AspNetCore.Components.Web` namespace) contains types for supplying information about browser events to the Blazor framework. Blazor apps target the package implicitly, while Razor class libraries include an explicit package reference in the library's project file (`.csproj`).

## Delegate event handlers

Specify delegate event handlers in Razor component markup with `@on{DOM EVENT}="{DELEGATE}"` Razor syntax:

* The `{DOM EVENT}` placeholder is a DOM event (for example, `click`).
* The `{DELEGATE}` placeholder is the C# delegate event handler.

For supported events, see `Microsoft.AspNetCore.Components.Web.EventHandlers`.

For event handling:

* Delegate event handlers in Blazor Web Apps are only called in components that adopt an interactive render mode. The examples throughout this article assume that the app adopts an interactive render mode globally in the app's root component, typically the `App` component. For more information, see ASP.NET Core Blazor render modes.
* Asynchronous delegate event handlers that return a `System.Threading.Tasks.Task` (`async Task`) are supported by Blazor and adopted by Blazor Web App and Blazor WebAssembly documentation examples.
* Delegate event handlers automatically trigger a UI render, so there's no need to manually call `StateHasChanged`.
* Exceptions are logged.

> **Important:**
> The Blazor framework doesn't track `void`-returning asynchronous methods (`async`). As a result, the entire process fails when an exception isn't caught if `void` is returned. Always return a `System.Threading.Tasks.Task`/`System.Threading.Tasks.ValueTask` from asynchronous methods.

The following code:

* Calls the `UpdateHeading` method when the button is selected in the UI.
* Calls the `CheckChanged` method when the checkbox is changed in the UI.

`EventHandler1.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/EventHandler1.razor._
In the following example, `UpdateHeading`:

* Is called asynchronously when the button is selected.
* Waits two seconds before updating the heading.

`EventHandler2.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/EventHandler2.razor._
## Built-in event arguments

For events that support an event argument type, specifying an event parameter in the event method definition is only necessary if the event type is used in the method. In the following example, `Microsoft.AspNetCore.Components.Web.MouseEventArgs` is used in the `ReportPointerLocation` method to set message text that reports the mouse coordinates when the user selects a button in the UI.

`EventHandler3.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/EventHandler3.razor._
Supported `System.EventArgs` are shown in the following table.

| Event            | Class  | DOM notes |
| ---------------- | ------ | --- |
| Clipboard        | `Microsoft.AspNetCore.Components.Web.ClipboardEventArgs` | |
| Drag             | `Microsoft.AspNetCore.Components.Web.DragEventArgs` | `Microsoft.AspNetCore.Components.Web.DataTransfer` and `Microsoft.AspNetCore.Components.Web.DataTransferItem` hold dragged item data.Implement drag and drop in Blazor apps using JS interop with HTML Drag and Drop API. |
| Error            | `Microsoft.AspNetCore.Components.Web.ErrorEventArgs` | |
| Event            | `System.EventArgs` | `Microsoft.AspNetCore.Components.Web.EventHandlers` holds attributes to configure the mappings between event names and event argument types. |
| Focus            | `Microsoft.AspNetCore.Components.Web.FocusEventArgs` | Doesn't include support for `relatedTarget`. |
| Input            | `Microsoft.AspNetCore.Components.ChangeEventArgs` | |
| Keyboard         | `Microsoft.AspNetCore.Components.Web.KeyboardEventArgs` | |
| Mouse            | `Microsoft.AspNetCore.Components.Web.MouseEventArgs` | |
| Mouse pointer    | `Microsoft.AspNetCore.Components.Web.PointerEventArgs` | |
| Mouse wheel      | `Microsoft.AspNetCore.Components.Web.WheelEventArgs` | |
| Progress         | `Microsoft.AspNetCore.Components.Web.ProgressEventArgs` | |
| Touch            | `Microsoft.AspNetCore.Components.Web.TouchEventArgs` | `Microsoft.AspNetCore.Components.Web.TouchPoint` represents a single contact point on a touch-sensitive device. |

For more information, see the following resources:

* `EventArgs` classes in the ASP.NET Core reference source (dotnet/aspnetcore `main` branch)

  > **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

* `Microsoft.AspNetCore.Components.Web.EventHandlers` holds attributes to configure the mappings between event names and event argument types.

## Custom event arguments

Blazor supports custom event arguments, which enable you to pass arbitrary data to .NET event handlers with custom events.

### General configuration

Custom events with custom event arguments are generally enabled with the following steps.

In JavaScript, define a function for building the custom event argument object from the source event:

```javascript
function eventArgsCreator(event) { 
  return {
    customProperty1: 'any value for property 1',
    customProperty2: event.srcElement.id
  };
}
```

The `event` parameter is a DOM Event.

Register the custom event with the preceding handler in a JavaScript initializer. Provide the appropriate browser event name to `browserEventName`, which for the example shown in this section is `click` for a button selection in the UI.

`wwwroot/{PACKAGE ID/ASSEMBLY NAME}.lib.module.js` (the `{PACKAGE ID/ASSEMBLY NAME}` placeholder is the package ID or assembly name of the app):

For a Blazor Web App:

```javascript
export function afterWebStarted(blazor) {
  blazor.registerCustomEventType('customevent', {
    browserEventName: 'click',
    createEventArgs: eventArgsCreator
  });
}
```

For a Blazor Server or Blazor WebAssembly app:

```javascript
export function afterStarted(blazor) {
  blazor.registerCustomEventType('customevent', {
    browserEventName: 'click',
    createEventArgs: eventArgsCreator
  });
}
```

The call to `registerCustomEventType` is performed in a script only once per event.

For the call to `registerCustomEventType`, use the `blazor` parameter (lowercase `b`) provided by the Blazor start event. Although the registration is valid when using the `Blazor` object (uppercase `B`), the preferred approach is to use the parameter.

The custom event name, `customevent` in the preceding example, must not match a reserved Blazor event name. The reserved names can be found in the Blazor framework reference source (see the calls to the `registerBuiltInEventType` function).

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

Define a class for the event arguments:

```csharp
namespace BlazorSample.CustomEvents;

public class CustomEventArgs : EventArgs
{
    public string? CustomProperty1 {get; set;}
    public string? CustomProperty2 {get; set;}
}
```

Wire up the custom event with the event arguments by adding an `[EventHandler]` attribute annotation for the custom event:

* In order for the compiler to find the `[EventHandler]` class, it must be placed into a C# class file (`.cs`), making it a normal top-level class.
* Mark the class `public`.
* The class doesn't require members.
* The class *must* be called "`EventHandlers`" in order to be found by the Razor compiler.
* Place the class under a namespace specific to your app.
* Import the namespace into the Razor component (`.razor`) where the event is used.

```csharp
using Microsoft.AspNetCore.Components;

namespace BlazorSample.CustomEvents;

[EventHandler("oncustomevent", typeof(CustomEventArgs),
    enableStopPropagation: true, enablePreventDefault: true)]
public static class EventHandlers
{
}
```

Register the event handler on one or more HTML elements. Access the data that was passed in from JavaScript in the delegate handler method:

```razor
@using BlazorSample.CustomEvents

<button id="buttonId" @oncustomevent="HandleCustomEvent">Handle</button>

@if (!string.IsNullOrEmpty(propVal1) && !string.IsNullOrEmpty(propVal2))
{
    <ul>
        <li>propVal1: @propVal1</li>
        <li>propVal2: @propVal2</li>
    </ul>
}

@code
{
    private string? propVal1;
    private string? propVal2;

    private void HandleCustomEvent(CustomEventArgs eventArgs)
    {
        propVal1 = eventArgs.CustomProperty1;
        propVal2 = eventArgs.CustomProperty2;
    }
}
```

If the `@oncustomevent` attribute isn't recognized by IntelliSense, make sure that the component or the imports file (`_Imports.razor`) contains an `@using` statement for the namespace containing the `EventHandler` class.

Whenever the custom event is fired on the DOM, the event handler is called with the data passed from the JavaScript.

If you're attempting to fire a custom event, `bubbles` must be enabled by setting its value to `true`. Otherwise, the event doesn't reach the Blazor handler for processing into the C# custom `[EventHandler]` attribute class. For more information, see MDN Web Docs: Event bubbling.

### Custom clipboard paste event example

The following example receives a custom clipboard paste event that includes the time of the paste and the user's pasted text.

Declare a custom name (`oncustompaste`) for the event and a .NET class (`CustomPasteEventArgs`) to hold the event arguments for this event:

`CustomEvents.cs`:

```csharp
using Microsoft.AspNetCore.Components;

namespace BlazorSample.CustomEvents;

[EventHandler("oncustompaste", typeof(CustomPasteEventArgs), 
    enableStopPropagation: true, enablePreventDefault: true)]
public static class EventHandlers
{
}

public class CustomPasteEventArgs : EventArgs
{
    public DateTime EventTimestamp { get; set; }
    public string? PastedData { get; set; }
}
```

Add JavaScript code to supply data for the `System.EventArgs` subclass with the preceding handler in a JavaScript initializer. The following example only handles pasting text, but you could use arbitrary JavaScript APIs to deal with users pasting other types of data, such as images.

`wwwroot/{PACKAGE ID/ASSEMBLY NAME}.lib.module.js`:

For a Blazor Web App:

```javascript
export function afterWebStarted(blazor) {
  blazor.registerCustomEventType('custompaste', {
    browserEventName: 'paste',
    createEventArgs: event => {
      return {
        eventTimestamp: new Date(),
        pastedData: event.clipboardData.getData('text')
      };
    }
  });
}
```

For a Blazor Server or Blazor WebAssembly app:

```javascript
export function afterStarted(blazor) {
  blazor.registerCustomEventType('custompaste', {
    browserEventName: 'paste',
    createEventArgs: event => {
      return {
        eventTimestamp: new Date(),
        pastedData: event.clipboardData.getData('text')
      };
    }
  });
}
```

In the preceding example, the `{PACKAGE ID/ASSEMBLY NAME}` placeholder of the file name represents the package ID or assembly name of the app.

> **Note:**
> For the call to `registerCustomEventType`, use the `blazor` parameter (lowercase `b`) provided by the Blazor start event. Although the registration is valid when using the `Blazor` object (uppercase `B`), the preferred approach is to use the parameter.

The preceding code tells the browser that when a native `paste` event occurs:

* Raise a `custompaste` event.
* Supply the event arguments data using the custom logic stated:
  * For the `eventTimestamp`, create a new date.
  * For the `pastedData`, get the clipboard data as text. For more information, see MDN Web Docs: ClipboardEvent.clipboardData.

Event name conventions differ between .NET and JavaScript:

* In .NET, event names are prefixed with "`on`".
* In JavaScript, event names don't have a prefix.

In a Razor component, attach the custom handler to an element.

`CustomPasteArguments.razor`:

```razor
@page "/custom-paste-arguments"
@using BlazorSample.CustomEvents

<label>
    Try pasting into the following text box:
    <input @oncustompaste="HandleCustomPaste" />
</label>

<p>
    @message
</p>

@code {
    private string? message;

    private void HandleCustomPaste(CustomPasteEventArgs eventArgs)
    {
        message = $"At {eventArgs.EventTimestamp.ToShortTimeString()}, " +
            $"you pasted: {eventArgs.PastedData}";
    }
}
```

## Lambda expressions

Lambda expressions are supported as the delegate event handler.

`EventHandler4.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/EventHandler4.razor._
It's often convenient to close over additional values using C# method parameters, such as when iterating over a set of elements. The following example creates three buttons, each of which calls `UpdateHeading` and passes the following data:

* An event argument (`Microsoft.AspNetCore.Components.Web.MouseEventArgs`) in `e`.
* The button number in `buttonNumber`.

`EventHandler5.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/EventHandler5.razor._
Creating a large number of event delegates in a loop may cause poor rendering performance. For more information, see ASP.NET Core Blazor rendering performance best practices.

Avoid using a loop variable directly in a lambda expression, such as `i` in the preceding `for` loop example. Otherwise, the same variable is used by all lambda expressions, which results in use of the same value in all lambdas. Capture the variable's value in a local variable. In the preceding example:

* The loop variable `i` is assigned to `buttonNumber`.
* `buttonNumber` is used in the lambda expression.

Alternatively, use a `foreach` loop with `System.Linq.Enumerable.Range*`, which doesn't suffer from the preceding problem:

```razor
@foreach (var buttonNumber in Enumerable.Range(1, 3))
{
    <p>
        <button @onclick="@(e => UpdateHeading(e, buttonNumber))">
            Button #@buttonNumber
        </button>
    </p>
}
```
