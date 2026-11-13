---
title: "Crypto (part 19 of 19)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/crypto.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Crypto (part 19 of 19)

### FIPS mode

Node.js exposes the FIPS support provided by the linked OpenSSL library. Node.js
is not itself FIPS validated. Validation belongs to a specific OpenSSL module or
provider and only applies when it is deployed according to its security policy.
Vendor-provided Node.js or OpenSSL builds can require a different configuration;
follow the vendor's documentation for those builds.

With OpenSSL 1.1.1, Node.js must be built against a FIPS-capable OpenSSL library.

With OpenSSL 3, FIPS support uses the provider model described in the
OpenSSL FIPS module guide. Using FIPS-approved implementations requires:

* A correctly installed OpenSSL 3 FIPS provider.
* An OpenSSL 3 FIPS module configuration file.
* The FIPS provider to be loaded into the OpenSSL library context used by
  Node.js, normally by activating it in an OpenSSL configuration file when
  Node.js starts.
* The default property query to include `fips=yes` when cryptographic
  implementations are fetched. This can be set from process startup by the
  OpenSSL configuration, `--enable-fips`, or `--force-fips`, or for
  subsequent fetches by `crypto.setFips(true)`.

An example OpenSSL 3 configuration file looks like this:

```text
nodejs_conf = nodejs_init
config_diagnostics = 1

.include /<absolute path>/fipsmodule.cnf

[nodejs_init]
providers = provider_sect
alg_section = algorithm_sect

[provider_sect]
# The fips section name should match the section name inside the
# included fipsmodule.cnf.
fips = fips_sect
base = base_sect

[base_sect]
activate = 1

[algorithm_sect]
default_properties = fips=yes
```

The `fipsmodule.cnf` file is generated as part of the FIPS provider installation
and contains module integrity and self-test information. The exact command and
arguments are installation-specific; see OpenSSL FIPS configuration and the
OpenSSL FIPS module guide. The installation uses `openssl fipsinstall`.

The example activates the provider and enables the `fips=yes` property query
when Node.js starts. To activate the provider at startup but enable the property
query later with `crypto.setFips(true)`, omit `alg_section = algorithm_sect` and
the `[algorithm_sect]` block. The provider must still be loaded; when using this
startup configuration, keep its activation enabled. `crypto.setFips(true)`
should be called before application code uses other OpenSSL-backed APIs. It is
not equivalent to enabling the property query from process startup because
Node.js initializes some OpenSSL state before application code runs. Use the
example as written, `--enable-fips`, or `--force-fips` when the property
query must be active from process startup.

`config_diagnostics` causes configuration errors to prevent startup instead of
being ignored. The `base` provider supplies non-cryptographic supporting
algorithms, such as encoders and decoders, that are commonly needed alongside
the FIPS provider. `default_properties = fips=yes` restricts OpenSSL's default
algorithm selection to implementations that match `fips=yes`.

Set `OPENSSL_CONF` to the OpenSSL configuration file. For a dynamically loaded
provider, `OPENSSL_MODULES` can set the directory containing the provider module.
For example:

```bash
export OPENSSL_CONF=/<path to configuration file>/nodejs.cnf
export OPENSSL_MODULES=/<path to openssl lib>/ossl-modules
```

The `--openssl-config` command-line option selects the configuration file and
takes precedence over `OPENSSL_CONF`. If neither is set, OpenSSL's default
configuration file is used.

By default, Node.js reads the `nodejs_conf` section instead of OpenSSL's usual
`openssl_conf` section. Use `--openssl-shared-config` to read `openssl_conf`,
or build Node.js with `./configure --openssl-conf-name=<name>` to change the
default section name.

On OpenSSL 3, the configuration above enables the `fips=yes` property query at
startup. The following controls are also available:

* `--enable-fips` and `--force-fips` enable the property query and
  additionally require the configured provider named `fips` to initialize and
  pass its self-test. Node.js exits if that check fails. `--force-fips` also
  prevents FIPS mode from being disabled from script code. With
  `--force-fips=strict`, Node.js also rejects non-approved operations reported
  through the OpenSSL FIPS indicator callback.
* `crypto.setFips()` changes the FIPS/property-query state. On OpenSSL 3, it
  does not install, load, initialize, or validate a provider. Implementations
  fetched before the call are not changed.
* `crypto.getFips()` reports the FIPS/property-query state. On OpenSSL 3, a
  return value of `1` does not prove that a FIPS provider is loaded or validated.
* With `--enable-fips-indicator-events`, the
  `'crypto.fips.indicator'` diagnostics channel reports non-approved
  operations permitted by an OpenSSL 3.4 or later FIPS provider configured for
  backwards compatibility.

With OpenSSL 1.1.1, these controls use the library's FIPS mode support and
require a FIPS-capable OpenSSL build.

Only algorithms available under the active FIPS settings can be used. With
OpenSSL 3, if no loaded provider supplies a requested cryptographic
implementation matching `fips=yes`, fetching it fails, typically with
`ERR_OSSL_EVP_UNSUPPORTED`. The same error can occur for algorithms that
Node.js supports when FIPS mode is disabled but that are unavailable under the
active FIPS settings.

OpenSSL documents that the same FIPS provider cannot be used by multiple copies
of `libcrypto` in one process. This can affect native addons that load another
copy of `libcrypto`; OpenSSL's documented workaround is to use a separate copy
of the provider for each `libcrypto` instance. See OpenSSL FIPS provider
limitations.

## Crypto constants

The following constants exported by `crypto.constants` apply to various uses of
the `node:crypto`, `node:tls`, and `node:https` modules and are generally
specific to OpenSSL.

### OpenSSL options

See the list of SSL OP Flags for details.

     | Constant
     | Description

     | `SSL_OP_ALL`
     | Applies multiple bug workarounds within OpenSSL. See
    https://www.openssl.org/docs/man3.0/man3/SSL_CTX_set_options.html
    for detail.

     | `SSL_OP_ALLOW_NO_DHE_KEX`
     | Instructs OpenSSL to allow a non-[EC]DHE-based key <example-value> mode
    for TLS v1.3

     | `SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION`
     | Allows legacy insecure renegotiation between OpenSSL and unpatched
    clients or servers. See
    https://www.openssl.org/docs/man3.0/man3/SSL_CTX_set_options.html.

     | `SSL_OP_CIPHER_SERVER_PREFERENCE`
     | Attempts to use the server's preferences instead of the client's when
    selecting a cipher. Behavior depends on protocol version. See
    https://www.openssl.org/docs/man3.0/man3/SSL_CTX_set_options.html.

     | `SSL_OP_CISCO_ANYCONNECT`
     | Instructs OpenSSL to use Cisco's version identifier of DTLS_BAD_VER.

     | `SSL_OP_COOKIE_EXCHANGE`
     | Instructs OpenSSL to turn on cookie exchange.

     | `SSL_OP_CRYPTOPRO_TLSEXT_BUG`
     | Instructs OpenSSL to add server-hello extension from an early version
    of the cryptopro draft.

     | `SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS`
     | Instructs OpenSSL to disable an SSL 3.0/TLS 1.0 vulnerability
    workaround added in OpenSSL 0.9.6d.

     | `SSL_OP_LEGACY_SERVER_CONNECT`
     | Allows initial connection to servers that do not support RI.

     | `SSL_OP_NO_COMPRESSION`
     | Instructs OpenSSL to disable support for SSL/TLS compression.

     | `SSL_OP_NO_ENCRYPT_THEN_MAC`
     | Instructs OpenSSL to disable encrypt-then-MAC.

     | `SSL_OP_NO_QUERY_MTU`
     |

     | `SSL_OP_NO_RENEGOTIATION`
     | Instructs OpenSSL to disable renegotiation.

     | `SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION`
     | Instructs OpenSSL to always start a new session when performing
    renegotiation.

     | `SSL_OP_NO_SSLv2`
     | Instructs OpenSSL to turn off SSL v2

     | `SSL_OP_NO_SSLv3`
     | Instructs OpenSSL to turn off SSL v3

     | `SSL_OP_NO_TICKET`
     | Instructs OpenSSL to disable use of RFC4507bis tickets.

     | `SSL_OP_NO_TLSv1`
     | Instructs OpenSSL to turn off TLS v1

     | `SSL_OP_NO_TLSv1_1`
     | Instructs OpenSSL to turn off TLS v1.1

     | `SSL_OP_NO_TLSv1_2`
     | Instructs OpenSSL to turn off TLS v1.2

     | `SSL_OP_NO_TLSv1_3`
     | Instructs OpenSSL to turn off TLS v1.3

     | `SSL_OP_PRIORITIZE_CHACHA`
     | Instructs OpenSSL server to prioritize ChaCha20-Poly1305
    when the client does.
    This option has no effect if
    `SSL_OP_CIPHER_SERVER_PREFERENCE`
    is not enabled.

     | `SSL_OP_TLS_ROLLBACK_BUG`
     | Instructs OpenSSL to disable version rollback attack detection.

