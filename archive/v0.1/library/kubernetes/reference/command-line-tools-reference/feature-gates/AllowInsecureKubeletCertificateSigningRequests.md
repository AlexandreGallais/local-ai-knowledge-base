---
title: "AllowInsecureKubeletCertificateSigningRequests"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/AllowInsecureKubeletCertificateSigningRequests.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# AllowInsecureKubeletCertificateSigningRequests

Disable node admission validation of
CertificateSigningRequests
for kubelet signers. Unless you disable this feature gate, Kubernetes enforces that new
kubelet certificates have a `commonName` matching `system:node:$nodeName`.
