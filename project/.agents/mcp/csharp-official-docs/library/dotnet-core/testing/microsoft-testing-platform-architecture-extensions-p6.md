---
title: "Build extensions for Microsoft.Testing.Platform (MTP) (part 6 of 6)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/microsoft-testing-platform-architecture-extensions.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Build extensions for Microsoft.Testing.Platform (MTP) (part 6 of 6)

## Extensions execution order

The testing platform consists of a testing framework and any number of extensions that can operate *in-process* or *out-of-process*. This document outlines the **sequence of calls** to all potential extensibility points to provide clarity on when a feature is anticipated to be invoked:

1. ITestHostEnvironmentVariableProvider.UpdateAsync : Out-of-process
1. ITestHostEnvironmentVariableProvider.ValidateTestHostEnvironmentVariablesAsync : Out-of-process
1. ITestHostProcessLifetimeHandler.BeforeTestHostProcessStartAsync : Out-of-process
1. Test host process start
1. ITestHostProcessLifetimeHandler.OnTestHostProcessStartedAsync : Out-of-process, this event can intertwine the actions of *in-process* extensions, depending on race conditions.
1. ITestHostApplicationLifetime.BeforeRunAsync: In-process
1. ITestSessionLifetimeHandler.OnTestSessionStartingAsync: In-process
1. ITestFramework.CreateTestSessionAsync: In-process
1. ITestFramework.ExecuteRequestAsync: In-process, this method can be called one or more times. At this point, the testing framework will transmit information to the IMessageBus that can be utilized by the IDataConsumer.
1. ITestFramework.CloseTestSessionAsync: In-process
1. ITestSessionLifetimeHandler.OnTestSessionFinishingAsync: In-process
1. ITestHostApplicationLifetime.AfterRunAsync: In-process
1. In-process cleanup, involves calling dispose and IAsyncCleanableExtension on all extension points.
1. ITestHostProcessLifetimeHandler.OnTestHostProcessExitedAsync : Out-of-process
1. Out-of-process cleanup, involves calling dispose and IAsyncCleanableExtension on all extension points.

## Extensions helpers

The testing platform provides a set of helper classes and interfaces to simplify the implementation of extensions. These helpers are designed to streamline the development process and ensure that the extension adheres to the platform's standards.

### Asynchronous initialization and cleanup of extensions

The creation of the testing framework and extensions through factories adheres to the standard .NET object creation mechanism, which uses synchronous constructors. If an extension requires intensive initialization (such as accessing the file system or network), it cannot employ the *async/await* pattern in the constructor because constructors return void, not `Task`.

Therefore, the testing platform provides a method to initialize an extension using the async/await pattern through a simple interface. For symmetry, it also offers an async interface for cleanup that extensions can implement seamlessly.

```csharp
public interface IAsyncInitializableExtension
{
    Task InitializeAsync();
}

public interface IAsyncCleanableExtension
{
    Task CleanupAsync();
}
```

`IAsyncInitializableExtension.InitializeAsync`: This method is assured to be invoked following the creation factory.

`IAsyncCleanableExtension.CleanupAsync`: This method is assured to be invoked *at least one time* during the termination of the testing session, prior to the default `DisposeAsync` or `Dispose`.

> **Important:**
> Similar to the standard `Dispose` method, `CleanupAsync` may be invoked multiple times. If an object's `CleanupAsync` method is called more than once, the object must ignore all calls after the first one. The object must not throw an exception if its `CleanupAsync` method is called multiple times.
> **Note:**
> By default, the testing platform will call `DisposeAsync` if it's available, or `Dispose` if it's implemented. It's important to note that the testing platform will not call both dispose methods but will prioritize the async one if implemented.

### The CompositeExtensionFactory<T\>

As outlined in the extensions section, the testing platform enables you to implement interfaces to incorporate custom extensions both in and out of process.

Each interface addresses a particular feature, and according to .NET design, you implement this interface in a specific object. You can register the extension itself using the specific registration API `AddXXX` from the `TestHost` or `TestHostController` object from the `ITestApplicationBuilder` as detailed in the corresponding sections.

However, if you need to *share state* between two extensions, the fact that you can implement and register different objects implementing different interfaces makes sharing a challenging task. Without any assistance, you would need a way to pass one extension to the other to share information, which complicates the design.

Hence, the testing platform provides a sophisticated method to implement multiple extension points using the same type, making data sharing a straightforward task. All you need to do is utilize the `CompositeExtensionFactory<T>`, which can then be registered using the same API as you would for a single interface implementation.

For instance, consider a type that implements both `ITestSessionLifetimeHandler` and `IDataConsumer`. This is a common scenario because you often want to gather information from the testing framework and then, when the testing session concludes, you'll dispatch your artifact using the `IMessageBus` within the `ITestSessionLifetimeHandler.OnTestSessionFinishingAsync`.

What you should do is to normally implement the interfaces:

```csharp
internal class CustomExtension : ITestSessionLifetimeHandler, IDataConsumer, ...
{
   ...
}
```

Once you've created the `CompositeExtensionFactory<CustomExtension>` for your type, you can register it with both the `IDataConsumer` and `ITestSessionLifetimeHandler` APIs, which offer an overload for the `CompositeExtensionFactory<T>`:

```csharp
var builder = await TestApplication.CreateBuilderAsync(args);

// ...

var factory = new CompositeExtensionFactory<CustomExtension>(serviceProvider => new CustomExtension());

builder.TestHost.AddTestSessionLifetimeHandle(factory);
builder.TestHost.AddDataConsumer(factory);
```

The factory constructor employs the IServiceProvider to access the services provided by the testing platform.

The testing platform will be responsible for managing the lifecycle of the composite extension.

It's important to note that due to the testing platform's support for both *in-process* and *out-of-process* extensions, you can't combine any extension point arbitrarily. The creation and utilization of extensions are contingent on the host type, meaning you can only group *in-process* (TestHost) and *out-of-process* (TestHostController) extensions together.

The following combinations are possible:

* For `ITestApplicationBuilder.TestHost`, you can combine `IDataConsumer` and `ITestSessionLifetimeHandler`.
* For `ITestApplicationBuilder.TestHostControllers`, you can combine `ITestHostEnvironmentVariableProvider` and `ITestHostProcessLifetimeHandler`.

> **Note:**
> `IDataConsumer` is an *in-process* extension, so custom consumers are registered only through `builder.TestHost` (including via `CompositeExtensionFactory<T>`). There's no public API to register an `IDataConsumer` on `builder.TestHostControllers`.
