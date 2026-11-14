---
title: "ClaimsPrincipal class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Claims/ClaimsPrincipal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ClaimsPrincipal class

Namespace: `System.Security.Claims`

```csharp
public class ClaimsPrincipal : System.Security.Principal.IPrincipal
```

An `IPrincipal` implementation that supports multiple claims-based identities.

#### Remarks

Many classes that represent a principal in .NET derive from `ClaimsPrincipal` rather than simply implementing the `IPrincipal` interface. In addition to implementing the `IPrincipal` interface, `ClaimsPrincipal` exposes properties and methods that are useful for working with claims.

`ClaimsPrincipal` exposes a collection of identities, each of which is a `ClaimsIdentity`. In the common case, this collection, which is accessed through the `Identities` property, will only have a single element.

`ClaimsPrincipal` offers chances to exercise finer access control. For example:

- The application code itself can work directly with the claims contained in the current principal to drive extra authentication, authorization, and personalization tasks.

- You can front your resources with a claims processing pipeline, which can deal with authentication requests and authorization policy even before execution reaches your code. For example, you can configure a web-based application or service with a custom claims authentication manager, an instance of a class that derives from the `ClaimsAuthenticationManager` class. When so configured, the request processing pipeline invokes the `ClaimsAuthenticationManager.Authenticate` method on your claims authentication manager passing it a `ClaimsPrincipal` that represents the context of the incoming request. Your claims authentication manager can then perform authentication based on the values of the incoming claims. It can also filter, transform, or add claims to the incoming claim set. For example, it could be used to enrich the incoming claim set with new claims created from a local data source such as a local user profile

- You can configure a web-based application with a custom claims authorization manager, an instance of a class that derives from the `ClaimsAuthorizationManager` class. When so configured, the request processing pipeline packages the incoming `ClaimsPrincipal` in an `AuthorizationContext` and invokes the `ClaimsAuthorizationManager.CheckAccess` method on your claims authorization manager. Your claims authorization manager can then enforce authorization based on the incoming claims.

You can obtain a `ClaimsPrincipal` instance for the principal associated with a request, or the principal under which a thread is executing, in a relying party (RP) application by casting the `CurrentPrincipal` property to `ClaimsPrincipal`. The claims associated with an `ClaimsPrincipal` object are available through its `Claims` property. The `Claims` property returns all of the claims contained by the identities associated with the principal. In the uncommon case in which the `ClaimsPrincipal` contains multiple `ClaimsIdentity` instances, you can use the `Identities` property or you can access the primary identity by using the `Identity` property. `ClaimsPrincipal` provides several methods through which these claims may be searched and fully supports Language Integrated Query (LINQ). Identities can be added to the principal by using the `ClaimsPrincipal.AddIdentities` or `ClaimsPrincipal.AddIdentity` methods.

By default, WIF prioritizes `WindowsIdentity` objects when selecting the primary identity to return through the `Identity` property. You can modify this behavior by supplying a delegate through the `PrimaryIdentitySelector` property to perform the selection. The `ClaimsPrincipalSelector` property provides similar functionality for the `Current` property.

In the claim-based model, whether a principal is in a specified role is determined by the claims presented by its underlying identities. The `ClaimsPrincipal.IsInRole` method essentially examines each identity associated with the principal to determine whether it possesses a claim with the specified role value. The type of the claim (represented by its `Type` property) used to determine which claims should be examined during role checks is specified on an identity through its `RoleClaimType` property. Thus, the claims examined during role checks can be of a different type for different identities associated with the principal.

#### Examples
The following example extracts the claims presented by a user in an HTTP request and writes them to the HTTP response. The current user is read from the `HttpContext` as a `ClaimsPrincipal`. The claims are then read from it and then are written to the response.

```csharp
if (HttpContext.Current.User is ClaimsPrincipal principal)
{
   foreach (Claim claim in principal.Claims)
   {
      Response.Write("CLAIM TYPE: " + claim.Type + "; CLAIM VALUE: " + claim.Value + "</br>");
   }
}
```

## ClaimsPrincipal.ClaimsPrincipal() constructor

```csharp
public ClaimsPrincipal ();
```

Initializes a new instance of the `ClaimsPrincipal` class.

#### Remarks
No identities are associated with the new instance. (The `ClaimsPrincipal.Identities` collection is empty).

## ClaimsPrincipal.ClaimsPrincipal(ClaimsIdentity>) constructor

```csharp
public ClaimsPrincipal (System.Collections.Generic.IEnumerable<System.Security.Claims.ClaimsIdentity> identities);
```

