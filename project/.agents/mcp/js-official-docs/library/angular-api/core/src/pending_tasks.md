# core/src/pending_tasks

## PendingTasks

```ts
export class PendingTasks
```

Service that keeps track of pending tasks contributing to the stableness of Angular
application. While several existing Angular services (ex.: `HttpClient`) will internally manage
tasks influencing stability, this API gives control over stability to library and application
developers for specific cases not covered by Angular internals.

The concept of stability comes into play in several important scenarios:
- SSR process needs to wait for the application stability before serializing and sending rendered
HTML;
- tests might want to delay assertions until the application becomes stable;

@usageNotes
```ts
const pendingTasks = inject(PendingTasks);
const taskCleanup = pendingTasks.add();
// do work that should block application's stability and then:
taskCleanup();
```


@see [PendingTasks for Server Side Rendering (SSR)](guide/zoneless#pendingtasks-for-server-side-rendering-ssr)

@publicApi 20.0

## PendingTasks.add

```ts
add(): ()
```

Adds a new task that should block application's stability.
@returns A cleanup function that removes a task when called.

## PendingTasks.run

```ts
run(fn: ()
```

Runs an asynchronous function and blocks the application's stability until the function completes.

```ts
pendingTasks.run(async () => {
  const userData = await fetch('/api/user');
  this.userData.set(userData);
});
```

@param fn The asynchronous function to execute
@developerPreview 19.0