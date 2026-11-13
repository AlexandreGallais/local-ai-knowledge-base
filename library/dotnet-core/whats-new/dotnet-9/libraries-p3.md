---
title: "What's new in .NET libraries for .NET 9 (part 3 of 6)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/whats-new/dotnet-9/libraries.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# What's new in .NET libraries for .NET 9 (part 3 of 6)

## LINQ

New methods `System.Linq.Enumerable.CountBy*` and `System.Linq.Enumerable.AggregateBy*` have been introduced. These methods make it possible to aggregate state by key <example-value> needing to allocate intermediate groupings via `System.Linq.Enumerable.GroupBy*`.

`System.Linq.Enumerable.CountBy*` lets you quickly calculate the frequency of each key. The following example finds the word that occurs most frequently in a text string.

```csharp
string sourceText = """
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Sed non risus. Suspendisse lectus tortor, dignissim sit amet, 
    adipiscing nec, ultricies sed, dolor. Cras elementum ultrices amet diam.
""";

// Find the most frequent word in the text.
KeyValuePair<string, int> mostFrequentWord = sourceText
    .Split(new char[] { ' ', '.', ',' }, StringSplitOptions.RemoveEmptyEntries)
    .Select(word => word.ToLowerInvariant())
    .CountBy(word => word)
    .MaxBy(pair => pair.Value);

Console.WriteLine(mostFrequentWord.Key); // amet
```
`System.Linq.Enumerable.AggregateBy*` lets you implement more general-purpose workflows. The following example shows how you can calculate scores that are associated with a given key.

```csharp
(string id, int score)[] data =
    [
        ("0", 42),
        ("1", 5),
        ("2", 4),
        ("1", 10),
        ("0", 25),
    ];

var aggregatedData =
    data.AggregateBy(
        keySelector: entry => entry.id,
        seed: 0,
        (totalScore, curr) => totalScore + curr.score
        );

foreach (var item in aggregatedData)
{
    Console.WriteLine(item);
}
//(0, 67)
//(1, 15)
//(2, 4)
```
`System.Linq.Enumerable.Index``1(System.Collections.Generic.IEnumerable{``0})` makes it possible to quickly extract the implicit index of an enumerable. You can now write code such as the following snippet to automatically index items in a collection.

```csharp
IEnumerable<string> lines2 = File.ReadAllLines("output.txt");
foreach ((int index, string line) in lines2.Index())
{
    Console.WriteLine($"Line number: {index + 1}, Line: {line}");
}
```
## Logging source generator

C# 12 introduced primary constructors, which allow you to define a constructor directly on the class declaration. The logging source generator now supports logging using classes that have a primary constructor.

```csharp
public partial class ClassWithPrimaryConstructor(ILogger logger)
{
    [LoggerMessage(0, LogLevel.Debug, "Test.")]
    public partial void Test();
}
```

## Miscellaneous

In this section, find information about:

- `allows ref struct` used in libraries
- `SearchValues` expansion

### `allows ref struct` used in libraries

C# 13 introduces the ability to constrain a generic parameter with `allows ref struct`, which tells the compiler and runtime that a `ref struct` can be used for that generic parameter. Many APIs that are compatible with this have now been annotated. For example, the `System.String.Create*` method has an overload that lets you create a `string` by writing directly into its memory, represented as a span. This method has a `TState` argument that's passed from the caller into the delegate that does the actual writing.

That `TState` type parameter on `String.Create` is now annotated with `allows ref struct`:

```csharp
public static string Create<TState>(int length, TState state, SpanAction<char, TState> action)
    where TState : allows ref struct;
```

This annotation enables you to pass a span (or any other `ref struct`) as input to this method.

The following example shows a new `System.String.ToLowerInvariant` overload that uses this capability.

```csharp
public static string ToLowerInvariant(ReadOnlySpan<char> input) =>
    string.Create(span.Length, input, static (stringBuffer, input) => span.ToLowerInvariant(stringBuffer));
```

### `SearchValues` expansion

.NET 8 introduced the `System.Buffers.SearchValues`1` type, which provides an optimized solution for searching for specific sets of characters or bytes within spans. In .NET 9, `SearchValues` has been extended to support searching for substrings within a larger string.

The following example searches for multiple animal names within a string value, and returns an index to the first one found.

```csharp
﻿using System;
using System.Buffers;

internal class SearchValuesExamples
{
    private static readonly SearchValues<string> s_animals =
        SearchValues.Create(["cat", "mouse", "dog", "dolphin"], StringComparison.OrdinalIgnoreCase);

