---
title: "X509Certificate class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509Certificate.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509Certificate class (part 3 of 4)

## X509Certificate.ExportPkcs12(Pkcs12ExportPbeParameters, String) method

```csharp
public byte[] ExportPkcs12 (System.Security.Cryptography.X509Certificates.Pkcs12ExportPbeParameters exportParameters, string? password);
```

Exports the certificate and private key in PKCS#12 / PFX format.

Parameters:

- `exportParameters`: The algorithm parameters to use for the export.
- `password`: The password to use for the export.

Returns: A byte array containing the encoded PKCS#12.

Exceptions:

- `ArgumentException`: `password` contains a Unicode 'NULL' character.
- `ArgumentOutOfRangeException`: `exportParameters` is not a valid value.
- `CryptographicException`: The current instance is disposed.

-or-

The export operation failed.

To be added.

## X509Certificate.FormatDate(DateTime) method

```csharp
protected static string FormatDate (DateTime date);
```

Converts the specified date and time to a string.

Parameters:

- `date`: The date and time to convert.

Returns: A string representation of the value of the `DateTime` object.

#### Remarks
Some cultures cannot convert future dates into strings. If the expiration date of an X.509 certificate is beyond the range of the culture, `X509Certificate.FormatDate` falls back to a calendar that can express the date. If the `CultureInfo.Calendar` value is `UmAlQuraCalendar`, the calendar is changed to the `HijriCalendar` class; otherwise, it is changed to the `CultureInfo.InvariantCulture`.

## X509Certificate.GetCertHash() method

```csharp
public virtual byte[] GetCertHash ();
```

Returns the hash value for the X.509v3 certificate as an array of bytes.

Returns: The hash value for the X.509 certificate.

#### Examples
The following example uses the `X509Certificate.GetCertHash` method to fill an array of bytes with the hash value for an X.509 certificate.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Certificate/GetCertHash/example.cs._

## X509Certificate.GetCertHash(HashAlgorithmName) method

