---
title: "CustomResourceDefinition (part 1 of 8)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/apiextensions/custom-resource-definition-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# CustomResourceDefinition

`apiVersion: apiextensions.k8s.io/v1`

`import "k8s.io/apiextensions-apiserver/pkg/apis/apiextensions/v1"`

## CustomResourceDefinition {#CustomResourceDefinition}

CustomResourceDefinition represents a resource that should be exposed on the API server.  Its name MUST be in the format <.spec.name>.<.spec.group>.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | Standard object's metadata More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

       | `spec` *CustomResourceDefinitionSpec
       | spec describes how the user wants the resources to appear

       | `status`CustomResourceDefinitionStatus
       | status indicates the actual state of the CustomResourceDefinition

## CustomResourceDefinitionSpec {#CustomResourceDefinitionSpec}

CustomResourceDefinitionSpec describes how a user wants their resource to appear

   | Field | Description

       | `conversion`CustomResourceConversion
       | conversion defines conversion settings for the CRD.

       | `group` *string
       | group is the API group of the defined custom resource. The custom resources are served under `/apis/\<group>/...`. Must match the name of the CustomResourceDefinition (in the form `\<names.plural>.\<group>`).

       | `names` *CustomResourceDefinitionNames
       | names specify the resource and kind names for the custom resource.

       | `preserveUnknownFields`boolean
       | preserveUnknownFields indicates that object fields which are not specified in the OpenAPI schema should be preserved when persisting to storage. apiVersion, kind, metadata and known fields inside metadata are always preserved. This field is deprecated in favor of setting `x-preserve-unknown-fields` to true in `spec.versions[*].schema.openAPIV3Schema`. See https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/#field-pruning for details.

       | `scope` *string
       | scope indicates whether the defined custom resource is cluster- or namespace-scoped. Allowed values are `Cluster` and `Namespaced`.

       | `versions` *CustomResourceDefinitionVersion array
       | versions is the list of all API versions of the defined custom resource. Version names are used to compute the order in which served versions are listed in API discovery. If the version string is "kube-like", it will sort above non "kube-like" version strings, which are ordered lexicographically. "Kube-like" versions start with a "v", then are followed by a number (the major version), then optionally the string "alpha" or "beta" and another number (the minor version). These are sorted first by GA > beta > alpha (where GA is a version with no suffix such as beta or alpha), and then by comparing major version, then minor version. An example sorted list of versions: v10, v2, v1, v11beta2, v10beta3, v3beta1, v12alpha1, v11alpha2, foo1, foo10.

## CustomResourceDefinitionStatus {#CustomResourceDefinitionStatus}

CustomResourceDefinitionStatus indicates the state of the CustomResourceDefinition

   | Field | Description

       | `acceptedNames`CustomResourceDefinitionNames
       | acceptedNames are the names that are actually being used to serve discovery. They may be different than the names in spec.

       | `conditions`CustomResourceDefinitionCondition array
       | conditions indicate state for particular aspects of a CustomResourceDefinition

       | `observedGeneration`integer
       | The generation observed by the CRD controller.

       | `storedVersions`string array
       | storedVersions lists all versions of CustomResources that were ever persisted. Tracking these versions allows a migration path for stored versions in etcd. The field is mutable so a migration controller can finish a migration to another version (ensuring no old objects are left in storage), and then remove the rest of the versions from this list. Versions may not be removed from `spec.versions` while they exist in this list.

## CustomResourceDefinitionList {#CustomResourceDefinitionList}

CustomResourceDefinitionList is a list of CustomResourceDefinition objects.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *CustomResourceDefinition array
       | items list individual CustomResourceDefinition objects

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | Standard object's metadata More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

## CustomResourceColumnDefinition {#CustomResourceColumnDefinition}

CustomResourceColumnDefinition specifies a column for server side printing.

   | Field | Description

       | `description`string
       | description is a human readable description of this column.

       | `format`string
       | format is an optional OpenAPI type definition for this column. The 'name' format is applied to the primary identifier column to assist in clients identifying column is the resource name. See https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#data-types for details.

       | `jsonPath` *string
       | jsonPath is a simple JSON path (i.e. with array notation) which is evaluated against each custom resource to produce the value for this column.

       | `name` *string
       | name is a human readable name for the column.

       | `priority`integer
       | priority is an integer defining the relative importance of this column compared to others. Lower numbers are considered higher priority. Columns that may be omitted in limited space scenarios should be given a priority greater than 0.

       | `type` *string
       | type is an OpenAPI type definition for this column. See https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#data-types for details.

## CustomResourceConversion {#CustomResourceConversion}

CustomResourceConversion describes how to convert different versions of a CR.

   | Field | Description

       | `strategy` *string
       | strategy specifies how custom resources are converted between versions. Allowed values are: - `"None"`: The converter only change the apiVersion and would not touch any other field in the custom resource. - `"Webhook"`: API Server will call to an external webhook to do the conversion. Additional information   is needed for this option. This requires spec.preserveUnknownFields to be false, and spec.conversion.webhook to be set.

       | `webhook`WebhookConversion
       | webhook describes how to call the conversion webhook. Required when `strategy` is set to `"Webhook"`.

## CustomResourceDefinitionCondition {#CustomResourceDefinitionCondition}

