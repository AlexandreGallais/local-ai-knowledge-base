---
title: "Declarative Management of Kubernetes Objects Using Configuration Files (part 4 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/manage-kubernetes-objects/declarative-config.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Declarative Management of Kubernetes Objects Using Configuration Files (part 4 of 4)

## Default field values

The API server sets certain fields to default values in the live configuration if they are
not specified when the object is created.

Here's a configuration file for a Deployment. The file does not specify `strategy`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  selector:
    matchLabels:
      app: nginx
  minReadySeconds: 5
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
```

Create the object using `kubectl apply`:

```shell
kubectl apply -f https://k8s.io/examples/application/simple_deployment.yaml
```

Print the live configuration using `kubectl get`:

```shell
kubectl get -f https://k8s.io/examples/application/simple_deployment.yaml -o yaml
```

The output shows that the API server set several fields to default values in the live
configuration. These fields were not specified in the configuration file.

```yaml
apiVersion: apps/v1
kind: Deployment
# ...
spec:
  selector:
    matchLabels:
      app: nginx
  minReadySeconds: 5
  replicas: 1 # defaulted by apiserver
  strategy:
    rollingUpdate: # defaulted by apiserver - derived from strategy.type
      maxSurge: 1
      maxUnavailable: 1
    type: RollingUpdate # defaulted by apiserver
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: nginx
    spec:
      containers:
      - image: nginx:1.14.2
        imagePullPolicy: IfNotPresent # defaulted by apiserver
        name: nginx
        ports:
        - containerPort: 80
          protocol: TCP # defaulted by apiserver
        resources: {} # defaulted by apiserver
        terminationMessagePath: /dev/termination-log # defaulted by apiserver
      dnsPolicy: ClusterFirst # defaulted by apiserver
      restartPolicy: Always # defaulted by apiserver
      securityContext: {} # defaulted by apiserver
      terminationGracePeriodSeconds: 30 # defaulted by apiserver
# ...
```

In a patch request, defaulted fields are not re-defaulted unless they are explicitly cleared
as part of a patch request. This can cause unexpected behavior for
fields that are defaulted based
on the values of other fields. When the other fields are later changed,
the values defaulted from them will not be updated unless they are
explicitly cleared.

For this reason, it is recommended that certain fields defaulted
by the server are explicitly defined in the configuration file, even
if the desired values match the server defaults. This makes it
easier to recognize conflicting values that will not be re-defaulted
by the server.

**Example:**

```yaml
# last-applied-configuration
spec:
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80

# configuration file
spec:
  strategy:
    type: Recreate # updated value
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80

# live configuration
spec:
  strategy:
    type: RollingUpdate # defaulted value
    rollingUpdate: # defaulted value derived from type
      maxSurge : 1
      maxUnavailable: 1
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80

# result after merge - ERROR!
spec:
  strategy:
    type: Recreate # updated value: incompatible with rollingUpdate
    rollingUpdate: # defaulted value: incompatible with "type: Recreate"
      maxSurge : 1
      maxUnavailable: 1
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
```

**Explanation:**

1. The user creates a Deployment without defining `strategy.type`.
2. The server defaults `strategy.type` to `RollingUpdate` and defaults the
   `strategy.rollingUpdate` values.
3. The user changes `strategy.type` to `Recreate`. The `strategy.rollingUpdate`
   values remain at their defaulted values, though the server expects them to be cleared.
   If the `strategy.rollingUpdate` values had been defined initially in the configuration file,
   it would have been more clear that they needed to be deleted.
4. Apply fails because `strategy.rollingUpdate` is not cleared. The `strategy.rollingupdate`
   field cannot be defined with a `strategy.type` of `Recreate`.

Recommendation: These fields should be explicitly defined in the object configuration file:

- Selectors and PodTemplate labels on workloads, such as Deployment, StatefulSet, Job, DaemonSet,
  ReplicaSet, and ReplicationController
- Deployment rollout strategy

### How to clear server-defaulted fields or fields set by other writers

Fields that do not appear in the configuration file can be cleared by
setting their values to `null` and then applying the configuration file.
For fields defaulted by the server, this triggers re-defaulting
the values.

## How to change ownership of a field between the configuration file and direct imperative writers

These are the only methods you should use to change an individual object field:

- Use `kubectl apply`.
- Write directly to the live configuration without modifying the configuration file:
for example, use `kubectl scale`.

### Changing the owner from a direct imperative writer to a configuration file

Add the field to the configuration file. For the field, discontinue direct updates to
the live configuration that do not go through `kubectl apply`.

### Changing the owner from a configuration file to a direct imperative writer

Changing ownership of a field from a configuration file to
an imperative writer requires manual steps:

- Remove the field from the configuration file.
- Remove the field from the `kubectl.kubernetes.io/last-applied-configuration` annotation on the live object.

## Changing management methods

Kubernetes objects should be managed using only one method at a time.
Switching from one method to another is possible, but is a manual process.

**Note:**
It is OK to use imperative deletion with declarative management.

TODO(pwittrock): We need to make using imperative commands with
declarative object configuration work so that it doesn't write the
fields to the annotation, and instead.  Then add this bullet point.

- using imperative commands with declarative configuration to manage where each manages different fields.

### Migrating from imperative command management to declarative object configuration

Migrating from imperative command management to declarative object
configuration involves several manual steps:

1. Export the live object to a local configuration file:

   ```shell
   kubectl get <kind>/<name> -o yaml > <kind>_<name>.yaml
   ```

1. Manually remove the `status` field from the configuration file.

   **Note:**
   This step is optional, as `kubectl apply` does not update the status field
   even if it is present in the configuration file.

1. Set the `kubectl.kubernetes.io/last-applied-configuration` annotation on the object:

   ```shell
   kubectl replace --save-config -f <kind>_<name>.yaml
   ```

1. Change processes to use `kubectl apply` for managing the object exclusively.

TODO(pwittrock): Why doesn't export remove the status field?  Seems like it should.

### Migrating from imperative object configuration to declarative object configuration

1. Set the `kubectl.kubernetes.io/last-applied-configuration` annotation on the object:

   ```shell
   kubectl replace --save-config -f <kind>_<name>.yaml
   ```

1. Change processes to use `kubectl apply` for managing the object exclusively.

## Defining controller selectors and PodTemplate labels

**Warning:**
Updating selectors on controllers is strongly discouraged.

The recommended approach is to define a single, immutable PodTemplate label
used only by the controller selector with no other semantic meaning.

**Example:**

```yaml
selector:
  matchLabels:
      controller-selector: "apps/v1/deployment/nginx"
template:
  metadata:
    labels:
      controller-selector: "apps/v1/deployment/nginx"
```

## What's next

* Managing Kubernetes Objects Using Imperative Commands
* Imperative Management of Kubernetes Objects Using Configuration Files
* Kubectl Command Reference
* Kubernetes API Reference
