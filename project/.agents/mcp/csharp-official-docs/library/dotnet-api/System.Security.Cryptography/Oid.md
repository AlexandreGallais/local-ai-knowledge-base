---
title: "Oid class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/Oid.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Oid class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class Oid
```

Represents a cryptographic object identifier. This class cannot be inherited.

#### Remarks
Cryptographic object identifiers consist of a value/name pair. If one property in a pair is set to a known value, the other property is updated automatically to a corresponding value. For example, if the `Value` property is set to "1.3.6.1.5.5.7.3.4", the `FriendlyName` property, which is localized, is set automatically to "Secure Email".

#### Examples
The following code example shows how to use the `Oid` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/Oid/Overview/cryptography.oid.cs._

## Oid.Oid() constructor

```csharp
public Oid ();
```

Initializes a new instance of the `Oid` class.

#### Remarks
This is the parameterless constructor.

#### Examples
The following code example shows how to use the `Oid` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/Oid/Overview/cryptography.oid.cs._

## Oid.Oid(Oid) constructor

```csharp
public Oid (System.Security.Cryptography.Oid oid);
```

Initializes a new instance of the `Oid` class using the specified `Oid` object.

Parameters:

- `oid`: The object identifier information to use to create the new object identifier.

Exceptions:

- `ArgumentNullException`: `oid` is `null`.

#### Remarks
This constructor copies the values of an existing `Oid` object to a new object.

#### Examples
The following code example shows how to use the `Oid` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/Oid/Overview/cryptography.oid.cs._

## Oid.Oid(String) constructor

```csharp
public Oid (string oid);
```

Initializes a new instance of the `Oid` class using a string value of an `Oid` object.

Parameters:

- `oid`: An object identifier.

#### Remarks
This constructor copies the values of an existing `Oid` object to a new object.

#### Examples
The following code example shows how to use the `Oid` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/Oid/Overview/cryptography.oid.cs._

## Oid.Oid(String, String) constructor

```csharp
public Oid (string? value, string? friendlyName);
```

Initializes a new instance of the `Oid` class using the specified value and friendly name.

Parameters:

- `value`: The dotted number of the identifier.
- `friendlyName`: The friendly name of the identifier.

#### Remarks
This constructor can be used to copy the values of an existing `Oid` object. Note that if the Oid value is not recognized, the `value` and `friendlyName` parameters are not verified to determine if they correspond to each other. This is because there are object identifiers that .NET does not recognize, although an application may be able to interpret them.

#### Examples
The following code example shows how to use the `Oid` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/Oid/Overview/cryptography.oid.cs._

## Oid.FriendlyName property

```csharp
public string? FriendlyName { get; set; }
```

Gets or sets the friendly name of the identifier.

Returns: The friendly name of the identifier.

Exceptions:

- `PlatformNotSupportedException`: An attempt is made to set the value and the value has previously been set.

#### Remarks

If one `Oid` property is set to a known value, the value of the other `Oid` property is updated automatically to a corresponding value. For example, if the `FriendlyName` property is set to "Secure Email", the `Value` property is set automatically to "1.3.6.1.5.5.7.3.4".

This property is *init only*, meaning that its value can't be changed once it's been set.

#### Examples
The following code example shows how to use the `Oid` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/Oid/Overview/cryptography.oid.cs._

## Oid.Value property

```csharp
public string? Value { get; set; }
```

Gets or sets the dotted number of the identifier.

Returns: The dotted number of the identifier.

Exceptions:

- `PlatformNotSupportedException`: An attempt is made to set the value and the value has previously been set.

#### Remarks

If one `Oid` property is set to a known value, the value of the other `Oid` property is updated automatically to a corresponding value. For example, if the `Value` property is set to "1.3.6.1.5.5.7.3.4", the `FriendlyName` property is set automatically to "Secure Email".

This property is *init only*, meaning that its value can't be changed once it's been set.

#### Examples
The following code example shows how to use the `Oid` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/Oid/Overview/cryptography.oid.cs._

## Oid.FromFriendlyName(String, OidGroup) method

```csharp
public static System.Security.Cryptography.Oid FromFriendlyName (string friendlyName, System.Security.Cryptography.OidGroup group);
```

Creates an `Oid` object from an OID friendly name by searching the specified group.

Parameters:

- `friendlyName`: The friendly name of the identifier.
- `group`: The group to search in.

Returns: An object that represents the specified OID.

Exceptions:

- `ArgumentNullException`: `friendlyName` is `null`.
- `CryptographicException`: The OID was not found.

To be added.

## Oid.FromOidValue(String, OidGroup) method

```csharp
public static System.Security.Cryptography.Oid FromOidValue (string oidValue, System.Security.Cryptography.OidGroup group);
```

Creates an `Oid` object by using the specified OID value and group.

Parameters:

- `oidValue`: The OID value.
- `group`: The group to search in.

Returns: A new instance of an `Oid` object.

Exceptions:

- `ArgumentNullException`: `oidValue` is `null`.
- `CryptographicException`: The friendly name for the OID value was not found.

To be added.
