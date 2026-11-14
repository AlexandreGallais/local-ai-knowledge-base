---
title: "X509CertificateCollection+X509CertificateEnumerator class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509CertificateCollection+X509CertificateEnumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509CertificateCollection+X509CertificateEnumerator class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public class X509CertificateCollection.X509CertificateEnumerator : System.Collections.IEnumerator
```

Enumerates the `X509Certificate` objects in an `X509CertificateCollection`.

#### Remarks
Enumerators provide read-only access to the data in the collection. Enumerators cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. The `X509CertificateEnumerator.Reset` method also brings the enumerator back to this position. At this position, calling the `Current` property throws an exception. Therefore, you must call the `X509CertificateEnumerator.MoveNext` method to advance the enumerator to the first element of the collection before reading the value of `X509CertificateEnumerator.Current`.

This class inherits from the `IEnumerator` interface. For more information about enumerating over a collection, see `IEnumerator`.

## X509CertificateCollection+X509CertificateEnumerator.X509CertificateCollection+X509CertificateEnumerator(X509CertificateCollection) constructor

```csharp
public X509CertificateEnumerator (System.Security.Cryptography.X509Certificates.X509CertificateCollection mappings);
```

Initializes a new instance of the `X509CertificateEnumerator` class for the specified `X509CertificateCollection`.

Parameters:

- `mappings`: The `X509CertificateCollection` to enumerate.

To be added.

## X509CertificateCollection+X509CertificateEnumerator.Current property

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate Current { get; }
```

Gets the current `X509Certificate` in the `X509CertificateCollection`.

Returns: The current `X509Certificate` in the `X509CertificateCollection`.

Exceptions:

- `InvalidOperationException`: The enumerator is positioned before the first element of the collection or after the last element.

#### Remarks
`X509CertificateEnumerator` does not move the position of the enumerator. Consecutive calls to the `Current` property return the same object until either the `X509CertificateEnumerator.MoveNext` or `X509CertificateEnumerator.Reset` method is called.

## X509CertificateCollection+X509CertificateEnumerator.System.Collections.IEnumerator.Current property

```csharp
object System.Collections.IEnumerator.Current { get; }
```

For a description of this member, see `IEnumerator.Current`.

Returns: The current X.509 certificate object in the `X509CertificateCollection` object.

Exceptions:

- `InvalidOperationException`: The enumerator is positioned before the first element of the collection or after the last element.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `X509CertificateCollection` instance is cast to an `IEnumerator` interface.

## X509CertificateCollection+X509CertificateEnumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances the enumerator to the next element of the collection.

Returns: `true` if the enumerator was successfully advanced to the next element; `false` if the enumerator has passed the end of the collection.

Exceptions:

- `InvalidOperationException`: The collection was modified after the enumerator was instantiated.

#### Remarks
This method advances the enumerator to the next element in the collection. For more information about enumerating over a collection, see the `IEnumerator` topic.

## X509CertificateCollection+X509CertificateEnumerator.Reset() method

```csharp
public void Reset ();
```

Sets the enumerator to its initial position, which is before the first element in the collection.

Exceptions:

- `InvalidOperationException`: The collection is modified after the enumerator is instantiated.

#### Remarks
An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying or deleting elements, the enumerator is irrecoverably invalidated and the next call to the `X509CertificateEnumerator.MoveNext` or `X509CertificateEnumerator.Reset` method throws an `InvalidOperationException`.

## X509CertificateCollection+X509CertificateEnumerator.System.Collections.IEnumerator.MoveNext() method

```csharp
bool IEnumerator.MoveNext ();
```

For a description of this member, see `IEnumerator.MoveNext`.

Returns: `true` if the enumerator was successfully advanced to the next element; `false` if the enumerator has passed the end of the collection.

Exceptions:

- `InvalidOperationException`: The collection was modified after the enumerator was instantiated.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `X509CertificateCollection` instance is cast to an `IEnumerator` interface.

## X509CertificateCollection+X509CertificateEnumerator.System.Collections.IEnumerator.Reset() method

```csharp
void IEnumerator.Reset ();
```

For a description of this member, see `IEnumerator.Reset`.

Exceptions:

- `InvalidOperationException`: The collection was modified after the enumerator was instantiated.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `X509CertificateCollection` instance is cast to an `IEnumerator` interface.
