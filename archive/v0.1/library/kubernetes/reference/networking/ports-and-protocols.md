---
title: "Ports and Protocols"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/networking/ports-and-protocols.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Ports and Protocols

When running Kubernetes in an environment with strict network boundaries, such
as on-premises datacenter with physical network firewalls or Virtual
Networks in Public Cloud, it is useful to be aware of the ports and protocols
used by Kubernetes components.

## Control plane

| Protocol | Direction | Port Range | Purpose                 | Used By                   |
|----------|-----------|------------|-------------------------|---------------------------|
| TCP      | Inbound   | 6443       | Kubernetes API server   | All                       |
| TCP      | Inbound   | 2379-2380  | etcd server client API  | kube-apiserver, etcd      |
| TCP      | Inbound   | 10250      | Kubelet API             | Self, Control plane       |
| TCP      | Inbound   | 10259      | kube-scheduler          | Self                      |
| TCP      | Inbound   | 10257      | kube-controller-manager | Self                      |

Although etcd ports are included in control plane section, you can also host your own
etcd cluster externally or on custom ports.

## Worker node(s) {#node}

| Protocol | Direction | Port Range  | Purpose               | Used By                 |
|----------|-----------|-------------|-----------------------|-------------------------|
| TCP      | Inbound   | 10250       | Kubelet API           | Self, Control plane     |
| TCP      | Inbound   | 10256       | kube-proxy            | Self, Load balancers    |
| TCP      | Inbound   | 30000-32767 | NodePort Services†    | All                     |
| UDP      | Inbound   | 30000-32767 | NodePort Services†    | All                     |

† Default port range for NodePort Services.

All default port numbers can be overridden. When custom ports are used those
ports need to be open instead of defaults mentioned here.

One common example is API server port that is sometimes switched
to 443. Alternatively, the default port is kept as is and API server is put
behind a load balancer that listens on 443 and routes the requests to API server
on the default port.
