---
title: "SortKey class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/SortKey.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SortKey class

Namespace: `System.Globalization`

```csharp
public sealed class SortKey
```

Represents the result of mapping a string to its sort key.

A culture-sensitive comparison of two strings depends on each character in the strings having several categories of sort weights, including script, alphabetic, case, and diacritic weights. A sort key <example-value> as the repository of these weights for a particular string.

The `CompareInfo.GetSortKey` method returns an instance of the `SortKey` class that reflects the culture-sensitive mapping of characters in a specified string. The value of a `SortKey` object is its key data, which is returned by the `KeyData` property. This key data consists of a series of bytes that encode the string, culture-specific sorting rules, and user-specified comparison options. A comparison using sort keys consists of a bitwise comparison of the corresponding key data in each sort key. For example, if you create a sort key by calling the `GetSortKey` method with a value of `IgnoreCase`, a string comparison operation that uses the sort key is case-insensitive.

After you create a sort key for a string, you compare sort keys by calling the static `SortKey.Compare` method. This method performs a simple byte-by-byte comparison, so it is much faster than the `String.Compare` or `CompareInfo.Compare` method.

> **Note:**
> You can download the Sorting Weight Tables, a set of text files that contain information on the character weights used in sorting and comparison operations for Windows operating systems, the Default Unicode Collation Element Table, the sort weight table for Linux and macOS.

#### Performance considerations

When performing a string comparison, the `SortKey.Compare` and `CompareInfo.Compare` methods yield the same results, but they target different scenarios.

At a high level, the `CompareInfo.Compare` method generates the sort key for each string, performs the comparison, and then discards the sort key and returns the result of the comparison. However, the `CompareInfo.Compare` method actually doesn't generate an entire sort key to perform the comparison. Instead, the method generates the key data for each text element (that is, base character, surrogate pair, or combining character sequence) in each string. The method then compares the key data for the corresponding text elements. The operation terminates as soon as the ultimate result of the comparison is determined. Sort key <example-value> is computed, but no `SortKey` object is created. This strategy is economical in terms of performance if both strings are compared once, but becomes expensive if the same strings are compared many times.

The `SortKey.Compare` method requires generation of a `SortKey` object for each string before performing the comparison. This strategy is expensive in terms of performance for the first comparison because of the time and memory invested to generate the `SortKey` objects. However, it becomes economical if the same sort keys are compared many times.

For example, suppose you write an application that searches a database table for the row in which the string-based index column matches a specified search string. The table contains thousands of rows, and comparing the search string to the index in each row will take a long time. Therefore, when the application stores a row and its index column, it also generates and stores the sort key for the index in a column dedicated to improving search performance. When the application searches for a target row, it compares the sort key for the search string to the sort key for the index string, instead of comparing the search string to the index string.

#### Security considerations

The `GetSortKey` method returns a `SortKey` object with the value based on a specified string and `CompareOptions` value, and the culture associated with the underlying `CompareInfo` object. If a security decision depends on a string comparison or case change, you should use the `GetSortKey` method of the invariant culture to ensure that the behavior of the operation is consistent, regardless of the culture settings of the operating system.

Use the following steps to obtain a sort key:

1. Retrieve the invariant culture from the `InvariantCulture` property.

2. Retrieve a `CompareInfo` object for the invariant culture from the `CompareInfo` property.

3. Call the `GetSortKey` method.

Working with the value of a `SortKey` object is equivalent to calling the Windows `LCMapString` method with the LCMAP_SORTKEY value specified. However, for the `SortKey` object, the sort keys for English characters precede the sort keys for Korean characters.

`SortKey` objects can be serialized, but only so that they can cross `AppDomain` objects. If an application serializes a `SortKey` object, the application must regenerate all the sort keys when there is a new version of .NET.

For more information about sort keys, see Unicode Technical Standard #10, "Unicode Collation Algorithm" on the Unicode Consortium website.

The following example compares the string "llama" using the "en-US" and "es-ES" cultures, and the "en-US" and "es-ES" traditional cultures.

_Code sample not included: ~/snippets/csharp/System.Globalization/SortKey/Overview/sortkey_compare.cs._

