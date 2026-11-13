---
title: "What's new in .NET 8 runtime (part 5 of 6)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/whats-new/dotnet-8/runtime.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# What's new in .NET 8 runtime (part 5 of 6)

### Cryptography

.NET 8 adds support for the SHA-3 hashing primitives. (SHA-3 is currently supported by Linux with OpenSSL 1.1.1 or later and Windows 11 Build 25324 or later.) APIs where SHA-2 is available now offer a SHA-3 compliment. This includes `SHA3_256`, `SHA3_384`, and `SHA3_512` for hashing; `HMACSHA3_256`, `HMACSHA3_384`, and `HMACSHA3_512` for HMAC; `HashAlgorithmName.SHA3_256`, `HashAlgorithmName.SHA3_384`, and `HashAlgorithmName.SHA3_512` for hashing where the algorithm is configurable; and `RSAEncryptionPadding.OaepSHA3_256`, `RSAEncryptionPadding.OaepSHA3_384`, and `RSAEncryptionPadding.OaepSHA3_512` for RSA OAEP encryption.

The following example shows how to use the APIs, including the `SHA3_256.IsSupported` property to determine if the platform supports SHA-3.

```csharp
// Hashing example
if (SHA3_256.IsSupported)
{
    byte[] hash = SHA3_256.HashData(dataToHash);
}
else
{
    // ...
}

// Signing example
if (SHA3_256.IsSupported)
{
     using ECDsa ec = ECDsa.Create(ECCurve.NamedCurves.nistP256);
     byte[] signature = ec.SignData(dataToBeSigned, HashAlgorithmName.SHA3_256);
}
else
{
    // ...
}
```

SHA-3 support is currently aimed at supporting cryptographic primitives. Higher-level constructions and protocols aren't expected to fully support SHA-3 initially. These protocols include X.509 certificates, `System.Security.Cryptography.Xml.SignedXml`, and COSE.

### Networking

#### Support for HTTPS proxy

Until now, the proxy types that `System.Net.Http.HttpClient` supported all allowed a "man-in-the-middle" to see which site the client is connecting to, even for HTTPS URIs. `System.Net.Http.HttpClient` now supports *HTTPS proxy*, which creates an encrypted channel between the client and the proxy so all requests can be handled with full privacy.

To enable HTTPS proxy, set the `all_proxy` environment variable, or use the `System.Net.WebProxy` class to control the proxy programmatically.

Unix: `export all_proxy=https://x.x.x.x:3218`
Windows: `set all_proxy=https://x.x.x.x:3218`

You can also use the `System.Net.WebProxy` class to control the proxy programmatically.

### Stream-based ZipFile methods

.NET 8 includes new overloads of `System.IO.Compression.ZipFile.CreateFromDirectory*` that allow you to collect all the files included in a directory and zip them, then store the resulting zip file into the provided stream. Similarly, new `System.IO.Compression.ZipFile.ExtractToDirectory*` overloads let you provide a stream containing a zipped file and extract its contents into the filesystem. These are the new overloads:

```csharp
namespace System.IO.Compression;

public static partial class ZipFile
{
    public static void CreateFromDirectory(
        string sourceDirectoryName, Stream destination);

    public static void CreateFromDirectory(
        string sourceDirectoryName,
        Stream destination,
        CompressionLevel compressionLevel,
        bool includeBaseDirectory);

    public static void CreateFromDirectory(
        string sourceDirectoryName,
        Stream destination,
        CompressionLevel compressionLevel,
        bool includeBaseDirectory,
    Encoding? entryNameEncoding);

    public static void ExtractToDirectory(
        Stream source, string destinationDirectoryName) { }

    public static void ExtractToDirectory(
        Stream source, string destinationDirectoryName, bool overwriteFiles) { }

    public static void ExtractToDirectory(
        Stream source, string destinationDirectoryName, Encoding? entryNameEncoding) { }

    public static void ExtractToDirectory(
        Stream source, string destinationDirectoryName, Encoding? entryNameEncoding, bool overwriteFiles) { }
}
```

These new APIs can be useful when disk space is constrained, because they avoid having to use the disk as an intermediate step.

## Extension libraries

This section contains the following subtopics:

- Options validation
- LoggerMessageAttribute constructors
- Extensions metrics
- Hosted lifecycle services
- Keyed DI services
- System.Numerics.Tensors.TensorPrimitives

### Keyed DI services

Keyed dependency injection (DI) services provide a means for registering and retrieving DI services using keys. By using keys, you can scope how you register and consume services. These are some of the new APIs:

