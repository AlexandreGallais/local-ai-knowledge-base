---
title: "ClaimsPrincipal class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Claims/ClaimsPrincipal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ClaimsPrincipal class (part 2 of 2)

## ClaimsPrincipal.FindFirst(Claim>) method

```csharp
public virtual System.Security.Claims.Claim? FindFirst (Predicate<System.Security.Claims.Claim> match);
```

Retrieves the first claim that is matched by the specified predicate.

Parameters:

- `match`: The function that performs the matching logic.

Returns: The first matching claim or `null` if no match is found.

Exceptions:

- `ArgumentNullException`: `match` is `null`.

#### Remarks

Each `ClaimsIdentity` is called.

#### See also
`FindFirst`

## ClaimsPrincipal.FindFirst(String) method

```csharp
public virtual System.Security.Claims.Claim? FindFirst (string type);
```

Retrieves the first claim with the specified claim type.

Parameters:

- `type`: The claim type to match.

Returns: The first matching claim or `null` if no match is found.

Exceptions:

- `ArgumentNullException`: `type` is `null`.

#### Remarks

Each `ClaimsIdentity` is called.

## See also

`FindFirst`.

## ClaimsPrincipal.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
protected virtual void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Populates the `SerializationInfo` with data needed to serialize the current `ClaimsPrincipal` object.

Parameters:

- `info`: The object to populate with data.
- `context`: The destination for this serialization. Can be `null`.

Exceptions:

- `ArgumentNullException`: `info` is `null`.
- `PlatformNotSupportedException`: In all cases.

To be added.

## ClaimsPrincipal.HasClaim(Claim>) method

```csharp
public virtual bool HasClaim (Predicate<System.Security.Claims.Claim> match);
```

Determines whether any of the claims identities associated with this claims principal contains a claim that is matched by the specified predicate.

Parameters:

- `match`: The function that performs the matching logic.

Returns: `true` if a matching claim exists; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `match` is `null`.

#### Remarks

Each `ClaimsIdentity` is called.

#### See also

`HasClaim`.

## ClaimsPrincipal.HasClaim(String, String) method

```csharp
public virtual bool HasClaim (string type, string value);
```

Determines whether any of the claims identities associated with this claims principal contains a claim with the specified claim type and value.

Parameters:

- `type`: The type of the claim to match.
- `value`: The value of the claim to match.

Returns: `true` if a matching claim exists; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `type` or `value` is `null`.

#### Remarks
Does not check the `Claim.Issuer` or `Claim.OriginalIssuer` properties. The comparison is made using Ordinal, case sensitive on value; case in-sensitive on type.

## ClaimsPrincipal.IsInRole(String) method

```csharp
public virtual bool IsInRole (string role);
```

Returns a value that indicates whether the entity (user) represented by this claims principal is in the specified role.

Parameters:

- `role`: The role for which to check.

Returns: `true` if claims principal is in the specified role; otherwise, `false`.

#### Remarks
The `ClaimsPrincipal.IsInRole` method checks whether an identity that this claims principal possesses contains a claim of type `ClaimsIdentity.RoleClaimType` where the value of the claim is equal to the value specified by the `role` parameter.

> **Note:**
>  Each `ClaimsIdentity` has its own definition of the claim type that represents a role. This claim type can be accessed and set through the `RoleClaimType` property.

## ClaimsPrincipal.WriteTo(BinaryWriter) method

```csharp
public virtual void WriteTo (System.IO.BinaryWriter writer);
```

Serializes using a `BinaryWriter`.

Parameters:

- `writer`: The writer to use for data storage.

Exceptions:

- `ArgumentNullException`: `writer` is `null`.

To be added.

## ClaimsPrincipal.WriteTo(BinaryWriter, Byte[]) method

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
