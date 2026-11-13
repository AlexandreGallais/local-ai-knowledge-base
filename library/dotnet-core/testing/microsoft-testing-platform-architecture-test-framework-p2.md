---
title: "Build a test framework for Microsoft.Testing.Platform (MTP) (part 2 of 5)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/microsoft-testing-platform-architecture-test-framework.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Build a test framework for Microsoft.Testing.Platform (MTP) (part 2 of 5)

## Test framework extension

The test framework is the primary extension that provides the testing platform with the ability to discover and execute tests. The test framework is responsible for communicating the results of the tests back to the testing platform. The test framework is the only mandatory extension required to execute a testing session.

### Register a testing framework

This section explains how to register the test framework with the testing platform. You register only one testing framework per test application builder using the `TestApplication.RegisterTestFramework` API as shown in MTP architecture documentation.

The registration API is defined as follows:

```csharp
ITestApplicationBuilder RegisterTestFramework(
    Func<IServiceProvider, ITestFrameworkCapabilities> capabilitiesFactory,
    Func<ITestFrameworkCapabilities, IServiceProvider, ITestFramework> adapterFactory);
```

The `RegisterTestFramework` API expects two factories:

1. `Func<IServiceProvider, ITestFrameworkCapabilities>`: This is a delegate that accepts an object implementing the `IServiceProvider` interface and returns an object implementing the `ITestFrameworkCapabilities` interface. The `IServiceProvider` provides access to platform services such as configurations, loggers, and command line arguments.

    The `ITestFrameworkCapabilities` interface is used to announce the capabilities supported by the testing framework to the platform and extensions. It allows the platform and extensions to interact correctly by implementing and supporting specific behaviors. For a better understanding of the concept of capabilities, refer to the respective section.

1. `Func<ITestFrameworkCapabilities, IServiceProvider, ITestFramework>`: This is a delegate that takes in an ITestFrameworkCapabilities object, which is the instance returned by the `Func<IServiceProvider, ITestFrameworkCapabilities>`, and an IServiceProvider to provide access to platform services once more. The expected return object is one that implements the ITestFramework interface. The `ITestFramework` serves as the execution engine that discovers and runs tests, and then communicates the results back to the testing platform.

The need for the platform to separate the creation of the `ITestFrameworkCapabilities` and the creation of the ITestFramework is an optimization to avoid creating the test framework if the supported capabilities are not sufficient to execute the current testing session.

Consider the following user code example, which demonstrates a test framework registration that returns an empty capability set:

```csharp
internal class TestingFrameworkCapabilities : ITestFrameworkCapabilities
{
    public IReadOnlyCollection<ITestFrameworkCapability> Capabilities => [];
}

internal class TestingFramework : ITestFramework
{
   public TestingFramework(ITestFrameworkCapabilities capabilities, IServiceProvider serviceProvider)
   {
       // ...
   }
   // Omitted for brevity...
}

public static class TestingFrameworkExtensions
{
    public static void AddTestingFramework(this ITestApplicationBuilder builder)
    {
        builder.RegisterTestFramework(
            _ => new TestingFrameworkCapabilities(),
            (capabilities, serviceProvider) => new TestingFramework(capabilities, serviceProvider));
    }
}

// ...
```

Now, consider the corresponding entry point of this example with the registration code:

```csharp
var testApplicationBuilder = await TestApplication.CreateBuilderAsync(args);
// Register the testing framework
testApplicationBuilder.AddTestingFramework();
using var testApplication = await testApplicationBuilder.BuildAsync();
return await testApplication.RunAsync();
```

> **Note:**
> Returning empty ITestFrameworkCapabilities shouldn't prevent the execution of the test session. All test frameworks should be capable of discovering and running tests. The impact should be limited to extensions that may opt-out if the test framework lacks a certain feature.

For reports that need framework-specific metadata, register `ITrxReportCapability` and add the corresponding TRX properties to your test results.

### Create a testing framework

The `Microsoft.Testing.Platform.Extensions.TestFramework.ITestFramework` is implemented by extensions that provide a test framework:

```csharp
public interface ITestFramework : IExtension
{
    Task<CreateTestSessionResult> CreateTestSessionAsync(CreateTestSessionContext context);
    Task ExecuteRequestAsync(ExecuteRequestContext context);
    Task<CloseTestSessionResult> CloseTestSessionAsync(CloseTestSessionContext context);
}
```

