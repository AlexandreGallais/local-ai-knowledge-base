---
title: "Claim class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Claims/Claim.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Claim class

Namespace: `System.Security.Claims`

```csharp
public class Claim
```

Represents a claim.

#### Remarks
A claim is a statement about a subject by an issuer. Claims represent attributes of the subject that are useful in the context of authentication and authorization operations. Subjects and issuers are both entities that are part of an identity scenario. Some typical examples of a subject are: a user, an application or service, a device, or a computer. Some typical examples of an issuer are: the operating system, an application, a service, a role provider, an identity provider, or a federation provider. An issuer delivers claims by issuing security tokens, typically through a Security Token <example-value> (STS). On occasion, the collection of claims received from an issuer can be extended by subject attributes stored directly at the resource. A claim can be evaluated to determine access rights to data and other secured resources during the process of authorization and can also be used to make or express authentication decisions about a subject.

The Windows Identity Foundation (WIF) classes, which implement claims-based identity, have been fully integrated into .NET. The claims concept is implemented by the `Claim` class.

The following describes important properties of the `Claim` class:

- The `Type` property is a string (typically a URI) that contains the semantic information about the claim; it tells you what the value of the claim means. For example, a claim with a claim type of `GivenName` (`"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"`) represents a user's first name. The value of the `Type` property can be one of the well-known claim types defined in the `ClaimTypes` class, or it can be an arbitrary URI as defined by the issuer. For example, a claim type of "urn:spendinglimit" might represent a user attribute that makes sense within the business context of the issuer.

- The `Value` property contains the value of the claim. In order to reduce dependencies and simplify administration, in WIF the value of a claim is represented only as a string. For more complex value types, it is recommended that you use standard XML schema types to indicate how the value is meant to be serialized into and deserialized from a string.

- The `ValueType` property contains a string that identifies the type information for the value. This property should be used to understand the format of the value and to provide information about how to deserialize it. If your solution requires complex value types, it is recommended that you use standard XML schema types in the `ValueType` property to indicate how the `Value` property is meant to be serialized into and deserialized from a string.

- The `Subject` property is a `ClaimsIdentity` object that represents the subject of the claim. The subject of the claim is the entity (typically the user who is requesting access to a resource) about which the claim is asserted. The `ClaimsIdentity` contains, among its properties, a collection of claims that describe the properties and attributes of the subject as attested to by one or more issuers.

- The `Issuer` property contains the name of the entity that issued the claim. The issuer of a claim is represented in WIF by a string that contains a name taken from a list of well-known issuers that is maintained by the issuer name registry. The issuer name registry is an instance of a class that derives from the `IssuerNameRegistry` class. The issuer name registry associates a mnemonic name to the cryptographic material needed to verify the signatures of tokens produced by the corresponding issuer. For example, the `ConfigurationBasedIssuerNameRegistry` class, available out of the box with .NET 4.5, associates the mnemonic name for each issuer with its corresponding X.509 certificate. The list of well-known issuers is typically built at startup time by the issuer name registry. The list used by the `ConfigurationBasedIssuerNameRegistry` is specified in the application configuration file.

- The `OriginalIssuer` property contains the name of the entity that originally issued the claim. This property is designed to facilitate scenarios where a claim may pass <example-value> multiple issuers before it is presented by the client to the RP application; such as federation scenarios. You can examine the `OriginalIssuer` property to determine the entity that originally issued the claim. The name is taken from the list of well-known issuers maintained by the issuer name registry, as in the case of the `Issuer` property.

#### Examples
The following example extracts the claims associated to the authenticated user performing an HTTP request and writes them in the HTTP response. The current user is read from the `HttpContext` as a `ClaimsPrincipal` and the claims are read from it. The claims are then written to the `HttpResponse` object.

```csharp
ClaimsPrincipal principal = HttpContext.Current.User as ClaimsPrincipal;
if (null != principal)
{
   foreach (Claim claim in principal.Claims)
   {
      Response.Write("CLAIM TYPE: " + claim.Type + "; CLAIM VALUE: " + claim.Value + "</br>");
   }

}
```

## Claim.Claim(BinaryReader) constructor

```csharp
public Claim (System.IO.BinaryReader reader);
```

