---
title: "ZstandardDictionary class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/ZstandardDictionary.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ZstandardDictionary class

Namespace: `System.IO.Compression`

```csharp
public sealed class ZstandardDictionary : IDisposable
```

To be added.

To be added.

## ZstandardDictionary.Data property

```csharp
public ReadOnlyMemory<byte> Data { get; }
```

To be added.

Returns: To be added.

To be added.

## ZstandardDictionary.Create(Byte>) method

```csharp
public static System.IO.Compression.ZstandardDictionary Create (ReadOnlySpan<byte> buffer);
```

To be added.

Parameters:

- `buffer`: To be added.

Returns: To be added.

To be added.

## ZstandardDictionary.Create(Byte>, Int32) method

```csharp
public static System.IO.Compression.ZstandardDictionary Create (ReadOnlySpan<byte> buffer, int quality);
```

To be added.

Parameters:

- `buffer`: To be added.
- `quality`: To be added.

Returns: To be added.

To be added.

## ZstandardDictionary.Dispose() method

```csharp
public void Dispose ();
```

To be added.

To be added.

## ZstandardDictionary.Train(Byte>, Int32>, Int32) method

```csharp
public static byte[] Train (ReadOnlySpan<byte> samples, ReadOnlySpan<int> sampleLengths, int maxDictionarySize);
```

To be added.

Parameters:

- `samples`: To be added.
- `sampleLengths`: To be added.
- `maxDictionarySize`: To be added.

Returns: To be added.

To be added.
