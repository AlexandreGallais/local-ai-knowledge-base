---
title: "Declarative Management of Kubernetes Objects Using Kustomize (part 2 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/manage-kubernetes-objects/kustomization.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Declarative Management of Kubernetes Objects Using Kustomize (part 2 of 3)

## Overview of Kustomize

Kustomize is a tool for customizing Kubernetes configurations. It has the following
features to manage application configuration files:

* generating resources from other sources
* setting cross-cutting fields for resources
* composing and customizing collections of resources

### Generating Resources

ConfigMaps and Secrets hold configuration or sensitive data that are used by other Kubernetes
objects, such as Pods. The source of truth of ConfigMaps or Secrets are usually external to
a cluster, such as a `.properties` file or an SSH keyfile.
Kustomize has `secretGenerator` and `configMapGenerator`, which generate Secret and ConfigMap from files or literals.

#### configMapGenerator

To generate a ConfigMap from a file, add an entry to the `files` list in `configMapGenerator`.
Here is an example of generating a ConfigMap with a data item from a `.properties` file:

```shell
# Create a application.properties file
cat <<EOF >application.properties
FOO=Bar
EOF

cat <<EOF >./kustomization.yaml
configMapGenerator:
- name: example-configmap-1
  files:
  - application.properties
EOF
```

The generated ConfigMap can be examined with the following command:

```shell
kubectl kustomize ./
```

The generated ConfigMap is:

```yaml
apiVersion: v1
data:
  application.properties: |
    FOO=Bar
kind: ConfigMap
metadata:
  name: example-configmap-1-8mbdf7882g
```

To generate a ConfigMap from an env file, add an entry to the `envs` list in `configMapGenerator`.
Here is an example of generating a ConfigMap with a data item from a `.env` file:

```shell
# Create a .env file
cat <<EOF >.env
FOO=Bar
EOF

cat <<EOF >./kustomization.yaml
configMapGenerator:
- name: example-configmap-1
  envs:
  - .env
EOF
```

The generated ConfigMap can be examined with the following command:

```shell
kubectl kustomize ./
```

The generated ConfigMap is:

```yaml
apiVersion: v1
data:
  FOO: Bar
kind: ConfigMap
metadata:
  name: example-configmap-1-42cfbf598f
```

**Note:**
Each variable in the `.env` file becomes a separate key in the ConfigMap that you generate.
This is different from the previous example which embeds a file named `application.properties`
(and all its entries) as the value for a single key.

ConfigMaps can also be generated from literal key-value pairs. To generate a ConfigMap from
a literal key-value pair, add an entry to the `literals` list in configMapGenerator.
Here is an example of generating a ConfigMap with a data item from a key-value pair:

```shell
cat <<EOF >./kustomization.yaml
configMapGenerator:
- name: example-configmap-2
  literals:
  - FOO=Bar
EOF
```

The generated ConfigMap can be checked by the following command:

```shell
kubectl kustomize ./
```

The generated ConfigMap is:

```yaml
apiVersion: v1
data:
  FOO: Bar
kind: ConfigMap
metadata:
  name: example-configmap-2-g2hdhfc6tk
```

To use a generated ConfigMap in a Deployment, reference it by the name of the configMapGenerator.
Kustomize will automatically replace this name with the generated name.

This is an example deployment that uses a generated ConfigMap:

```yaml
# Create an application.properties file
cat <<EOF >application.properties
FOO=Bar
EOF

cat <<EOF >deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  labels:
    app: my-app
spec:
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: app
        image: my-app
        volumeMounts:
        - name: config
          mountPath: /config
      volumes:
      - name: config
        configMap:
          name: example-configmap-1
EOF

cat <<EOF >./kustomization.yaml
resources:
- deployment.yaml
configMapGenerator:
- name: example-configmap-1
  files:
  - application.properties
EOF
```

Generate the ConfigMap and Deployment:

```shell
kubectl kustomize ./
```

The generated Deployment will refer to the generated ConfigMap by name:

```yaml
apiVersion: v1
data:
  application.properties: |
    FOO=Bar
kind: ConfigMap
metadata:
  name: example-configmap-1-g4hk9g2ff8
---
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: my-app
  name: my-app
spec:
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - image: my-app
        name: app
        volumeMounts:
        - mountPath: /config
          name: config
      volumes:
      - configMap:
          name: example-configmap-1-g4hk9g2ff8
        name: config
```

#### secretGenerator

You can generate Secrets from files or literal key-value pairs.
To generate a Secret from a file, add an entry to the `files` list in `secretGenerator`.
Here is an example of generating a Secret with a data item from a file:

```shell
# Create a password.txt file
cat <<EOF >./password.txt
username=admin
password=<example-value>
EOF

cat <<EOF >./kustomization.yaml
secretGenerator:
- name: example-secret-1
  files:
  - password.txt
EOF
```

The generated Secret is as follows:

```yaml
apiVersion: v1
data:
  password.txt: <example-value>
kind: Secret
metadata:
  name: example-secret-1-t2kt65hgtb
type: Opaque
```

To generate a Secret from a literal key-value pair, add an entry to `literals` list
in `secretGenerator`. Here is an example of generating a Secret with a data item from a key-value pair:

```shell
cat <<EOF >./kustomization.yaml
secretGenerator:
- name: example-secret-2
  literals:
  - username=admin
  - password=<example-value>
EOF
```

The generated Secret is as follows:

```yaml
apiVersion: v1
data:
  password: <example-value>
  username: YWRtaW4=
kind: Secret
metadata:
  name: example-secret-2-t52t6g96d8
type: Opaque
```

Like ConfigMaps, generated Secrets can be used in Deployments by referring to the name of the secretGenerator:

```shell
# Create a password.txt file
cat <<EOF >./password.txt
username=admin
password=<example-value>
EOF

cat <<EOF >deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  labels:
    app: my-app
spec:
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: app
        image: my-app
        volumeMounts:
        - name: password
          mountPath: /secrets
      volumes:
      - name: password
        secret:
          secretName: example-secret-1
EOF

cat <<EOF >./kustomization.yaml
resources:
- deployment.yaml
secretGenerator:
- name: example-secret-1
  files:
  - password.txt
EOF
```

#### generatorOptions

The generated ConfigMaps and Secrets have a content hash suffix appended. This ensures that
a new ConfigMap or Secret is generated when the contents are changed. To disable the behavior
of appending a suffix, one can use `generatorOptions`. Besides that, it is also possible to
specify cross-cutting options for generated ConfigMaps and Secrets.

```shell
cat <<EOF >./kustomization.yaml
configMapGenerator:
- name: example-configmap-3
  literals:
  - FOO=Bar
generatorOptions:
  disableNameSuffixHash: true
  labels:
    type: generated
  annotations:
    note: generated
EOF
```

Run`kubectl kustomize ./` to view the generated ConfigMap:

```yaml
apiVersion: v1
data:
  FOO: Bar
kind: ConfigMap
metadata:
  annotations:
    note: generated
  labels:
    type: generated
  name: example-configmap-3
```

### Setting cross-cutting fields

It is quite common to set cross-cutting fields for all Kubernetes resources in a project.
Some use cases for setting cross-cutting fields:

* setting the same namespace for all resources
* adding the same name prefix or suffix
* adding the same set of labels
* adding the same set of annotations

Here is an example:

```shell
# Create a deployment.yaml
cat <<EOF >./deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx
EOF

cat <<EOF >./kustomization.yaml
namespace: my-namespace
namePrefix: dev-
nameSuffix: "-001"
labels:
  - pairs:
      app: bingo
    includeSelectors: true 
commonAnnotations:
  oncallPager: 800-555-1212
resources:
- deployment.yaml
EOF
```

Run `kubectl kustomize ./` to view those fields are all set in the Deployment Resource:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  annotations:
    oncallPager: 800-555-1212
  labels:
    app: bingo
  name: dev-nginx-deployment-001
  namespace: my-namespace
spec:
  selector:
    matchLabels:
      app: bingo
  template:
    metadata:
      annotations:
        oncallPager: 800-555-1212
      labels:
        app: bingo
    spec:
      containers:
      - image: nginx
        name: nginx
```
