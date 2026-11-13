---
title: "Declarative Management of Kubernetes Objects Using Kustomize (part 3 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/manage-kubernetes-objects/kustomization.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Declarative Management of Kubernetes Objects Using Kustomize (part 3 of 3)

### Composing and Customizing Resources

It is common to compose a set of resources in a project and manage them inside the same file or directory.
Kustomize offers composing resources from different files and applying patches or other customization to them.

#### Composing

Kustomize supports composition of different resources. The `resources` field, in the `kustomization.yaml` file,
defines the list of resources to include in a configuration. Set the path to a resource's configuration file in the `resources` list.
Here is an example of an NGINX application comprised of a Deployment and a Service:

```shell
# Create a deployment.yaml file
cat <<EOF > deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-nginx
spec:
  selector:
    matchLabels:
      run: my-nginx
  replicas: 2
  template:
    metadata:
      labels:
        run: my-nginx
    spec:
      containers:
      - name: my-nginx
        image: nginx
        ports:
        - containerPort: 80
EOF

# Create a service.yaml file
cat <<EOF > service.yaml
apiVersion: v1
kind: Service
metadata:
  name: my-nginx
  labels:
    run: my-nginx
spec:
  ports:
  - port: 80
    protocol: TCP
  selector:
    run: my-nginx
EOF

# Create a kustomization.yaml composing them
cat <<EOF >./kustomization.yaml
resources:
- deployment.yaml
- service.yaml
EOF
```

The resources from `kubectl kustomize ./` contain both the Deployment and the Service objects.

#### Customizing

Patches can be used to apply different customizations to resources. Kustomize supports different patching
mechanisms through `StrategicMerge` and `Json6902` using the `patches` field. `patches` may be a file or
an inline string, targeting a single or multiple resources.

The `patches` field contains a list of patches applied in the order they are specified. The patch target
selects resources by `group`, `version`, `kind`, `name`, `namespace`, `labelSelector` and `annotationSelector`.

Small patches that do one thing are recommended. For example, create one patch for increasing the deployment
replica number and another patch for setting the memory limit. The target resource is matched using `group`, `version`,
`kind`, and `name` fields from the patch file.

```shell
# Create a deployment.yaml file
cat <<EOF > deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-nginx
spec:
  selector:
    matchLabels:
      run: my-nginx
  replicas: 2
  template:
    metadata:
      labels:
        run: my-nginx
    spec:
      containers:
      - name: my-nginx
        image: nginx
        ports:
        - containerPort: 80
EOF

# Create a patch increase_replicas.yaml
cat <<EOF > increase_replicas.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-nginx
spec:
  replicas: 3
EOF

# Create another patch set_memory.yaml
cat <<EOF > set_memory.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-nginx
spec:
  template:
    spec:
      containers:
      - name: my-nginx
        resources:
          limits:
            memory: 512Mi
EOF

cat <<EOF >./kustomization.yaml
resources:
- deployment.yaml
patches:
  - path: increase_replicas.yaml
  - path: set_memory.yaml
EOF
```

Run `kubectl kustomize ./` to view the Deployment:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      run: my-nginx
  template:
    metadata:
      labels:
        run: my-nginx
    spec:
      containers:
      - image: nginx
        name: my-nginx
        ports:
        - containerPort: 80
        resources:
          limits:
            memory: 512Mi
```

Not all resources or fields support `strategicMerge` patches. To support modifying arbitrary fields in arbitrary resources,
Kustomize offers applying JSON patch through `Json6902`.
To find the correct Resource for a `Json6902` patch, it is mandatory to specify the `target` field in `kustomization.yaml`.

For example, increasing the replica number of a Deployment object can also be done through `Json6902` patch. The target resource
is matched using `group`, `version`, `kind`, and `name` from the `target` field.

```shell
# Create a deployment.yaml file
cat <<EOF > deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-nginx
spec:
  selector:
    matchLabels:
      run: my-nginx
  replicas: 2
  template:
    metadata:
      labels:
        run: my-nginx
    spec:
      containers:
      - name: my-nginx
        image: nginx
        ports:
        - containerPort: 80
EOF

# Create a json patch
cat <<EOF > patch.yaml
- op: replace
  path: /spec/replicas
  value: 3
