---
title: "Threat mitigation guidance for ASP.NET Core Blazor interactive server-side rendering (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/security/interactive-server-side-rendering.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Threat mitigation guidance for ASP.NET Core Blazor interactive server-side rendering

This article explains how to mitigate security threats in interactive server-side Blazor.

Apps adopt a *stateful* data processing model, where the server and client maintain a long-lived relationship. The persistent state is maintained by a circuit, which can span connections that are also potentially long-lived.

When a user visits a site, the server creates a circuit in the server's memory. The circuit indicates to the browser what content to render and responds to events, such as when the user selects a button in the UI. To perform these actions, a circuit invokes JavaScript functions in the user's browser and .NET methods on the server. This two-way JavaScript-based interaction is referred to as JavaScript interop (JS interop).

Because JS interop occurs over the Internet and the client uses a remote browser, apps share most web app security concerns. This topic describes common threats to server-side Blazor apps and provides threat mitigation guidance focused on Internet-facing apps.

In constrained environments, such as inside corporate networks or intranets, some of the mitigation guidance either:

* Doesn't apply in the constrained environment.
* Isn't worth the cost to implement because the security risk is low in a constrained environment.

## Interactive Server Components with WebSocket compression enabled

Compression can expose the app to side-channel attacks against the TLS encryption of the connection, such as CRIME and BREACH attacks. These types of attacks require that the cyberattacker:

* Force a browser to issue requests with a payload the cyberattacker controls to a vulnerable site via cross-site form posting or by embedding the site inside an iframe of another site.
* Observe the length of the compressed and encrypted response over the network.

For the app to be vulnerable, it must reflect the payload from the cyberattacker in the response, for example, by writing out the path or the query string into the response. Using the length of the response, the cyberattacker can "guess" any information on the response, bypassing the encryption of the connection.

Generally speaking, Blazor apps can enable compression over the WebSocket connection with appropriate security measures:

* The app can be vulnerable when it takes content from the request (for example, the path or query string) that can be influenced by a cyberattacker and reproduces it into the HTML of the page or otherwise makes it part of the response.

* Blazor applies the following security measures automatically:

  * When compression is configured, Blazor automatically blocks embedding the app into an iframe, which blocks the initial (uncompressed) response from the server from rendering and precludes the WebSocket connection from ever starting.

  * The restriction on embedding the app into an iframe can be relaxed. However, relaxing the restriction exposes the app to attack if the embedding document becomes compromised via a cross-site scripting vulnerability, as that gives the cyberattacker a way to execute the attack.

* Normally for this type of attack to take place, the app must repeatedly reproduce the content in the responses so that the cyberattacker can guess the response. Given how Blazor renders (it renders once and then produces diffs of the content only for the elements that changed) this is hard for a cyberattacker to accomplish. However, it isn't impossible for a cyberattacker, so care must be taken to avoid rendering sensitive information alongside external information that can be manipulated by a cyberattacker. Some examples of this are:

  * Render Personally Identifiable Information (PII) on the page at the same time as rendering database data that was added by another user.

  * Rendering PII information on to the page at the same time as data coming from another user via JS interop or a local singleton service on the server.

In general, we recommend that you avoid rendering components that contain sensitive information alongside components that can render data from untrusted sources as part of the same render batch. Untrusted sources include route parameters, query strings, data from JS interop, and any other source of data that a third-party user can control (databases, external services).

## Shared state

Server-side Blazor apps live in server memory, and multiple app sessions are hosted within the same process. For each app session, Blazor starts a circuit with its own dependency injection container scope, thus scoped services are unique per Blazor session.

> **Warning:**
> We don't recommend apps on the same server share state using singleton services unless extreme care is taken, as this can introduce security vulnerabilities, such as leaking user state across circuits.

You can use stateful singleton services in Blazor apps if they're specifically designed for it. For example, use of a singleton memory cache is acceptable because a memory cache requires a key to access a given entry. Assuming users don't have control over the cache keys that are used with the cache, state stored in the cache doesn't leak across circuits.

For general guidance on state management, see ASP.NET Core Blazor state management overview.

## `IHttpContextAccessor`/`HttpContext`

For more information, see IHttpContextAccessor/HttpContext in ASP.NET Core Blazor apps.

## Resource exhaustion

Resource exhaustion can occur when a client interacts with the server and causes the server to consume excessive resources. Excessive resource consumption primarily affects:

* CPU
* Memory
* Client connections

Denial of Service (DoS) attacks usually seek to exhaust an app or server's resources. However, resource exhaustion isn't necessarily the result of an attack on the system. For example, finite resources can be exhausted due to high user demand. DoS is covered further in the DoS section.

Resources external to the Blazor framework, such as databases and file handles (used to read and write files), may also experience resource exhaustion. For more information, see ASP.NET Core Best Practices.

### CPU

CPU exhaustion can occur when one or more clients force the server to perform intensive CPU work.

For example, consider an app that calculates a *Fibonnacci number*. A Fibonnacci number is produced from a Fibonnacci sequence, where each number in the sequence is the sum of the two preceding numbers. The amount of work required to reach the answer depends on the length of the sequence and the size of the initial value. If the app doesn't place limits on a client's request, the CPU-intensive calculations may dominate the CPU's time and diminish the performance of other tasks. Excessive resource consumption is a security concern impacting availability.

