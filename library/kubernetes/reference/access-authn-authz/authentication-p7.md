---
title: "Authenticating (part 7 of 9)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/authentication.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Authenticating (part 7 of 9)

### Authenticating reverse proxy {#authenticating-proxy}

**Warning:**
If you have a certificate authority (CA) that is also used in a different context, **do not** trust
that certificate authority to identify authenticating proxy clients, unless you understand the
risks and the mechanisms to protect that CA's usage.

The API server can be configured to identify users from request header values, such as `X-Remote-User`.
It is designed for use in combination with an _authenticating proxy_ that sets these headers.

Using an authenticating reverse proxy is different from user impersonation.
With user impersonation, one user requests the API server to treat the request as if it were being
made by a different user. With an authenticating reverse proxy, the API server trusts its direct client
to provide information about the identity of the principal making the original request.

See web request header configuration to learn about
configuring this using command line arguments.

#### Example {#authenticating-proxy-example}

For example, with this configuration:

```
--requestheader-username-headers=X-Remote-User
--requestheader-group-headers=X-Remote-Group
--requestheader-extra-headers-prefix=X-Remote-Extra-
```

this request:

```http
GET / HTTP/1.1
X-Remote-User: fido
X-Remote-Group: dogs
X-Remote-Group: dachshunds
X-Remote-Extra-Acme.com%2Fproject: some-project
X-Remote-Extra-Scopes: openid
X-Remote-Extra-Scopes: profile
```

would result in this user info:

```yaml
name: fido
groups:
- dogs
- dachshunds
extra:
  acme.com/project:
  - some-project
  scopes:
  - openid
  - profile
```

#### Client certificate {#reverse-proxy-client-certificate}

In order to prevent header spoofing, the authenticating proxy is required to present a valid client
certificate to the API server for validation against the specified CA before the request headers are
checked.

See the command line option reference for request header
authentication mode.

Do **not** reuse a CA that is used in a different context unless you understand
the risks and the mechanisms to protect the CA's usage.

### Static token file integration {#static-token-file}

The API server reads static bearer tokens from a file when given the `--token-auth-file=<SOMEFILE>`
option on the command line.
In Kubernetes , tokens last indefinitely, and the token list cannot be
changed without restarting the API server.

The token file is a CSV file with a minimum of 3 columns: token, user name, user uid,
followed by a comma-separated list of optional group names.

**Note:**
If you have more than one group, the column must be double quoted e.g.

```conf
token,user,uid,"group1,group2,group3"
```

Using a static token file is appropriate for tokens that by their nature
are long-lived, static, and perhaps may never be rotated. It is also useful
when the client is local to a particular API server within the control plane,
such as a monitoring agent.

