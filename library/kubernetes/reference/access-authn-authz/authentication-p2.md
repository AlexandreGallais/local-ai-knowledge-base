---
title: "Authenticating (part 2 of 9)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/authentication.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Authenticating (part 2 of 9)

## Authentication methods

You can enable multiple authentication methods at once. You should usually use at least two methods:

- service account tokens for ServiceAccounts
- at least one other method for (normal) user authentication

Available authentication methods include:

* X.509 client certificates
* Bootstrap tokens
* Service account tokens
* Static token file
* External integrations
  * JSON Web Tokens
  * OpenID Connect Tokens
  * Webhook token authentication
  * Authenticating reverse proxy

When multiple authenticator modules are enabled, the first module
to successfully authenticate the request short-circuits evaluation.
The API server does not guarantee the order authenticators run in.

### X.509 client certificates {#x509-client-certificates}

Any Kubernetes client that presents a valid client certificate signed by the cluster's
_client trust_ certificate authority (CA) is considered authenticated. In this configuration, Kubernetes determines
the username from the `commonName` field in the _subject_ of the certificate
(for example, `commonName=bob` represents a user with username "bob").
From there, Kubernetes authorization
mechanisms determine whether the user is allowed to perform a specific operation on a resource.

Client certificate authentication is enabled by passing the `--client-ca-file=<SOMEFILE>`
option to the API server.
This option configures the cluster's _client trust_ certificate authority.
The referenced file must contain one or more certificate authorities that
the API server can use, when it needs to validate client certificates.
If a client certificate is presented and verified, the common name of the subject is used as
the user name for the request. Client certificates can also indicate a user's group memberships
using the certificate's organization fields. To include multiple group memberships for a user,
include multiple organization fields in the certificate.

See Managing Certificates for how to generate a client cert, or read the brief example later in this page.

#### Kubernetes-compatible client certificates {#x509-client-certificates-k8s}

You can present a valid certificate, issued by a CA in a trust chain that the API server accepts
for client certificates, and use that to authenticate to Kubernetes.
The certificate must be valid; the API server checks that based on the X.509 `notBefore` and `notAfter` attributes, and the certificate must have an
_extended key usage_ that includes client authentication (`ClientAuth`).

**Note:**
Kubernetes  does not support certificate _revocation_.
Any certificate that is issued remains valid until it expires.

##### Username mapping {#x509-client-certificates-k8s-username}

Kubernetes expects a client certificate that contains a `commonName` (OID `2.5.4.3`)
attribute, that is used as the username of the subject.

##### User ID mapping

**Feature state:**

To use this feature, the certificate must have the attribute `1.3.6.1.4.1.57683.2` included,
and the `AllowParsingUserUIDFromCertAuth` feature gate
must be enabled (it is on by default).

Kubernetes can parse an **optional** user UID from a certificate.
UID is different from user name; it is an opaque value with a meaning defined
by the person who requested the certificate, or alternatively by whoever has
set the certificate approval rules.

For example, the UID could be `1042` (a simple integer) in one cluster, but
another certificate might use `d3f77937-ec82-4f16-8010-61821abe315a` (a UUID)
as the UID.

Here is an example to explain what that means. If you have a certificate with the common name
set to "Ada Lovelace" and the certificate also had a `uid` attribute, (OID `0.9.2342.19200300.100.1.1`)
with uid set to "aaking1815", Kubernetes considers that the client's username is "Ada Lovelace";
Kubernetes ignores the `uid` attribute because it is not the CNCF-specific OID
that Kubernetes looks for.
If you wanted `aaking1815` to be recognized as UID by Kubernetes, it must be
set as a value to the OID `1.3.6.1.4.1.57683.2` attribute in the certificate's subject.

##### Group mapping {#x509-client-certificates-k8s-group}

You can map a user into groups by statically including group information into
the certificate. For each group that the user is a member of, add the group
name as an `organization` (OID `2.5.6.4`) in your certificate's subject.
To include multiple group memberships for a user, include multiple organizations in the certificate subject
(the order does not matter).
For the example user, the distinguished name for a certificate might be
CN=Ada Lovelace,O=Users,O=Staff,O=Programmers, which would place her into the groups
"Programmers", "Staff", "system:authenticated", and "Users".

Putting group information into a certificate is optional; if you don't specify any groups in the certificate,
then the user will be a member of "system:authenticated" only.

##### Node client certificates {#x509-client-certificates-nodes}

Kubernetes can use the same approach for node identity; nodes are clients of the Kubernetes API server that run a
kubelet
(also, although less relevant here, the API server is usually also a client of each node).
For example: a Node "server-1a-antarctica42", with the domain name "server-1a-antarctica42.cluster.example", could use a certificate issued to "CN=system:node:server-1a-antarctica/42,O=system:nodes". The node's username is then "system:node:server-1a-antarctica/g42", and the node is a member of "system:authenticated" and "system:nodes".

The kubelet uses the node's certificate and private key to authenticate to
the cluster's API server.

