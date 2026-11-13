---
title: "Multi-tenancy (part 2 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/security/multi-tenancy.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Multi-tenancy (part 2 of 3)

## Data Plane Isolation

Data plane isolation ensures that pods and workloads for different tenants are sufficiently
isolated.

### Network isolation

By default, all pods in a Kubernetes cluster are allowed to communicate with each other, and all
network traffic is unencrypted. This can lead to security vulnerabilities where traffic is
accidentally or maliciously sent to an unintended destination, or is intercepted by a workload on
a compromised node.

Pod-to-pod communication can be controlled using Network Policies,
which restrict communication between pods using namespace labels or IP address ranges.
In a multi-tenant environment where strict network isolation between tenants is required, starting
with a default policy that denies communication between pods is recommended with another rule that
allows all pods to query the DNS server for name resolution. With such a default policy in place,
you can begin adding more permissive rules that allow for communication within a namespace.
It is also recommended not to use empty label selector '{}' for namespaceSelector field in network policy definition,
in case traffic need to be allowed between namespaces.
This scheme can be further refined as required. Note that this only applies to pods within a single
control plane; pods that belong to different virtual control planes cannot talk to each other via
Kubernetes networking.

Namespace management tools may simplify the creation of default or common network policies.
In addition, some of these tools allow you to enforce a consistent set of namespace labels across
your cluster, ensuring that they are a trusted basis for your policies.

**Warning:**
Network policies require a CNI plugin
that supports the implementation of network policies. Otherwise, NetworkPolicy resources will be ignored.

More advanced network isolation may be provided by service meshes, which provide OSI Layer 7
policies based on workload identity, in addition to namespaces. These higher-level policies can
make it easier to manage namespace-based multi-tenancy, especially when multiple namespaces are
dedicated to a single tenant. They frequently also offer encryption using mutual TLS, protecting
your data even in the presence of a compromised node, and work across dedicated or virtual clusters.
However, they can be significantly more complex to manage and may not be appropriate for all users.

### Storage isolation

Kubernetes offers several types of volumes that can be used as persistent storage for workloads.
For security and data-isolation, dynamic volume provisioning
is recommended and volume types that use node resources should be avoided.

StorageClasses allow you to describe custom "classes"
of storage offered by your cluster, based on quality-of-service levels, backup policies, or custom
policies determined by the cluster administrators.

Pods can request storage using a PersistentVolumeClaim.
A PersistentVolumeClaim is a namespaced resource, which enables isolating portions of the storage
system and dedicating it to tenants within the shared Kubernetes cluster.
However, it is important to note that a PersistentVolume is a cluster-wide resource and has a
lifecycle independent of workloads and namespaces.

For example, you can configure a separate StorageClass for each tenant and use this to strengthen isolation.
If a StorageClass is shared, you should set a reclaim policy of `Delete`
to ensure that a PersistentVolume cannot be reused across different namespaces.

### Sandboxing containers

Kubernetes pods are composed of one or more containers that execute on worker nodes.
Containers utilize OS-level virtualization and hence offer a weaker isolation boundary than
virtual machines that utilize hardware-based virtualization.

In a shared environment, unpatched vulnerabilities in the application and system layers can be
exploited by attackers for container breakouts and remote code execution that allow access to host
resources. In some applications, like a Content Management System (CMS), customers may be allowed
the ability to upload and execute untrusted scripts or code. In either case, mechanisms to further
isolate and protect workloads using strong isolation are desirable.

Sandboxing provides a way to isolate workloads running in a shared cluster. It typically involves
running each pod in a separate execution environment such as a virtual machine or a userspace
kernel. Sandboxing is often recommended when you are running untrusted code, where workloads are
assumed to be malicious. Part of the reason this type of isolation is necessary is because
containers are processes running on a shared kernel; they mount file systems like `/sys` and `/proc`
from the underlying host, making them less secure than an application that runs on a virtual
machine which has its own kernel. While controls such as seccomp, AppArmor, and SELinux can be
used to strengthen the security of containers, it is hard to apply a universal set of rules to all
workloads running in a shared cluster. Running workloads in a sandbox environment helps to
insulate the host from container escapes, where an attacker exploits a vulnerability to gain
access to the host system and all the processes/files running on that host.

Virtual machines and userspace kernels are two popular approaches to sandboxing.

### Node Isolation

Node isolation is another technique that you can use to isolate tenant workloads from each other.
With node isolation, a set of nodes is dedicated to running pods from a particular tenant and
co-mingling of tenant pods is prohibited. This configuration reduces the noisy tenant issue, as
all pods running on a node will belong to a single tenant. The risk of information disclosure is
slightly lower with node isolation because an attacker that manages to escape from a container
will only have access to the containers and volumes mounted to that node.

