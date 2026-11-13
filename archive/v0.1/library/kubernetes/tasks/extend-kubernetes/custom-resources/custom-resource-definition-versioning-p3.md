---
title: "Versions in CustomResourceDefinitions (part 3 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definition-versioning.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Versions in CustomResourceDefinitions (part 3 of 3)

## Webhook request and response

### Request

Webhooks are sent a POST request, with `Content-Type: application/json`,
with a `ConversionReview` API object in the `apiextensions.k8s.io` API group
serialized to JSON as the body.

Webhooks can specify what versions of `ConversionReview` objects they accept
with the `conversionReviewVersions` field in their CustomResourceDefinition:

**apiextensions.k8s.io/v1**
```yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
...
spec:
  ...
  conversion:
    strategy: Webhook
    webhook:
      conversionReviewVersions: ["v1", "v1beta1"]
      ...
```

`conversionReviewVersions` is a required field when creating
`apiextensions.k8s.io/v1` custom resource definitions.
Webhooks are required to support at least one `ConversionReview`
version understood by the current and previous API server.

**apiextensions.k8s.io/v1beta1**
```yaml
# Deprecated in v1.16 in favor of apiextensions.k8s.io/v1
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
...
spec:
  ...
  conversion:
    strategy: Webhook
    conversionReviewVersions: ["v1", "v1beta1"]
    ...
```

If no `conversionReviewVersions` are specified, the default when creating
`apiextensions.k8s.io/v1beta1` custom resource definitions is `v1beta1`.

API servers send the first `ConversionReview` version in the `conversionReviewVersions` list they support.
If none of the versions in the list are supported by the API server, the custom resource definition will not be allowed to be created.
If an API server encounters a conversion webhook configuration that was previously created and does not support any of the `ConversionReview`
versions the API server knows how to send, attempts to call to the webhook will fail.

This example shows the data contained in an `ConversionReview` object
for a request to convert `CronTab` objects to `example.com/v1`:

**apiextensions.k8s.io/v1**
```yaml
{
  "apiVersion": "apiextensions.k8s.io/v1",
  "kind": "ConversionReview",
  "request": {
    # Random uid uniquely identifying this conversion call
    "uid": "705ab4f5-6393-11e8-b7cc-42010a800002",
    
    # The API group and version the objects should be converted to
    "desiredAPIVersion": "example.com/v1",
    
    # The list of objects to convert.
    # May contain one or more objects, in one or more versions.
    "objects": [
      {
        "kind": "CronTab",
        "apiVersion": "example.com/v1beta1",
        "metadata": {
          "creationTimestamp": "2019-09-04T14:03:02Z",
          "name": "local-crontab",
          "namespace": "default",
          "resourceVersion": "143",
          "uid": "3415a7fc-162b-4300-b5da-fd6083580d66"
        },
        "hostPort": "localhost:1234"
      },
      {
        "kind": "CronTab",
        "apiVersion": "example.com/v1beta1",
        "metadata": {
          "creationTimestamp": "2019-09-03T13:02:01Z",
          "name": "remote-crontab",
          "resourceVersion": "12893",
          "uid": "359a83ec-b575-460d-b553-d859cedde8a0"
        },
        "hostPort": "example.com:2345"
      }
    ]
  }
}
```

**apiextensions.k8s.io/v1beta1**
```yaml
{
  # Deprecated in v1.16 in favor of apiextensions.k8s.io/v1
  "apiVersion": "apiextensions.k8s.io/v1beta1",
  "kind": "ConversionReview",
  "request": {
    # Random uid uniquely identifying this conversion call
    "uid": "705ab4f5-6393-11e8-b7cc-42010a800002",
    
    # The API group and version the objects should be converted to
    "desiredAPIVersion": "example.com/v1",
    
    # The list of objects to convert.
    # May contain one or more objects, in one or more versions.
    "objects": [
      {
        "kind": "CronTab",
        "apiVersion": "example.com/v1beta1",
        "metadata": {
          "creationTimestamp": "2019-09-04T14:03:02Z",
          "name": "local-crontab",
          "namespace": "default",
          "resourceVersion": "143",
          "uid": "3415a7fc-162b-4300-b5da-fd6083580d66"
        },
        "hostPort": "localhost:1234"
      },
      {
        "kind": "CronTab",
        "apiVersion": "example.com/v1beta1",
        "metadata": {
          "creationTimestamp": "2019-09-03T13:02:01Z",
          "name": "remote-crontab",
          "resourceVersion": "12893",
          "uid": "359a83ec-b575-460d-b553-d859cedde8a0"
        },
        "hostPort": "example.com:2345"
      }
    ]
  }
}
```

