---
title: "What's new in .NET Core 3.0 (part 3 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/whats-new/dotnet-core-3-0.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# What's new in .NET Core 3.0 (part 3 of 3)

## .NET Core 3.0 API changes

### Ranges and indices

The new `System.Index` type can be used for indexing. You can create one from an `int` that counts from the beginning, or with a prefix `^` operator (C#) that counts from the end:

```csharp
Index i1 = 3;  // number 3 from beginning
Index i2 = ^4; // number 4 from end
int[] a = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };
Console.WriteLine($"{a[i1]}, {a[i2]}"); // "3, 6"
```

There's also the `System.Range` type, which consists of two `Index` values, one for the start and one for the end, and can be written with a `x..y` range expression (C#). You can then index with a `Range`, which produces a slice:

```csharp
var slice = a[i1..i2]; // { 3, 4, 5 }
```

For more information, see the ranges and indices tutorial.

### Async streams

The `System.Collections.Generic.IAsyncEnumerable`1` type is a new asynchronous version of `System.Collections.Generic.IEnumerable`1`. The language lets you `await foreach` over `IAsyncEnumerable<T>` to consume their elements, and use `yield return` to them to produce elements.

The following example demonstrates both production and consumption of async streams. The `foreach` statement is async and itself uses `yield return` to produce an async stream for callers. This pattern (using `yield return`) is the recommended model for producing async streams.

```csharp
async IAsyncEnumerable<int> GetBigResultsAsync()
{
    await foreach (var result in GetResultsAsync())
    {
        if (result > 20) yield return result;
    }
}
```

In addition to being able to `await foreach`, you can also create async iterators, for example, an iterator that returns an `IAsyncEnumerable/IAsyncEnumerator` that you can both `await` and `yield` in. For objects that need to be disposed, you can use `IAsyncDisposable`, which various BCL types implement, such as `Stream` and `Timer`.

For more information, see the async streams tutorial.

### IEEE Floating-point

Floating point APIs are being updated to comply with IEEE 754-2008 revision. The goal of these changes is to expose all **required** operations and ensure that they're behaviorally compliant with the IEEE spec. For more information about floating-point improvements, see the Floating-Point Parsing and Formatting improvements in .NET Core 3.0 blog post.

Parsing and formatting fixes include:

- Correctly parse and round inputs of any length.
- Correctly parse and format negative zero.
- Correctly parse `Infinity` and `NaN` by doing a case-insensitive check and allowing an optional preceding `+` where applicable.

New `System.Math` APIs include:

- `System.Math.BitIncrement(System.Double)` and `System.Math.BitDecrement(System.Double)`\
Corresponds to the `nextUp` and `nextDown` IEEE operations. They return the smallest floating-point number that compares greater or lesser than the input (respectively). For example, `Math.BitIncrement(0.0)` would return `double.Epsilon`.

- `System.Math.MaxMagnitude(System.Double,System.Double)` and `System.Math.MinMagnitude(System.Double,System.Double)`\
Corresponds to the `maxNumMag` and `minNumMag` IEEE operations, they return the value that is greater or lesser in magnitude of the two inputs (respectively). For example, `Math.MaxMagnitude(2.0, -3.0)` would return `-3.0`.

- `System.Math.ILogB(System.Double)`\
Corresponds to the `logB` IEEE operation that returns an integral value, it returns the integral base-2 log of the input parameter. This method is effectively the same as `floor(log2(x))`, but done with minimal rounding error.

- `System.Math.ScaleB(System.Double,System.Int32)`\
Corresponds to the `scaleB` IEEE operation that takes an integral value, it returns effectively `x * pow(2, n)`, but is done with minimal rounding error.

- `System.Math.Log2(System.Double)`\
Corresponds to the `log2` IEEE operation, it returns the base-2 logarithm. It minimizes rounding error.

- `System.Math.FusedMultiplyAdd(System.Double,System.Double,System.Double)`\
Corresponds to the `fma` IEEE operation, it performs a fused multiply add. That is, it does `(x * y) + z` as a single operation, thereby minimizing the rounding error. An example is `FusedMultiplyAdd(1e308, 2.0, -1e308)`, which returns `1e308`. The regular `(1e308 * 2.0) - 1e308` returns `double.PositiveInfinity`.

- `System.Math.CopySign(System.Double,System.Double)`\
Corresponds to the `copySign` IEEE operation, it returns the value of `x`, but with the sign of `y`.

### .NET Platform-Dependent Intrinsics

APIs have been added that allow access to certain perf-oriented CPU instructions, such as the **SIMD** or **Bit Manipulation instruction** sets. These instructions can help achieve significant performance improvements in certain scenarios, such as processing data efficiently in parallel.

Where appropriate, the .NET libraries have begun using these instructions to improve performance.

For more information, see .NET Platform-Dependent Intrinsics.

### Improved .NET Core Version APIs

Starting with .NET Core 3.0, the version APIs provided with .NET Core now return the information you expect. For example:

```csharp
System.Console.WriteLine($"Environment.Version: {System.Environment.Version}");

// Old result
//   Environment.Version: 4.0.30319.42000
//
// New result
//   Environment.Version: 3.0.0
```

```csharp
System.Console.WriteLine($"RuntimeInformation.FrameworkDescription: {System.Runtime.InteropServices.RuntimeInformation.FrameworkDescription}");

// Old result
//   RuntimeInformation.FrameworkDescription: .NET Core 4.6.27415.71
//
// New result (notice the value includes any preview release information)
//   RuntimeInformation.FrameworkDescription: .NET Core 3.0.0-preview4-27615-11
```

> **Warning:**
> Breaking change. This is technically a breaking change because the versioning scheme has changed.

### Fast built-in JSON support

.NET users have largely relied on Newtonsoft.Json and other popular JSON libraries, which continue to be good choices. `Newtonsoft.Json` uses .NET strings as its base datatype, which is UTF-16 under the hood.

The new built-in JSON support is high-performance, low allocation, and works with UTF-8 encoded JSON text. For more information about the `System.Text.Json` namespace and types, see the following articles:

* JSON serialization in .NET - overview
* How to serialize and deserialize JSON in .NET.
* How to migrate from Newtonsoft.Json to System.Text.Json

### HTTP/2 support

The `System.Net.Http.HttpClient` type supports the HTTP/2 protocol. If HTTP/2 is enabled, the HTTP protocol version is negotiated via TLS/ALPN, and HTTP/2 is used if the server elects to use it.

The default protocol remains HTTP/1.1, but HTTP/2 can be enabled in two different ways. First, you can set the HTTP request message to use HTTP/2:

```csharp
﻿using System;
using System.Net.Http;
using System.Net.Security;
using System.Net.Sockets;
using System.Threading.Tasks;

namespace whats_new
{
    public static class httptest
    {
        public static async Task Request()
        {
            var client = new HttpClient() { BaseAddress = new Uri("https://localhost:5001") };

            // HTTP/1.1 request
            using (var response = await client.GetAsync("/"))
                Console.WriteLine(response.Content);

            // HTTP/2 request
            using (var request = new HttpRequestMessage(HttpMethod.Get, "/") { Version = new Version(2, 0) })
            using (var response = await client.SendAsync(request))
                Console.WriteLine(response.Content);
        }

        public static async Task Client()
        {
            var client = new HttpClient()
            {
                BaseAddress = new Uri("https://localhost:5001"),
                DefaultRequestVersion = new Version(2, 0)
            };

            // HTTP/2 is default
            using (var response = await client.GetAsync("/"))
                Console.WriteLine(response.Content);
        }

        public static void SetAppContext()
        {
            AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);
        }
    }
}
```

Second, you can change `System.Net.Http.HttpClient` to use HTTP/2 by default:

```csharp
﻿using System;
using System.Net.Http;
using System.Net.Security;
using System.Net.Sockets;
using System.Threading.Tasks;

namespace whats_new
{
    public static class httptest
    {
        public static async Task Request()
        {
            var client = new HttpClient() { BaseAddress = new Uri("https://localhost:5001") };

            // HTTP/1.1 request
            using (var response = await client.GetAsync("/"))
                Console.WriteLine(response.Content);

            // HTTP/2 request
            using (var request = new HttpRequestMessage(HttpMethod.Get, "/") { Version = new Version(2, 0) })
            using (var response = await client.SendAsync(request))
                Console.WriteLine(response.Content);
        }

        public static async Task Client()
        {
            var client = new HttpClient()
            {
                BaseAddress = new Uri("https://localhost:5001"),
                DefaultRequestVersion = new Version(2, 0)
            };

            // HTTP/2 is default
            using (var response = await client.GetAsync("/"))
                Console.WriteLine(response.Content);
        }

        public static void SetAppContext()
        {
            AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);
        }
    }
}
```

Many times when you're developing an application, you want to use an unencrypted connection. If you know the target endpoint will be using HTTP/2, you can turn on unencrypted connections for HTTP/2. You can turn it on by setting the `DOTNET_SYSTEM_NET_HTTP_SOCKETSHTTPHANDLER_HTTP2UNENCRYPTEDSUPPORT` environment variable to `1` or by enabling it in the app context:

```csharp
﻿using System;
using System.Net.Http;
using System.Net.Security;
using System.Net.Sockets;
using System.Threading.Tasks;

namespace whats_new
{
    public static class httptest
    {
        public static async Task Request()
        {
            var client = new HttpClient() { BaseAddress = new Uri("https://localhost:5001") };

            // HTTP/1.1 request
            using (var response = await client.GetAsync("/"))
                Console.WriteLine(response.Content);

            // HTTP/2 request
            using (var request = new HttpRequestMessage(HttpMethod.Get, "/") { Version = new Version(2, 0) })
            using (var response = await client.SendAsync(request))
                Console.WriteLine(response.Content);
        }

        public static async Task Client()
        {
            var client = new HttpClient()
            {
                BaseAddress = new Uri("https://localhost:5001"),
                DefaultRequestVersion = new Version(2, 0)
            };

            // HTTP/2 is default
            using (var response = await client.GetAsync("/"))
                Console.WriteLine(response.Content);
        }

        public static void SetAppContext()
        {
            AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);
        }
    }
}
```

## Next steps

- Review the breaking changes between .NET Core 2.2 and 3.0.
- Review the breaking changes in .NET Core 3.0 for Windows Forms apps.
