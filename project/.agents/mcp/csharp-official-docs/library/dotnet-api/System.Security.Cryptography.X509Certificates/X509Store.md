---
title: "X509Store class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509Store.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509Store class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public sealed class X509Store : IDisposable
```

Represents an X.509 store, which is a physical store where certificates are persisted and managed. This class cannot be inherited.

#### Remarks
Use this class to work with an X.509 store.

> **Important:**
> This type implements the `IDisposable` interface. When you've finished using the type, you should dispose of it either directly (by calling its `Dispose` method) or indirectly (with a language construct such as `using` in C#). For more information, see Use an object that implements IDisposable.

#### Examples
This section contains two examples. The first example demonstrates how you can open standard X.509 stores and list the number of certificates in each.

The second example demonstrates how you can add and remove single certificates and ranges of certificates.

**Example 1**

This example tries to open each standard store in each standard location on the current computer. It prints a summary that shows whether each store exists and, if so, the number of certificates it contains.

The example creates an `X509Store` object for each combination of standard name and standard location. It calls the `X509Store.Open` method with the `OpenExistingOnly` flag, which opens the physical store only if it already exists. If the physical store exists, the example uses the `X509Store.Name`, `X509Store.Location`, and `X509Store.Certificates` properties to display the number of certificates in the store.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/OpenFlags/Overview/storenames1.cs._

**Example 2**

This example opens an X.509 certificate store, adds and deletes certificates, and then closes the store. It assumes that you have three certificates to add to and remove from a local store.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/OpenFlags/Overview/x509store2.cs._

## X509Store.X509Store() constructor

```csharp
public X509Store ();
```

Initializes a new instance of the `X509Store` class using the personal certificates store of the current user.

#### Remarks
Use this constructor to create an `X509Store` object using the personal X.509 certificate store for the current user.

#### Examples
The following code example opens an X.509 certificate store, adds and deletes certificates, and then closes the store. It assumes that you have three certificates to add to and remove from a local store.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/OpenFlags/Overview/x509store2.cs._

## X509Store.X509Store(IntPtr) constructor

```csharp
public X509Store (IntPtr storeHandle);
```

Initializes a new instance of the `X509Store` class using an Intptr handle to an `HCERTSTORE` store.

Parameters:

- `storeHandle`: A handle to an `HCERTSTORE` store.

Exceptions:

- `ArgumentNullException`: The `storeHandle` parameter is `null`.
- `CryptographicException`: The `storeHandle` parameter points to an invalid context.

#### Remarks
Use this constructor to provide compatibility with the unmanaged Microsoft Cryptographic API (CAPI).

## X509Store.X509Store(StoreLocation) constructor

```csharp
public X509Store (System.Security.Cryptography.X509Certificates.StoreLocation storeLocation);
```

Initializes a new instance of the `X509Store` class using the personal certificate store from the specified store location value.

Parameters:

- `storeLocation`: One of the enumeration values that specifies the location of the X.509 certificate store.

#### Remarks
Use this constructor to create an `X509Store` object, specifying the store location, which is either the location for the current user or the local computer.

#### Examples
The following code example opens an X.509 certificate store, adds and deletes certificates, and then closes the store. It assumes that you have three certificates to add to and remove from a local store.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/OpenFlags/Overview/x509store2.cs._

## X509Store.X509Store(StoreName) constructor

```csharp
public X509Store (System.Security.Cryptography.X509Certificates.StoreName storeName);
```

Initializes a new instance of the `X509Store` class using the specified store name from the current user's certificate stores.

Parameters:

- `storeName`: One of the enumeration values that specifies the name of the X.509 certificate store.

Exceptions:

- `ArgumentException`: `storeName` is not a valid name.

#### Remarks
Use this constructor to create an X.509 store for the current user that corresponds to values enumerated by `StoreName`.

#### Examples
The following code example opens an X.509 certificate store, adds and deletes certificates, and then closes the store. It assumes that you have three certificates to add to and remove from a local store.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/OpenFlags/Overview/x509store2.cs._

## X509Store.X509Store(String) constructor

```csharp
public X509Store (string storeName);
```

Initializes a new instance of the `X509Store` class using the specified store name.

Parameters:

- `storeName`: The name of the certificate store.

#### Remarks
Use this constructor to create an `X509Store` object using a particular X.509 store name for the current user. To create a new store, specify a name that does not exist. A new store will be created with that name.

#### Examples
The following code example opens an X.509 certificate store, adds and deletes certificates, and then closes the store. It assumes that you have three certificates to add to and remove from a local store.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/OpenFlags/Overview/x509store2.cs._

## X509Store.X509Store(StoreName, StoreLocation) constructor

```csharp
public X509Store (System.Security.Cryptography.X509Certificates.StoreName storeName, System.Security.Cryptography.X509Certificates.StoreLocation storeLocation);
```

Initializes a new instance of the `X509Store` class using the specified `StoreName` and `StoreLocation` values.

Parameters:

- `storeName`: One of the enumeration values that specifies the name of the X.509 certificate store.
- `storeLocation`: One of the enumeration values that specifies the location of the X.509 certificate store.

Exceptions:

- `ArgumentException`: `storeLocation` is not a valid location or `storeName` is not a valid name.

#### Remarks
Use this constructor to create an `X509Store` object, specifying both the store name and the store location.

#### Examples
The following code example opens an X.509 certificate store, adds and deletes certificates, and then closes the store. It assumes that you have three certificates to add to and remove from a local store.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/OpenFlags/Overview/x509store2.cs._

## X509Store.X509Store(String, StoreLocation) constructor

```csharp
public X509Store (string storeName, System.Security.Cryptography.X509Certificates.StoreLocation storeLocation);
```

Initializes a new instance of the `X509Store` class using a specified store name and store location.

Parameters:

- `storeName`: The name of the certificate store.
- `storeLocation`: One of the enumeration values that specifies the location of the X.509 certificate store.

Exceptions:

- `ArgumentException`: `storeLocation` contains invalid values.

#### Remarks
Use this constructor to create an `X509Store` object using a store name and location. To create a new store, specify a name that does not exist. A new store will be created with that name.

#### Examples
The following code example opens an X.509 certificate store, adds and deletes certificates, and then closes the store. It assumes that you have three certificates to add to and remove from a local store.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/OpenFlags/Overview/x509store2.cs._

## X509Store.X509Store(StoreName, StoreLocation, OpenFlags) constructor

```csharp
public X509Store (System.Security.Cryptography.X509Certificates.StoreName storeName, System.Security.Cryptography.X509Certificates.StoreLocation storeLocation, System.Security.Cryptography.X509Certificates.OpenFlags flags);
```

Initializes a new instance of the `X509Store` class using the specified store name and store location values, then opens it using the specified flags.

Parameters:

- `storeName`: One of the enumeration values that specifies the name of the X.509 certificate store.
- `storeLocation`: One of the enumeration values that specifies the location of the X.509 certificate store.
- `flags`: A bitwise combination of enumeration values that specifies the way to open the X.509 certificate store.

Exceptions:

- `ArgumentException`: `storeLocation` is not a valid location or `storeName` is not a valid name.
- `CryptographicException`: The store cannot be opened.

To be added.

## X509Store.X509Store(String, StoreLocation, OpenFlags) constructor

```csharp
public X509Store (string storeName, System.Security.Cryptography.X509Certificates.StoreLocation storeLocation, System.Security.Cryptography.X509Certificates.OpenFlags flags);
```

Initializes a new instance of the `X509Store` class using the specified store name and store location values, then opens it using the specified flags.

Parameters:

- `storeName`: The name of the certificate store.
- `storeLocation`: One of the enumeration values that specifies the location of the X.509 certificate store.
- `flags`: A bitwise combination of enumeration values that specifies the way to open the X.509 certificate store.

Exceptions:

- `ArgumentException`: `storeLocation` is not a valid location.

To be added.

## X509Store.Certificates property

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate2Collection Certificates { get; }
```

