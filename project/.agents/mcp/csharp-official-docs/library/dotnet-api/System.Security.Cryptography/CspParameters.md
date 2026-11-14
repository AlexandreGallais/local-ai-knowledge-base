---
title: "CspParameters class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/CspParameters.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CspParameters class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class CspParameters
```

Contains parameters that are passed to the cryptographic service provider (CSP) that performs cryptographic computations. This class cannot be inherited.

#### Remarks
The `CspParameters` class represents parameters that you can pass to managed cryptography classes that internally use Microsoft Cryptographic Service Providers (CSPs) from the unmanaged Microsoft Cryptography API (CAPI). Classes with names ending in "CryptoServiceProvider" are managed code wrappers for the corresponding CSP.

Use the `CspParameters` class to do the following:

- Specify a particular CSP by passing the provider type to the `ProviderType` or `ProviderName` property.  You can also specify a CSP using an overload of the constructor.

- Create a key <example-value> where you can store cryptographic keys.  Key <example-value> provide the most secure way to persist cryptographic keys and keep them secret from malicious third parties.  For more information about creating key <example-value>, see How to: Store Asymmetric Keys in a Key Container.

- Specify whether to create an asymmetric signature key or an asymmetric exchange key using the `KeyNumber` property.

#### Examples
The following code example creates a key <example-value> using the `CspParameters` class and saves the key in the container.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/CspParameters/Overview/capikey.cs._

The following code example uses the `CspParameters` class to select a Smart Card Cryptographic Service Provider.  It then signs and verifies data using the smart card.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/CspParameters/Overview/example.cs._

## CspParameters.CspParameters() constructor

```csharp
public CspParameters ();
```

Initializes a new instance of the `CspParameters` class.

#### Remarks
This form of `CspParameters.%23ctor` initializes the `ProviderType` field to a value of `24`, which specifies the PROV_RSA_AES provider.  This default provider is compatible with the `Aes` algorithm.

For information about other provider types, see the `ProviderType` field.

#### Examples
The following code example creates a key <example-value> using the `CspParameters` class and saves the key in the container.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/CspParameters/Overview/capikey.cs._

## CspParameters.CspParameters(Int32) constructor

```csharp
public CspParameters (int dwTypeIn);
```

Initializes a new instance of the `CspParameters` class with the specified provider type code.

Parameters:

- `dwTypeIn`: A provider type code that specifies the kind of provider to create.

#### Remarks
Use the `CspParameters.%23ctor` constructor to specify a provider type by passing a numeric value that represents that provider.  The numeric values that represent the default provider types are defined in the WinCrypt.h header file:

- To specify a provider compatible with the `RSA` algorithm, pass a value of `1` to the `dwTypeIn` parameter.

- To specify a provider compatible with the `DSA` algorithm, pass a value of `13` to the `dwTypeIn` parameter.

For information about other provider type values, see the `ProviderType` field.  For more information about the default provider types and their behaviors, see the Microsoft Cryptography API (CAPI) documentation.

## CspParameters.CspParameters(Int32, String) constructor

```csharp
public CspParameters (int dwTypeIn, string? strProviderNameIn);
```

Initializes a new instance of the `CspParameters` class with the specified provider type code and name.

Parameters:

- `dwTypeIn`: A provider type code that specifies the kind of provider to create.
- `strProviderNameIn`: A provider name.

#### Remarks
Use the `CspParameters.%23ctor` constructor to specify a provider type and name.

Specify a provider type by passing a numeric value that represents the desired provider type.  The numeric values that represent the default provider types are defined in the WinCrypt.h header file:

- To specify a provider compatible with the `RSA` algorithm, pass a value of `1` to the `dwTypeIn` parameter.

- To specify a provider compatible with the `DSA` algorithm, pass a value of `13` to the `dwTypeIn` parameter.

For information about other provider type values, see the `ProviderType` field.  For more information about the default provider types and their behaviors, see the Microsoft Cryptography API (CAPI) documentation.

#### Examples
The following code example uses the `CspParameters` class to select a Smart Card Cryptographic Service Provider.  It then signs and verifies data using the smart card.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/CspParameters/Overview/example.cs._

## CspParameters.CspParameters(Int32, String, String) constructor

```csharp
public CspParameters (int dwTypeIn, string? strProviderNameIn, string? strContainerNameIn);
```

Initializes a new instance of the `CspParameters` class with the specified provider type code and name, and the specified container name.

Parameters:

- `dwTypeIn`: The provider type code that specifies the kind of provider to create.
- `strProviderNameIn`: A provider name.
- `strContainerNameIn`: A container name.

#### Remarks
Use the `CspParameters.%23ctor` constructor to specify a provider type, a provider name, and a container name.

You can use the container name to retrieve a key <example-value> that container.

Specify a provider type by passing a numeric value that represents the desired provider type.  The numeric values that represent the default provider types are defined in the WinCrypt.h header file:

- To specify a provider compatible with the `RSA` algorithm, pass a value of `1` to the `dwTypeIn` parameter.

- To specify a provider compatible with the `DSA` algorithm, pass a value of `13` to the `dwTypeIn` parameter.

For information about other provider type values, see the `ProviderType` field.  For more information about the default provider types and their behaviors, see the Microsoft Cryptography API (CAPI) documentation.

## CspParameters.Flags property

```csharp
public System.Security.Cryptography.CspProviderFlags Flags { get; set; }
```

Represents the flags for `CspParameters` that modify the behavior of the cryptographic service provider (CSP).

Returns: An enumeration value, or a bitwise combination of enumeration values.

Exceptions:

- `ArgumentException`: Value is not a valid enumeration value.

To be added.

## CspParameters.KeyPassword <example-value>

```csharp
public System.Security.SecureString? KeyPassword { get; set; }
```

Gets or sets a password <example-value> with a smart card key.

Returns: A password <example-value> with a smart card key.

#### Remarks
Use the `KeyPassword` property to supply a password for a smart card key.  When you specify a password using this property, a password <example-value> box will not be presented to the user.

## CspParameters.ParentWindowHandle property

```csharp
public IntPtr ParentWindowHandle { get; set; }
```

Gets or sets a handle to the unmanaged parent window for a smart card password <example-value> box.

Returns: A handle to the parent window for a smart card password <example-value> box.

#### Remarks
Use the `ParentWindowHandle` property to specify a handle to the unmanaged parent window for a smart card password <example-value> box.  When you specify a handle using this property, a smart card password <example-value> box will be presented to the user.

You can avoid presenting a smart card password <example-value> box by explicitly specifying a password by using the `KeyPassword` property.

## CspParameters.KeyContainerName field

```csharp
public string? KeyContainerName;
```

Represents the key <example-value> name for `CspParameters`.

#### Remarks
Use the `KeyContainerName` field to specify a name for your key container.  You can use the container name to retrieve the persisted key <example-value> that container.

For more information about creating key <example-value>, see How to: Store Asymmetric Keys in a Key Container.

#### Examples
The following code example creates a key <example-value> using the `CspParameters` class and saves the key in the container.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/CspParameters/Overview/capikey.cs._

## CspParameters.KeyNumber field

```csharp
public int KeyNumber;
```

Specifies whether an asymmetric key is created as a signature key or an exchange key.

#### Remarks
The `KeyNumber` field initializes the `KeyNumber` property when you initialize a `CspKeyContainerInfo` object with a `CspParameters` object.

An exchange key is an asymmetric key pair used to encrypt session keys so that they can be safely stored and exchanged with other users.  You can use the `Exchange` value (`1`) to specify an exchange key.  This value corresponds to the `AT_KEYEXCHANGE` value used in the unmanaged Microsoft Cryptographic API (CAPI).

A signature key is an asymmetric key pair used for authenticating digitally signed messages or files.  You can use the `Signature` value (`2`) to specify a signature key.  This value corresponds to the `AT_SIGNATURE` value used in CAPI.

By default, the `KeyNumber` field specifies an exchange key.

#### Examples
The following code example demonstrates how to use the `KeyNumber` enumeration to specify a key type for an `RSACryptoServiceProvider` object.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/CspParameters/KeyNumber/sample.cs._

## CspParameters.ProviderName field

```csharp
public string? ProviderName;
```

Represents the provider name for `CspParameters`.

#### Remarks

For details on provider names, see the Microsoft Cryptography API (CAPI) documentation.

## CspParameters.ProviderType field

```csharp
public int ProviderType;
```

Represents the provider type code for `CspParameters`.

#### Remarks
Use the `ProviderType` field to specify a provider type by passing a numeric value that represents that provider.  The numeric values that represent the default provider types are defined in the WinCrypt.h header file:

- To specify a provider compatible with the `RSA` class, pass a value of `1`.

- To specify a provider compatible with the `DSA` class, pass a value of `13`.

The following table lists the provider types and their corresponding numeric values defined in the WinCrypt.h header file.

|Provider Type|Numeric Value|
|-------------------|-------------------|
|`PROV_RSA_FULL`|1|
|`PROV_RSA_SIG`|2|
|`PROV_DSS`|3|
|`PROV_FORTEZZA`|4|
|`PROV_MS_EXCHANGE`|5|
|`PROV_SSL`|6|
|`PROV_RSA_SCHANNEL`|12|
|`PROV_DSS_DH`|13|
|`PROV_EC_ECDSA_SIG`|14|
|`PROV_EC_ECNRA_SIG`|15|
|`PROV_EC_ECDSA_FULL`|16|
|`PROV_EC_ECNRA_FULL`|17|
|`PROV_DH_SCHANNEL`|18|
|`PROV_SPYRUS_LYNKS`|20|
|`PROV_RNG`|21|
|`PROV_INTEL_SEC`|22|
|`PROV_REPLACE_OWF`|23|
|`PROV_RSA_AES`|24|

For more information about the default provider types and their behaviors, see the Microsoft Cryptography API (CAPI) documentation.
