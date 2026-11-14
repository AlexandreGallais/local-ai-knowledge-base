---
title: "X509Certificate2Enumerator class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509Certificate2Enumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509Certificate2Enumerator class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public sealed class X509Certificate2Enumerator : System.Collections.Generic.IEnumerator<System.Security.Cryptography.X509Certificates.X509Certificate2>
```

Supports a simple iteration over a `X509Certificate2Collection` object. This class cannot be inherited.

#### Remarks
Enumerators provide read-only access to the data in the collection. Enumerators cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. The `X509Certificate2Enumerator.Reset` method also brings the enumerator back to this position. At this position, calling the `Current` property throws an exception. Therefore, you must call the `X509Certificate2Enumerator.MoveNext` method to advance the enumerator to the first element of the collection before reading the value of `X509Certificate2Enumerator.Current`.

This class inherits from the `IEnumerator` interface. For more information about enumerating over a collection, see `IEnumerator`.

## X509Certificate2Enumerator.Current property

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate2 Current { get; }
```

Gets the current element in the `X509Certificate2Collection` object.

Returns: The current element in the `X509Certificate2Collection` object.

Exceptions:

- `InvalidOperationException`: The enumerator is positioned before the first element of the collection or after the last element.

#### Remarks
`X509Certificate2Enumerator` does not move the position of the enumerator. Consecutive calls to the `Current` property return the same object until either the `X509Certificate2Enumerator.MoveNext` or `X509Certificate2Enumerator.Reset` method is called.

## X509Certificate2Enumerator.System.Collections.IEnumerator.Current property

```csharp
object System.Collections.IEnumerator.Current { get; }
```

For a description of this member, see `IEnumerator.Current`.

Returns: The current element in the `X509Certificate2Collection` object.

Exceptions:

- `InvalidOperationException`: The enumerator is positioned before the first element of the collection or after the last element.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `X509Certificate2Enumerator` instance is cast to an `IEnumerator` interface.

## X509Certificate2Enumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances the enumerator to the next element in the `X509Certificate2Collection` object.

Returns: `true` if the enumerator was successfully advanced to the next element; `false` if the enumerator has passed the end of the collection.

Exceptions:

- `InvalidOperationException`: The collection was modified after the enumerator was created.

#### Remarks
This method advances the enumerator to the next element in the collection. For more information about enumerating over a collection, see the `IEnumerator` topic.

## X509Certificate2Enumerator.Reset() method

```csharp
public void Reset ();
```

Sets the enumerator to its initial position, which is before the first element in the `X509Certificate2Collection` object.

Exceptions:

- `InvalidOperationException`: The collection was modified after the enumerator was created.

#### Remarks
An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying or deleting elements, the enumerator is irrecoverably invalidated and the next call to the `X509Certificate2Enumerator.MoveNext` or `X509Certificate2Enumerator.Reset` method throws an `InvalidOperationException`.

## X509Certificate2Enumerator.System.Collections.IEnumerator.MoveNext() method

```csharp
bool IEnumerator.MoveNext ();
```

For a description of this member, see `IEnumerator.MoveNext`.

Returns: `true` if the enumerator was successfully advanced to the next element; `false` if the enumerator has passed the end of the collection.

Exceptions:

- `InvalidOperationException`: The collection was modified after the enumerator was created.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `X509Certificate2Enumerator` instance is cast to an `IEnumerator` interface.

## X509Certificate2Enumerator.System.Collections.IEnumerator.Reset() method

```csharp
void IEnumerator.Reset ();
```

For a description of this member, see `IEnumerator.Reset`.

Exceptions:

- `InvalidOperationException`: The collection was modified after the enumerator was created.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `X509Certificate2Enumerator` instance is cast to an `IEnumerator` interface.

## X509Certificate2Enumerator.System.IDisposable.Dispose() method

```csharp
void IDisposable.Dispose ();
```

Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `X509Certificate2Enumerator` instance is cast to an `IDisposable` interface.
