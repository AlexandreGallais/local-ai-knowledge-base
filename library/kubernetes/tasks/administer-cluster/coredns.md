---
title: "Using CoreDNS for Service Discovery"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/administer-cluster/coredns.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Using CoreDNS for Service Discovery

This page describes the CoreDNS upgrade process and how to install CoreDNS.

## About CoreDNS

CoreDNS is a flexible, extensible DNS server
that is the default implementation of Kubernetes cluster DNS.
Like Kubernetes, the CoreDNS project is hosted by the
CNCF.

## Installing CoreDNS

For manual deployment, see the documentation at the
CoreDNS website.

## Upgrading CoreDNS

You can check the version of CoreDNS that kubeadm installs for each version of
Kubernetes in the page
CoreDNS version in Kubernetes.

CoreDNS can be upgraded manually in case you want to only upgrade CoreDNS
or use your own custom image.
There is a helpful guideline and walkthrough
available to ensure a smooth upgrade.
Make sure the existing CoreDNS configuration ("Corefile") is retained when
upgrading your cluster.

If you are upgrading your cluster using the `kubeadm` tool, `kubeadm`
can take care of retaining the existing CoreDNS configuration automatically.

## Tuning CoreDNS

When resource utilisation is a concern, it may be useful to tune the
configuration of CoreDNS. For more details, check out the
documentation on scaling CoreDNS.

## What's next

You can configure CoreDNS to support many use cases beyond
basic <example-value> name resolution by modifying the CoreDNS configuration ("Corefile").
For more information, see the documentation
for the `kubernetes` CoreDNS plugin, or read the
Custom DNS Entries for Kubernetes.
in the CoreDNS blog.
