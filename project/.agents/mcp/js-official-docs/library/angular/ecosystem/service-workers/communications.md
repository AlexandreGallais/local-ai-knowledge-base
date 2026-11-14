---
title: "Communicating with the Service Worker"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/ecosystem/service-workers/communications.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Communicating with the Service Worker

Enabling service worker support does more than just register the service worker; it also provides services you can use to interact with the service worker and control the caching of your application.

## `SwUpdate` service

The `SwUpdate` service gives you access to events that indicate when the service worker discovers and installs an available update for your application.

The `SwUpdate` service supports three separate operations:

- Receiving notifications when an updated version is _detected_ on the server, _installed and ready_ to be used locally or when an _installation fails_.
- Asking the service worker to check the server for new updates.
- Asking the service worker to activate the latest version of the application for the current tab.

### Version updates

The `versionUpdates` is an `Observable` property of `SwUpdate` and emits four event types:

| Event types                      | Details                                                                                                                                                                     |
| :------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VersionDetectedEvent`           | Emitted when the service worker has detected a new version of the app on the server and is about to start downloading it.                                                   |
| `NoNewVersionDetectedEvent`      | Emitted when the service worker has checked the version of the app on the server and did not find a new version.                                                            |
| `VersionReadyEvent`              | Emitted when a new version of the app is available to be activated by clients. It may be used to notify the user of an available update or prompt them to refresh the page. |
| `VersionInstallationFailedEvent` | Emitted when the installation of a new version failed. It may be used for logging/monitoring purposes.                                                                      |

File: `log-update.service.ts`

```ts
@Service()
export class LogUpdateService {
  private updates = inject(SwUpdate);
  constructor() {
    this.updates.versionUpdates.subscribe((evt) => {
      switch (evt.type) {
        case 'VERSION_DETECTED':
          console.log(`Downloading new app version: ${evt.version.hash}`);
          break;
        case 'VERSION_READY':
          console.log(`Current app version: ${evt.currentVersion.hash}`);
          console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
          break;
      }
    });
  }
}
```

### Checking for updates

It's possible to ask the service worker to check if any updates have been deployed to the server.
The service worker checks for updates during initialization and on each navigation request —that is, when the user navigates from a different address to your application.
However, you might choose to manually check for updates if you have a site that changes frequently or want updates to happen on a schedule.

Do this with the `checkForUpdate()` method:

File: `check-for-update.service.ts`

```ts
import {ApplicationRef, inject, Service} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {concat, interval, first} from 'rxjs';

@Service()
export class CheckForUpdateService {
  private appRef = inject(ApplicationRef);
  private updates = inject(SwUpdate);

  constructor() {
    // Allow the app to stabilize first, before starting
    // polling for updates with `interval()`.
    const appIsStable$ = this.appRef.isStable.pipe(first((isStable) => isStable === true));
    const everySixHours$ = interval(6 * 60 * 60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

    everySixHoursOnceAppIsStable$.subscribe(async () => {
      try {
        const updateFound = await this.updates.checkForUpdate();
        console.log(updateFound ? 'A new version is available.' : 'Already on the latest version.');
      } catch (err) {
        console.error('Failed to check for updates:', err);
      }
    });
  }
}
```

This method returns a `Promise<boolean>` which indicates if an update is available for activation.
The check might fail, which will cause a rejection of the `Promise`.

**Stabilization and service worker registration**
In order to avoid negatively affecting the initial rendering of the page, by default the Angular service worker service waits for up to 30 seconds for the application to stabilize before registering the ServiceWorker script.

Constantly polling for updates, for example, with setInterval() or RxJS' interval(), prevents the application from stabilizing and the ServiceWorker script is not registered with the browser until the 30 seconds upper limit is reached.

This is true for any kind of polling done by your application.
Check the isStable documentation for more information.

Avoid that delay by waiting for the application to stabilize first, before starting to poll for updates, as shown in the preceding example.
Alternatively, you might want to define a different registration strategy for the ServiceWorker.

### Updating to the latest version

You can update an existing tab to the latest version by reloading the page as soon as a new version is ready.
To avoid disrupting the user's progress, it is generally a good idea to prompt the user and let them confirm that it is OK to reload the page and update to the latest version:

File: `prompt-update.service.ts`

```ts
@Service()
export class PromptUpdateService {
  constructor() {
    const swUpdate = inject(SwUpdate);
    swUpdate.versionUpdates
      .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
      .subscribe((evt) => {
        if (promptUser(evt)) {
          // Reload the page to update to the latest version.
          document.location.reload();
        }
      });
```

**Safety of updating without reloading**
Calling `activateUpdate()` updates a tab to the latest version without reloading the page, but this could break the application.

Updating without reloading can create a version mismatch between the application shell and other page resources, such as lazy-loaded chunks, whose filenames may change between versions.

You should only use `activateUpdate()`, if you are certain it is safe for your specific use case.

### Handling an unrecoverable state

In some cases, the version of the application used by the service worker to serve a client might be in a broken state that cannot be recovered from without a full page reload.

For example, imagine the following scenario:

1. A user opens the application for the first time and the service worker caches the latest version of the application.
   Assume the application's cached assets include `index.html`, `main..js` and `lazy-chunk.<lazy-hash-1>.js`.

1. The user closes the application and does not open it for a while.
1. After some time, a new version of the application is deployed to the server.
   This newer version includes the files `index.html`, `main..js` and `lazy-chunk.<lazy-hash-2>.js`.

IMPORTANT: The hashes are different now, because the content of the files changed. The old version is no longer available on the server.

1. In the meantime, the user's browser decides to evict `lazy-chunk.<lazy-hash-1>.js` from its cache.
   Browsers might decide to evict specific (or all) resources from a cache in order to reclaim disk space.

1. The user opens the application again.
   The service worker serves the latest version known to it at this point, namely the old version (`index.html` and `main..js`).

1. At some later point, the application requests the lazy bundle, `lazy-chunk.<lazy-hash-1>.js`.
1. The service worker is unable to find the asset in the cache (remember that the browser evicted it).
   Nor is it able to retrieve it from the server (because the server now only has `lazy-chunk.<lazy-hash-2>.js` from the newer version).

In the preceding scenario, the service worker is not able to serve an asset that would normally be cached.
That particular application version is broken and there is no way to fix the state of the client without reloading the page.
In such cases, the service worker notifies the client by sending an `UnrecoverableStateEvent` event.
Subscribe to `SwUpdate#unrecoverable` to be notified and handle these errors.

File: `handle-unrecoverable-state.service.ts`

```ts
@Service()
export class HandleUnrecoverableStateService {
  private updates = inject(SwUpdate);
  constructor() {
    this.updates.unrecoverable.subscribe((event) => {
      notifyUser(
        'An error occurred that we cannot recover from:\n' +
          event.reason +
          '\n\nPlease reload the page.',
      );
    });
  }
}
```

## More on Angular service workers

You might also be interested in the following:

  - Push notifications
  - Service Worker devops
