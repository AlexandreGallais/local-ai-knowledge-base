---
title: "Supported types in System.Text.Json (part 2 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/serialization/system-text-json/supported-types.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Supported types in System.Text.Json (part 2 of 3)

## Types that serialize as JSON arrays

.NET collection types serialize as JSON arrays. `System.Text.Json.JsonSerializer` supports a collection type for serialization if it:

* Derives from `System.Collections.IEnumerable` or `System.Collections.Generic.IAsyncEnumerable`1`.
* Contains elements that are serializable.

The serializer calls the `System.Collections.IEnumerable.GetEnumerator` method and writes the elements.

Deserialization is more complicated and is not supported for some collection types.

The following sections are organized by namespace and show which types are supported for serialization and deserialization.

* System.Array namespace
* System.Collections namespace
* System.Collections.Generic namespace
* System.Collections.Immutable namespace
* System.Collections.Specialized namespace
* System.Collections.Concurrent namespace
* System.Collections.ObjectModel namespace
* Custom collections

### System.Array namespace

| Type                                                                                            | Serialization | Deserialization |
|-------------------------------------------------------------------------------------------------|---------------|-----------------|
| Single-dimensional arrays* | ✔️ | ✔️     |
| Multi-dimensional arrays    | ❌  | ❌     |
| Jagged arrays                         | ✔️  | ✔️     |

\* `byte[]` is handled specially and serializes as a base64 string, not a JSON array.

### System.Collections namespace

| Type                                      | Serialization | Deserialization |
|-------------------------------------------|---------------|-----------------|
| `System.Collections.ArrayList`       | ✔️           | ✔️              |
| `System.Collections.BitArray`        | ✔️           | ❌              |
| `System.Collections.DictionaryEntry` | ✔️           | ✔️              |
| `System.Collections.Hashtable`       | ✔️           | ✔️              |
| `System.Collections.ICollection`     | ✔️           | ✔️              |
| `System.Collections.IDictionary`     | ✔️           | ✔️              |
| `System.Collections.IEnumerable`     | ✔️           | ✔️              |
| `System.Collections.IList`           | ✔️           | ✔️              |
| `System.Collections.Queue`           | ✔️           | ✔️              |
| `System.Collections.SortedList`      | ✔️           | ✔️              |
| `System.Collections.Stack` \*       | ✔️           | ✔️              |

\* See Support round trip for `Stack` types.

### System.Collections.Generic namespace

| Type                                                      | Serialization | Deserialization |
|-----------------------------------------------------------|---------------|-----------------|
| `System.Collections.Generic.Dictionary`2` \*      | ✔️           | ✔️              |
| `System.Collections.Generic.HashSet`1`             | ✔️           | ✔️              |
| `System.Collections.Generic.IAsyncEnumerable`1` †  | ✔️         | ✔️              |
| `System.Collections.Generic.ICollection`1`         | ✔️           | ✔️              |
| `System.Collections.Generic.IDictionary`2` \*     | ✔️           | ✔️              |
| `System.Collections.Generic.IEnumerable`1`         | ✔️           | ✔️              |
| `System.Collections.Generic.IList`1`               | ✔️           | ✔️              |
| `System.Collections.Generic.IReadOnlyCollection`1` | ✔️           | ✔️              |
| `System.Collections.Generic.IReadOnlyDictionary`2` \* | ✔️        | ✔️              |
| `System.Collections.Generic.IReadOnlyList`1`       | ✔️           | ✔️              |
| `System.Collections.Generic.IReadOnlySet`1` §       | ✔️           | ✔️              |
| `System.Collections.Generic.ISet`1`                | ✔️           | ✔️              |
| `System.Collections.Generic.KeyValuePair`2`        | ✔️           | ✔️              |
| `System.Collections.Generic.LinkedList`1`          | ✔️           | ✔️              |
| `System.Collections.Generic.LinkedListNode`1`      | ✔️           | ❌              |
| `System.Collections.Generic.List`1`                | ✔️           | ✔️              |
| `System.Collections.Generic.Queue`1`               | ✔️           | ✔️              |
| `System.Collections.Generic.SortedDictionary`2` \* | ✔️           | ✔️              |
| `System.Collections.Generic.SortedList`2` \*      | ✔️           | ✔️              |
| `System.Collections.Generic.SortedSet`1`           | ✔️           | ✔️              |
| `System.Collections.Generic.Stack`1` ‡             | ✔️           | ✔️              |