**Note:**
Machine identities for nodes are not the same as
ServiceAccounts.

#### Example {#x509-client-certificates-example}

You could use the `openssl` command line tool to generate a certificate signing request:

```bash
# This example assumes that you already have a private key alovelace.pem
openssl req -new -key alovelace.pem -out alovelace-csr.pem -subj "/CN=alovelace/O=app1/O=app2"
```

This would create a signing request for the username "alovelace", belonging to two groups, "app1" and "app2". You could then have that signing request be signed by your cluster's client trust certificate authority to obtain a certificate you can use for client authentication to your cluster.

### Bootstrap tokens

**Feature state:** v1.18 [stable]

To allow for streamlined bootstrapping for new clusters, Kubernetes includes a
dynamically-managed Bearer token type called a *Bootstrap Token*. These tokens
are stored as Secrets in the `kube-system` namespace, where they can be
dynamically managed and created. Controller Manager contains a TokenCleaner
controller that deletes bootstrap tokens as they expire.

The tokens are of the form `[a-z0-9]{6}.[a-z0-9]{16}`. The first component is a
Token ID and the second component is the Token Secret. You specify the token
in an HTTP header as follows:

```http
Authorization: Bearer 781292.db7bc3a58fc5f07e
```

You must enable the Bootstrap Token Authenticator with the
`--enable-bootstrap-token-auth` flag on the API Server. You must enable
the TokenCleaner controller via the `--controllers` command line argument
for kube-controller-manager.
This is done with something like `--controllers=*,tokencleaner`.
The `kubeadm` tool will do this for you if you are using it to bootstrap a cluster.

The authenticator authenticates as `system:bootstrap:<Token ID>`. It is
included in the `system:bootstrappers` group. The naming and groups are
intentionally limited to discourage users from using these tokens past
bootstrapping. The user names and group can be used (and are used by `kubeadm`)
to craft the appropriate authorization policies to support bootstrapping a
cluster.

Please see Bootstrap Tokens for in depth
documentation on the Bootstrap Token authenticator and controllers along with
how to manage these tokens with `kubeadm`.

#### Putting a bearer token in a request

When using bearer token authentication from an HTTP client, the API
server expects an `Authorization` header with a value of `Bearer
<token>`. The bearer token must be a character sequence that can be
put in an HTTP header value using no more than the encoding and
quoting facilities of HTTP. For example: if the bearer token is
`31ada4fd-adec-460c-809a-9e56ceb75269` then it would appear in an HTTP
header as shown below.

```http
Authorization: Bearer 31ada4fd-adec-460c-809a-9e56ceb75269
```

### Service account tokens

A service account is an automatically enabled authenticator that uses signed
bearer tokens to verify requests. The plugin takes two optional flags:

* `--service-account-key-file` File containing PEM-encoded x509 RSA or ECDSA
  private or public keys, used to verify ServiceAccount tokens. The specified file
  can contain multiple keys, and the flag can be specified multiple times with
  different files. If unspecified, --tls-private-key-file is used.
* `--service-account-lookup` If enabled, tokens which are deleted from the API will be revoked.

ServiceAccounts
are usually created automatically by the API server and are
associated with pods running in the cluster through the `ServiceAccount`
Admission Controller.
Bearer tokens are mounted into pods at well-known locations, and allow in-cluster clients to
authenticate to the API server. ServiceAccounts may be explicitly associated with Pods using
the `serviceAccountName` field within the `spec` of a Pod.

**Note:**
`serviceAccountName` is usually omitted because this is done automatically.

Here is a (partial) manifest for a Deployment that runs as a ServiceAccount named bob-the-bot:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: default
spec:
  replicas: 3
  template:
    metadata:
    # ...
    spec:
      serviceAccountName: bob-the-bot
      containers:
      - name: nginx
        image: nginx:1.14.2
```

Service account bearer tokens are perfectly valid to use outside the cluster and
can be used to create identities for long standing jobs that wish to talk to the
Kubernetes API. To manually create a service account, use the `kubectl create
serviceaccount (NAME)` command. This creates a service account in the current
namespace.

```bash
kubectl create serviceaccount jenkins
```

```none
serviceaccount/jenkins created
```

You can manually create an associated token:

```bash
kubectl create token jenkins
```

```none
eyJhbGciOiJSUzI1NiIsImtp...
```

The created token is a signed JSON Web Token (JWT).

The signed JWT can be used as a bearer token to authenticate as the given service
account. See above for how the token is included
in a request. Normally these tokens are mounted into pods for in-cluster access to
the API server, but can be used from outside the cluster as well.

Service accounts authenticate with the username `system:serviceaccount:(NAMESPACE):(SERVICEACCOUNT)`,
and are assigned to the groups `system:serviceaccounts` and `system:serviceaccounts:(NAMESPACE)`.

**Warning:**
Because service account tokens can also be stored in Secret API objects, any user with
write access to Secrets can request a token, and any user with read access to those
Secrets can authenticate as the service account. Be cautious when granting permissions
to service accounts and read or write capabilities for Secrets.
