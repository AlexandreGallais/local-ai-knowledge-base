---
title: "ClaimsIdentity class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Claims/ClaimsIdentity.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ClaimsIdentity class

Namespace: `System.Security.Claims`

```csharp
public class ClaimsIdentity : System.Security.Principal.IIdentity
```

Represents a claims-based identity.

#### Remarks
The `ClaimsIdentity` class is a concrete implementation of a claims-based identity; that is, an identity described by a collection of claims. A claim is a statement about an entity made by an issuer that describes a property, right, or some other quality of that entity. Such an entity is said to be the subject of the claim. A claim is represented by the `Claim` class. The claims contained in a `ClaimsIdentity` describe the entity that the corresponding identity represents, and can be used to make authorization and authentication decisions. A claims-based access model has many advantages over more traditional access models that rely exclusively on roles. For example, claims can provide much richer information about the identity they represent and can be evaluated for authorization or authentication in a far more specific manner.

Windows Identity Foundation (WIF) and claims-based identity have been fully integrated into .NET. The collection of claims that describe the identity can be accessed through the `Claims` property. The `ClaimsIdentity` class provides several methods for finding and modifying claims and fully supports language integrated queries (LINQ). In application code, `ClaimsIdentity` objects are typically accessed through `ClaimsPrincipal` objects; for example, the principal returned by `Thread.CurrentPrincipal`.

> **Note:**
>  The `ClaimsPrincipal` class has a `Claims` property as well. In the majority of cases you should access the user's claims through the `ClaimsPrincipal.Claims` collection rather than through the `ClaimsIdentity.Claims` collection. You will need to access the claims of an individual `ClaimsIdentity` only in the cases where the principal contains more than one `ClaimsIdentity` and you need to evaluate or modify a specific identity.

In the claims-based model, the `Name` property and the `IsInRole` method are implemented by evaluating the claims contained by an identity. The base implementations in the claims-based model are provided by the `Name` property and the `ClaimsPrincipal.IsInRole` method. The `ClaimsIdentity.NameClaimType` and `ClaimsIdentity.RoleClaimType` properties enable you to specify a claim type that should be used to evaluate the claims contained by the identity when performing these operations.

Delegation scenarios are supported through the `ClaimsIdentity.Actor` and `ClaimsIdentity.BootstrapContext` properties.

## ClaimsIdentity.ClaimsIdentity() constructor

```csharp
public ClaimsIdentity ();
```

Initializes a new instance of the `ClaimsIdentity` class with an empty claims collection.

#### Remarks
The following table shows initial property values for an instance of the `ClaimsIdentity` class.

|Property|Value|
|--------------|-----------|
|`ClaimsIdentity.Actor`|`null`.|
|`ClaimsIdentity.AuthenticationType`|`null`.|
|`ClaimsIdentity.BootstrapContext`|`null`.|
|`ClaimsIdentity.Claims`|A empty collection.|
|`ClaimsIdentity.IsAuthenticated`|**Note:**  When accessed, the value of the `IsAuthenticated` property is returned based on the value of the `AuthenticationType` property.|
|`ClaimsIdentity.Label`|`null`.|
|`ClaimsIdentity.Name`|**Note:**  When accessed, the value of the `Name` property is returned based on the `ClaimsIdentity.NameClaimType` and the `ClaimsIdentity.Claims` collection.|
|`ClaimsIdentity.NameClaimType`|`DefaultNameClaimType`.|
|`ClaimsIdentity.RoleClaimType`|`DefaultRoleClaimType`.|

## ClaimsIdentity.ClaimsIdentity(Claim>) constructor

```csharp
public ClaimsIdentity (System.Collections.Generic.IEnumerable<System.Security.Claims.Claim>? claims);
```

Initializes a new instance of the `ClaimsIdentity` class using an enumerated collection of `Claim` objects.

Parameters:

- `claims`: The claims with which to populate the claims identity.

#### Remarks
The following table shows initial property values for an instance of the `ClaimsIdentity` class.

|Property|Value|
|--------------|-----------|
|`ClaimsIdentity.Actor`|`null`.|
|`ClaimsIdentity.AuthenticationType`|`null`.|
|`ClaimsIdentity.BootstrapContext`|`null`.|
|`ClaimsIdentity.Claims`|Initialized from the `claims` parameter.|
|`ClaimsIdentity.IsAuthenticated`|**Note:**  When accessed, the value of the `IsAuthenticated` property is returned based on the value of the `AuthenticationType` property.|
|`ClaimsIdentity.Label`|`null`.|
|`ClaimsIdentity.Name`|**Note:**  When accessed, the value of the `Name` property is returned based on the `ClaimsIdentity.NameClaimType` and the `ClaimsIdentity.Claims` collection.|
|`ClaimsIdentity.NameClaimType`|`DefaultNameClaimType`.|
|`ClaimsIdentity.RoleClaimType`|`DefaultRoleClaimType`.|