### Response

Webhooks respond with a 200 HTTP status code, `Content-Type: application/json`,
and a body containing a `ConversionReview` object (in the same version they were sent),
with the `response` stanza populated, serialized to JSON.

If conversion succeeds, a webhook should return a `response` stanza containing the following fields:
* `uid`, copied from the `request.uid` sent to the webhook
* `result`, set to `{"status":"Success"}`
* `convertedObjects`, containing all of the objects from `request.objects`, converted to `request.desiredAPIVersion`

Example of a minimal successful response from a webhook:

**apiextensions.k8s.io/v1**
```yaml
{
  "apiVersion": "apiextensions.k8s.io/v1",
  "kind": "ConversionReview",
  "response": {
    # must match <request.uid>
    "uid": "705ab4f5-6393-11e8-b7cc-42010a800002",
    "result": {
      "status": "Success"
    },
    # Objects must match the order of request.objects, and have apiVersion set to <request.desiredAPIVersion>.
    # kind, metadata.uid, metadata.name, and metadata.namespace fields must not be changed by the webhook.
    # metadata.labels and metadata.annotations fields may be changed by the webhook.
    # All other changes to metadata fields by the webhook are ignored.
    "convertedObjects": [
      {
        "kind": "CronTab",
        "apiVersion": "example.com/v1",
        "metadata": {
          "creationTimestamp": "2019-09-04T14:03:02Z",
          "name": "local-crontab",
          "namespace": "default",
          "resourceVersion": "143",
          "uid": "3415a7fc-162b-4300-b5da-fd6083580d66"
        },
        "host": "localhost",
        "port": "1234"
      },
      {
        "kind": "CronTab",
        "apiVersion": "example.com/v1",
        "metadata": {
          "creationTimestamp": "2019-09-03T13:02:01Z",
          "name": "remote-crontab",
          "resourceVersion": "12893",
          "uid": "359a83ec-b575-460d-b553-d859cedde8a0"
        },
        "host": "example.com",
        "port": "2345"
      }
    ]
  }
}
```

**apiextensions.k8s.io/v1beta1**
```yaml
{
  # Deprecated in v1.16 in favor of apiextensions.k8s.io/v1
  "apiVersion": "apiextensions.k8s.io/v1beta1",
  "kind": "ConversionReview",
  "response": {
    # must match <request.uid>
    "uid": "705ab4f5-6393-11e8-b7cc-42010a800002",
    "result": {
      "status": "Failed"
    },
    # Objects must match the order of request.objects, and have apiVersion set to <request.desiredAPIVersion>.
    # kind, metadata.uid, metadata.name, and metadata.namespace fields must not be changed by the webhook.
    # metadata.labels and metadata.annotations fields may be changed by the webhook.
    # All other changes to metadata fields by the webhook are ignored.
    "convertedObjects": [
      {
        "kind": "CronTab",
        "apiVersion": "example.com/v1",
        "metadata": {
          "creationTimestamp": "2019-09-04T14:03:02Z",
          "name": "local-crontab",
          "namespace": "default",
          "resourceVersion": "143",
          "uid": "3415a7fc-162b-4300-b5da-fd6083580d66"
        },
        "host": "localhost",
        "port": "1234"
      },
      {
        "kind": "CronTab",
        "apiVersion": "example.com/v1",
        "metadata": {
          "creationTimestamp": "2019-09-03T13:02:01Z",
          "name": "remote-crontab",
          "resourceVersion": "12893",
          "uid": "359a83ec-b575-460d-b553-d859cedde8a0"
        },
        "host": "example.com",
        "port": "2345"
      }
    ]
  }
}
```

If conversion fails, a webhook should return a `response` stanza containing the following fields:
* `uid`, copied from the `request.uid` sent to the webhook
* `result`, set to `{"status":"Failed"}`

**Warning:**
Failing conversion can disrupt read and write access to the custom resources,
including the ability to update or delete the resources. Conversion failures
should be avoided whenever possible, and should not be used to enforce validation
 constraints (use validation schemas or webhook admission instead).

Example of a response from a webhook indicating a conversion request failed, with an optional message:

**apiextensions.k8s.io/v1**
```yaml
{
  "apiVersion": "apiextensions.k8s.io/v1",
  "kind": "ConversionReview",
  "response": {
    "uid": "<value from request.uid>",
    "result": {
      "status": "Failed",
      "message": "hostPort could not be parsed into a separate host and port"
    }
  }
}
```

**apiextensions.k8s.io/v1beta1**
```yaml
{
  # Deprecated in v1.16 in favor of apiextensions.k8s.io/v1
  "apiVersion": "apiextensions.k8s.io/v1beta1",
  "kind": "ConversionReview",
  "response": {
    "uid": "<value from request.uid>",
    "result": {
      "status": "Failed",
      "message": "hostPort could not be parsed into a separate host and port"
    }
  }
}
```

## Writing, reading, and updating versioned CustomResourceDefinition objects

When an object is written, it is stored at the version designated as the
storage version at the time of the write. If the storage version changes,
existing objects are never converted automatically. However, newly-created
or updated objects are written at the new storage version. It is possible for an
object to have been written at a version that is no longer served.

When you read an object, you specify the version as part of the path.
You can request an object at any version that is currently served.
If you specify a version that is different from the object's stored version,
Kubernetes returns the object to you at the version you requested, but the
stored object is not changed on disk.

What happens to the object that is being returned while serving the read
request depends on what is specified in the CRD's `spec.conversion`:
- if the default `strategy` value `None` is specified, the only modifications
  to the object are changing the `apiVersion` string and perhaps pruning
  unknown fields
  (depending on the configuration). Note that this is unlikely to lead to good
  results if the schemas differ between the storage and requested version.
  In particular, you should not use this strategy if the same data is
  represented in different fields between versions.
- if webhook conversion is specified, then this
  mechanism controls the conversion.

If you update an existing object, it is rewritten at the version that is
currently the storage version. This is the only way that objects can change from
one version to another.

To illustrate this, consider the following hypothetical series of events:

1. The storage version is `v1beta1`. You create an object. It is stored at version `v1beta1`
2. You add version `v1` to your CustomResourceDefinition and designate it as
   the storage version. Here the schemas for `v1` and `v1beta1` are identical,
   which is typically the case when promoting an API to stable in the
   Kubernetes ecosystem.
3. You read your object at version `v1beta1`, then you read the object again at
   version `v1`. Both returned objects are identical except for the apiVersion
   field.
4. You create a new object. It is stored at version `v1`. You now
   have two objects, one of which is at `v1beta1`, and the other of which is at
   `v1`.
5. You update the first object. It is now stored at version `v1` since that
   is the current storage version.

### Previous storage versions

The API server records each version which has ever been marked as the storage
version in the status field `storedVersions`. Objects may have been stored
at any version that has ever been designated as a storage version. No objects
can exist in storage at a version that has never been a storage version.

## Upgrade existing objects to a new stored version

When deprecating versions and dropping support, select a storage upgrade
procedure.

*Option 1:* Use Storage Version Migration

1. Run Storage Version Migration for the custom resource.

   For example, you can include a `StorageVersionMigration` resource in the same manifest as your updated `CustomResourceDefinition`:

   ```yaml
   apiVersion: apiextensions.k8s.io/v1
   kind: CustomResourceDefinition
   metadata:
     name: crontabs.example.com
   spec:
     group: example.com
     ...
   ---
   apiVersion: storagemigration.k8s.io/v1
   kind: StorageVersionMigration
   metadata:
     name: crontabs-migration
   spec:
     resource:
       group: example.com
       resource: crontabs
   ```

2. Once the migration succeeds, the old version will be removed from the CustomResourceDefinition `status.storedVersions` field.

*Option 2:* Manually upgrade the existing objects to a new stored version

The following is an example procedure to upgrade from `v1beta1` to `v1`.

1. Set `v1` as the storage in the CustomResourceDefinition file and apply it
   using kubectl. The `storedVersions` is now `v1beta1, v1`.
2. Write an upgrade procedure to list all existing objects and write them with
   the same content. This forces the backend to write objects in the current
   storage version, which is `v1`.
3. Remove `v1beta1` from the CustomResourceDefinition `status.storedVersions` field.

**Note:**
Here is an example of how to patch the `status` subresource for a CRD object using `kubectl`:
```bash
kubectl patch customresourcedefinitions <CRD_Name> --subresource='status' --type='merge' -p '{"status":{"storedVersions":["v1"]}}'
```
