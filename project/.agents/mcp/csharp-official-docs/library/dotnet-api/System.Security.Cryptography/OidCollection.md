---
title: "OidCollection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/OidCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OidCollection class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class OidCollection : System.Collections.ICollection
```

Represents a collection of `Oid` objects. This class cannot be inherited.

#### Remarks
This class implements the `ICollection` interface.

#### Examples
The following code example shows how to use the `OidCollection` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/Oid/Overview/cryptography.oid.cs._

## OidCollection.OidCollection() constructor

```csharp
public OidCollection ();
```

Initializes a new instance of the `OidCollection` class.

#### Remarks
This is the parameterless constructor for this class.

#### Examples
The following code example shows how to use the `OidCollection` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/Oid/Overview/cryptography.oid.cs._

## OidCollection.Count property

```csharp
public int Count { get; }
```

Gets the number of `Oid` objects in a collection.

Returns: The number of `Oid` objects in a collection.

#### Examples
The following code example shows how to use the `OidCollection` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/Oid/Overview/cryptography.oid.cs._

## OidCollection.IsSynchronized property

```csharp
public bool IsSynchronized { get; }
```

Gets a value that indicates whether access to the `OidCollection` object is thread safe.

Returns: `false` in all cases.

#### Remarks
This collection is not thread safe.

#### Examples
The following code example shows how to use the `OidCollection` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/Oid/Overview/cryptography.oid.cs._

## OidCollection.Item property

```csharp
public System.Security.Cryptography.Oid this[int index] { get; }
```

Gets an `Oid` object from the `OidCollection` object.

Parameters:

- `index`: The location of the `Oid` object in the collection.

Returns: An `Oid` object.

#### Remarks
Use this method to retrieve an `Oid` object from an `OidCollection` object, if you know its location. You can use the `OidCollection.Item` property to retrieve an `Oid` object if you know the value of the object's `Value` property or `FriendlyName` property.

#### Examples
The following code example shows how to use the `OidCollection` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/Oid/Overview/cryptography.oid.cs._

## OidCollection.Item property

```csharp
public System.Security.Cryptography.Oid? this[string oid] { get; }
```

Gets the first `Oid` object that contains a value of the `Oid.Value` property or a value of the `Oid.FriendlyName` property that matches the specified string value from the `OidCollection` object.

Parameters:

- `oid`: A string that represents a `Oid.Value` property or a `Oid.FriendlyName` property.

Returns: An `Oid` object.

#### Remarks
Use this property to retrieve an `Oid` object from an `OidCollection` object if you know the value of the `Oid.Value` or `FriendlyName` property of the `Oid` object. You can use the `OidCollection.Item` property to retrieve an `Oid` object if you know its location in the collection.

#### Examples
The following code example shows how to use the `OidCollection` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/Oid/Overview/cryptography.oid.cs._

## OidCollection.SyncRoot property

```csharp
public object SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `OidCollection` object.

Returns: An object that can be used to synchronize access to the `OidCollection` object.

#### Remarks
`OidCollection` is not thread safe. Derived classes can provide their own synchronized version of the `OidCollection` class using this property. The synchronizing code must perform operations on the `SyncRoot` property of the `OidCollection` object, not directly on the object itself. This ensures proper operation of collections that are derived from other objects. Specifically, it maintains proper synchronization with other threads that might simultaneously be modifying the `OidCollection` object.

## OidCollection.Add(Oid) method

```csharp
public int Add (System.Security.Cryptography.Oid oid);
```

Adds an `Oid` object to the `OidCollection` object.

Parameters:

- `oid`: The `Oid` object to add to the collection.

Returns: The index of the added `Oid` object.

#### Remarks
Use this method to add an `Oid` object to an existing collection at the current location.

#### Examples
The following code example shows how to use the `OidCollection` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/Oid/Overview/cryptography.oid.cs._

## OidCollection.CopyTo(Oid[], Int32) method

```csharp
public void CopyTo (System.Security.Cryptography.Oid[] array, int index);
```

Copies the `OidCollection` object into an array.

Parameters:

- `array`: The array to copy the `OidCollection` object into.
- `index`: The location where the copy operation starts.

#### Remarks
This method copies an `OidCollection` object into an array at the specified location.

#### Examples
The following code example shows how to use the `OidCollection` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/Oid/Overview/cryptography.oid.cs._

## OidCollection.GetEnumerator() method

```csharp
public System.Security.Cryptography.OidEnumerator GetEnumerator ();
```

Returns an `OidEnumerator` object that can be used to navigate the `OidCollection` object.

Returns: An `OidEnumerator` object.

#### Remarks
The `OidEnumerator` class implements the `IEnumerator` interface, which allows you to move within a collection.

#### Examples
The following code example shows how to use the `OidCollection` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/Oid/Overview/cryptography.oid.cs._

## OidCollection.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies the `OidCollection` object into an array.

Parameters:

- `array`: The array to copy the `OidCollection` object to.
- `index`: The location where the copy operation starts.

Exceptions:

- `ArgumentException`: `array` cannot be a multidimensional array.

-or-

The length of `array` is an invalid offset length.
- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: The value of `index` is out range.

#### Remarks
This method copies an `OidCollection` object into an array at the specified location.

## OidCollection.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an `OidEnumerator` object that can be used to navigate the `OidCollection` object.

Returns: An `OidEnumerator` object that can be used to navigate the collection.

#### Remarks
The `OidEnumerator` class implements the `IEnumerator` interface, which allows you to move within a collection.