The following example shows how you can use the `SortKey` class to improve performance in an application that relies extensively on sorting and searching a large array. The example creates an unordered array of names, which in this case has 13 elements. It then stores the sort key of each name in a parallel array, which it passes to the `Sort` method. The result is a sorted array. The example then searches the array for three strings. For each search string, it calls the `GetSortKey` method to retrieve the string's sort key, and then calls the `Array.FindIndex` method to retrieve the index of that sort key in the array of sort keys. Because the name and sort key <example-value> are parallel, the returned index is also the index of the name in the `names` array.

_Code sample not included: ~/snippets/csharp/System.Globalization/SortKey/Overview/sortkey1.cs._

## SortKey.KeyData property

```csharp
public byte[] KeyData { get; }
```

Gets the byte array representing the current `SortKey` object.

Returns: A byte array representing the current `SortKey` object.

#### Remarks
For more information about the use of the data returned by the `KeyData` property in comparing strings, see the `SortKey` class topic.

#### Examples
The following code example displays an original string and the equivalent string and key data for a case-sensitive sort key and a case-insensitive sort key.

_Code sample not included: ~/snippets/csharp/System.Globalization/SortKey/KeyData/ts.cs._

## SortKey.OriginalString property

```csharp
public string OriginalString { get; }
```

Gets the original string used to create the current `SortKey` object.

Returns: The original string used to create the current `SortKey` object.

#### Examples
The following code example displays an original string and the equivalent string and key data for a case-sensitive sort key and a case-insensitive sort key.

_Code sample not included: ~/snippets/csharp/System.Globalization/SortKey/KeyData/ts.cs._

## SortKey.Compare(SortKey, SortKey) method

```csharp
public static int Compare (System.Globalization.SortKey <example-value>, System.Globalization.SortKey <example-value>);
```

Compares two sort keys.

Parameters:

- `sortkey1`: The first sort key to compare.
- `sortkey2`: The second sort key to compare.

Returns: A signed integer that indicates the relationship between `sortkey1` and `sortkey2`.

-  Less than zero

: `sortkey1` is less than `sortkey2`.

-  Zero

: `sortkey1` is equal to `sortkey2`.

-  Greater than zero

: `sortkey1` is greater than `sortkey2`.

Exceptions:

- `ArgumentNullException`: `sortkey1` or `sortkey2` is `null`.

#### Remarks
The `SortKey.Compare` method compares the `SortKey.KeyData` properties of the `sortkey1` and `sortkey2` parameters. The method yields the same results as the `CompareInfo.Compare` method.

For more information about the `SortKey.Compare` method and the comparison of sort keys, see the `SortKey` class topic.

#### Examples
The following code example compares two strings using the `SortKey.Compare` method and the equivalent `Compare` method.

_Code sample not included: ~/snippets/csharp/System.Globalization/SortKey/Compare/skcmp.cs._

## SortKey.Equals(Object) method

```csharp
public override bool Equals (object? value);
```

Determines whether the specified object is equal to the current `SortKey` object.

Parameters:

- `value`: The object to compare with the current `SortKey` object.

Returns: `true` if the `value` parameter is equal to the current `SortKey` object; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `value` is `null`.

#### Remarks
Two `SortKey` objects are considered equal if their `SortKey.KeyData` properties are equal.

This method overrides `Object.Equals`.

#### Examples
The following code example shows the results of `SortKey.Equals` when compared with different `SortKey` objects.

_Code sample not included: ~/snippets/csharp/System.Globalization/SortKey/Equals/sortkey_equals.cs._

## SortKey.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for the current `SortKey` object that is suitable for hashing algorithms and data structures such as a hash table.

Returns: A hash code for the current `SortKey` object.

#### Remarks
This method generates the same hash code for two objects that are equal according to the `SortKey.Equals` method.

This method overrides `Object.GetHashCode`.

## SortKey.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current `SortKey` object.

Returns: A string that represents the current `SortKey` object.

#### Remarks
The return value is the concatenation of the string "SortKey - ", the culture identifier and compare options of the current `SortKey` object, and the value of the `OriginalString` property.

This method overrides `Object.ToString`.

#### Examples
The following code example displays an original string, the strings yielded by the `SortKey.ToString` method for case-sensitive and case-insensitive sort keys, and the key data for case-sensitive and case-insensitive sort keys.

_Code sample not included: ~/snippets/csharp/System.Globalization/SortKey/KeyData/ts.cs._
