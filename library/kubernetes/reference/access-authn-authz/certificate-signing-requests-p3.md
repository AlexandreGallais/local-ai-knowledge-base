---
title: "Certificates and Certificate Signing Requests (part 3 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/certificate-signing-requests.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Certificates and Certificate Signing Requests (part 3 of 3)

## API-based signers {#signer-api}

Users of the REST API can sign CSRs by submitting an **update** request to the `status`
subresource of the CSR to be signed.

As part of this request, the `status.certificate` field should be set to contain the
signed certificate. This field contains one or more PEM-encoded certificates.

All PEM blocks must have the "CERTIFICATE" label, contain no headers,
and the encoded data must be a BER-encoded ASN.1 Certificate structure
as described in section 4 of RFC5280.

Example certificate content:

```
-----BEGIN CERTIFICATE-----
MIIDgjCCAmqgAwIBAgIUC1N1EJ4Qnsd322BhDPRwmg3b/oAwDQYJKoZIhvcNAQEL
BQAwXDELMAkGA1UEBhMCeHgxCjAIBgNVBAgMAXgxCjAIBgNVBAcMAXgxCjAIBgNV
BAoMAXgxCjAIBgNVBAsMAXgxCzAJBgNVBAMMAmNhMRAwDgYJKoZIhvcNAQkBFgF4
MB4XDTIwMDcwNjIyMDcwMFoXDTI1MDcwNTIyMDcwMFowNzEVMBMGA1UEChMMc3lz
dGVtOm5vZGVzMR4wHAYDVQQDExVzeXN0ZW06bm9kZToxMjcuMC4wLjEwggEiMA0G
CSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDne5X2eQ1JcLZkKvhzCR4Hxl9+ZmU3
+e1zfOywLdoQxrPi+o4hVsUH3q0y52BMa7u1yehHDRSaq9u62cmi5ekgXhXHzGmm
kmW5n0itRECv3SFsSm2DSghRKf0mm6iTYHWDHzUXKdm9lPPWoSOxoR5oqOsm3JEh
Q7Et13wrvTJqBMJo1GTwQuF+HYOku0NF/DLqbZIcpI08yQKyrBgYz2uO51/oNp8a
sTCsV4OUfyHhx2BBLUo4g4SptHFySTBwlpRWBnSjZPOhmN74JcpTLB4J5f4iEeA7
2QytZfADckG4wVkhH3C2EJUmRtFIBVirwDn39GXkSGlnvnMgF3uLZ6zNAgMBAAGj
YTBfMA4GA1UdDwEB/wQEAwIFoDATBgNVHSUEDDAKBggrBgEFBQcDAjAMBgNVHRMB
Af8EAjAAMB0GA1UdDgQWBBTREl2hW54lkQBDeVCcd2f2VSlB1DALBgNVHREEBDAC
ggAwDQYJKoZIhvcNAQELBQADggEBABpZjuIKTq8pCaX8dMEGPWtAykgLsTcD2jYr
L0/TCrqmuaaliUa42jQTt2OVsVP/L8ofFunj/KjpQU0bvKJPLMRKtmxbhXuQCQi1
qCRkp8o93mHvEz3mTUN+D1cfQ2fpsBENLnpS0F4G/JyY2Vrh19/X8+mImMEK5eOy
o0BMby7byUj98WmcUvNCiXbC6F45QTmkwEhMqWns0JZQY+/XeDhEcg+lJvz9Eyo2
aGgPsye1o3DpyXnyfJWAWMhOz7cikS5X2adesbgI86PhEHBXPIJ1v13ZdfCExmdd
M1fLPhLyR54fGaY+7/X8P9AZzPefAkwizeXwe9ii6/a08vWoiE4=
-----END CERTIFICATE-----
```

Non-PEM content may appear before or after the CERTIFICATE PEM blocks and is unvalidated,
to allow for explanatory text as described in section 5.2 of RFC7468.

When encoded in JSON or YAML, this field is base-64 encoded.
After a CertificateSigningRequest has been approved and signed, it contains the signed
certificate in the `status.certificate` field. A CertificateSigningRequest containing
the example certificate above would look like this:

```yaml
apiVersion: certificates.k8s.io/v1
kind: CertificateSigningRequest
...
status:
  certificate: "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JS..."
```

## PodCertificateRequests {#pod-certificate-requests}

**Feature state:**

