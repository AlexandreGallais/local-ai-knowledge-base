---
title: "Breaking change: X500DistinguishedName parsing of friendly names"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/cryptography/7.0/x500-distinguished-names.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# X500DistinguishedName parsing of friendly names

On Linux and macOS, a distinguished name with a relative distinguished name component that is prefixed with "OID." followed by a friendly name will no longer parse. For example, `OID.STREET=MainStreet` no longer parses.

## Previous behavior

On Linux and macOS only, a distinguished name would successfully parse even if the object identifier (OID) was a friendly name.

## New behavior

Attempting to parse a distinguished name with a component prefixed with "OID." but not followed by a well-formed, dotted-decimal OID throws a `System.Security.Cryptography.CryptographicException`.

## Version introduced

.NET 7

## Type of breaking change

This change can affect binary compatibility.

## Reason for change

Windows does not permit distinguished names with friendly name OIDs, and that it worked in Linux and macOS was coincidence and not intentional. To bring consistency throughout platforms, the parsing logic was improved to not accept this form.

## Recommended action

Change "OID."-prefixed relative distinguished name components to use an OID, such as `OID.1.2.3.4=MyValue`.

## Affected APIs

- `System.Security.Cryptography.X509Certificates.X500DistinguishedName.#ctor(System.String)`
- `System.Security.Cryptography.X509Certificates.X500DistinguishedName.#ctor(System.String,System.Security.Cryptography.X509Certificates.X500DistinguishedNameFlags)`
