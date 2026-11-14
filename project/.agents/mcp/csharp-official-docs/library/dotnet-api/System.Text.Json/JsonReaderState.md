---
title: "JsonReaderState struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/JsonReaderState.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonReaderState struct

Namespace: `System.Text.Json`

```csharp
public readonly struct JsonReaderState
```

Defines an opaque type that holds and saves all the relevant state information, which must be provided to the `Utf8JsonReader` to continue reading after processing incomplete data.

#### Remarks

`JsonReaderState` is required to support reentrancy when reading incomplete data, and to continue reading once more data is available.
Unlike the `Utf8JsonReader` struct, which is a ref struct,
this type can survive across async/await boundaries, and hence it's required to provide support for reading more data asynchronously before continuing with a new instance of the `Utf8JsonReader`.

## JsonReaderState.JsonReaderState(JsonReaderOptions) constructor

```csharp
public JsonReaderState (System.Text.Json.JsonReaderOptions options = default);
```

Constructs a new `JsonReaderState` instance.

Parameters:

- `options`: Defines the customized behavior of the `Utf8JsonReader` that is different from the JSON RFC (for example how to handle comments, or the maximum depth allowed when reading). By default, the `Utf8JsonReader` follows the JSON RFC strictly (comments within the JSON are invalid) and reads up to a maximum depth of 64.

Exceptions:

- `ArgumentException`: The maximum depth is set to a non-positive value (< 0).

<format>

An instance of this state must be passed to the `Utf8JsonReader` constructor with the JSON data. Unlike the `Utf8JsonReader`, which is a ref struct, the state can survive across async/await boundaries and hence this type is required to provide support for reading in more data asynchronously before continuing with a new instance of the `Utf8JsonReader`.

</format>

## JsonReaderState.Options property

```csharp
public System.Text.Json.JsonReaderOptions Options { get; }
```

Gets the custom behavior to use when reading JSON data using the `Utf8JsonReader` struct that may deviate from strict adherence to the JSON specification, which is the default behavior.

Returns: The custom behavior to use when reading JSON data.

To be added.
