---
title: "ClaimTypes class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Claims/ClaimTypes.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ClaimTypes class

Namespace: `System.Security.Claims`

```csharp
public static class ClaimTypes
```

Defines constants for the well-known claim types that can be assigned to a subject. This class cannot be inherited.

#### Remarks

These constants define URIs for well-known claim types.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.Actor field

```csharp
public const string Actor;
```

Specifies the URI for an actor claim; `http://schemas.xmlsoap.org/ws/2009/09/identity/claims/actor`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.Anonymous field

```csharp
public const string Anonymous;
```

Specifies the URI for a claim that indicates the anonymous user; `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/anonymous`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.Authentication field

```csharp
public const string Authentication;
```

Specifies the URI for a claim that contains details about whether an identity is authenticated; `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/authenticated`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.AuthenticationInstant field

```csharp
public const string AuthenticationInstant;
```

Specifies the URI for a claim that indicates the instant at which an entity was authenticated; `http://schemas.microsoft.com/ws/2008/06/identity/claims/authenticationinstant`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.AuthenticationMethod field

```csharp
public const string AuthenticationMethod;
```

Specifies the URI for a claim that indicates the method with which an entity was authenticated; `http://schemas.microsoft.com/ws/2008/06/identity/claims/authenticationmethod`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.AuthorizationDecision field

```csharp
public const string AuthorizationDecision;
```

Specifies the URI for a claim that indicates the authorization decision on an entity; `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/authorizationdecision`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.CookiePath field

```csharp
public const string CookiePath;
```

Specifies the URI for a cookie path claim; `http://schemas.microsoft.com/ws/2008/06/identity/claims/cookiepath`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.Country field

```csharp
public const string Country;
```

Specifies the URI for a claim that indicates the country or region in which an entity resides; `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/country`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.DateOfBirth field

```csharp
public const string DateOfBirth;
```

Specifies the URI for a claim that indicates the date of birth of an entity; `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/dateofbirth`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.DenyOnlyPrimaryGroupSid field

```csharp
public const string DenyOnlyPrimaryGroupSid;
```

Specifies the URI for a claim that indicates the deny-only primary group SID on an entity; `http://schemas.microsoft.com/ws/2008/06/identity/claims/denyonlyprimarygroupsid`.

A deny-only SID denies the specified entity access to a securable object.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.DenyOnlyPrimarySid field

```csharp
public const string DenyOnlyPrimarySid;
```

Specifies the URI for a claim that indicates the deny-only primary SID on an entity; `http://schemas.microsoft.com/ws/2008/06/identity/claims/denyonlyprimarysid`.

A deny-only SID denies the specified entity access to a securable object.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.DenyOnlySid field

```csharp
public const string DenyOnlySid;
```

Specifies the URI for a claim that indicates a deny-only security identifier (SID) for an entity; `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/denyonlysid`.

A deny-only SID denies the specified entity access to a securable object.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.DenyOnlyWindowsDeviceGroup field

```csharp
public const string DenyOnlyWindowsDeviceGroup;
```

Specifies the URI for a claim that indicates the Windows deny-only group SID of a device; `http://schemas.microsoft.com/ws/2008/06/identity/claims/denyonlywindowsdevicegroup`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.Dns field

```csharp
public const string Dns;
```

Specifies the URI for a claim that indicates the DNS name associated with the computer name or with the alternative name of either the subject or issuer of an X.509 certificate; `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/dns`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.Dsa field

```csharp
public const string Dsa;
```

Specifies the URI for a digital signature algorithm (DSA) claim; `http://schemas.microsoft.com/ws/2008/06/identity/claims/dsa`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.Email field

```csharp
public const string Email;
```

Specifies the URI for a claim that indicates the email address of an entity; `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.Expiration field

```csharp
public const string Expiration;
```

Specifies the URI for an expiration claim; `http://schemas.microsoft.com/ws/2008/06/identity/claims/expiration`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.Expired field

```csharp
public const string Expired;
```

