---
title: "CookieCollection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/CookieCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CookieCollection class

Namespace: `System.Net`

```csharp
public class CookieCollection : System.Collections.Generic.ICollection<System.Net.Cookie>, System.Collections.Generic.IEnumerable<System.Net.Cookie>, System.Collections.Generic.IReadOnlyCollection<System.Net.Cookie>, System.Collections.ICollection
```

Provides a collection container for instances of the `Cookie` class.

#### Remarks
The `CookieCollection` class implements an `ICollection` interface to provide a general mechanism for handling collections of cookies. For example, this is useful in the case where an application is designed to store cookies for multiple servers.

## CookieCollection.CookieCollection() constructor

```csharp
public CookieCollection ();
```

Initializes a new instance of the `CookieCollection` class.

#### Remarks
The following table shows initial property values for an instance of `CookieCollection`.

|Property|Default|
|--------------|-------------|
|`CookieCollection.IsReadOnly`|`true`|
|`CookieCollection.Count`|0|
|`CookieCollection.IsSynchronized`|`false`|

## CookieCollection.Count property

```csharp
public int Count { get; }
```

Gets the number of cookies contained in a `CookieCollection`.

Returns: The number of cookies contained in a `CookieCollection`.

To be added.

## CookieCollection.IsReadOnly property

```csharp
public bool IsReadOnly { get; }
```

Gets a value that indicates whether a `CookieCollection` is read-only.

Returns: `true` if this is a read-only `CookieCollection`; otherwise, `false`. The default is `true`.

To be added.

## CookieCollection.IsSynchronized property

```csharp
public bool IsSynchronized { get; }
```

Gets a value that indicates whether access to a `CookieCollection` is thread safe.

Returns: `true` if access to the `CookieCollection` is thread safe; otherwise, `false`. The default is `false`.

To be added.

## CookieCollection.Item property

```csharp
public System.Net.Cookie this[int index] { get; }
```

Gets the `Cookie` with a specific index from a `CookieCollection`.

Parameters:

- `index`: The zero-based index of the `Cookie` to be found.

Returns: A `Cookie` with a specific index from a `CookieCollection`.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than 0 or `index` is greater than or equal to `CookieCollection.Count`.

#### Remarks
You can use this to iterate over the contents of a `CookieCollection`.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Net/CookieCollection/Item/cookiecollection_item_2.cs._

## CookieCollection.Item property

```csharp
public System.Net.Cookie? this[string name] { get; }
```

Gets the `Cookie` with a specific name from a `CookieCollection`.

Parameters:

- `name`: The name of the `Cookie` to be found.

Returns: The `Cookie` with a specific name from a `CookieCollection`.

Exceptions:

- `ArgumentNullException`: `name` is `null`.

#### Remarks
You can use this to iterate over the contents of a `CookieCollection`.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Net/CookieCollection/Item/cookiecollection_item_1.cs._

## CookieCollection.SyncRoot property

```csharp
public object SyncRoot { get; }
```

Gets an object to synchronize access to the `CookieCollection`.

Returns: An object to synchronize access to the `CookieCollection`.

#### Remarks
The `SyncRoot` property returns an object that can be used to synchronize access to the `CookieCollection`.

## CookieCollection.Add(Cookie) method

```csharp
public void Add (System.Net.Cookie cookie);
```

Adds a `Cookie` to a `CookieCollection`.

Parameters:

- `cookie`: The `Cookie` to be added to a `CookieCollection`.

Exceptions:

- `ArgumentNullException`: `cookie` is `null`.

To be added.

## CookieCollection.Add(CookieCollection) method

```csharp
public void Add (System.Net.CookieCollection cookies);
```

Adds the contents of a `CookieCollection` to the current instance.

Parameters:

- `cookies`: The `CookieCollection` to be added.

Exceptions:

- `ArgumentNullException`: `cookies` is `null`.

#### Remarks
Each `Cookie` is read from the `CookieCollection` `cookies` parameter and added to the current instance.

## CookieCollection.Clear() method

```csharp
public void Clear ();
```

Removes all elements from the `CookieCollection` object.

To be added.

## CookieCollection.Contains(Cookie) method

```csharp
public bool Contains (System.Net.Cookie cookie);
```

