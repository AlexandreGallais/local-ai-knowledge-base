---
title: "KeyValuePair<TKey,TValue> struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/KeyValuePair`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# KeyValuePair<TKey,TValue> struct

Namespace: `System.Collections.Generic`

```csharp
public readonly struct KeyValuePair<TKey,TValue>
```

Defines a key/value pair that can be set or retrieved.

Parameters:

- `TKey`: The type of the key.
- `TValue`: The type of the value.

#### Remarks
The `Current` property returns an instance of this type.

The `foreach` statement of the C# language (`For Each` in Visual Basic) returns an object of the type of the elements in the collection. Since each element of a collection based on `IDictionary<T1,T2>` is a key/value pair, the element type is not the type of the key or the type of the value. Instead, the element type is `KeyValuePair<T1,T2>`. For example:

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/Overview/source2.cs._

The `foreach` statement is a wrapper around the enumerator, which allows only reading from, not writing to, the collection.

#### Examples
The following code example shows how to enumerate the keys and values in a dictionary, using the `KeyValuePair<T1,T2>` structure.

This code is part of a larger example provided for the `Dictionary<T1,T2>` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/Overview/source.cs._

## KeyValuePair<TKey,TValue>.KeyValuePair(TKey, TValue) constructor

```csharp
public KeyValuePair (TKey key, TValue value);
```

Initializes a new instance of the `KeyValuePair<T1,T2>` structure with the specified key and value.

Parameters:

- `key`: The object defined in each key/value pair.
- `value`: The definition associated with `key`.

To be added.

## KeyValuePair<TKey,TValue>.Key <example-value>

```csharp
public TKey Key { get; }
```

Gets the key in the key/value pair.

Returns: A `TKey` that is the key of the `KeyValuePair<T1,T2>`.

#### Remarks
This property is read/only.

#### Examples
The following code example shows how to enumerate the keys and values in a dictionary, using the `KeyValuePair<T1,T2>` structure.

This code is part of a larger example provided for the `Dictionary<T1,T2>` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/Overview/source.cs._

## KeyValuePair<TKey,TValue>.Value property

```csharp
public TValue Value { get; }
```

Gets the value in the key/value pair.

Returns: A `TValue` that is the value of the `KeyValuePair<T1,T2>`.

#### Remarks
This property is read/only.

#### Examples
The following code example shows how to enumerate the keys and values in a dictionary, using the `KeyValuePair<T1,T2>` structure.

This code is part of a larger example provided for the `Dictionary<T1,T2>` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/Overview/source.cs._

## KeyValuePair<TKey,TValue>.Deconstruct(TKey, TValue) method

```csharp
public void Deconstruct (out TKey key, out TValue value);
```

Deconstructs the current `KeyValuePair<T1,T2>`.

Parameters:

- `key`: The key of the current `KeyValuePair<T1,T2>`.
- `value`: The value of the current `KeyValuePair<T1,T2>`.

To be added.

## KeyValuePair<TKey,TValue>.ToString() method

```csharp
public override string ToString ();
```

Returns a string representation of the `KeyValuePair<T1,T2>`, using the string representations of the key and value.

Returns: A string representation of the `KeyValuePair<T1,T2>`, which includes the string representations of the key and value.

#### Remarks
The string representation consists of the string representations of the key and value, separated by a comma and a space, and enclosed in square brackets. For example, the `KeyValuePair<T1,T2>.ToString` method for a `KeyValuePair<T1,T2>` structure with the string `KeyValuePair<T1,T2>.Key` "Test" and the integer `KeyValuePair<T1,T2>.Value` 14 returns the string "[Test, 14]".

> **Note:**
>  This method uses the `ToString` methods provided by the key and value types. Some types do not return useful or informative values for their `ToString` methods.