CustomResourceDefinitionCondition contains details for the current condition of this pod.

   | Field | Description

       | `lastTransitionTime`Time
       | lastTransitionTime last time the condition transitioned from one status to another.

       | `message`string
       | message is a human-readable message indicating details about last transition.

       | `observedGeneration`integer
       | observedGeneration represents the .metadata.generation that the condition was set based upon. For instance, if .metadata.generation is currently 12, but the .status.conditions[x].observedGeneration is 9, the condition is out of date with respect to the current state of the instance.

       | `reason`string
       | reason is a unique, one-word, CamelCase reason for the condition's last transition.

       | `status` *string
       | status is the status of the condition. Can be True, False, Unknown.

       | `type` *string
       | type is the type of the condition. Types include Established, NamesAccepted and Terminating.

## CustomResourceDefinitionNames {#CustomResourceDefinitionNames}

CustomResourceDefinitionNames indicates the names to serve this CustomResourceDefinition

   | Field | Description

       | `categories`string array
       | categories is a list of grouped resources this custom resource belongs to (e.g. 'all'). This is published in API discovery documents, and used by clients to support invocations like `kubectl get all`.

       | `kind` *string
       | kind is the serialized kind of the resource. It is normally CamelCase and singular. Custom resource instances will use this value as the `kind` attribute in API calls.

       | `listKind`string
       | listKind is the serialized kind of the list for this resource. Defaults to "`kind`List".

       | `plural` *string
       | plural is the plural name of the resource to serve. The custom resources are served under `/apis/\<group>/\<version>/.../\<plural>`. Must match the name of the CustomResourceDefinition (in the form `\<names.plural>.\<group>`). Must be all lowercase.

       | `shortNames`string array
       | shortNames are short names for the resource, exposed in API discovery documents, and used by clients to support invocations like `kubectl get \<shortname>`. It must be all lowercase.

       | `singular`string
       | singular is the singular name of the resource. It must be all lowercase. Defaults to lowercased `kind`.

## CustomResourceDefinitionVersion {#CustomResourceDefinitionVersion}

CustomResourceDefinitionVersion describes a version for CRD.

   | Field | Description

       | `additionalPrinterColumns`CustomResourceColumnDefinition array
       | additionalPrinterColumns specifies additional columns returned in Table output. See https://kubernetes.io/docs/reference/using-api/api-concepts/#receiving-resources-as-tables for details. If no columns are specified, a single column displaying the age of the custom resource is used.

       | `deprecated`boolean
       | deprecated indicates this version of the custom resource API is deprecated. When set to true, API requests to this version receive a warning header in the server response. Defaults to false.

       | `deprecationWarning`string
       | deprecationWarning overrides the default warning returned to API clients. May only be set when `deprecated` is true. The default warning indicates this version is deprecated and recommends use of the newest served version of equal or greater stability, if one exists.

       | `name` *string
       | name is the version name, e.g. “v1”, “v2beta1”, etc. The custom resources are served under this version at `/apis/\<group>/\<version>/...` if `served` is true.

       | `schema`CustomResourceValidation
       | schema describes the schema used for validation, pruning, and defaulting of this version of the custom resource.

       | `selectableFields`SelectableField array
       | selectableFields specifies paths to fields that may be used as field selectors. A maximum of 8 selectable fields are allowed. See https://kubernetes.io/docs/concepts/overview/working-with-objects/field-selectors

       | `served` *boolean
       | served is a flag enabling/disabling this version from being served via REST APIs

       | `storage` *boolean
       | storage indicates this version should be used when persisting custom resources to storage. There must be exactly one version with storage=true.

       | `subresources`CustomResourceSubresources
       | subresources specify what subresources this version of the defined custom resource have.

## CustomResourceSubresourceScale {#CustomResourceSubresourceScale}

CustomResourceSubresourceScale defines how to serve the scale subresource for CustomResources.

   | Field | Description

       | `labelSelectorPath`string
       | labelSelectorPath defines the JSON path inside of a custom resource that corresponds to Scale `status.selector`. Only JSON paths without the array notation are allowed. Must be a JSON Path under `.status` or `.spec`. Must be set to work with HorizontalPodAutoscaler. The field pointed by this JSON path must be a string field (not a complex selector struct) which contains a serialized label selector in string form. More info: https://kubernetes.io/docs/tasks/access-kubernetes-api/custom-resources/custom-resource-definitions#scale-subresource If there is no value under the given path in the custom resource, the `status.selector` value in the `/scale` subresource will default to the empty string.

       | `specReplicasPath` *string
       | specReplicasPath defines the JSON path inside of a custom resource that corresponds to Scale `spec.replicas`. Only JSON paths without the array notation are allowed. Must be a JSON Path under `.spec`. If there is no value under the given path in the custom resource, the `/scale` subresource will return an error on GET.

       | `statusReplicasPath` *string
       | statusReplicasPath defines the JSON path inside of a custom resource that corresponds to Scale `status.replicas`. Only JSON paths without the array notation are allowed. Must be a JSON Path under `.status`. If there is no value under the given path in the custom resource, the `status.replicas` value in the `/scale` subresource will default to 0.

## CustomResourceSubresourceStatus {#CustomResourceSubresourceStatus}

CustomResourceSubresourceStatus defines how to serve the status subresource for CustomResources. Status is represented by the `.status` JSON path inside of a CustomResource. When set, * exposes a /status subresource for the custom resource * PUT requests to the /status subresource take a custom resource object, and ignore changes to anything except the status stanza * PUT/POST/PATCH requests to the custom resource ignore changes to the status stanza
