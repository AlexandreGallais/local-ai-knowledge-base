---
title: "X509Store class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509Store.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509Store class (part 2 of 2)

## X509Store.Name property

```csharp
public string? Name { get; }
```

Gets the name of the X.509 certificate store.

Returns: The name of the certificate store.

#### Remarks
This property returns the X.509 certificate store name. This value can indicate the type of certificates stored, such as root certificates or certificates from trusted publishers.

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

## X509Store.StoreHandle property

```csharp
public IntPtr StoreHandle { get; }
```

Gets an `IntPtr` handle to an `HCERTSTORE` store.

Returns: A handle to an `HCERTSTORE` store.

Exceptions:

- `CryptographicException`: The store is not open.

#### Remarks
Use the `StoreHandle` property to provide compatibility with the unmanaged Microsoft Cryptographic API (CAPI).

## X509Store.Add(X509Certificate2) method

```csharp
public void Add (System.Security.Cryptography.X509Certificates.X509Certificate2 certificate);
```

Adds a certificate to an X.509 certificate store.

Parameters:

- `certificate`: The certificate to add.

Exceptions:

- `ArgumentNullException`: `certificate` is `null`.
- `CryptographicException`: The certificate could not be added to the store.

#### Remarks
Use this method to add a single certificate to an X.509 store.

#### Examples
The following code example opens an X.509 certificate store, adds and deletes certificates, and then closes the store. It assumes that you have three certificates to add to and remove from a local store.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/OpenFlags/Overview/x509store2.cs._

## X509Store.AddRange(X509Certificate2Collection) method

```csharp
public void AddRange (System.Security.Cryptography.X509Certificates.X509Certificate2Collection certificates);
```

Adds a collection of certificates to an X.509 certificate store.

Parameters:

- `certificates`: The collection of certificates to add.

Exceptions:

- `ArgumentNullException`: `certificates` is `null`.
- `SecurityException`: The caller does not have the required permission.

#### Remarks
This method adds more than one certificate to an X.509 certificate store; if one certificate addition fails, the operation is reverted and no certificates are added.

#### Examples
The following code example opens an X.509 certificate store, adds and deletes certificates, and then closes the store. It assumes that you have three certificates to add to and remove from a local store.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/OpenFlags/Overview/x509store2.cs._

## X509Store.Close() method

```csharp
public void Close ();
```

Closes an X.509 certificate store.

#### Remarks
This method releases all resources associated with the store. You should always close an X.509 certificate store after use.

#### Examples
The following code example opens an X.509 certificate store, adds and deletes certificates, and then closes the store. It assumes that you have three certificates to add to and remove from a local store.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/OpenFlags/Overview/x509store2.cs._

## X509Store.Dispose() method

```csharp
public void Dispose ();
```

Releases the resources used by this `X509Store`.

To be added.

## X509Store.Open(OpenFlags) method

```csharp
public void Open (System.Security.Cryptography.X509Certificates.OpenFlags flags);
```

Opens an X.509 certificate store or creates a new store, depending on `OpenFlags` flag settings.

Parameters:

- `flags`: A bitwise combination of enumeration values that specifies the way to open the X.509 certificate store.

Exceptions:

- `CryptographicException`: The store cannot be opened as requested.
- `SecurityException`: The caller does not have the required permission.
- `ArgumentException`: The store contains invalid values.

#### Remarks
Use this method to open an existing X.509 store. Note that you must have additional permissions, specified by `StorePermissionFlags`, to enumerate the certificates in the store. You can create a new store by passing a store name that does not exist to the class constructor, and then using any of the `OpenFlags` flags except `OpenExistingOnly`.

#### Examples
The following code example opens an X.509 certificate store, adds and deletes certificates, and then closes the store. It assumes that you have three certificates to add to and remove from a local store.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/OpenFlags/Overview/x509store2.cs._

## X509Store.Remove(X509Certificate2) method

```csharp
public void Remove (System.Security.Cryptography.X509Certificates.X509Certificate2 certificate);
```

Removes a certificate from an X.509 certificate store.

Parameters:

- `certificate`: The certificate to remove.

Exceptions:

- `ArgumentNullException`: `certificate` is `null`.
- `SecurityException`: The caller does not have the required permission.

#### Remarks
Use this method to remove a single certificate from an X.509 store.

#### Examples
The following code example opens an X.509 certificate store, adds and deletes certificates, and then closes the store. It assumes that you have three certificates to add to and remove from a local store.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/OpenFlags/Overview/x509store2.cs._

## X509Store.RemoveRange(X509Certificate2Collection) method

```csharp
public void RemoveRange (System.Security.Cryptography.X509Certificates.X509Certificate2Collection certificates);
```

Removes a range of certificates from an X.509 certificate store.

Parameters:

- `certificates`: A range of certificates to remove.

Exceptions:

- `ArgumentNullException`: `certificates` is `null`.
- `SecurityException`: The caller does not have the required permission.

#### Remarks

> **Important:**
> This type implements the `IDisposable` interface. When you've finished using the type, you should dispose of it either directly (by calling its `Dispose` method) or indirectly (with a language construct such as `using` in C#). For more information, see Use an object that implements IDisposable.

This method removes more than one certificate from an X.509 certificate store; if one certificate removal fails, the operation is reverted and no certificates are removed.

#### Examples
The following code example opens an X.509 certificate store, adds and deletes certificates, and then closes the store. It assumes that you have three certificates to add to and remove from a local store.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/OpenFlags/Overview/x509store2.cs._
