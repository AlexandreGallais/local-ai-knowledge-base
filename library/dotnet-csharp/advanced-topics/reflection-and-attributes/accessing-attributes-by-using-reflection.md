---
title: "Access attributes using reflection"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/advanced-topics/reflection-and-attributes/accessing-attributes-by-using-reflection.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Access attributes using reflection

The fact that you can define custom attributes and place them in your source code would be of little value without some way of retrieving that information and acting on it. By using reflection, you can retrieve the information that was defined with custom attributes. The key method is `GetCustomAttributes`, which returns an array of objects that are the run-time equivalents of the source code attributes. This method has many overloaded versions. For more information, see `System.Attribute`.

An attribute specification such as:

```csharp
[Author("P. Ackerman", Version = 1.1)]
class SampleClass { }
```

is conceptually equivalent to the following code:

```csharp
var anonymousAuthorObject = new Author("P. Ackerman")
{
    Version = 1.1
};
```

However, the code isn't executed until `SampleClass` is queried for attributes. Calling `GetCustomAttributes` on `SampleClass` causes an `Author` object to be constructed and initialized. If the class has other attributes, other attribute objects are constructed similarly. `GetCustomAttributes` then returns the `Author` object and any other attribute objects in an array. You can then iterate over this array, determine what attributes were applied based on the type of each array element, and extract information from the attribute objects.

Here's a complete example. A custom attribute is defined, applied to several entities, and retrieved via reflection.

```csharp
// Multiuse attribute.
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

// Class with the Author attribute.
[Author("P. Ackerman")]
public class FirstClass
{
    // ...
}

// Class without the Author attribute.
public class SecondClass
{
    // ...
}

// Class with multiple Author attributes.
[Author("P. Ackerman"), Author("R. Koch", Version = "2.0")]
public class ThirdClass
{
    // ...
}

class TestAuthorAttribute
{
    public static void Test()
    {
        PrintAuthorInfo(typeof(FirstClass));
        PrintAuthorInfo(typeof(SecondClass));
        PrintAuthorInfo(typeof(ThirdClass));
    }

    private static void PrintAuthorInfo(System.Type t)
    {
        System.Console.WriteLine($"Author information for {t}");

        // Using reflection.
        System.Attribute[] attrs = System.Attribute.GetCustomAttributes(t);  // Reflection.

        // Displaying output.
        foreach (System.Attribute attr in attrs)
        {
            if (attr is AuthorAttribute a)
            {
                System.Console.WriteLine($"   {a.GetName()}, version {a.Version}");
            }
        }
    }
}
/* Output:
    Author information for FirstClass
       P. Ackerman, version 1.0
    Author information for SecondClass
    Author information for ThirdClass
       R. Koch, version 2.0
       P. Ackerman, version 1.0
*/
```
## See also

- `System.Reflection`
- `System.Attribute`
- Retrieving Information Stored in Attributes
