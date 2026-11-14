---
title: "BinaryData class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/BinaryData.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BinaryData class

Namespace: `System`

```csharp
public class BinaryData
```

A lightweight abstraction for a payload of bytes that supports converting between string, stream, JSON, and bytes.

To be added.

## BinaryData.BinaryData(Byte[]) constructor

```csharp
public BinaryData (byte[] data);
```

Creates a `BinaryData` instance by wrapping the provided byte array.

Parameters:

- `data`: The byte array to wrap.

To be added.

## BinaryData.BinaryData(Byte>) constructor

```csharp
public BinaryData (ReadOnlyMemory<byte> data);
```

Creates a `BinaryData` instance by wrapping the provided bytes.

Parameters:

- `data`: The byte data to wrap.

To be added.

## BinaryData.BinaryData(String) constructor

```csharp
public BinaryData (string data);
```

Creates a `BinaryData` instance from a string by converting the string to bytes using the UTF-8 encoding.

Parameters:

- `data`: The string data.

To be added.

## BinaryData.BinaryData(Byte[], String) constructor

```csharp
public BinaryData (byte[] data, string? mediaType);
```

Creates a `BinaryData` instance by wrapping the provided byte array and sets `BinaryData.MediaType` to  value.

Parameters:

- `data`: The array to wrap.
- `mediaType`: The MIME type of this data, for example, `Application.Octet`.

To be added.

## BinaryData.BinaryData(Byte>, String) constructor

```csharp
public BinaryData (ReadOnlyMemory<byte> data, string? mediaType);
```

Creates a `BinaryData` instance by wrapping the provided bytes and sets `BinaryData.MediaType` to  value.

Parameters:

- `data`: Byte data to wrap.
- `mediaType`: The MIME type of this data, for example, `Application.Octet`.

To be added.

## BinaryData.BinaryData(String, String) constructor

```csharp
public BinaryData (string data, string? mediaType);
```

Creates a `BinaryData` instance from a string by converting the string to bytes using the UTF-8 encoding and sets `BinaryData.MediaType` to  value.

Parameters:

- `data`: The string data.
- `mediaType`: The MIME type of this data, for example, `Application.Octet`.

To be added.

## BinaryData.BinaryData(Object, JsonSerializerOptions, Type) constructor

```csharp
public BinaryData (object? jsonSerializable, System.Text.Json.JsonSerializerOptions? options = default, Type? type = default);
```

Creates a `BinaryData` instance by serializing the provided object to JSON using `JsonSerializer`.

Parameters:

- `jsonSerializable`: The object to serialize to JSON using `JsonSerializer`.
- `options`: The options to use when serializing to JSON.
- `type`: The type to use when serializing the data. If not specified, `Object.GetType` will be used to determine the type.

To be added.

## BinaryData.BinaryData(Object, JsonSerializerContext, Type) constructor

```csharp
public BinaryData (object? jsonSerializable, System.Text.Json.Serialization.JsonSerializerContext context, Type? type = default);
```

Creates a `BinaryData` instance by serializing the provided object to JSON using `JsonSerializer`.

Parameters:

- `jsonSerializable`: The object that will be serialized to JSON using `JsonSerializer`.
- `context`: The `JsonSerializerContext` to use when serializing to JSON.
- `type`: The type to use when serializing the data. If not specified, `Object.GetType` will be used to determine the type.

To be added.

## BinaryData.Empty property

```csharp
public static BinaryData Empty { get; }
```

Returns an empty `BinaryData`.

Returns: To be added.

To be added.

## BinaryData.IsEmpty property

```csharp
public bool IsEmpty { get; }
```

Gets a value that indicates whether this data is empty.

Returns: `true` if the data is empty (that is, its `BinaryData.Length` is 0); otherwise, `false`.

To be added.

## BinaryData.Length property

```csharp
public int Length { get; }
```

Gets the number of bytes of this data.

Returns: The number of bytes of this data.

To be added.

## BinaryData.MediaType property

```csharp
public string? MediaType { get; }
```

Gets the The MIME type of this data, for example, `Application.Octet`.

Returns: To be added.

To be added.

## BinaryData.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified object is equal to the current object.

Parameters:

- `obj`: The object to compare with the current object.

Returns: `true` if the specified object is equal to the current object; otherwise, `false`.

To be added.

## BinaryData.FromBytes(Byte[]) method

```csharp
public static BinaryData FromBytes (byte[] data);
```

Creates a `BinaryData` instance by wrapping the provided byte array.

Parameters:

- `data`: The byte array to wrap.

