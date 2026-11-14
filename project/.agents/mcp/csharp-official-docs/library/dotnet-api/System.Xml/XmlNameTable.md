---
title: "XmlNameTable class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlNameTable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlNameTable class

Namespace: `System.Xml`

```csharp
public abstract class XmlNameTable
```

Table of atomized string objects.

#### Remarks
Several classes, such as `XmlDocument` and `XmlReader`, use the `XmlNameTable` class internally to store attribute and element names. When an element or attribute name occurs multiple times in an XML document, it is stored only once in the `XmlNameTable`.

The names are stored as common language runtime (CLR) object types. This enables you to do object comparisons on these strings rather than a more expensive string comparison. These string objects are referred to as "atomized strings".

`XmlNameTable` is implemented in the `NameTable` class.

#### Examples
The following example compares two element names.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNameTable/Overview/nametable.cs._

## XmlNameTable.XmlNameTable() constructor

```csharp
protected XmlNameTable ();
```

Initializes a new instance of the `XmlNameTable` class.

To be added.

## XmlNameTable.Add(String) method

```csharp
public abstract string Add (string array);
```

When overridden in a derived class, atomizes the specified string and adds it to the `XmlNameTable`.

Parameters:

- `array`: The name to add.

Returns: The new atomized string or the existing one if it already exists.

Exceptions:

- `ArgumentNullException`: `array` is `null`.

#### Remarks
For more information on atomized strings, see `XmlNameTable`.

## XmlNameTable.Add(Char[], Int32, Int32) method

```csharp
public abstract string Add (char[] array, int offset, int length);
```

When overridden in a derived class, atomizes the specified string and adds it to the `XmlNameTable`.

Parameters:

- `array`: The character array containing the name to add.
- `offset`: Zero-based index into the array specifying the first character of the name.
- `length`: The number of characters in the name.

Returns: The new atomized string or the existing one if it already exists. If length is zero, String.Empty is returned.

Exceptions:

- `IndexOutOfRangeException`: 0 > `offset`

-or-

`offset` >= `array`.Length

-or-

`length` > `array`.Length

The above conditions do not cause an exception to be thrown if `length` =0.
- `ArgumentOutOfRangeException`: `length` < 0.

#### Remarks
For more information on atomized strings, see `XmlNameTable`.

## XmlNameTable.Get(String) method

```csharp
public abstract string? Get (string array);
```

When overridden in a derived class, gets the atomized string containing the same value as the specified string.

Parameters:

- `array`: The name to look up.

Returns: The atomized string or `null` if the string has not already been atomized.

Exceptions:

- `ArgumentNullException`: `array` is `null`.

#### Remarks
For more information on atomized strings, see `XmlNameTable`.

## XmlNameTable.Get(Char[], Int32, Int32) method

```csharp
public abstract string? Get (char[] array, int offset, int length);
```

When overridden in a derived class, gets the atomized string containing the same characters as the specified range of characters in the given array.

Parameters:

- `array`: The character array containing the name to look up.
- `offset`: The zero-based index into the array specifying the first character of the name.
- `length`: The number of characters in the name.

Returns: The atomized string or `null` if the string has not already been atomized. If `length` is zero, String.Empty is returned.

Exceptions:

- `IndexOutOfRangeException`: 0 > `offset`

-or-

`offset` >= `array`.Length

-or-

`length` > `array`.Length

The above conditions do not cause an exception to be thrown if `length` =0.
- `ArgumentOutOfRangeException`: `length` < 0.

#### Remarks
For more information on atomized strings, see `XmlNameTable`.
