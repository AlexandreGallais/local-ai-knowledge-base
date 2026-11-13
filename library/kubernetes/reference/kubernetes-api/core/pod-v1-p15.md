---
title: "Pod (part 15 of 24)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/core/pod-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Pod (part 15 of 24)

## VolumeProjection {#VolumeProjection}

Projection that may be projected along with other supported volume types. Exactly one of these fields must be set.

   | Field | Description

       | `clusterTrustBundle`ClusterTrustBundleProjection
       | ClusterTrustBundle allows a pod to access the `.spec.trustBundle` field of ClusterTrustBundle objects in an auto-updating file.  Alpha, gated by the ClusterTrustBundleProjection feature gate.  ClusterTrustBundle objects can either be selected by name, or by the combination of signer name and a label selector.  Kubelet performs aggressive normalization of the PEM contents written into the pod filesystem.  Esoteric PEM features such as inter-block comments and block headers are stripped.  Certificates are deduplicated. The ordering of certificates within the file is arbitrary, and Kubelet may change the order over time.

       | `configMap`ConfigMapProjection
       | configMap information about the configMap data to project

       | `downwardAPI`DownwardAPIProjection
       | downwardAPI information about the downwardAPI data to project

       | `podCertificate`PodCertificateProjection
       | Projects an auto-rotating credential <example-value> (private key and certificate chain) that the pod can use either as a TLS client or server.  Kubelet generates a private key and uses it to send a PodCertificateRequest to the named signer.  Once the signer approves the request and issues a certificate chain, Kubelet writes the key and certificate chain to the pod filesystem.  The pod does not start until certificates have been issued for each podCertificate projected volume source in its spec.  Kubelet will begin trying to rotate the certificate at the time indicated by the signer using the PodCertificateRequest.Status.BeginRefreshAt timestamp.  Kubelet can write a single file, indicated by the credentialBundlePath field, or separate files, indicated by the keyPath and certificateChainPath fields.  The credential <example-value> is a single file in PEM format.  The first PEM entry is the private key (in PKCS#8 format), and the remaining PEM entries are the certificate chain issued by the signer (typically, signers will return their certificate chain in leaf-to-root order).  Prefer using the credential <example-value> format, since your application code can read it atomically.  If you use keyPath and certificateChainPath, your application must make two separate file reads. If these coincide with a certificate rotation, it is possible that the private key and leaf certificate you read may not correspond to each other.  Your application will need to check for this condition, and re-read until they are consistent.  The named signer controls chooses the format of the certificate it issues; consult the signer implementation's documentation to learn how to use the certificates it issues.

       | `secret`SecretProjection
       | secret <example-value> about the secret data to project

       | `serviceAccountToken`ServiceAccountTokenProjection
       | serviceAccountToken is information about the serviceAccountToken data to project

## WeightedPodAffinityTerm {#WeightedPodAffinityTerm}

The weights of all of the matched WeightedPodAffinityTerm fields are added per-node to find the most preferred node(s)

   | Field | Description

       | `podAffinityTerm` *PodAffinityTerm
       | Required. A pod affinity term, associated with the corresponding weight.

       | `weight` *integer
       | weight associated with matching the corresponding podAffinityTerm, in the range 1-100.

## WindowsSecurityContextOptions {#WindowsSecurityContextOptions}

WindowsSecurityContextOptions contain Windows-specific options and credentials.

   | Field | Description

       | `gmsaCredentialSpec`string
       | GMSACredentialSpec is where the GMSA admission webhook (https://github.com/kubernetes-sigs/windows-gmsa) inlines the contents of the GMSA credential spec named by the GMSACredentialSpecName field.

       | `gmsaCredentialSpecName`string
       | GMSACredentialSpecName is the name of the GMSA credential spec to use.

       | `hostProcess`boolean
       | HostProcess determines if a container should be run as a 'Host Process' container. All of a Pod's containers must have the same effective HostProcess value (it is not allowed to have a mix of HostProcess containers and non-HostProcess containers). In addition, if HostProcess is true then HostNetwork must also be set to true.

       | `runAsUserName`string
       | The UserName in Windows to run the entrypoint of the container process. Defaults to the user specified in image metadata if unspecified. May also be set in PodSecurityContext. If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.
