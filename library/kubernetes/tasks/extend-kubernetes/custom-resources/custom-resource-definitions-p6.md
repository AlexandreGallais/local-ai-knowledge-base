---
title: "Extend the Kubernetes API with CustomResourceDefinitions (part 6 of 6)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Extend the Kubernetes API with CustomResourceDefinitions (part 6 of 6)

### Subresources

Custom resources support `/status` and `/scale` subresources.

The status and scale subresources can be optionally enabled by
defining them in the CustomResourceDefinition.

#### Status subresource

When the status subresource is enabled, the `/status` subresource for the custom resource is exposed.

- The status and the spec stanzas are represented by the `.status` and `.spec` JSONPaths
  respectively inside of a custom resource.
- `PUT` requests to the `/status` subresource take a custom resource object and ignore changes to
  anything except the status stanza.
- `PUT` requests to the `/status` subresource only validate the status stanza of the custom
  resource.
- `PUT`/`POST`/`PATCH` requests to the custom resource ignore changes to the status stanza.
- The `.metadata.generation` value is incremented for all changes, except for changes to
  `.metadata` or `.status`.
- Only the following constructs are allowed at the root of the CRD OpenAPI validation schema:

  - `description`
  - `example`
  - `exclusiveMaximum`
  - `exclusiveMinimum`
  - `externalDocs`
  - `format`
  - `items`
  - `maximum`
  - `maxItems`
  - `maxLength`
  - `minimum`
  - `minItems`
  - `minLength`
  - `multipleOf`
  - `pattern`
  - `properties`
  - `required`
  - `title`
  - `type`
  - `uniqueItems`

#### Scale subresource

When the scale subresource is enabled, the `/scale` subresource for the custom resource is exposed.
The `autoscaling/v1.Scale` object is sent as the payload for `/scale`.

To enable the scale subresource, the following fields are defined in the CustomResourceDefinition.

- `specReplicasPath` defines the JSONPath inside of a custom resource that corresponds to `scale.spec.replicas`.

  - It is a required value.
  - Only JSONPaths under `.spec` and with the dot notation are allowed.
  - If there is no value under the `specReplicasPath` in the custom resource,
    the `/scale` subresource will return an error on GET.

- `statusReplicasPath` defines the JSONPath inside of a custom resource that corresponds to `scale.status.replicas`.

  - It is a required value.
  - Only JSONPaths under `.status` and with the dot notation are allowed.
  - If there is no value under the `statusReplicasPath` in the custom resource,
    the status replica value in the `/scale` subresource will default to 0.

- `labelSelectorPath` defines the JSONPath inside of a custom resource that corresponds to
  `Scale.Status.Selector`.

  - It is an optional value.
  - It must be set to work with HPA and VPA.
  - Only JSONPaths under `.status` or `.spec` and with the dot notation are allowed.
  - If there is no value under the `labelSelectorPath` in the custom resource,
    the status selector value in the `/scale` subresource will default to the empty string.
  - The field pointed by this JSON path must be a string field (not a complex selector struct)
    which contains a serialized label selector in string form.

In the following example, both status and scale subresources are enabled.

Save the CustomResourceDefinition to `resourcedefinition.yaml`:

```yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: crontabs.stable.example.com
spec:
  group: stable.example.com
  versions:
    - name: v1
      served: true
      storage: true
      schema:
        openAPIV3Schema:
          type: object
          properties:
            spec:
              type: object
              properties:
                cronSpec:
                  type: string
                image:
                  type: string
                replicas:
                  type: integer
            status:
              type: object
              properties:
                replicas:
                  type: integer
                labelSelector:
                  type: string
      # subresources describes the subresources for custom resources.
      subresources:
        # status enables the status subresource.
        status: {}
        # scale enables the scale subresource.
        scale:
          # specReplicasPath defines the JSONPath inside of a custom resource that corresponds to Scale.Spec.Replicas.
          specReplicasPath: .spec.replicas
          # statusReplicasPath defines the JSONPath inside of a custom resource that corresponds to Scale.Status.Replicas.
          statusReplicasPath: .status.replicas
          # labelSelectorPath defines the JSONPath inside of a custom resource that corresponds to Scale.Status.Selector.
          labelSelectorPath: .status.labelSelector
  scope: Namespaced
  names:
    plural: crontabs
    singular: crontab
    kind: CronTab
    shortNames:
    - ct
```

And create it:

```shell
kubectl apply -f resourcedefinition.yaml
```

After the CustomResourceDefinition object has been created, you can create custom objects.

If you save the following YAML to `my-crontab.yaml`:

```yaml
apiVersion: "stable.example.com/v1"
kind: CronTab
metadata:
  name: my-new-cron-object
spec:
  cronSpec: "* * * * */5"
  image: my-awesome-cron-image
  replicas: 3
```

and create it:

```shell
kubectl apply -f my-crontab.yaml
```

Then new namespaced RESTful API endpoints are created at:

```none
/apis/stable.example.com/v1/namespaces/*/crontabs/status
```

and

```none
/apis/stable.example.com/v1/namespaces/*/crontabs/scale
```

A custom resource can be scaled using the `kubectl scale` command.
For example, the following command sets `.spec.replicas` of the
custom resource created above to 5:

```shell
kubectl scale --replicas=5 crontabs/my-new-cron-object
crontabs "my-new-cron-object" scaled

kubectl get crontabs my-new-cron-object -o jsonpath='{.spec.replicas}'
5
```

You can use a PodDisruptionBudget to protect custom
resources that have the scale subresource enabled.

### Categories

Categories is a list of grouped resources the custom resource belongs to (eg. `all`).
You can use `kubectl get <category-name>` to list the resources belonging to the category.

The following example adds `all` in the list of categories in the CustomResourceDefinition
and illustrates how to output the custom resource using `kubectl get all`.

Save the following CustomResourceDefinition to `resourcedefinition.yaml`:

```yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: crontabs.stable.example.com
spec:
  group: stable.example.com
  versions:
    - name: v1
      served: true
      storage: true
      schema:
        openAPIV3Schema:
          type: object
          properties:
            spec:
              type: object
              properties:
                cronSpec:
                  type: string
                image:
                  type: string
                replicas:
                  type: integer
  scope: Namespaced
  names:
    plural: crontabs
    singular: crontab
    kind: CronTab
    shortNames:
    - ct
    # categories is a list of grouped resources the custom resource belongs to.
    categories:
    - all
```

and create it:

```shell
kubectl apply -f resourcedefinition.yaml
```

After the CustomResourceDefinition object has been created, you can create custom objects.

Save the following YAML to `my-crontab.yaml`:

```yaml
apiVersion: "stable.example.com/v1"
kind: CronTab
metadata:
  name: my-new-cron-object
spec:
  cronSpec: "* * * * */5"
  image: my-awesome-cron-image
```

and create it:

```shell
kubectl apply -f my-crontab.yaml
```

You can specify the category when using `kubectl get`:

```shell
kubectl get all
```

and it will include the custom resources of kind `CronTab`:

```none
NAME                          AGE
crontabs/my-new-cron-object   3s
```

## What's next

* Read about custom resources.

* See CustomResourceDefinition.

* Serve multiple versions of a
  CustomResourceDefinition.
