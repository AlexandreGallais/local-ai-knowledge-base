---
title: "Virtual IPs and Service Proxies (part 1 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/networking/virtual-ips.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Virtual IPs and Service Proxies

Every node in a Kubernetes
cluster runs a
kube-proxy
(unless you have deployed your own alternative component in place of `kube-proxy`).

The `kube-proxy` component is responsible for implementing a _virtual IP_
mechanism for Services
of `type` other than
`ExternalName`.
Each instance of kube-proxy watches the Kubernetes
control plane
for the addition and removal of Service and EndpointSlice
objects. For each Service, kube-proxy
calls appropriate APIs (depending on the kube-proxy mode) to configure
the node to capture traffic to the Service's `clusterIP` and `port`,
and redirect that traffic to one of the Service's endpoints
(usually a Pod, but possibly an arbitrary user-provided IP address). A control
loop ensures that the rules on each node are reliably synchronized with
the Service and EndpointSlice state as indicated by the API server.

A question that pops up every now and then is why Kubernetes relies on
proxying to forward inbound traffic to backends. What about other
approaches? For example, would it be possible to configure DNS records that
have multiple A values (or AAAA for IPv6), and rely on round-robin name
resolution?

There are a few reasons for using proxying for Services:

* There is a long history of DNS implementations not respecting record TTLs,
  and caching the results of name lookups after they should have expired.
* Some apps do DNS lookups only once and cache the results indefinitely.
* Even if apps and libraries did proper re-resolution, the low or zero TTLs
  on the DNS records could impose a high load on DNS that then becomes
  difficult to manage.

Later in this page you can read about how various kube-proxy implementations work.
Overall, you should note that, when running `kube-proxy`, kernel level rules may be modified
(for example, iptables rules might get created), which won't get cleaned up, in some
cases until you reboot. Thus, running kube-proxy is something that should only be done
by an administrator who understands the consequences of having a low level, privileged
network proxying service on a computer. Although the `kube-proxy` executable supports a
`cleanup` function, this function is not an official feature and thus is only available
to use as-is.

Some of the details in this reference refer to an example: the backend
Pods for a stateless
image-processing workloads, running with
three replicas. Those replicas are
fungible—frontends do not care which backend they use. While the actual Pods that
compose the backend set may change, the frontend clients should not need to be aware of that,
nor should they need to keep track of the set of backends themselves.
