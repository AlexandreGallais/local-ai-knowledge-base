---
title: "ASP.NET Core SignalR JavaScript client (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/signalr/javascript-client.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core SignalR JavaScript client (part 2 of 2)

## Reconnect clients

To reconnect with clients, you can set up automatic reconnection or configure the connection manually.

### Automatically reconnect

The JavaScript client for SignalR can be configured to automatically reconnect by using the WithAutomaticReconnect method on HubConnectionBuilder. It doesn't automatically reconnect by default.

```javascript
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chathub")
    .withAutomaticReconnect()
    .build();
```

Without any parameters, WithAutomaticReconnect configures the client to wait 0, 2, 10, and 30 seconds respectively before trying each reconnect attempt. After four failed attempts, it stops trying to reconnect.

Before starting any reconnection, the `HubConnection`:

* Transitions to the HubConnectionState.Reconnecting state and fires its `onreconnecting` callbacks.
* Doesn't transition to the `Disconnected` state or trigger its `onclose` callbacks like a `HubConnection` without automatic reconnect configured.

The reconnection approach provides an opportunity to warn users that the connection is lost and to disable UI elements.

```javascript
connection.onreconnecting(error => {
    console.assert(connection.state === signalR.HubConnectionState.Reconnecting);

    document.getElementById("messageInput").disabled = true;

    const li = document.createElement("li");
    li.textContent = `Connection lost due to error "${error}". Reconnecting.`;
    document.getElementById("messageList").appendChild(li);
});
```

If the client successfully reconnects within its first four attempts, the `HubConnection` transitions back to the `Connected` state and fires its `onreconnected` callbacks. This approach provides an opportunity to inform users the connection is now reestablished.

Because the connection looks entirely new to the server, a new `connectionId` is provided to the `onreconnected` callback.

The `onreconnected` callback's `connectionId` parameter is ***undefined*** if the `HubConnection` is configured to skip negotiation.

```javascript
connection.onreconnected(connectionId => {
    console.assert(connection.state === signalR.HubConnectionState.Connected);

    document.getElementById("messageInput").disabled = false;

    const li = document.createElement("li");
    li.textContent = `Connection reestablished. Connected with connectionId "${connectionId}".`;
    document.getElementById("messageList").appendChild(li);
});
```

`withAutomaticReconnect` doesn't configure the `HubConnection` to retry initial start failures, so start failures need to be handled manually:

```javascript
async function start() {
    try {
        await connection.start();
        console.assert(connection.state === signalR.HubConnectionState.Connected);
        console.log("SignalR Connected.");
    } catch (err) {
        console.assert(connection.state === signalR.HubConnectionState.Disconnected);
        console.log(err);
        setTimeout(() => start(), 5000);
    }
};
```

If the client doesn't successfully reconnect within its first four attempts, the `HubConnection` transitions to the `Disconnected` state and fires its onclose callbacks. This approach provides an opportunity to inform users that the connection is permanently lost and to try refreshing the page:

```javascript
connection.onclose(error => {
    console.assert(connection.state === signalR.HubConnectionState.Disconnected);

    document.getElementById("messageInput").disabled = true;

    const li = document.createElement("li");
    li.textContent = `Connection closed due to error "${error}". Try refreshing this page to restart the connection.`;
    document.getElementById("messageList").appendChild(li);
});
```

To configure a custom number of reconnect attempts before disconnecting or change the reconnection timing, `withAutomaticReconnect` accepts an array of numbers representing the delay in milliseconds to wait before starting each reconnect attempt.

```javascript
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chathub")
    .withAutomaticReconnect([0, 0, 10000])
    .build();

    // .withAutomaticReconnect([0, 2000, 10000, 30000]) yields the default behavior
```

The preceding example configures the `HubConnection` to start attempting reconnects immediately after the connection is lost. The default configuration also waits zero (0) seconds to attempt reconnecting.

- If the first reconnect attempt fails, the second reconnect attempt also starts immediately instead of waiting 2 seconds as defined in the default configuration.

- If the second reconnect attempt fails, the third reconnect attempt starts in 10 seconds, which is the same behavior defined in the default configuration.

- The configured reconnection timing differs from the default behavior by stopping after the third reconnect attempt failure. In the default configuration, one more reconnect attempt is made after another 30 seconds.

