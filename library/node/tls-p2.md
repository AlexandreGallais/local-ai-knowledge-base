---
title: "TLS (SSL) (part 2 of 8)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/tls.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# TLS (SSL) (part 2 of 8)

## Modifying the default TLS cipher suite

Node.js is built with a default suite of enabled and disabled TLS ciphers. This
default cipher list can be configured when building Node.js to allow
distributions to provide their own default list.

The following command can be used to show the default cipher suite:

```console
node -p crypto.constants.defaultCoreCipherList | tr ':' '\n'
TLS_AES_256_GCM_SHA384
TLS_CHACHA20_POLY1305_SHA256
TLS_AES_128_GCM_SHA256
ECDHE-RSA-AES128-GCM-SHA256
ECDHE-ECDSA-AES128-GCM-SHA256
ECDHE-RSA-AES256-GCM-SHA384
ECDHE-ECDSA-AES256-GCM-SHA384
DHE-RSA-AES128-GCM-SHA256
ECDHE-RSA-AES128-SHA256
DHE-RSA-AES128-SHA256
ECDHE-RSA-AES256-SHA384
DHE-RSA-AES256-SHA384
ECDHE-RSA-AES256-SHA256
DHE-RSA-AES256-SHA256
HIGH
!aNULL
!eNULL
!EXPORT
!DES
!RC4
!MD5
!PSK
!SRP
!CAMELLIA
```

This default can be replaced entirely using the `--tls-cipher-list`
command-line switch (directly, or via the `NODE_OPTIONS` environment
variable). For instance, the following makes `ECDHE-RSA-AES128-GCM-SHA256:!RC4`
the default TLS cipher suite:

```bash
node --tls-cipher-list='ECDHE-RSA-AES128-GCM-SHA256:!RC4' server.js

export NODE_OPTIONS=--tls-cipher-list='ECDHE-RSA-AES128-GCM-SHA256:!RC4'
node server.js
```

To verify, use the following command to show the set cipher list, note the
difference between `defaultCoreCipherList` and `defaultCipherList`:

```bash
node --tls-cipher-list='ECDHE-RSA-AES128-GCM-SHA256:!RC4' -p crypto.constants.defaultCipherList | tr ':' '\n'
ECDHE-RSA-AES128-GCM-SHA256
!RC4
```

i.e. the `defaultCoreCipherList` list is set at compilation time and the
`defaultCipherList` is set at runtime.

To modify the default cipher suites from within the runtime, modify the
`tls.DEFAULT_CIPHERS` variable, this must be performed before listening on any
sockets, it will not affect sockets already opened. For example:

```js
// Remove Obsolete CBC Ciphers and RSA Key Exchange based Ciphers as they don't provide Forward Secrecy
tls.DEFAULT_CIPHERS +=
  ':!ECDHE-RSA-AES128-SHA:!ECDHE-RSA-AES128-SHA256:!ECDHE-RSA-AES256-SHA:!ECDHE-RSA-AES256-SHA384' +
  ':!ECDHE-ECDSA-AES128-SHA:!ECDHE-ECDSA-AES128-SHA256:!ECDHE-ECDSA-AES256-SHA:!ECDHE-ECDSA-AES256-SHA384' +
  ':!kRSA';
```

The default can also be replaced on a per client or server basis using the
`ciphers` option from `tls.createSecureContext()`, which is also available
in `tls.createServer()`, `tls.connect()`, and when creating new
`tls.TLSSocket`s.

The ciphers list can contain a mixture of TLSv1.3 cipher suite names, the ones
that start with `'TLS_'`, and specifications for TLSv1.2 and below cipher
suites. The TLSv1.2 ciphers support a legacy specification format, consult
the OpenSSL cipher list format documentation for details, but those
specifications do _not_ apply to TLSv1.3 ciphers. The TLSv1.3 suites can only
be enabled by including their full name in the cipher list. They cannot, for
example, be enabled or disabled by using the legacy TLSv1.2 `'EECDH'` or
`'!EECDH'` specification.

Despite the relative order of TLSv1.3 and TLSv1.2 cipher suites, the TLSv1.3
protocol is significantly more secure than TLSv1.2, and will always be chosen
over TLSv1.2 if the handshake indicates it is supported, and if any TLSv1.3
cipher suites are enabled.

The default cipher suite included within Node.js has been carefully
selected to reflect current security best practices and risk mitigation.
Changing the default cipher suite can have a significant impact on the security
of an application. The `--tls-cipher-list` switch and `ciphers` option should by
used only if absolutely necessary.

The default cipher suite prefers GCM ciphers for Chrome's 'modern
cryptography' setting and also prefers ECDHE and DHE ciphers for perfect
forward secrecy, while offering _some_ backward compatibility.

Old clients that rely on insecure and deprecated RC4 or DES-based ciphers
(like Internet Explorer 6) cannot complete the handshaking process with
the default configuration. If these clients _must_ be supported, the
TLS recommendations may offer a compatible cipher suite. For more details
on the format, see the OpenSSL cipher list format documentation.

There are only five TLSv1.3 cipher suites:

* `'TLS_AES_256_GCM_SHA384'`
* `'TLS_CHACHA20_POLY1305_SHA256'`
* `'TLS_AES_128_GCM_SHA256'`
* `'TLS_AES_128_CCM_SHA256'`
* `'TLS_AES_128_CCM_8_SHA256'`

The first three are enabled by default. The two `CCM`-based suites are supported
by TLSv1.3 because they may be more performant on constrained systems, but they
are not enabled by default since they offer less security.

## OpenSSL security level

