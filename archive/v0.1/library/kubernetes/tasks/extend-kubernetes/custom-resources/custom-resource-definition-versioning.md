---
title: "Versions in CustomResourceDefinitions (part 1 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definition-versioning.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

This page explains how to add versioning information to
CustomResourceDefinitions, to indicate the stability
level of your CustomResourceDefinitions or advance your API to a new version with conversion between API representations. It also describes how to upgrade an object from one version to another.

## Before you begin

You should have an initial understanding of custom resources.

## Overview

The CustomResourceDefinition API provides a workflow for introducing and upgrading
to new versions of a CustomResourceDefinition.

When a CustomResourceDefinition is created, the first version is set in the
CustomResourceDefinition `spec.versions` list to an appropriate stability level
and a version number. For example `v1beta1` would indicate that the first
version is not yet stable. All custom resource objects will initially be stored
at this version.

Once the CustomResourceDefinition is created, clients may begin using the
`v1beta1` API.

Later it might be necessary to add new version such as `v1`.

Adding a new version:

1. Pick a conversion strategy. Since custom resource objects need the ability to
   be served at both versions, that means they will sometimes be served in a
   different version than the one stored. To make this possible, the custom resource objects must sometimes be converted between the
   version they are stored at and the version they are served at. If the
   conversion involves schema changes and requires custom logic, a conversion
   webhook should be used. If there are no schema changes, the default `None`
   conversion strategy may be used and only the `apiVersion` field will be
   modified when serving different versions.
1. If using conversion webhooks, create and deploy the conversion webhook. See
   the Webhook conversion for more details.
1. Update the CustomResourceDefinition to include the new version in the
   `spec.versions` list with `served:true`.  Also, set `spec.conversion` field
   to the selected conversion strategy. If using a conversion webhook, configure
   `spec.conversion.webhookClientConfig` field to call the webhook.

Once the new version is added, clients may incrementally migrate to the new
version. It is perfectly safe for some clients to use the old version while
others use the new version.

Migrate stored objects to the new version:

1. See the upgrade existing objects to a new stored version section.

It is safe for clients to use both the old and new version before, during and
after upgrading the objects to a new stored version.

Removing an old version:

1. Ensure all clients are fully migrated to the new version. The kube-apiserver
   logs can be reviewed to help identify any clients that are still accessing via
   the old version.
1. Set `served` to `false` for the old version in the `spec.versions` list. If
   any clients are still unexpectedly using the old version they may begin reporting
   errors attempting to access the custom resource objects at the old version.
   If this occurs, switch back to using `served:true` on the old version, migrate the
   remaining clients to the new version and repeat this step.
1. Ensure the upgrade of existing objects to the new stored version step has been completed.
   1. Verify that the `storage` is set to `true` for the new version in the `spec.versions` list in the CustomResourceDefinition.
   1. Verify that the old version is no longer listed in the CustomResourceDefinition `status.storedVersions`.
1. Remove the old version from the CustomResourceDefinition `spec.versions` list.
1. Drop conversion support for the old version in conversion webhooks.

## Specify multiple versions

The CustomResourceDefinition API `versions` field can be used to support multiple versions of custom resources that you
have developed. Versions can have different schemas, and conversion webhooks can convert custom resources between versions.
Webhook conversions should follow the Kubernetes API conventions wherever applicable.
Specifically, See the API change documentation for a set of useful gotchas and suggestions.

**Note:**
In `apiextensions.k8s.io/v1beta1`, there was a `version` field instead of `versions`. The
`version` field is deprecated and optional, but if it is not empty, it must
match the first item in the `versions` field.

This example shows a CustomResourceDefinition with two versions. For the first
example, the assumption is all versions share the same schema with no conversion
between them. The comments in the YAML provide more context.

