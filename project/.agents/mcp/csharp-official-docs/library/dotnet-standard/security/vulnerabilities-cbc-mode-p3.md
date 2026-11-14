---
title: "CBC decryption vulnerability (part 3 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/security/vulnerabilities-cbc-mode.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# CBC decryption vulnerability (part 3 of 5)

## Example code following recommended practices - managed

The following sample code uses a non-standard message format of

`cipher_algorithm_id || hmac_algorithm_id || hmac_tag || iv || ciphertext`

where the `cipher_algorithm_id` and `hmac_algorithm_id` algorithm identifiers are application-local (non-standard) representations of those algorithms. These identifiers may make sense in other parts of your existing messaging protocol instead of as a bare concatenated bytestream.

This example also uses a single master key to derive both an encryption key and an HMAC key. This is provided both as a convenience for turning a singly-keyed application into a dual-keyed application, and to encourage keeping the two keys as different values. It further guarantees that the HMAC key and encryption key can't get out of synchronization.

This sample doesn't accept a `System.IO.Stream` for either encryption or decryption. The current data format makes one-pass <example-value> difficult because the `hmac_tag` value precedes the ciphertext. However, this format was chosen because it keeps all of the fixed-size elements at the beginning to keep the parser simpler. With this data format, one-pass
decrypt is possible, though an implementer is cautioned to call GetHashAndReset and verify the result before calling TransformFinalBlock. If streaming encryption is important, then a
different AE mode may be required.
