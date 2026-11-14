---
title: "How to preserve references in System.Text.Json"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/serialization/system-text-json/preserve-references.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to preserve references and handle or ignore circular references in System.Text.Json

This article shows how to preserve references and handle or ignore circular references while using System.Text.Json to serialize and deserialize JSON in .NET

## Preserve references and handle circular references

To preserve references and handle circular references, set `System.Text.Json.JsonSerializerOptions.ReferenceHandler*` to `System.Text.Json.Serialization.ReferenceHandler.Preserve*`. This setting causes the following behavior:

* On serialize:

  When writing complex types, the serializer also writes metadata properties (`$id`, `$values`, and `$ref`).

* On deserialize:

  Metadata is expected (although not mandatory), and the deserializer tries to understand it.

The following code illustrates use of the `Preserve` setting.

```csharp
﻿using System.Text.Json;
using System.Text.Json.Serialization;

namespace PreserveReferences
{
    public class Employee
    {
        public string? Name { get; set; }
        public Employee? Manager { get; set; }
        public List<Employee>? DirectReports { get; set; }
    }

    public class Program
    {
        public static void Run()
        {
            Employee tyler = new()
            {
                Name = "Tyler Stein"
            };

            Employee adrian = new()
            {
                Name = "Adrian King"
            };

            tyler.DirectReports = [adrian];
            adrian.Manager = tyler;

            JsonSerializerOptions options = new()
            {
                ReferenceHandler = ReferenceHandler.Preserve,
                WriteIndented = true
            };

            string tylerJson = JsonSerializer.Serialize(tyler, options);
            Console.WriteLine($"Tyler serialized:\n{tylerJson}");

            Employee? tylerDeserialized =
                JsonSerializer.Deserialize<Employee>(tylerJson, options);

            Console.WriteLine(
                "Tyler is manager of Tyler's first direct report: ");
            Console.WriteLine(
                tylerDeserialized?.DirectReports?[0].Manager == tylerDeserialized);
        }
    }
}

// Produces output like the following example:
//
//Tyler serialized:
//{
//  "$id": "1",
//  "Name": "Tyler Stein",
//  "Manager": null,
//  "DirectReports": {
//    "$id": "2",
//    "$values": [
//      {
//        "$id": "3",
//        "Name": "Adrian King",
//        "Manager": {
//          "$ref": "1"
//        },
//        "DirectReports": null
//      }
//    ]
//  }
//}
//Tyler is manager of Tyler's first direct report:
//True
```
```vb
﻿Imports System.Text.Json
Imports System.Text.Json.Serialization

Namespace PreserveReferences

    Public Class Employee
        Public Property Name As String
        Public Property Manager As Employee
        Public Property DirectReports As List(Of Employee)
    End Class

    Public NotInheritable Class Program

        Public Shared Sub Main()
            Dim tyler As New Employee

            Dim adrian As New Employee

            tyler.DirectReports = New List(Of Employee) From {
                adrian}
            adrian.Manager = tyler

            Dim options As New JsonSerializerOptions With {
                .ReferenceHandler = ReferenceHandler.Preserve,
                .WriteIndented = True
            }

            Dim tylerJson As String = JsonSerializer.Serialize(tyler, options)
            Console.WriteLine($"Tyler serialized:{tylerJson}")

            Dim tylerDeserialized As Employee = JsonSerializer.Deserialize(Of Employee)(tylerJson, options)

            Console.WriteLine(
                "Tyler is manager of Tyler's first direct report: ")
            Console.WriteLine(
                tylerDeserialized.DirectReports(0).Manager Is tylerDeserialized)
        End Sub

    End Class

End Namespace

' Produces output like the following example:
'
'Tyler serialized:
'{
'  "$id": "1",
'  "Name": "Tyler Stein",
'  "Manager": null,
'  "DirectReports": {
'    "$id": "2",
'    "$values": [
'      {
'        "$id": "3",
'        "Name": "Adrian King",
'        "Manager": {
'          "$ref": "1"
'        },
'        "DirectReports": null
'      }
'    ]
'  }
'}
'Tyler is manager of Tyler's first direct report:
'True
```
This feature can't be used to preserve value types or immutable types. On deserialization, the instance of an immutable type is created after the entire payload is read. So it would be impossible to deserialize the same instance if a reference to it appears within the JSON payload.

For value types, immutable types, and arrays, no reference metadata is serialized. On deserialization, an exception is thrown if `$ref` or `$id` is found. However, value types ignore `$id` (and `$values` in the case of collections) to make it possible to deserialize payloads that were serialized by using Newtonsoft.Json, which does serialize metadata for such types.

To determine if objects are equal, System.Text.Json uses `System.Collections.Generic.ReferenceEqualityComparer.Instance*`, which uses reference equality (`System.Object.ReferenceEquals(System.Object,System.Object)`) instead of value equality (`System.Object.Equals(System.Object)`) when comparing two object instances.

For more information about how references are serialized and deserialized, see `System.Text.Json.Serialization.ReferenceHandler.Preserve*`.

The `System.Text.Json.Serialization.ReferenceResolver` class defines the behavior of preserving references on serialization and deserialization. Create a derived class to specify custom behavior. For an example, see GuidReferenceResolver.

### Persist reference metadata across multiple serialization and deserialization calls

By default, reference data is only cached for each call to `System.Text.Json.JsonSerializer.Serialize*` or `System.Text.Json.JsonSerializer.Deserialize*`. To persist references from one `Serialize` or `Deserialize` call to another one, root the `System.Text.Json.Serialization.ReferenceResolver` instance in the call site of `Serialize`/`Deserialize`. The following code shows an example for this scenario:

* You have a list of `Employee` objects and you have to serialize each one individually.
* You want to take advantage of the references saved in the resolver for the `ReferenceHandler`.

Here is the `Employee` class:

```csharp
public class Employee
{
    public string? Name { get; set; }
    public Employee? Manager { get; set; }
    public List<Employee>? DirectReports { get; set; }
}
```
A class that derives from `System.Text.Json.Serialization.ReferenceResolver` stores the references in a dictionary:

```csharp
class MyReferenceResolver : ReferenceResolver
{
    private uint _referenceCount;
    private readonly Dictionary<string, object> _referenceIdToObjectMap = [];
    private readonly Dictionary<object, string> _objectToReferenceIdMap = new (ReferenceEqualityComparer.Instance);

    public override void AddReference(string referenceId, object value)
    {
        if (!_referenceIdToObjectMap.TryAdd(referenceId, value))
        {
            throw new JsonException();
        }
    }

    public override string GetReference(object value, out bool alreadyExists)
    {
        if (_objectToReferenceIdMap.TryGetValue(value, out string? referenceId))
        {
            alreadyExists = true;
        }
        else
        {
            _referenceCount++;
            referenceId = _referenceCount.ToString();
            _objectToReferenceIdMap.Add(value, referenceId);
            alreadyExists = false;
        }

        return referenceId;
    }

    public override object ResolveReference(string referenceId)
    {
        if (!_referenceIdToObjectMap.TryGetValue(referenceId, out object? value))
        {
            throw new JsonException();
        }

        return value;
    }
}
```
A class that derives from `System.Text.Json.Serialization.ReferenceHandler` holds an instance of `MyReferenceResolver` and creates a new instance only when needed (in a method named `Reset` in this example):

```csharp
class MyReferenceHandler : ReferenceHandler
{
    public MyReferenceHandler() => Reset();
    private ReferenceResolver? _rootedResolver;
    public override ReferenceResolver CreateResolver() => _rootedResolver!;
    public void Reset() => _rootedResolver = new MyReferenceResolver();
}
```
When the sample code calls the serializer, it uses a `System.Text.Json.JsonSerializerOptions` instance in which the `System.Text.Json.JsonSerializerOptions.ReferenceHandler` property is set to an instance of `MyReferenceHandler`. When you follow this pattern, be sure to reset the `ReferenceResolver` dictionary when you're finished serializing, to keep it from growing forever.

```csharp
var options = new JsonSerializerOptions
{
    WriteIndented = true
};
var myReferenceHandler = new MyReferenceHandler();
options.ReferenceHandler = myReferenceHandler;

string json;
foreach (Employee emp in employees)
{
    json = JsonSerializer.Serialize(emp, options);
    DoSomething(json);
}

// Reset after serializing to avoid out of bounds memory growth in the resolver.
myReferenceHandler.Reset();
```
## Ignore circular references

Instead of handling circular references, you can ignore them. To ignore circular references, set `System.Text.Json.JsonSerializerOptions.ReferenceHandler*` to `System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles*`. The serializer sets circular reference properties to `null`, as shown in the following example:

```csharp
﻿using System.Text.Json;
using System.Text.Json.Serialization;

namespace SerializeIgnoreCycles
{
    public class Employee
    {
        public string? Name { get; set; }
        public Employee? Manager { get; set; }
        public List<Employee>? DirectReports { get; set; }
    }

    public class Program
    {
        public static void Main()
        {
            Employee tyler = new()
            {
                Name = "Tyler Stein"
            };

            Employee adrian = new()
            {
                Name = "Adrian King"
            };

            tyler.DirectReports = new List<Employee> { adrian };
            adrian.Manager = tyler;

            JsonSerializerOptions options = new()
            {
                ReferenceHandler = ReferenceHandler.IgnoreCycles,
                WriteIndented = true
            };

            string tylerJson = JsonSerializer.Serialize(tyler, options);
            Console.WriteLine($"Tyler serialized:\n{tylerJson}");

            Employee? tylerDeserialized =
                JsonSerializer.Deserialize<Employee>(tylerJson, options);

            Console.WriteLine(
                "Tyler is manager of Tyler's first direct report: ");
            Console.WriteLine(
                tylerDeserialized?.DirectReports?[0]?.Manager == tylerDeserialized);
        }
    }
}

// Produces output like the following example:
//
//Tyler serialized:
//{
//  "Name": "Tyler Stein",
//  "Manager": null,
//  "DirectReports": [
//    {
//      "Name": "Adrian King",
//      "Manager": null,
//      "DirectReports": null
//    }
//  ]
//}
//Tyler is manager of Tyler's first direct report:
//False
```
In the preceding example, `Manager` under `Adrian King` is serialized as `null` to avoid the circular reference. This behavior has the following advantages over `System.Text.Json.Serialization.ReferenceHandler.Preserve*`:

* It decreases payload size.
* It creates JSON that is comprehensible for serializers other than System.Text.Json and Newtonsoft.Json.

This behavior has the following disadvantages:

* Silent loss of data.
* Data can't make a round trip from JSON back to the source object.

## See also

* System.Text.Json overview
* How to serialize and deserialize JSON