    public static int IndexOfAnimal(string text) =>
        text.AsSpan().IndexOfAny(s_animals);
}
```
This new capability has an optimized implementation that takes advantage of the SIMD support in the underlying platform. It also enables higher-level types to be optimized. For example, `System.Text.RegularExpressions.Regex` now utilizes this functionality as part of its implementation.

## Networking

- SocketsHttpHandler is default in HttpClientFactory
- System.Net.ServerSentEvents
- TLS resume with client certificates on Linux
- WebSocket keep-alive ping and timeout
- HttpClientFactory no longer logs header values by default

### SocketsHttpHandler is default in HttpClientFactory

`HttpClientFactory` creates `System.Net.Http.HttpClient` objects backed by `System.Net.Http.HttpClientHandler`, by default. `HttpClientHandler` is itself backed by `System.Net.Http.SocketsHttpHandler`, which is much more configurable, including around connection lifetime management. `HttpClientFactory` now uses `SocketsHttpHandler` by default and configures it to set limits on its connection lifetimes to match that of the rotation lifetime specified in the factory.

### System.Net.ServerSentEvents

Server-sent events (SSE) is a simple and popular protocol for streaming data from a server to a client. It's used, for example, by OpenAI as part of streaming generated text from its AI services. To simplify the consumption of SSE, the new `System.Net.ServerSentEvents` library provides a parser for easily ingesting server-sent events.

The following code demonstrates using the new class.

```csharp
Stream responseStream = new MemoryStream();
await foreach (SseItem<string> e in SseParser.Create(responseStream).EnumerateAsync())
{
    Console.WriteLine(e.Data);
}
```
### TLS resume with client certificates on Linux

_TLS resume_ is a feature of the TLS protocol that allows resuming previously established sessions to a server. Doing so avoids a few roundtrips and saves computational resources during TLS handshake.

_TLS resume_ has already been supported on Linux for SslStream connections without client certificates. .NET 9 adds support for TLS resume of mutually authenticated TLS connections, which are common in server-to-server scenarios. The feature is enabled automatically.

### WebSocket keep-alive ping and timeout

New APIs on `System.Net.WebSockets.ClientWebSocketOptions` and `System.Net.WebSockets.WebSocketCreationOptions` let you opt in to sending `System.Net.WebSockets.WebSocket` pings and aborting the connection if the peer doesn't respond in time.

Until now, you could specify a `System.Net.WebSockets.ClientWebSocketOptions.KeepAliveInterval` to keep the connection from staying idle, but there was no built-in mechanism to enforce that the peer is responding.

The following example pings the server every 5 seconds and aborts the connection if it doesn't respond within a second.

```csharp
using var cws = new ClientWebSocket();
cws.Options.HttpVersionPolicy = HttpVersionPolicy.RequestVersionOrHigher;
cws.Options.KeepAliveInterval = TimeSpan.FromSeconds(5);
cws.Options.KeepAliveTimeout = TimeSpan.FromSeconds(1);

await cws.ConnectAsync(uri, httpClient, cancellationToken);
```
### HttpClientFactory no longer logs header values by default

`Microsoft.Extensions.Logging.LogLevel.Trace` events logged by `HttpClientFactory` no longer include header values by default. You can opt in to logging values for specific headers via the `Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.RedactLoggedHeaders*` helper method.

The following example redacts all headers, except for the user agent.

```csharp
services.AddHttpClient("myClient")
    .RedactLoggedHeaders(name => name != "User-Agent");
```

For more information, see HttpClientFactory logging redacts header values by default.

## Reflection

- Persisted assemblies
- Type-name parsing

### Persisted assemblies

In .NET Core versions and .NET 5-8, support for building an assembly and emitting reflection metadata for dynamically created types was limited to a runnable `System.Reflection.Emit.AssemblyBuilder`. The lack of support for _saving_ an assembly was often a blocker for customers migrating from .NET Framework to .NET. .NET 9 adds a new type, `System.Reflection.Emit.PersistedAssemblyBuilder`, that you can use to save an emitted assembly.

To create a `PersistedAssemblyBuilder` instance, call its constructor and pass the assembly name, the core assembly, `System.Private.CoreLib`, to reference base runtime types, and optional custom attributes. After you emit all members to the assembly, call the `System.Reflection.Emit.PersistedAssemblyBuilder.Save(System.String)` method to create an assembly with default settings. If you want to set the entry point or other options, you can call `System.Reflection.Emit.PersistedAssemblyBuilder.GenerateMetadata*` and use the metadata it returns to save the assembly. The following code shows an example of creating a persisted assembly and setting the entry point.

```csharp
public void CreateAndSaveAssembly(string assemblyPath)
{
    PersistedAssemblyBuilder ab = new PersistedAssemblyBuilder(
        new AssemblyName("MyAssembly"),
        typeof(object).Assembly
        );
    TypeBuilder tb = ab.DefineDynamicModule("MyModule")
        .DefineType("MyType", TypeAttributes.Public | TypeAttributes.Class);

    MethodBuilder entryPoint = tb.DefineMethod(
        "Main",
        MethodAttributes.HideBySig | MethodAttributes.Public | MethodAttributes.Static
        );
    ILGenerator il = entryPoint.GetILGenerator();
    // ...
    il.Emit(OpCodes.Ret);

    tb.CreateType();

    MetadataBuilder metadataBuilder = ab.GenerateMetadata(
        out BlobBuilder ilStream,
        out BlobBuilder fieldData
        );
    PEHeaderBuilder peHeaderBuilder = new PEHeaderBuilder(
                    imageCharacteristics: Characteristics.ExecutableImage);

    ManagedPEBuilder peBuilder = new ManagedPEBuilder(
                    header: peHeaderBuilder,
                    metadataRootBuilder: new MetadataRootBuilder(metadataBuilder),
                    ilStream: ilStream,
                    mappedFieldData: fieldData,
                    entryPoint: MetadataTokens.MethodDefinitionHandle(entryPoint.MetadataToken)
                    );

    BlobBuilder peBlob = new BlobBuilder();
    peBuilder.Serialize(peBlob);

    using var fileStream = new FileStream("MyAssembly.exe", FileMode.Create, FileAccess.Write);
    peBlob.WriteContentTo(fileStream);
}

