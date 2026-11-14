---
title: "DictionaryEntry struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/DictionaryEntry.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DictionaryEntry struct

Namespace: `System.Collections`

```csharp
public struct DictionaryEntry
```

Defines a dictionary key/value pair that can be set or retrieved.

#### Remarks
The `IDictionaryEnumerator.Entry` method returns an instance of this type.

> **Important:**
>  We don't recommend that you use the `DictionaryEntry` structure for new development. Instead, we recommend that you use a generic `KeyValuePair<T1,T2>` structure along with the `Dictionary<T1,T2>` class. For more information, see Non-generic collections shouldn't be used on GitHub.

The C# foreach statement and the Visual Basic For Each statement require the type of each element in the collection. Since each element of the `IDictionary` is a key/value pair, the element type is not the type of the key or the type of the value. Instead, the element type is `DictionaryEntry`. For example:

_Code sample not included: ~/snippets/csharp/System.Collections/DictionaryEntry/Overview/DictionaryEntrySample.cs._

The `foreach` statement is a wrapper around the enumerator, which only allows reading from, not writing to, the collection.

#### Examples
The following example demonstrates the use of `DictionaryEntry` to iterate through a `Hashtable` object.

_Code sample not included: ~/snippets/csharp/System.Collections/DictionaryEntry/Overview/DictionaryEntrySample.cs._

## DictionaryEntry.DictionaryEntry(Object, Object) constructor

```csharp
public DictionaryEntry (object key, object? value);
```

Initializes an instance of the `DictionaryEntry` type with the specified key and value.

Parameters:

- `key`: The object defined in each key/value pair.
- `value`: The definition associated with `key`.

To be added.

## DictionaryEntry.Key <example-value>

```csharp
public object Key { get; set; }
```

Gets or sets the key in the key/value pair.

Returns: The key in the key/value pair.

#### Examples
The following example demonstrates the `Key` property. This code example is part of a larger example provided for the `DictionaryEntry` class.

_Code sample not included: ~/snippets/csharp/System.Collections/DictionaryEntry/Key/Dictionary.cs._

## DictionaryEntry.Value property

```csharp
public object? Value { get; set; }
```

Gets or sets the value in the key/value pair.

Returns: The value in the key/value pair.

#### Examples
The following example demonstrates the `Value` property. This code example is part of a larger example provided for the `DictionaryEntry` class.

_Code sample not included: ~/snippets/csharp/System.Collections/DictionaryEntry/Key/Dictionary.cs._

## DictionaryEntry.Deconstruct(Object, Object) method

```csharp
public void Deconstruct (out object key, out object? value);
```

Deconstructs the current `DictionaryEntry`.

Parameters:

- `key`: The key of the current `DictionaryEntry`.
- `value`: The value of the current `DictionaryEntry`.

To be added.
