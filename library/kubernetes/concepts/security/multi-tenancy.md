---
title: "Multi-tenancy (part 1 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/security/multi-tenancy.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Multi-tenancy

This page provides an overview of available configuration options and best practices for cluster
multi-tenancy.

Sharing clusters saves costs and simplifies administration. However, sharing clusters also
presents challenges such as security, fairness, and managing _noisy neighbors_.

Clusters can be shared in many ways. In some cases, different applications may run in the same
cluster. In other cases, multiple instances of the same application may run in the same cluster,
one for each end user. All these types of sharing are frequently described using the umbrella term
_multi-tenancy_.

While Kubernetes does not have first-class concepts of end users or tenants, it provides several
features to help manage different tenancy requirements. These are discussed below.

## Use cases

The first step to determining how to share your cluster is understanding your use case, so you can
evaluate the patterns and tools available. In general, multi-tenancy in Kubernetes clusters falls
into two broad categories, though many variations and hybrids are also possible.

### Multiple teams

A common form of multi-tenancy is to share a cluster between multiple teams within an
organization, each of whom may operate one or more workloads. These workloads frequently need to
communicate with each other, and with other workloads located on the same or different clusters.

In this scenario, members of the teams often have direct access to Kubernetes resources via tools
such as `kubectl`, or indirect access through GitOps controllers or other types of release
automation tools. There is often some level of trust between members of different teams, but
Kubernetes policies such as RBAC, quotas, and network policies are essential to safely and fairly
share clusters.

### Multiple customers

The other major form of multi-tenancy frequently involves a Software-as-a-Service (SaaS) vendor
running multiple instances of a workload for customers. This business model is so strongly
associated with this deployment style that many people call it "SaaS tenancy." However, a better
term might be "multi-customer tenancy," since SaaS vendors may also use other deployment models,
and this deployment model can also be used outside of SaaS.

In this scenario, the customers do not have access to the cluster; Kubernetes is invisible from
their perspective and is only used by the vendor to manage the workloads. Cost optimization is
frequently a critical concern, and Kubernetes policies are used to ensure that the workloads are
strongly isolated from each other.

## Terminology

### Tenants

When discussing multi-tenancy in Kubernetes, there is no single definition for a "tenant".
Rather, the definition of a tenant will vary depending on whether multi-team or multi-customer
tenancy is being discussed.

In multi-team usage, a tenant is typically a team, where each team typically deploys a small
number of workloads that scales with the complexity of the service. However, the definition of
"team" may itself be fuzzy, as teams may be organized into higher-level divisions or subdivided
into smaller teams.

By contrast, if each team deploys dedicated workloads for each new client, they are using a
multi-customer model of tenancy. In this case, a "tenant" is simply a group of users who share a
single workload. This may be as large as an entire company, or as small as a single team at that
company.

In many cases, the same organization may use both definitions of "tenants" in different contexts.
For example, a platform team may offer shared services such as security tools and databases to
multiple internal “customers” and a SaaS vendor may also have multiple teams sharing a development
cluster. Finally, hybrid architectures are also possible, such as a SaaS provider using a
combination of per-customer workloads for sensitive data, combined with multi-tenant shared
services.

### Isolation

There are several ways to design and build multi-tenant solutions with Kubernetes. Each of these
methods comes with its own set of tradeoffs that impact the isolation level, implementation
effort, operational complexity, and cost of service.

A Kubernetes cluster consists of a control plane which runs Kubernetes software, and a data plane
consisting of worker nodes where tenant workloads are executed as pods. Tenant isolation can be
applied in both the control plane and the data plane based on organizational requirements.

The level of isolation offered is sometimes described using terms like “hard” multi-tenancy, which
implies strong isolation, and “soft” multi-tenancy, which implies weaker isolation. In particular,
"hard" multi-tenancy is often used to describe cases where the tenants do not trust each other,
often from security and resource sharing perspectives (e.g. guarding against attacks such as data
exfiltration or DoS). Since data planes typically have much larger attack surfaces, "hard"
multi-tenancy often requires extra attention to isolating the data-plane, though control plane
isolation  also remains critical.

However, the terms "hard" and "soft" can often be confusing, as there is no single definition that
will apply to all users. Rather, "hardness" or "softness" is better understood as a broad
spectrum, with many different techniques that can be used to maintain different types of isolation
in your clusters, based on your requirements.

