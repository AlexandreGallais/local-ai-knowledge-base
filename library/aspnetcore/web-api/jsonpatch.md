---
title: "JsonPatch in ASP.NET Core web API (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/web-api/jsonpatch.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# JSON Patch support in ASP.NET Core web API

This article explains how to handle JSON Patch requests in an ASP.NET Core web API.

JSON Patch support in ASP.NET Core web API is based on `System.Text.Json` serialization, and requires the `Microsoft.AspNetCore.JsonPatch.SystemTextJson` NuGet package.

## What is the JSON Patch standard?

The JSON Patch standard:

* Is a standard format for describing changes to apply to a JSON document.
* Is defined in RFC 6902 and is widely used in RESTful APIs to perform partial updates to JSON resources.
* Describes a sequence of operations that modify a JSON document such as:

  * `add`
  * `remove`
  * `replace`
  * `move`
  * `copy`
  * `test`

In web apps, JSON Patch is commonly used in a PATCH operation to perform partial updates of a resource. Rather than sending the entire resource for an update, clients can send a JSON Patch document containing only the changes. Patching reduces payload size and improves efficiency.

For an overview of the JSON Patch standard, see jsonpatch.com.

## JSON Patch support in ASP.NET Core web API

JSON Patch support in ASP.NET Core web API is based on `System.Text.Json` serialization, starting with .NET 10. It implements `Microsoft.AspNetCore.JsonPatch` based on `System.Text.Json` serialization. This feature:

* Requires the `Microsoft.AspNetCore.JsonPatch.SystemTextJson` NuGet package.
* Aligns with modern .NET practices by leveraging the `System.Text.Json` library, which is optimized for .NET.
* Provides improved performance and reduced memory usage compared to the legacy `Newtonsoft.Json`-based implementation. For more information on the legacy `Newtonsoft.Json`-based implementation, see the .NET 9 version of this article.

> **Note:**
> The implementation of `Microsoft.AspNetCore.JsonPatch` based on `System.Text.Json` serialization isn't a drop-in replacement for the legacy `Newtonsoft.Json`-based implementation. It doesn't support dynamic types, such as `System.Dynamic.ExpandoObject`.

> **Important:**
> The JSON Patch standard has ***inherent security risks***. Since these risks are inherent to the JSON Patch standard, the ASP.NET Core implementation ***doesn't attempt to mitigate inherent security risks***. It's the responsibility of the developer to ensure that the JSON Patch document is safe to apply to the target object. For more information, see the Mitigating Security Risks section.

## Enable JSON Patch support with `System.Text.Json`

To enable JSON Patch support with `System.Text.Json`, install the `Microsoft.AspNetCore.JsonPatch.SystemTextJson` NuGet package.

```dotnetcli
dotnet add package Microsoft.AspNetCore.JsonPatch.SystemTextJson
```

This package provides a `Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument`1` class to represent a JSON Patch document for objects of type `TModel` and custom logic for serializing and deserializing JSON Patch documents using `System.Text.Json`. The key method of the `Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument`1` class is `Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument.ApplyTo(System.Object)`, which applies the patch operations to a target object of type `TModel`.

## Minimal API PATCH endpoint applying JSON Patch

In a Minimal API, a PATCH endpoint for JSON Patch:

* Uses `MapPatch` to define the route.
* Accepts a `Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument`1` parameter.
* Calls `Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument.ApplyTo(System.Object)` on the patch document to apply the changes.

### Example Minimal API PATCH endpoint

```csharp
group.MapPatch("/{id}", async Task<Results<Ok<Customer>,ValidationProblem,NotFound<ProblemDetails>>> (AppDb db, string id,
    JsonPatchDocument<Customer> patchDoc) =>
{
    var customer = await db.Customers.Include(c => c.Orders).FirstOrDefaultAsync(c => c.Id == id);
    if (customer is null)
    {
        return TypedResults.NotFound<ProblemDetails>(new ());
    }
    if (patchDoc != null)
    {
        Dictionary<string, string[]>? errors = null;
        patchDoc.ApplyTo(customer, jsonPatchError =>
            {
                errors ??= new ();
                var key = jsonPatchError.AffectedObject.GetType().Name;
                if (!errors.ContainsKey(key))
                {
                    errors.Add(key, new string[] { });
                }
                errors[key] = errors[key].Append(jsonPatchError.ErrorMessage).ToArray();
            });

        if (errors != null)
        {
            return TypedResults.ValidationProblem(errors);
        }

        // Only save if there are no errors
        await db.SaveChangesAsync();
    }

    return TypedResults.Ok(customer);
})
.Accepts<JsonPatchDocument<Customer>>("application/json-patch+json");
```
This code from the sample app works with the following `Customer` and `Order` models:

```csharp
using System.ComponentModel.DataAnnotations;

