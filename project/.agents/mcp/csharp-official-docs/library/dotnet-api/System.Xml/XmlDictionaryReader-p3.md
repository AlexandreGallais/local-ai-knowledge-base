---
title: "XmlDictionaryReader class (part 3 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlDictionaryReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlDictionaryReader class (part 3 of 5)

## XmlDictionaryReader.ReadArray(String, String, Boolean[], Int32, Int32) method

```csharp
public virtual int ReadArray (string localName, string namespaceUri, bool[] array, int offset, int count);
```

Reads repeated occurrences of `Boolean` nodes into a typed array.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The local name of the element.
- `array`: The array into which the nodes are put.
- `offset`: The starting index in the array.
- `count`: The number of nodes to put in the array.

Returns: The number of nodes put in the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryReader.ReadArray(String, String, DateTime[], Int32, Int32) method

```csharp
public virtual int ReadArray (string localName, string namespaceUri, DateTime[] array, int offset, int count);
```

Reads repeated occurrences of `DateTime` nodes into a typed array.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array into which the nodes are put.
- `offset`: The starting index in the array.
- `count`: The number of nodes to put in the array.

Returns: The number of nodes put in the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryReader.ReadArray(String, String, Decimal[], Int32, Int32) method

```csharp
public virtual int ReadArray (string localName, string namespaceUri, decimal[] array, int offset, int count);
```

Reads repeated occurrences of `Decimal` nodes into a typed array.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array into which the nodes are put.
- `offset`: The starting index in the array.
- `count`: The number of nodes to put in the array.

Returns: The number of nodes put in the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryReader.ReadArray(String, String, Double[], Int32, Int32) method

```csharp
public virtual int ReadArray (string localName, string namespaceUri, double[] array, int offset, int count);
```

Reads repeated occurrences of `Double` nodes into a typed array.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array into which the nodes are put.
- `offset`: The starting index in the array.
- `count`: The number of nodes to put in the array.

Returns: The number of nodes put in the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryReader.ReadArray(String, String, Guid[], Int32, Int32) method

```csharp
public virtual int ReadArray (string localName, string namespaceUri, Guid[] array, int offset, int count);
```

Reads repeated occurrences of `Guid` nodes into a typed array.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array into which the nodes are put.
- `offset`: The starting index in the array.
- `count`: The number of nodes to put in the array.

Returns: The number of nodes put in the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryReader.ReadArray(String, String, Int16[], Int32, Int32) method

```csharp
public virtual int ReadArray (string localName, string namespaceUri, short[] array, int offset, int count);
```

Reads repeated occurrences of `short` integers into a typed array.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array into which the integers are put.
- `offset`: The starting index in the array.
- `count`: The number of integers to put in the array.

Returns: The number of integers put in the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryReader.ReadArray(String, String, Int32[], Int32, Int32) method

```csharp
public virtual int ReadArray (string localName, string namespaceUri, int[] array, int offset, int count);
```

Reads repeated occurrences of integers into a typed array.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array into which the integers are put.
- `offset`: The starting index in the array.
- `count`: The number of integers to put in the array.

Returns: The number of integers put in the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryReader.ReadArray(String, String, Int64[], Int32, Int32) method

```csharp
public virtual int ReadArray (string localName, string namespaceUri, long[] array, int offset, int count);
```

Reads repeated occurrences of `long` integers into a typed array.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array into which the integers are put.
- `offset`: The starting index in the array.
- `count`: The number of integers to put in the array.

Returns: The number of integers put in the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryReader.ReadArray(String, String, Single[], Int32, Int32) method

```csharp
public virtual int ReadArray (string localName, string namespaceUri, float[] array, int offset, int count);
```

Reads repeated occurrences of `float` numbers into a typed array.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array into which the float numbers are put.
- `offset`: The starting index in the array.
- `count`: The number of float numbers to put in the array.

Returns: The umber of float numbers put in the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryReader.ReadArray(String, String, TimeSpan[], Int32, Int32) method