- The `Microsoft.Extensions.DependencyInjection.IKeyedServiceProvider` interface.
- The `Microsoft.Extensions.DependencyInjection.ServiceKeyAttribute` attribute, which can be used to inject the key that was used for registration/resolution in the constructor.
- The `Microsoft.Extensions.DependencyInjection.FromKeyedServicesAttribute` attribute, which can be used on service constructor parameters to specify which keyed service to use.
- Various new extension methods for `Microsoft.Extensions.DependencyInjection.IServiceCollection` to support keyed services, for example, `Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddKeyedScoped*`.
- The `Microsoft.Extensions.DependencyInjection.ServiceProvider` implementation of `Microsoft.Extensions.DependencyInjection.IKeyedServiceProvider`.

The following example shows you how to use keyed DI services.

```csharp
﻿WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<BigCacheConsumer>();
builder.Services.AddSingleton<SmallCacheConsumer>();
builder.Services.AddKeyedSingleton<ICache, BigCache>("big");
builder.Services.AddKeyedSingleton<ICache, SmallCache>("small");
WebApplication app = builder.Build();
app.MapGet("/big", (BigCacheConsumer data) => data.GetData());
app.MapGet("/small", (SmallCacheConsumer data) => data.GetData());
app.MapGet("/big-cache", ([FromKeyedServices("big")] ICache cache) => cache.Get("data"));
app.MapGet("/small-cache", (HttpContext httpContext) => httpContext.RequestServices.GetRequiredKeyedService<ICache>("small").Get("data"));
app.Run();

class BigCacheConsumer([FromKeyedServices("big")] ICache cache)
{
    public object? GetData() => cache.Get("data");
}

class SmallCacheConsumer(IServiceProvider serviceProvider)
{
    public object? GetData() => serviceProvider.GetRequiredKeyedService<ICache>("small").Get("data");
}

public interface ICache
{
    object Get(string key);
}

public class BigCache : ICache
{
    public object Get(string key) => $"Resolving {key} from big cache.";
}

public class SmallCache : ICache
{
    public object Get(string key) => $"Resolving {key} from small cache.";
}
```
For more information, see dotnet/runtime#64427.

### Hosted lifecycle services

Hosted services now have more options for execution during the application lifecycle. `Microsoft.Extensions.Hosting.IHostedService` provided `StartAsync` and `StopAsync`, and now `Microsoft.Extensions.Hosting.IHostedLifecycleService` provides these additional methods:

- `Microsoft.Extensions.Hosting.IHostedLifecycleService.StartingAsync(System.Threading.CancellationToken)`
- `Microsoft.Extensions.Hosting.IHostedLifecycleService.StartedAsync(System.Threading.CancellationToken)`
- `Microsoft.Extensions.Hosting.IHostedLifecycleService.StoppingAsync(System.Threading.CancellationToken)`
- `Microsoft.Extensions.Hosting.IHostedLifecycleService.StoppedAsync(System.Threading.CancellationToken)`

These methods run before and after the existing points respectively.

The following example shows how to use the new APIs.

```csharp
﻿using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

internal class HostedLifecycleServices
{
    public async static void RunIt()
    {
        IHostBuilder hostBuilder = new HostBuilder();
        hostBuilder.ConfigureServices(services =>
        {
            services.AddHostedService<MyService>();
        });

        using (IHost host = hostBuilder.Build())
        {
            await host.StartAsync();
        }
    }

    public class MyService : IHostedLifecycleService
    {
        public Task StartingAsync(CancellationToken cancellationToken) => /* add logic here */ Task.CompletedTask;
        public Task StartAsync(CancellationToken cancellationToken) => /* add logic here */ Task.CompletedTask;
        public Task StartedAsync(CancellationToken cancellationToken) => /* add logic here */ Task.CompletedTask;
        public Task StopAsync(CancellationToken cancellationToken) => /* add logic here */ Task.CompletedTask;
        public Task StoppedAsync(CancellationToken cancellationToken) => /* add logic here */ Task.CompletedTask;
        public Task StoppingAsync(CancellationToken cancellationToken) => /* add logic here */ Task.CompletedTask;
    }
}
```
For more information, see dotnet/runtime#86511.

### Options validation

#### Source generator

To reduce startup overhead and improve the validation feature set, we've introduced a source-code generator that implements the validation logic. The following code shows example models and validator classes.

```csharp
public class FirstModelNoNamespace
{
    [Required]
    [MinLength(5)]
    public string P1 { get; set; } = string.Empty;

    [Microsoft.Extensions.Options.ValidateObjectMembers(
        typeof(SecondValidatorNoNamespace))]
    public SecondModelNoNamespace? P2 { get; set; }
}

public class SecondModelNoNamespace
{
    [Required]
    [MinLength(5)]
    public string P4 { get; set; } = string.Empty;
}

[OptionsValidator]
public partial class FirstValidatorNoNamespace
    : IValidateOptions<FirstModelNoNamespace>
{
}

[OptionsValidator]
public partial class SecondValidatorNoNamespace
    : IValidateOptions<SecondModelNoNamespace>
{
}
```
If your app uses dependency injection, you can inject the validation as shown in the following example code.

