---
title: "ApplicationId class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ApplicationId.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ApplicationId class

Namespace: `System`

```csharp
public sealed class ApplicationId
```

Contains information used to uniquely identify a manifest-based application. This class cannot be inherited.

#### Remarks
An application identity consists of the publisher's public key, the application name, the target processor architecture, the application culture, and the application version. The application identity properties values correspond to information contained in the application manifest. For more information about the application manifest, see ClickOnce Application Manifest.

`ApplicationId` is used by the `ApplicationSecurityInfo` class to identify a manifest-based application.

## ApplicationId.ApplicationId(Byte[], String, Version, String, String) constructor

```csharp
public ApplicationId (byte[] publicKeyToken, string name, Version version, string? processorArchitecture, string? culture);
```

Initializes a new instance of the `ApplicationId` class.

Parameters:

- `publicKeyToken`: The array of bytes representing the raw public key data.
- `name`: The name of the application.
- `version`: A `Version` object that specifies the version of the application.
- `processorArchitecture`: The processor architecture of the application.
- `culture`: The culture of the application.

Exceptions:

- `ArgumentNullException`: `name` is `null`.

-or-

`version` is `null`.

-or-

`publicKeyToken` is `null`.
- `ArgumentException`: `name` is an empty string.

#### Remarks
The constructor initializes the `ApplicationId.Culture`, `ApplicationId.Name`, `ApplicationId.ProcessorArchitecture`, `ApplicationId.PublicKeyToken`, and `ApplicationId.Version` properties of the `ApplicationId`.

## ApplicationId.Culture property

```csharp
public string? Culture { get; }
```

Gets a string representing the culture information for the application.

Returns: The culture information for the application.

#### Remarks
The `ApplicationId.Culture` value can include language information, for example, "en-US".

For information about culture values, see `CultureInfo`.

## ApplicationId.Name property

```csharp
public string Name { get; }
```

Gets the name of the application.

Returns: The name of the application.

#### Remarks
`ApplicationId.Name` is the simple, unencrypted name of the application.

## ApplicationId.ProcessorArchitecture property

```csharp
public string? ProcessorArchitecture { get; }
```

Gets the target processor architecture for the application.

Returns: The processor architecture of the application.

#### Remarks
Valid values include "msil", "x86", "ia64", and "amd64". The default is "msil", or Microsoft intermediate language, which means all your assemblies are platform independent, and the common language runtime will compile them when they are needed by your application.

## ApplicationId.PublicKeyToken <example-value>

```csharp
public byte[] PublicKeyToken { get; }
```

Gets the public key token for the application.

Returns: A byte array containing the public key token for the application.

#### Remarks
The public key token is represented by the last 8 bytes of the SHA-1 hash of the public key under which the application is signed.

For more information, see `AssemblyName.GetPublicKeyToken`.

## ApplicationId.Version property

```csharp
public Version Version { get; }
```

Gets the version of the application.

Returns: A `Version` that specifies the version of the application.

#### Remarks
For more information, see `Version`.

## ApplicationId.Copy() method

```csharp
public ApplicationId Copy ();
```

Creates and returns an identical copy of the current application identity.

Returns: An `ApplicationId` object that represents an exact copy of the original.

#### Remarks
The copy returned by this method is equal to the original as substantiated by the `ApplicationId.Equals` method. The hash codes for the original and the copy are also equal.

## ApplicationId.Equals(Object) method

```csharp
public override bool Equals (object? o);
```

Determines whether the specified `ApplicationId` object is equivalent to the current `ApplicationId`.

Parameters:

- `o`: The `ApplicationId` object to compare to the current `ApplicationId`.

Returns: `true` if the specified `ApplicationId` object is equivalent to the current `ApplicationId`; otherwise, `false`.

#### Remarks
This method overrides the `Equals` method.

## ApplicationId.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Gets the hash code for the current application identity.

Returns: The hash code for the current application identity.

#### Remarks
This method generates the same hash code for two objects that have the same values for their `ApplicationId.Name` and `ApplicationId.Version` properties.

## ApplicationId.ToString() method

```csharp
public override string ToString ();
```

Creates and returns a string representation of the application identity.

Returns: A string representation of the application identity.

#### Remarks
This method overrides the `Object.ToString` method.