public static void UseAssembly(string assemblyPath)
{
    Assembly assembly = Assembly.LoadFrom(assemblyPath);
    Type? type = assembly.GetType("MyType");
    MethodInfo? method = type?.GetMethod("SumMethod");
    Console.WriteLine(method?.Invoke(null, [5, 10]));
}
```
The new `System.Reflection.Emit.PersistedAssemblyBuilder` class includes PDB support. You can emit symbol info and use it to debug a generated assembly. The API has a similar shape to the .NET Framework implementation. For more information, see Emit symbols and generate PDB.

### Type-name parsing

`System.Reflection.Metadata.TypeName` is a parser for ECMA-335 type names that provides much the same functionality as `System.Type` but is decoupled from the runtime environment. Components like serializers and compilers need to parse and process type names. For example, the Native AOT compiler has switched to using `System.Reflection.Metadata.TypeName`.

The new `TypeName` class provides:

- Static `Parse` and `TryParse` methods for parsing input represented as `ReadOnlySpan<char>`. Both methods accept an instance of `TypeNameParseOptions` class (an option bag) that lets you customize the parsing.
- `Name`, `FullName`, and `AssemblyQualifiedName` properties that work exactly like their counterparts in `System.Type`.
- Multiple properties and methods that provide additional information about the name itself:

  - `IsArray`, `IsSZArray` (`SZ` stands for single-dimension, zero-indexed array), `IsVariableBoundArrayType`, and `GetArrayRank` for working with arrays.
  - `IsConstructedGenericType`, `GetGenericTypeDefinition`, and `GetGenericArguments` for working with generic type names.
  - `IsByRef` and `IsPointer` for working with pointers and managed references.
  - `GetElementType()` for working with pointers, references, and arrays.
  - `IsNested` and `DeclaringType` for working with nested types.
  - `AssemblyName`, which exposes the assembly name information via the new `System.Reflection.Metadata.AssemblyNameInfo` class. In contrast to `AssemblyName`, the new type is _immutable_, and parsing culture names doesn't create instances of `CultureInfo`.

Both `TypeName` and `AssemblyNameInfo` types are immutable and don'<example-value>'t implement `IEquatable`). Comparing assembly names is simple, but different scenarios need to compare only a subset of exposed information (`Name`, `Version`, `CultureName`, and `PublicKeyOrToken`).

The following code snippet shows some example usage.

```csharp
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;

internal class RestrictedSerializationBinder
{
    Dictionary<string, Type> AllowList { get; set; }

    RestrictedSerializationBinder(Type[] allowedTypes)
        => AllowList = allowedTypes.ToDictionary(type => type.FullName!);

    Type? GetType(ReadOnlySpan<char> untrustedInput)
    {
        if (!TypeName.TryParse(untrustedInput, out TypeName? parsed))
        {
            throw new InvalidOperationException($"Invalid type name: '{untrustedInput.ToString()}'");
        }

        if (AllowList.TryGetValue(parsed.FullName, out Type? type))
        {
            return type;
        }
        else if (parsed.IsSimple // It's not generic, pointer, reference, or an array.
            && parsed.AssemblyName is not null
            && parsed.AssemblyName.Name == "MyTrustedAssembly"
            )
        {
            return Type.GetType(parsed.AssemblyQualifiedName, throwOnError: true);
        }

        throw new InvalidOperationException($"Not allowed: '{untrustedInput.ToString()}'");
    }
}
```
The new APIs are available from the `System.Reflection.Metadata` NuGet package, which can be used with down-level .NET versions.