PodCertificateRequests are API objects tailored to provisioning certificates to
workloads running as Pods within a cluster.  The user typically does not
interact with PodCertificateRequests directly, but uses podCertificate
projected volume sources, which are a `kubelet`
feature that handles secure key provisioning and automatic certificate refresh.
The application inside the pod only needs to know how to read the certificates
from the filesystem.

PodCertificateRequests are similar to CertificateSigningRequests, but have a
simpler format enabled by their narrower use case.

A PodCertificateRequest has the following spec fields:
* `signerName`: The signer to which this request is addressed.
* `podName` and `podUID`: The Pod that Kubelet is requesting a certificate for.
* `serviceAccountName` and `serviceAccountUID`: The ServiceAccount corresponding to the Pod.
* `nodeName` and `nodeUID`: The Node corresponding to the Pod.
* `maxExpirationSeconds`: The maximum lifetime that the workload author will
  accept for this certificate.  Defaults to 24 hours if not specified.
* `stubPKCS10Request`: A minimal
  PKCS#10 CSR. Signers should extract
  the public key from this CSR. Typically, no other actions need to be taken
  with this field from the signer side, the CSR signature is checked by the API
  server. Requests from the Kubelet will only include the public key information
  in the CSR.
* `unverifiedUserAnnotations`: A map that allows the user to pass additional
  information to the signer implementation. It is copied verbatim from the
  `userAnnotations` field of the podCertificate projected volume
  source. Entries are
  subject to the same validation as object metadata annotations, with the
  addition that all keys must be domain-prefixed. No restrictions are placed on
  values, except an overall size limitation on the entire field. Other than
  these basic validations, the API server does not conduct any extra
  validations. The signer implementations should be very careful when consuming
  this data. Signers must not inherently trust this data without first
  performing the appropriate verification steps. Signers should document the
  keys and values they support. Signers should deny requests that contain keys
  they do not recognize.

Nodes automatically receive permissions to create PodCertificateRequests and
read PodCertificateRequests related to them (as determined by the
`spec.nodeName` field).  The `NodeRestriction` admission plugin, if enabled,
ensures that nodes can only create PodCertificateRequests that correspond to a
real pod that is currently running on the node.

After creation, the `spec` of a PodCertificateRequest is immutable.

Unlike CSRs, PodCertificateRequests do not have an
approval phase.  Once the PodCertificateRequest is created, the signer's
controller directly decides to issue or deny the request.  It also has the
option to mark the request as failed, if it encountered a permanent error when
attempting to issue the request.

To take any of these actions, the signing controller needs to have the
appropriate permissions on both the PodCertificateRequest type, as well as on
the signer name:
* Verbs: **update**, group: `certificates.k8s.io`, resource:
  `podcertificaterequests/status`
* Verbs: **sign**, group: `certificates.k8s.io`, resource: `signers`,
  resourceName: `<signerNameDomain>/<signerNamePath>` or `<signerNameDomain>/*`

The signing controller is free to consider other information beyond what's
contained in the request, but it can rely on the information in the request to
be accurate.  For example, the signing controller might load the Pod and read
annotations set on it, or perform a SubjectAccessReview on the ServiceAccount.

To issue a certificate in response to a request, the signing controller:
* Adds an `Issued` condition to `status.conditions`.
* Puts the issued certificate in `status.certificateChain`
* Puts the `NotBefore` and `NotAfter` fields of the certificate in the
  `status.notBefore` and `status.notAfter` fields — these fields are
  denormalized into the Kubernetes API in order to aid debugging
* Suggests a time to begin attempting to refresh the certificate using
  `status.beginRefreshAt`.

To deny a request, the signing controller adds a "Denied" condition to
`status.conditions[]`.

To mark a request failed, the signing controller adds a "Failed" condition to
`status.conditions[]`.

All of these conditions are mutually-exclusive, and must have status "True".  No
other condition types are permitted on PodCertificateRequests.  In addition,
once any of these conditions are set, the `status` field becomes immutable.

Like all conditions, the `status.conditions[].reason` field is meant to contain
a machine-readable code describing the condition in TitleCase.  The
`status.conditions[].message` field is meant for a free-form explanation for
human consumption.

To ensure that terminal PodCertificateRequests do not build up in the cluster, a
`kube-controller-manager` controller deletes all PodCertificateRequests older
than 15 minutes.  All certificate issuance flows are expected to complete within
this 15-minute limit.

## Cluster trust bundles {#cluster-trust-bundles}

**Feature state:**

