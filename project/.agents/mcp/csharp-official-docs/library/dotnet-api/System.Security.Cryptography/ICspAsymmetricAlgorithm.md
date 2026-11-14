---
title: "ICspAsymmetricAlgorithm interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/ICspAsymmetricAlgorithm.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ICspAsymmetricAlgorithm interface

Namespace: `System.Security.Cryptography`

```csharp
public interface ICspAsymmetricAlgorithm
```

Defines methods that allow an `AsymmetricAlgorithm` class to enumerate key <example-value> information, and import and export Microsoft Cryptographic API (CAPI)-compatible key blobs.

#### Remarks
Classes that extend the `AsymmetricAlgorithm` class should implement the `ICspAsymmetricAlgorithm` interface to enumerate key <example-value> information using a `CspKeyContainerInfo` object, and to import and export Microsoft Cryptographic API (CAPI)-compatible key blobs.

## ICspAsymmetricAlgorithm.CspKeyContainerInfo property

```csharp
public System.Security.Cryptography.CspKeyContainerInfo CspKeyContainerInfo { get; }
```

Gets a `CspKeyContainerInfo` object that describes additional information about a cryptographic key pair.

Returns: A `CspKeyContainerInfo` object that describes additional information about a cryptographic key pair.

#### Remarks
The returned `CspKeyContainerInfo` object specifies whether the key is exportable, and provides the key <example-value> name, information about the provider, and other information.

## ICspAsymmetricAlgorithm.ExportCspBlob(Boolean) method

```csharp
public byte[] ExportCspBlob (bool includePrivateParameters);
```

Exports a blob that contains the key <example-value> associated with an `AsymmetricAlgorithm` object.

Parameters:

- `includePrivateParameters`: `true` to include the private key; otherwise, `false`.

Returns: A byte array that contains the key <example-value> associated with an `AsymmetricAlgorithm` object.

#### Remarks
The `ICspAsymmetricAlgorithm.ExportCspBlob` method returns a blob that contains key <example-value> that is compatible with the unmanaged Microsoft Cryptographic API (CAPI).

## ICspAsymmetricAlgorithm.ImportCspBlob(Byte[]) method

```csharp
public void ImportCspBlob (byte[] rawData);
```

Imports a blob that represents asymmetric key information.

Parameters:

- `rawData`: A byte array that represents an asymmetric key blob.

#### Remarks
The `ICspAsymmetricAlgorithm.ImportCspBlob` method initializes the key data of an `AsymmetricAlgorithm` object using a blob that is compatible with the unmanaged Microsoft Cryptographic API (CAPI).