\* See Supported key types.

† See the following section on `IAsyncEnumerable<T>`.

‡ See Support round trip for `Stack` types.

§ `System.Text.Json` supports `System.Collections.Generic.IReadOnlySet`1` in .NET 11 and later versions. When you deserialize the interface, the serializer creates a `System.Collections.Generic.HashSet`1` instance. For generated metadata, `System.Text.Json.Serialization.Metadata.JsonMetadataServices.CreateIReadOnlySetInfo*` creates the collection contract.

#### IAsyncEnumerable\<T>

The following examples use streams as a representation of any async source of data. The source could be files on a local machine, or results from a database query or web service API call.

##### Stream serialization

`System.Text.Json` supports serializing `System.Collections.Generic.IAsyncEnumerable`1` values as JSON arrays, as shown in the following example:

```csharp
﻿using System.Text.Json;

namespace IAsyncEnumerableSerialize;

public class Program
{
    public static async Task Main()
    {
        using Stream stream = Console.OpenStandardOutput();
        var data = new { Data = PrintNumbers(3) };
        await JsonSerializer.SerializeAsync(stream, data);
    }

    static async IAsyncEnumerable<int> PrintNumbers(int n)
    {
        for (int i = 0; i < n; i++)
        {
            await Task.Delay(1000);
            yield return i;
        }
    }
}
// output:
//  {"Data":[0,1,2]}
```
`IAsyncEnumerable<T>` values are only supported by the asynchronous serialization methods, such as `System.Text.Json.JsonSerializer.SerializeAsync*`.

In .NET 11 and later versions, `System.Text.Json.JsonSerializer.SerializeAsyncEnumerable*` writes an `IAsyncEnumerable<T>` sequence to either a `System.IO.Stream` or a `System.IO.Pipelines.PipeWriter`. With the default `topLevelValues: false`, the method writes a single root-level JSON array. Set `topLevelValues: true` to write JSON Lines instead, where each element is a separate top-level value:

```json
{"id":1,"name":"apple"}
{"id":2,"name":"banana"}
```

The method writes a single line feed (LF), `\n`, after every value, including the last. It always uses LF, regardless of `System.Text.Json.JsonSerializerOptions.NewLine`. The method ignores `System.Text.Json.JsonSerializerOptions.WriteIndented`, so each value remains on one line.

##### Stream deserialization

The `DeserializeAsyncEnumerable` method supports streaming deserialization, as shown in the following example:

```csharp
﻿using System.Text;
using System.Text.Json;

namespace IAsyncEnumerableDeserialize;

public class Program
{
    public static async Task Main()
    {
        using var stream = new MemoryStream(Encoding.UTF8.GetBytes("[0,1,2,3,4]"));
        await foreach (int item in JsonSerializer.DeserializeAsyncEnumerable<int>(stream))
        {
            Console.WriteLine(item);
        }
    }
}
// output:
//0
//1
//2
//3
//4
```
By default, `System.Text.Json.JsonSerializer.DeserializeAsyncEnumerable*` reads elements from a single root-level JSON array. Set `topLevelValues: true` to read a sequence of whitespace-separated top-level values instead. This input format is a superset of JSON Lines. Overloads accept either a `System.IO.Stream` or a `System.IO.Pipelines.PipeReader`.

The `System.Text.Json.JsonSerializer.DeserializeAsync*` method supports `IAsyncEnumerable<T>`, but its signature doesn't allow streaming. It returns the final result as a single value, as shown in the following example.

```csharp
﻿using System.Text;
using System.Text.Json;

namespace IAsyncEnumerableDeserializeNonStreaming;

public class MyPoco
{
    public IAsyncEnumerable<int>? Data { get; set; }
}