A ClusterTrustBundles is a cluster-scoped object for distributing X.509 trust
anchors (root certificates) to workloads within the cluster. They're designed
to work well with the signer concept from CertificateSigningRequests.

ClusterTrustBundles can be used in two modes:
signer-linked and signer-unlinked.

### Common properties and validation {#ctb-common}

All ClusterTrustBundle objects have strong validation on the contents of their
`trustBundle` field. That field must contain one or more X.509 certificates,
DER-serialized, each wrapped in a PEM `CERTIFICATE` block. The certificates
must parse as valid X.509 certificates.

Esoteric PEM features like inter-block data and intra-block headers are either
rejected during object validation, or can be ignored by consumers of the object.
Additionally, consumers are allowed to reorder the certificates in
the bundle with their own arbitrary but stable ordering.

ClusterTrustBundle objects should be considered world-readable within the
cluster. If your cluster uses RBAC
authorization, all ServiceAccounts have a default grant that allows them to
**get**, **list**, and **watch** all ClusterTrustBundle objects.
If you use your own authorization mechanism and you have enabled
ClusterTrustBundles in your cluster, you should set up an equivalent rule to
make these objects public within the cluster, so that they work as intended.

If you do not have permission to list cluster trust bundles by default in your
cluster, you can impersonate a service account you have access to in order to
see available ClusterTrustBundles:

```bash
kubectl get clustertrustbundles --as='system:serviceaccount:mynamespace:default'
```

### Signer-linked ClusterTrustBundles {#ctb-signer-linked}

Signer-linked ClusterTrustBundles are associated with a _signer name_, like this:

```yaml
apiVersion: certificates.k8s.io/v1
kind: ClusterTrustBundle
metadata:
  name: example.com:mysigner:foo
spec:
  signerName: example.com/mysigner
  trustBundle: "<... PEM data ...>"
```

These ClusterTrustBundles are intended to be maintained by a signer-specific
controller in the cluster, so they have several security features:

* To create or update a signer-linked ClusterTrustBundle, you must be permitted
  to **attest** on the signer (custom authorization verb `attest`,
  API group `certificates.k8s.io`; resource path `signers`). You can configure
  authorization for the specific resource name
  `<signerNameDomain>/<signerNamePath>` or match a pattern such as
  `<signerNameDomain>/*`.
* Signer-linked ClusterTrustBundles **must** be named with a prefix derived from
  their `spec.signerName` field. Slashes (`/`) are replaced with colons (`:`),
  and a final colon is appended. This is followed by an arbitrary name. For
  example, the signer `example.com/mysigner` can be linked to a
  ClusterTrustBundle `example.com:mysigner:<arbitrary-name>`.

Signer-linked ClusterTrustBundles will typically be consumed in workloads
by a combination of a
field selector on the signer name, and a separate
label selector.

### Signer-unlinked ClusterTrustBundles {#ctb-signer-unlinked}

Signer-unlinked ClusterTrustBundles have an empty `spec.signerName` field, like this:

```yaml
apiVersion: certificates.k8s.io/v1
kind: ClusterTrustBundle
metadata:
  name: foo
spec:
  # no signerName specified, so the field is blank
  trustBundle: "<... PEM data ...>"
```

They are primarily intended for cluster configuration use cases.
Each signer-unlinked ClusterTrustBundle is an independent object, in contrast to the
customary grouping behavior of signer-linked ClusterTrustBundles.

Signer-unlinked ClusterTrustBundles have no `attest` verb requirement.
Instead, you control access to them directly using the usual mechanisms,
such as role-based access control.

To distinguish them from signer-linked ClusterTrustBundles, the names of
signer-unlinked ClusterTrustBundles **must not** contain a colon (`:`).

### Accessing ClusterTrustBundles from pods {#ctb-projection}

**Feature state:**

The contents of ClusterTrustBundles can be injected into the container filesystem, similar to ConfigMaps and Secrets.
See the clusterTrustBundle projected volume source for more details.

## What's next

* Read Manage TLS Certificates in a Cluster
* Read Issue a Certificate for a Kubernetes API Client Using A CertificateSigningRequest
* View the source code for the kube-controller-manager built in
  signer
* View the source code for the kube-controller-manager built in
  approver
* For details of X.509 itself, refer to RFC 5280 section 3.1
* For information on the syntax of PKCS#10 certificate signing requests, refer to RFC 2986
* Read about the ClusterTrustBundle API:
  *
