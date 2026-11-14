---
title: "CollectionsUtil class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Specialized/CollectionsUtil.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CollectionsUtil class

Namespace: `System.Collections.Specialized`

```csharp
public class CollectionsUtil
```

Creates collections that ignore the case in strings.

#### Remarks
These methods generate a case-insensitive instance of the collection using case-insensitive implementations of the hash code provider and the comparer. The resulting instance can be used like any other instances of that class, although it may behave differently.

For example, suppose two objects with the keys "hello" and "HELLO" are to be added to a hash table. A case-sensitive hash table would create two different entries; whereas, a case-insensitive hash table would throw an exception when adding the second object.

#### Examples
The following example uses two collections, a hash table and a sorted list, to hold population values for a group of cities. The values are retrieved from the collections by using the city names as keys. The city names are in mixed case to show their use as case-insensitive keys.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/CollectionsUtil/Overview/source.cs._

## CollectionsUtil.CollectionsUtil() constructor

```csharp
public CollectionsUtil ();
```

Initializes a new instance of the `CollectionsUtil` class.

To be added.

## CollectionsUtil.CreateCaseInsensitiveHashtable() method

```csharp
public static System.Collections.Hashtable CreateCaseInsensitiveHashtable ();
```

Creates a new case-insensitive instance of the `Hashtable` class with the default initial capacity.

Returns: A new case-insensitive instance of the `Hashtable` class with the default initial capacity.

#### Remarks
Instead of using the `CollectionsUtil.CreateCaseInsensitiveHashtable` method, use the `%23ctor` constructor to create a case-insensitive `Hashtable` class.

## CollectionsUtil.CreateCaseInsensitiveHashtable(IDictionary) method

```csharp
public static System.Collections.Hashtable CreateCaseInsensitiveHashtable (System.Collections.IDictionary d);
```

Copies the entries from the specified dictionary to a new case-insensitive instance of the `Hashtable` class with the same initial capacity as the number of entries copied.

Parameters:

- `d`: The `IDictionary` to copy to a new case-insensitive `Hashtable`.

Returns: A new case-insensitive instance of the `Hashtable` class containing the entries from the specified `IDictionary`.

Exceptions:

- `ArgumentNullException`: `d` is `null`.

#### Remarks
Instead of using the `CollectionsUtil.CreateCaseInsensitiveHashtable` method, use the `%23ctor` constructor to create a case-insensitive `Hashtable` class.

## CollectionsUtil.CreateCaseInsensitiveHashtable(Int32) method

```csharp
public static System.Collections.Hashtable CreateCaseInsensitiveHashtable (int capacity);
```

Creates a new case-insensitive instance of the `Hashtable` class with the specified initial capacity.

Parameters:

- `capacity`: The approximate number of entries that the `Hashtable` can initially contain.

Returns: A new case-insensitive instance of the `Hashtable` class with the specified initial capacity.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than zero.

#### Remarks
Instead of using the `CollectionsUtil.CreateCaseInsensitiveHashtable` method, use the `%23ctor` constructor to create a case-insensitive `Hashtable` class.

## CollectionsUtil.CreateCaseInsensitiveSortedList() method

```csharp
public static System.Collections.SortedList CreateCaseInsensitiveSortedList ();
```

Creates a new instance of the `SortedList` class that ignores the case of strings.

Returns: A new instance of the `SortedList` class that ignores the case of strings.

#### Remarks
The new `SortedList` instance is sorted according to the `CaseInsensitiveComparer`.
