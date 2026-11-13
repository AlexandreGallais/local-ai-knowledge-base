---
title: "Breaking change: Decrypting EnvelopedCms doesn't double unwrap"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/cryptography/7.0/decrypt-envelopedcms.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Decrypting EnvelopedCms doesn't double unwrap

In .NET Core 2.0 on macOS and Linux, the `System.Security.Cryptography.Pkcs.EnvelopedCms` implementation incorrectly wrapped content in an extra ASN.1 OCTET STRING value. To maintain compatibility when processing content created with this error, the `System.Security.Cryptography.Pkcs.EnvelopedCms` class still looked at the decrypted content and tried to remove the extra data. `System.Security.Cryptography.Pkcs.EnvelopedCms` removed the extra data on Windows when using an external private key, and on all other operating systems for any decryption.

Unfortunately, this opportunistic compatibility code cannot distinguish between documents that were created incorrectly and documents that were created correctly but have the same data shape.

## Previous behavior

Previously, if the decrypted content started with the byte value `0x04` and a legally encoded ASN.1 BER length value that was less than or equal to the number of bytes remaining in the content, the data provided in the `envelopedCms.ContentInfo.Content` property only received the data associated with the content octets portion of the value when treated as an ASN.1 OCTET STRING.

For example, if the initially decrypted content was the byte series `{ 0x04, 0x03, 0x01, 0x02, 0x03 }` or `{ 0x04, 0x03, 0x01, 0x02, 0x03, [continued content] }`, the value of `envelopedCms.ContentInfo.Content` was the byte series `{ 0x01, 0x02, 0x03 }`.

Values that did not start with `0x04`, or started with `0x04` but were not followed by an acceptably encoded length value, were fully reported.

For some overloads of `System.Security.Cryptography.Pkcs.EnvelopedCms.Decrypt*`, this behavior only occurred on non-Windows operating systems. For more information, see Affected APIs.

## New behavior

The `System.Security.Cryptography.Pkcs.EnvelopedCms` class no longer attempts to work around the previous issue, and always reports the decrypted content faithfully.

If you're processing documents that were created by the .NET Core 2.0 version of the `System.Security.Cryptography.Pkcs.EnvelopedCms` class on macOS or Linux, you'll see extra data at the beginning of the content.

## Version introduced

.NET 7

## Type of breaking change

This change can affect binary compatibility.

## Reason for change

The compatibility code could not differentiate between incorrectly created documents and documents that were legitimately transporting data that looked like a BER-encoded ASN.1 OCTET STRING.

Due to the nature of the BER encoding, callers that were negatively impacted by this compatibility code could not easily recover their missing data.

## Recommended action

Callers that read documents created with `System.Security.Cryptography.Pkcs.EnvelopedCms` on .NET Core 2.0 for macOS or Linux can add code to remove the extra data. To remove it, use the `System.Formats.Asn1.AsnDecoder` class from the System.Formats.Asn1 NuGet package, which is already a dependency of the `System.Security.Cryptography.Pkcs.EnvelopedCms` class.

```csharp
envelopedCms.Decrypt(...);

byte[] content = envelopedCms.ContentInfo.Content;

if (envelopedCms.ContentInfo.Oid.Value == "1.2.840.113549.1.7.1")
{
    if (content?.Length > 0 && content[0] == 0x04)
    {
        try
        {
            content = AsnDecoder.ReadOctetString(content, AsnEncodingRules.BER, out _);
        }
        catch (AsnContentException)
        {
        }
    }
}
```

## Affected APIs

- `System.Security.Cryptography.Pkcs.EnvelopedCms.Decrypt(System.Security.Cryptography.Pkcs.RecipientInfo,System.Security.Cryptography.AsymmetricAlgorithm)`
- `System.Security.Cryptography.Pkcs.EnvelopedCms.Decrypt(System.Security.Cryptography.Pkcs.RecipientInfo,System.Security.Cryptography.X509Certificates.X509Certificate2Collection)` (non-Windows only)
- `System.Security.Cryptography.Pkcs.EnvelopedCms.Decrypt(System.Security.Cryptography.Pkcs.RecipientInfo)` (non-Windows only)
- `System.Security.Cryptography.Pkcs.EnvelopedCms.Decrypt(System.Security.Cryptography.X509Certificates.X509Certificate2Collection)` (non-Windows only)
