---
title: "ServerAddressByClientCIDR"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/definitions/server-address-by-client-cidr-v1-meta.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# ServerAddressByClientCIDR

`apiVersion: meta/v1`

`import "k8s.io/apimachinery/pkg/apis/meta/v1"`

## ServerAddressByClientCIDR {#ServerAddressByClientCIDR}

ServerAddressByClientCIDR helps the client to determine the server address that they should use, depending on the clientCIDR that they match.

   | Field | Description

       | `clientCIDR` *string
       | The CIDR with which clients can match their IP to figure out the server address that they should use.

       | `serverAddress` *string
       | Address of this server, suitable for a client that matches the above CIDR. This can be a hostname, hostname:port, IP or IP:port.
