---
title: "Create custom attributes"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/advanced-topics/reflection-and-attributes/creating-custom-attributes.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Create custom attributes

You can create your own custom attributes by defining an attribute class, a class that derives directly or indirectly from `System.Attribute`, which makes identifying attribute definitions in metadata fast and easy. Suppose you want to tag types with the name of the programmer who wrote the type. You might define a custom `Author` attribute class:

```csharp
[System.AttributeUsage(System.AttributeTargets.Class |
                       System.AttributeTargets.Struct)
]
public class AuthorAttribute : System.Attribute
{
    private string Name;
    public string Version;

    public AuthorAttribute(string name)
    {
        Name = name;
        Version = "1.0";
    }
}
```

The class name `AuthorAttribute` is the attribute's name, `Author`, plus the `Attribute` suffix. It's derived from `System.Attribute`, so it's a custom attribute class. The constructor's parameters are the custom attribute's positional parameters. In this example, `name` is a positional parameter. Any public read-write fields or properties are named parameters. In this case, `version` is the only named parameter. Note the use of the `AttributeUsage` attribute to make the `Author` attribute valid only on class and `struct` declarations.

You could use this new attribute as follows:

```csharp
[Author("P. Ackerman", Version = "1.1")]
class SampleClass
{
    // P. Ackerman's code goes here...
}
```
`AttributeUsage` has a named parameter, `AllowMultiple`, with which you can make a custom attribute single-use or multiuse. In the following code example, a multiuse attribute is created.

```csharp
[System.AttributeUsage(System.AttributeTargets.Class |
                       System.AttributeTargets.Struct,
                       AllowMultiple = true)  // Multiuse attribute.
]
public class AuthorAttribute : System.Attribute
{
    string Name;
    public string Version;

    public AuthorAttribute(string name)
    {
        Name = name;

        // Default value.
        Version = "1.0";
    }

    public string GetName() => Name;
}
```
In the following code example, multiple attributes of the same type are applied to a class.

```csharp
[Author("P. Ackerman"), Author("R. Koch", Version = "2.0")]
public class ThirdClass
{
    // ...
}
```
## See also

- `System.Reflection`
- Writing Custom Attributes
- AttributeUsage (C#)