#### The `IExtension` interface

The `ITestFramework` interface inherits from the `IExtension` interface, which is an interface that all extension points inherit from. `IExtension` is used to retrieve the name and description of the extension. The `IExtension` also provides a way to dynamically enable or disable the extension in setup, through `Task<bool> IsEnabledAsync()`. Please make sure that you return `true` from this method if you have no specific requirements to disable it.

#### The `CreateTestSessionAsync` method

The `CreateTestSessionAsync` method is called at the start of the test session and is used to initialize the test framework. The API accepts a `CreateTestSessionContext` object and returns a `CreateTestSessionResult`.

```csharp
public sealed class CreateTestSessionContext : TestSessionContext
{
    public CancellationToken CancellationToken { get; }
}
```

The `SessionUid` property is inherited from `TestSessionContext` (see the TestSessionContext section).
The `CancellationToken` is used to halt the execution of `CreateTestSessionAsync`.

The return object is a `CreateTestSessionResult`:

```csharp
public sealed class CreateTestSessionResult
{
    public string? WarningMessage { get; set; }
    public string? ErrorMessage { get; set; }
    public bool IsSuccess { get; set; }
}
```

The `IsSuccess` property is used to indicate whether the session creation was successful. When it returns `false`, the test execution is halted.

#### The `CloseTestSessionAsync` method

The `CloseTestSessionAsync` method is juxtaposed to the `CreateTestSessionAsync` in functionality, with the only difference being the object names. For more information, see the `CreateTestSessionAsync` section.

#### The `ExecuteRequestAsync` method

The `ExecuteRequestAsync` method accepts an object of type `ExecuteRequestContext`. This object, as suggested by its name, holds the specifics about the action that the test framework is expected to perform.
The `ExecuteRequestContext` definition is:

```csharp
public sealed class ExecuteRequestContext
{
    public IRequest Request { get; }
    public IMessageBus MessageBus { get; }
    public CancellationToken CancellationToken { get; }
    public void Complete();
}
```

`IRequest`: This is the base interface for any type of request. You should think about the test framework as an **in-process stateful server** where the lifecycle is:

The preceding diagram illustrates that the testing platform issues three requests after creating the test framework instance. The test framework processes these requests and utilizes the `IMessageBus` service, which is included in the request itself, to deliver the result for each specific request. Once a particular request has been handled, the test framework invokes the `Complete()` method on it, indicating to the testing platform that the request has been fulfilled.
The testing platform monitors all dispatched requests. Once all requests have been fulfilled, it invokes `CloseTestSessionAsync` and disposes of the instance (if `IDisposable/IAsyncDisposable` is implemented).
It's evident that the requests and their completions can overlap, enabling concurrent and asynchronous execution of requests.

> **Note:**
> Currently, the testing platform does not send overlapping requests and waits for the completion of a request >> before sending the next one. However, this behavior may change in the future. The support for concurrent requests will be determined through the capabilities system.

The `IRequest` implementation specifies the precise request that needs to be fulfilled. The test framework identifies the type of request and handles it accordingly. If the request type is unrecognized, an exception should be raised.

You can find details about the available requests in the IRequest section.

`IMessageBus`: This service, linked with the request, allows the test framework to *asynchronously* to publish information about the ongoing request to the testing platform.
The message bus serves as the central hub for the platform, facilitating asynchronous communication among all platform components and extensions.
For a comprehensive list of information that can be published to the testing platform, refer to the IMessageBus section.

`CancellationToken`: This token is utilized to interrupt the processing of a particular request.

To stop scheduling new tests without canceling result publication or cleanup, implement `IGracefulStopTestExecutionCapability`. This separate capability supports features such as `--maximum-failed-tests`.

`Complete()`: As depicted in the previous sequence, the `Complete` method notifies the platform that the request has been successfully processed and all relevant information has been transmitted to the IMessageBus.

> **Warning:**
> Neglecting to invoke `Complete()` on the request will result in the test application becoming unresponsive.

To customize your test framework according to your requirements or those of your users, you can use a personalized section inside the configuration file or with custom command line options.