For more control over the timing and number of automatic reconnect attempts, `withAutomaticReconnect` accepts an object implementing the `IRetryPolicy` interface, which has a single method named `nextRetryDelayInMilliseconds`. `nextRetryDelayInMilliseconds` takes a single argument with the type `RetryContext`. The `RetryContext` has three properties: `previousRetryCount` (type `number`), `elapsedMilliseconds` (type `number`), and `retryReason` (type `Error`).

- Before the first reconnect attempt, `previousRetryCount` and `elapsedMilliseconds` are both zero (0), and `retryReason` is the Error that caused the lost connection.

- After each failed retry attempt, `previousRetryCount` increments by one, `elapsedMilliseconds` updates to reflect the amount of time spent reconnecting so far in milliseconds, and `retryReason` is the Error that caused the last reconnect attempt to fail.

`nextRetryDelayInMilliseconds` must return either a number representing the number of milliseconds to wait before the next reconnect attempt or `null` if the `HubConnection` should stop reconnecting.

```javascript
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chathub")
    .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: retryContext => {
            if (retryContext.elapsedMilliseconds < 60000) {
                // If we've been reconnecting for less than 60 seconds so far,
                // wait between 0 and 10 seconds before the next reconnect attempt.
                return Math.random() * 10000;
            } else {
                // If we've been reconnecting for more than 60 seconds so far, stop reconnecting.
                return null;
            }
        }
    })
    .build();
```

Alternatively, you can write code to reconnect the client manually, as demonstrated in the next section.

### Manually reconnect

The following code demonstrates a typical manual reconnection approach:

1. To start the connection, create a function. In this case, the `start` function.

1. Call the `start` function in the connection's `onclose` event handler.

```javascript
async function start() {
    try {
        await connection.start();
        console.log("SignalR Connected.");
    } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
    }
};

connection.onclose(async () => {
    await start();
});
```

Production implementations typically use an exponential back-off or retry a specified number of times.

<h2 id="bsleep">Browser sleeping tab</h2>

Some browsers have a *tab freezing* or *tab sleeping* feature that reduces computer resource usage for inactive tabs. However, this functionality can cause SignalR connections to close and cause an undesirable user experience.

Browsers implement heuristics to determine if a tab should be put to sleep, such as:

* Playing audio
* Holding a web lock
* Holding an `IndexedDB` lock
* Being connected to a USB device
* Capturing video or audio
* Being mirrored
* Capturing a window or display

Heuristics can change over time and also differ across browsers. Check the support matrix and figure out what method works best for your scenarios.

To avoid putting an app to sleep, the app should trigger one of the heuristics that the browser uses.

The following code example shows how to use a Web Lock to keep a tab awake and avoid an unexpected connection closure:

```javascript
var lockResolver;
if (navigator && navigator.locks && navigator.locks.request) {
    const promise = new Promise((res) => {
        lockResolver = res;
    });
    
    navigator.locks.request('unique_lock_name', { mode: "shared" }, () => {
        return promise;
    });
}
```

In the preceding code:

* Web Locks are experimental. The conditional check confirms the browser supports Web Locks.
* The JavaScript promise resolver (`lockResolver`) is stored so the lock can be released when it's acceptable for the tab to sleep.
* When the connection is closing, the lock is released by calling `lockResolver()`. When the lock is released, the tab is allowed to sleep.

## Refresh authentication without reconnecting

In .NET 11 and later, a client can replace the credentials on an open connection instead of letting the connection close when its access token expires. The server must enable authentication refresh for the hub. Call `withAuthenticationRefresh` to schedule an automatic refresh ahead of the expiration that the server reports:

```javascript
const connection = new signalR.HubConnectionBuilder()
    .withUrl("<example-value>", { accessTokenFactory: () => getAccessToken() })
    .withAuthenticationRefresh()
    .build();
```

Each refresh calls `accessTokenFactory` again to obtain a new token. To refresh immediately, for example after the app obtains updated claims, call `connection.refreshAuthentication()`.

For the refresh options, the success and failure handlers, and the server configuration that enables the feature, see SignalR authentication and authorization.

## Related content

* JavaScript tutorial
* WebPack and TypeScript tutorial
* Hubs
* Azure SignalR Service serverless documentation
* Troubleshoot connection errors
