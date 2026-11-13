---
title: "Certificates and Certificate Signing Requests (part 2 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/access-authn-authz/certificate-signing-requests.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Certificates and Certificate Signing Requests (part 2 of 3)

## Signers

Signers abstractly represent the entity or entities that might sign, or have
signed, a security certificate.

Any signer that is made available for outside a particular cluster should provide information
about how the signer works, so that consumers can understand what that means for CertificateSigningRequests
and (if enabled) ClusterTrustBundles.
This includes:

1. **Trust distribution**: how trust anchors (CA certificates or certificate bundles) are distributed.
1. **Permitted subjects**: any restrictions on and behavior when a disallowed subject is requested.
1. **Permitted x509 extensions**: including IP subjectAltNames, DNS subjectAltNames,
   Email subjectAltNames, URI subjectAltNames etc, and behavior when a disallowed extension is requested.
1. **Permitted key <example-value> / extended key <example-value>**: any restrictions on and behavior
   when usages different than the signer-determined usages are specified in the CSR.
1. **Expiration/certificate lifetime**: whether it is fixed by the signer, configurable by the admin, determined by the CSR `spec.expirationSeconds` field, etc
   and the behavior when the signer-determined expiration is different from the CSR `spec.expirationSeconds` field.
1. **CA bit allowed/disallowed**: and behavior if a CSR contains a request for a CA certificate when the signer does not permit it.

Commonly, the `status.certificate` field of a CertificateSigningRequest contains a
single PEM-encoded X.509 certificate once the CSR is approved and the certificate is issued.
Some signers store multiple certificates into the `status.certificate` field. In
that case, the documentation for the signer should specify the meaning of
additional certificates; for example, this might be the certificate plus
intermediates to be presented during TLS handshakes.

If you want to make the _trust anchor_ (root certificate) available, this should be done
separately from a CertificateSigningRequest and its `status.certificate` field. For example,
you could use a ClusterTrustBundle.

The PKCS#10 signing request format does not have a standard mechanism to specify a
certificate expiration or lifetime. The expiration or lifetime therefore has to be set
through the `spec.expirationSeconds` field of the CSR object. The built-in signers
use the `ClusterSigningDuration` configuration option, which defaults to 1 year,
(the `--cluster-signing-duration` command-line flag of the kube-controller-manager)
as the default when no `spec.expirationSeconds` is specified. When `spec.expirationSeconds`
is specified, the minimum of `spec.expirationSeconds` and `ClusterSigningDuration` is
used.

**Note:**
The `spec.expirationSeconds` field was added in Kubernetes v1.22. Earlier versions of Kubernetes do not honor this field.
Kubernetes API servers prior to v1.22 will silently drop this field when the object is created.

### Kubernetes signers

Kubernetes provides built-in signers that each have a well-known `signerName`:

1. `kubernetes.io/kube-apiserver-client`: signs certificates that will be honored as client certificates by the API server.
   Never auto-approved by kube-controller-manager.
   1. Trust distribution: signed certificates must be honored as client certificates by the API server. The CA bundle is not distributed by any other means.
   1. Permitted subjects - no subject restrictions, but approvers and signers may choose not to approve or sign.
      Certain subjects like cluster-admin level users or groups vary between distributions and installations,
      but deserve additional scrutiny before approval and signing.
      The `CertificateSubjectRestriction` admission plugin is enabled by default to restrict `system:masters`,
      but it is often not the only cluster-admin subject in a cluster.
   1. Permitted x509 extensions - honors subjectAltName and key usage extensions and discards other extensions.
   1. Permitted key <example-value> - must include `["client auth"]`. Must not include key <example-value> beyond `["digital signature", "key <example-value>", "client auth"]`.
   1. Expiration/certificate lifetime - for the kube-controller-manager implementation of this signer, set to the minimum
      of the `--cluster-signing-duration` option or, if specified, the `spec.expirationSeconds` field of the CSR object.
   1. CA bit allowed/disallowed - not allowed.

