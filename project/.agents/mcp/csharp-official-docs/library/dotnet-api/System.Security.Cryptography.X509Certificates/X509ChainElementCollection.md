---
title: "X509ChainElementCollection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509ChainElementCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509ChainElementCollection class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public sealed class X509ChainElementCollection : System.Collections.Generic.IEnumerable<System.Security.Cryptography.X509Certificates.X509ChainElement>, System.Collections.ICollection
```

Represents a collection of `X509ChainElement` objects. This class cannot be inherited.

#### Remarks
An instance of this class is returned when the `ChainElements` property is called.

#### Examples
The following code example opens the current user's personal certificate store, allows the user to select a certificate, and then writes certificate and certificate chain information to the console. The output depends on the certificate you select.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Chain/Overview/x509chaintest.cs._

## X509ChainElementCollection.Count property

```csharp
public int Count { get; }
```

Gets the number of elements in the collection.

Returns: An integer representing the number of elements in the collection.

#### Remarks
Use this property to determine how many elements are in the collection.

#### Examples
The following code example opens the current user's personal certificate store, allows the user to select a certificate, and then writes certificate and certificate chain information to the console. The output depends on the certificate you select.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Chain/Overview/x509chaintest.cs._

## X509ChainElementCollection.IsSynchronized property

```csharp
public bool IsSynchronized { get; }
```

Gets a value indicating whether the collection of chain elements is synchronized.

Returns: Always returns `false`.

#### Remarks
This value is always `false` because an `X509ChainElementCollection` object is not thread safe.

#### Examples
The following code example opens the current user's personal certificate store, allows the user to select a certificate, and then writes certificate and certificate chain information to the console. The output depends on the certificate you select.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Chain/Overview/x509chaintest.cs._

## X509ChainElementCollection.Item property

```csharp
public System.Security.Cryptography.X509Certificates.X509ChainElement this[int index] { get; }
```

Gets the `X509ChainElement` object at the specified index.

Parameters:

- `index`: An integer value.

Returns: An `X509ChainElement` object.

Exceptions:

- `InvalidOperationException`: `index` is less than zero.
- `ArgumentOutOfRangeException`: `index` is greater than or equal to the length of the collection.

#### Remarks
Use this method to access an `X509ChainElement` object in the collection.

## X509ChainElementCollection.SyncRoot property

```csharp
public object SyncRoot { get; }
```

Gets an object that can be used to synchronize access to an `X509ChainElementCollection` object.

Returns: A pointer reference to the current object.

#### Remarks
This property returns the `this` pointer, which is a reference to an instance of the current class.

## X509ChainElementCollection.CopyTo(X509ChainElement[], Int32) method

```csharp
public void CopyTo (System.Security.Cryptography.X509Certificates.X509ChainElement[] array, int index);
```

Copies an `X509ChainElementCollection` object into an array, starting at the specified index.

Parameters:

- `array`: An array of `X509ChainElement` objects.
- `index`: An integer representing the index value.

Exceptions:

- `ArgumentOutOfRangeException`: The specified `index` is less than zero, or greater than or equal to the length of the array.
- `ArgumentNullException`: `array` is `null`.
- `ArgumentException`: `index` plus the current count is greater than the length of the array.

To be added.

## X509ChainElementCollection.GetEnumerator() method

```csharp
public System.Security.Cryptography.X509Certificates.X509ChainElementEnumerator GetEnumerator ();
```

Gets an `X509ChainElementEnumerator` object that can be used to navigate through a collection of chain elements.

Returns: An `X509ChainElementEnumerator` object.

#### Remarks
The `X509ChainElementEnumerator` class implements `IEnumerator`, which enables you to use methods such as `X509ChainElementEnumerator.Current`, `X509ChainElementEnumerator.MoveNext` and `X509ChainElementEnumerator.Reset` to view the contents of the collection.

## X509ChainElementCollection.System.Collections.Generic.IEnumerable<System.Security.Cryptography.X509Certificates.X509ChainElement>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<System.Security.Cryptography.X509Certificates.X509ChainElement> IEnumerable<X509ChainElement>.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the collection.

To be added.

## X509ChainElementCollection.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies an `X509ChainElementCollection` object into an array, starting at the specified index.

Parameters:

- `array`: An array to copy the `X509ChainElementCollection` object to.
- `index`: The index of `array` at which to start copying.

Exceptions:

- `ArgumentOutOfRangeException`: The specified `index` is less than zero, or greater than or equal to the length of the array.
- `ArgumentNullException`: `array` is `null`.
- `ArgumentException`: `index` plus the current count is greater than the length of the array.

To be added.

## X509ChainElementCollection.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Gets an `IEnumerator` object that can be used to navigate a collection of chain elements.

Returns: An `IEnumerator` object.

#### Remarks
This method returns an enumerator interface.
