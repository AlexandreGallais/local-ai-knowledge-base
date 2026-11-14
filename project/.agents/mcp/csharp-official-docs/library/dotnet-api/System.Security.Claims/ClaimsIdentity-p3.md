---
title: "ClaimsIdentity class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Claims/ClaimsIdentity.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ClaimsIdentity class (part 3 of 3)

## ClaimsIdentity.RoleClaimType property

```csharp
public string RoleClaimType { get; }
```

Gets the claim type that will be interpreted as a .NET role among the claims in this claims identity.

Returns: The role claim type.

#### Remarks
The role claim type is the claim type (`Claim.Type`) that is used when evaluating this identity for the `IsInRole` method. The `IsInRole` method is called to determine whether the current principal is in a specified role. The claims-based model extends this check to use claims presented by the principal. A `ClaimsPrincipal` object can contain one or more `ClaimsIdentity` objects and each identity object can contain multiple `Claim` objects. The `RoleClaimType` property specifies the claim type of the claim that should be used to provide the value for the role when evaluating this `ClaimsIdentity` object. The property is set by the constructor. A common value is `Role`.

## ClaimsIdentity.AddClaim(Claim) method

```csharp
public virtual void AddClaim (System.Security.Claims.Claim claim);
```

Adds a single claim to this claims identity.

Parameters:

- `claim`: The claim to add.

Exceptions:

- `ArgumentNullException`: `claim` is `null`.

#### Remarks
The claim is examined and if the subject is different than this claims identity, the `Clone` method is invoked with this claims identity as the parameter to create a new claim with the correct subject.

This method has the `SecurityCritical` attribute applied to control which entities can add claims to the identity. Further down the pipe, authorization decisions are made based on the claims that are present in the `ClaimsIdentity.Claims` collection.

## ClaimsIdentity.AddClaims(Claim>) method

```csharp
public virtual void AddClaims (System.Collections.Generic.IEnumerable<System.Security.Claims.Claim?> claims);
```

Adds a list of claims to this claims identity.

Parameters:

- `claims`: The claims to add.

Exceptions:

- `ArgumentNullException`: `claims` is `null`.

#### Remarks
Each claim is examined and if the subject is different than this claims identity, the `Clone` method is invoked with this claims identity as the parameter to create a new claim with the correct subject.

This method has the `SecurityCritical` attribute applied to control which entities can add claims to the identity. Further down the pipe, authorization decisions are made based on the claims that are present in the `ClaimsIdentity.Claims` collection.

## ClaimsIdentity.Clone() method

```csharp
public virtual System.Security.Claims.ClaimsIdentity Clone ();
```

Returns a new `ClaimsIdentity` copied from this claims identity.

Returns: A copy of the current instance.

To be added.

## ClaimsIdentity.CreateClaim(BinaryReader) method

```csharp
protected virtual System.Security.Claims.Claim CreateClaim (System.IO.BinaryReader reader);
```

Provides an extensibility point for derived types to create a custom `Claim`.

Parameters:

- `reader`: The `BinaryReader` that points to the claim.

Returns: A new `Claim`.

Exceptions:

- `ArgumentNullException`: `reader` is `null`.

To be added.

## ClaimsIdentity.FindAll(Claim>) method

```csharp
public virtual System.Collections.Generic.IEnumerable<System.Security.Claims.Claim> FindAll (Predicate<System.Security.Claims.Claim> match);
```

Retrieves all of the claims that are matched by the specified predicate.

Parameters:

- `match`: The function that performs the matching logic.

Returns: The matching claims. The list is read-only.

Exceptions:

- `ArgumentNullException`: `match` is `null`.

To be added.

## ClaimsIdentity.FindAll(String) method

```csharp
public virtual System.Collections.Generic.IEnumerable<System.Security.Claims.Claim> FindAll (string type);
```

Retrieves all of the claims that have the specified claim type.

Parameters:

- `type`: The claim type against which to match claims.

Returns: The matching claims. The list is read-only.

Exceptions:

- `ArgumentNullException`: `type` is `null`.

#### Remarks
The comparison is made using Ordinal case in-sensitive on `type`.

## ClaimsIdentity.FindFirst(Claim>) method

```csharp
public virtual System.Security.Claims.Claim? FindFirst (Predicate<System.Security.Claims.Claim> match);
```

Retrieves the first claim that is matched by the specified predicate.

Parameters:

- `match`: The function that performs the matching logic.

Returns: The first matching claim or `null` if no match is found.

Exceptions:

- `ArgumentNullException`: `match` is `null`.

To be added.

## ClaimsIdentity.FindFirst(String) method