Initializes an instance of `Claim` with the specified `BinaryReader`.

Parameters:

- `reader`: A `BinaryReader` pointing to a `Claim`.

Exceptions:

- `ArgumentNullException`: `reader` is `null`.

#### Remarks
Normally, the reader is constructed from the bytes returned from `Claim.WriteTo`.

## Claim.Claim(Claim) constructor

```csharp
protected Claim (System.Security.Claims.Claim other);
```

Initializes a new instance of the `Claim` class.

Parameters:

- `other`: The security claim.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

`Subject` is set to `null`.

## Claim.Claim(BinaryReader, ClaimsIdentity) constructor

```csharp
public Claim (System.IO.BinaryReader reader, System.Security.Claims.ClaimsIdentity? subject);
```

Initializes a new instance of the `Claim` class with the specified reader and subject.

Parameters:

- `reader`: The binary reader.
- `subject`: The subject that this claim describes.

Exceptions:

- `ArgumentNullException`: `reader` is `null`.

## Claim.Claim(Claim, ClaimsIdentity) constructor

```csharp
protected Claim (System.Security.Claims.Claim other, System.Security.Claims.ClaimsIdentity? subject);
```

Initializes a new instance of the `Claim` class with the specified security claim and subject.

Parameters:

- `other`: The security claim.
- `subject`: The subject that this claim describes.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

`Subject` is set to `subject`.

## Claim.Claim(String, String) constructor

```csharp
public Claim (string type, string value);
```

Initializes a new instance of the `Claim` class with the specified claim type, and value.

Parameters:

- `type`: The claim type.
- `value`: The claim value.

Exceptions:

- `ArgumentNullException`: `type` or `value` is `null`.

#### Remarks
The `Subject` property is set to `null`. The `Claim.Issuer` and `Claim.OriginalIssuer` properties are set to `DefaultIssuer`. The `ValueType` property is set to `String`

## Claim.Claim(String, String, String) constructor

```csharp
public Claim (string type, string value, string? valueType);
```

Initializes a new instance of the `Claim` class with the specified claim type, value, and value type.

Parameters:

- `type`: The claim type.
- `value`: The claim value.
- `valueType`: The claim value type. If this parameter is `null`, then `ClaimValueTypes.String` is used.

Exceptions:

- `ArgumentNullException`: `type` or `value` is `null`.

#### Remarks
The `Subject` property is set to `null`. The `Claim.Issuer` and `Claim.OriginalIssuer` properties are set to `DefaultIssuer`.

## Claim.Claim(String, String, String, String) constructor

```csharp
public Claim (string type, string value, string? valueType, string? issuer);
```

Initializes a new instance of the `Claim` class with the specified claim type, value, value type, and issuer.

Parameters:

- `type`: The claim type.
- `value`: The claim value.
- `valueType`: The claim value type. If this parameter is `null`, then `ClaimValueTypes.String` is used.
- `issuer`: The claim issuer. If this parameter is empty or `null`, then `ClaimsIdentity.DefaultIssuer` is used.

Exceptions:

- `ArgumentNullException`: `type` or `value` is `null`.

#### Remarks
The `Subject` property is set to `null`. The `OriginalIssuer` property is set according to the value of the `issuer` parameter.

## Claim.Claim(String, String, String, String, String) constructor

```csharp
public Claim (string type, string value, string? valueType, string? issuer, string? originalIssuer);
```

Initializes a new instance of the `Claim` class with the specified claim type, value, value type, issuer,  and original issuer.

Parameters:

- `type`: The claim type.
- `value`: The claim value.
- `valueType`: The claim value type. If this parameter is `null`, then `ClaimValueTypes.String` is used.
- `issuer`: The claim issuer. If this parameter is empty or `null`, then `ClaimsIdentity.DefaultIssuer` is used.
- `originalIssuer`: The original issuer of the claim. If this parameter is empty or `null`, then the `Claim.OriginalIssuer` property is set to the value of the `Claim.Issuer` property.

Exceptions:

- `ArgumentNullException`: `type` or `value` is `null`.

#### Remarks
The `Subject` property is set to `null`.

## Claim.Claim(String, String, String, String, String, ClaimsIdentity) constructor

