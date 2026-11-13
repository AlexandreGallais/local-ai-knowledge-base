---
title: "ASP.NET Core Blazor Progressive Web Application (PWA) (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/progressive-web-app/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor Progressive Web Application (PWA) (part 3 of 3)

## Caveats for offline PWAs

Not all apps should attempt to support offline use. Offline support adds significant complexity, while not always being relevant for the use cases required.

Offline support is usually relevant only:

* If the primary data store is local to the browser. For example, the approach is relevant in an app with a UI for an IoT device that stores data in `localStorage` or IndexedDB.
* If the app performs a significant amount of work to fetch and cache the backend API data relevant to each user so that they can navigate through the data offline. If the app must support editing, a system for tracking changes and synchronizing data with the backend must be built.
* If the goal is to guarantee that the app loads immediately regardless of network conditions. Implement a suitable user experience around backend API requests to show the progress of requests and behave gracefully when requests fail due to network unavailability.

Additionally, offline-capable PWAs must deal with a range of additional complications. Developers should carefully familiarize themselves with the caveats in the following sections.

### Offline support only when published

During development you typically want to see each change reflected immediately in the browser without going through a background update process. Therefore, Blazor's PWA template enables offline support only when published.

When building an offline-capable app, it's not enough to test the app in the `Development` environment. You must test the app in its published state to understand how it responds to different network conditions.

### Update completion after user navigation away from app

Updates don't complete until the user has navigated away from the app in all tabs. As explained in the Background updates section, after you deploy an update to the app, the browser fetches the updated service worker files to begin the update process.

What surprises many developers is that, even when this update completes, it doesn't take effect until the user has navigated away in all tabs. It isn't sufficient to refresh the tab displaying the app, even if it's the only tab displaying the app. Until your app is completely closed, the new service worker remains in the *waiting to activate* status. This isn't specific to Blazor, but rather is a standard web platform behavior.

This commonly troubles developers who are trying to test updates to their service worker or offline cached resources. If you check in the browser's developer tools, you may see something like the following:

For as long as the list of "clients," which are tabs or windows displaying your app, is nonempty, the worker continues waiting. The reason service workers do this is to guarantee consistency. Consistency means that all resources are fetched from the same atomic cache.

When testing changes, you may find it convenient to select the "skipWaiting" link as shown in the preceding screenshot, then reload the page. You can automate this for all users by coding your service worker to skip the "waiting" phase and immediately activate on update. If you skip the waiting phase, you're giving up the guarantee that resources are always fetched consistently from the same cache instance.

### Users may run any historical version of the app

Web developers habitually expect that users only run the latest deployed version of their web app, since that's normal within the traditional web distribution model. However, an offline-first PWA is more akin to a native mobile app, where users aren't necessarily running the latest version.

As explained in the Background updates section, after you deploy an update to your app, each existing user continues to use a previous version for at least one further visit because the update occurs in the background and isn't activated until the user thereafter navigates away. Plus, the previous version being used isn't necessarily the previous one you deployed. The previous version can be *any* historical version, depending on when the user last completed an update.

This can be an issue if the frontend and backend parts of your app require agreement about the schema for API requests. You must not deploy backward-incompatible API schema changes until you can be sure that all users have upgraded. Alternatively, block users from using incompatible older versions of the app. This scenario requirement is the same as for native mobile apps. If you deploy a breaking change in server APIs, the client app is broken for users who haven't yet updated.

If possible, don't deploy breaking changes to your backend APIs. If you must do so, consider using standard Service Worker APIs such as ServiceWorkerRegistration to determine whether the app is up-to-date, and if not, to prevent usage.

### Interference with server-rendered pages

As described in the Support server-rendered pages section, if you want to bypass the service worker's behavior of returning `/index.html` contents for all navigation requests, edit the logic in your service worker.

### All service worker asset manifest contents are cached

As described in the Control asset caching section, the file `service-worker-assets.js` is generated during build and lists all assets the service worker should fetch and cache.

Since this list includes everything emitted to `wwwroot`, including content supplied by external packages and projects, you must be careful not to put too much content there. If the `wwwroot` directory contains millions of images, the service worker tries to fetch and cache them all, consuming excessive bandwidth and most likely not completing successfully.

Implement arbitrary logic to control which subset of the manifest's contents should be fetched and cached by editing the `onInstall` function in `service-worker.published.js`.

### Interaction with authentication

The PWA template can be used in conjunction with authentication. An offline-capable PWA can also support authentication when the user has initial network connectivity.

When a user doesn'<example-value>'t authenticate or obtain access tokens. Attempting to visit the login page without network access results in a "<example-value>" message. You must design a UI flow that allows the user perform useful tasks while offline without attempting to authenticate the user or obtain access tokens. Alternatively, you can design the app to gracefully fail when the network isn'<example-value>'t be designed to handle these scenarios, you might not want to enable offline support.

When an app that's designed for online and offline use is online again:

* The app might need to provision a new access token.
* The app must detect if a different user is signed into the service so that it can apply operations to the user's account that were made while they were offline.

To create an offline PWA app that interacts with authentication:

* Replace the `Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccountClaimsPrincipalFactory`1` with a factory that stores the last signed-in user and uses the stored user when the app is offline.
* Enqueue operations while the app is offline and apply them when the app returns online.
* During sign out, clear the stored user.

The `CarChecker` sample app demonstrates the preceding approaches. See the following parts of the app:

* `OfflineAccountClaimsPrincipalFactory` (`Client/Data/OfflineAccountClaimsPrincipalFactory.cs`)
* `LocalVehiclesStore` (`Client/Data/LocalVehiclesStore.cs`)
* `LoginStatus` component (`Client/Shared/LoginStatus.razor`)

## Related content

Client-side SignalR cross-origin negotiation for authentication
