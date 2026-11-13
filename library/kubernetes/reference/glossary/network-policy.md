---
title: "Network Policy"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/glossary/network-policy.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Network Policy

A specification of how groups of Pods are allowed to communicate with each other and with other network endpoints.

NetworkPolicies help you declaratively configure which Pods are allowed to connect to each other, which namespaces are allowed to communicate,
and more specifically which port numbers to enforce each policy on. NetworkPolicy objects use labels
to select Pods and define rules which specify what traffic is allowed to the selected Pods.

NetworkPolicies are implemented by a supported network plugin provided by a network provider.
Be aware that creating a NetworkPolicy object without a controller to implement it will have no effect.