```csharp
public Claim (string type, string value, string? valueType, string? issuer, string? originalIssuer, System.Security.Claims.ClaimsIdentity? subject);
```

Initializes a new instance of the `Claim` class with the specified claim type, value, value type, issuer, original issuer and subject.

Parameters:

- `type`: The claim type.
- `value`: The claim value.
- `valueType`: The claim value type. If this parameter is `null`, then `ClaimValueTypes.String` is used.
- `issuer`: The claim issuer. If this parameter is empty or `null`, then `ClaimsIdentity.DefaultIssuer` is used.
- `originalIssuer`: The original issuer of the claim. If this parameter is empty or `null`, then the `Claim.OriginalIssuer` property is set to the value of the `Claim.Issuer` property.
- `subject`: The subject that this claim describes.

Exceptions:

- `ArgumentNullException`: `type` or `value` is `null`.

## Claim.CustomSerializationData property

```csharp
protected virtual byte[]? CustomSerializationData { get; }
```

Contains any additional data provided by a derived type.

Returns: A `Byte` array representing the additional serialized data.

#### Remarks
The `CustomSerializationData` property is typically set when calling `WriteTo`.

## Claim.Issuer property

```csharp
public string Issuer { get; }
```

Gets the issuer of the claim.

Returns: A name that refers to the issuer of the claim.

#### Remarks
The value of the `Issuer` property is a name that is taken from a list of well-known issuers maintained by the issuer name registry. The issuer name registry is an instance of a class that derives from the `IssuerNameRegistry` class. The issuer name registry associates a mnemonic name (the issuer name) with the cryptographic material that is needed to verify signatures of tokens produced by the issuer; for example, an X.509 certificate.

## Claim.OriginalIssuer property

```csharp
public string OriginalIssuer { get; }
```

Gets the original issuer of the claim.

Returns: A name that refers to the original issuer of the claim.

#### Remarks
Contains the name of the entity that originally issued the claim. This property is designed to facilitate scenarios where a claim may pass <example-value> multiple issuers before it is presented by the client to the RP application; such as federation scenarios.

The value of the `OriginalIssuer` property is a name that is taken from a list of well-known issuers maintained by the issuer name registry. The issuer name registry is an instance of a class that derives from the `IssuerNameRegistry` class. The issuer name registry associates a mnemonic name (the issuer name) with the cryptographic material that is needed to verify signatures of tokens produced by the issuer; for example, an X.509 certificate.

Except for delegation and federation scenarios, the `Issuer` property and the `OriginalIssuer` property will usually have the same value. If the value of the `OriginalIssuer` property differs from the value of the `Issuer` property, the claim was first issued by the original issuer and was subsequently re-issued by the issuer.

## Claim.Properties property

```csharp
public System.Collections.Generic.IDictionary<string,string> Properties { get; }
```

Gets a dictionary that contains additional properties associated with this claim.

Returns: A dictionary that contains additional properties associated with the claim. The properties are represented as name-value pairs.

#### Remarks
The `Properties` property provides a dictionary of name-value pairs that allows metadata or other information about the claim to be associated with it. For claims generated from SAML tokens, this dictionary may contain keys given by the constants in the `ClaimProperties` class.

## Claim.Subject property

```csharp
public System.Security.Claims.ClaimsIdentity? Subject { get; }
```

Gets the subject of the claim.

Returns: The subject of the claim.

#### Remarks
The subject is the entity about which the claim is asserted. Some typical examples are a user, an application or service, a device, or a computer. The subject is represented by a `ClaimsIdentity`, which contains a collection of claims that describe it.

## Claim.Type property

```csharp
public string Type { get; }
```

Gets the claim type of the claim.

Returns: The claim type.

#### Remarks
The `Type` property provides the semantic content of the claim, that is, it states what the claim is about. For example, a claim with a claim type of `GivenName` (`"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"`) represents a user's first name. The claim type is typically a URI; however, you are not limited to any specific format other than that it must be representable as a string. The only general requirement is that the claim issuer and the claim consumer must agree about the meaning of the claim. Constants for the well-known claim types used by Windows Identity Foundation (WIF) are available through the `ClaimTypes` class. The claim value is provided by the `Value` property.