Determines whether the specified cookie is in the `CookieCollection`.

Parameters:

- `cookie`: The cookie to locate in the `CookieCollection`.

Returns: `true` if the specified cookie is found in the `CookieCollection`; otherwise, `false`.

#### Remarks
The `cookie` is determined to be part of the collection if `Cookie.Name`, `Cookie.Domain` and `Cookie.Path` match.
The comparison for `Cookie.Name` and `Cookie.Domain` is case-insensitive.
The comparison for `Cookie.Path` is case-sensitive.

## CookieCollection.CopyTo(Array, Int32) method

```csharp
public void CopyTo (Array array, int index);
```

Copies the elements of a `CookieCollection` to the specified array, starting at a particular index.

Parameters:

- `array`: The target array to which the `CookieCollection` will be copied.
- `index`: The zero-based index in the target array where copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero.
- `ArgumentException`: `array` is multidimensional.

-or-

The number of elements in this `CookieCollection` is greater than the available space from `index` to the end of the destination `array`.
- `InvalidCastException`: The elements in this `CookieCollection` cannot be cast automatically to the type of the destination `array`.

#### Remarks
The `Array` `array` parameter must be one-dimensional with zero-based indexing.

## CookieCollection.CopyTo(Cookie[], Int32) method

```csharp
public void CopyTo (System.Net.Cookie[] array, int index);
```

Copies the elements of this `CookieCollection` to a `Cookie` array starting at the specified index of the target array.

Parameters:

- `array`: The target `Cookie` array to which the `CookieCollection` will be copied.
- `index`: The zero-based index in the target array where copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero.
- `ArgumentException`: `array` is multidimensional.

-or-

The number of elements in this `CookieCollection` is greater than the available space from `index` to the end of the destination `array`.
- `InvalidCastException`: The elements in this `CookieCollection` cannot be cast automatically to the type of the destination `array`.

#### Remarks
The `array` parameter must be one-dimensional with zero-based indexing.

## CookieCollection.GetEnumerator() method

```csharp
public System.Collections.IEnumerator GetEnumerator ();
```

Gets an enumerator that can iterate through a `CookieCollection`.

Returns: An `IEnumerator` for this collection.

#### Remarks
You should use an `IEnumerator` only to read data in the collection. Enumerators cannot be used to modify the underlying collection. The enumerator does not have exclusive access to the collection.

When an enumerator is created, it takes a snapshot of the current state of the collection. If changes are made to the collection, such as adding, modifying, or deleting elements, this snapshot gets out of sync and the enumerator throws an `InvalidOperationException`. Two enumerators created from the same collection at the same time can produce different snapshots of the collection.

## CookieCollection.Remove(Cookie) method

```csharp
public bool Remove (System.Net.Cookie cookie);
```

Removes the specified cookie from the `CookieCollection`.

Parameters:

- `cookie`: The cookie to remove from the `CookieCollection`.

Returns: `true` if `cookie` was successfully removed from the `CookieCollection`; otherwise, `false`. This method also returns `false` if item is not found in the original collection.

#### Remarks
The `cookie` is determined to be part of the collection if `Cookie.Name`, `Cookie.Domain` and `Cookie.Path` match.

The comparison for `Cookie.Name` and `Cookie.Domain` is case-insensitive.

The comparison for `Cookie.Path` is case-sensitive.

## CookieCollection.System.Collections.Generic.IEnumerable<System.Net.Cookie>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<System.Net.Cookie> IEnumerable<Cookie>.GetEnumerator ();
```

Gets an enumerator that can iterate through the `CookieCollection`.

Returns: An `IEnumerator<T>` for this collection.

#### Remarks
You should use an `IEnumerator<T>` only to read data in the collection. Enumerators cannot be used to modify the underlying collection. The enumerator does not have exclusive access to the collection.

When an enumerator is created, it takes a snapshot of the current state of the collection. If changes are made to the collection, such as adding, modifying, or deleting elements, this snapshot gets out of sync and the enumerator throws an `InvalidOperationException`. Two enumerators created from the same collection at the same time can produce different snapshots of the collection.

This member is an explicit interface member implementation. It can be used only when the `CookieCollection` instance is cast to an `IEnumerable<T>` interface.
