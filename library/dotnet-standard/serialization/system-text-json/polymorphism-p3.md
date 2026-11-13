---
title: "How to serialize properties of derived classes with System.Text.Json (part 3 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/system-text-json/polymorphism.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to serialize properties of derived classes with System.Text.Json (part 3 of 3)

## Infer polymorphism from a closed hierarchy

Starting in .NET 11, `System.Text.Json` can infer derived types from a C# 15 closed hierarchy. Enable inference on one hierarchy through `System.Text.Json.Serialization.JsonPolymorphicAttribute.InferClosedTypePolymorphism`:

```csharp
[JsonPolymorphic(InferClosedTypePolymorphism = true)]
public closed class Shape { }
public sealed class Circle : Shape { }
public sealed class Square : Shape { }
```

The serializer registers each derived type and uses its simple type name as a string discriminator. For example, a `Circle` payload contains `"$type":"Circle"`.

To enable inference for every closed hierarchy that an options instance handles, set `System.Text.Json.JsonSerializerOptions.InferClosedTypePolymorphism`:

```csharp
var options = new JsonSerializerOptions
{
    InferClosedTypePolymorphism = true
};
```

For source generation, set `System.Text.Json.Serialization.JsonSourceGenerationOptionsAttribute.InferClosedTypePolymorphism`:

```csharp
[JsonSourceGenerationOptions(InferClosedTypePolymorphism = true)]
[JsonSerializable(typeof(Shape))]
internal partial class AppJsonContext : JsonSerializerContext;
```

Set inference on the source-generation attribute when you use a generated context. Enabling only the runtime `JsonSerializerOptions` property can't add derived-type metadata that the source generator didn't emit.

The type-level attribute takes precedence over the global setting. Set `InferClosedTypePolymorphism = false` on `System.Text.Json.Serialization.JsonPolymorphicAttribute` to opt one hierarchy out of a global setting.

Explicit `System.Text.Json.Serialization.JsonDerivedTypeAttribute` registrations replace inference for that hierarchy. They don't extend the inferred list. Applying `InferClosedTypePolymorphism = true` to a type that isn't `closed` throws an `System.InvalidOperationException` with reflection-based serialization and produces a source-generation error. Inferred types with duplicate simple names produce discriminator collisions, and every inferred type must be at least as accessible as the closed base.

## Configure open generic derived types

Starting in .NET 11, `System.Text.Json.Serialization.JsonDerivedTypeAttribute` accepts an open generic derived type when the serializer can resolve a unique closed type from the serialized base type:

```csharp
[JsonDerivedType(typeof(Derived<>), "derived")]
public class Base<T>;
public class Derived<T> : Base<T>;
```

```vb
<JsonDerivedType(GetType(Derived(Of )), "derived")>
Public Class Base(Of T)
End Class
Public Class Derived(Of T)
    Inherits Base(Of T)
End Class
```

For `Base<int>`, the serializer registers `Derived<int>`. The same resolution supports generic interfaces, reordered type parameters, nested generic arguments, arrays, and derived types that fix some base type arguments to concrete types.

Every derived type parameter must be inferable from the closed base type, the substitution must be unambiguous, and the resulting type must satisfy its generic constraints. Reflection-based serialization throws `System.InvalidOperationException` for an unsupported specialization. Source generation reports SYSLIB1229, and the generated hierarchy still fails when the serializer configures it. Suppressing the warning doesn't make the registration valid.

## Configure polymorphism with the contract model

For use cases where attribute annotations are impractical or impossible (such as large domain models, cross-assembly hierarchies, or hierarchies in third-party dependencies), to configure polymorphism use the contract model. The contract model is a set of APIs that can be used to configure polymorphism in a type hierarchy by creating a custom `System.Text.Json.Serialization.Metadata.DefaultJsonTypeInfoResolver` subclass that dynamically provides polymorphic configuration per type, as shown in the following example:

```csharp
public class PolymorphicTypeResolver : DefaultJsonTypeInfoResolver
{
    public override JsonTypeInfo GetTypeInfo(Type type, JsonSerializerOptions options)
    {
        JsonTypeInfo jsonTypeInfo = base.GetTypeInfo(type, options);

        Type basePointType = typeof(BasePoint);
        if (jsonTypeInfo.Type == basePointType)
        {
            jsonTypeInfo.PolymorphismOptions = new JsonPolymorphismOptions
            {
                TypeDiscriminatorPropertyName = "$point-type",
                IgnoreUnrecognizedTypeDiscriminators = true,
                UnknownDerivedTypeHandling = JsonUnknownDerivedTypeHandling.FailSerialization,
                DerivedTypes =
                {
                    new JsonDerivedType(typeof(ThreeDimensionalPoint), "3d"),
                    new JsonDerivedType(typeof(FourDimensionalPoint), "4d")
                }
            };
        }

        return jsonTypeInfo;
    }
}
```

```vb
Public Class PolymorphicTypeResolver
    Inherits DefaultJsonTypeInfoResolver

    Public Overrides Function GetTypeInfo(
        ByVal type As Type,
        ByVal options As JsonSerializerOptions) As JsonTypeInfo

        Dim jsonTypeInfo As JsonTypeInfo = MyBase.GetTypeInfo(type, options)
        Dim basePointType As Type = GetType(BasePoint)

        If jsonTypeInfo.Type = basePointType Then
            jsonTypeInfo.PolymorphismOptions = New JsonPolymorphismOptions With {
                .TypeDiscriminatorPropertyName = "$point-type",
                .IgnoreUnrecognizedTypeDiscriminators = True,
                .UnknownDerivedTypeHandling =
                    JsonUnknownDerivedTypeHandling.FailSerialization
            }
            jsonTypeInfo.PolymorphismOptions.DerivedTypes.Add(
                New JsonDerivedType(GetType(ThreeDimensionalPoint), "3d"))
            jsonTypeInfo.PolymorphismOptions.DerivedTypes.Add(
                New JsonDerivedType(GetType(FourDimensionalPoint), "4d"))
        End If

        Return jsonTypeInfo
    End Function
End Class
```

### Additional polymorphic serialization details

* Polymorphic serialization supports derived types that have been explicitly opted in via the `System.Text.Json.Serialization.JsonDerivedTypeAttribute`. Undeclared types will result in a runtime exception. The behavior can be changed by configuring the `System.Text.Json.Serialization.JsonPolymorphicAttribute.UnknownDerivedTypeHandling` property.
* Polymorphic configuration specified in derived types is not inherited by polymorphic configuration in base types. The base type must be configured independently.
* Polymorphic hierarchies are supported for both `interface` and `class` types.
* Polymorphism using type discriminators is only supported for type hierarchies that use the default converters for objects, collections, and dictionary types.
* Polymorphism is supported in metadata-based source generation, but not fast-path source generation.

## See also

* System.Text.Json overview
* How to serialize and deserialize JSON
* Serialize union types