```csharp
public virtual int ReadArray (string localName, string namespaceUri, TimeSpan[] array, int offset, int count);
```

Reads repeated occurrences of `TimeSpan` nodes into a typed array.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array into which the nodes are put.
- `offset`: The starting index in the array.
- `count`: The number of nodes to put in the array.

Returns: The number of nodes put in the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryReader.ReadArray(XmlDictionaryString, XmlDictionaryString, Boolean[], Int32, Int32) method

```csharp
public virtual int ReadArray (System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString namespaceUri, bool[] array, int offset, int count);
```

Reads repeated occurrences of `Boolean` nodes into a typed array.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array into which the nodes are put.
- `offset`: The starting index in the array.
- `count`: The number of nodes to put in the array.

Returns: The number of nodes put in the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryReader.ReadArray(XmlDictionaryString, XmlDictionaryString, DateTime[], Int32, Int32) method

```csharp
public virtual int ReadArray (System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString namespaceUri, DateTime[] array, int offset, int count);
```

Reads repeated occurrences of `DateTime` nodes into a typed array.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array into which the nodes are put.
- `offset`: The starting index in the array.
- `count`: The number of nodes to put in the array.

Returns: The number of nodes put in the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryReader.ReadArray(XmlDictionaryString, XmlDictionaryString, Decimal[], Int32, Int32) method

```csharp
public virtual int ReadArray (System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString namespaceUri, decimal[] array, int offset, int count);
```

Reads repeated occurrences of `Decimal` nodes into a typed array.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array into which the nodes are put.
- `offset`: The starting index in the array.
- `count`: The number of nodes to put in the array.

Returns: The number of nodes put in the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryReader.ReadArray(XmlDictionaryString, XmlDictionaryString, Double[], Int32, Int32) method

```csharp
public virtual int ReadArray (System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString namespaceUri, double[] array, int offset, int count);
```

Reads repeated occurrences of `Double` nodes type into a typed array.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array into which the nodes are put.
- `offset`: The starting index in the array.
- `count`: The number of nodes to put in the array.

Returns: The number of nodes put in the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryReader.ReadArray(XmlDictionaryString, XmlDictionaryString, Guid[], Int32, Int32) method

```csharp
public virtual int ReadArray (System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString namespaceUri, Guid[] array, int offset, int count);
```

Reads repeated occurrences of `Guid` nodes into a typed array.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array into which the nodes are put.
- `offset`: The starting index in the array.
- `count`: The number of nodes to put in the array.

Returns: The number of nodes put in the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryReader.ReadArray(XmlDictionaryString, XmlDictionaryString, Int16[], Int32, Int32) method

```csharp
public virtual int ReadArray (System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString namespaceUri, short[] array, int offset, int count);
```

Reads repeated occurrences of `short` integers into a typed array.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array into which the integers are put.
- `offset`: The starting index in the array.
- `count`: The number of integers to put in the array.

Returns: The number of integers put in the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryReader.ReadArray(XmlDictionaryString, XmlDictionaryString, Int32[], Int32, Int32) method

```csharp
public virtual int ReadArray (System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString namespaceUri, int[] array, int offset, int count);
```

Reads repeated occurrences of integers into a typed array.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array into which the integers are put.
- `offset`: The starting index in the array.
- `count`: The number of integers to put in the array.

Returns: The number of integers put in the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.

## XmlDictionaryReader.ReadArray(XmlDictionaryString, XmlDictionaryString, Int64[], Int32, Int32) method

```csharp
public virtual int ReadArray (System.Xml.XmlDictionaryString localName, System.Xml.XmlDictionaryString namespaceUri, long[] array, int offset, int count);
```

Reads repeated occurrences of `long` integers into a typed array.

Parameters:

- `localName`: The local name of the element.
- `namespaceUri`: The namespace URI of the element.
- `array`: The array into which the integers are put.
- `offset`: The starting index in the array.
- `count`: The number of integers to put in the array.

Returns: The number of integers put in the array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` is < 0 or > `array` length.

-or-

`count` is < 0 or > `array` length minus `offset`.

To be added.