Specifies the URI for a claim that indicates the expired status of an entity; `http://schemas.microsoft.com/ws/2008/06/identity/claims/expired`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.Gender field

```csharp
public const string Gender;
```

Specifies the URI for a claim that indicates the gender of an entity; `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/gender`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.GivenName field

```csharp
public const string GivenName;
```

Specifies the URI for a claim that indicates the given name of an entity; `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.GroupSid field

```csharp
public const string GroupSid;
```

Specifies the URI for a claim that indicates the SID for the group of an entity; `http://schemas.microsoft.com/ws/2008/06/identity/claims/groupsid`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.Hash field

```csharp
public const string Hash;
```

Specifies the URI for a hash value claim; `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/hash`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.HomePhone field

```csharp
public const string HomePhone;
```

Specifies the URI for a claim that indicates the home phone number of an entity; `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/homephone`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.IsPersistent field

```csharp
public const string IsPersistent;
```

Specifies the URI for a persistence claim; `http://schemas.microsoft.com/ws/2008/06/identity/claims/ispersistent`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.Locality field

```csharp
public const string Locality;
```

Specifies the URI for a claim that indicates the locale in which an entity resides; `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/locality`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.MobilePhone field

```csharp
public const string MobilePhone;
```

Specifies the URI for a claim that indicates the mobile phone number of an entity; `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.Name field

```csharp
public const string Name;
```

Specifies the URI for a claim that indicates the name of an entity; `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.NameIdentifier field

```csharp
public const string NameIdentifier;
```

Specifies the URI for a claim that indicates the name identifier of an entity; `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.OtherPhone field

```csharp
public const string OtherPhone;
```

Specifies the URI for a claim that indicates the alternative phone number of an entity; `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/otherphone`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.PostalCode field

```csharp
public const string PostalCode;
```

Specifies the URI for a claim that indicates the postal code of an entity; `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/postalcode`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.PrimaryGroupSid field

```csharp
public const string PrimaryGroupSid;
```

Specifies the URI for a claim that indicates the primary group SID of an entity; `http://schemas.microsoft.com/ws/2008/06/identity/claims/primarygroupsid`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.PrimarySid field

```csharp
public const string PrimarySid;
```

Specifies the URI for a claim that indicates the primary SID of an entity; `http://schemas.microsoft.com/ws/2008/06/identity/claims/primarysid`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.Role field

```csharp
public const string Role;
```

Specifies the URI for a claim that indicates the role of an entity; `http://schemas.microsoft.com/ws/2008/06/identity/claims/role`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.Rsa field

```csharp
public const string Rsa;
```

Specifies the URI for an RSA key claim; `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/rsa`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.SerialNumber field

```csharp
public const string SerialNumber;
```

Specifies the URI for a serial number claim; `http://schemas.microsoft.com/ws/2008/06/identity/claims/serialnumber`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.Sid field

```csharp
public const string Sid;
```

Specifies the URI for a security identifier (SID) claim; `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.Spn field

```csharp
public const string Spn;
```

Specifies the URI for a service principal name (SPN) claim; `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/spn`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.StateOrProvince field

```csharp
public const string StateOrProvince;
```

Specifies the URI for a claim that indicates the state or province in which an entity resides; `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/stateorprovince`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.StreetAddress field

```csharp
public const string StreetAddress;
```

Specifies the URI for a claim that indicates the street address of an entity; `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/streetaddress`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.Surname field

```csharp
public const string Surname;
```

Specifies the URI for a claim that indicates the surname of an entity; `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.System field

```csharp
public const string System;
```

Specifies the URI for a system entity claim; `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/system`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.Thumbprint field

```csharp
public const string Thumbprint;
```

Specifies the URI for a thumbprint claim; `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/thumbprint`.

A thumbprint is a globally unique SHA-1 hash of an X.509 certificate.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.

## ClaimTypes.Upn field

```csharp
public const string Upn;
```

Specifies the URI for a user principal name (UPN) claim; `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn`.

> **Note:**
> Schema URIs are mostly used as identifiers and shouldn't be expected to work as hyperlinks.