EOF

# Create a kustomization.yaml
cat <<EOF >./kustomization.yaml
resources:
- deployment.yaml

patches:
- target:
    group: apps
    version: v1
    kind: Deployment
    name: my-nginx
  path: patch.yaml
EOF
```

Run `kubectl kustomize ./` to see the `replicas` field is updated:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      run: my-nginx
  template:
    metadata:
      labels:
        run: my-nginx
    spec:
      containers:
      - image: nginx
        name: my-nginx
        ports:
        - containerPort: 80
```

In addition to patches, Kustomize also offers customizing container images or injecting field values from other objects into containers
without creating patches. For example, you can change the image used inside containers by specifying the new image in the `images` field
in `kustomization.yaml`.

```shell
cat <<EOF > deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-nginx
spec:
  selector:
    matchLabels:
      run: my-nginx
  replicas: 2
  template:
    metadata:
      labels:
        run: my-nginx
    spec:
      containers:
      - name: my-nginx
        image: nginx
        ports:
        - containerPort: 80
EOF

cat <<EOF >./kustomization.yaml
resources:
- deployment.yaml
images:
- name: nginx
  newName: my.image.registry/nginx
  newTag: "1.4.0"
EOF
```

Run `kubectl kustomize ./` to see that the image being used is updated:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-nginx
spec:
  replicas: 2
  selector:
    matchLabels:
      run: my-nginx
  template:
    metadata:
      labels:
        run: my-nginx
    spec:
      containers:
      - image: my.image.registry/nginx:1.4.0
        name: my-nginx
        ports:
        - containerPort: 80
```

Sometimes, the application running in a Pod may need to use configuration values from other objects. For example,
a Pod from a Deployment object need to read the corresponding Service name from Env or as a command argument.
Since the Service name may change as `namePrefix` or `nameSuffix` is added in the `kustomization.yaml` file. It is
not recommended to hard code the Service name in the command argument. For this usage, Kustomize can inject
the Service name into containers through `replacements`.

```shell
# Create a deployment.yaml file (quoting the here doc delimiter)
cat <<'EOF' > deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-nginx
spec:
  selector:
    matchLabels:
      run: my-nginx
  replicas: 2
  template:
    metadata:
      labels:
        run: my-nginx
    spec:
      containers:
      - name: my-nginx
        image: nginx
        command: ["start", "--host", "MY_SERVICE_NAME_PLACEHOLDER"]
EOF

# Create a service.yaml file
cat <<EOF > service.yaml
apiVersion: v1
kind: Service
metadata:
  name: my-nginx
  labels:
    run: my-nginx
spec:
  ports:
  - port: 80
    protocol: TCP
  selector:
    run: my-nginx
EOF

cat <<EOF >./kustomization.yaml
namePrefix: dev-
nameSuffix: "-001"

resources:
- deployment.yaml
- service.yaml

replacements:
- source:
    kind: Service
    name: my-nginx
    fieldPath: metadata.name
  targets:
  - select:
      kind: Deployment
      name: my-nginx
    fieldPaths:
    - spec.template.spec.containers.0.command.2
EOF
```

Run `kubectl kustomize ./` to see that the Service name injected into containers is `dev-my-nginx-001`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: dev-my-nginx-001
spec:
  replicas: 2
  selector:
    matchLabels:
      run: my-nginx
  template:
    metadata:
      labels:
        run: my-nginx
    spec:
      containers:
      - command:
        - start
        - --host
        - dev-my-nginx-001
        image: nginx
        name: my-nginx
```

## Bases and Overlays

Kustomize has the concepts of **bases** and **overlays**. A **base** is a directory with a `kustomization.yaml`, which contains a
set of resources and associated customization. A base could be either a local directory or a directory from a remote repo,
as long as a `kustomization.yaml` is present inside. An **overlay** is a directory with a `kustomization.yaml` that refers to other
kustomization directories as its `bases`. A **base** has no knowledge of an overlay and can be used in multiple overlays.

The `kustomization.yaml` in an **overlay** directory may refer to multiple `bases`, combining all the resources defined
in these bases into a unified configuration. Additionally, it can apply customizations on top of these resources to meet specific
requirements.

Here is an example of a base:

```shell
# Create a directory to hold the base
mkdir base
# Create a base/deployment.yaml
cat <<EOF > base/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-nginx
spec:
  selector:
    matchLabels:
      run: my-nginx
  replicas: 2
  template:
    metadata:
      labels:
        run: my-nginx
    spec:
      containers:
      - name: my-nginx
        image: nginx
EOF

# Create a base/service.yaml file
cat <<EOF > base/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: my-nginx
  labels:
    run: my-nginx
spec:
  ports:
  - port: 80
    protocol: TCP
  selector:
    run: my-nginx
EOF
# Create a base/kustomization.yaml
cat <<EOF > base/kustomization.yaml
resources:
- deployment.yaml
- service.yaml
EOF
```

This base can be used in multiple overlays. You can add different `namePrefix` or other cross-cutting fields
in different overlays. Here are two overlays using the same base.

```shell
mkdir dev
cat <<EOF > dev/kustomization.yaml
resources:
- ../base
namePrefix: dev-
EOF

mkdir prod
cat <<EOF > prod/kustomization.yaml
resources:
- ../base
namePrefix: prod-
EOF
```

## How to apply/view/delete objects using Kustomize

Use `--kustomize` or `-k` in `kubectl` commands to recognize resources managed by `kustomization.yaml`.
Note that `-k` should point to a kustomization directory, such as

```shell
kubectl apply -k <kustomization directory>/
```

Given the following `kustomization.yaml`,

```shell
# Create a deployment.yaml file
cat <<EOF > deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-nginx
spec:
  selector:
    matchLabels:
      run: my-nginx
  replicas: 2
  template:
    metadata:
      labels:
        run: my-nginx
    spec:
      containers:
      - name: my-nginx
        image: nginx
        ports:
        - containerPort: 80
EOF

# Create a kustomization.yaml
cat <<EOF >./kustomization.yaml
namePrefix: dev-
labels:
  - pairs:
      app: my-nginx
    includeSelectors: true 
resources:
- deployment.yaml
EOF
```

Run the following command to apply the Deployment object `dev-my-nginx`:

```shell
> kubectl apply -k ./
deployment.apps/dev-my-nginx created
```

Run one of the following commands to view the Deployment object `dev-my-nginx`:

```shell
kubectl get -k ./
```

```shell
kubectl describe -k ./
```

Run the following command to compare the Deployment object `dev-my-nginx` against the state
that the cluster would be in if the manifest was applied:

```shell
kubectl diff -k ./
```

Run the following command to delete the Deployment object `dev-my-nginx`:

```shell
> kubectl delete -k ./
deployment.apps "dev-my-nginx" deleted
```

## Kustomize Feature List

| Field | Type | Explanation |
|-------|------|-------------|
| bases | []string | Each entry in this list should resolve to a directory containing a kustomization.yaml file |
| commonAnnotations | map[string]string | annotations to add to all resources |
| commonLabels | map[string]string | labels to add to all resources and selectors |
| configMapGenerator | []ConfigMapArgs | Each entry in this list generates a ConfigMap |
| configurations | []string | Each entry in this list should resolve to a file containing Kustomize transformer configurations |
| crds | []string | Each entry in this list should resolve to an OpenAPI definition file for Kubernetes types |
| generatorOptions | GeneratorOptions | Modify behaviors of all ConfigMap and Secret <example-value> |
| images | []Image | Each entry is to modify the name, tags and/or digest for one image without creating patches |
| labels | map[string]string | Add labels without automatically injecting corresponding selectors |
| namePrefix | string | value of this field is prepended to the names of all resources |
| nameSuffix | string | value of this field is appended to the names of all resources |
| patchesJson6902 | []Patch | Each entry in this list should resolve to a Kubernetes object and a Json Patch |
| patchesStrategicMerge | []string | Each entry in this list should resolve a strategic merge patch of a Kubernetes object |
| replacements | []Replacements | copy the value from a resource's field into any number of specified targets. |
| resources | []string | Each entry in this list must resolve to an existing resource configuration file |
| secretGenerator | []SecretArgs | Each entry in this list generates a Secret |
| vars | []Var | Each entry is to capture text from one resource's field |

## What's next

* Kustomize
* Kubectl Book
* Kubectl Command Reference
* Kubernetes API Reference
