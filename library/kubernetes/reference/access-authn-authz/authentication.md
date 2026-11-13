---
title: "Authenticating (part 1 of 9)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/authentication.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

This page provides an overview of authentication in Kubernetes, with a focus on
authentication to the Kubernetes API.

## Users in Kubernetes

All Kubernetes clusters have two categories of users: service accounts managed
by Kubernetes, and normal users.

It is assumed that a cluster-independent service manages normal users in the following ways:

- an administrator distributing private keys
- a user store like Keystone or Google Accounts
- a file with a list of usernames and passwords

In this regard, _Kubernetes does not have objects which represent normal user accounts._
Normal users cannot be added to a cluster through an API call.

Even though a normal user cannot be added via an API call, any user that
presents a valid certificate signed by the cluster's certificate authority
(CA) is considered authenticated. In this configuration, Kubernetes determines
the username from the common name field in the 'subject' of the cert (e.g.,
"/CN=bob"). From there, the role based access control (RBAC) sub-system would
determine whether the user is authorized to perform a specific operation on a
resource.

In contrast, service accounts are users managed by the Kubernetes API. They are
bound to specific namespaces, and created automatically by the API server or
manually through API calls. Service accounts are tied to a set of credentials
stored as `Secrets`, which are mounted into pods allowing in-cluster processes
to talk to the Kubernetes API.

API requests are tied to either a normal user or a service account, or are treated
as anonymous requests. This means every process inside or outside the cluster, from
a human user typing `kubectl` on a workstation, to `kubelets` on nodes, to members
of the control plane, must authenticate when making requests to the API server,
or be treated as an anonymous user.

If you attempt to authenticate and it succeeds, the API server automatically
marks that you are a member of the special group `system:authenticated`.

## Authentication strategies

Kubernetes uses client certificates, bearer tokens, or an authenticating proxy to
authenticate API requests through authentication plugins. As HTTP requests are
made to the API server, plugins attempt to associate the following attributes
with the request:

* Username: a string which identifies the end user. Common values might be `kube-admin` or `jane@example.com`.
* UID: a string which identifies the end user and attempts to be more consistent and unique than username.
* Groups: a set of strings, each of which indicates the user's membership in a named logical collection of users.
  Common values might be `system:masters` or `devops-team`.
* Extra fields: a map of strings to list of strings which holds additional information authorizers may find useful.

**Note:**
All values are opaque to the authentication system and only hold significance
when interpreted by an authorizer.

## Anonymous requests

When enabled, requests that are not rejected by other configured authentication methods are
treated as anonymous requests, and given a username of `system:anonymous` and a group of
`system:unauthenticated`.

For example, on a server with token authentication configured, and anonymous access enabled,
a request providing an invalid bearer token would receive a `401 Unauthorized` error.
A request providing no bearer token would be treated as an anonymous request.

Anonymous access is enabled by default if an
authorization mode
other than `AlwaysAllow` is used; you can disable it by passing the `--anonymous-auth=false`
command line option to the API server.
The built-in ABAC and RBAC authorizers require explicit authorization of the
`system:anonymous` user or the `system:unauthenticated` group; if you have legacy policy rules
(from Kubernetes version 1.5 or earlier), those legacy rules
that grant access to the `*` user or `*` group do not automatically allow access to anonymous users.

### Anonymous authenticator configuration

**Feature state:**

The `AuthenticationConfiguration` can be used to configure the anonymous
authenticator. If you set the anonymous field in the `AuthenticationConfiguration`
file then you cannot set the `--anonymous-auth` command line option.

The main advantage of configuring anonymous authenticator using the authentication
configuration file is that in addition to enabling and disabling anonymous authentication
you can also configure which endpoints support anonymous authentication.

A sample authentication configuration file is below:

---
#
# CAUTION: this is an example configuration.
#          Do not use this as-is for your own cluster!
#
apiVersion: apiserver.config.k8s.io/v1
kind: AuthenticationConfiguration
anonymous:
  enabled: true
  conditions:
  - path: /livez
  - path: /readyz
  - path: /healthz

In the configuration above, only the `/livez`, `/readyz` and `/healthz` endpoints
are reachable by anonymous requests. Any other endpoints will not be reachable
anonymously, even if your authorization configuration would allow it.
