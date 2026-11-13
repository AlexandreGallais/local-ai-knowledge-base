---
title: "JsonPatch in ASP.NET Core web API (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/web-api/jsonpatch.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# JsonPatch in ASP.NET Core web API (part 2 of 2)

## Mitigating security risks

When using the `Microsoft.AspNetCore.JsonPatch.SystemTextJson` package, it's critical to understand and mitigate potential security risks. The following sections outline the identified security risks associated with JSON Patch and provide recommended mitigations to ensure secure usage of the package.

> **Important:**
> ***This is not an exhaustive list of threats.*** App developers must conduct their own threat model reviews to determine an app-specific comprehensive list and come up with appropriate mitigations as needed. For example, apps which expose collections to patch operations should consider the potential for algorithmic complexity attacks if those operations insert or remove elements at the beginning of the collection.

To minimize security risks when integrating JSON Patch functionality into their apps, developers should:

* Run comprehensive threat models for their own apps.
* Address identified threats.
* Follow the recommended mitigations in the following sections.

### Denial of Service (DoS) via memory amplification

* **Scenario**: A malicious client submits a `copy` operation that duplicates large object graphs multiple times, leading to excessive memory consumption.
* **Impact**: Potential Out-Of-Memory (OOM) conditions, causing service disruptions.
* **Mitigation**:
  * Validate incoming JSON Patch documents for size and structure before calling `Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument.ApplyTo(System.Object)`.
  * The validation must be app specific, but an example validation can look similar to the following:

```csharp
public void Validate(JsonPatchDocument<T> patch)
{
    // This is just an example. It's up to the developer to make sure that
    // this case is handled properly, based on the app needs.
    if (patch.Operations.Where(op=>op.OperationType == OperationType.Copy).Count()
                              > MaxCopyOperationsCount)
    {
        throw new InvalidOperationException();
    }
}
```

### Business logic subversion

* **Scenario**: Patch operations can manipulate fields with implicit invariants (for example, internal flags, IDs, or computed fields), violating business constraints.
* **Impact**: Data integrity issues and unintended app behavior.
* **Mitigation**:
  * Use POCOs (Plain Old CLR Objects) with explicitly defined properties that are safe to modify.
    * Avoid exposing sensitive or security-critical properties in the target object.
    * If a POCO object isn't used, validate the patched object after applying operations to ensure business rules and invariants aren't violated.

### Authentication and authorization

* **Scenario**: Unauthenticated or unauthorized clients send malicious JSON Patch requests.
* **Impact**: Unauthorized access to modify sensitive data or disrupt app behavior.
* **Mitigation**:
  * Protect endpoints that accept JSON Patch requests by using proper authentication and authorization mechanisms.
  * Restrict access to trusted clients or users with appropriate permissions.

## Get the code

View or download sample code. (How to download).

To test the sample, run the app and send HTTP requests by using the included `.http` file.

## Related content

* IETF RFC 5789 PATCH method specification
* IETF RFC 6902 JSON Patch specification
* IETF RFC 6901 JSON Pointer
* ASP.NET Core JSON Patch source code
