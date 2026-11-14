---
title: "NameTable class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/NameTable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NameTable class

Namespace: `System.Xml`

```csharp
public class NameTable : System.Xml.XmlNameTable
```

Implements a single-threaded `XmlNameTable`.

#### Remarks
Several classes, such as `XmlDocument` and `XmlReader`, use the `NameTable` class internally to store attribute and element names. When an element or attribute name occurs multiple times in an XML document, it is stored only once in the `NameTable`.

The names are stored as common language runtime (CLR) object types. This enables you to do object comparisons on these strings rather than a more expensive string comparison. These string objects are referred to as atomized strings.

#### Examples
The following example compares two element names.

_Code sample not included: ~/snippets/csharp/System.Xml/NameTable/Overview/nametable.cs._

## NameTable.NameTable() constructor

```csharp
public NameTable ();
```

Initializes a new instance of the `NameTable` class.

#### Remarks
Constructs an empty NameTable.

## NameTable.Add(String) method

```csharp
public override string Add (string key);
```

Atomizes the specified string and adds it to the `NameTable`.

Parameters:

- `key`: The string to add.

Returns: The atomized string or the existing string if it already exists in the `NameTable`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
For more information on atomized strings, see `NameTable`.

## NameTable.Add(Char[], Int32, Int32) method

```csharp
public override string Add (char[] key, int start, int len);
```

Atomizes the specified string and adds it to the `NameTable`.

Parameters:

- `key`: The character array containing the string to add.
- `start`: The zero-based index into the array specifying the first character of the string.
- `len`: The number of characters in the string.

Returns: The atomized string or the existing string if one already exists in the `NameTable`. If `len` is zero, String.Empty is returned.

Exceptions:

- `IndexOutOfRangeException`: 0 > `start`

-or-

`start` >= `key`.Length

-or-

`len` >= `key`.Length

The above conditions do not cause an exception to be thrown if `len` =0.
- `ArgumentOutOfRangeException`: `len` < 0.

#### Remarks
For more information on atomized strings, see `NameTable`.

## NameTable.Get(String) method

```csharp
public override string? Get (string value);
```

Gets the atomized string with the specified value.

Parameters:

- `value`: The name to find.

Returns: The atomized string object or `null` if the string has not already been atomized.

Exceptions:

- `ArgumentNullException`: `value` is `null`.

#### Remarks
For more information on atomized strings, see `NameTable`.

## NameTable.Get(Char[], Int32, Int32) method

```csharp
public override string? Get (char[] key, int start, int len);
```

Gets the atomized string containing the same characters as the specified range of characters in the given array.

Parameters:

- `key`: The character array containing the name to find.
- `start`: The zero-based index into the array specifying the first character of the name.
- `len`: The number of characters in the name.

Returns: The atomized string or `null` if the string has not already been atomized. If `len` is zero, String.Empty is returned.

Exceptions:

- `IndexOutOfRangeException`: 0 > `start`

-or-

`start` >= `key`.Length

-or-

`len` >= `key`.Length

The above conditions do not cause an exception to be thrown if `len` =0.
- `ArgumentOutOfRangeException`: `len` < 0.

#### Remarks
For more information on atomized strings, see `NameTable`.