### OpenSSL engine constants

     | Constant
     | Description

     | `ENGINE_METHOD_RSA`
     | Limit engine usage to RSA

     | `ENGINE_METHOD_DSA`
     | Limit engine usage to DSA

     | `ENGINE_METHOD_DH`
     | Limit engine usage to DH

     | `ENGINE_METHOD_RAND`
     | Limit engine usage to RAND

     | `ENGINE_METHOD_EC`
     | Limit engine usage to EC

     | `ENGINE_METHOD_CIPHERS`
     | Limit engine usage to CIPHERS

     | `ENGINE_METHOD_DIGESTS`
     | Limit engine usage to DIGESTS

     | `ENGINE_METHOD_PKEY_METHS`
     | Limit engine usage to PKEY_METHS

     | `ENGINE_METHOD_PKEY_ASN1_METHS`
     | Limit engine usage to PKEY_ASN1_METHS

     | `ENGINE_METHOD_ALL`
     |

     | `ENGINE_METHOD_NONE`
     |

### Other OpenSSL constants

     | Constant
     | Description

     | `DH_CHECK_P_NOT_SAFE_PRIME`
     |

     | `DH_CHECK_P_NOT_PRIME`
     |

     | `DH_UNABLE_TO_CHECK_GENERATOR`
     |

     | `DH_NOT_SUITABLE_GENERATOR`
     |

     | `RSA_PKCS1_PADDING`
     |

     | `RSA_SSLV23_PADDING`
     |

     | `RSA_NO_PADDING`
     |

     | `RSA_PKCS1_OAEP_PADDING`
     |

     | `RSA_X931_PADDING`
     |

     | `RSA_PKCS1_PSS_PADDING`
     |

     | `RSA_PSS_SALTLEN_DIGEST`
     | Sets the salt length for `RSA_PKCS1_PSS_PADDING` to the
        digest size when signing or verifying.

     | `RSA_PSS_SALTLEN_MAX_SIGN`
     | Sets the salt length for `RSA_PKCS1_PSS_PADDING` to the
        maximum permissible value when signing data.

     | `RSA_PSS_SALTLEN_AUTO`
     | Causes the salt length for `RSA_PKCS1_PSS_PADDING` to be
        determined automatically when verifying a signature.

     | `POINT_CONVERSION_COMPRESSED`
     |

     | `POINT_CONVERSION_UNCOMPRESSED`
     |

     | `POINT_CONVERSION_HYBRID`
     |

### Node.js crypto constants

     | Constant
     | Description

     | `defaultCoreCipherList`
     | Specifies the built-in default cipher list used by Node.js.

     | `defaultCipherList`
     | Specifies the active default cipher list used by the current Node.js
    process.
