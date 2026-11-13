---
title: "Crypto (part 9 of 19)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/crypto.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Crypto (part 9 of 19)

## Class: `X509Certificate`

Encapsulates an X509 certificate and provides read-only access to
its information.

```mjs
const { X509Certificate } = await import('node:crypto');

const x509 = new X509Certificate('{... pem encoded cert ...}');

console.log(x509.subject);
```

```cjs
const { X509Certificate } = require('node:crypto');

const x509 = new X509Certificate('{... pem encoded cert ...}');

console.log(x509.subject);
```

### `new X509Certificate(buffer)`

* `buffer` {string|TypedArray|Buffer|DataView} A PEM or DER encoded
  X509 Certificate.

### `x509.ca`

* Type: {boolean} Will be `true` if this is a Certificate Authority (CA)
  certificate.

### `x509.checkEmail(email[, options])`

* `email` {string}
* `options` {Object}
  * `subject` {string} `'default'`, `'always'`, or `'never'`.
    **Default:** `'default'`.
* Returns: {string|undefined} Returns `email` if the certificate matches,
  `undefined` if it does not.

Checks whether the certificate matches the given email address.

If the `'subject'` option is undefined or set to `'default'`, the certificate
subject is considered according to OpenSSL's default behavior.

If the `'subject'` option is set to `'always'` and if the subject alternative
name extension either does not exist or does not contain a matching email
address, the certificate subject is considered.

If the `'subject'` option is set to `'never'`, the certificate subject is never
considered, even if the certificate contains no subject alternative names.

### `x509.checkHost(name[, options])`

* `name` {string}
* `options` {Object}
  * `subject` {string} `'default'`, `'always'`, or `'never'`.
    **Default:** `'default'`.
  * `wildcards` {boolean} **Default:** `true`.
  * `partialWildcards` {boolean} **Default:** `true`.
  * `multiLabelWildcards` {boolean} **Default:** `false`.
  * `singleLabelSubdomains` {boolean} **Default:** `false`.
* Returns: {string|undefined} Returns a subject name that matches `name`,
  or `undefined` if no subject name matches `name`.

Checks whether the certificate matches the given host name.

If the certificate matches the given host name, the matching subject name is
returned. The returned name might be an exact match (e.g., `foo.example.com`)
or it might contain wildcards (e.g., `*.example.com`). Because host name
comparisons are case-insensitive, the returned subject name might also differ
from the given `name` in capitalization.

If the `'subject'` option is undefined or set to `'default'`, the certificate
subject is considered according to OpenSSL's default behavior.

If the `'subject'` option is set to `'always'` and if the subject alternative
name extension either does not exist or does not contain a matching DNS name,
the certificate subject is considered.

If the `'subject'` option is set to `'never'`, the certificate subject is never
considered, even if the certificate contains no subject alternative names.

### `x509.checkIP(ip)`

* `ip` {string}
* Returns: {string|undefined} Returns `ip` if the certificate matches,
  `undefined` if it does not.

Checks whether the certificate matches the given IP address (IPv4 or IPv6).

Only RFC 5280 `iPAddress` subject alternative names are considered, and they
must match the given `ip` address exactly. Other subject alternative names as
well as the subject field of the certificate are ignored.

### `x509.checkIssued(otherCert)`

* `otherCert` {X509Certificate}
* Returns: {boolean}

Checks whether this certificate was potentially issued by the given `otherCert`
by comparing the certificate metadata.

This is useful for pruning a list of possible issuer certificates which have been
selected using a more rudimentary filtering routine, i.e. just based on subject
and issuer names.

Finally, to verify that this certificate's signature was produced by a private key
corresponding to `otherCert`'s public key use `x509.verify(publicKey)`
with `otherCert`'s public key represented as a `KeyObject`
like so

```js
if (!x509.verify(otherCert.publicKey)) {
  throw new Error('otherCert did not issue x509');
}
```

### `x509.checkPrivateKey(privateKey)`

* `privateKey` {KeyObject} A private key.
* Returns: {boolean}

Checks whether the public key for this certificate is consistent with
the given private key.

### `x509.fingerprint`

* Type: {string}

