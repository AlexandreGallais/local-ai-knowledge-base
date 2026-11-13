---
title: "Client Libraries"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/using-api/client-libraries.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Client Libraries

This page contains an overview of the client libraries for using the Kubernetes
API from various programming languages.

To write applications using the Kubernetes REST API,
you do not need to implement the API calls and request/response types yourself.
You can use a client library for the programming language you are using.

Client libraries often handle common tasks such as authentication for you.
Most client libraries can discover and use the Kubernetes Service Account to
authenticate if the API client is running inside the Kubernetes cluster, or can
understand the kubeconfig file
format to read the credentials and the API Server address.

## Officially-supported Kubernetes client libraries

The following client libraries are officially maintained by
Kubernetes SIG API Machinery.

| Language   | Client Library | Sample Programs |
|------------|----------------|-----------------|
| C          | github.com/kubernetes-client/c | browse
| dotnet     | github.com/kubernetes-client/csharp | browse
| Go         | github.com/kubernetes/client-go/ | browse
| Haskell    | github.com/kubernetes-client/haskell | browse
| Java       | github.com/kubernetes-client/java | browse
| JavaScript | github.com/kubernetes-client/javascript | browse
| Perl       | github.com/kubernetes-client/perl/ | browse
| Python     | github.com/kubernetes-client/python/ | browse
| Ruby       | github.com/kubernetes-client/ruby/ | browse

## Community-maintained client libraries

The following Kubernetes API client libraries are provided and maintained by
their authors, not the Kubernetes team.

| Language             | Client Library                           |
| -------------------- | ---------------------------------------- |
| Clojure              | github.com/yanatan16/clj-kubernetes-api |
| DotNet               | github.com/tonnyeremin/kubernetes_gen |
| DotNet (RestSharp)   | github.com/masroorhasan/Kubernetes.DotNet |
| Elixir               | github.com/obmarg/kazan |
| Elixir               | github.com/coryodaniel/k8s |
| Java (OSGi)          | bitbucket.org/amdatulabs/amdatu-kubernetes |
| Java (Fabric8, OSGi) | github.com/fabric8io/kubernetes-client |
| Java                 | github.com/manusa/yakc |
| Lisp                 | github.com/brendandburns/cl-k8s |
| Lisp                 | github.com/xh4/cube |
| Node.js (TypeScript) | github.com/Goyoo/node-k8s-client |
| Node.js              | github.com/ajpauwels/easy-k8s
| Node.js              | github.com/godaddy/kubernetes-client |
| Node.js              | github.com/tenxcloud/node-kubernetes-client |
| Perl                 | metacpan.org/pod/Net::Kubernetes |
| PHP                  | github.com/allansun/kubernetes-php-client |
| PHP                  | github.com/maclof/kubernetes-client |
| PHP                  | github.com/travisghansen/kubernetes-client-php |
| PHP                  | github.com/renoki-co/php-k8s |
| Python               | github.com/cloudcoil/cloudcoil |
| Python               | github.com/fiaas/k8s |
| Python               | github.com/gtsystem/lightkube |
| Python               | github.com/kr8s-org/kr8s |
| Python               | github.com/mnubo/kubernetes-py |
| Python               | github.com/puzl-cloud/kubesdk |
| Python               | github.com/tomplus/kubernetes_asyncio |
| Python               | github.com/Frankkkkk/pykorm |
| Ruby                 | github.com/abonas/kubeclient |
| Ruby                 | github.com/k8s-ruby/k8s-ruby |
| Ruby                 | github.com/kontena/k8s-client |
| Rust                 | github.com/kube-rs/kube |
| Rust                 | github.com/ynqa/kubernetes-rust |
| Scala                | github.com/hagay3/skuber |
| Scala                | github.com/hnaderi/scala-k8s |
| Scala                | github.com/joan38/kubernetes-client |
| Swift                | github.com/swiftkube/client |
