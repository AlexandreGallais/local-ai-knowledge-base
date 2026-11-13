---
title: "Reference"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/_index.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Reference

This section of the Kubernetes documentation contains references.

## API Reference

* Glossary -  a comprehensive, standardized list of Kubernetes terminology

* Kubernetes API Reference
* One-page API Reference for Kubernetes
* Using The Kubernetes API - overview of the API for Kubernetes.
* API access control - details on how Kubernetes controls API access
* Well-Known Labels, Annotations and Taints

## Officially supported client libraries

To call the Kubernetes API from a programming language, you can use
client libraries. Officially supported
client libraries:

- Kubernetes Go client library
- Kubernetes Python client library
- Kubernetes Java client library
- Kubernetes JavaScript client library
- Kubernetes C# client library
- Kubernetes Haskell client library

## CLI

* kubectl - Main CLI tool for running commands and managing Kubernetes clusters.
  * JSONPath - Syntax guide for using JSONPath expressions with kubectl.
* kubeadm - CLI tool to easily provision a secure Kubernetes cluster.

## Components

* kubelet - The
  primary agent that runs on each node. The kubelet takes a set of PodSpecs
  and ensures that the described containers are running and healthy.
* kube-apiserver -
  REST API that validates and configures data for API objects such as  pods,
  services, replication controllers.
* kube-controller-manager -
  Daemon that embeds the core control loops shipped with Kubernetes.
* kube-proxy - Can
  do simple TCP/UDP stream forwarding or round-robin TCP/UDP forwarding across
  a set of back-ends.
* kube-scheduler -
  Scheduler that manages availability, performance, and capacity.

  * Scheduler Policies
  * Scheduler Profiles

* List of ports and protocols that
  should be open on control plane and worker nodes

## Config APIs

This section hosts the documentation for "unpublished" APIs which are used to
configure  kubernetes components or tools. Most of these APIs are not exposed
by the API server in a RESTful way though they are essential for a user or an
operator to use or manage a cluster.

* kubeconfig (v1)
* kuberc (v1alpha1) and
  kuberc (v1beta1)
* kube-apiserver admission (v1)
  - `admission.k8s.io/v1`
    - AdmissionReview
* kube-apiserver configuration (v1alpha1) and
  - `apiserver.k8s.io/v1`
    - AdmissionConfiguration
    - AuthenticationConfiguration
    - AuthorizationConfiguration
    - EgressSelectorConfiguration
    - TracingConfiguration

* kube-apiserver configuration (v1beta1)
  - `apiserver.k8s.io/v1beta1`
    - AuthenticationConfiguration
    - AuthorizationConfiguration
    - EgressSelectorConfiguration
    - TracingConfiguration

* kube-apiserver configuration (v1)
  - `apiserver.config.k8s.io/v1`
    - AdmissionConfiguration
    - AuthenticationConfiguration
    - AuthorizationConfiguration
    - EncryptionConfiguration
    - TracingConfiguration
* kube-apiserver event rate limit (v1alpha1)
  - `eventratelimit.admission.k8s.io/v1alpha1`
    - Configuration
* kubelet configuration (v1alpha1)
  - `kubelet.config.k8s.io/v1alpha1`
    - CredentialProviderConfig
    - ImagePullIntent
    - ImagePulledRecord
* kubelet configuration (v1beta1)
  - `kubelet.config.k8s.io/v1beta1`
    - CredentialProviderConfig
    - KubeletConfiguration
    - SerializedNodeConfigSource
* kubelet configuration (v1)
  - `kubelet.config.k8s.io/v1`
    - CredentialProviderConfig
* kubelet credential <example-value> (v1)
  - `credentialprovider.kubelet.k8s.io/v1`
    - CredentialProviderRequest
    - CredentialProviderResponse
* kube-scheduler configuration (v1)
  - `kubescheduler.config.k8s.io/v1`
    - DefaultPreemptionArgs
    - DynamicResourcesArgs
    - InterPodAffinityArgs
    - KubeSchedulerConfiguration
    - NodeAffinityArgs
    - NodeResourcesBalancedAllocationArgs
    - NodeResourcesFitArgs
    - PodTopologySpreadArgs
    - VolumeBindingArgs
* kube-controller-manager configuration (v1alpha1)
  - `kubecontrollermanager.config.k8s.io/v1alpha1`
    - LeaderMigrationConfiguration
    - KubeControllerManagerConfiguration
  - `cloudcontrollermanager.config.k8s.io/v1alpha1`
    - CloudControllerManagerConfiguration
* kube-proxy configuration (v1alpha1)
  - `kubeproxy.config.k8s.io/v1alpha1`
    - KubeProxyConfiguration
* `audit.k8s.io/v1` API
  - `audit.k8s.io/v1`
    - Event
    - EventList
    - Policy
    - PolicyList
* Client authentication API (v1beta1)
  - `client.authentication.k8s.io/v1beta1`
     - ExecCredential
* Client authentication API (v1)
  - `client.authentication.k8s.io/v1`
     - ExecCredential
* WebhookAdmission configuration (v1)
  - `apiserver.config.k8s.io/v1`
    - WebhookAdmission
* ImagePolicy API (v1alpha1)
  - `imagepolicy.k8s.io/v1alpha1`
    - ImageReview

## Config API for kubeadm

* v1beta3
* v1beta4

## External APIs

These are the APIs defined by the Kubernetes project, but are not implemented
by the core project:

* Metrics API (v1beta1)
* Custom Metrics API (v1beta2)
* External Metrics API (v1beta1)

## Design Docs

An archive of the design docs for Kubernetes functionality. Good starting points are
Kubernetes Architecture and
Kubernetes Design Overview.

## Encodings

Tools such as kubectl
can work with different formats / encodings. These include:

* CBOR, used on the network but **not** available as a kubectl output format
  * See CBOR resource encoding
* JSON, available as a `kubectl` output format and also used at the HTTP layer
* KYAML, a Kubernetes dialect of YAML
  * KYAML is essentially an _output format_; any place where you can provide KYAML to Kubernetes, you can also provide any other valid YAML input
* YAML, available as a `kubectl` output format and also used at the HTTP layer

Kubernetes also has a custom protobuf encoding that is only used within HTTP messages.

The `kubectl` tool supports some other output formats, such as _custom columns_;
see output formats in the kubectl reference.
