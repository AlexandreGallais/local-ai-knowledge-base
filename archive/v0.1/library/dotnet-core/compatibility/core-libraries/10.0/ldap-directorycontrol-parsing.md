---
title: "Breaking change: LDAP DirectoryControl parsing is now more stringent"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/10.0/ldap-directorycontrol-parsing.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# LDAP DirectoryControl parsing is now more stringent

Previously, .NET used `System.DirectoryServices.Protocols.BerConverter` to parse the `System.DirectoryServices.Protocols.DirectoryControl` objects it received over the network and to generate the `System.DirectoryServices.Protocols.DirectoryControl` byte arrays it sent. `System.DirectoryServices.Protocols.BerConverter` used the OS-specific BER parsing functionality. This parsing functionality is now implemented in managed code.

## Previous behavior

Previously, as a result of using `System.DirectoryServices.Protocols.BerConverter`, the parsing of `System.DirectoryServices.Protocols.DirectoryControl` objects was fairly loose:

- The ASN.1 tags of each value weren't checked.
- Trailing data after the end of the parsed DirectoryControl was ignored, as was trailing data within an ASN.1 SEQUENCE.
- On Linux, OCTET STRING lengths that extended beyond the end of their parent sequence returned data outside the parent sequence.
- On earlier versions of Windows, a zero-length OCTET STRING returned `null` rather than an empty string.
- When reading the contents of a `System.DirectoryServices.Protocols.DirectoryControl` as a UTF8-encoded string, an invalid UTF8 sequence did not throw an exception.
- When passing an invalid UTF8 string to the constructor of VlvRequestControl, no exception was thrown.

While not a breaking change, Windows always encoded ASN.1 tags with a four-byte length while Linux only used as many bytes for the tag length as it needed. Both representations were valid, but this behavioral difference between platforms is now gone; the Linux behavior now also appears on Windows.

## New behavior

Starting in .NET 10, the DirectoryControl parsing is much more stringent, and is now consistent across platforms and versions:

- ASN.1 tags are now checked.
- Trailing data is no longer permitted.
- The length of `OCTET STRING`s and `SEQUENCE`s is now checked.
- Zero-length `OCTET STRING`s now always return an empty string.
- If the server sends an invalid UTF8 byte sequence, the `System.DirectoryServices.Protocols.DirectoryControl` parsing logic now throws an exception rather than silently substituting the invalid characters with a known value.

We also validate errors more thoroughly when calling the `System.DirectoryServices.Protocols.VlvRequestControl` constructor. Passing a string which cannot be encoded as a UTF8 value now throws an `System.Text.EncoderFallbackException`.

## Version introduced

.NET 10 Preview 1

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change was made for RFC and specification compliance. In the various RFCs and sections of MS-ADTS, the controlValue is specified as the BER encoding of an ASN.1 structure with wording similar to the following (from RFC2891, section 1.2):

> The controlType is set to "1.2.840.113556.1.4.474". The criticality is FALSE (MAY be absent). The controlValue is an OCTET STRING, whose value is the BER encoding of a value of the following SEQUENCE:

This precludes trailing data. It also rules out BER encodings of ASN.1 structures with differing ASN.1 tags, and of invalid BER encodings (such as OCTET STRINGs which are longer than their containing SEQUENCE.)

For the `System.DirectoryServices.Protocols.VlvRequestControl` constructor, throwing the exception early means that users can trust that only the values they explicitly specify are sent to the server. There are no circumstances where they can accidentally send `EF BF BD` to the server because they've passed a string that can't be encoded to valid UTF8 bytes.

## Recommended action

Servers should comply with the RFCs and specifications. Make sure to handle an `System.Text.EncoderFallbackException` when calling the `System.DirectoryServices.Protocols.VlvRequestControl` constructor.

## Affected APIs

- `System.DirectoryServices.Protocols.LdapConnection.SendRequest*`
- `System.DirectoryServices.Protocols.LdapConnection.EndSendRequest*`
- `System.DirectoryServices.Protocols.VlvRequestControl.#ctor*`
