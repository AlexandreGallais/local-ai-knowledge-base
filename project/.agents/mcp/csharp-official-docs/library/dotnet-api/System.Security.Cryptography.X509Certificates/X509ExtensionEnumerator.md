---
title: "X509ExtensionEnumerator class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509ExtensionEnumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509ExtensionEnumerator class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public sealed class X509ExtensionEnumerator : System.Collections.Generic.IEnumerator<System.Security.Cryptography.X509Certificates.X509Extension>
```

Supports a simple iteration over a `X509ExtensionCollection`. This class cannot be inherited.

#### Remarks
Enumerators provide read-only access to the data in the collection. Enumerators cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. `X509ExtensionEnumerator.Reset` also brings the enumerator back to this position. At this position, calling `X509ExtensionEnumerator.Current` throws an exception. Therefore, you must call `X509ExtensionEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `X509ExtensionEnumerator.Current`.

This class inherits from the `IEnumerator` interface. For more information about enumerating over a collection, see the `IEnumerator` topic.

## X509ExtensionEnumerator.Current property

```csharp
public System.Security.Cryptography.X509Certificates.X509Extension Current { get; }
```

Gets the current element in the `X509ExtensionCollection`.

Returns: The current element in the `X509ExtensionCollection`.

Exceptions:

- `InvalidOperationException`: The enumerator is positioned before the first element of the collection or after the last element.

#### Remarks
`X509ExtensionEnumerator` does not move the position of the enumerator and consecutive calls to `X509ExtensionEnumerator.Current` return the same object until either `X509ExtensionEnumerator.MoveNext` or `X509ExtensionEnumerator.Reset` is called.

## X509ExtensionEnumerator.System.Collections.IEnumerator.Current property

```csharp
object System.Collections.IEnumerator.Current { get; }
```

Gets an object from a collection.

Returns: The current element in the `X509ExtensionCollection`.

Exceptions:

- `InvalidOperationException`: The enumerator is positioned before the first element of the collection or after the last element.

#### Remarks
`X509ExtensionEnumerator` does not move the position of the enumerator and consecutive calls to `X509ExtensionEnumerator.Current` return the same object until either `X509ExtensionEnumerator.MoveNext` or `X509ExtensionEnumerator.Reset` is called.

## X509ExtensionEnumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances the enumerator to the next element in the `X509ExtensionCollection`.

Returns: `true` if the enumerator was successfully advanced to the next element; `false` if the enumerator has passed the end of the collection.

Exceptions:

- `InvalidOperationException`: The collection was modified after the enumerator was created.

#### Remarks
This method advances the enumerator to the next element in the collection. This class inherits from the `IEnumerator` interface. For more information about enumerating over a collection, see the `IEnumerator` topic.

## X509ExtensionEnumerator.Reset() method

```csharp
public void Reset ();
```

Sets the enumerator to its initial position, which is before the first element in the `X509ExtensionCollection`.

Exceptions:

- `InvalidOperationException`: The collection was modified after the enumerator was created.

#### Remarks
An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying or deleting elements, the enumerator is irrecoverably invalidated and the next call to `X509ExtensionEnumerator.MoveNext` or `X509ExtensionEnumerator.Reset` throws an `InvalidOperationException`.

## X509ExtensionEnumerator.System.IDisposable.Dispose() method

```csharp
void IDisposable.Dispose ();
```

Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `X509ExtensionEnumerator` instance is cast to an `IDisposable` interface.