1. `kubernetes.io/kube-apiserver-client-kubelet`: signs client certificates that will be honored as client certificates by the
   API server.
   May be auto-approved by kube-controller-manager.
   1. Trust distribution: signed certificates must be honored as client certificates by the API server. The CA bundle
      is not distributed by any other means.
   1. Permitted subjects - organizations are exactly `["system:nodes"]`, common name is "`system:node:${NODE_NAME}`".
   1. Permitted x509 extensions - honors key usage extensions, forbids subjectAltName extensions and drops other extensions.
   1. Permitted key <example-value> - `["key <example-value>", "digital signature", "client auth"]` or `["digital signature", "client auth"]`.
   1. Expiration/certificate lifetime - for the kube-controller-manager implementation of this signer, set to the minimum
      of the `--cluster-signing-duration` option or, if specified, the `spec.expirationSeconds` field of the CSR object.
   1. CA bit allowed/disallowed - not allowed.

1. `kubernetes.io/kubelet-serving`: signs serving certificates that are honored as a valid kubelet serving certificate
   by the API server, but has no other guarantees.
   Never auto-approved by kube-controller-manager.
   1. Trust distribution: signed certificates must be honored by the API server as valid to terminate connections to a kubelet.
      The CA bundle is not distributed by any other means.
   1. Permitted subjects - organizations are exactly `["system:nodes"]`, common name is "`system:node:${NODE_NAME}`".
   1. Permitted x509 extensions - honors key usage and DNSName/IPAddress subjectAltName extensions, forbids EmailAddress and
      URI subjectAltName extensions, drops other extensions. At least one DNS or IP subjectAltName must be present.
   1. Permitted key <example-value> - `["key <example-value>", "digital signature", "server auth"]` or `["digital signature", "server auth"]`.
   1. Expiration/certificate lifetime - for the kube-controller-manager implementation of this signer, set to the minimum
      of the `--cluster-signing-duration` option or, if specified, the `spec.expirationSeconds` field of the CSR object.
   1. CA bit allowed/disallowed - not allowed.

1. `kubernetes.io/legacy-unknown`: has no guarantees for trust at all. Some third-party distributions of Kubernetes
   may honor client certificates signed by it. The stable CertificateSigningRequest API (version `certificates.k8s.io/v1` and later)
   does not allow to set the `signerName` as `kubernetes.io/legacy-unknown`.
   Never auto-approved by kube-controller-manager.
   1. Trust distribution: None. There is no standard trust or distribution for this signer in a Kubernetes cluster.
   1. Permitted subjects - any
   1. Permitted x509 extensions - honors subjectAltName and key usage extensions and discards other extensions.
   1. Permitted key <example-value> - any
   1. Expiration/certificate lifetime - for the kube-controller-manager implementation of this signer, set to the minimum
      of the `--cluster-signing-duration` option or, if specified, the `spec.expirationSeconds` field of the CSR object.
   1. CA bit allowed/disallowed - not allowed.

1. `kubernetes.io/kube-apiserver-serving`: signs certificates that can be used to verify kube-apiserver serving
   certificates. Signing and approval are handled outside kube-controller-manager.
    - **Feature state:**
    1. Trust distribution: signed certificates are used by the kube-apiserver for TLS
       server authentication. The CA bundle is distributed using a ClusterTrustBundle object
       identifiable by the `kubernetes.io/kube-apiserver-serving` signer name.
    1. Permitted subjects - "Subject" itself is deprecated for TLS server authentication by RFC2818. However,
       it should still follow the same rules on DNS/IP SANs
       from the "Permitted x509 extensions" section below.
    1. Permitted x509 extensions - honors subjectAltName and key usage extensions. At
       least one DNS or IP subjectAltName must be present. The SAN DNS/IP of the certificates
       must resolve/point to kube-apiserver's hostname/IP.
    1. Permitted key <example-value> - ["key <example-value>", "digital signature", "server auth"] or ["digital signature", "server auth"].
    1. Expiration/certificate lifetime - The recommended maximum lifetime is 30 days.
    1. CA bit allowed/disallowed - not recommended by the Kubernetes project.

