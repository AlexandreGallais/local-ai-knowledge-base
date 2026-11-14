---
title: "ClaimsIdentity class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Claims/ClaimsIdentity.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ClaimsIdentity class (part 2 of 3)

## ClaimsIdentity.ClaimsIdentity(IIdentity, Claim>) constructor

```csharp
public ClaimsIdentity (System.Security.Principal.IIdentity? identity, System.Collections.Generic.IEnumerable<System.Security.Claims.Claim>? claims);
```

Initializes a new instance of the `ClaimsIdentity` class using the specified claims and the specified `IIdentity`.

Parameters:

- `identity`: The identity from which to base the new claims identity.
- `claims`: The claims with which to populate the claims identity.

#### Remarks
The following table shows initial property values for an instance of the `ClaimsIdentity` class.

|Property|Value|
|--------------|-----------|
|`ClaimsIdentity.Actor`|If `identity` is assignable from `ClaimsIdentity`, the value of the `identity.Actor` property; otherwise, `null`.|
|`ClaimsIdentity.AuthenticationType`|The `authenticationType` parameter. If the `authenticationType` parameter is `null` or an empty string, the value of the `identity.AuthenticationType` (`IIdentity.AuthenticationType`) property is used.|
|`ClaimsIdentity.BootstrapContext`|If `identity` is assignable from `ClaimsIdentity`, the value of the `identity.BootStrapContext` property; otherwise, `null`.|
|`ClaimsIdentity.Claims`|Initialized from the `claims` parameter. If `identity` is assignable from `ClaimsIdentity`, the claims from `identity` are added to the new instance before those specified by the `claims` parameter.|
|`ClaimsIdentity.IsAuthenticated`|**Note:**  When accessed, the value of the `IsAuthenticated` property is returned based on the value of the `AuthenticationType` property.|
|`ClaimsIdentity.Label`|If `identity` is assignable from `ClaimsIdentity`, the value of the `identity.Label` property; otherwise, `null`.|
|`ClaimsIdentity.Name`|If `identity` is not assignable from `ClaimsIdentity`, is not `null`, and has an `Name` property that is not `null`; a name claim is added to the new instance using the value of the `Name` property. **Note:**  When accessed, the value of the `Name` property is returned based on the `ClaimsIdentity.NameClaimType` and the `ClaimsIdentity.Claims` collection.|
|`ClaimsIdentity.NameClaimType`|If `identity` is assignable from `ClaimsIdentity`, the value of the `identity.NameClaimType` property is used; otherwise, `DefaultNameClaimType` is used.|
|`ClaimsIdentity.RoleClaimType`|If `identity` is assignable from `ClaimsIdentity`, the value of the `identity.RoleClaimType` property is used; otherwise, `DefaultRoleClaimType` is used.|

## ClaimsIdentity.ClaimsIdentity(String, String, String) constructor

```csharp
public ClaimsIdentity (string? authenticationType, string? nameType, string? roleType);
```

Initializes a new instance of the `ClaimsIdentity` class with the specified authentication type, name claim type, and role claim type.

Parameters:

- `authenticationType`: The type of authentication used.
- `nameType`: The claim type to use for name claims.
- `roleType`: The claim type to use for role claims.

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
|`ClaimsIdentity.NameClaimType`|The value of the `nameType` parameter. If the `nameType` parameter is null or an empty string, the property is set to `DefaultNameClaimType`.|
|`ClaimsIdentity.RoleClaimType`|The value of the `roleType` parameter. If the `roleType` parameter is null or an empty string, the property is set to `DefaultRoleClaimType`.|

## ClaimsIdentity.ClaimsIdentity(Claim>, String, String, String) constructor

```csharp
public ClaimsIdentity (System.Collections.Generic.IEnumerable<System.Security.Claims.Claim>? claims, string? authenticationType, string? nameType, string? roleType);
```

Initializes a new instance of the `ClaimsIdentity` class with the specified claims, authentication type, name claim type, and role claim type.

Parameters:

- `claims`: The claims with which to populate the claims identity.
- `authenticationType`: The type of authentication used.
- `nameType`: The claim type to use for name claims.
- `roleType`: The claim type to use for role claims.

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
|`ClaimsIdentity.NameClaimType`|The value of the `nameType` parameter. However, if the `nameType` parameter is `null` or an empty string, the property is set to `DefaultNameClaimType`.|
|`ClaimsIdentity.RoleClaimType`|The value of the `roleClaimType` parameter. However, if the `roleClaimType` parameter is `null` or an empty string, the property is set to `DefaultRoleClaimType`.|

## ClaimsIdentity.ClaimsIdentity(IIdentity, Claim>, String, String, String) constructor

```csharp
public ClaimsIdentity (System.Security.Principal.IIdentity? identity, System.Collections.Generic.IEnumerable<System.Security.Claims.Claim>? claims, string? authenticationType, string? nameType, string? roleType);
```

Initializes a new instance of the `ClaimsIdentity` class from the specified `IIdentity` using the specified claims, authentication type, name claim type, and role claim type.

Parameters:

- `identity`: The identity from which to base the new claims identity.
- `claims`: The claims with which to populate the new claims identity.
- `authenticationType`: The type of authentication used.
- `nameType`: The claim type to use for name claims.
- `roleType`: The claim type to use for role claims.

Exceptions:

- `InvalidOperationException`: `identity` is a `ClaimsIdentity` and `ClaimsIdentity.Actor` results in a circular reference back to `this`.

#### Remarks
The following table shows initial property values for an instance of the `ClaimsIdentity` class.

|Property|Value|
|--------------|-----------|
|`ClaimsIdentity.Actor`|If `identity` is assignable from `ClaimsIdentity`, the value of the `identity.Actor` property; otherwise, `null`.|
|`ClaimsIdentity.AuthenticationType`|The `authenticationType` parameter. If the `authenticationType` parameter is `null` or an empty string, the value of the `identity.AuthenticationType` (`IIdentity.AuthenticationType`) property is used.|
|`ClaimsIdentity.BootstrapContext`|If `identity` is assignable from `ClaimsIdentity`, the value of the `identity.BootStrapContext` property; otherwise, `null`.|
|`ClaimsIdentity.Claims`|Initialized from the `claims` parameter. If `identity` is assignable from `ClaimsIdentity`, the claims from `identity` are added to the new instance before those specified by the `claims` parameter.|
|`ClaimsIdentity.IsAuthenticated`|**Note:**  When accessed, the value of the `IsAuthenticated` property is returned based on the value of the `AuthenticationType` property.|
|`ClaimsIdentity.Label`|If `identity` is assignable from `ClaimsIdentity`, the value of the `identity.Label` property; otherwise, `null`.|
|`ClaimsIdentity.Name`|If `identity` is not assignable from `ClaimsIdentity`, is not `null`, and has an `Name` property that is not `null`; a name claim is added to the new instance using the value of the `Name` property. **Note:**  When accessed, the value of the `Name` property is returned based on the `ClaimsIdentity.NameClaimType` and the `ClaimsIdentity.Claims` collection.|
|`ClaimsIdentity.NameClaimType`|The value of the `nameType` parameter. However, if the value of the `nameType` parameter is `null` or an empty string and `identity` is assignable from `ClaimsIdentity`, the value of the `identity.NameClaimType` property is used; otherwise, `DefaultNameClaimType` is used.|
|`ClaimsIdentity.RoleClaimType`|The value of the `roleClaimType` parameter. However, if the value of the `roleClaimType` parameter is `null` or an empty string and identity is assignable from `ClaimsIdentity`, the value of the `identity.RoleClaimType` property is used; otherwise, `DefaultRoleClaimType` is used.|

## ClaimsIdentity.ClaimsIdentity(IIdentity, Claim>, String, String, String, StringComparison) constructor

```csharp
public ClaimsIdentity (System.Security.Principal.IIdentity? identity = default, System.Collections.Generic.IEnumerable<System.Security.Claims.Claim>? claims = default, string? authenticationType = default, string? nameType = default, string? roleType = default, StringComparison stringComparison = System.StringComparison.OrdinalIgnoreCase);
```

Initializes a new instance of the `ClaimsIdentity` class.

Parameters:

- `identity`: The identity from which to base the new claims identity.
- `claims`: The claims with which to populate the claims identity.
- `authenticationType`: The type of authentication used.
- `nameType`: The claim type to use for name claims.
- `roleType`: The claim type to use for role claims.
- `stringComparison`: The string comparison to use when comparing claim types.

Exceptions:

- `ArgumentException`: `stringComparison` is out of range or a not supported value.
- `InvalidOperationException`: `identity` is a `ClaimsIdentity` and `ClaimsIdentity.Actor` results in a circular reference back to `this`.

To be added.

## ClaimsIdentity.Actor property

```csharp
public System.Security.Claims.ClaimsIdentity? Actor { get; set; }
```

Gets or sets the identity of the calling party that was granted delegation rights.

Returns: The calling party that was granted delegation rights.

Exceptions:

- `InvalidOperationException`: An attempt was made to set the property to the current instance.

-or-

`value` results in a circular reference back to `this`.

#### Remarks
An application can access the delegation chain that led to the current call, by recursively examining the `Actor` property. The token on whose behalf the call is being delegated can be accessed through the `BootstrapContext` property.

## ClaimsIdentity.AuthenticationType property

```csharp
public virtual string? AuthenticationType { get; }
```

Gets the authentication type.

Returns: The authentication type.

## ClaimsIdentity.BootstrapContext property

```csharp
public object? BootstrapContext { get; set; }
```

Gets or sets the token that was used to create this claims identity.

Returns: The bootstrap context.

#### Remarks
The underlying object is an instance of the `BootstrapContext` class.

If the `BootstrapContext` property is not `null`, applications can access the original token and the claims it produced through the properties and methods of the `BootstrapContext` class.

## ClaimsIdentity.Claims property

```csharp
public virtual System.Collections.Generic.IEnumerable<System.Security.Claims.Claim> Claims { get; }
```

Gets the claims associated with this claims identity.

Returns: The collection of claims associated with this claims identity.

#### Remarks
The collection may contain entries that are `null`.

The claims contained in the `ClaimsIdentity.Claims` collection essentially describe the entity that is represented by the `ClaimsIdentity`. The claims describe the properties and rights possessed by the entity and can be examined by applications to make decisions about authentication and authorization.

> **Note:**
>  The `ClaimsPrincipal` class has a `Claims` property as well. In the majority of cases you should access the user's claims through the `ClaimsPrincipal.Claims` collection rather than through the `ClaimsIdentity.Claims` collection. You will need to access the claims of an individual `ClaimsIdentity` only in the cases where the principal contains more than one `ClaimsIdentity` and you need to evaluate or modify a specific identity.

## ClaimsIdentity.CustomSerializationData property

```csharp
protected virtual byte[]? CustomSerializationData { get; }
```

Contains any additional data provided by a derived type. Typically set when calling `ClaimsIdentity.WriteTo`.

Returns: A `Byte` array representing the additional serialized data.

To be added.

## ClaimsIdentity.IsAuthenticated property

```csharp
public virtual bool IsAuthenticated { get; }
```

Gets a value that indicates whether the identity has been authenticated.

Returns: `true` if the identity has been authenticated; otherwise, `false`.

#### Remarks
`true` if the `AuthenticationType` property is not `null` or an empty string.

## ClaimsIdentity.Label property

```csharp
public string? Label { get; set; }
```

Gets or sets the label for this claims identity.

Returns: The label.

To be added.

## ClaimsIdentity.Name property

```csharp
public virtual string? Name { get; }
```

Gets the name of this claims identity.

Returns: The name or `null`.

#### Remarks
Returns the value of the first claim with a type that matches the name claim type set in the `NameClaimType` property. If no claim is found that matches the name claim type, returns `null`.

## ClaimsIdentity.NameClaimType property

```csharp
public string NameClaimType { get; }
```

Gets the claim type that is used to determine which claims provide the value for the `ClaimsIdentity.Name` property of this claims identity.

Returns: The name claim type.

#### Remarks
The `NameClaimType` property specifies the claim type (`Claim.Type`) that is used to provide the name for this identity. The name is accessed through the `Name` property.

This property is set by the constructor.