Initializes a new instance of the `ClaimsPrincipal` class using the specified claims identities.

Parameters:

- `identities`: The identities from which to initialize the new claims principal.

Exceptions:

- `ArgumentNullException`: `identities` is `null`.

#### Remarks
The `ClaimsPrincipal.Identities` collection is initialized with the specified identities.

## ClaimsPrincipal.ClaimsPrincipal(BinaryReader) constructor

```csharp
public ClaimsPrincipal (System.IO.BinaryReader reader);
```

Initializes an instance of `ClaimsPrincipal` with the specified `BinaryReader`.

Parameters:

- `reader`: A `BinaryReader` pointing to a `ClaimsPrincipal`.

Exceptions:

- `ArgumentNullException`: `reader` is `null`.

#### Remarks
Normally, the `BinaryReader` is constructed using the bytes from `ClaimsIdentity.WriteTo` and initialized in the same way as the `BinaryWriter`.

## ClaimsPrincipal.ClaimsPrincipal(IIdentity) constructor

```csharp
public ClaimsPrincipal (System.Security.Principal.IIdentity identity);
```

Initializes a new instance of the `ClaimsPrincipal` class from the specified identity.

Parameters:

- `identity`: The identity from which to initialize the new claims principal.

Exceptions:

- `ArgumentNullException`: `identity` is `null`.

#### Remarks
If the specified identity is assignable from `ClaimsIdentity`, it is used to initialize the `ClaimsPrincipal.Identities` collection. Otherwise, a `ClaimsIdentity` is created using the specified identity and is used to initialize the collection.

## ClaimsPrincipal.ClaimsPrincipal(IPrincipal) constructor

```csharp
public ClaimsPrincipal (System.Security.Principal.IPrincipal principal);
```

Initializes a new instance of the `ClaimsPrincipal` class from the specified principal.

Parameters:

- `principal`: The principal from which to initialize the new claims principal.

Exceptions:

- `ArgumentNullException`: `principal` is `null`.

#### Remarks
If the specified principal is assignable from `ClaimsPrincipal`, all of its identities are added to the `ClaimsPrincipal.Identities` collection. If the specified principal is not assignable from `ClaimsPrincipal`, a new `ClaimsIdentity` is created from the `IIdentity` in its `Identity` property and added to the `ClaimsPrincipal.Identities` collection.

## ClaimsPrincipal.ClaimsPrincipal(SerializationInfo, StreamingContext) constructor

