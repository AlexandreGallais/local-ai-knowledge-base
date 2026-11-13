---
title: "GroupVersionForDiscovery"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/definitions/group-version-for-discovery-v1-meta.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# GroupVersionForDiscovery

`apiVersion: meta/v1`

`import "k8s.io/apimachinery/pkg/apis/meta/v1"`

## GroupVersionForDiscovery {#GroupVersionForDiscovery}

GroupVersion contains the &#34;group/version&#34; and &#34;version&#34; string of a version. It is made a struct to keep extensibility.

   | Field | Description

       | `groupVersion` *string
       | groupVersion specifies the API group and version in the form "group/version"

       | `version` *string
       | version specifies the version in the form of "version". This is to save the clients the trouble of splitting the GroupVersion.