If you use this method during cluster provisioning, and then transition to
a different authentication method that will be used longer term, you
should deactivate the token that was used for bootstrapping (this requires
a restart of each API server.

For other circumstances, and especially where very prompt token rotation is
important, the Kubernetes project recommends using a
webhook token authenticator instead of this mechanism.

## User impersonation

User impersonation provides
a method that a user can act as another user through impersonation headers

## Authentication configuration {#api-server-authn-config}

You can configure Kubernetes authentication either using
command line arguments, or using a
configuration file.

Typically, you use a mix of these approaches.

### Configuration via command line arguments {#api-server-authn-config-cli}

You can use the following command line arguments to configure how your cluster's control plane authenticates clients.

The command line reference for the API server
describes all of the relevant command line arguments in more detail.

#### Anonymous authentication configuration {#api-server-authn-config-cli-anonymous}

`--anonymous-auth`
: Controls whether clients who have not authenticated can make request via the API server's secure port. Anonymous requests have a username of `system:anonymous`, and a group name of `system:unauthenticated`. Also see anonymous requests.

#### Bootstrap token configuration {#api-server-authn-config-cli-bootstrap}

`--enable-bootstrap-token-auth`
: When this flag is set, you can use bootstrap tokens to authenticate.

#### Certificate authentication configuration {#api-server-authn-config-cli-x-509}

`--client-ca-file`
: The path to the trust anchor(s) for validating client identity, when clients use X.509 certificate authentication.

#### OIDC configuration {#api-server-authn-config-cli-oidc}

`--oidc-ca-file`
: The path to the trust anchor(s) for validating client identity, when clients use OIDC.

`--oidc-client-id`
: The client ID for the OpenID Connect client.

`--oidc-username-claim`
: The name of a JWT claim for specifying the username.  claim to use as the user name. Default claim name is `sub`, as this should be a unique identifier of the end user. You can choose other claims, such as `email` or `name`. For claims other than `sub` or `email`, the kube-apiserver adds a prefix to the group name (to prevent naming clashes).

`--oidc-username-prefix`
: Prefix prepended to username claims to prevent clashes with existing names (such as `system:` users). For example, the value `oidc:` will create usernames like `oidc:jane.doe`. If this argument isn't provided and `--oidc-username-claim` is a value other than `email` the prefix defaults to `( Issuer URL )#` where `( Issuer URL )` is the value of `--oidc-issuer-url`. You can specify the prefix value as `-` to disable username prefixing.

`--oidc-groups-claim`
: The name of a custom OpenID Connect claim for specifying user groups. The claim in the token must be an array of strings. No default.

`--oidc-groups-prefix`
:  Prefix prepended to group claims to prevent clashes with existing names (such as `system:` groups). For example, the value `oidc:` will create group names like `oidc:engineering` and `oidc:infra`. The default prefix is `oidc:`

`--oidc-issuer-url`
: The URL of the OpenID issuer. The URL scheme **must** be `https`. If the issuer's OIDC discovery URL is `https://accounts.provider.example/.well-known/openid-configuration`, the value should be `https://accounts.provider.example`.

`--oidc-required-claim`
: A claim that must be present in a token before Kubernetes authenticates a client. Format is `key=value`. You can specify this argument more than once.

`--oidc-signing-algs`
: The signing algorithms accepted. Allowed values are: RS256, RS384, RS512, ES256, ES384, ES512, PS256, PS384, PS512. Values are defined by RFC 7518.  Default is `RS512`.

#### ServiceAccount configuration {#api-server-authn-config-cli-sa}

`--api-audiences`
: Defines the authentication audience for service account tokens.

`--service-account-extend-token-expiration`
: This flag turns on projected service account expiration extension during token generation, which helps safe transition from legacy tokens to bound service account token feature. See authenticating service account credentials.

`--service-account-issuer`
: Identifier of the service account token issuer. The issuer asserts this identifier in `iss` claim of each issued token. The Kubernetes project recommends using a URL here, with the scheme set to `https`.

`--service-account-jwks-uri`
: Overrides the URI for the JSON Web Key Set in the discovery document that is served at `/.well-known/openid-configuration`

`--service-account-key-file`
: Path to a file containing PEM-encoded X.509 public or private keys (RSA or ECDSA), used to verify ServiceAccount tokens. The specified file can contain multiple keys, and you can specify the argument multiple times with different paths.

`--service-account-lookup`
: If true, the API server validates that ServiceAccount tokens exist in etcd as part of authentication.

`--service-account-max-token-expiration`
: The maximum validity duration of a token created by the service account token issuer, as a Kubernetes duration string.

`--service-account-signing-endpoint`
: Path to socket where an external JWT signer is listening. You can use this to integrate with an external token signer.

`--service-account-signing-key-file`
: Path to the file that contains the current private key of the service account token issuer. Changes made to this file while the API server is running are **not** re-read.

#### Static token configuration {#api-server-authn-config-cli-bearer}

`--token-auth-file`
: Path to the configuration file for static bearer tokens. Changes made to this file while the API server is running are **not** re-read.

#### Webhook authentication configuration {#api-server-authn-config-cli-webhook}

`--authentication-token-webhook-cache-ttl`
: How long (as a Kubernetes duration specification) the API server should cache the outcome of HTTP callouts to validate tokens.

`--authentication-token-webhook-config-file`
: The path to a kubeconfig format client configuration, that specifies how the API server authenticates when making HTTP callouts. Changes made to this file while the API server is running are **not** re-read.

`--authentication-token-webhook-version`
: The API version of TokenReview to use when making HTTP callouts to check tokens.

#### Web request authentication configuration {#api-server-authn-config-cli-reverse-proxy}

**Caution:**
You should read the documentation about configuring an authenticating proxy
before you specify these command line arguments, as there is important information security advice
that you must follow.

`--requestheader-client-ca-file`
: _Required._
  Path to a PEM-encoded certificate bundle containing trust anchor(s) for validating authenticating proxy identity.
  A valid client certificate
  must be presented and validated against the certificate authorities in the specified file before the
  request headers are checked for user names.

`--requestheader-allowed-names`
: _Optional._ Comma-separated list of Common Name values (CNs).
  If set, a valid client
  certificate with a CN in the specified list must be presented before the request headers are checked
  for user names. If empty, any CN is allowed.

`--requestheader-username-headers`
: _Required; case-insensitive._ Header names to check, in order, for the user identity.
  The first header containing a value is used as the username.

`--requestheader-group-headers`
: _Optional; case-insensitive._
  Header names to check, in order, for the user's groups.
  `X-Remote-Group` is suggested.
  All values in all specified headers are used as group names.

`--requestheader-extra-headers-prefix`
: _Optional; case-insensitive._
  Header prefixes to look for to determine extra information about the user.
  `X-Remote-Extra-` is suggested.
  Extra data is typically used by the configured authorization plugin(s).
  Any headers beginning with any of the specified prefixes have the prefix removed.
  The remainder of the header name is lowercased and percent-decoded
  and becomes the extra key, and the header value is the extra value.

### Configuration via configuration file {#api-server-authn-config-file}

**Feature state:**

When you specify the `--authentication-config` command line argument to the kube-apiserver, the API server
loads a file at the path you specify, and uses the contents of that file to configure authentication.

The contents of that file can be changed while the API server is running and, if you do that, the API server re-reads the file afterwards.

**Note:**
Modifications to this file should be done in an atomic way (for example: writing to a peer temporary file, then renaming the temporary file to replace this file).

#### Configuration file path {#api-server-authn-config-cli-general}

`--authentication-config`
: This special command line argument specifies that you want to configure authentication using a configuration file.

#### Example {#api-server-authn-config-file-example}

Here is an example of a Kubernetes (structured) authentication configuration file:

---
#
# CAUTION: this is an example configuration.
#          Check and amend this before you use it in your own cluster!
#
apiVersion: apiserver.config.k8s.io/v1
kind: AuthenticationConfiguration
anonymous:
  enabled: false