**apiextensions.k8s.io/v1**
```yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  # name must match the spec fields below, and be in the form: <plural>.<group>
  name: crontabs.example.com
spec:
  # group name to use for REST API: /apis/<group>/<version>
  group: example.com
  # list of versions supported by this CustomResourceDefinition
  versions:
  - name: v1beta1
    # Each version can be enabled/disabled by Served flag.
    served: true
    # One and only one version must be marked as the storage version.
    storage: true
    # A schema is required
    schema:
      openAPIV3Schema:
        type: object
        properties:
          host:
            type: string
          port:
            type: string
  - name: v1
    served: true
    storage: false
    schema:
      openAPIV3Schema:
        type: object
        properties:
          host:
            type: string
          port:
            type: string
  # The conversion section is introduced in Kubernetes 1.13+ with a default value of
  # None conversion (strategy sub-field set to None).
  conversion:
    # None conversion assumes the same schema for all versions and only sets the apiVersion
    # field of custom resources to the proper value
    strategy: None
  # either Namespaced or Cluster
  scope: Namespaced
  names:
    # plural name to be used in the URL: /apis/<group>/<version>/<plural>
    plural: crontabs
    # singular name to be used as an alias on the CLI and for display
    singular: crontab
    # kind is normally the CamelCased singular type. Your resource manifests use this.
    kind: CronTab
    # shortNames allow shorter string to match your resource on the CLI
    shortNames:
    - ct
```

**apiextensions.k8s.io/v1beta1**
```yaml
# Deprecated in v1.16 in favor of apiextensions.k8s.io/v1
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  # name must match the spec fields below, and be in the form: <plural>.<group>
  name: crontabs.example.com
spec:
  # group name to use for REST API: /apis/<group>/<version>
  group: example.com
  # list of versions supported by this CustomResourceDefinition
  versions:
  - name: v1beta1
    # Each version can be enabled/disabled by Served flag.
    served: true
    # One and only one version must be marked as the storage version.
    storage: true
  - name: v1
    served: true
    storage: false
  validation:
    openAPIV3Schema:
      type: object
      properties:
        host:
          type: string
        port:
          type: string
  # The conversion section is introduced in Kubernetes 1.13+ with a default value of
  # None conversion (strategy sub-field set to None).
  conversion:
    # None conversion assumes the same schema for all versions and only sets the apiVersion
    # field of custom resources to the proper value
    strategy: None
  # either Namespaced or Cluster
  scope: Namespaced
  names:
    # plural name to be used in the URL: /apis/<group>/<version>/<plural>
    plural: crontabs
    # singular name to be used as an alias on the CLI and for display
    singular: crontab
    # kind is normally the PascalCased singular type. Your resource manifests use this.
    kind: CronTab
    # shortNames allow shorter string to match your resource on the CLI
    shortNames:
    - ct
```

You can save the CustomResourceDefinition in a YAML file, then use
`kubectl apply` to create it.

```shell
kubectl apply -f my-versioned-crontab.yaml
```

After creation, the API server starts to serve each enabled version at an HTTP
REST endpoint. In the above example, the API versions are available at
`/apis/example.com/v1beta1` and `/apis/example.com/v1`.

### Version priority

Regardless of the order in which versions are defined in a
CustomResourceDefinition, the version with the highest priority is used by
kubectl as the default version to access objects. The priority is determined
by parsing the _name_ field to determine the version number, the stability
(GA, Beta, or Alpha), and the sequence within that stability level.

The algorithm used for sorting the versions is designed to sort versions in the
same way that the Kubernetes project sorts Kubernetes versions. Versions start with a
`v` followed by a number, an optional `beta` or `alpha` designation, and
optional additional numeric versioning information. Broadly, a version string might look
like `v2` or `v2beta1`. Versions are sorted using the following algorithm:

- Entries that follow Kubernetes version patterns are sorted before those that
  do not.
- For entries that follow Kubernetes version patterns, the numeric portions of
  the version string is sorted largest to smallest.
- If the strings `beta` or `alpha` follow the first numeric portion, they sorted
  in that order, after the equivalent string without the `beta` or `alpha`
  suffix (which is presumed to be the GA version).