public class Program
{
    public static async Task Main()
    {
        using var stream = new MemoryStream(Encoding.UTF8.GetBytes(@"{""Data"":[0,1,2,3,4]}"));
        MyPoco? result = await JsonSerializer.DeserializeAsync<MyPoco>(stream)!;
        await foreach (int item in result!.Data!)
        {
            Console.WriteLine(item);
        }
    }
}
// output:
//0
//1
//2
//3
//4
```
In this example, the deserializer buffers all `IAsyncEnumerable<T>` contents in memory before returning the deserialized object. This behavior is necessary because the deserializer needs to read the entire JSON payload before returning a result.

### System.Collections.Immutable namespace

| Type                                                              | Serialization | Deserialization |
|-------------------------------------------------------------------|---------------|-----------------|
| `System.Collections.Immutable.IImmutableDictionary`2` †    | ✔️           | ✔️              |
| `System.Collections.Immutable.IImmutableList`1`            | ✔️           | ✔️              |
| `System.Collections.Immutable.IImmutableQueue`1`           | ✔️           | ✔️              |
| `System.Collections.Immutable.IImmutableSet`1`             | ✔️           | ✔️              |
| `System.Collections.Immutable.IImmutableStack`1` \*       | ✔️           | ✔️              |
| `System.Collections.Immutable.ImmutableArray`1`            | ✔️           | ✔️              |
| `System.Collections.Immutable.ImmutableDictionary`2` †     | ✔️           | ✔️              |
| `System.Collections.Immutable.ImmutableHashSet`1`          | ✔️           | ✔️              |
| `System.Collections.Immutable.ImmutableQueue`1`            | ✔️           | ✔️              |
| `System.Collections.Immutable.ImmutableSortedDictionary`2` † | ✔️         | ✔️              |
| `System.Collections.Immutable.ImmutableSortedSet`1`        | ✔️           | ✔️              |
| `System.Collections.Immutable.ImmutableStack`1` \*        | ✔️           | ✔️              |

\* See Support round trip for `Stack` types.

† See Supported key types.

### System.Collections.Specialized namespace

| Type                                                      | Serialization | Deserialization |
|-----------------------------------------------------------|---------------|-----------------|
| `System.Collections.Specialized.BitVector32`         | ✔️           | ❌\*           |
| `System.Collections.Specialized.HybridDictionary`    | ✔️           | ✔️              |
| `System.Collections.Specialized.IOrderedDictionary`  | ✔️           | ❌              |
| `System.Collections.Specialized.ListDictionary`      | ✔️           | ✔️              |
| `System.Collections.Specialized.NameValueCollection` | ✔️           | ❌              |
| `System.Collections.Specialized.StringCollection`    | ✔️           | ❌              |
| `System.Collections.Specialized.StringDictionary`    | ✔️           | ❌              |

\* When `System.Collections.Specialized.BitVector32` is deserialized, the `System.Collections.Specialized.BitVector32.Data` property is skipped because it doesn't have a public setter. No exception is thrown.

### System.Collections.Concurrent namespace

| Type                                                          | Serialization | Deserialization |
|---------------------------------------------------------------|---------------|-----------------|
| `System.Collections.Concurrent.BlockingCollection`1`   | ✔️           | ❌              |
| `System.Collections.Concurrent.ConcurrentBag`1`        | ✔️           | ❌              |
| `System.Collections.Concurrent.ConcurrentDictionary`2` † | ✔️      | ✔️              |
| `System.Collections.Concurrent.ConcurrentQueue`1`      | ✔️           | ✔️              |
| `System.Collections.Concurrent.ConcurrentStack`1` \*  | ✔️           | ✔️              |

\* See Support round trip for `Stack` types.

† See Supported key types.

### System.Collections.ObjectModel namespace

| Type                                                           | Serialization | Deserialization |
|----------------------------------------------------------------|---------------|-----------------|
| `System.Collections.ObjectModel.Collection`1`           | ✔️            | ✔️             |
| KeyedCollection\<string, TValue> \* |✔️|❌|
| `System.Collections.ObjectModel.ObservableCollection`1` | ✔️            | ✔️             |
| `System.Collections.ObjectModel.ReadOnlyCollection`1`   | ✔️            | ❌             |
| `System.Collections.ObjectModel.ReadOnlyDictionary`2`   | ✔️            | ❌             |
| `System.Collections.ObjectModel.ReadOnlyObservableCollection`1` | ✔️    | ❌             |

\* Non-`string` keys are not supported.