```csharp
public virtual byte[] GetCertHash (System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Returns the hash value for the X.509v3 certificate that is computed by using the specified cryptographic hash algorithm.

Parameters:

- `hashAlgorithm`: The name of the cryptographic hash algorithm to use.

Returns: A byte array that contains the hash value for the X.509 certificate.

Exceptions:

- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or an empty string.
- `CryptographicException`: `hashAlgorithm` is not a known hash algorithm.

To be added.

## X509Certificate.GetCertHashString() method

```csharp
public virtual string GetCertHashString ();
```

Returns the SHA-1 hash value for the X.509v3 certificate as a hexadecimal string.

Returns: The hexadecimal string representation of the X.509 certificate hash value.

#### Examples
The following example uses the `X509Certificate.GetCertHashString` method to get an X.509 certificate hash value, convert it to a string, and display it to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Certificate/GetCertHashString/example.cs._

## X509Certificate.GetCertHashString(HashAlgorithmName) method

```csharp
public virtual string GetCertHashString (System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Returns a hexadecimal string containing the hash value for the X.509v3 certificate computed using the specified cryptographic hash algorithm.

Parameters:

- `hashAlgorithm`: The name of the cryptographic hash algorithm to use.

Returns: The hexadecimal string representation of the X.509 certificate hash value.

Exceptions:

- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or an empty string.
- `CryptographicException`: `hashAlgorithm` is not a known hash algorithm.

To be added.

## X509Certificate.GetEffectiveDateString() method

```csharp
public virtual string GetEffectiveDateString ();
```

Returns the effective date of this X.509v3 certificate.

Returns: The effective date for this X.509 certificate.

#### Remarks
The effective date is the date after which the X.509 certificate is considered valid.

The `X509Certificate.GetEffectiveDateString` method returns a string that shows the date formatted in Short Date Pattern followed by the time formatted in Long Time Pattern.  The date and time are formatted using the current culture and time zone.

#### Examples
The following example uses the `X509Certificate.GetEffectiveDateString` method to get the effective date of a certificate and displays it to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Certificate/GetEffectiveDateString/example.cs._

## X509Certificate.GetExpirationDateString() method

```csharp
public virtual string GetExpirationDateString ();
```

Returns the expiration date of this X.509v3 certificate.

Returns: The expiration date for this X.509 certificate.

#### Remarks
The expiration date is the date after which the X.509 certificate is no longer considered valid.

The `X509Certificate.GetExpirationDateString` method returns a string that shows the date formatted in Short Date Pattern followed by the time formatted in Long Time Pattern.  The date and time are formatted using the current culture and time zone.

> **Note:**
> This method may return a different string format on Macintosh computers, although the underlying `DateTime` object will represent the same value.

#### Examples
The following example uses the `X509Certificate.GetExpirationDateString` method to get the expiration date of a certificate and displays it to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Certificate/GetExpirationDateString/example.cs._

## X509Certificate.GetFormat() method

```csharp
public virtual string GetFormat ();
```

Returns the name of the format of this X.509v3 certificate.

Returns: The format of this X.509 certificate.

#### Remarks
The format X.509 is always returned in this implementation.

#### Examples
The following example uses the `X509Certificate.GetFormat` method to get the format of a certificate and displays it to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Certificate/GetFormat/example.cs._

## X509Certificate.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for the X.509v3 certificate as an integer.

Returns: The hash code for the X.509 certificate as an integer.

#### Remarks
If the X.509 certificate hash is an array of more than 4 bytes, any byte after the fourth byte is not seen in this integer representation.

#### Examples
The following example uses the `X509Certificate.GetHashCode` method to return an integer representation of a certificate's hash code and displays it to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Certificate/GetHashCode/example.cs._

## X509Certificate.GetIssuerName() method

```csharp
public virtual string GetIssuerName ();
```

Returns the name of the certification authority that issued the X.509v3 certificate.

Returns: The name of the certification authority that issued the X.509 certificate.

Exceptions:

- `CryptographicException`: An error with the certificate occurs. For example:

- The certificate file does not exist.

- The certificate is invalid.

- The certificate's password is incorrect.

To be added.

## X509Certificate.GetKeyAlgorithm() method

```csharp
public virtual string GetKeyAlgorithm ();
```

Returns the key <example-value> information for this X.509v3 certificate as a string.

Returns: The key <example-value> information for this X.509 certificate as a string.

Exceptions:

- `CryptographicException`: The certificate context is invalid.

#### Examples
The following example uses the `X509Certificate.GetKeyAlgorithm` method to get a certificate's key <example-value> in string format and displays it to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Certificate/GetKeyAlgorithm/example.cs._

## X509Certificate.GetKeyAlgorithmParameters() method

```csharp
public virtual byte[]? GetKeyAlgorithmParameters ();
```

Returns the key <example-value> parameters for the X.509v3 certificate as an array of bytes.

Returns: The key <example-value> parameters for the X.509 certificate as an array of bytes.

Exceptions:

- `CryptographicException`: The certificate context is invalid.

#### Examples
The following example uses the `X509Certificate.GetKeyAlgorithmParameters` method to return a certificate's key <example-value> parameters as an array of bytes and displays it to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Certificate/GetKeyAlgorithmParameters/example.cs._

## X509Certificate.GetKeyAlgorithmParametersString() method

```csharp
public virtual string? GetKeyAlgorithmParametersString ();
```

Returns the key <example-value> parameters for the X.509v3 certificate as a hexadecimal string.

Returns: The key <example-value> parameters for the X.509 certificate as a hexadecimal string.

Exceptions:

- `CryptographicException`: The certificate context is invalid.

#### Examples
The following example uses the `X509Certificate.GetKeyAlgorithmParametersString` method to return a certificate's key <example-value> parameters in string format and displays it to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Certificate/GetKeyAlgorithmParametersString/example.cs._

## X509Certificate.GetName() method

```csharp
public virtual string GetName ();
```

Returns the name of the principal to which the certificate was issued.

Returns: The name of the principal to which the certificate was issued.

Exceptions:

- `CryptographicException`: The certificate context is invalid.

To be added.

## X509Certificate.GetPublicKey() method

```csharp
public virtual byte[] GetPublicKey ();
```

Returns the public key for the X.509v3 certificate as an array of bytes.

Returns: The public key for the X.509 certificate as an array of bytes.

Exceptions:

- `CryptographicException`: The certificate context is invalid.

#### Remarks
This value corresponds to the contents of the `subjectPublicKey` field of the SubjectPublicKeyInfo data within the certificate.

#### Examples
The following example uses the `X509Certificate.GetPublicKey` method to return a certificate's public key as an array of bytes and displays it to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Certificate/GetPublicKey/example.cs._

## X509Certificate.GetPublicKeyString() method

```csharp
public virtual string GetPublicKeyString ();
```

Returns the public key for the X.509v3 certificate as a hexadecimal string.

Returns: The public key for the X.509 certificate as a hexadecimal string.

#### Remarks
This value corresponds to the contents of the `subjectPublicKey` field of the SubjectPublicKeyInfo data within the certificate.

#### Examples
The following example uses the `X509Certificate.GetPublicKeyString` method to return a certificate's public key as a string and displays it to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Certificate/GetPublicKeyString/example.cs._

## X509Certificate.GetRawCertData() method

```csharp
public virtual byte[] GetRawCertData ();
```

Returns the raw data for the entire X.509v3 certificate as an array of bytes.

Returns: A byte array containing the X.509 certificate data.

#### Remarks
The output of this method is equivalent to the output of the `X509Certificate.Export` method with an output encoding of `Cert`.

#### Examples
The following example uses the `X509Certificate.GetRawCertData` method to return a certificate's raw data as an array of bytes and displays it to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Certificate/GetRawCertData/example.cs._

## X509Certificate.GetRawCertDataString() method

```csharp
public virtual string GetRawCertDataString ();
```

Returns the raw data for the entire X.509v3 certificate as a hexadecimal string.

Returns: The X.509 certificate data as a hexadecimal string.

#### Examples
The following example uses the `X509Certificate.GetRawCertDataString` method to return a certificate's raw data as a string and displays it to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Certificate/GetRawCertDataString/example.cs._

## X509Certificate.GetSerialNumber() method

```csharp
public virtual byte[] GetSerialNumber ();
```

Returns the serial number of the X.509v3 certificate as an array of bytes in little-endian order.

Returns: The serial number of the X.509 certificate as an array of bytes in little-endian order.

Exceptions:

- `CryptographicException`: The certificate context is invalid.

#### Examples
The following example uses the `X509Certificate.GetSerialNumber` method to return a certificate's serial number as an array of bytes and displays it to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Certificate/GetSerialNumber/example.cs._

## X509Certificate.GetSerialNumberString() method

```csharp
public virtual string GetSerialNumberString ();
```

Returns the serial number of the X.509v3 certificate as a big-endian hexadecimal string.

Returns: The serial number of the X.509 certificate as a big-endian hexadecimal string.

#### Examples
The following example uses the `X509Certificate.GetSerialNumberString` method to return a certificate's serial number as a string and displays it to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Certificate/GetSerialNumberString/example.cs._

## X509Certificate.Import(Byte[]) method

```csharp
public virtual void Import (byte[] rawData);
```

Populates the `X509Certificate` object with data from a byte array.

Parameters:

- `rawData`: A byte array containing data from an X.509 certificate.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## X509Certificate.Import(String) method

```csharp
public virtual void Import (string fileName);
```

Populates the `X509Certificate` object with information from a certificate file.

Parameters:

- `fileName`: The name of a certificate file represented as a string.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.