Returns: A wrapper over `data`.

To be added.

## BinaryData.FromBytes(Byte>) method

```csharp
public static BinaryData FromBytes (ReadOnlyMemory<byte> data);
```

Creates a `BinaryData` instance by wrapping the provided `ReadOnlyMemory<T>`.

Parameters:

- `data`: The byte data to wrap.

Returns: A wrapper over `data`.

To be added.

## BinaryData.FromBytes(Byte[], String) method

```csharp
public static BinaryData FromBytes (byte[] data, string? mediaType);
```

Creates a `BinaryData` instance by wrapping the provided byte array and sets `BinaryData.MediaType` to  value.

Parameters:

- `data`: The array to wrap.
- `mediaType`: The MIME type of this data, for example, `Application.Octet`.

Returns: A wrapper over `data`.

To be added.

## BinaryData.FromBytes(Byte>, String) method

```csharp
public static BinaryData FromBytes (ReadOnlyMemory<byte> data, string? mediaType);
```

Creates a `BinaryData` instance by wrapping the provided `ReadOnlyMemory<T>` and sets `BinaryData.MediaType` to  value.

Parameters:

- `data`: Byte data to wrap.
- `mediaType`: The MIME type of this data, for example, `Application.Octet`.

Returns: A wrapper over `data`.

To be added.

## BinaryData.FromFile(String) method

```csharp
public static BinaryData FromFile (string path);
```

Creates a `BinaryData` instance from the specified file.

Parameters:

- `path`: The path to the file.

Returns: A value representing all of the data from the file.

To be added.

## BinaryData.FromFile(String, String) method

```csharp
public static BinaryData FromFile (string path, string? mediaType);
```

Creates a `BinaryData` instance from the specified file and sets `BinaryData.MediaType` to  value.

Parameters:

- `path`: The path to the file.
- `mediaType`: The MIME type of this data, for example, `Application.Octet`.

Returns: A value representing all of the data from the file.

To be added.

## BinaryData.FromFileAsync(String, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<BinaryData> FromFileAsync (string path, System.Threading.CancellationToken <example-value> = default);
```

Creates a `BinaryData` instance from the specified file.

Parameters:

- `path`: The path to the file.
- `cancellationToken`: A token that can be used to cancel the operation.

Returns: A value representing all of the data from the file.

To be added.

## BinaryData.FromFileAsync(String, String, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<BinaryData> FromFileAsync (string path, string? mediaType, System.Threading.CancellationToken <example-value> = default);
```

Creates a `BinaryData` instance from the specified file and sets `BinaryData.MediaType` to  value.

Parameters:

- `path`: The path to the file.
- `mediaType`: The MIME type of this data, for example, `Application.Octet`.
- `cancellationToken`: A token that can be used to cancel the operation.

Returns: A value representing all of the data from the file.

To be added.

## BinaryData.FromObjectAsJson<T>(T, JsonSerializerOptions) method

```csharp
public static BinaryData FromObjectAsJson<T> (T jsonSerializable, System.Text.Json.JsonSerializerOptions? options = default);
```

Creates a `BinaryData` instance by serializing the provided object using the `JsonSerializer`.

Parameters:

- `T`: The type to use when serializing the data.
- `jsonSerializable`: The data to use.
- `options`: The options to use when serializing to JSON.

Returns: A value representing the UTF-8 encoding of the JSON representation of `jsonSerializable`.

To be added.

## BinaryData.FromObjectAsJson<T>(T, JsonTypeInfo<T>) method

```csharp
public static BinaryData FromObjectAsJson<T> (T jsonSerializable, System.Text.Json.Serialization.Metadata.JsonTypeInfo<T> jsonTypeInfo);
```

Creates a `BinaryData` instance by serializing the provided object using the `JsonSerializer`.

Parameters:

- `T`: The type to use when serializing the data.
- `jsonSerializable`: The data to use.
- `jsonTypeInfo`: The `JsonTypeInfo` to use when serializing to JSON.

Returns: A value representing the UTF-8 encoding of the JSON representation of `jsonSerializable`.

To be added.

## BinaryData.FromStream(Stream) method

```csharp
public static BinaryData FromStream (System.IO.Stream stream);
```

Creates a `BinaryData` instance from the specified stream. The stream is not disposed by this method.

Parameters:

- `stream`: The stream containing the data.

Returns: A value representing all of the data remaining in `stream`.

To be added.

## BinaryData.FromStream(Stream, String) method

```csharp
public static BinaryData FromStream (System.IO.Stream stream, string? mediaType);
```

