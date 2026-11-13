---
title: "Custom Resources (part 1 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/extend-kubernetes/api-extension/custom-resources.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Custom Resources

*Custom resources* are instances of resource types added to Kubernetes through API extensions. This page discusses when to add a custom
resource to your Kubernetes cluster and when to use a standalone service. It describes the two
methods for adding custom resources and how to choose between them.

## Custom resources

A *resource* is an endpoint in the Kubernetes API that
stores a collection of API objects
of a certain kind; for example, the built-in *pods* resource contains a collection of Pod objects.

A *custom resource* is an extension of the Kubernetes API that is not necessarily available in a default
Kubernetes installation. It represents a customization of a particular Kubernetes installation. However,
many core Kubernetes functions are now built using custom resources, making Kubernetes more modular.

Custom resources can appear and disappear in a running cluster through dynamic registration,
and cluster admins can update custom resources independently of the cluster itself.
Once a custom resource is installed, users can create and access its objects using
kubectl, just as they do for built-in resources
like *Pods*.

## Custom controllers

On their own, custom resources let you store and retrieve structured data.
When you combine a custom resource with a *custom controller*, custom resources
provide a true _declarative API_.

The Kubernetes declarative API
enforces a separation of responsibilities. You declare the desired state of
your resource. The Kubernetes controller keeps the current state of Kubernetes
objects in sync with your declared desired state. This is in contrast to an
imperative API, where you *instruct* a server what to do.

You can deploy and update a custom controller on a running cluster, independently
of the cluster's lifecycle. Custom controllers can work with any kind of resource,
but they are especially effective when combined with custom resources. The
Operator pattern combines custom
resources and custom controllers. You can use custom controllers to encode domain knowledge
for specific applications into an extension of the Kubernetes API.

## Should I add a custom resource to my Kubernetes cluster?

When creating a new API, consider whether to
aggregate your API with the Kubernetes cluster APIs
or let your API stand alone.

| Consider API aggregation if: | Prefer a stand-alone API if: |
| ---------------------------- | ---------------------------- |
| Your API is Declarative. | Your API does not fit the Declarative model. |
| You want your new types to be readable and writable using `kubectl`.| `kubectl` support is not required |
| You want to view your new types in a Kubernetes UI, such as dashboard, alongside built-in types. | Kubernetes UI support is not required. |
| You are developing a new API. | You already have a program that serves your API and works well. |
| You are willing to accept the format restriction that Kubernetes puts on REST resource paths, such as API Groups and Namespaces. (See the API Overview.) | You need to have specific REST paths to be compatible with an already defined REST API. |
| Your resources are naturally scoped to a cluster or namespaces of a cluster. | Cluster or namespace scoped resources are a poor fit; you need control over the specifics of resource paths. |
| You want to reuse Kubernetes API support features.  | You don't need those features. |

### Declarative APIs

In a Declarative API, typically:

- Your API consists of a relatively small number of relatively small objects (resources).
- The objects define configuration of applications or infrastructure.
- The objects are updated relatively infrequently.
- Humans often need to read and write the objects.
- The main operations on the objects are CRUD-y (creating, reading, updating and deleting).
- Transactions across objects are not required: the API represents a desired state, not an exact state.

Imperative APIs are not declarative.
Signs that your API might not be declarative include:

- The client says "do this", and then gets a synchronous response back when it is done.
- The client says "do this", and then gets an operation ID back, and has to check a separate
  Operation object to determine completion of the request.
- You talk about Remote Procedure Calls (RPCs).
- Directly storing large amounts of data; for example, > a few kB per object, or > 1000s of objects.
- High bandwidth access (10s of requests per second sustained) needed.
- Store end-user data (such as images, PII, etc.) or other large-scale data processed by applications.
- The natural operations on the objects are not CRUD-y.
- The API is not easily modeled as objects.
- You chose to represent pending operations with an operation ID or an operation object.

## Should I use a ConfigMap or a custom resource?

Use a ConfigMap if any of the following apply:

* There is an existing, well-documented configuration file format, such as a `mysql.cnf` or
  `pom.xml`.
* You want to put the entire configuration into one key of a ConfigMap.
* The main use of the configuration file is for a program running in a Pod on your cluster to
  consume the file to configure itself.
* Consumers of the file prefer to consume via file in a Pod or environment variable in a pod,
  rather than the Kubernetes API.
* You want to perform rolling updates via Deployment, etc., when the file is updated.

**Note:**
Use a Secret for sensitive data, which is similar
to a ConfigMap but more secure.

Use a custom resource (CRD or Aggregated API) if most of the following apply:

* You want to use Kubernetes client libraries and CLIs to create and update the new resource.
* You want top-level support from `kubectl`; for example, `kubectl get my-object object-name`.
* You want to build new automation that watches for updates on the new object, and then CRUD other
  objects, or vice versa.
* You want to write automation that handles updates to the object.
* You want to use Kubernetes API conventions like `.spec`, `.status`, and `.metadata`.
* You want the object to be an abstraction over a collection of controlled resources, or a
  summarization of other resources.

## Adding custom resources

Kubernetes provides two ways to add custom resources to your cluster:

- CRDs are simple and can be created without any programming.
- API Aggregation
  requires programming, but allows more control over API behaviors like how data is stored and
  conversion between API versions.

Kubernetes provides these two options to meet the needs of different users, so that neither ease
of use nor flexibility is compromised.

Aggregated APIs are subordinate API servers that sit behind the primary API server, which acts as
a proxy. This arrangement is called API Aggregation(AA).
To users, the Kubernetes API appears extended.

CRDs allow users to create new types of resources without adding another API server. You do not
need to understand API Aggregation to use CRDs.

Regardless of how they are installed, the new resources are referred to as Custom Resources to
distinguish them from built-in Kubernetes resources (like pods).

**Note:**
Avoid using a Custom Resource as data storage for application, end user, or monitoring data:
architecture designs that store application data within the Kubernetes API typically represent
a design that is too closely coupled.

Architecturally, cloud native application architectures
favor loose coupling between components. If part of your workload requires a backing service for
its routine operation, run that backing service as a component or consume it as an external service.
This way, your workload does not rely on the Kubernetes API for its normal operation.

## CustomResourceDefinitions

The CustomResourceDefinition
API resource allows you to define custom resources.
Defining a CRD object creates a new custom resource with a name and schema that you specify.
The Kubernetes API serves and handles the storage of your custom resource.
The name of the CRD object itself must be a valid
DNS subdomain name derived from the defined resource name and its API group; see how to create a CRD for more details.
Further, the name of an object whose kind/resource is defined by a CRD must also be a valid DNS subdomain name.

This frees you from writing your own API server to handle the custom resource,
but the generic nature of the implementation means you have less flexibility than with
API server aggregation.

Refer to the custom controller example
for an example of how to register a new custom resource, work with instances of your new resource type,
and use a controller to handle events.

## API server aggregation

Usually, each resource in the Kubernetes API requires code that handles REST requests and manages
persistent storage of objects. The main Kubernetes API server handles built-in resources like
*pods* and *services*, and can also generically handle custom resources through
CRDs.

The aggregation layer
allows you to provide specialized implementations for your custom resources by writing and
deploying your own API server.
The main API server delegates requests to your API server for the custom resources that you handle,
making them available to all of its clients.