```csharp
WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();
builder.Services.Configure<FirstModelNoNamespace>(
    builder.Configuration.GetSection("some string"));

builder.Services.AddSingleton<
    IValidateOptions<FirstModelNoNamespace>, FirstValidatorNoNamespace>();
builder.Services.AddSingleton<
    IValidateOptions<SecondModelNoNamespace>, SecondValidatorNoNamespace>();
```
#### ValidateOptionsResultBuilder type

.NET 8 introduces the `Microsoft.Extensions.Options.ValidateOptionsResultBuilder` type to facilitate the creation of a `Microsoft.Extensions.Options.ValidateOptionsResult` object. Importantly, this builder allows for the accumulation of multiple errors. Previously, creating the `Microsoft.Extensions.Options.ValidateOptionsResult` object that's required to implement `Microsoft.Extensions.Options.IValidateOptions`1.Validate(System.String,`0)` was difficult and sometimes resulted in layered validation errors. If there were multiple errors, the validation process often stopped at the first error.

The following code snippet shows an example usage of `Microsoft.Extensions.Options.ValidateOptionsResultBuilder`.

```csharp
ValidateOptionsResultBuilder builder = new();
builder.AddError("Error: invalid operation code");
builder.AddResult(ValidateOptionsResult.Fail("Invalid request parameters"));
builder.AddError("Malformed link", "Url");

// Build ValidateOptionsResult object has accumulating multiple errors.
ValidateOptionsResult result = builder.Build();

// Reset the builder to allow using it in new validation operation.
builder.Clear();
```
### LoggerMessageAttribute constructors

`Microsoft.Extensions.Logging.LoggerMessageAttribute` now offers additional constructor overloads. Previously, you had to choose either the parameterless constructor or the constructor that required all of the parameters (event ID, log level, and message). The new overloads offer greater flexibility in specifying the required parameters with reduced code. If you don't supply an event ID, the system generates one automatically.

```csharp
public LoggerMessageAttribute(LogLevel level, string message);
public LoggerMessageAttribute(LogLevel level);
public LoggerMessageAttribute(string message);
```

### Extensions metrics

#### IMeterFactory interface

You can register the new `System.Diagnostics.Metrics.IMeterFactory` interface in dependency injection (DI) containers and use it to create `System.Diagnostics.Metrics.Meter` objects in an isolated manner.

Register the `System.Diagnostics.Metrics.IMeterFactory` to the DI container using the default meter factory implementation:

```csharp
// 'services' is the DI IServiceCollection.
services.AddMetrics();
```

Consumers can then obtain the meter factory and use it to create a new `System.Diagnostics.Metrics.Meter` object.

```csharp
IMeterFactory meterFactory = serviceProvider.GetRequiredService<IMeterFactory>();

MeterOptions options = new MeterOptions("MeterName")
{
    Version = "version",
};

Meter meter = meterFactory.Create(options);
```

#### MetricCollector\<T> class

The new `Microsoft.Extensions.Diagnostics.Metrics.Testing.MetricCollector`1` class lets you record metric measurements along with timestamps. Additionally, the class offers the flexibility to use a time provider of your choice for accurate timestamp generation.

```csharp
const string CounterName = "MyCounter";
DateTimeOffset now = DateTimeOffset.Now;

var timeProvider = new FakeTimeProvider(now);
using var meter = new Meter(Guid.NewGuid().ToString());
Counter<long> counter = meter.CreateCounter<long>(CounterName);
using var collector = new MetricCollector<long>(counter, timeProvider);

Assert.IsNull(collector.LastMeasurement);

counter.Add(3);

// Verify the update was recorded.
Assert.AreEqual(counter, collector.Instrument);
Assert.IsNotNull(collector.LastMeasurement);

Assert.AreSame(collector.GetMeasurementSnapshot().Last(), collector.LastMeasurement);
Assert.AreEqual(3, collector.LastMeasurement.Value);
Assert.AreEqual(now, collector.LastMeasurement.Timestamp);
```
### System.Numerics.Tensors.TensorPrimitives

The updated System.Numerics.Tensors NuGet package includes APIs in the new `System.Numerics.Tensors.TensorPrimitives` type that add support for tensor operations. The tensor primitives optimize data-intensive workloads like those of AI and machine learning.

AI workloads like semantic search and retrieval-augmented generation (RAG) extend the natural language capabilities of large language models, such as ChatGPT, by augmenting prompts with relevant data. For these workloads, operations on vectors—like *cosine similarity* to find the most relevant data to answer a question—are crucial. The `System.Numerics.Tensors.TensorPrimitives` type provides APIs for vector operations.

For more information, see the Announcing .NET 8 RC 2 blog post.