In more extreme cases, it may be easier or necessary to forgo any cluster-level sharing at all and
assign each tenant their dedicated cluster, possibly even running on dedicated hardware if VMs are
not considered an adequate security boundary. This may be easier with managed Kubernetes clusters,
where the overhead of creating and operating clusters is at least somewhat taken on by a cloud
provider. The benefit of stronger tenant isolation must be evaluated against the cost and
complexity of managing multiple clusters. The Multi-cluster SIG
is responsible for addressing these types of use cases.

The remainder of this page focuses on isolation techniques used for shared Kubernetes clusters.
However, even if you are considering dedicated clusters, it may be valuable to review these
recommendations, as it will give you the flexibility to shift to shared clusters in the future if
your needs or capabilities change.

## Control plane isolation

Control plane isolation ensures that different tenants cannot access or affect each others'
Kubernetes API resources.

### Namespaces

In Kubernetes, a Namespace provides a
mechanism for isolating groups of API resources within a single cluster. This isolation has two
key dimensions:

1. Object names within a namespace can overlap with names in other namespaces, similar to files in
   folders. This allows tenants to name their resources without having to consider what other
   tenants are doing.

2. Many Kubernetes security policies are scoped to namespaces. For example, RBAC Roles and Network
   Policies are namespace-scoped resources. Using RBAC, Users and Service Accounts can be
   restricted to a namespace.

In a multi-tenant environment, a Namespace helps segment a tenant's workload into a logical and
distinct management unit. In fact, a common practice is to isolate every workload in its own
namespace, even if multiple workloads are operated by the same tenant. This ensures that each
workload has its own identity and can be configured with an appropriate security policy.

The namespace isolation model requires configuration of several other Kubernetes resources,
networking plugins, and adherence to security best practices to properly isolate tenant workloads.
These considerations are discussed below.

### Access controls

The most important type of isolation for the control plane is authorization. If teams or their
workloads can access or modify each others' API resources, they can change or disable all other
types of policies thereby negating any protection those policies may offer. As a result, it is
critical to ensure that each tenant has the appropriate access to only the namespaces they need,
and no more. This is known as the "Principle of Least Privilege."

Role-based access control (RBAC) is commonly used to enforce authorization in the Kubernetes
control plane, for both users and workloads (service accounts).
Roles and
RoleBindings are
Kubernetes objects that are used at a namespace level to enforce access control in your
application; similar objects exist for authorizing access to cluster-level objects, though these
are less useful for multi-tenant clusters.

In a multi-team environment, RBAC must be used to restrict tenants' access to the appropriate
namespaces, and ensure that cluster-wide resources can only be accessed or modified by privileged
users such as cluster administrators.

If a policy ends up granting a user more permissions than they need, this is likely a signal that
the namespace containing the affected resources should be refactored into finer-grained
namespaces. Namespace management tools may simplify the management of these finer-grained
namespaces by applying common RBAC policies to different namespaces, while still allowing
fine-grained policies where necessary.

### Quotas

Kubernetes workloads consume node resources, like CPU and memory.  In a multi-tenant environment,
you can use Resource Quotas to manage resource usage of
tenant workloads.  For the multiple teams use case, where tenants have access to the Kubernetes
API, you can use resource quotas to limit the number of API resources (for example: the number of
Pods, or the number of ConfigMaps) that a tenant can create. Limits on object count ensure
fairness and aim to avoid _noisy neighbor_ issues from affecting other tenants that share a
control plane.

Resource quotas are namespaced objects. By mapping tenants to namespaces, cluster admins can use
quotas to ensure that a tenant cannot monopolize a cluster's resources or overwhelm its control
plane. Namespace management tools simplify the administration of quotas. In addition, while
Kubernetes quotas only apply within a single namespace, some namespace management tools allow
groups of namespaces to share quotas, giving administrators far more flexibility with less effort
than built-in quotas.

Quotas prevent a single tenant from consuming greater than their allocated share of resources
hence minimizing the “noisy neighbor” issue, where one tenant negatively impacts the performance
of other tenants' workloads.

When you apply a quota to namespace, Kubernetes requires you to also specify resource requests and
limits for each container. Limits are the upper bound for the amount of resources that a container
can consume. Containers that attempt to consume resources that exceed the configured limits will
either be throttled or killed, based on the resource type. When resource requests are set lower
than limits, each container is guaranteed the requested amount but there may still be some
potential for impact across workloads.

Quotas cannot protect against all kinds of resource sharing, such as network traffic.
Node isolation (described below) may be a better solution for this problem.
