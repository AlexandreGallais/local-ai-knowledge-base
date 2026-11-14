---
title: "X509FindType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509FindType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509FindType enum

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public enum X509FindType
```

Specifies the type of value the `X509Certificate2Collection.Find` method searches for.

#### Remarks
`X509FindType` identifies the type of value provided in the `findValue` parameter for the `X509Certificate2Collection.Find` method. You can use `X509FindType` to search an `X509Certificate2` collection by subject name, thumbprint, serial number, valid date range, or other value.

You can use a combination of `FindByTime` value types to find certificates that are valid in a given time range. The union of certificates returned using FindByTimeValid, FindByTimeNotYetValid, and FindByTimeExpired for a given time represents all certificates in the queried collection.

#### Examples
The following example opens the current user's personal certificate store, finds only valid certificates, allows the user to select a certificate, and then writes certificate information to the console. The output depends on the certificate you select.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Key/certselect.cs._

## X509FindType.FindByApplicationPolicy field

```csharp
FindByApplicationPolicy
```

The `findValue` parameter for the `X509Certificate2Collection.Find` method must be a string representing either the application policy friendly name or the object identifier (OID, or `Oid`) of the certificate. For example, "Encrypting File System" or "1.3.6.1.4.1.311.10.3.4" can be used. For an application that will be localized, the OID value must be used, because the friendly name is localized.

## X509FindType.FindByCertificatePolicy field

```csharp
FindByCertificatePolicy
```

The `findValue` parameter for the `X509Certificate2Collection.Find` method must be a string representing either the friendly name or the object identifier (OID, or `Oid`) of the certificate policy. The best practice is to use the OID, such as "1.3.6.1.4.1.311.10.3.4". For an application that will be localized, the OID must be used, because the friendly name is localized.

## X509FindType.FindByExtension field

```csharp
FindByExtension
```

The `findValue` parameter for the `X509Certificate2Collection.Find` method must be a string describing the extension to find. The object identifier (OID) is most commonly used to direct the `X509Certificate2Collection.Find` method to search for all certificates that have an extension matching that OID value.

## X509FindType.FindByIssuerDistinguishedName field

```csharp
FindByIssuerDistinguishedName
```

The `findValue` parameter for the `X509Certificate2Collection.Find` method must be a string representing the issuer distinguished name of the certificate. This is a more specific search than that provided by the `X509FindType.FindByIssuerName` enumeration value. Using the `X509FindType.FindByIssuerDistinguishedName` value, the `X509Certificate2Collection.Find` method performs a case-insensitive string comparison for the entire distinguished name. Searching by issuer name is a less precise search.

## X509FindType.FindByIssuerName field

```csharp
FindByIssuerName
```

The `findValue` parameter for the `X509Certificate2Collection.Find` method must be a string representing the issuer name of the certificate. This is a less specific search than that provided by the `X509FindType.FindByIssuerDistinguishedName` enumeration value. Using the `X509FindType.FindByIssuerName` value, the `X509Certificate2Collection.Find` method performs a case-insensitive string comparison using the supplied value. For example, if you pass "MyCA" to the `X509Certificate2Collection.Find` method, it will find all certificates with the issuer name containing that string, regardless of other issuer values.

## X509FindType.FindByKeyUsage field

```csharp
FindByKeyUsage
```

The `findValue` parameter for the `X509Certificate2Collection.Find` method must be either a string representing the key usage or an integer representing a bit mask containing all the requested key usages. For the string value, only one key usage at a time can be specified, but the `X509Certificate2Collection.Find` method can be used in a cascading sequence to get the intersection of the requested usages. For example, the `findValue` parameter can be set to "KeyEncipherment" or an integer (0x30 indicates "KeyEncipherment" and "DataEncipherment"). Values of the `X509KeyUsageFlags` enumeration can also be used.

## X509FindType.FindBySerialNumber field

```csharp
FindBySerialNumber
```

The `findValue` parameter for the `X509Certificate2Collection.Find` method must be a string that represents the serial number of the certificate as displayed by the certificate dialog box, but without the spaces, or as returned by the `X509Certificate.GetSerialNumberString` method.

## X509FindType.FindBySubjectDistinguishedName field

```csharp
FindBySubjectDistinguishedName
```

The `findValue` parameter for the `X509Certificate2Collection.Find` method must be a string representing the subject distinguished name of the certificate. This is a more specific search than that provided by the `X509FindType.FindBySubjectName` enumeration value. Using the `X509FindType.FindBySubjectDistinguishedName` value, the `X509Certificate2Collection.Find` method performs a case-insensitive string comparison for the entire distinguished name. Searching by subject name is a less precise search.

## X509FindType.FindBySubjectKeyIdentifier field

```csharp
FindBySubjectKeyIdentifier
```

The `findValue` parameter for the `X509Certificate2Collection.Find` method must be a string representing the subject key <example-value> in hexadecimal, such as "F3E815D45E83B8477B9284113C64EF208E897112", as displayed in the UI.

## X509FindType.FindBySubjectName field

```csharp
FindBySubjectName
```

The `findValue` parameter for the `X509Certificate2Collection.Find` method must be a string representing the subject name of the certificate. This is a less specific search than that provided by the `X509FindType.FindBySubjectDistinguishedName` enumeration value. Using the `X509FindType.FindBySubjectName` value, the `X509Certificate2Collection.Find` method performs a case-insensitive string comparison using the supplied value. For example, if you pass "MyCert" to the `X509Certificate2Collection.Find` method, it will find all certificates with the subject name containing that string, regardless of other subject values. Searching by distinguished name is a more precise search.

## X509FindType.FindByTemplateName field

```csharp
FindByTemplateName
```

The `findValue` parameter for the `X509Certificate2Collection.Find` method must be a string representing the template name of the certificate, such as "ClientAuth". A template name is an X509 version 3 extension that specifies the uses of the certificate.

## X509FindType.FindByThumbprint field

```csharp
FindByThumbprint
```

The `findValue` parameter for the `X509Certificate2Collection.Find` method must be a string representing the thumbprint of the certificate.

## X509FindType.FindByTimeExpired field

```csharp
FindByTimeExpired
```

The `findValue` parameter for the `X509Certificate2Collection.Find` method must be a `DateTime` value in local time. For example, you can find all the certificates that will be valid until the end of the year by eliminating the results of a `X509Certificate2Collection.Find` operation for `X509FindType.FindByTimeExpired` of the last day of the year from the results of a `X509Certificate2Collection.Find` operation for `DateTime.Now`.

## X509FindType.FindByTimeNotYetValid field

```csharp
FindByTimeNotYetValid
```

The `findValue` parameter for the `X509Certificate2Collection.Find` method must be a `DateTime` value in local time. The value does not have to be in the future. For example, you can use `X509FindType.FindByTimeNotYetValid` to find certificates that became valid in the current year by taking the intersection of the results of a `X509Certificate2Collection.Find` operation for `X509FindType.FindByTimeNotYetValid` for the last day of last year with the results of a `X509Certificate2Collection.Find` operation for `X509FindType.FindByTimeValid` of `DateTime.Now`.

## X509FindType.FindByTimeValid field

```csharp
FindByTimeValid
```

The `findValue` parameter for the `X509Certificate2Collection.Find` method must be a `DateTime` value in local time. You can use `DateTime.Now` to find all the currently valid certificates.
