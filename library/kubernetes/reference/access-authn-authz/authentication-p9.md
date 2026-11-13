---
title: "Authenticating (part 9 of 9)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/authentication.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Authenticating (part 9 of 9)

## API access to authentication information for a client {#self-subject-review}

**Feature state:** v1.28 [stable]

You can use the SelfSubjectReview API to find out
how your Kubernetes cluster maps your authentication information to identify you as a client.
This works whether you are authenticating as a user (typically representing
a real person) or as a ServiceAccount.

In a typical Kubernetes cluster, all authenticated users can create SelfSubjectReviews.
Access to do this is allowed by the built-in `system:basic-user`
ClusterRole.

The ability for a client to learn its own identity is extremely useful when troubleshooting a complicated authentication flow that is used in a Kubernetes cluster;
for example, if you use webhook token <example-value>
or an authenticating proxy.

If you want to query this on the command line, see
CLI access to authentication information.

### HTTP access to authentication information {#self-subject-review-http-api}

SelfSubjectReviews do not have any configurable fields. On receiving a request, the Kubernetes
API server fills the status with the user attributes and returns it to the user.
This does **not** persist a named resource into your cluster: you cannot fetch the
SelfSubjectReview, and it is discarded once your `POST` request has completed.

Request example (the body would be a SelfSubjectReview):

```http
POST /apis/authentication.k8s.io/v1/selfsubjectreviews
```

```json
{
  "apiVersion": "authentication.k8s.io/v1",
  "kind": "SelfSubjectReview"
}
```

Response example:

```json
{
  "apiVersion": "authentication.k8s.io/v1",
  "kind": "SelfSubjectReview",
  "status": {
    "userInfo": {
      "username": "user@example.com",
      "groups": [
        "viewers",
        "editors",
        "system:authenticated"
      ]
    }
  }
}
```

**Note:**
The Kubernetes API server fills `userInfo` after all authentication mechanisms are applied,
including impersonation.
If you, or an authentication proxy, make a SelfSubjectReview using impersonation,
you see the user details and properties for the user that was impersonated.

This example response did not show all the available fields; not all
authentication mechanisms fill in every available field.
See the SelfSubjectReview API reference
to see which fields are available.

Here is another example that also includes the `uid` and `extra` fields:

```yaml
{
  "apiVersion": "authentication.k8s.io/v1",
  "kind": "SelfSubjectReview",
  "status": {
    "userInfo": {
      "username": "user@example.com",
      "groups": [
        "viewers",
        "editors",
        "system:authenticated"
      ],
      "uid": "000042",
      "extra": {
        "firstName": [
          "Jane"
        ],
        "familyName": [
          "Doe"
        ],
        "projectAssignments": [
          "web-frontend",
          "ai-training-proof-of-concept"
        ],
      }
    }
  }
}
```

The data in these optional fields come from your authentication
integration or from the user database that it uses. The username,
UID, extra information, and all groups with names that don't start
`system:` are all sourced from outside of Kubernetes.

When querying the Kubernetes API via HTTP, you can request a response in either JSON or YAML
using the `Accept:` HTTP header; for example:

**JSON**
```http
POST /apis/authentication.k8s.io/v1/selfsubjectreviews HTTP/1.1
Accept: application/json;q=1.0
Content-Type: application/json
…other request headers

{
  "apiVersion": "authentication.k8s.io/v1",
  "kind": "SelfSubjectReview"
}

```

---

```json
{
  "apiVersion": "authentication.k8s.io/v1",
  "kind": "SelfSubjectReview",
  "status": {
    "userInfo": {
      "username": "jane.doe",
      "uid": "b79dbf30-0c6a-11ed-861d-0242ac120002",
      "groups": [
        "students",
        "teachers",
        "system:authenticated"
      ],
      "extra": {
        "skills": [
          "reading",
          "learning"
        ],
        "subjects": [
          "math",
          "sports"
        ]
      }
    }
  }
}
```

**YAML**
```http
POST /apis/authentication.k8s.io/v1/selfsubjectreviews HTTP/1.1
Accept: application/yaml;q=1.0
Content-Type: application/json
…other request headers

{
  "apiVersion": "authentication.k8s.io/v1",
  "kind": "SelfSubjectReview"
}

```

---

```yaml
apiVersion: authentication.k8s.io/v1
kind: SelfSubjectReview
status:
  userInfo:
    username: jane.doe
    uid: b79dbf30-0c6a-11ed-861d-0242ac120002
    groups:
    - students
    - teachers
    - system:authenticated
    extra:
      skills:
      - reading
      - learning
      subjects:
      - math
      - sports
```

### CLI access to authentication information {#self-subject-review-cli}

For convenience, the `kubectl auth whoami` subcommand is also available:
```shell
kubectl auth whoami
```

The output is similar to:
```console
  ATTRIBUTE         VALUE
  Username          george.boole
  Groups            [system:authenticated]
```

See `kubectl auth whoami`
for more details.

## What's next

* To learn about issuing certificates for users, read Issue a Certificate for a Kubernetes API Client Using A CertificateSigningRequest
* Read the client authentication reference (v1)
* Read the client authentication reference (v1beta1)
