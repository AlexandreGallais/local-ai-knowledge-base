---
title: "Build extensions for Microsoft.Testing.Platform (MTP) (part 2 of 6)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/microsoft-testing-platform-architecture-extensions.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Build extensions for Microsoft.Testing.Platform (MTP) (part 2 of 6)

## Extensibility points

The testing platform provides additional extensibility points that allow you to customize the behavior of the platform and the test framework. These extensibility points are optional and can be used to enhance the testing experience.

> **Tip:**
> Each extension shown in this article includes a manual registration snippet (for example, `builder.TestHost.AddDataConsumer(...)`). If you're shipping your extension as a NuGet package, you can let consumers skip the manual call by exposing a `TestingPlatformBuilderHook` and a small MSBuild props file. The auto-generated entry point will then invoke your hook automatically. For details, see Auto-register your extension with `TestingPlatformBuilderHook`.

### The `ICommandLineOptionsProvider` extensions

> **Note:**
> When extending this API, the custom extension will exists both in and out of the test host process.

As discussed in the architecture section, the initial step involves creating the `ITestApplicationBuilder` to register the testing framework and extensions with it.

```csharp
var builder = await TestApplication.CreateBuilderAsync(args);
```

The `CreateBuilderAsync` method accepts an array of strings (`string[]`) named `args`. These arguments can be used to pass command-line options to all components of the testing platform (including built-in components, testing frameworks, and extensions), allowing for customization of their behavior.

Typically, the arguments passed are those received in the standard `Main(string[] args)` method. However, if the hosting environment differs, any list of arguments can be supplied.

Arguments **must be prefixed** with a double dash `--`. For example, `--filter`.

If a component such as a testing framework or an extension point wishes to offer custom command-line options, it can do so by implementing the `ICommandLineOptionsProvider` interface. This implementation can then be registered with the `ITestApplicationBuilder` via the registration factory of the `CommandLine` property, as shown:

```csharp
builder.CommandLine.AddProvider(
    static () => new CustomCommandLineOptions());
```

In the example provided, `CustomCommandLineOptions` is an implementation of the `ICommandLineOptionsProvider` interface, This interface comprises the following members and data types:

```csharp
public interface ICommandLineOptionsProvider : IExtension
{
    IReadOnlyCollection<CommandLineOption> GetCommandLineOptions();

    Task<ValidationResult> ValidateOptionArgumentsAsync(
        CommandLineOption commandOption,
        string[] arguments);

    Task<ValidationResult> ValidateCommandLineOptionsAsync(
        ICommandLineOptions commandLineOptions);
}

public sealed class CommandLineOption
{
    public string Name { get; }
    public string Description { get; }
    public ArgumentArity Arity { get; }
    public bool IsHidden { get; }

    // ...
}

public interface ICommandLineOptions
{
    bool IsOptionSet(string optionName);

    bool TryGetOptionArgumentList(
        string optionName,
        out string[]? arguments);
}
```

As observed, the `ICommandLineOptionsProvider` extends the `IExtension` interface. Therefore, like any other extension, you can choose to enable or disable it using the `IExtension.IsEnabledAsync` API.

The order of execution of the `ICommandLineOptionsProvider` is:

Let's examine the apis and their mean:

`ICommandLineOptionsProvider.GetCommandLineOptions()`: This method is utilized to retrieve all the options offered by the component. Each `CommandLineOption` requires the following properties to be specified:

`string name`: This is the option's name, presented without a dash. For example, *filter* would be used as `--filter` by users.

`string description`: This is a description of the option. It will be displayed when users pass `--help` as an argument to the application builder.

`ArgumentArity arity`: The arity of an option is the number of values that can be passed if that option or command is specified. Current available arities are:

* `Zero`: Represents an argument arity of zero.
* `ZeroOrOne`: Represents an argument arity of zero or one.
* `ZeroOrMore`: Represents an argument arity of zero or more.
* `OneOrMore`: Represents an argument arity of one or more.
* `ExactlyOne`: Represents an argument arity of exactly one.

For examples, refer to the System.CommandLine arity table.

`bool isHidden`: This property signifies that the option is available for use but will not be displayed in the description when `--help` is invoked.

`ICommandLineOptionsProvider.ValidateOptionArgumentsAsync`: This method is employed to *validate* the argument provided by the user.

For instance, if you have a parameter named `--dop` that represents the degree of parallelism for our custom testing framework, a user might input `--dop 0`. In this scenario, the value `0` would be invalid because it is expected to have a degree of parallelism of `1` or more. By using `ValidateOptionArgumentsAsync`, you can perform upfront validation and return an error message if necessary.

A possible implementation for the sample above could be:

```csharp
public Task<ValidationResult> ValidateOptionArgumentsAsync(
    CommandLineOption commandOption,
    string[] arguments)
{
    if (commandOption.Name == "dop")
    {
        if (!int.TryParse(arguments[0], out int dopValue) || dopValue <= 0)
        {
            return ValidationResult.InvalidTask("--dop must be a positive integer");
        }
    }

    return ValidationResult.ValidTask;
}
```

`ICommandLineOptionsProvider.ValidateCommandLineOptionsAsync`: This method is called as last one and allows to do global coherency check.

For example, let's say our testing framework has the capability to generate a test result report and save it to a file. This feature is accessed using the `--generatereport` option, and the filename is specified with `--reportfilename myfile.rep`. In this scenario, if a user only provides the `--generatereport` option without specifying a filename, the validation should fail because the report cannot be generated without a filename.
A possible implementation for the sample above could be:

```csharp
public Task<ValidationResult> ValidateCommandLineOptionsAsync(ICommandLineOptions commandLineOptions)
{
    bool generateReportEnabled = commandLineOptions.IsOptionSet(GenerateReportOption);
    bool reportFileName = commandLineOptions.TryGetOptionArgumentList(ReportFilenameOption, out string[]? _);

    return (generateReportEnabled || reportFileName) && !(generateReportEnabled && reportFileName)
        ? ValidationResult.InvalidTask("Both `--generatereport` and `--reportfilename` need to be provided simultaneously.")
        : ValidationResult.ValidTask;
}
```

Please note that the `ValidateCommandLineOptionsAsync` method provides the `ICommandLineOptions` service, which is used to fetch the argument information parsed by the platform itself.

### The `ITestSessionLifetimeHandler` extensions

The `ITestSessionLifetimeHandler` is an *in-process* extension that enables the execution of code *before* and *after* the test session.

To register a custom `ITestSessionLifetimeHandler`, use the following API:

```csharp
var builder = await TestApplication.CreateBuilderAsync(args);

// ...

builder.TestHost.AddTestSessionLifetimeHandle(
    static serviceProvider => new CustomTestSessionLifetimeHandler());
```

The factory utilizes the IServiceProvider to gain access to the suite of services offered by the testing platform.

> **Important:**
> The sequence of registration is significant, as the APIs are called in the order they were registered.

The `ITestSessionLifetimeHandler` interface includes the following methods:

```csharp
public interface ITestSessionLifetimeHandler : ITestHostExtension
{
    Task OnTestSessionStartingAsync(ITestSessionContext testSessionContext);

    Task OnTestSessionFinishingAsync(ITestSessionContext testSessionContext);
}

public interface ITestSessionContext
{
    SessionUid SessionUid { get; }

    CancellationToken CancellationToken { get; }
}

public readonly struct SessionUid(string value)
{
    public string Value { get; } = value;
}

public interface ITestHostExtension : IExtension
{
}
```

> **Important:**
> In MTP 2.0.0, both methods changed to take a single `ITestSessionContext` parameter that exposes the `SessionUid` and the `CancellationToken`. In MTP 1.x, each method took a separate `SessionUid` and `CancellationToken` argument. For more information, see Migrate from Microsoft.Testing.Platform (MTP) v1 to v2.

The `ITestSessionLifetimeHandler` is a type of `ITestHostExtension`, which serves as a base for all *test host* extensions. Like all other extension points, it also inherits from IExtension. Therefore, like any other extension, you can choose to enable or disable it using the `IExtension.IsEnabledAsync` API.

Consider the following details for this API:

`OnTestSessionStartingAsync`: This method is invoked prior to the commencement of the test session and receives the `ITestSessionContext`, whose `SessionUid` provides an opaque identifier for the current test session.

`OnTestSessionFinishingAsync`: This method is invoked after the completion of the test session, ensuring that the testing framework has finished executing all tests and has reported all relevant data to the platform. Typically, in this method, the extension employs the `IMessageBus` to transmit custom assets or data to the shared platform bus. This method can also signal to any custom *out-of-process* extension that the test session has concluded.

Finally, the `ITestSessionContext` exposes a `CancellationToken` that the extension is expected to honor.

If your extension requires intensive initialization and you need to use the async/await pattern, you can refer to the `Async extension initialization and cleanup`. If you need to *share state* between extension points, you can refer to the `CompositeExtensionFactory<T>` section.

### The `ITestApplicationLifecycleCallbacks` extensions

> **Important:**
> `ITestApplicationLifecycleCallbacks` was removed in MTP 2.0.0. Use `ITestHostApplicationLifetime` instead. For more information, see Migrate from Microsoft.Testing.Platform (MTP) v1 to v2.

The `ITestHostApplicationLifetime` interface lets an *in-process* extension run code at the start and end of the *test host*.

To register a custom `ITestHostApplicationLifetime`, use the following API:

```csharp
var builder = await TestApplication.CreateBuilderAsync(args);

// ...

builder.TestHost.AddTestHostApplicationLifetime(
    static serviceProvider
    => new CustomTestHostApplicationLifetime());
```

The factory uses the IServiceProvider to access the services offered by the testing platform.

> **Important:**
> The sequence of registration is significant, as the APIs are called in the order they were registered.

The `ITestHostApplicationLifetime` interface includes the following methods:

```csharp
public interface ITestHostApplicationLifetime : ITestHostExtension
{
    Task BeforeRunAsync(CancellationToken cancellationToken);

    Task AfterRunAsync(
        int exitCode,
        CancellationToken cancellationToken);
}

public interface ITestHostExtension : IExtension
{
}
```

The `ITestHostApplicationLifetime` interface extends `ITestHostExtension`, which serves as a base for all *test host* extensions. Like all other extension points, it also inherits from IExtension. Therefore, like any other extension, you can choose to enable or disable it using the `IExtension.IsEnabledAsync` API.

`BeforeRunAsync`: This method serves as the initial point of contact for the *test host* and is the first opportunity for an *in-process* extension to execute a feature. It's typically used to establish a connection with any corresponding *out-of-process* extensions if a feature is designed to operate across both environments.

*For example, the built-in hang dump feature is composed of both *in-process* and *out-of-process* extensions, and this method is used to exchange information with the *out-of-process* component of the extension.*

`AfterRunAsync`: This method is the final call before exiting the `int ITestApplication.RunAsync()` and it provides the `exit code`. It should be used solely for cleanup tasks and to notify any corresponding *out-of-process* extension that the *test host* is about to terminate.

Finally, both APIs take a `CancellationToken` which the extension is expected to honor.
