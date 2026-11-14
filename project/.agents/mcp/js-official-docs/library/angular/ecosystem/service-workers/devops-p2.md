---
title: "Service worker devops (part 2 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/ecosystem/service-workers/devops.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Service worker devops (part 2 of 2)

## Debugging the Angular service worker

Occasionally, it might be necessary to examine the Angular service worker in a running state to investigate issues or whether it's operating as designed.
Browsers provide built-in tools for debugging service workers and the Angular service worker itself includes useful debugging features.

### Locating and analyzing debugging information

The Angular service worker exposes debugging information under the `ngsw/` virtual directory.
Currently, the single exposed URL is `ngsw/state`.
Here is an example of this debug page's contents:

```shell

NGSW Debug Info:

Driver version: 13.3.7
Driver state: NORMAL ((nominal))
Latest manifest hash: eea7f5f464f90789b621170af5a569d6be077e5c
Last update check: never

=== Version eea7f5f464f90789b621170af5a569d6be077e5c ===

Clients: 7b79a015-69af-4d3d-9ae6-95ba90c79486, 5bc08295-aaf2-42f3-a4cc-9e4ef9100f65

=== Idle Task Queue ===
Last update tick: 1s496u
Last update run: never
Task queue:

- init post-load (update, cleanup)

Debug log:

```

#### Driver state

The first line indicates the driver state:

```shell

Driver state: NORMAL ((nominal))

```

`NORMAL` indicates that the service worker is operating normally and is not in a degraded state.

There are two possible degraded states:

| Degraded states         | Details                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :---------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `EXISTING_CLIENTS_ONLY` | The service worker does not have a clean copy of the latest known version of the application. Older cached versions are safe to use, so existing tabs continue to run from cache, but new loads of the application will be served from the network. The service worker will try to recover from this state when a new version of the application is detected and installed. This happens when a new `ngsw.json` is available. |
| `SAFE_MODE`             | The service worker cannot guarantee the safety of using cached data. Either an unexpected error occurred or all cached versions are invalid. All traffic will be served from the network, running as little service worker code as possible.                                                                                                                                                                                  |

In both cases, the parenthetical annotation provides the
error that caused the service worker to enter the degraded state.

Both states are temporary; they are saved only for the lifetime of the ServiceWorker instance.
The browser sometimes terminates an idle service worker to conserve memory and processor power, and creates a new service worker instance in response to network events.
The new instance starts in the `NORMAL` mode, regardless of the state of the previous instance.

#### Latest manifest hash

```shell

Latest manifest hash: eea7f5f464f90789b621170af5a569d6be077e5c

```

This is the SHA1 hash of the most up-to-date version of the application that the service worker knows about.

#### Last update check

```shell

Last update check: never

```

This indicates the last time the service worker checked for a new version, or update, of the application.
`never` indicates that the service worker has never checked for an update.

In this example debug file, the update check is currently scheduled, as explained the next section.

#### Version

```shell

=== Version eea7f5f464f90789b621170af5a569d6be077e5c ===

Clients: 7b79a015-69af-4d3d-9ae6-95ba90c79486, 5bc08295-aaf2-42f3-a4cc-9e4ef9100f65

```

In this example, the service worker has one version of the application cached and being used to serve two different tabs.

HELPFUL: This version hash is the "latest manifest hash" listed above. Both clients are on the latest version. Each client is listed by its ID from the `Clients` API in the browser.

#### Idle task queue

```shell

=== Idle Task Queue ===
Last update tick: 1s496u
Last update run: never
Task queue:

- init post-load (update, cleanup)

```

The Idle Task Queue is the queue of all pending tasks that happen in the background in the service worker.
If there are any tasks in the queue, they are listed with a description.
In this example, the service worker has one such task scheduled, a post-initialization operation involving an update check and cleanup of stale caches.

The last update tick/run counters give the time since specific events happened related to the idle queue.
The "Last update run" counter shows the last time idle tasks were actually executed.
"Last update tick" shows the time since the last event after which the queue might be processed.

#### Debug log

```shell

Debug log:

```

Errors that occur within the service worker are logged here.

### Developer tools

Browsers such as Chrome provide developer tools for interacting with service workers.
Such tools can be powerful when used properly, but there are a few things to keep in mind.

- When using developer tools, the service worker is kept running in the background and never restarts.
  This can cause behavior with Dev Tools open to differ from behavior a user might experience.

- If you look in the Cache Storage viewer, the cache is frequently out of date.
  Right-click the Cache Storage title and refresh the caches.

- Stopping and starting the service worker in the Service Worker pane checks for updates

## Service worker safety

Bugs or broken configurations could cause the Angular service worker to act in unexpected ways.
If this happens, the Angular service worker contains several failsafe mechanisms in case an administrator needs to deactivate the service worker quickly.

### Fail-safe

To deactivate the service worker, rename the `ngsw.json` file or delete it.
When the service worker's request for `ngsw.json` returns a `404`, then the service worker removes all its caches and de-registers itself, essentially self-destructing.

### Safety worker

A small script, `safety-worker.js`, is also included in the `@angular/service-worker` npm package.
When loaded, it un-registers itself from the browser and removes the service worker caches.
This script can be used as a last resort to get rid of unwanted service workers already installed on client pages.

CRITICAL: You cannot register this worker directly, as old clients with cached state might not see a new `index.html` which installs the different worker script.

Instead, you must serve the contents of `safety-worker.js` at the URL of the Service Worker script you are trying to unregister. You must continue to do so until you are certain all users have successfully unregistered the old worker.
For most sites, this means that you should serve the safety worker at the old Service Worker URL forever.
This script can be used to deactivate `@angular/service-worker` and remove the corresponding caches. It also removes any other Service Workers which might have been served in the past on your site.

### Changing your application's location

IMPORTANT: Service workers don't work behind redirect.
You might have already encountered the error `The script resource is behind a redirect, which is disallowed`.

This can be a problem if you have to change your application's location.
If you set up a redirect from the old location, such as `example.com`, to the new location, `www.example.com` in this example, the worker stops working.
Also, the redirect won't even trigger for users who are loading the site entirely from Service Worker.
The old worker, which was registered at `example.com`, tries to update and sends a request to the old location `example.com`. This request is redirected to the new location `www.example.com` and creates the error: `The script resource is behind a redirect, which is disallowed`.

To remedy this, you might need to deactivate the old worker using one of the preceding techniques: Fail-safe or Safety Worker.

## More on Angular service workers

You might also be interested in the following:

  - Configuration file
  - Communicating with the Service Worker