The SHA-1 fingerprint of this certificate.

Because SHA-1 is cryptographically broken and because the security of SHA-1 is
significantly worse than that of algorithms that are commonly used to sign
certificates, consider using `x509.fingerprint256` instead.

### `x509.fingerprint256`

* Type: {string}

The SHA-256 fingerprint of this certificate.

### `x509.fingerprint512`

* Type: {string}

The SHA-512 fingerprint of this certificate.

Because computing the SHA-256 fingerprint is usually faster and because it is
only half the size of the SHA-512 fingerprint, `x509.fingerprint256` may be
a better choice. While SHA-512 presumably provides a higher level of security in
general, the security of SHA-256 matches that of most algorithms that are
commonly used to sign certificates.

### `x509.infoAccess`

* Type: {string}

A textual representation of the certificate's authority information access
extension.

This is a line feed separated list of access descriptions. Each line begins with
the access method and the kind of the access location, followed by a colon and
the value associated with the access location.

After the prefix denoting the access method and the kind of the access location,
the remainder of each line might be enclosed in quotes to indicate that the
value is a JSON string literal. For backward compatibility, Node.js only uses
JSON string literals within this property when necessary to avoid ambiguity.
Third-party code should be prepared to handle both possible entry formats.

### `x509.issuer`

* Type: {string}

The issuer identification included in this certificate.

### `x509.issuerCertificate`

* Type: {X509Certificate}

The issuer certificate or `undefined` if the issuer certificate is not
available.

### `x509.keyUsage`

* Type: {string\[]}

An array detailing the key extended usages for this certificate.

### `x509.publicKey`

* Type: {KeyObject}

The public key {KeyObject} for this certificate.

### `x509.raw`

* Type: {Buffer}

A `Buffer` containing the DER encoding of this certificate.

### `x509.serialNumber`

* Type: {string}

The serial number of this certificate.

Serial numbers are assigned by certificate authorities and do not uniquely
identify certificates. Consider using `x509.fingerprint256` as a unique
identifier instead.

### `x509.subject`

* Type: {string}

The complete subject of this certificate.

### `x509.subjectAltName`

* Type: {string}

The subject alternative name specified for this certificate.

This is a comma-separated list of subject alternative names. Each entry begins
with a string identifying the kind of the subject alternative name followed by
a colon and the value associated with the entry.

Earlier versions of Node.js incorrectly assumed that it is safe to split this
property at the two-character sequence `', '` (see CVE-2021-44532). However,
both malicious and legitimate certificates can contain subject alternative names
that include this sequence when represented as a string.

After the prefix denoting the type of the entry, the remainder of each entry
might be enclosed in quotes to indicate that the value is a JSON string literal.
For backward compatibility, Node.js only uses JSON string literals within this
property when necessary to avoid ambiguity. Third-party code should be prepared
to handle both possible entry formats.

### `x509.toJSON()`

* Type: {string}

There is no standard JSON encoding for X509 certificates. The
`toJSON()` method returns a string containing the PEM encoded
certificate.

### `x509.toLegacyObject()`

* Type: {Object}

Returns information about this certificate using the legacy
certificate object encoding.

### `x509.toString()`

* Type: {string}

Returns the PEM-encoded certificate.

### `x509.validFrom`

* Type: {string}

The date/time from which this certificate is valid.

### `x509.validFromDate`

* Type: {Date}

The date/time from which this certificate is valid, encapsulated in a `Date` object.

### `x509.validTo`

* Type: {string}

The date/time until which this certificate is valid.

### `x509.validToDate`

* Type: {Date}

The date/time until which this certificate is valid, encapsulated in a `Date` object.

### `x509.signatureAlgorithm`

* Type: {string|undefined}

The algorithm used to sign the certificate or `undefined` if the signature algorithm is unknown by OpenSSL.

### `x509.signatureAlgorithmOid`

* Type: {string}

The OID of the algorithm used to sign the certificate.

### `x509.verify(publicKey)`

* `publicKey` {KeyObject} A public key.
* Returns: {boolean}

Verifies that this certificate was signed by the given public key.
Does not perform any other validation checks on the certificate.