## ClaimsIdentity.ClaimsIdentity(BinaryReader) constructor

```csharp
public ClaimsIdentity (System.IO.BinaryReader reader);
```

Initializes an instance of `ClaimsIdentity` with the specified `BinaryReader`.

Parameters:

- `reader`: A `BinaryReader` pointing to a `ClaimsIdentity`.

Exceptions:

- `ArgumentNullException`: `reader` is `null`.

#### Remarks
Normally, the reader is constructed from the bytes returned from `ClaimsIdentity.WriteTo`.

## ClaimsIdentity.ClaimsIdentity(SerializationInfo) constructor

```csharp
protected ClaimsIdentity (System.Runtime.Serialization.SerializationInfo info);
```

Initializes a new instance of the `ClaimsIdentity` class from a serialized stream created by using `ISerializable`.

Parameters:

- `info`: The serialized data.

Exceptions:

- `ArgumentNullException`: `info` is `null`.
- `PlatformNotSupportedException`: In all cases.

To be added.

## ClaimsIdentity.ClaimsIdentity(ClaimsIdentity) constructor

```csharp
protected ClaimsIdentity (System.Security.Claims.ClaimsIdentity other);
```

Initializes a new instance of the `ClaimsIdentity` class from an existing `ClaimsIdentity` instance.

Parameters:

- `other`: The `ClaimsIdentity` to copy.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

#### Remarks
The following table shows the property value assignments for an instance of the `ClaimsIdentity` class from the `ClaimsIdentity` provided to the constructor.

| Property | Value |
| -------- | ----- |
|`ClaimsIdentity.Actor`|If the value of the `other.Actor` property isn't `null`, the `other.Actor` `ClaimsIdentity` is cloned and assigned; otherwise, `null`.|
|`ClaimsIdentity.AuthenticationType`|The value of the `other.AuthenticationType` property.|
|`ClaimsIdentity.BootstrapContext`|The value of the `other.BootstrapContext` property.|
|`ClaimsIdentity.Claims`|The `List<Claim>` of claims, if any, in the `other.Claims` property.|
|`ClaimsIdentity.Label`|The value of the `other.Label` property.|
|`ClaimsIdentity.NameClaimType`|The value of the `other.NameClaimType` property.|
|`ClaimsIdentity.RoleClaimType`|The value of the `other.RoleClaimType` property.|
|`ClaimsIdentity.CustomSerializationData`|If `other.CustomSerializationData` isn't `null`, `other.CustomSerializationData` is cloned and assigned; otherwise, `null`.|

## ClaimsIdentity.ClaimsIdentity(IIdentity) constructor

```csharp
public ClaimsIdentity (System.Security.Principal.IIdentity? identity);
```

Initializes a new instance of the `ClaimsIdentity` class using the name and authentication type from the specified `IIdentity`.

Parameters:

- `identity`: The identity from which to base the new claims identity.

#### Remarks
The following table shows initial property values for an instance of the `ClaimsIdentity` class.

|Property|Value|
|--------------|-----------|
|`ClaimsIdentity.Actor`|If `identity` is assignable from `ClaimsIdentity`, the value of the `identity.Actor` property; otherwise, `null`.|
|`ClaimsIdentity.AuthenticationType`|The value of the `identity.AuthenticationType` (`IIdentity.AuthenticationType`) property is used.|
|`ClaimsIdentity.BootstrapContext`|If `identity` is assignable from `ClaimsIdentity`, the value of the `identity.BootStrapContext` property; otherwise, `null`.|
|`ClaimsIdentity.Claims`|If `identity` is assignable from `ClaimsIdentity`, the claims from `identity` are added to the new instance; otherwise, an empty collection.|
|`ClaimsIdentity.IsAuthenticated`|**Note:**  When accessed, the value of the `IsAuthenticated` property is returned based on the value of the `AuthenticationType` property.|
|`ClaimsIdentity.Label`|If `identity` is assignable from `ClaimsIdentity`, the value of the `identity.Label` property; otherwise, `null`.|
|`ClaimsIdentity.Name`|If `identity` is not assignable from `ClaimsIdentity`, is not `null`, and has an `Name` property that is not `null`; a name claim is added to the new instance using the value of the `Name` property. **Note:**  When accessed, the value of the `Name` property is returned based on the `ClaimsIdentity.NameClaimType` and the `ClaimsIdentity.Claims` collection.|
|`ClaimsIdentity.NameClaimType`|If `identity` is assignable from `ClaimsIdentity`, the value of the `identity.NameClaimType` property is used; otherwise, `DefaultNameClaimType` is used.|
|`ClaimsIdentity.RoleClaimType`|If `identity` is assignable from `ClaimsIdentity`, the value of the `identity.RoleClaimType` property is used; otherwise, `DefaultRoleClaimType` is used.|

