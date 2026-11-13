---
title: "Documentation Style Guide (part 1 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/contribute/style/style-guide.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Documentation Style Guide

This page gives writing style guidelines for the Kubernetes documentation.
These are guidelines, not rules. Use your best judgment, and feel free to
propose changes to this document in a pull request.

For additional information on creating new content for the Kubernetes
documentation, read the Documentation Content Guide.

Changes to the style guide are made by SIG Docs as a group. To propose a change
or addition, add it to the agenda for an upcoming
SIG Docs meeting, and attend the meeting to participate in the discussion.

Kubernetes documentation uses
Goldmark Markdown Renderer
with some adjustments along with a few
Hugo Shortcodes to support
glossary entries, tabs, and representing feature state.

## Language

Kubernetes documentation has been translated into multiple languages
(see Localization READMEs).

The way of localizing the docs for a different language is described in Localizing Kubernetes Documentation.

The English-language documentation uses U.S. English spelling and grammar.

[If you're localizing this page, you can omit the point about US English.]

## Documentation formatting standards

### Use upper camel case for API objects

When you refer specifically to interacting with an API object, use
UpperCamelCase, also known as
Pascal case. You may see different capitalization, such as "configMap",
in the API Reference. When writing
general documentation, it's better to use upper camel case, calling it "ConfigMap" instead.

When you are generally discussing an API object, use
sentence-style capitalization.

The following examples focus on capitalization. For more information about formatting
API object names, review the related guidance on Code Style.

Do | Don't
:--| :-----
The HorizontalPodAutoscaler resource is responsible for ... | The Horizontal pod autoscaler is responsible for ...
A PodList object is a list of pods. | A Pod List object is a list of pods.
The Volume object contains a `hostPath` field. | The volume object contains a hostPath field.
Every ConfigMap object is part of a namespace. | Every configMap object is part of a namespace.
For managing confidential data, consider using the Secret API. | For managing confidential data, consider using the secret API.

### Use angle brackets for placeholders

Use angle brackets for placeholders. Tell the reader what a placeholder
represents, for example:

Display information about a pod:

```shell
kubectl describe pod <pod-name> -n <namespace>
```

If the namespace of the pod is `default`, you can omit the '-n' parameter.

### Use bold for user interface elements

Do | Don't
:--| :-----
Click **Fork**. | Click "Fork".
Select **Other**. | Select "Other".

### Use italics to define or introduce new terms

Do | Don't
:--| :-----
A _cluster_ is a set of nodes ... | A "cluster" is a set of nodes ...
These components form the _control plane_. | These components form the **control plane**.

### Use code style for filenames, directories, and paths

Do | Don't
:--| :-----
Open the `envars.yaml` file. | Open the envars.yaml file.
Go to the `/docs/tutorials` directory. | Go to the /docs/tutorials directory.
Open the `/_data/concepts.yaml` file. | Open the /\_data/concepts.yaml file.

### Use the international standard for punctuation inside quotes

Do | Don't
:--| :-----
events are recorded with an associated "stage". | events are recorded with an associated "stage."
The copy is called a "fork". | The copy is called a "fork."

### Use start case for enhancement graduation phases

Do | Don't
:--| :-----
Dynamic Resource Allocation (DRA) is Beta. | Dynamic Resource Allocation (DRA) is beta.

## Inline code formatting

### Use code style for inline code, commands {#code-style-inline-code}

For inline code in an HTML document, use the `<code>` tag. In a Markdown
document, use the backtick (`` ` ``). However, API kinds such as StatefulSet
or ConfigMap are written verbatim (no backticks); this allows using possessive
apostrophes.

Do | Don't
:--| :-----
The `kubectl run` command creates a Pod. | The "kubectl run" command creates a Pod.
The kubelet on each node acquires a Lease… | The kubelet on each node acquires a `Lease`…
A PersistentVolume represents durable storage… | A `PersistentVolume` represents durable storage…
The CustomResourceDefinition's `.spec.group` field… | The `CustomResourceDefinition.spec.group` field…
For declarative management, use `kubectl apply`. | For declarative management, use "kubectl apply".
Enclose code samples with triple backticks. (\`\`\`)| Enclose code samples with any other syntax.
Use single backticks to enclose inline code. For example, `var example = true`. | Use two asterisks (`**`) or an underscore (`_`) to enclose inline code. For example, **var example = true**.
Use triple backticks before and after a multi-line block of code for fenced code blocks. | Use multi-line blocks of code to create diagrams, flowcharts, or other illustrations.
Use meaningful variable names that have a context. | Use variable names such as 'foo','bar', and 'baz' that are not meaningful and lack context.
Remove trailing spaces in the code. | Add trailing spaces in the code, where these are important, because the screen reader will read out the spaces as well.

The website supports syntax highlighting for code samples, but specifying a language
is optional. Syntax highlighting in the code block should conform to the
contrast guidelines.

### Use code style for object field names and namespaces

Do | Don't
:--| :-----
Set the value of the `replicas` field in the configuration file. | Set the value of the "replicas" field in the configuration file.
The value of the `exec` field is an ExecAction object. | The value of the "exec" field is an ExecAction object.
Run the process as a DaemonSet in the `kube-system` namespace. | Run the process as a DaemonSet in the kube-system namespace.

### Use code style for Kubernetes command tool and component names

Do | Don't
:--| :-----
The `kubelet` preserves node stability. | The kubelet preserves node stability.
The `kubectl` handles locating and authenticating to the API server. | The kubectl handles locating and authenticating to the apiserver.
Run the process with the certificate, `kube-apiserver --client-ca-file=FILENAME`. | Run the process with the certificate, kube-apiserver --client-ca-file=FILENAME. |

### Starting a sentence with a component tool or component name

Do | Don't
:--| :-----
The `kubeadm` tool bootstraps and provisions machines in a cluster. | `kubeadm` tool bootstraps and provisions machines in a cluster.
The kube-scheduler is the default scheduler for Kubernetes. | kube-scheduler is the default scheduler for Kubernetes.

### Use a general descriptor over a component name

Do | Don't
:--| :-----
The Kubernetes API server offers an OpenAPI spec. | The apiserver offers an OpenAPI spec.
Aggregated APIs are subordinate API servers. | Aggregated APIs are subordinate APIServers.

### Use normal style for string and integer field values

For field values of type string or integer, use normal style without quotation marks.

Do | Don't
:--| :-----
Set the value of `imagePullPolicy` to Always. | Set the value of `imagePullPolicy` to "Always".
Set the value of `image` to nginx:1.16. | Set the value of `image` to `nginx:1.16`.
Set the value of the `replicas` field to 2. | Set the value of the `replicas` field to `2`.

However, consider quoting values where there is a risk that readers might confuse the value
with an API kind.

## Referring to Kubernetes API resources

This section talks about how we reference API resources in the documentation.

### Clarification about "resource"

Kubernetes uses the word _resource_ to refer to API resources. For example,
the URL path `/apis/apps/v1/namespaces/default/deployments/my-app` represents a
Deployment named "my-app" in the "default"
namespace. In HTTP jargon,
namespace is a resource -
the same way that all web URLs identify a resource.

Kubernetes documentation also uses "resource" to talk about CPU and memory
requests and limits. It's very often a good idea to refer to API resources
as "API resources"; that helps to avoid confusion with CPU and memory resources,
or with other kinds of resource.

If you are using the lowercase plural form of a resource name, such as
`deployments` or `configmaps`, provide extra written context to help readers
understand what you mean. If you are using the term in a context where the
UpperCamelCase name could work too, and there is a risk of ambiguity,
consider using the API kind in UpperCamelCase.

### When to use Kubernetes API terminologies

The different Kubernetes API terminologies are:

- _API kinds_: the name used in the API URL (such as `pods`, `namespaces`).
  API kinds are sometimes also called _resource types_.
- _API resource_: a single instance of an API kind (such as `pod`, `secret`).
- _Object_: a resource that serves as a "record of intent". An object is a desired
  state for a specific part of your cluster, which the Kubernetes control plane tries to maintain.
  All objects in the Kubernetes API are also resources.

For clarity, you can add "resource" or "object" when referring to an API resource in Kubernetes
documentation.
An example: write "<example-value>" instead of "<example-value>".
If it is clear just from the capitalization, you don't need to add the extra word.

Consider rephrasing when that change helps avoid misunderstandings. A common situation is
when you want to start a sentence with an API kind, such as “Secret”; because English
and other languages capitalize at the start of sentences, readers cannot tell whether you
mean the API kind or the general concept. Rewording can help.

### API resource names

Always format API resource names using UpperCamelCase,
also known as PascalCase. Do not write API kinds with code formatting.

Don't split an API object name into separate words. For example, use PodTemplateList, not Pod Template List.

For more information about PascalCase and code formatting, review the related guidance on
Use upper camel case for API objects
and Use code style for inline code, commands, and API objects.

For more information about Kubernetes API terminologies, review the related
guidance on Kubernetes API terminology.

## Code snippet formatting

### Don't include the command prompt

Do | Don't
:--| :-----
`kubectl get pods` | `$ kubectl get pods`

### Separate commands from output

Verify that the pod is running on your chosen node:

```shell
kubectl get pods --output=wide
```

The output is similar to this:

```console
NAME     READY     STATUS    RESTARTS   AGE    IP           NODE
nginx    1/1       Running   0          13s    10.200.0.4   worker0
```

### Versioning Kubernetes examples

Code examples and configuration examples that include version information should
be consistent with the accompanying text.

If the information is version specific, the Kubernetes version needs to be defined
in the `prerequisites` section of the Task template
or the Tutorial template.
Once the page is saved, the `prerequisites` section is shown as **Before you begin**.

To specify the Kubernetes version for a task or tutorial page, include
`min-kubernetes-server-version` in the front matter of the page.

If the example YAML is in a standalone file, find and review the topics that include it as a reference.
Verify that any topics using the standalone YAML have the appropriate version information defined.
If a stand-alone YAML file is not referenced from any topics, consider deleting it instead of updating it.

For example, if you are writing a tutorial that is relevant to Kubernetes version 1.8,
the front-matter of your markdown file should look something like:

```yaml
---
title: <your tutorial title here>
min-kubernetes-server-version: v1.8
---
```

In code and configuration examples, do not include comments about alternative versions.
Be careful to not include incorrect statements in your examples as comments, such as:

```yaml
apiVersion: v1 # earlier versions use...
kind: Pod
...
```

## Formulae and equations

You can use the Docsy support for diagrams and formulae.

For example: `\\(\frac{7}{9} \sqrt{K^8 s}\\)`, which renders as \\(\frac{7}{9} \sqrt{K^8 s}\\).

Prefer inline formulae where reasonable, but you can use a `math` block if that's likely to help readers.

Read the Docsy guide to find out what you need to change in your page to activate support;
if you have problems, add `math: true` to the page front matter
(you can do this even if you think the automatic activation should be enough).

## Kubernetes.io word list

A list of Kubernetes-specific terms and words to be used consistently across the site.

Term | Usage
:--- | :----
Kubernetes | Kubernetes should always be capitalized.
Docker | Docker should always be capitalized.
SIG Docs | SIG Docs rather than SIG-DOCS or other variations.
On-premises | On-premises or On-prem rather than On-premise or other variations.
cloud native | Cloud native or cloud native as appropriate for sentence structure rather than cloud-native or Cloud Native.
open source | Open source or open source as appropriate for sentence structure rather than open-source or Open Source.
