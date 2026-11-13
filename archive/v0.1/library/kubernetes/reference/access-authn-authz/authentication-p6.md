---
title: "Authenticating (part 6 of 9)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/authentication.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Authenticating (part 6 of 9)

The first option is to use the kubectl `oidc` authenticator, which sets the `id_token` as a bearer token
for all requests and refreshes the token once it expires. After you've logged into your provider, use
kubectl to add your `id_token`, `refresh_token`, `client_id`, and `client_secret` to configure the plugin.

Providers that don'<example-value>'t supported
by this plugin and should use Option 2 (specifying `--token`).

```bash
kubectl config set-credentials <example-value> \
   --auth-provider=oidc \
   --auth-provider-arg=idp-issuer-url=( issuer url ) \
   --auth-provider-arg=client-id=( your client id ) \
   --auth-provider-arg=client-secret=( your client secret ) \
   --auth-provider-arg=refresh-token=( your refresh token ) \
   --auth-provider-arg=idp-certificate-authority=( path to your ca certificate ) \
   --auth-provider-arg=id-token=( your id_token )
```

As an example, running the below command after authenticating to your identity provider:

```bash
kubectl config set-credentials <example-value>  \
        --auth-provider=oidc  \
        --auth-provider-arg=idp-issuer-url=https://oidcidp.tremolo.lan:8443/auth/idp/OidcIdP  \
        --auth-provider-arg=client-id=kubernetes  \
        --auth-provider-arg=client-secret=<example-value>  \
        --auth-provider-arg=refresh-token=<example-value> \
        --auth-provider-arg=idp-certificate-authority=/root/ca.pem \
        --auth-provider-arg=id-token=<example-jwt>
```

Which would produce the below configuration:

```yaml
users:
- name: mmosley
  user:
    auth-provider:
      config:
        client-id: kubernetes
        client-secret: <example-value>
        id-token: <example-jwt>
        idp-certificate-authority: /root/ca.pem
        idp-issuer-url: https://oidcidp.tremolo.lan:8443/auth/idp/OidcIdP
        refresh-token: <example-value>
      name: oidc
```

Once your `id_token` expires, `kubectl` will attempt to refresh your `id_token` using your `refresh_token`
and `client_secret` storing the new values for the `refresh_token` and `id_token` in your `.kube/config`.

##### Option 2 - Use the `--token` command line argument {#option-2-use-the-token-option}

The `kubectl` command lets you pass in a token using the `--token` command line argument.
Copy and paste the `id_token` into this option:

```bash
kubectl --token=<example-jwt> get nodes
```

### Webhook token <example-value>

Kubernetes _webhook authentication_ is a mechanism to make an HTTP callout for verifying bearer tokens.

In terms of how you configure the API server:

* `--authentication-token-webhook-config-file` a configuration file describing how to access the remote webhook service.
* `--authentication-token-webhook-cache-ttl` how long to cache authentication decisions. Defaults to two minutes.
* `--authentication-token-webhook-version` determines whether to use `authentication.k8s.io/v1beta1` or `authentication.k8s.io/v1`
  `TokenReview` objects to send/receive information from the webhook. Defaults to `v1beta1`.

The configuration file uses the kubeconfig
file format. Within the file, `clusters` refers to the remote service and
`users` refers to the API server webhook. An example would be:

```yaml
# Kubernetes API version
apiVersion: v1
# kind of the API object
kind: Config
# clusters refers to the remote service.
clusters:
  - name: name-of-remote-authn-service
    cluster:
      certificate-authority: /path/to/ca.pem         # CA for verifying the remote service.
      server: https://authn.example.com/authenticate # URL of remote service to query. 'https' recommended for production.

# users refers to the API server's webhook configuration.
users:
  - name: name-of-api-server
    user:
      client-certificate: /path/to/cert.pem # cert for the webhook plugin to use
      client-key: <example-value>/key.pem          # key <example-value> the cert

# kubeconfig files require a context. Provide one for the API server.
current-context: webhook
contexts:
- context:
    cluster: name-of-remote-authn-service
    user: name-of-api-server
  name: webhook
```

When a client attempts to authenticate with the API server using a bearer token as discussed
above, the authentication webhook POSTs a JSON-serialized
`TokenReview` object containing the token to the remote service.

Note that webhook API objects are subject to the same versioning compatibility rules
as other Kubernetes API objects. Implementers should check the `apiVersion` field of the request to ensure correct deserialization,
and **must** respond with a `TokenReview` object of the same version as the request.

**authentication.k8s.io/v1**
**Note:**
The Kubernetes API server defaults to sending `authentication.k8s.io/v1beta1` token <example-value> for backwards compatibility.
To opt into receiving `authentication.k8s.io/v1` token <example-value>, the API server must be started with `--authentication-token-webhook-version=v1`.

```yaml
{
  "apiVersion": "authentication.k8s.io/v1",
  "kind": "<example-value>",
  "spec": {
    # Opaque bearer token sent to the API server
    "token": "<example-value>",

    # Optional list of the audience identifiers for the server the token was presented to.
    # Audience-aware token <example-value> (for example, OIDC token <example-value>)
    # should verify the token was intended for at least one of the audiences in this list,
    # and return the intersection of this list and the valid audiences for the token in the response status.
    # This ensures the token is valid to authenticate to the server it was presented to.
    # If no audiences are provided, the token <example-value> be validated to authenticate to the Kubernetes API server.
    "audiences": ["https://myserver.example.com", "https://myserver.internal.example.com"]
  }
}
```

**authentication.k8s.io/v1beta1**
```yaml
{
  "apiVersion": "authentication.k8s.io/v1beta1",
  "kind": "<example-value>",
  "spec": {
    # Opaque bearer token sent to the API server
    "token": "<example-value>",

    # Optional list of the audience identifiers for the server the token was presented to.
    # Audience-aware token <example-value> (for example, OIDC token <example-value>)
    # should verify the token was intended for at least one of the audiences in this list,
    # and return the intersection of this list and the valid audiences for the token in the response status.
    # This ensures the token is valid to authenticate to the server it was presented to.
    # If no audiences are provided, the token <example-value> be validated to authenticate to the Kubernetes API server.
    "audiences": ["https://myserver.example.com", "https://myserver.internal.example.com"]
  }
}
```

The remote service is expected to fill the `status` field of the request to indicate the success of the login.
The response body's `spec` field is ignored and may be omitted.
The remote service must return a response using the same `TokenReview` API version that it received.
A successful validation of the bearer token would return:

**authentication.k8s.io/v1**
```yaml
{
  "apiVersion": "authentication.k8s.io/v1",
  "kind": "<example-value>",
  "status": {
    "authenticated": true,
    "user": {
      # Required
      "username": "user@example.com",
      # Optional
      "uid": "42",
      # Optional group memberships
      "groups": ["developers", "qa"],
      # Optional additional information provided by the authenticator.
      # This should not contain confidential data, as it can be recorded in logs
      # or API objects, and is made available to admission webhooks.
      "extra": {
        "extrafield1": [
          "extravalue1",
          "extravalue2"
        ]
      }
    },
    # Optional list audience-aware token <example-value> can return,
    # containing the audiences from the `spec.audiences` list for which the provided token was valid.
    # If this is omitted, the token is considered to be valid to authenticate to the Kubernetes API server.
    "audiences": ["https://myserver.example.com"]
  }
}
```

**authentication.k8s.io/v1beta1**
```yaml
{
  "apiVersion": "authentication.k8s.io/v1beta1",
  "kind": "<example-value>",
  "status": {
    "authenticated": true,
    "user": {
      # Required
      "username": "user@example.com",
      # Optional
      "uid": "42",
      # Optional group memberships
      "groups": ["developers", "qa"],
      # Optional additional information provided by the authenticator.
      # This should not contain confidential data, as it can be recorded in logs
      # or API objects, and is made available to admission webhooks.
      "extra": {
        "extrafield1": [
          "extravalue1",
          "extravalue2"
        ]
      }
    },
    # Optional list audience-aware token <example-value> can return,
    # containing the audiences from the `spec.audiences` list for which the provided token was valid.
    # If this is omitted, the token is considered to be valid to authenticate to the Kubernetes API server.
    "audiences": ["https://myserver.example.com"]
  }
}
```

An unsuccessful request would return:

**authentication.k8s.io/v1**
```yaml
{
  "apiVersion": "authentication.k8s.io/v1",
  "kind": "<example-value>",
  "status": {
    "authenticated": false,
    # Optionally include details about why authentication failed.
    # If no error is provided, the API will return a generic Unauthorized message.
    # The error field is ignored when authenticated=true.
    "error": "Credentials are expired"
  }
}
```

**authentication.k8s.io/v1beta1**
```yaml
{
  "apiVersion": "authentication.k8s.io/v1beta1",
  "kind": "<example-value>",
  "status": {
    "authenticated": false,
    # Optionally include details about why authentication failed.
    # If no error is provided, the API will return a generic Unauthorized message.
    # The error field is ignored when authenticated=true.
    "error": "Credentials are expired"
  }
}
```

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

The API server reads static bearer <example-value> from a file when given the `--token-auth-file=<SOMEFILE>`
option on the command line.
In Kubernetes , tokens last indefinitely, and the token list cannot be
changed without restarting the API server.

The token file is a CSV file with a minimum of 3 columns: token, user name, user uid,
followed by a comma-separated list of optional group names.

**Note:**
If you have more than one group, the column must be double quoted e.g.

```conf
token,user,uid,"<example-value>"
```

Using a static token file is appropriate for tokens that by their nature
are long-lived, static, and perhaps may never be rotated. It is also useful
when the client is local to a particular API server within the control plane,
such as a monitoring agent.

If you use this method during cluster provisioning, and then transition to
a different authentication method that will be used longer term, you
should deactivate the token that was used for bootstrapping (this requires
a restart of each API server.

For other circumstances, and especially where very prompt token <example-value> is
important, the Kubernetes project recommends using a
webhook token <example-value> instead of this mechanism.

## User impersonation

User impersonation provides
a method that a user can act as another user through impersonation headers
