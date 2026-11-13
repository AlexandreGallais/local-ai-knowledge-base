---
title: "Authenticating (part 5 of 9)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/authentication.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Authenticating (part 5 of 9)

---
#
# CAUTION: this is an example configuration.
#          Do not use this for your own cluster!
#
apiVersion: apiserver.config.k8s.io/v1
kind: AuthenticationConfiguration
# list of authenticators to authenticate Kubernetes users using JWT compliant tokens.
# the maximum number of allowed authenticators is 64.
jwt:
- issuer:
    # url must be unique across all authenticators.
    # url must not conflict with issuer configured in --service-account-issuer.
    url: https://example.com # Same as --oidc-issuer-url.
    # discoveryURL, if specified, overrides the URL used to fetch discovery
    # information instead of using "{url}/.well-known/openid-configuration".
    # The exact value specified is used, so "/.well-known/openid-configuration"
    # must be included in discoveryURL if needed.
    #
    # The "issuer" field in the fetched discovery information must match the "issuer.url" field
    # in the AuthenticationConfiguration and will be used to validate the "iss" claim in the presented JWT.
    # This is for scenarios where the well-known and jwks endpoints are hosted at a different
    # location than the issuer (such as locally in the cluster).
    # discoveryURL must be different from url if specified and must be unique across all authenticators.
    discoveryURL: https://discovery.example.com/.well-known/openid-configuration
    # PEM encoded CA certificates used to validate the connection when fetching
    # discovery information. If not set, the system verifier will be used.
    # Same value as the content of the file referenced by the --oidc-ca-file command line argument.
    certificateAuthority: <PEM encoded CA certificates>
    # audiences is the set of acceptable audiences the JWT must be issued to.
    # At least one of the entries must match the "aud" claim in presented JWTs.
    audiences:
    - my-app # Same as --oidc-client-id.
    - my-other-app
    # this is required to be set to "MatchAny" when multiple audiences are specified.
    audienceMatchPolicy: MatchAny
    # egressSelectorType is an indicator of which egress selection should be used for sending all traffic related
    # to this issuer (discovery, JWKS, distributed claims, etc).  If unspecified, no custom dialer is used.
    # The StructuredAuthenticationConfigurationEgressSelector feature gate must be enabled
    # before you can use the egressSelectorType field.
    # When specified, the valid choices are "controlplane" and "cluster".  These correspond to the associated
    # values in the --egress-selector-config-file.
    # - controlplane: for traffic intended to go to the control plane.
    # - cluster: for traffic intended to go to the system being managed by Kubernetes.
    egressSelectorType: <egress-selector-type>
  # rules applied to validate token claims to authenticate users.
  claimValidationRules:
    # Same as --oidc-required-claim key=value.
  - claim: hd
    requiredValue: example.com
    # Instead of claim and requiredValue, you can use expression to validate the claim.
    # expression is a CEL expression that evaluates to a boolean.
    # all the expressions must evaluate to true for validation to succeed.
  - expression: 'claims.hd == "example.com"'
    # Message customizes the error message seen in the API server logs when the validation fails.
    message: the hd claim must be set to example.com
  - expression: 'claims.exp - claims.nbf <= 86400'
    message: total token lifetime must not exceed 24 hours
  claimMappings:
    # username represents an option for the username attribute.
    # This is the only required attribute.
    username:
      # Same as --oidc-username-claim. Mutually exclusive with username.expression.
      claim: "sub"
      # Same as --oidc-username-prefix. Mutually exclusive with username.expression.
      # if username.claim is set, username.prefix is required.
      # Explicitly set it to "" if no prefix is desired.
      prefix: ""
      # Mutually exclusive with username.claim and username.prefix.
      # expression is a CEL expression that evaluates to a string.
      #
      # 1.  If username.expression uses 'claims.email', then 'claims.email_verified' must be used in
      #     username.expression or extra[*].valueExpression or claimValidationRules[*].expression.
      #     An example claim validation rule expression that matches the validation automatically
      #     applied when username.claim is set to 'email' is 'claims.?email_verified.orValue(true) == true'.
      #     By explicitly comparing the value to true, we let type-checking see the result will be a boolean, and
      #     to make sure a non-boolean email_verified claim will be caught at runtime.
      # 2.  If the username asserted based on username.expression is the empty string, the authentication
      #     request will fail.
      expression: 'claims.username + ":external-user"'
    # groups represents an option for the groups attribute.
    groups:
      # Same as --oidc-groups-claim. Mutually exclusive with groups.expression.
      claim: "sub"
      # Same as --oidc-groups-prefix. Mutually exclusive with groups.expression.
      # if groups.claim is set, groups.prefix is required.
      # Explicitly set it to "" if no prefix is desired.
      prefix: ""
      # Mutually exclusive with groups.claim and groups.prefix.
      # expression is a CEL expression that evaluates to a string or a list of strings.
      expression: 'claims.roles.split(",")'
    # uid represents an option for the uid attribute.
    uid:
      # Mutually exclusive with uid.expression.
      claim: 'sub'
      # Mutually exclusive with uid.claim
      # expression is a CEL expression that evaluates to a string.
      expression: 'claims.sub'
    # extra attributes to be added to the UserInfo object. Keys must be domain-prefix path and must be unique.
    extra:
      # key is a string to use as the extra attribute key.
      # key must be a domain-prefix path (e.g. example.org/foo). All characters before the first "/" must be a valid
      # subdomain as defined by RFC 1123. All characters trailing the first "/" must
      # be valid HTTP Path characters as defined by RFC 3986.
      # k8s.io, kubernetes.io and their subdomains are reserved for Kubernetes use and cannot be used.
      # key must be lowercase and unique across all extra attributes.
    - key: 'example.com/tenant'
      # valueExpression is a CEL expression that evaluates to a string or a list of strings.
      valueExpression: 'claims.tenant'
  # validation rules applied to the final user object.
  userValidationRules:
    # expression is a CEL expression that evaluates to a boolean.
    # all the expressions must evaluate to true for the user to be valid.
  - expression: "!user.username.startsWith('system:')"
    # Message customizes the error message seen in the API server logs when the validation fails.
    message: 'username cannot used reserved system: prefix'
  - expression: "user.groups.all(group, !group.startsWith('system:'))"
    message: 'groups cannot used reserved system: prefix'

