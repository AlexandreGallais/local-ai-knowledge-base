---
title: "X509Chain class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509Chain.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509Chain class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public class X509Chain : IDisposable
```

Represents a chain-building engine for `X509Certificate2` certificates.

#### Remarks
The `X509Chain` object has a global error status called `X509Chain.ChainStatus` that should be used for certificate validation. The rules governing certificate validation are complex, and it is easy to oversimplify the validation logic by ignoring the error status of one or more of the elements involved. The global error status takes into consideration the status of each element in the chain.

> **Important:**
> This type implements the `IDisposable` interface. When you've finished using the type, you should dispose of it either directly (by calling its `Dispose` method) or indirectly (with a language construct such as `using` in C#). For more information, see Use an object that implements IDisposable.

When disposing `X509Chain`, the certificates in `ChainElements` are not disposed. You should dispose of the certificates in this collection when the certificate instances are no longer needed.

#### Examples
The following code example opens the current user's personal certificate store, allows you to select a certificate, then writes certificate and certificate chain information to the console. The output depends on the certificate you select.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Chain/Overview/x509chaintest.cs._

## X509Chain.X509Chain() constructor

```csharp
public X509Chain ();
```

Initializes a new instance of the `X509Chain` class.

#### Examples
The following code example opens the current user's personal certificate store, allows you to select a certificate, then writes certificate and certificate chain information to the console. The output depends on the certificate you select.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Chain/Overview/x509chaintest.cs._

## X509Chain.X509Chain(Boolean) constructor

```csharp
public X509Chain (bool useMachineContext);
```

Initializes a new instance of the `X509Chain` class specifying a value that indicates whether the machine context should be used.

Parameters:

- `useMachineContext`: `true` to use the machine context; `false` to use the current user context.

#### Remarks
This constructor can be used when the user profile is not loaded and the machine context needs to be used. When the `useMachineContext` parameter is set to `true`, the local machine context (HCCE_LOCAL_MACHINE flag) is used to create the chain. If the parameter is set to `false`, the current user context (HCCE_CURRENT_USER flag) is used.

#### Examples
The following code example opens the current user's personal certificate store, allows you to select a certificate, then writes certificate and certificate chain information to the console. The output depends on the certificate you select.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Chain/Overview/x509chaintest.cs._

## X509Chain.X509Chain(IntPtr) constructor

```csharp
public X509Chain (IntPtr chainContext);
```

Initializes a new instance of the `X509Chain` class using an `IntPtr` handle to an X.509 chain.

Parameters:

- `chainContext`: An `IntPtr` handle to an X.509 chain.

Exceptions:

- `ArgumentNullException`: The `chainContext` parameter is `null`.
- `CryptographicException`: The `chainContext` parameter points to an invalid context.

#### Remarks
Use this constructor to provide compatibility with the unmanaged Microsoft Cryptographic API (CAPI).

## X509Chain.ChainContext property

```csharp
public IntPtr ChainContext { get; }
```

Gets a handle to an X.509 chain.

Returns: An `IntPtr` handle to an X.509 chain.

#### Remarks
Use this property to return a handle that is compatible with the unmanaged Microsoft Cryptographic API (CAPI).

## X509Chain.ChainElements property

```csharp
public System.Security.Cryptography.X509Certificates.X509ChainElementCollection ChainElements { get; }
```

Gets a collection of `X509ChainElement` objects.

Returns: An `X509ChainElementCollection` object.

#### Remarks
Each `X509ChainElement` object is a representation of an element in the chain that was built during a call to the `X509Chain.Build` method.

A chain element consists of an `X509Certificate2` object, an `X509ChainStatus` structure, and an extra information string.

The `ChainElements` collection is ordered from the end-entity (leaf) certificate at index 0, through any intermediate certificates, to the trust anchor (root certificate) at the final index. This ordering is consistent across all platforms.

#### Examples
The following code example demonstrates the ordering of chain elements:

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Chain/Overview/chainelements-ordering.cs._
The following code example opens the current user's personal certificate store, allows you to select a certificate, then writes certificate and certificate chain information to the console. The output depends on the certificate you select.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Chain/Overview/x509chaintest.cs._

## X509Chain.ChainPolicy property

```csharp
public System.Security.Cryptography.X509Certificates.X509ChainPolicy ChainPolicy { get; set; }
```

Gets or sets the `X509ChainPolicy` to use when building an X.509 certificate chain.

Returns: The `X509ChainPolicy` object associated with this X.509 chain.

Exceptions:

- `ArgumentNullException`: The value being set for this property is `null`.

#### Remarks
Use this property to set chain policy. For example, you can specify the Enhanced Key Usage (EKU) for which the chain should be validated, or specify revocation checking.

#### Examples
The following code example opens the current user's personal certificate store, allows you to select a certificate, then writes certificate and certificate chain information to the console. The output depends on the certificate you select.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Chain/Overview/x509chaintest.cs._

## X509Chain.ChainStatus property

```csharp
public System.Security.Cryptography.X509Certificates.X509ChainStatus[] ChainStatus { get; }
```

Gets the status of each element in an `X509Chain` object.

Returns: An array of `X509ChainStatus` objects.

#### Remarks
Use this property to get detailed error information for the status of the chain.

## X509Chain.SafeHandle property

```csharp
public Microsoft.Win32.SafeHandles.SafeX509ChainHandle? SafeHandle { get; }
```

Gets a safe handle for this `X509Chain` instance.

Returns: The safe handle for this `X509Chain` instance.

To be added.

## X509Chain.Build(X509Certificate2) method

```csharp
public bool Build (System.Security.Cryptography.X509Certificates.X509Certificate2 certificate);
```

Builds an X.509 chain using the policy specified in `X509ChainPolicy`.

Parameters:

- `certificate`: An `X509Certificate2` object.

Returns: `true` if the X.509 certificate is valid; otherwise, `false`.

Exceptions:

- `ArgumentException`: The `certificate` is not a valid certificate or is `null`.
- `CryptographicException`: The `certificate` is unreadable.

#### Remarks
Note that a valid X.509 certificate from a trusted issuer is valid only for the use specified in the `X509ChainPolicy` object. Certificates that meet these chain policy rules might still be invalid for specific uses with such features as Security/MIME (SMIME), Authenticode, or Secure Sockets Layer (SSL). If further processing is required to determine whether the certificate is valid for a specific policy, derive a class from `X509Chain` and override the `X509Chain.Build` method so that it calls the base class `Build` method first, and then does the additional processing.

On Linux and other OpenSSL-based platforms, .NET 11 and later versions limit AIA certificate downloads to two per chain build. A chain that requires more than two AIA downloads can't be completed using those downloads alone.

#### Examples
The following code example opens the current user's personal certificate store, allows you to select a certificate, then writes certificate and certificate chain information to the console. The output depends on the certificate you select.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Chain/Overview/x509chaintest.cs._

## X509Chain.Create() method

```csharp
public static System.Security.Cryptography.X509Certificates.X509Chain Create ();
```

Creates an `X509Chain` object after querying for the mapping defined in the CryptoConfig file, and maps the chain to that mapping.

Returns: An `X509Chain` object.

#### Remarks
By default, this method will create an X.509 chain. You can also use this method when the default chain-building engine is overridden in the Machine.config file. Note that for compatibility, any chain engine must attempt to honor the call and return semantics of the default chain engine.

## X509Chain.Dispose() method

```csharp
public void Dispose ();
```

Releases all of the resources used by this `X509Chain`.

To be added.

## X509Chain.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by this `X509Chain`, and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

To be added.

## X509Chain.Reset() method

```csharp
public void Reset ();
```

Clears the current `X509Chain` object.

To be added.