```csharp
protected ClaimsPrincipal (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `ClaimsPrincipal` class from a serialized stream created by using `ISerializable`.

Parameters:

- `info`: The serialized data.
- `context`: The context for serialization.

Exceptions:

- `ArgumentNullException`: `info` is **null**.
- `PlatformNotSupportedException`: In all cases.

To be added.

## ClaimsPrincipal.Claims property

```csharp
public virtual System.Collections.Generic.IEnumerable<System.Security.Claims.Claim> Claims { get; }
```

Gets a collection that contains all of the claims from all of the claims identities associated with this claims principal.

Returns: The claims associated with this principal.

#### Remarks
A claims principal has a collection of `ClaimsIdentity` objects that is accessible through the Identities property. Each `ClaimsIdentity` in the collection contains one or more claims. The `Claims` property returns all of the claims from all of the claims identities in this collection.

The `Claims` property can be examined by custom implementations of the `ClaimsAuthenticationManager` class to make authentication decisions or to filter, transform, or enrich an incoming claim set; by custom implementations of the `ClaimsAuthorizationManager` class to enforce authorization policy; or by application code to make authorization decisions or to customize user experience based on the claims present in the collection.

## ClaimsPrincipal.ClaimsPrincipalSelector property

```csharp
public static Func<System.Security.Claims.ClaimsPrincipal?>? ClaimsPrincipalSelector { get; set; }
```

Gets or sets the delegate used to select the claims principal returned by the `ClaimsPrincipal.Current` property.

Returns: The delegate. The default is `null`.

#### Remarks
You can set this property to override the default behavior of the `Current` property.

## ClaimsPrincipal.Current property

```csharp
public static System.Security.Claims.ClaimsPrincipal? Current { get; }
```

Gets the current claims principal.

Returns: The current claims principal.

#### Remarks
By default, `Thread.CurrentPrincipal` is returned. You can change this behavior by setting the `ClaimsPrincipalSelector` property to specify a delegate to be called to determine the current principal.

## ClaimsPrincipal.CustomSerializationData property

```csharp
protected virtual byte[]? CustomSerializationData { get; }
```

Contains any additional data provided by a derived type. Typically set when calling `ClaimsIdentity.WriteTo`.

Returns: A `Byte` array representing the additional serialized data.

To be added.

## ClaimsPrincipal.Identities property

```csharp
public virtual System.Collections.Generic.IEnumerable<System.Security.Claims.ClaimsIdentity> Identities { get; }
```

Gets a collection that contains all of the claims identities associated with this claims principal.

Returns: The collection of claims identities.

#### Remarks
In the common case, the collection contains only a single element.

It is possible for the collection to contain some elements which are `null`.

## ClaimsPrincipal.Identity property

```csharp
public virtual System.Security.Principal.IIdentity? Identity { get; }
```

Gets the primary claims identity associated with this claims principal.

Returns: The primary claims identity associated with this claims principal.

#### Remarks
By default, .NET prioritizes identities of type `WindowsIdentity` when returning the identity. The first `WindowsIdentity` found in the `ClaimsPrincipal.Identities` collection is returned. If there is no `WindowsIdentity` in the collection, the first identity assignable from `ClaimsIdentity` is returned. If there is no `ClaimsIdentity`, `null` is returned. If the `ClaimsPrincipal.Identities` collection is empty, an `ArgumentNullException` is thrown.

You can change the default behavior by setting the `PrimaryIdentitySelector` property to specify a delegate to be called to determine the identity.

## ClaimsPrincipal.PrimaryIdentitySelector property

```csharp
public static Func<System.Collections.Generic.IEnumerable<System.Security.Claims.ClaimsIdentity>,System.Security.Claims.ClaimsIdentity?> PrimaryIdentitySelector { get; set; }
```

Gets or sets the delegate used to select the claims identity returned by the `ClaimsPrincipal.Identity` property.

Returns: The delegate. The default is `null`.

#### Remarks
You can set this property to override the default behavior of the `Identity` property.

## ClaimsPrincipal.AddIdentities(ClaimsIdentity>) method

```csharp
public virtual void AddIdentities (System.Collections.Generic.IEnumerable<System.Security.Claims.ClaimsIdentity> identities);
```

Adds the specified claims identities to this claims principal.

Parameters:

- `identities`: The claims identities to add.

Exceptions:

- `ArgumentNullException`: `identities` is `null`.

#### Remarks
The identities are added to the `ClaimsPrincipal.Identities` collection.

## ClaimsPrincipal.AddIdentity(ClaimsIdentity) method

```csharp
public virtual void AddIdentity (System.Security.Claims.ClaimsIdentity identity);
```

Adds the specified claims identity to this claims principal.

Parameters:

- `identity`: The claims identity to add.

Exceptions:

- `ArgumentNullException`: `identity` is `null`.

#### Remarks
The identity is added to the `ClaimsPrincipal.Identities` collection.

## ClaimsPrincipal.Clone() method

```csharp
public virtual System.Security.Claims.ClaimsPrincipal Clone ();
```

Returns a copy of this instance.

Returns: A new copy of the `ClaimsPrincipal` object.

To be added.

## ClaimsPrincipal.CreateClaimsIdentity(BinaryReader) method

```csharp
protected virtual System.Security.Claims.ClaimsIdentity CreateClaimsIdentity (System.IO.BinaryReader reader);
```

Creates a new claims identity.

Parameters:

- `reader`: The binary reader.

Returns: The created claims identity.

Exceptions:

- `ArgumentNullException`: `reader` is `null`.

To be added.

## ClaimsPrincipal.FindAll(Claim>) method

```csharp
public virtual System.Collections.Generic.IEnumerable<System.Security.Claims.Claim> FindAll (Predicate<System.Security.Claims.Claim> match);
```

Retrieves all of the claims that are matched by the specified predicate.

Parameters:

- `match`: The function that performs the matching logic.

Returns: The matching claims.

Exceptions:

- `ArgumentNullException`: `match` is `null`.

#### Remarks
Returns claims from all identities associated with the claims principal.

## ClaimsPrincipal.FindAll(String) method

```csharp
public virtual System.Collections.Generic.IEnumerable<System.Security.Claims.Claim> FindAll (string type);
```

Retrieves all or the claims that have the specified claim type.

Parameters:

- `type`: The claim type against which to match claims.

Returns: The matching claims.

Exceptions:

- `ArgumentNullException`: `type` is `null`.

#### Remarks
Returns claims from all identities associated with the claims principal. The comparison is made using Ordinal case in-sensitive on `type`.
