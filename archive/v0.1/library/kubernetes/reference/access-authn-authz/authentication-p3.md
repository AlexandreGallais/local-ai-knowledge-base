---
title: "Authenticating (part 3 of 9)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/authentication.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Authenticating (part 3 of 9)

## External integrations

Kubernetes has native support for JWT and for OpenID Connect (OIDC); see JSON Web Token authentication.

Integrations with other authentication protocols (for example: LDAP, SAML, Kerberos, alternate X.509 schemes)
can be accomplished using an authenticating proxy or by integrating with an
authentication webhook.

You can also use any custom method that issues client X.509 certificates to clients,
provided that the API server will trust the valid certificates.
Read X.509 client certificates to learn about how to generate a
certificate.

If you do issue certificates to clients, it is up to you (as a cloud platform administrator)
to make sure that the certificate validity period, and other design choices you make, provide a
suitable level of security.