* Claim validation rule expression

  `jwt.claimValidationRules[i].expression` represents the expression which will be evaluated by CEL.
  CEL expressions have access to the contents of the token payload, organized into `claims` CEL variable.
  `claims` is a map of claim names (as strings) to claim values (of any type).

* User validation rule expression

  `jwt.userValidationRules[i].expression` represents the expression which will be evaluated by CEL.
  CEL expressions have access to the contents of `userInfo`, organized into `user` CEL variable.
  Refer to the UserInfo
  API documentation for the schema of `user`.

* Claim mapping expression

  `jwt.claimMappings.username.expression`, `jwt.claimMappings.groups.expression`, `jwt.claimMappings.uid.expression`
  `jwt.claimMappings.extra[i].valueExpression` represents the expression which will be evaluated by CEL.
  CEL expressions have access to the contents of the token payload, organized into `claims` CEL variable.
  `claims` is a map of claim names (as strings) to claim values (of any type).

  To learn more, see the Documentation on CEL

  Here are examples of the `AuthenticationConfiguration` with different token payloads.

  **Valid token**
  ```yaml
  apiVersion: apiserver.config.k8s.io/v1
  kind: AuthenticationConfiguration
  jwt:
  - issuer:
      url: https://example.com
      audiences:
      - my-app
    claimMappings:
      username:
        expression: 'claims.username + ":external-user"'
      groups:
        expression: 'claims.roles.split(",")'
      uid:
        expression: 'claims.sub'
      extra:
      - key: 'example.com/tenant'
        valueExpression: 'claims.tenant'
    userValidationRules:
    - expression: "!user.username.startsWith('system:')" # the expression will evaluate to true, so validation will succeed.
      message: 'username cannot used reserved system: prefix'
  ```

  ```bash
  TOKEN=eyJhbGciOiJSUzI1NiIsImtpZCI6ImY3dF9tOEROWmFTQk1oWGw5QXZTWGhBUC04Y0JmZ0JVbFVpTG5oQkgxdXMiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJrdWJlcm5ldGVzIiwiZXhwIjoxNzAzMjMyOTQ5LCJpYXQiOjE3MDExMDcyMzMsImlzcyI6Imh0dHBzOi8vZXhhbXBsZS5jb20iLCJqdGkiOiI3YzMzNzk0MjgwN2U3M2NhYTJjMzBjODY4YWMwY2U5MTBiY2UwMmRkY2JmZWJlOGMyM2I4YjVmMjdhZDYyODczIiwibmJmIjoxNzAxMTA3MjMzLCJyb2xlcyI6InVzZXIsYWRtaW4iLCJzdWIiOiJhdXRoIiwidGVuYW50IjoiNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjRhIiwidXNlcm5hbWUiOiJmb28ifQ.TBWF2RkQHm4QQz85AYPcwLxSk-VLvQW-mNDHx7SEOSv9LVwcPYPuPajJpuQn9C_gKq1R94QKSQ5F6UgHMILz8OfmPKmX_00wpwwNVGeevJ79ieX2V-__W56iNR5gJ-i9nn6FYk5pwfVREB0l4HSlpTOmu80gbPWAXY5hLW0ZtcE1JTEEmefORHV2ge8e3jp1xGafNy6LdJWabYuKiw8d7Qga__HxtKB-t0kRMNzLRS7rka_SfQg0dSYektuxhLbiDkqhmRffGlQKXGVzUsuvFw7IGM5ZWnZgEMDzCI357obHeM3tRqpn5WRjtB8oM7JgnCymaJi-P3iCd88iu1xnzA
  ```

  where the token payload is:

  ```json
    {
      "aud": "kubernetes",
      "exp": 1703232949,
      "iat": 1701107233,
      "iss": "https://example.com",
      "jti": "7c337942807e73caa2c30c868ac0ce910bce02ddcbfebe8c23b8b5f27ad62873",
      "nbf": 1701107233,
      "roles": "user,admin",
      "sub": "auth",
      "tenant": "72f988bf-86f1-41af-91ab-2d7cd011db4a",
      "username": "foo"
    }
  ```

  The token with the above `AuthenticationConfiguration` will produce the following `UserInfo` object and successfully authenticate the user.

  ```json
  {
      "username": "foo:external-user",
      "uid": "auth",
      "groups": [
          "user",
          "admin"
      ],
      "extra": {
          "example.com/tenant": ["72f988bf-86f1-41af-91ab-2d7cd011db4a"]
      }
  }
  ```

  **Fails claim validation**
  ```yaml
  apiVersion: apiserver.config.k8s.io/v1
  kind: AuthenticationConfiguration
  jwt:
  - issuer:
      url: https://example.com
      audiences:
      - my-app
    claimValidationRules:
    - expression: 'claims.hd == "example.com"' # the token below does not have this claim, so validation will fail.
      message: the hd claim must be set to example.com
    claimMappings:
      username:
        expression: 'claims.username + ":external-user"'
      groups:
        expression: 'claims.roles.split(",")'
      uid:
        expression: 'claims.sub'
      extra:
      - key: 'example.com/tenant'
        valueExpression: 'claims.tenant'
    userValidationRules:
    - expression: "!user.username.startsWith('system:')" # the expression will evaluate to true, so validation will succeed.
      message: 'username cannot used reserved system: prefix'
  ```

  ```bash
  TOKEN=eyJhbGciOiJSUzI1NiIsImtpZCI6ImY3dF9tOEROWmFTQk1oWGw5QXZTWGhBUC04Y0JmZ0JVbFVpTG5oQkgxdXMiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJrdWJlcm5ldGVzIiwiZXhwIjoxNzAzMjMyOTQ5LCJpYXQiOjE3MDExMDcyMzMsImlzcyI6Imh0dHBzOi8vZXhhbXBsZS5jb20iLCJqdGkiOiI3YzMzNzk0MjgwN2U3M2NhYTJjMzBjODY4YWMwY2U5MTBiY2UwMmRkY2JmZWJlOGMyM2I4YjVmMjdhZDYyODczIiwibmJmIjoxNzAxMTA3MjMzLCJyb2xlcyI6InVzZXIsYWRtaW4iLCJzdWIiOiJhdXRoIiwidGVuYW50IjoiNzJmOTg4YmYtODZmMS00MWFmLTkxYWItMmQ3Y2QwMTFkYjRhIiwidXNlcm5hbWUiOiJmb28ifQ.TBWF2RkQHm4QQz85AYPcwLxSk-VLvQW-mNDHx7SEOSv9LVwcPYPuPajJpuQn9C_gKq1R94QKSQ5F6UgHMILz8OfmPKmX_00wpwwNVGeevJ79ieX2V-__W56iNR5gJ-i9nn6FYk5pwfVREB0l4HSlpTOmu80gbPWAXY5hLW0ZtcE1JTEEmefORHV2ge8e3jp1xGafNy6LdJWabYuKiw8d7Qga__HxtKB-t0kRMNzLRS7rka_SfQg0dSYektuxhLbiDkqhmRffGlQKXGVzUsuvFw7IGM5ZWnZgEMDzCI357obHeM3tRqpn5WRjtB8oM7JgnCymaJi-P3iCd88iu1xnzA
  ```

  where the token payload is:

  ```json
    {
      "aud": "kubernetes",
      "exp": 1703232949,
      "iat": 1701107233,
      "iss": "https://example.com",
      "jti": "7c337942807e73caa2c30c868ac0ce910bce02ddcbfebe8c23b8b5f27ad62873",
      "nbf": 1701107233,
      "roles": "user,admin",
      "sub": "auth",
      "tenant": "72f988bf-86f1-41af-91ab-2d7cd011db4a",
      "username": "foo"
    }
  ```

  The token with the above `AuthenticationConfiguration` will fail to authenticate because the
  `hd` claim is not set to `example.com`. The API server will return `401 Unauthorized` error.

  **Fails user validation**
  ```yaml
  apiVersion: apiserver.config.k8s.io/v1
  kind: AuthenticationConfiguration
  jwt:
  - issuer:
      url: https://example.com
      audiences:
      - my-app
    claimValidationRules:
    - expression: 'claims.hd == "example.com"'
      message: the hd claim must be set to example.com
    claimMappings:
      username:
        expression: '"system:" + claims.username' # this will prefix the username with "system:" and will fail user validation.
      groups:
        expression: 'claims.roles.split(",")'
      uid:
        expression: 'claims.sub'
      extra:
      - key: 'example.com/tenant'
        valueExpression: 'claims.tenant'
    userValidationRules:
    - expression: "!user.username.startsWith('system:')" # the username will be system:foo and expression will evaluate to false, so validation will fail.
      message: 'username cannot used reserved system: prefix'
  ```

  ```bash
  TOKEN=eyJhbGciOiJSUzI1NiIsImtpZCI6ImY3dF9tOEROWmFTQk1oWGw5QXZTWGhBUC04Y0JmZ0JVbFVpTG5oQkgxdXMiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJrdWJlcm5ldGVzIiwiZXhwIjoxNzAzMjMyOTQ5LCJoZCI6ImV4YW1wbGUuY29tIiwiaWF0IjoxNzAxMTEzMTAxLCJpc3MiOiJodHRwczovL2V4YW1wbGUuY29tIiwianRpIjoiYjViMDY1MjM3MmNkMjBlMzQ1YjZmZGZmY2RjMjE4MWY0YWZkNmYyNTlhYWI0YjdlMzU4ODEyMzdkMjkyMjBiYyIsIm5iZiI6MTcwMTExMzEwMSwicm9sZXMiOiJ1c2VyLGFkbWluIiwic3ViIjoiYXV0aCIsInRlbmFudCI6IjcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0YSIsInVzZXJuYW1lIjoiZm9vIn0.FgPJBYLobo9jnbHreooBlvpgEcSPWnKfX6dc0IvdlRB-F0dCcgy91oCJeK_aBk-8zH5AKUXoFTlInfLCkPivMOJqMECA1YTrMUwt_IVqwb116AqihfByUYIIqzMjvUbthtbpIeHQm2fF0HbrUqa_Q0uaYwgy8mD807h7sBcUMjNd215ff_nFIHss-9zegH8GI1d9fiBf-g6zjkR1j987EP748khpQh9IxPjMJbSgG_uH5x80YFuqgEWwq-aYJPQxXX6FatP96a2EAn7wfPpGlPRt0HcBOvq5pCnudgCgfVgiOJiLr_7robQu4T1bis0W75VPEvwWtgFcLnvcQx0JWg
  ```

  where the token payload is:
