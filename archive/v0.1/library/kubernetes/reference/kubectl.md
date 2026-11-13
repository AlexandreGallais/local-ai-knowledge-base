---
title: "Command line tool (kubectl) (part 1 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubectl/_index.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

This tool is named `kubectl`.

For configuration, `kubectl` looks for a file named `config` in the `$HOME/.kube` directory.
You can specify other kubeconfig
files by setting the `KUBECONFIG` environment variable or by setting the
`--kubeconfig` flag.

This overview covers `kubectl` syntax, describes the command operations, and provides common examples.
For details about each command, including all the supported flags and subcommands, see the
kubectl reference documentation.

For an overview, see The kubectl command-line tool.
For installation instructions, see Installing kubectl;
for a quick guide, see the cheat sheet.
If you're used to using the `docker` command-line tool,
`kubectl` for Docker Users explains some equivalent commands for Kubernetes.

## Syntax

Use the following syntax to run `kubectl` commands from your terminal window:

```shell
kubectl [command] [TYPE] [NAME] [flags]
```

where `command`, `TYPE`, `NAME`, and `flags` are:

* `command`: Specifies the operation that you want to perform on one or more resources,
  for example `create`, `get`, `describe`, `delete`.

* `TYPE`: Specifies the resource type. Resource types are case-insensitive and
  you can specify the singular, plural, or abbreviated forms.
  For example, the following commands produce the same output:

  ```shell
  kubectl get pod pod1
  kubectl get pods pod1
  kubectl get po pod1
  ```

* `NAME`: Specifies the name of the resource. Names are case-sensitive. If the name is omitted,
  details for all resources are displayed, for example `kubectl get pods`.

  When performing an operation on multiple resources, you can specify each resource by
  type and name or specify one or more files:

  * To specify resources by type and name:

    * To group resources if they are all the same type:  `TYPE1 name1 name2 name<#>`.
      Example: `kubectl get pod example-pod1 example-pod2`

    * To specify multiple resource types individually:  `TYPE1/name1 TYPE1/name2 TYPE2/name3 TYPE<#>/name<#>`.
      Example: `kubectl get pod/example-pod1 replicationcontroller/example-rc1`

  * To specify resources with one or more files:  `-f file1 -f file2 -f file<#>`

    * Use YAML rather than JSON
      since YAML tends to be more user-friendly, especially for configuration files.
      Example: `kubectl get -f ./pod.yaml`

* `flags`: Specifies optional flags. For example, you can use the `-s` or `--server` flags
  to specify the address and port of the Kubernetes API server.

**Caution:**
Flags that you specify from the command line override default values and any corresponding environment variables.

If you need help, run `kubectl help` from the terminal window.

## In-cluster authentication and namespace overrides

By default `kubectl` will first determine if it is running within a pod, and thus in a cluster.
It starts by checking for the `KUBERNETES_SERVICE_HOST` and `KUBERNETES_SERVICE_PORT` environment
variables and the existence of a service account token file at `/var/run/secrets/kubernetes.io/serviceaccount/token`.
If all three are found in-cluster authentication is assumed.

To maintain backwards compatibility, if the `POD_NAMESPACE` environment variable is set
during in-cluster authentication it will override the default namespace from the
service account token. Any manifests or tools relying on namespace defaulting will be affected by this.

**`POD_NAMESPACE` environment variable**

If the `POD_NAMESPACE` environment variable is set, cli operations on namespaced resources
will default to the variable value. For example, if the variable is set to `seattle`,
`kubectl get pods` would return pods in the `seattle` namespace. This is because pods are
a namespaced resource, and no namespace was provided in the command. Review the output
of `kubectl api-resources` to determine if a resource is namespaced.

Explicit use of `--namespace <value>` overrides this behavior.

**How kubectl handles ServiceAccount tokens**

If:

* there is Kubernetes service account token file mounted at
  `/var/run/secrets/kubernetes.io/serviceaccount/token`, and