namespace App.Models;

public class Customer
{
    public string Id { get; set; }
    public string? Name { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Address { get; set; }
    public List<Order>? Orders { get; set; }
    public Customer()
    {
        Id = Guid.NewGuid().ToString();
    }
}
```
```csharp
namespace App.Models;

public class Order
{
    public string Id { get; set; }
    public DateTime? OrderDate { get; set; }
    public DateTime? ShipDate { get; set; }
    public decimal TotalAmount { get; set; }

    public Order()
    {
        Id = Guid.NewGuid().ToString();
    }
}
```
The sample PATCH endpoint's key steps:

* **Retrieve the Customer**:
  * The endpoint retrieves a `Customer` object from the database `AppDb` using the provided `id`.
  * If no `Customer` object is found, it returns a `404 Not Found` response via `TypedResults.NotFound()`.
* **Apply JSON Patch**:
  * The `Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument.ApplyTo(System.Object)` method applies the JSON Patch operations from the `patchDoc` to the retrieved `Customer` object.
  * If errors occur during the patch application, such as invalid operations or conflicts, an error handling delegate captures them. This delegate collects error messages into a dictionary keyed by the type name of the affected object.
* **Return validation errors**:
  * If the error handling delegate captures any errors during the patch application, the endpoint returns a `ValidationProblem` response containing the error details via `TypedResults.ValidationProblem(errors)`.
* **Save and return the Updated Customer**:
  * If the patch is successfully applied with no errors, the changes are saved to the database and the endpoint returns the updated `Customer` object via `TypedResults.Ok(customer)`.

### Example error response

The following example shows the body of a validation problem response for a JSON Patch operation when the specified path is invalid:

```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "Customer": [
      "The target location specified by path segment 'foobar' was not found."
    ]
  }
}
```

## Apply a JSON Patch document to an object

The following examples demonstrate how to use the `Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument.ApplyTo(System.Object)` method to apply a JSON Patch document to an object.

### Example: Apply a `Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument`1` to an object

The following example demonstrates:

* The `add`, `replace`, and `remove` operations.
* Operations on nested properties.
* Adding a new item to an array.
* Using a JSON String Enum Converter in a JSON patch document.

```csharp
// Original object
var person = new Person {
    FirstName = "John",
    LastName = "Doe",
    Email = "johndoe@gmail.com",
    PhoneNumbers = [new() {Number = "123-456-7890", Type = PhoneNumberType.Mobile}],
    Address = new Address
    {
        Street = "123 Main St",
        City = "Anytown",
        State = "TX"
    }
};

// Raw JSON patch document
string jsonPatch = """
[
    { "op": "replace", "path": "/FirstName", "value": "Jane" },
    { "op": "remove", "path": "/Email"},
    { "op": "add", "path": "/Address/ZipCode", "value": "90210" },
    { "op": "add", "path": "/PhoneNumbers/-", "value": { "Number": "987-654-3210",
                                                                "Type": "Work" } }
]
""";

// Deserialize the JSON patch document
var patchDoc = JsonSerializer.Deserialize<JsonPatchDocument<Person>>(jsonPatch);

// Apply the JSON patch document
patchDoc!.ApplyTo(person);

// Output updated object
Console.WriteLine(JsonSerializer.Serialize(person, serializerOptions));
```

The previous example results in the following output of the updated object:

```output
{
    "firstName": "Jane",
    "lastName": "Doe",
    "address": {
        "street": "123 Main St",
        "city": "Anytown",
        "state": "TX",
        "zipCode": "90210"
    },
    "phoneNumbers": [
        {
            "number": "123-456-7890",
            "type": "Mobile"
        },
        {
            "number": "987-654-3210",
            "type": "Work"
        }
    ]
}
```