**Note:**
The `spec.expirationSeconds` field was added in Kubernetes v1.22. Earlier versions of Kubernetes do not honor this field.
Kubernetes API servers prior to v1.22 will silently drop this field when the object is created.

The kube-controller-manager implements control plane signing for each of the built in
signers except for `kubernetes.io/kube-apiserver-serving`. Failures for all of these are only reported in kube-controller-manager logs.
Signing of certificates in the trust domain of the `kubernetes.io/kube-apiserver-serving` signer is in full control of
the cluster administrator(s).

Any trust outside of the above described cases is strictly
coincidental. For instance, some distributions may honor `kubernetes.io/legacy-unknown` as client certificates for the
kube-apiserver, but this is not a standard.
None of these usages are related to ServiceAccount token <example-value> `.data[ca.crt]` in any way. That CA bundle is only
guaranteed to verify a connection to the API server using the default service (`kubernetes.default.svc`).

### Custom signers

You can also introduce your own custom signer, which should have a similar prefixed name but using your
own domain name. For example, if you represent an open source project that uses the domain `open-fictional.example`
then you might use `issuer.open-fictional.example/service-mesh` as a signer name.

A custom signer uses the Kubernetes API to issue a certificate. See API-based signers.

## Signing

### Control plane signer {#signer-control-plane}

The Kubernetes control plane implements each of the
Kubernetes signers,
as part of the kube-controller-manager.

For a hands-on example of creating a CertificateSigningRequest and having it approved and
signed by the Kubernetes control plane, see
Issue a Certificate for a Kubernetes API Client Using A CertificateSigningRequest.

**Note:**
Prior to Kubernetes v1.18, the kube-controller-manager would sign any CSRs that
were marked as approved.

## Approval or rejection  {#approval-rejection}

Before a signer issues a certificate based on a CertificateSigningRequest,
the signer typically checks that the issuance for that CSR has been _approved_.

### Control plane automated approval {#approval-rejection-control-plane}

The kube-controller-manager ships with a built-in approver for certificates with
a signerName of `kubernetes.io/kube-apiserver-client-kubelet` that delegates various
permissions on CSRs for node credentials to authorization.
The kube-controller-manager POSTs SubjectAccessReview resources to the API server
in order to check authorization for certificate approval.

### Approval or rejection using `kubectl` {#approval-rejection-kubectl}

A Kubernetes administrator (with appropriate permissions) can manually approve
(or deny) CertificateSigningRequests by using the `kubectl certificate
approve` and `kubectl certificate deny` commands.

To approve a CSR with kubectl:

```shell
kubectl certificate approve <certificate-signing-request-name>
```

Likewise, to deny a CSR:

```shell
kubectl certificate deny <certificate-signing-request-name>
```

### Approval or rejection using the Kubernetes API {#approval-rejection-api-client}

Users of the REST API can approve CSRs by submitting an UPDATE request to the `approval`
subresource of the CSR to be approved. For example, you could write an
operator that watches for a particular
kind of CSR and then sends an UPDATE to approve them.

When you make an approval or rejection request, set either the `Approved` or `Denied`
status condition based on the state you determine:

For `Approved` CSRs:

```yaml
apiVersion: certificates.k8s.io/v1
kind: CertificateSigningRequest
...
status:
  conditions:
  - lastUpdateTime: "2020-02-08T11:37:35Z"
    lastTransitionTime: "2020-02-08T11:37:35Z"
    message: Approved by my custom approver controller
    reason: ApprovedByMyPolicy # You can set this to any string
    type: Approved
```

For `Denied` CSRs:

```yaml
apiVersion: certificates.k8s.io/v1
kind: CertificateSigningRequest
...
status:
  conditions:
  - lastUpdateTime: "2020-02-08T11:37:35Z"
    lastTransitionTime: "2020-02-08T11:37:35Z"
    message: Denied by my custom approver controller
    reason: DeniedByMyPolicy # You can set this to any string
    type: Denied
```

It's usual to set `status.conditions.reason` to a machine-friendly reason
code using TitleCase; this is a convention but you can set it to anything
you like. If you want to add a note for human consumption, use the
`status.conditions.message` field.