Returns a collection of certificates located in an X.509 certificate store.

Returns: A collection of certificates.

#### Remarks
This method returns a snapshot of the X.509 certificate store. Note that subsequent `X509Store.Add` or `X509Store.Remove` operations performed on the store will not have any effect on the collection that is returned. This snapshot is recalculated each time the property is called, so the use of this property inside an iterative function is not recommended.

#### Examples
This section contains two examples. The first example demonstrates how you can open standard X.509 stores and list the number of certificates in each.

The second example demonstrates how you can add and remove single certificates and ranges of certificates.

**Example 1**

This example tries to open each standard store in each standard location on the current computer. It prints a summary that shows whether each store exists and, if so, the number of certificates it contains.

The example creates an `X509Store` object for each combination of standard name and standard location. It calls the `X509Store.Open` method with the `OpenExistingOnly` flag, which opens the physical store only if it already exists. If the physical store exists, the example uses the `X509Store.Name`, `X509Store.Location`, and `X509Store.Certificates` properties to display the number of certificates in the store.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/OpenFlags/Overview/storenames1.cs._

**Example 2**

This example opens an X.509 certificate store, adds and deletes certificates, and then closes the store. It assumes that you have three certificates to add to and remove from a local store.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/OpenFlags/Overview/x509store2.cs._

## X509Store.IsOpen property

```csharp
public bool IsOpen { get; }
```

Gets a value that indicates whether the instance is connected to an open certificate store.

Returns: `true` if the instance is connected to an open certificate store; otherwise, `false`.

To be added.

## X509Store.Location property

```csharp
public System.Security.Cryptography.X509Certificates.StoreLocation Location { get; }
```

Gets the location of the X.509 certificate store.

Returns: The location of the certificate store.

#### Remarks
This property returns the X.509 certificate store location of either the store for the current user or the store for the local computer.

#### Examples
This section contains two examples. The first example demonstrates how you can open standard X.509 stores and list the number of certificates in each.

The second example demonstrates how you can add and remove single certificates and ranges of certificates.

**Example 1**

This example tries to open each standard store in each standard location on the current computer. It prints a summary that shows whether each store exists and, if so, the number of certificates it contains.

The example creates an `X509Store` object for each combination of standard name and standard location. It calls the `X509Store.Open` method with the `OpenExistingOnly` flag, which opens the physical store only if it already exists. If the physical store exists, the example uses the `X509Store.Name`, `X509Store.Location`, and `X509Store.Certificates` properties to display the number of certificates in the store.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/OpenFlags/Overview/storenames1.cs._

**Example 2**

This example opens an X.509 certificate store, adds and deletes certificates, and then closes the store. It assumes that you have three certificates to add to and remove from a local store.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/OpenFlags/Overview/x509store2.cs._
