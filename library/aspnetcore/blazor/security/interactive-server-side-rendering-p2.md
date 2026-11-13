---
title: "Threat mitigation guidance for ASP.NET Core Blazor interactive server-side rendering (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/interactive-server-side-rendering.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Threat mitigation guidance for ASP.NET Core Blazor interactive server-side rendering (part 2 of 3)

## Interactions with the browser (client)

A client interacts with the server through JS interop event dispatching and render completion. JS interop communication goes both ways between JavaScript and .NET:

* Browser events are dispatched from the client to the server in an asynchronous fashion.
* The server responds asynchronously rerendering the UI as necessary.

### JavaScript functions invoked from .NET

For calls from .NET methods to JavaScript:

* All invocations have a configurable timeout after which they fail, returning a `System.OperationCanceledException` to the caller.
  * There's a default timeout for the calls (`Microsoft.AspNetCore.Components.Server.CircuitOptions.JSInteropDefaultCallTimeout`) of one minute. To configure this limit, see Call JavaScript functions from .NET methods in ASP.NET Core Blazor.
  * A cancellation token can be provided to control the cancellation on a per-call basis. Rely on the default call timeout where possible and time-bound any call to the client if a cancellation token is provided.
* The result of a JavaScript call can't be trusted. The Blazor app client running in the browser searches for the JavaScript function to invoke. The function is invoked, and either the result or an error is produced. A malicious client can attempt to:
  * Cause an issue in the app by returning an error from the JavaScript function.
  * Induce an unintended behavior on the server by returning an unexpected result from the JavaScript function.

Take the following precautions to protect against the preceding scenarios:

* Wrap JS interop calls within `try-catch` statements to account for errors that might occur during the invocations. For more information, see Handle errors in ASP.NET Core Blazor apps.
* Validate data returned from JS interop invocations, including error messages, before taking any action.

### .NET methods invoked from the browser

Don't trust calls from JavaScript to .NET methods. When a .NET method is exposed to JavaScript, consider how the .NET method is invoked:

* Treat any .NET method exposed to JavaScript as you would a public endpoint to the app.
  * Validate input.
    * Ensure that values are within expected ranges.
    * Ensure that the user has permission to perform the action requested.
  * Don't allocate an excessive quantity of resources as part of the .NET method invocation. For example, perform checks and place limits on CPU and memory use.
  * Take into account that static and instance methods can be exposed to JavaScript clients. Avoid sharing state across sessions unless the design calls for sharing state with appropriate constraints.
    * For instance methods exposed through `Microsoft.JSInterop.DotNetObjectReference` objects that are originally created through dependency injection (DI), the objects should be registered as scoped objects. This applies to any DI service that the app uses.
    * For static methods, avoid establishing state that can't be scoped to the client unless the app is explicitly sharing state by-design across all users on a server instance.
  * Avoid passing user-supplied data in parameters to JavaScript calls. If passing data in parameters is absolutely required, ensure that the JavaScript code handles passing the data without introducing Cross-site scripting (XSS) vulnerabilities. For example, don't write user-supplied data to the DOM by setting the `innerHTML` property of an element. Consider using Content Security Policy (CSP) to disable `eval` and other unsafe JavaScript primitives. For more information, see Enforce a Content Security Policy for ASP.NET Core Blazor and MDN's CSP guide.
* Avoid implementing custom dispatching of .NET invocations on top of the framework's dispatching implementation. Exposing .NET methods to the browser is an advanced scenario, not recommended for general Blazor development.

### Events

Events provide an entry point to an app. The same rules for safeguarding endpoints in web apps apply to event handling in Blazor apps. A malicious client can send any data it wishes to send as the payload for an event.

For example:

* A change event for a `<select>` could send a value that isn't within the options that the app presented to the client.
* An `` could send any text data to the server, bypassing client-side validation.

The app must validate the data for any event that the app handles. The Blazor framework forms components perform basic validations. If the app uses custom forms components, custom code must be written to validate event data as appropriate.

Events are asynchronous, so multiple events can be dispatched to the server before the app has time to react by producing a new render. This has some security implications to consider. Limiting client actions in the app must be performed inside event handlers and not depend on the current rendered view state.

Consider a counter component that should allow a user to increment a counter a maximum of three times. The button to increment the counter is conditionally based on the value of `count`:

```razor
<p>Count: @count</p>

@if (count < 3)
{
    <button @onclick="IncrementCount" value="Increment count" />
}

@code 
{
    private int count = 0;

    private void IncrementCount()
    {
        count++;
    }
}
```

A client can dispatch one or more increment events before the framework produces a new render of this component. The result is that the `count` can be incremented *over three times* by the user because the button isn't removed by the UI quickly enough. The correct way to achieve the limit of three `count` increments is shown in the following example:

```razor
<p>Count: @count</p>

@if (count < 3)
{
    <button @onclick="IncrementCount" value="Increment count" />
}

@code 
{
    private int count = 0;

    private void IncrementCount()
    {
        if (count < 3)
        {
            count++;
        }
    }
}
```

By adding the `if (count < 3) { ... }` check inside the handler, the decision to increment `count` is based on the current app state. The decision isn't based on the state of the UI as it was in the previous example, which might be temporarily stale.

### Protect against multiple dispatches

If an event callback invokes a long running operation asynchronously, such as fetching data from an external service or database, consider using a safeguard. The safeguard can prevent the user from enqueueing multiple operations while the operation is in progress with visual feedback. The following component code sets `isLoading` to `true` while `DataService.GetDataAsync` obtains data from the server. While `isLoading` is `true`, the button is disabled in the UI:

```razor
<button disabled="@isLoading" @onclick="UpdateData">Update</button>

@code {
    private bool isLoading;
    private Data[] data = Array.Empty<Data>();

    private async Task UpdateData()
    {
        if (!isLoading)
        {
            isLoading = true;
            data = await DataService.GetDataAsync(DateTime.Now);
            isLoading = false;
        }
    }
}
```

The safeguard pattern demonstrated in the preceding example works if the background operation is executed asynchronously with the `async`-`await` pattern.

### Cancel early and avoid use-after-dispose

In addition to using a safeguard as described in the Protect against multiple dispatches section, consider using a `System.Threading.CancellationToken` to cancel long-running operations when the component is disposed. This approach has the added benefit of avoiding *use-after-dispose* in components:

```razor
@implements IDisposable

...

@code {
    private readonly CancellationTokenSource TokenSource = 
        new CancellationTokenSource();

    private async Task UpdateData()
    {
        ...

        data = await DataService.GetDataAsync(DateTime.Now, TokenSource.Token);

        if (TokenSource.Token.IsCancellationRequested)
        {
           return;
        }

        ...
    }

    public void Dispose()
    {
        TokenSource.Cancel();
    }
}
```

### Avoid events that produce large amounts of data

Some DOM events, such as `oninput` or `onscroll`, can produce a large amount of data. Avoid using these events in server-side Blazor server.