```csharp
public virtual System.Security.Claims.Claim? FindFirst (string type);
```

Retrieves the first claim with the specified claim type.

Parameters:

- `type`: The claim type to match.

Returns: The first matching claim or `null` if no match is found.

Exceptions:

- `ArgumentNullException`: `type` is `null`.

The comparison is done in `OrdinalIgnoreCase` mode.

## ClaimsIdentity.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
protected virtual void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Populates the `SerializationInfo` with data needed to serialize the current `ClaimsIdentity` object.

Parameters:

- `info`: The object to populate with data.
- `context`: The destination for this serialization. Can be `null`.

Exceptions:

- `ArgumentNullException`: `info` is `null`.
- `PlatformNotSupportedException`: In all cases.

To be added.

## ClaimsIdentity.HasClaim(Claim>) method

```csharp
public virtual bool HasClaim (Predicate<System.Security.Claims.Claim> match);
```

Determines whether this claims identity has a claim that is matched by the specified predicate.

Parameters:

- `match`: The function that performs the matching logic.

Returns: `true` if a matching claim exists; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `match` is `null`.

To be added.

## ClaimsIdentity.HasClaim(String, String) method

```csharp
public virtual bool HasClaim (string type, string value);
```

Determines whether this claims identity has a claim with the specified claim type and value.

Parameters:

- `type`: The type of the claim to match.
- `value`: The value of the claim to match.

Returns: `true` if a match is found; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `type` or  `value` is  `null`.

#### Remarks
Does not check the `Claim.Issuer` or `Claim.OriginalIssuer` properties. The comparison is made using Ordinal, case sensitive on value; case in-sensitive on type.

## ClaimsIdentity.RemoveClaim(Claim) method

```csharp
public virtual void RemoveClaim (System.Security.Claims.Claim? claim);
```

Attempts to remove a claim from the claims identity.

Parameters:

- `claim`: The claim to remove.

Exceptions:

- `InvalidOperationException`: The claim cannot be removed.

#### Remarks
It is possible that the claim cannot be removed because it is not owned by the identity. For example, this would be the case for role claims that are owned by the principal. Unlike the `ClaimsIdentity.TryRemoveClaim` method, which returns a Boolean value that indicates whether the claim has been removed, `ClaimsIdentity.RemoveClaim` throws an exception if the claim could not be removed

The specified claim is matched by object reference (`Object.ReferenceEquals`).

This method has the `SecurityCritical` attribute applied to control which entities can remove claims from the identity. Further down the pipe, authorization decisions are made based on the claims that are present in the `ClaimsIdentity.Claims` collection.

## ClaimsIdentity.TryRemoveClaim(Claim) method

```csharp
public virtual bool TryRemoveClaim (System.Security.Claims.Claim? claim);
```

Attempts to remove a claim from the claims identity.

Parameters:

- `claim`: The claim to remove.

Returns: `true` if the claim was successfully removed; otherwise, `false`.

#### Remarks
It is possible that the claim cannot be removed because it is not owned by the identity. For example, this would be the case for role claims that are owned by the principal.

The specified claim is matched by object reference (`Object.ReferenceEquals`).

This method has the `SecurityCritical` attribute applied to control which entities can remove claims from the identity. Further down the pipe, authorization decisions are made based on the claims that are present in the `ClaimsIdentity.Claims` collection.

## ClaimsIdentity.WriteTo(BinaryWriter) method

```csharp
public virtual void WriteTo (System.IO.BinaryWriter writer);
```

Serializes using a `BinaryWriter`.

Parameters:

- `writer`: The writer to use for data storage.

Exceptions:

- `ArgumentNullException`: `writer` is `null`.

To be added.

## ClaimsIdentity.WriteTo(BinaryWriter, Byte[]) method

```csharp
protected virtual void WriteTo (System.IO.BinaryWriter writer, byte[]? userData);
```

Serializes using a `BinaryWriter`.

Parameters:

- `writer`: The writer to use for data storage.
- `userData`: Additional data provided by the derived type.

Exceptions:

- `ArgumentNullException`: `writer` is `null`.

To be added.

## ClaimsIdentity.DefaultIssuer field

```csharp
public const string DefaultIssuer;
```

The default issuer; "LOCAL AUTHORITY".

To be added.

## ClaimsIdentity.DefaultNameClaimType field

```csharp
public const string DefaultNameClaimType;
```

The default name claim type; `ClaimTypes.Name`.

To be added.

## ClaimsIdentity.DefaultRoleClaimType field

```csharp
public const string DefaultRoleClaimType;
```

The default role claim type; `ClaimTypes.Role`.

To be added.
