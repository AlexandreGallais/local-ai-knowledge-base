---
title: "Threat mitigation guidance for ASP.NET Core Blazor interactive server-side rendering (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/security/interactive-server-side-rendering.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Threat mitigation guidance for ASP.NET Core Blazor interactive server-side rendering (part 3 of 3)

## Additional security guidance

The guidance for securing ASP.NET Core apps apply to server-side Blazor apps and are covered in the following sections of this article:

* Logging and sensitive data
* Protect information in transit with HTTPS
* Cross-site scripting (XSS)
* Cross-origin protection
* Click-jacking
* Open redirects

### Logging and sensitive data

JS interop interactions between the client and server are recorded in the server's logs with `Microsoft.Extensions.Logging.ILogger` instances. Blazor avoids logging sensitive information, such as actual events or JS interop inputs and outputs.

When an error occurs on the server, the framework notifies the client and tears down the session. The client receives a generic error message that can be seen in the browser's developer tools.

The client-side error doesn't include the call stack and doesn't provide detail on the cause of the error, but server logs do contain such information. For development purposes, sensitive error information can be made available to the client by enabling detailed errors.

> **Warning:**
> Exposing error information to clients on the Internet is a security risk that should always be avoided.

### Protect information in transit with HTTPS

Blazor uses SignalR for communication between the client and the server. Blazor normally uses the transport that SignalR negotiates, which is typically WebSockets.

Blazor doesn't ensure the integrity and confidentiality of the data sent between the server and the client. Always use HTTPS.

### Cross-site scripting (XSS)

Cross-site scripting (XSS) allows an unauthorized party to execute arbitrary logic in the context of the browser. A compromised app could potentially run arbitrary code on the client. The vulnerability could be used to potentially perform a number of malicious actions against the server:

* Dispatch fake/invalid events to the server.
* Dispatch fail/invalid render completions.
* Avoid dispatching render completions.
* Dispatch interop calls from JavaScript to .NET.
* Modify the response of interop calls from .NET to JavaScript.
* Avoid dispatching .NET to JS interop results.

The Blazor framework takes steps to protect against some of the preceding threats:

* Stops producing new UI updates if the client isn't acknowledging render batches. Configured with `Microsoft.AspNetCore.Components.Server.CircuitOptions.MaxBufferedUnacknowledgedRenderBatches`.
* Times out any .NET to JavaScript call after one minute without receiving a response from the client. Configured with `Microsoft.AspNetCore.Components.Server.CircuitOptions.JSInteropDefaultCallTimeout`.
* Performs basic <example-value> on all input coming from the browser during JS interop:
  * .NET references are valid and of the type expected by the .NET method.
  * The data isn't malformed.
  * The correct number of arguments for the method are present in the payload.
  * The arguments or result can be deserialized correctly before invoking the method.
* Performs basic <example-value> in all input coming from the browser from dispatched events:
  * The event has a valid type.
  * The data for the event can be deserialized.
  * There's an event handler associated with the event.

In addition to the safeguards that the framework implements, the app must be coded by the developer to safeguard against threats and take appropriate actions:

* Always validate data when handling events.
* Take appropriate action upon receiving invalid data:
  * Ignore the data and return. This allows the app to continue processing requests.
  * If the app determines that the input is illegitimate and couldn't be produced by legitimate client, throw an exception. Throwing an exception tears down the circuit and ends the session.
* Don't trust the error message provided by render batch completions included in the logs. The error is ***provided by the client*** and can't generally be trusted, as the client might be compromised.
* Don't trust the input on JS interop calls in either direction between JavaScript and .NET methods.
* The app is responsible for validating that the content of arguments and results are valid, even if the arguments or results are correctly deserialized.

For a XSS vulnerability to exist, the app must incorporate user input in the rendered page. Blazor executes a compile-time step where the markup in a `.razor` file is transformed into procedural C# logic. At runtime, the C# logic builds a *render tree* describing the elements, text, and child components. This is applied to the browser's DOM via a sequence of JavaScript instructions (or is serialized to HTML in the case of prerendering):

* User input rendered via normal Razor syntax (for example, `@someStringValue`) doesn't expose a XSS vulnerability because the Razor syntax is added to the DOM via commands that can only write text. Even if the value includes HTML markup, the value is displayed as static text. When prerendering, the output is HTML-encoded, which also displays the content as static text.
* Component authors can author components in C# without using Razor. The component author is responsible for using the correct APIs when emitting output. For example, use `builder.AddContent(0, someUserSuppliedString)` and *not* `builder.AddMarkupContent(0, someUserSuppliedString)`, as the latter could create a XSS vulnerability.

