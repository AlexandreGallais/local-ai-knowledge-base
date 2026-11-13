---
title: "Kubernetes API Concepts (part 5 of 7)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/using-api/api-concepts.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubernetes API Concepts (part 5 of 7)

## Updates to existing resources {#patch-and-apply}

Kubernetes provides several ways to update existing objects.
You can read choosing an update mechanism to
learn about which approach might be best for your use case.

You can overwrite (**update**) an existing resource - for example, a ConfigMap -
using an HTTP PUT. For a PUT request, it is the client's responsibility to specify
the `resourceVersion` (taking this from the object being updated). Kubernetes uses
that `resourceVersion` information so that the API server can detect lost updates
and reject requests made by a client that is out of date with the cluster.
In the event that the resource has changed (the `resourceVersion` the client
provided is stale), the API server returns a `409 Conflict` error response.

Instead of sending a PUT request, the client can send an instruction to the API
server to **patch** an existing resource. A **patch** is typically appropriate
if the change that the client wants to make isn't conditional on the existing data.
Clients that need effective detection of lost updates should consider
making their request conditional on the existing `resourceVersion` (either HTTP PUT or HTTP PATCH),
and then handle any retries that are needed in case there is a conflict.

The Kubernetes API supports four different PATCH operations, determined by their
corresponding HTTP `Content-Type` header:

`application/apply-patch+yaml`
: Server Side Apply YAML (a Kubernetes-specific extension, based on YAML).
  All JSON documents are valid YAML, so you can also submit JSON using this
  media type. See Server Side Apply serialization
  for more details.
  To Kubernetes, this is a **create** operation if the object does not exist,
  or a **patch** operation if the object already exists.

`application/json-patch+json`
: JSON Patch, as defined in RFC6902.
  A JSON patch is a sequence of operations that are executed on the resource;
  for example `{"op": "add", "path": "/a/b/c", "value": [ "foo", "bar" ]}`.
  To Kubernetes, this is a **patch** operation.

  A **patch** using `application/json-patch+json` can include conditions to
  validate consistency, allowing the operation to fail if those conditions
  are not met (for example, to avoid a lost update).

`application/merge-patch+json`
: JSON Merge Patch, as defined in RFC7386.
  A JSON Merge Patch is essentially a partial representation of the resource.
  The submitted JSON is combined with the current resource to create a new one,
  then the new one is saved.
  To Kubernetes, this is a **patch** operation.

`application/strategic-merge-patch+json`
: Strategic Merge Patch (a Kubernetes-specific extension based on JSON).
  Strategic Merge Patch is a custom implementation of JSON Merge Patch.
  You can only use Strategic Merge Patch with built-in APIs, or with aggregated
  API servers that have special support for it. You cannot use
  `application/strategic-merge-patch+json` with any API
  defined using a CustomResourceDefinition.

  **Note:**
  The Kubernetes _server side apply_ mechanism has superseded Strategic Merge
  Patch.

Kubernetes' Server Side Apply
feature allows the control plane to track managed fields for newly created objects.
Server Side Apply provides a clear pattern for managing field conflicts,
offers server-side **apply** and **update** operations, and replaces the
client-side functionality of `kubectl apply`.

For Server-Side Apply, Kubernetes treats the request as a **create** if the object
does not yet exist, and a **patch** otherwise. For other requests that use PATCH
at the HTTP level, the logical Kubernetes operation is always **patch**.

See Server Side Apply for more details.

### Choosing an update mechanism {#update-mechanism-choose}

#### HTTP PUT to replace existing resource {#update-mechanism-update}

The **update** (HTTP `PUT`) operation is simple to implement and flexible,
but has drawbacks:

* You need to handle conflicts where the `resourceVersion` of the object changes
  between your client reading it and trying to write it back. Kubernetes always
  detects the conflict, but you as the client author need to implement retries.
* You might accidentally drop fields if you decode an object locally (for example,
  using client-go, you could receive fields that your client does not know how to
  handle - and then drop them as part of your update.
* If there's a lot of contention on the object (even on a field, or set of fields,
  that you're not trying to edit), you might have trouble sending the update.
  The problem is worse for larger objects and for objects with many fields.

#### HTTP PATCH using JSON Patch {#update-mechanism-json-patch}

A **patch** update is helpful, because:

* As you're only sending differences, you have less data to send in the `PATCH`
  request.
* You can make changes that rely on existing values, such as copying the
  value of a particular field into an annotation.
* Unlike with an **update** (HTTP `PUT`), making your change can happen right away
  even if there are frequent changes to unrelated fields): you usually would
  not need to retry.
  * You might still need to specify the `resourceVersion` (to match an existing object)
    if you want to be extra careful to avoid lost updates
  * It's still good practice to write in some retry logic in case of errors.
* You can use test conditions to careful craft specific update conditions.
  For example, you can increment a counter without reading it if the existing
  value matches what you expect. You can do this with no lost update risk,
  even if the object has changed in other ways since you last wrote to it.
  (If the test condition fails, you can fall back to reading the current value
  and then write back the changed number).

However:

* You need more local (client) logic to build the patch; it helps a lot if you have
  a library implementation of JSON Patch, or even for making a JSON Patch specifically against Kubernetes.
* As the author of client software, you need to be careful when building the patch
  (the HTTP request body) not to drop fields (the order of operations matters).

#### HTTP PATCH using Server-Side Apply {#update-mechanism-server-side-apply}

Server-Side Apply has some clear benefits:

* A single round trip: it rarely requires making a `GET` request first.
  * and you can still detect conflicts for unexpected changes
  * you have the option to force override a conflict, if appropriate
* Client implementations are easy to make.
* You get an atomic create-or-update operation without extra effort
  (similar to `UPSERT` in some SQL dialects).

However:

* Server-Side Apply does not work at all for field changes that depend on a current value of the object.
* You can only apply updates to objects. Some resources in the Kubernetes HTTP API are
  not objects (they do not have a `.metadata` field), and Server-Side Apply
  is only relevant for Kubernetes objects.
