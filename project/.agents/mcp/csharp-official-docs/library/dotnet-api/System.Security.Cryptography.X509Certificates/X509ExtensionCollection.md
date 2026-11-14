---
title: "X509ExtensionCollection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509ExtensionCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509ExtensionCollection class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public sealed class X509ExtensionCollection : System.Collections.Generic.IEnumerable<System.Security.Cryptography.X509Certificates.X509Extension>, System.Collections.ICollection
```

Represents a collection of `X509Extension` objects. This class cannot be inherited.

#### Remarks
This class represents a collection of `X509Extension` objects associated with a certificate. These extensions can provide additional information about the certificate.

## X509ExtensionCollection.X509ExtensionCollection() constructor

```csharp
public X509ExtensionCollection ();
```

Initializes a new instance of the `X509ExtensionCollection` class.

To be added.

## X509ExtensionCollection.Count property

```csharp
public int Count { get; }
```

Gets the number of `X509Extension` objects in a `X509ExtensionCollection` object.

Returns: An integer representing the number of `X509Extension` objects in the `X509ExtensionCollection` object.

To be added.

## X509ExtensionCollection.IsSynchronized property

```csharp
public bool IsSynchronized { get; }
```

Gets a value indicating whether the collection is guaranteed to be thread safe.

Returns: `true` if the collection is thread safe; otherwise, `false`.

#### Remarks
This property is derived from the `ICollection` interface and is overridden to always return `false`. For more information about this property, see the `IsSynchronized` property of the `ICollection` interface.

## X509ExtensionCollection.Item property

```csharp
public System.Security.Cryptography.X509Certificates.X509Extension this[int index] { get; }
```

Gets the `X509Extension` object at the specified index.

Parameters:

- `index`: The location of the `X509Extension` object to retrieve.

Returns: An `X509Extension` object.

Exceptions:

- `InvalidOperationException`: `index` is less than zero.
- `ArgumentOutOfRangeException`: `index` is equal to or greater than the length of the array.

#### Remarks
Use this property to get information about an `X509Extension` object when you know the location of the object in the `X509ExtensionCollection` object.

## X509ExtensionCollection.Item property

```csharp
public System.Security.Cryptography.X509Certificates.X509Extension? this[string oid] { get; }
```

Gets the first `X509Extension` object whose value or friendly name is specified by an object identifier (OID).

Parameters:

- `oid`: The object identifier (OID) of the extension to retrieve.

Returns: An `X509Extension` object.

#### Remarks
Use this property to get information about an `X509Extension` object when you know the object identifier (OID) of the extension in the `X509ExtensionCollection` object.

## X509ExtensionCollection.SyncRoot property

```csharp
public object SyncRoot { get; }
```

Gets an object that you can use to synchronize access to the `X509ExtensionCollection` object.

Returns: An object that you can use to synchronize access to the `X509ExtensionCollection` object.

#### Remarks
This property implements the `ICollection` interface. The .NET classes based on `Array` provide their own synchronized version of the collection using the `SyncRoot` property. Classes that use arrays can also implement their own synchronization using the `SyncRoot` property. The synchronizing code must perform operations on the `SyncRoot` property of the collection, not directly on the collection. This ensures proper operation of collections that are derived from other objects. Specifically, it maintains proper synchronization with other threads that might be simultaneously modifying the collection. Note that some implementations of `X509ExtensionCollection.SyncRoot` might return the array itself.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads could still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

## X509ExtensionCollection.Add(X509Extension) method

```csharp
public int Add (System.Security.Cryptography.X509Certificates.X509Extension extension);
```

Adds an `X509Extension` object to an `X509ExtensionCollection` object.

Parameters:

- `extension`: An `X509Extension` object to add to the `X509ExtensionCollection` object.

Returns: The index at which the `extension` parameter was added.

Exceptions:

- `ArgumentNullException`: The value of the `extension` parameter is `null`.

#### Remarks
The `X509ExtensionCollection.Add` method allows duplicate elements to be added to the collection.

## X509ExtensionCollection.CopyTo(X509Extension[], Int32) method

```csharp
public void CopyTo (System.Security.Cryptography.X509Certificates.X509Extension[] array, int index);
```

Copies a collection into an array starting at the specified index.

Parameters:

- `array`: An array of `X509Extension` objects.
- `index`: The location in the array at which copying starts.

Exceptions:

- `ArgumentException`: `index` is a zero-length string or contains an invalid value.
- `ArgumentNullException`: `index` is `null`.
- `ArgumentOutOfRangeException`: `index` specifies a value that is not in the range of the array.

To be added.

## X509ExtensionCollection.GetEnumerator() method

```csharp
public System.Security.Cryptography.X509Certificates.X509ExtensionEnumerator GetEnumerator ();
```

Returns an enumerator that can iterate through an `X509ExtensionCollection` object.

Returns: An `X509ExtensionEnumerator` object to use to iterate through the `X509ExtensionCollection` object.

#### Remarks
Enumerators allow read-only access to data in the collection and cannot be used to modify the underlying collection.

## X509ExtensionCollection.System.Collections.Generic.IEnumerable<System.Security.Cryptography.X509Certificates.X509Extension>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<System.Security.Cryptography.X509Certificates.X509Extension> IEnumerable<X509Extension>.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the collection.

To be added.

## X509ExtensionCollection.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies the collection into an array starting at the specified index.

Parameters:

- `array`: An array of `X509Extension` objects.
- `index`: The location in the array at which copying starts.

Exceptions:

- `ArgumentException`: `index` is a zero-length string or contains an invalid value.
- `ArgumentNullException`: `index` is `null`.
- `ArgumentOutOfRangeException`: `index` specifies a value that is not in the range of the array.

To be added.

## X509ExtensionCollection.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that can iterate through an `X509ExtensionCollection` object.

Returns: An `IEnumerator` object to use to iterate through the `X509ExtensionCollection` object.

#### Remarks
Enumerators allow read-only access to data in the collection and cannot be used to modify the underlying collection.