CPU exhaustion is a concern for all public-facing apps. In regular web apps, requests and connections time out as a safeguard, but Blazor apps don't provide the same safeguards. Blazor apps must include appropriate checks and limits before performing potentially CPU-intensive work.

### Memory

Memory exhaustion can occur when one or more clients force the server to consume a large amount of memory.

For example, consider an app with a component that accepts and displays a list of items. If the Blazor app doesn't place limits on the number of items allowed or the number of items rendered back to the client, the memory-intensive processing and rendering may dominate the server's memory to the point where performance of the server suffers. The server may crash or slow to the point that it appears to have crashed.

Consider the following scenario for maintaining and displaying a list of items that pertain to a potential memory exhaustion scenario on the server:

* The items in a `List<T>` property or field use the server's memory. If the app allows the list of items to grow unbounded, there's a risk of the server running out of memory. Running out of memory causes the current session to end (crash) and all of the concurrent sessions in that server instance receive an out-of-memory exception. To prevent this scenario from occurring, the app must use a data structure that imposes an item limit on concurrent users.
* If a paging scheme isn't used for rendering, the server uses additional memory for objects that aren't visible in the UI. Without a limit on the number of items, memory demands may exhaust the available server memory. To prevent this scenario, use one of the following approaches:
  * Use paginated lists when rendering.
  * Only display the first 100 to 1,000 items and require the user to enter search criteria to find items beyond the items displayed.
  * For a more advanced rendering scenario, implement lists or grids that support *virtualization*. Using virtualization, lists only render a subset of items currently visible to the user. When the user interacts with the scrollbar in the UI, the component renders only those items required for display. The items that aren't currently required for display can be held in secondary storage, which is the ideal approach. Undisplayed items can also be held in memory, which is less ideal.

> **Note:**
> Blazor has built-in support for virtualization. For more information, see ASP.NET Core Razor component virtualization.

Blazor apps offer a similar programming model to other UI frameworks for stateful apps, such as WPF, Windows Forms, or Blazor WebAssembly. The main difference is that in several of the UI frameworks the memory consumed by the app belongs to the client and only affects that individual client. For example, a Blazor WebAssembly app runs entirely on the client and only uses client memory resources. For a server-side Blazor app, the memory consumed by the app belongs to the server and is shared among clients on the server instance.

Server-side memory demands are a consideration for all server-side Blazor apps. However, most web apps are stateless, and the memory used while processing a request is released when the response is returned. As a general recommendation, don't permit clients to allocate an unbound amount of memory as in any other server-side app that persists client connections. The memory consumed by a server-side Blazor app persists for a longer time than a single request.

> **Note:**
> During development, a profiler can be used or a trace captured to assess memory demands of clients. A profiler or trace won't capture the memory allocated to a specific client. To capture the memory use of a specific client during development, capture a dump and examine the memory demand of all the objects rooted at a user's circuit.

### Client connections

Connection exhaustion can occur when one or more clients open too many concurrent connections to the server, preventing other clients from establishing new connections.

Blazor clients establish a single connection per session and keep the connection open for as long as the browser window is open. Given the persistent nature of the connections and the stateful nature of server-side Blazor apps, connection exhaustion is a greater risk to availability of the app.

There's no limit on the number of connections per user for an app. If the app requires a connection limit, take one or more of the following approaches:

* Require authentication, which naturally limits the ability of unauthorized users to connect to the app. For this scenario to be effective, users must be prevented from provisioning new users on demand.
* Limit the number of connections per user. Limiting connections can be accomplished via the following approaches. Exercise care to allow legitimate users to access the app (for example, when a connection limit is established based on the client's IP address).
  * Application level
    * Endpoint routing extensibility.
    * Require authentication to connect to the app and keep track of the active sessions per user.
    * Reject new sessions upon reaching a limit.
    * Proxy WebSocket connections to an app through the use of a proxy, such as the Azure SignalR Service that multiplexes connections from clients to an app. This provides an app with greater connection capacity than a single client can establish, preventing a client from exhausting the connections to the server.
  * Server level: Use a proxy/gateway in front of the app.
    * Azure Application Gateway is a web traffic (OSI layer 7) load balancer that enables you to manage traffic to your web applications. For more information, see Overview of WebSocket support in Application Gateway.
    * Azure Front Door is a load-balancing service for distributing your workloads across multiple computing resources.

## Denial of Service (DoS) attacks

Denial of Service (DoS) attacks involve a client causing the server to exhaust one or more of its resources making the app unavailable. Blazor apps include default limits and rely on other ASP.NET Core and SignalR limits that are set on `Microsoft.AspNetCore.Components.Server.CircuitOptions` to protect against DoS attacks:

* `Microsoft.AspNetCore.Components.Server.CircuitOptions.DisconnectedCircuitMaxRetained`
* `Microsoft.AspNetCore.Components.Server.CircuitOptions.DisconnectedCircuitRetentionPeriod`
* `Microsoft.AspNetCore.Components.Server.CircuitOptions.JSInteropDefaultCallTimeout`
* `Microsoft.AspNetCore.Components.Server.CircuitOptions.MaxBufferedUnacknowledgedRenderBatches`
* `Microsoft.AspNetCore.SignalR.HubConnectionContextOptions.MaximumReceiveMessageSize`

For more information and configuration coding examples, see the following articles:

* ASP.NET Core Blazor SignalR guidance
* ASP.NET Core SignalR configuration