The OpenSSL library enforces security levels to control the minimum acceptable
level of security for cryptographic operations. OpenSSL's security levels range
from 0 to 5, with each level imposing stricter security requirements. The default
security level is 2, which is generally suitable for most modern applications.
However, some legacy features and protocols, such as TLSv1, require a lower
security level (`SECLEVEL=0`) to function properly. For more detailed information,
please refer to the OpenSSL documentation on security levels.

### Setting security levels

To adjust the security level in your Node.js application, you can include `@SECLEVEL=X`
within a cipher string, where `X` is the desired security level. For example,
to set the security level to 0 while using the default OpenSSL cipher list, you could use:

```mjs
import { createServer, connect } from 'node:tls';
import { readFileSync } from 'node:fs';
const port = 8000;

createServer({
  key: readFileSync('server-key.pem'),
  cert: readFileSync('server-cert.pem'),
  ciphers: 'DEFAULT@SECLEVEL=0',
  minVersion: 'TLSv1',
}, function(socket) {
  console.log('Client connected with protocol:', socket.getProtocol());
  socket.end();
  this.close();
})
.listen(port, () => {
  connect(port, {
    ciphers: 'DEFAULT@SECLEVEL=0',
    minVersion: 'TLSv1',
    maxVersion: 'TLSv1',
    ca: [ readFileSync('server-cert.pem') ],
  });
});
```

```cjs
const { createServer, connect } = require('node:tls');
const { readFileSync } = require('node:fs');
const port = 8000;

createServer({
  key: readFileSync('server-key.pem'),
  cert: readFileSync('server-cert.pem'),
  ciphers: 'DEFAULT@SECLEVEL=0',
  minVersion: 'TLSv1',
}, function(socket) {
  console.log('Client connected with protocol:', socket.getProtocol());
  socket.end();
  this.close();
})
.listen(port, () => {
  connect(port, {
    ciphers: 'DEFAULT@SECLEVEL=0',
    minVersion: 'TLSv1',
    maxVersion: 'TLSv1',
    ca: [ readFileSync('server-cert.pem') ],
  });
});
```

This approach sets the security level to 0, allowing the use of legacy features while still
leveraging the default OpenSSL ciphers.

To generate the certificate and key for this example, run:

```bash
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
  -keyout server-key.pem -out server-cert.pem
```

### Using `--tls-cipher-list`

You can also set the security level and ciphers from the command line using the
`--tls-cipher-list=DEFAULT@SECLEVEL=X` as described in Modifying the default TLS cipher suite.
However, it is generally discouraged to use the command line option for setting ciphers and it is
preferable to configure the ciphers for individual contexts within your application code,
as this approach provides finer control and reduces the risk of globally downgrading the security level.

## X509 certificate error codes

Multiple functions can fail due to certificate errors that are reported by
OpenSSL. In such a case, the function provides an {Error} via its callback that
has the property `code` which can take one of the following values:

* `'UNABLE_TO_GET_ISSUER_CERT'`: Unable to get issuer certificate.
* `'UNABLE_TO_GET_CRL'`: Unable to get certificate CRL.
* `'UNABLE_TO_DECRYPT_CERT_SIGNATURE'`: Unable to decrypt certificate's
  signature.
* `'UNABLE_TO_DECRYPT_CRL_SIGNATURE'`: Unable to decrypt CRL's signature.
* `'UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY'`: Unable to decode issuer public key.
* `'CERT_SIGNATURE_FAILURE'`: Certificate signature failure.
* `'CRL_SIGNATURE_FAILURE'`: CRL signature failure.
* `'CERT_NOT_YET_VALID'`: Certificate is not yet valid.
* `'CERT_HAS_EXPIRED'`: Certificate has expired.
* `'CRL_NOT_YET_VALID'`: CRL is not yet valid.
* `'CRL_HAS_EXPIRED'`: CRL has expired.
* `'ERROR_IN_CERT_NOT_BEFORE_FIELD'`: Format error in certificate's notBefore
  field.
* `'ERROR_IN_CERT_NOT_AFTER_FIELD'`: Format error in certificate's notAfter
  field.
* `'ERROR_IN_CRL_LAST_UPDATE_FIELD'`: Format error in CRL's lastUpdate field.
* `'ERROR_IN_CRL_NEXT_UPDATE_FIELD'`: Format error in CRL's nextUpdate field.
* `'OUT_OF_MEM'`: Out of memory.
* `'DEPTH_ZERO_SELF_SIGNED_CERT'`: Self signed certificate.
* `'SELF_SIGNED_CERT_IN_CHAIN'`: Self signed certificate in certificate chain.
* `'UNABLE_TO_GET_ISSUER_CERT_LOCALLY'`: Unable to get local issuer certificate.
* `'UNABLE_TO_VERIFY_LEAF_SIGNATURE'`: Unable to verify the first certificate.
* `'CERT_CHAIN_TOO_LONG'`: Certificate chain too long.
* `'CERT_REVOKED'`: Certificate revoked.
* `'INVALID_CA'`: Invalid CA certificate.
* `'PATH_LENGTH_EXCEEDED'`: Path length constraint exceeded.
* `'INVALID_PURPOSE'`: Unsupported certificate purpose.
* `'CERT_UNTRUSTED'`: Certificate not trusted.
* `'CERT_REJECTED'`: Certificate rejected.
* `'HOSTNAME_MISMATCH'`: Hostname mismatch.

When certificate errors like `UNABLE_TO_VERIFY_LEAF_SIGNATURE`,
`DEPTH_ZERO_SELF_SIGNED_CERT`, or `UNABLE_TO_GET_ISSUER_CERT` occur, Node.js
appends a hint suggesting that if the root CA is installed locally,
try running with the `--use-system-ca` flag to direct developers towards a
secure solution, to prevent unsafe workarounds.