Although workloads from different tenants are running on different nodes, it is important to be
aware that the kubelet and (unless using virtual control planes) the API service are still shared
services. A skilled attacker could use the permissions assigned to the kubelet or other pods
running on the node to move laterally within the cluster and gain access to tenant workloads
running on other nodes. If this is a major concern, consider implementing compensating controls
such as seccomp, AppArmor or SELinux or explore using sandboxed containers or creating separate
clusters for each tenant.

Node isolation is a little easier to reason about from a billing standpoint than sandboxing
containers since you can charge back per node rather than per pod. It also has fewer compatibility
and performance issues and may be easier to implement than sandboxing containers.
For example, nodes for each tenant can be configured with taints so that only pods with the
corresponding toleration can run on them. A mutating webhook could then be used to automatically
add tolerations and node affinities to pods deployed into tenant namespaces so that they run on a
specific set of nodes designated for that tenant.

Node isolation can be implemented using pod node selectors.

## Additional Considerations

This section discusses other Kubernetes constructs and patterns that are relevant for multi-tenancy.

### API Priority and Fairness

API priority and fairness is a Kubernetes
feature that allows you to assign a priority to certain pods running within the cluster.
When an application calls the Kubernetes API, the API server evaluates the priority assigned to pod.
Calls from pods with higher priority are fulfilled before those with a lower priority.
When contention is high, lower priority calls can be queued until the server is less busy or you
can reject the requests.

Using API priority and fairness will not be very common in SaaS environments unless you are
allowing customers to run applications that interface with the Kubernetes API, for example,
a controller.

### Quality-of-Service (QoS) {#qos}

When you’re running a SaaS application, you may want the ability to offer different
Quality-of-Service (QoS) tiers of service to different tenants. For example, you may have freemium
service that comes with fewer performance guarantees and features and a for-fee service tier with
specific performance guarantees. Fortunately, there are several Kubernetes constructs that can
help you accomplish this within a shared cluster, including network QoS, storage classes, and pod
priority and preemption. The idea with each of these is to provide tenants with the quality of
service that they paid for. Let’s start by looking at networking QoS.

Typically, all pods on a node share a network interface. Without network QoS, some pods may
consume an unfair share of the available bandwidth at the expense of other pods.
The Kubernetes bandwidth plugin creates an
extended resource
for networking that allows you to use Kubernetes resources constructs, i.e. requests/limits, to
apply rate limits to pods by using Linux tc queues.
Be aware that the plugin is considered experimental as per the
Network Plugins
documentation and should be thoroughly tested before use in production environments.

For storage QoS, you will likely want to create different storage classes or profiles with
different performance characteristics. Each storage profile can be associated with a different
tier of service that is optimized for different workloads such IO, redundancy, or throughput.
Additional logic might be necessary to allow the tenant to associate the appropriate storage
profile with their workload.

Finally, there’s pod priority and preemption
where you can assign priority values to pods. When scheduling pods, the scheduler will try
evicting pods with lower priority when there are insufficient resources to schedule pods that are
assigned a higher priority. If you have a use case where tenants have different service tiers in a
shared cluster e.g. free and paid, you may want to give higher priority to certain tiers using
this feature.

### DNS

Kubernetes clusters include a Domain Name System (DNS) service to provide translations from names
to IP addresses, for all Services and Pods. By default, the Kubernetes DNS service allows lookups
across all namespaces in the cluster.

In multi-tenant environments where tenants can access pods and other Kubernetes resources, or where
stronger isolation is required, it may be necessary to prevent pods from looking up services in other
Namespaces.
You can restrict cross-namespace DNS lookups by configuring security rules for the DNS service.
For example, CoreDNS (the default DNS service for Kubernetes) can leverage Kubernetes metadata
to restrict queries to Pods and Services within a namespace. For more information, read an
example of
configuring this within the CoreDNS documentation.

When a Virtual Control Plane per tenant model is used, a DNS
service must be configured per tenant or a multi-tenant DNS service must be used.
Here is an example of a customized version of CoreDNS
that supports multiple tenants.

### Operators

Operators are Kubernetes controllers that manage
applications. Operators can simplify the management of multiple instances of an application, like
a database service, which makes them a common building block in the multi-consumer (SaaS)
multi-tenancy use case.

Operators used in a multi-tenant environment should follow a stricter set of guidelines.
Specifically, the Operator should:

* Support creating resources within different tenant namespaces, rather than just in the namespace
  in which the Operator is deployed.
* Ensure that the Pods are configured with resource requests and limits, to ensure scheduling and fairness.
* Support configuration of Pods for data-plane isolation techniques such as node isolation and
  sandboxed containers.