- If another number follows the `beta`, or `alpha`, those numbers are also
  sorted from largest to smallest.
- Strings that don't fit the above format are sorted alphabetically and the
  numeric portions are not treated specially. Notice that in the example below,
  `foo1` is sorted above `foo10`. This is different from the sorting of the
  numeric portion of entries that do follow the Kubernetes version patterns.

This might make sense if you look at the following sorted version list:

```none
- v10
- v2
- v1
- v11beta2
- v10beta3
- v3beta1
- v12alpha1
- v11alpha2
- foo1
- foo10
```

For the example in Specify multiple versions, the
version sort order is `v1`, followed by `v1beta1`. This causes the kubectl
command to use `v1` as the default version unless the provided object specifies
the version.

### Version deprecation

**Feature state:** v1.19 [stable]

Starting in v1.19, a CustomResourceDefinition can indicate a particular version of the resource it defines is deprecated.
When API requests to a deprecated version of that resource are made, a warning message is returned in the API response as a header.
The warning message for each deprecated version of the resource can be customized if desired.

A customized warning message should indicate the deprecated API group, version, and kind,
and should indicate what API group, version, and kind should be used instead, if applicable.

**apiextensions.k8s.io/v1**
```yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: crontabs.example.com
spec:
  group: example.com
  names:
    plural: crontabs
    singular: crontab
    kind: CronTab
  scope: Namespaced
  versions:
  - name: v1alpha1
    served: true
    storage: false
    # This indicates the v1alpha1 version of the custom resource is deprecated.
    # API requests to this version receive a warning header in the server response.
    deprecated: true
    # This overrides the default warning returned to API clients making v1alpha1 API requests.
    deprecationWarning: "example.com/v1alpha1 CronTab is deprecated; see http://example.com/v1alpha1-v1 for instructions to migrate to example.com/v1 CronTab"
    
    schema: ...
  - name: v1beta1
    served: true
    # This indicates the v1beta1 version of the custom resource is deprecated.
    # API requests to this version receive a warning header in the server response.
    # A default warning message is returned for this version.
    deprecated: true
    schema: ...
  - name: v1
    served: true
    storage: true
    schema: ...
```

**apiextensions.k8s.io/v1beta1**
```yaml
# Deprecated in v1.16 in favor of apiextensions.k8s.io/v1
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  name: crontabs.example.com
spec:
  group: example.com
  names:
    plural: crontabs
    singular: crontab
    kind: CronTab
  scope: Namespaced
  validation: ...
  versions:
  - name: v1alpha1
    served: true
    storage: false
    # This indicates the v1alpha1 version of the custom resource is deprecated.
    # API requests to this version receive a warning header in the server response.
    deprecated: true
    # This overrides the default warning returned to API clients making v1alpha1 API requests.
    deprecationWarning: "example.com/v1alpha1 CronTab is deprecated; see http://example.com/v1alpha1-v1 for instructions to migrate to example.com/v1 CronTab"
  - name: v1beta1
    served: true
    # This indicates the v1beta1 version of the custom resource is deprecated.
    # API requests to this version receive a warning header in the server response.
    # A default warning message is returned for this version.
    deprecated: true
  - name: v1
    served: true
    storage: true
```

### Version removal

An older API version cannot be dropped from a CustomResourceDefinition manifest until existing stored data has been migrated to the newer API version for all clusters that served the older version of the custom resource, and the old version is removed from the `status.storedVersions` of the CustomResourceDefinition.

```yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: crontabs.example.com
spec:
  group: example.com
  names:
    plural: crontabs
    singular: crontab
    kind: CronTab
  scope: Namespaced
  versions:
  - name: v1beta1
    # This indicates the v1beta1 version of the custom resource is no longer served.
    # API requests to this version receive a not found error in the server response.
    served: false
    schema: ...
  - name: v1
    served: true
    # The new served version should be set as the storage version
    storage: true
    schema: ...
```