Consider further mitigating XSS vulnerabilities. For example, implement a restrictive Content Security Policy (CSP). For more information, see Enforce a Content Security Policy for ASP.NET Core Blazor and MDN's CSP guide.

For more information, see Prevent Cross-Site Scripting (XSS) in ASP.NET Core.

### Cross-origin protection

Cross-origin attacks involve a client from a different origin performing an action against the server. The malicious action is typically a GET request or a form POST (Cross-Site Request Forgery, CSRF), but opening a malicious WebSocket is also possible. Blazor apps offer the same guarantees that any other SignalR app using the hub protocol offer:

* Apps can be accessed cross-origin unless additional measures are taken to prevent it. To disable cross-origin access, either disable CORS in the endpoint by adding the CORS middleware to the pipeline and adding the `Microsoft.AspNetCore.Cors.DisableCorsAttribute` to the Blazor endpoint metadata or limit the set of allowed origins by configuring SignalR for Cross-Origin Resource Sharing. For guidance on WebSocket origin restrictions, see WebSockets support in ASP.NET Core.
* If CORS is enabled, extra steps might be required to protect the app depending on the CORS configuration. If CORS is globally enabled, CORS can be disabled for the Blazor SignalR hub by adding the `Microsoft.AspNetCore.Cors.DisableCorsAttribute` metadata to the endpoint metadata after calling `Microsoft.AspNetCore.Builder.ComponentEndpointRouteBuilderExtensions.MapBlazorHub*` on the endpoint route builder.

For more information, see Prevent Cross-Site Request Forgery (XSRF/CSRF) attacks in ASP.NET Core.

### Click-jacking

Click-jacking involves rendering a site as an `` inside a site from a different origin in order to trick the user into performing actions on the site under attack.

To protect an app from rendering inside of an ``, use Content Security Policy (CSP) and the `X-Frame-Options` header. For CSP syntax, see MDN's CSP guide.

For more information, see the following resources:

* Enforce a Content Security Policy for ASP.NET Core Blazor
* MDN web docs: X-Frame-Options

### Open redirects

When an app session starts, the server performs basic <example-value> of the URLs sent as part of starting the session. The framework checks that the base URL is a parent of the current URL before establishing the circuit. No additional checks are performed by the framework.

When a user selects a link on the client, the URL for the link is sent to the server, which determines what action to take. For example, the app may perform a client-side navigation or indicate to the browser to go to the new location.

Components can also trigger navigation requests programmatically through the use of `Microsoft.AspNetCore.Components.NavigationManager`. In such scenarios, the app might perform a client-side navigation or indicate to the browser to go to the new location.

Components must:

* Avoid using user input as part of the navigation call arguments.
* Validate arguments to ensure that the target is allowed by the app.

Otherwise, a malicious user can force the browser to go to a cyberattacker-controlled site. In this scenario, the cyberattacker tricks the app into using some user input as part of the invocation of the `Microsoft.AspNetCore.Components.NavigationManager.NavigateTo*` method.

This advice also applies when rendering links as part of the app:

* If possible, use relative links.
* Validate that absolute link destinations are valid before including them in a page.

For more information, see Prevent open redirect attacks in ASP.NET Core.

## Security checklist

The following list of security considerations isn't comprehensive:

* Validate arguments from events.
* Validate inputs and results from JS interop calls.
* Avoid using (or validate beforehand) user input for .NET to JS interop calls.
* Prevent the client from allocating an unbound amount of memory.
  * Data within the component.
  * `Microsoft.JSInterop.DotNetObjectReference` objects returned to the client.
* Protect against multiple dispatches.
* Cancel long-running operations when the component is disposed.
* Avoid events that produce large amounts of data.
* Avoid using user input as part of calls to `Microsoft.AspNetCore.Components.NavigationManager.NavigateTo*` and validate user input for URLs against a set of allowed origins first if unavoidable.
* Don't make authorization decisions based on the state of the UI but only from component state.
* Consider using Content Security Policy (CSP) to protect against XSS attacks. For more information, see Enforce a Content Security Policy for ASP.NET Core Blazor and MDN's CSP guide.
* Consider using CSP and X-Frame-Options to protect against click-jacking.
* Ensure CORS settings are appropriate when enabling CORS or explicitly disable CORS for Blazor apps.
* Test to ensure that the server-side limits for the Blazor app provide an acceptable user experience without unacceptable levels of risk.
