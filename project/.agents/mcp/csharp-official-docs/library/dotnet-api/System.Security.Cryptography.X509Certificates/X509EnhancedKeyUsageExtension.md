---
title: "X509EnhancedKeyUsageExtension class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509EnhancedKeyUsageExtension.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509EnhancedKeyUsageExtension class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public sealed class X509EnhancedKeyUsageExtension : System.Security.Cryptography.X509Certificates.X509Extension
```

Defines the collection of object identifiers (OIDs) that indicates the applications that use the key. This class cannot be inherited.

#### Remarks
An enhanced key usage (EKU) extension is a collection of object identifiers (OIDs) that indicate the applications that use the key.

#### Examples
The following code example demonstrates how to open a user's personal certificate store and display information about each certificate in the store.  This example uses the `X509EnhancedKeyUsageExtension` class to display the information.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509BasicConstraintsExtension/Overview/sample.cs._

## X509EnhancedKeyUsageExtension.X509EnhancedKeyUsageExtension() constructor

```csharp
public X509EnhancedKeyUsageExtension ();
```

Initializes a new instance of the `X509EnhancedKeyUsageExtension` class.

#### Remarks
Use this method to create a new instance of the `X509EnhancedKeyUsageExtension` class. After the instance has been created, you can then use the `EnhancedKeyUsages` property to obtain the collection of object identifiers (OIDs) that indicate the applications that use the key.

#### Examples
The following code example demonstrates how to open a user's personal certificate store and display information about each certificate in the store.  This example uses the `X509EnhancedKeyUsageExtension` class to display the information.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509BasicConstraintsExtension/Overview/sample.cs._

## X509EnhancedKeyUsageExtension.X509EnhancedKeyUsageExtension(AsnEncodedData, Boolean) constructor

```csharp
public X509EnhancedKeyUsageExtension (System.Security.Cryptography.AsnEncodedData encodedEnhancedKeyUsages, bool critical);
```

Initializes a new instance of the `X509EnhancedKeyUsageExtension` class using an `AsnEncodedData` object and a value that identifies whether the extension is critical.

Parameters:

- `encodedEnhancedKeyUsages`: The encoded data to use to create the extension.
- `critical`: `true` if the extension is critical; otherwise, `false`.

#### Remarks
Use this constructor if the information to create the extension is already in an `AsnEncodedData` object.

## X509EnhancedKeyUsageExtension.X509EnhancedKeyUsageExtension(OidCollection, Boolean) constructor

```csharp
public X509EnhancedKeyUsageExtension (System.Security.Cryptography.OidCollection enhancedKeyUsages, bool critical);
```

Initializes a new instance of the `X509EnhancedKeyUsageExtension` class using an `OidCollection` and a value that identifies whether the extension is critical.

Parameters:

- `enhancedKeyUsages`: An `OidCollection` collection.
- `critical`: `true` if the extension is critical; otherwise, `false`.

Exceptions:

- `CryptographicException`: The specified `OidCollection` contains one or more corrupt values.

To be added.

## X509EnhancedKeyUsageExtension.EnhancedKeyUsages property

```csharp
public System.Security.Cryptography.OidCollection EnhancedKeyUsages { get; }
```

Gets the collection of object identifiers (OIDs) that indicate the applications that use the key.

Returns: An `OidCollection` object indicating the applications that use the key.

#### Examples
The following code example demonstrates how to open a user's personal certificate store and display information about each certificate in the store.  This example uses the `X509EnhancedKeyUsageExtension` class to display the information.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509BasicConstraintsExtension/Overview/sample.cs._

## X509EnhancedKeyUsageExtension.CopyFrom(AsnEncodedData) method

```csharp
public override void CopyFrom (System.Security.Cryptography.AsnEncodedData asnEncodedData);
```

Initializes a new instance of the `X509EnhancedKeyUsageExtension` class using an `AsnEncodedData` object.

Parameters:

- `asnEncodedData`: The encoded data to use to create the extension.

To be added.