## ClaimsIdentity.ClaimsIdentity(String) constructor

```csharp
public ClaimsIdentity (string? authenticationType);
```

Initializes a new instance of the `ClaimsIdentity` class with an empty claims collection and the specified authentication type.

Parameters:

- `authenticationType`: The type of authentication used.

#### Remarks
The following table shows initial property values for an instance of the `ClaimsIdentity` class.

|Property|Value|
|--------------|-----------|
|`ClaimsIdentity.Actor`|`null`.|
|`ClaimsIdentity.AuthenticationType`|The value of the `authenticationType` parameter. If the `authenticationType` parameter is `null` or an empty string, the property is set to `null`.|
|`ClaimsIdentity.BootstrapContext`|`null`.|
|`ClaimsIdentity.Claims`|An empty collection.|
|`ClaimsIdentity.IsAuthenticated`|**Note:**  When accessed, the value of the `IsAuthenticated` property is returned based on the value of the `AuthenticationType` property.|
|`ClaimsIdentity.Label`|`null`.|
|`ClaimsIdentity.Name`|**Note:**  When accessed, the value of the `Name` property is returned based on the `ClaimsIdentity.NameClaimType` and the `ClaimsIdentity.Claims` collection.|
|`ClaimsIdentity.NameClaimType`|`DefaultNameClaimType`.|
|`ClaimsIdentity.RoleClaimType`|`DefaultRoleClaimType`.|

## ClaimsIdentity.ClaimsIdentity(Claim>, String) constructor

```csharp
public ClaimsIdentity (System.Collections.Generic.IEnumerable<System.Security.Claims.Claim>? claims, string? authenticationType);
```

Initializes a new instance of the `ClaimsIdentity` class with the specified claims and authentication type.

Parameters:

- `claims`: The claims with which to populate the claims identity.
- `authenticationType`: The type of authentication used.

#### Remarks
The following table shows initial property values for an instance of the `ClaimsIdentity` class.

|Property|Value|
|--------------|-----------|
|`ClaimsIdentity.Actor`|`null`.|
|`ClaimsIdentity.AuthenticationType`|The value of the `authenticationType` parameter. If the `authenticationType` parameter is `null` or an empty string, the property is set to `null`.|
|`ClaimsIdentity.BootstrapContext`|`null`.|
|`ClaimsIdentity.Claims`|Initialized from the `claims` parameter.|
|`ClaimsIdentity.IsAuthenticated`|**Note:**  When accessed, the value of the `IsAuthenticated` property is returned based on the value of the `AuthenticationType` property.|
|`ClaimsIdentity.Label`|`null`.|
|`ClaimsIdentity.Name`|**Note:**  When accessed, the value of the `Name` property is returned based on the `ClaimsIdentity.NameClaimType` and the `ClaimsIdentity.Claims` collection.|
|`ClaimsIdentity.NameClaimType`|`DefaultNameClaimType`.|
|`ClaimsIdentity.RoleClaimType`|`DefaultRoleClaimType`.|

## ClaimsIdentity.ClaimsIdentity(BinaryReader, StringComparison) constructor

```csharp
public ClaimsIdentity (System.IO.BinaryReader reader, StringComparison stringComparison);
```

Initializes an instance of `ClaimsIdentity` with the specified `BinaryReader`.

Parameters:

- `reader`: A `BinaryReader` pointing to a `ClaimsIdentity`.
- `stringComparison`: The string comparison to use when comparing claim types.

Exceptions:

- `ArgumentNullException`: `reader` is `null`.
- `ArgumentException`: `stringComparison` is out of range or a not supported value.

To be added.

## ClaimsIdentity.ClaimsIdentity(SerializationInfo, StreamingContext) constructor

```csharp
protected ClaimsIdentity (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `ClaimsIdentity` class from a serialized stream created by using `ISerializable`.

Parameters:

- `info`: The serialized data.
- `context`: The context for serialization.

Exceptions:

- `ArgumentNullException`: `info` is `null`.
- `PlatformNotSupportedException`: In all cases.

To be added.

## ClaimsIdentity.ClaimsIdentity(ClaimsIdentity, StringComparison) constructor

```csharp
protected ClaimsIdentity (System.Security.Claims.ClaimsIdentity other, StringComparison stringComparison);
```

Initializes a new instance of the `ClaimsIdentity` class from an existing `ClaimsIdentity` instance.

Parameters:

- `other`: The `ClaimsIdentity` to copy.
- `stringComparison`: The string comparison to use when comparing claim types.

Exceptions:

- `ArgumentException`: `stringComparison` is out of range or a not supported value.
- `ArgumentNullException`: `other` is `null` .

To be added.