The `Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument.ApplyTo(System.Object)` method generally follows the conventions and options of `System.Text.Json` for processing the `Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument`1`, including the behavior controlled by the following options:

* `System.Text.Json.Serialization.JsonNumberHandling`: Whether numeric properties are read from strings.
* `System.Text.Json.JsonSerializerOptions.PropertyNameCaseInsensitive`: Whether property names are case-sensitive.

Key differences between `System.Text.Json` and the new `Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument`1` implementation:

* The runtime type of the target object, not the declared type, determines which properties `Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument.ApplyTo(System.Object)` patches.
* `System.Text.Json` deserialization relies on the declared type to identify eligible properties.

### Example: Apply a JsonPatchDocument with error handling

Various errors can occur when applying a JSON Patch document. For example, the target object might not have the specified property, or the value specified might be incompatible with the property type.

JSON `Patch` supports the `test` operation, which checks if a specified value equals the target property. If it doesn't, it returns an error.

The following example demonstrates how to handle these errors gracefully.

> **Important:**
> The object passed to the `Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument.ApplyTo(System.Object)` method is modified in place. The caller is responsible for discarding changes if any operation fails.

```csharp
// Original object
var person = new Person {
    FirstName = "John",
    LastName = "Doe",
    Email = "johndoe@gmail.com"
};

// Raw JSON patch document
string jsonPatch = """
[
    { "op": "replace", "path": "/Email", "value": "janedoe@gmail.com"},
    { "op": "test", "path": "/FirstName", "value": "Jane" },
    { "op": "replace", "path": "/LastName", "value": "Smith" }
]
""";

// Deserialize the JSON patch document
var patchDoc = JsonSerializer.Deserialize<JsonPatchDocument<Person>>(jsonPatch);

// Apply the JSON patch document, catching any errors
Dictionary<string, string[]>? errors = null;
patchDoc!.ApplyTo(person, jsonPatchError =>
    {
        errors ??= new ();
        var key = jsonPatchError.AffectedObject.GetType().Name;
        if (!errors.ContainsKey(key))
        {
            errors.Add(key, new string[] { });
        }
        errors[key] = errors[key].Append(jsonPatchError.ErrorMessage).ToArray();
    });
if (errors != null)
{
    // Print the errors
    foreach (var error in errors)
    {
        Console.WriteLine($"Error in {error.Key}: {string.Join(", ", error.Value)}");
    }
}

// Output updated object
Console.WriteLine(JsonSerializer.Serialize(person, serializerOptions));
```

The previous example results in the following output:

```output
Error in Person: The current value 'John' at path 'FirstName' is not equal 
to the test value 'Jane'.
{
    "firstName": "John",
    "lastName": "Smith",              <<< Modified!
    "email": "janedoe@gmail.com",     <<< Modified!
    "phoneNumbers": []
}
```

### Example: Construct a JSON Patch document using strongly-typed lambda expressions

In addition to specifying paths as string literals, `Microsoft.AspNetCore.JsonPatch.SystemTextJson.JsonPatchDocument`1` supports defining patch operations using strongly-typed lambda expressions. Strongly-typed lambda expressions:

* Provide compile-time verification that property paths and value types match the model.
* Eliminate runtime typographical errors, such a casing error, that can occur with string-based JSON Pointer paths.
* Automatically update property paths when renaming model properties during refactoring.

The following example demonstrates building a patch document using lambda expressions:

```csharp
var person = new Person
{
    FirstName = "John",
    LastName = "Doe",
    Email = "johndoe@example.com"
};

// Create a strongly typed JSON Patch document
var patchDoc = new JsonPatchDocument<Person>();

// Add operations using lambda expressions
patchDoc.Replace(p => p.FirstName, "Jane");
patchDoc.Replace(p => p.LastName, "Smith");
patchDoc.Replace(p => p.Email, "janesmith@example.com");

// Apply the patch document to the target object
patchDoc.ApplyTo(person);

Console.WriteLine($"{person.FirstName} {person.LastName} ({person.Email})");
```

The previous example results in the following output:

```output
Jane Smith (janesmith@example.com)
```