* the `KUBERNETES_SERVICE_HOST` environment variable is set, and
* the `KUBERNETES_SERVICE_PORT` environment variable is set, and
* you don't explicitly specify a namespace on the kubectl command line

then kubectl assumes it is running in your cluster. The kubectl tool looks up the
namespace of that ServiceAccount (this is the same as the namespace of the Pod)
and acts against that namespace. This is different from what happens outside of a
cluster; when kubectl runs outside a cluster and you don't specify a namespace,
the kubectl command acts against the namespace set for the current context in your
client configuration. To change the default namespace for your kubectl you can use the
following command:

```shell
kubectl config set-context --current --namespace=<namespace-name>
```

## Operations

The following table includes short descriptions and the general syntax for all of the `kubectl` operations:

Operation       | Syntax    |       Description
-------------------- | -------------------- | --------------------
`alpha`    | `kubectl alpha SUBCOMMAND [flags]` | List the available commands that correspond to alpha features, which are not enabled in Kubernetes clusters by default.
`annotate`    | `kubectl annotate (-f FILENAME &#124; TYPE NAME &#124; TYPE/NAME) KEY_1=VAL_1 ... KEY_N=VAL_N [--overwrite] [--all] [--resource-version=version] [flags]` | Add or update the annotations of one or more resources.
`api-resources`    | `kubectl api-resources [flags]` | List the API resources that are available.
`api-versions`    | `kubectl api-versions [flags]` | List the API versions that are available.
`apply`            | `kubectl apply -f FILENAME [flags]`| Apply a configuration change to a resource from a file or stdin.
`attach`        | `kubectl attach POD -c CONTAINER [-i] [-t] [flags]` | Attach to a running container either to view the output stream or interact with the container (stdin).
`auth`    | `kubectl auth [flags] [options]` | Inspect authorization.
`autoscale`    | `kubectl autoscale (-f FILENAME &#124; TYPE NAME &#124; TYPE/NAME) [--min=MINPODS] --max=MAXPODS [--cpu=CPU] [flags]` | Automatically scale the set of pods that are managed by a replication controller.
`certificate`    | `kubectl certificate SUBCOMMAND [options]` | Modify certificate resources.
`cluster-info`    | `kubectl cluster-info [flags]` | Display endpoint information about the master and services in the cluster.
`completion`    | `kubectl completion SHELL [options]` | Output shell completion code for the specified shell (bash or zsh).
`config`        | `kubectl config SUBCOMMAND [flags]` | Modifies kubeconfig files. See the individual subcommands for details.
`convert`    | `kubectl convert -f FILENAME [options]` | Convert config files between different API versions. Both YAML and JSON formats are accepted. Note - requires `kubectl-convert` plugin to be installed.
`cordon`    | `kubectl cordon NODE [options]` | Mark node as unschedulable.
`cp`    | `kubectl cp <file-spec-src> <file-spec-dest> [options]` | Copy files and directories to and from containers.
`create`        | `kubectl create -f FILENAME [flags]` | Create one or more resources from a file or stdin.
`delete`        | `kubectl delete (-f FILENAME &#124; TYPE [NAME &#124; /NAME &#124; -l label &#124; --all]) [flags]` | Delete resources either from a file, stdin, or specifying label selectors, names, resource selectors, or resources.
`describe`    | `kubectl describe (-f FILENAME &#124; TYPE [NAME_PREFIX &#124; /NAME &#124; -l label]) [flags]` | Display the detailed state of one or more resources.
`diff`        | `kubectl diff -f FILENAME [flags]`| Diff file or stdin against live configuration.
`drain`    | `kubectl drain NODE [options]` | Drain node in preparation for maintenance.
`edit`        | `kubectl edit (-f FILENAME &#124; TYPE NAME &#124; TYPE/NAME) [flags]` | Edit and update the definition of one or more resources on the server by using the default editor.
`events`      | `kubectl events` | List events
`exec`        | `kubectl exec POD [-c CONTAINER] [-i] [-t] [flags] [-- COMMAND [args...]]` | Execute a command against a container in a pod.
`explain`    | `kubectl explain TYPE [--recursive=false] [flags]` | Get documentation of various resources. For instance pods, nodes, services, etc.
`expose`        | `kubectl expose (-f FILENAME &#124; TYPE NAME &#124; TYPE/NAME) [--port=port] [--protocol=TCP&#124;UDP] [--target-port=number-or-name] [--name=name] [--external-ip=external-ip-of-service] [--type=type] [flags]` | Expose a replication controller, service, or pod as a new Kubernetes service.
`get`        | `kubectl get (-f FILENAME &#124; TYPE [NAME &#124; /NAME &#124; -l label]) [--watch] [--sort-by=FIELD] [[-o &#124; --output]=OUTPUT_FORMAT] [flags]` | List one or more resources.
`kustomize`    | `kubectl kustomize <dir> [flags] [options]` | List a set of API resources generated from instructions in a kustomization.yaml file. The argument must be the path to the directory containing the file, or a git repository URL with a path suffix specifying same with respect to the repository root.
`label`        | `kubectl label (-f FILENAME &#124; TYPE NAME &#124; TYPE/NAME) KEY_1=VAL_1 ... KEY_N=VAL_N [--overwrite] [--all] [--resource-version=version] [flags]` | Add or update the labels of one or more resources.
`logs`        | `kubectl logs POD [-c CONTAINER] [--follow] [flags]` | Print the logs for a container in a pod.
`options`    | `kubectl options` | List of global command-line options, which apply to all commands.
`patch`        | `kubectl patch (-f FILENAME &#124; TYPE NAME &#124; TYPE/NAME) --patch PATCH [flags]` | Update one or more fields of a resource by using the strategic merge patch process.
`plugin`    | `kubectl plugin [flags] [options]` | Provides utilities for interacting with plugins.
`port-forward`    | `kubectl port-forward POD [LOCAL_PORT:]REMOTE_PORT [...[LOCAL_PORT_N:]REMOTE_PORT_N] [flags]` | Forward one or more local ports to a pod.
`proxy`        | `kubectl proxy [--port=PORT] [--www=static-dir] [--www-prefix=prefix] [--api-prefix=prefix] [flags]` | Run a proxy to the Kubernetes API server.
`replace`        | `kubectl replace -f FILENAME` | Replace a resource from a file or stdin.
`rollout`    | `kubectl rollout SUBCOMMAND [options]` | Manage the rollout of a resource. Valid resource types include: deployments, daemonsets and statefulsets.
`run`        | `kubectl run NAME --image=image [--env="key=value"] [--port=port] [--dry-run=server&#124;client&#124;none] [--overrides=inline-json] [flags]` | Run a specified image on the cluster.
`scale`        | `kubectl scale (-f FILENAME &#124; TYPE NAME &#124; TYPE/NAME) --replicas=COUNT [--resource-version=version] [--current-replicas=count] [flags]` | Update the size of the specified replication controller.
`set`    | `kubectl set SUBCOMMAND [options]` | Configure application resources.
`taint`    | `kubectl taint NODE NAME KEY_1=VAL_1:TAINT_EFFECT_1 ... KEY_N=VAL_N:TAINT_EFFECT_N [options]` | Update the taints on one or more nodes.
`top`    | `kubectl top (POD &#124; NODE) [flags] [options]` | Display Resource (CPU/Memory/Storage) usage of pod or node.
`uncordon`    | `kubectl uncordon NODE [options]` | Mark node as schedulable.
`version`        | `kubectl version [--client] [flags]` | Display the Kubernetes version running on the client and server.
`wait`    | `kubectl wait ([-f FILENAME] &#124; resource.group/resource.name &#124; resource.group [(-l label &#124; --all)]) [--for=delete&#124;--for condition=available] [options]` | Experimental: Wait for a specific condition on one or many resources.

To learn more about command operations, see the kubectl reference documentation.
