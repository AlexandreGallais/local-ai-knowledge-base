# core/src/error_handler

## ErrorHandler

```ts
export class ErrorHandler
```

Provides a hook for centralized exception handling.

The default implementation of `ErrorHandler` prints error messages to the `console`. To
intercept error handling, write a custom exception handler that replaces this default as
appropriate for your app.

@usageNotes
### Example

```ts
class MyErrorHandler implements ErrorHandler {
  handleError(error) {
    // do something with the exception
  }
}

// Provide in standalone apps
bootstrapApplication(AppComponent, {
  providers: [{provide: ErrorHandler, useClass: MyErrorHandler}]
})

// Provide in module-based apps
@NgModule({
  providers: [{provide: ErrorHandler, useClass: MyErrorHandler}]
})
class MyModule {}
```

@publicApi

@see [Unhandled errors in Angular](best-practices/error-handling)

## ErrorHandler.onViewError

```ts
onViewError?(error: Error, details: ErrorDetails): void
```

Callback to handle errors happening during the rendering of a component/directive view.

@param error The error that was thrown.
@param details Additional information about the error.

## ErrorBoundaryWrappedError

```ts
export class ErrorBoundaryWrappedError extends Error
```

Error thrown when an error boundary catches an error that is not an `Error` instance.

@publicApi 22.2

## provideBrowserGlobalErrorListeners

```ts
export function provideBrowserGlobalErrorListeners(): EnvironmentProviders
```

Provides an environment initializer which forwards unhandled errors to the ErrorHandler.

The listeners added are for the window's 'unhandledrejection' and 'error' events.

@see [Global error listeners](best-practices/error-handling#global-error-listeners)

@publicApi