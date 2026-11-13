---
title: "Handle unmapped members during deserialization"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/system-text-json/missing-members.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Handle unmapped members during deserialization

By default, if the JSON payload you're deserializing contains properties that don't exist in the plain old CLR object (POCO) type, they're simply ignored. Starting in .NET 8, you can specify that *all payload properties must exist in the POCO*. If they're not, a `System.Text.Json.JsonException` exception is thrown during deserialization. You can configure this behavior in one of three ways:

- Annotate your POCO type with the `System.Text.Json.Serialization.JsonUnmappedMemberHandlingAttribute` attribute, specifying either to `System.Text.Json.Serialization.JsonUnmappedMemberHandling.Skip` or `System.Text.Json.Serialization.JsonUnmappedMemberHandling.Disallow` unmapped members.

  ```csharp
  [JsonUnmappedMemberHandling(JsonUnmappedMemberHandling.Disallow)]
  public class MyPoco
  {
       public int Id { get; set; }
  }

  JsonSerializer.Deserialize<MyPoco>("""{"Id" : 42, "AnotherId" : -1 }""");
  // JsonException : The JSON property 'AnotherId' could not be mapped to any .NET member contained in type 'MyPoco'.
  ```

- Set `System.Text.Json.JsonSerializerOptions.UnmappedMemberHandling` to either `System.Text.Json.Serialization.JsonUnmappedMemberHandling.Skip` or `System.Text.Json.Serialization.JsonUnmappedMemberHandling.Disallow`.
- Customize the `System.Text.Json.Serialization.Metadata.JsonTypeInfo` contract for the relevant type. (For information about customizing a contract, see Customize a JSON contract.)
