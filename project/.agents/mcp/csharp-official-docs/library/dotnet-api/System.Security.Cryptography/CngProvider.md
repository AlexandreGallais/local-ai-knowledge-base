---
title: "CngProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/CngProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CngProvider class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class CngProvider : IEquatable<System.Security.Cryptography.CngProvider>
```

Encapsulates the name of a key <example-value> provider (KSP) for use with Cryptography Next Generation (CNG) objects.

#### Remarks
The `CngProvider` class is a utility class. It consists of static properties, comparison methods, and a private, internally maintained string that specifies a key <example-value> provider.

The static properties return `CngProvider` objects. Each object's internal string is initialized to the provider name that corresponds to the name of the static property.

You can also use this class to create objects for provider types that are not covered by the static properties.

Several CNG classes (such as `CngKey`) accept `CngProvider` objects through a `provider` parameter. When the class receives the `CngProvider` object, it retrieves the embedded provider name by calling the object's `Provider` property.

Therefore, `CngProvider` serves as an enumeration of well-known providers. It lets you identify a provider by using a strongly typed value instead of a string.

> **Note:**
> CNG classes don't work on non-Windows platforms.

## CngProvider.CngProvider(String) constructor

```csharp
public CngProvider (string provider);
```

Initializes a new instance of the `CngProvider` class.

Parameters:

- `provider`: The name of the key <example-value> provider (KSP) to initialize.

Exceptions:

- `ArgumentNullException`: The `provider` parameter is `null`.
- `ArgumentException`: The `provider` parameter length is 0 (zero).

#### Remarks
Instances of the `CngProvider` class internally maintain the provider name specified by the `provider` parameter.

The primary purpose of this constructor is to provide a method for creating `CngProvider` objects for KSPs that are not represented by the static properties of the `CngProvider` class. This capacity enables future .NET releases and third-party developers to add new providers, which can be accessed just like the providers that are currently available.

## CngProvider.MicrosoftPlatformCryptoProvider property

```csharp
public static System.Security.Cryptography.CngProvider MicrosoftPlatformCryptoProvider { get; }
```

Gets a `CngProvider` object that specifies the Microsoft Platform Crypto Storage Provider.

Returns: An object that specifies the Microsoft Platform Crypto Storage Provider.

To be added.

## CngProvider.MicrosoftSmartCardKeyStorageProvider property

```csharp
public static System.Security.Cryptography.CngProvider MicrosoftSmartCardKeyStorageProvider { get; }
```

Gets a `CngProvider` object that specifies the Microsoft Smart Card Key <example-value> Provider.

Returns: An object that specifies the Microsoft Smart Card Key <example-value> Provider.

To be added.

## CngProvider.MicrosoftSoftwareKeyStorageProvider property

```csharp
public static System.Security.Cryptography.CngProvider MicrosoftSoftwareKeyStorageProvider { get; }
```

Gets a `CngProvider` object that specifies the Microsoft Software Key <example-value> Provider.

Returns: An object that specifies the Microsoft Software Key <example-value> Provider.

To be added.

## CngProvider.Provider property

```csharp
public string Provider { get; }
```

Gets the name of the key <example-value> provider (KSP) that the current `CngProvider` object specifies.

Returns: The embedded KSP name.

To be added.

## CngProvider.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Compares the specified object to the current `CngProvider` object.

Parameters:

- `obj`: An object to be compared to the current `CngProvider` object.

Returns: `true` if the `obj` parameter is a `CngProvider` that specifies the same key <example-value> provider(KSP) as the current object; otherwise, `false`.

To be added.

## CngProvider.Equals(CngProvider) method

```csharp
public bool Equals (System.Security.Cryptography.CngProvider? other);
```

Compares the specified `CngProvider` object to the current `CngProvider` object.

Parameters:

- `other`: An object to be compared to the current `CngProvider` object.

Returns: `true` if the `other` parameter specifies the same key <example-value> provider (KSP) as the current object; otherwise, `false`.

To be added.

## CngProvider.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Generates a hash value for the name of the key <example-value> provider (KSP) that is embedded in the current `CngProvider` object.

Returns: The hash value of the embedded KSP name.

To be added.

## CngProvider.op_Equality(CngProvider, CngProvider) method

```csharp
public static bool operator == (System.Security.Cryptography.CngProvider? left, System.Security.Cryptography.CngProvider? right);
```

Determines whether two `CngProvider` objects specify the same key <example-value> provider (KSP).

Parameters:

- `left`: An object that specifies a KSP.
- `right`: A second object, to be compared to the object that is identified by the `left` parameter.

Returns: `true` if the two objects represent the same KSP; otherwise, `false`.

To be added.

## CngProvider.op_Inequality(CngProvider, CngProvider) method

```csharp
public static bool operator != (System.Security.Cryptography.CngProvider? left, System.Security.Cryptography.CngProvider? right);
```

Determines whether two `CngProvider` objects do not represent the same key <example-value> provider (KSP).

Parameters:

- `left`: An object that specifies a KSP.
- `right`: A second object, to be compared to the object that is identified by the `left` parameter.

Returns: `true` if the two objects do not represent the same KSP; otherwise, `false`.

To be added.

## CngProvider.ToString() method

```csharp
public override string ToString ();
```

Gets the name of the key <example-value> provider (KSP) that the current `CngProvider` object specifies.

Returns: The embedded KSP name.

To be added.