Creates a `BinaryData` instance from the specified stream and sets `BinaryData.MediaType` to  value.

The stream is not disposed by this method.

Parameters:

- `stream`: Stream containing the data.
- `mediaType`: The MIME type of this data, for example, `Application.Octet`.

Returns: A value representing all of the data remaining in `stream`.

To be added.

## BinaryData.FromStreamAsync(Stream, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<BinaryData> FromStreamAsync (System.IO.Stream stream, System.Threading.CancellationToken <example-value> = default);
```

Creates a `BinaryData` instance from the specified stream. The stream is not disposed by this method.

Parameters:

- `stream`: The stream containing the data.
- `cancellationToken`: A token that can be used to cancel the operation.

Returns: A value representing all of the data remaining in `stream`.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `BinaryData.FromStream`.

## BinaryData.FromStreamAsync(Stream, String, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<BinaryData> FromStreamAsync (System.IO.Stream stream, string? mediaType, System.Threading.CancellationToken <example-value> = default);
```

Creates a `BinaryData` instance from the specified stream and sets `BinaryData.MediaType` to  value.

The stream is not disposed by this method.

Parameters:

- `stream`: Stream containing the data.
- `mediaType`: The MIME type of this data, for example, `Application.Octet`.
- `cancellationToken`: A token that can be used to cancel the operation.

Returns: A value representing all of the data remaining in `stream`.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## BinaryData.FromString(String) method

```csharp
public static BinaryData FromString (string data);
```

Creates a `BinaryData` instance from a string by converting the string to bytes using the UTF-8 encoding.

Parameters:

- `data`: The string data.

Returns: A value representing the UTF-8 encoding of `data`.

To be added.

## BinaryData.FromString(String, String) method

```csharp
public static BinaryData FromString (string data, string? mediaType);
```

Creates a `BinaryData` instance from a string by converting the string to bytes using the UTF-8 encoding and sets `BinaryData.MediaType` to  value.

Parameters:

- `data`: The string data.
- `mediaType`: The MIME type of this data, for example, `Text.Plain`.

Returns: A value representing the UTF-8 encoding of `data`.

To be added.

## BinaryData.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for the current `BinaryData` object.

Returns: A 32-bit signed integer hash code.

To be added.

## BinaryData.op_Implicit(BinaryData) method

```csharp
public static implicit operator ReadOnlyMemory<byte> (BinaryData? data);
```

Defines an implicit conversion from a `BinaryData` to a `ReadOnlyMemory<T>`.

Parameters:

- `data`: The value to be converted.

Returns: A read-only memory of bytes representing the implicitly converted `BinaryData`.

To be added.

## BinaryData.op_Implicit(BinaryData) method

```csharp
public static implicit operator ReadOnlySpan<byte> (BinaryData? data);
```

Defines an implicit conversion from a `BinaryData` to a `ReadOnlySpan<T>`.

Parameters:

- `data`: The value to be converted.

Returns: A read-only span of bytes representing the implicitly converted `BinaryData`.

To be added.

## BinaryData.ToArray() method

```csharp
public byte[] ToArray ();
```

Converts the `BinaryData` to a byte array.

Returns: A byte array representing the data.

To be added.

## BinaryData.ToMemory() method

```csharp
public ReadOnlyMemory<byte> ToMemory ();
```

Gets the value of this instance as bytes without any further interpretation.

Returns: The value of this instance as bytes without any further interpretation.

To be added.

## BinaryData.ToObjectFromJson<T>(JsonSerializerOptions) method

```csharp
public T? ToObjectFromJson<T> (System.Text.Json.JsonSerializerOptions? options = default);
```

Converts the `BinaryData` to the specified type using `JsonSerializer`.

Parameters:

- `T`: The type that the data should be converted to.
- `options`: The `JsonSerializerOptions` to use when serializing to JSON.

Returns: The data converted to the specified type.

To be added.

## BinaryData.ToObjectFromJson<T>(JsonTypeInfo<T>) method

```csharp
public T? ToObjectFromJson<T> (System.Text.Json.Serialization.Metadata.JsonTypeInfo<T> jsonTypeInfo);
```

Converts the `BinaryData` to the specified type using `JsonSerializer`.

Parameters:

- `T`: The type that the data should be converted to.
- `jsonTypeInfo`: The `JsonTypeInfo` to use when serializing to JSON.

Returns: The data converted to the specified type.

To be added.

## BinaryData.ToStream() method

```csharp
public System.IO.Stream ToStream ();
```

Converts the `BinaryData` to a read-only stream.

Returns: A stream representing the data.

To be added.
