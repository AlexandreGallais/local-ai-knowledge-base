---
title: "Retrieving Information Stored in Attributes (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/attributes/retrieving-information-stored-in-attributes.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Retrieving Information Stored in Attributes (part 2 of 2)

## Retrieving Multiple Instances of an Attribute Applied to Different Scopes

 The `System.Attribute.GetCustomAttributes*` and `System.Attribute.GetCustomAttribute*` methods don't search an entire class and return all instances of an attribute in that class. Rather, they search only one specified method or member at a time. If you have a class with the same attribute applied to every member and you want to retrieve the values in all the attributes applied to those members, you must supply every method or member individually to `GetCustomAttributes` and `GetCustomAttribute`.

 The following code example takes a class as a parameter and searches for the `DeveloperAttribute` (defined previously) on the class level and on every individual method of that class:

 ```csharp
using System;
using System.Reflection;
using CustomCodeAttributes;

[Developer("Joan Smith", "42", Reviewed = true)]
class MainApp
{
    public static void Main()
    {
        // Call function to get and display the attribute.
        GetAttribute(typeof(MainApp));
    }

    public static void GetAttribute(Type t)
    {
        // Get instance of the attribute.
        DeveloperAttribute MyAttribute =
            (DeveloperAttribute) Attribute.GetCustomAttribute(t, typeof (DeveloperAttribute));

        if (MyAttribute == null)
        {
            Console.WriteLine("The attribute was not found.");
        }
        else
        {
            // Get the Name value.
            Console.WriteLine($"The Name Attribute is: {MyAttribute.Name}.");
            // Get the Level value.
            Console.WriteLine($"The Level Attribute is: {MyAttribute.Level}.");
            // Get the Reviewed value.
            Console.WriteLine($"The Reviewed Attribute is: {MyAttribute.Reviewed}.");
        }
    }
}

class GetAttribTest1
{
    public static void GetAttribute(Type t)
    {
        DeveloperAttribute[] MyAttributes =
            (DeveloperAttribute[]) Attribute.GetCustomAttributes(t, typeof (DeveloperAttribute));

        if (MyAttributes.Length == 0)
        {
            Console.WriteLine("The attribute was not found.");
        }
        else
        {
            for (int i = 0 ; i < MyAttributes.Length ; i++)
            {
                // Get the Name value.
                Console.WriteLine($"The Name Attribute is: {MyAttributes[i].Name}.");
                // Get the Level value.
                Console.WriteLine($"The Level Attribute is: {MyAttributes[i].Level}.");
                // Get the Reviewed value.
                Console.WriteLine($"The Reviewed Attribute is: {MyAttributes[i].Reviewed}.");
            }
        }
    }
}

class GetAttribTest2
{
    public static void GetAttribute(Type t)
    {
        DeveloperAttribute att;

        // Get the class-level attributes.

        // Put the instance of the attribute on the class level in the att object.
        att = (DeveloperAttribute) Attribute.GetCustomAttribute (t, typeof (DeveloperAttribute));

        if (att == null)
        {
            Console.WriteLine($"No attribute in class {t.ToString()}.\n");
        }
        else
        {
            Console.WriteLine($"The Name Attribute on the class level is: {att.Name}.");
            Console.WriteLine($"The Level Attribute on the class level is: {att.Level}.");
            Console.WriteLine($"The Reviewed Attribute on the class level is: {att.Reviewed}.\n");
        }

        // Get the method-level attributes.

        // Get all methods in this class, and put them
        // in an array of System.Reflection.MemberInfo objects.
        MemberInfo[] MyMemberInfo = t.GetMethods();

        // Loop through all methods in this class that are in the
        // MyMemberInfo array.
        for (int i = 0; i < MyMemberInfo.Length; i++)
        {
            att = (DeveloperAttribute) Attribute.GetCustomAttribute(MyMemberInfo[i], typeof (DeveloperAttribute));
            if (att == null)
            {
                Console.WriteLine($"No attribute in member function {MyMemberInfo[i].ToString()}.\n");
            }
            else
            {
                Console.WriteLine($"The Name Attribute for the {MyMemberInfo[i].ToString()} member is: {att.Name}.");
                Console.WriteLine($"The Level Attribute for the {MyMemberInfo[i].ToString()} member is: {att.Level}.");
                Console.WriteLine($"The Reviewed Attribute for the {MyMemberInfo[i].ToString()} member is: {att.Reviewed}.\n");
            }
        }
    }
}
```

 If no instances of the `DeveloperAttribute` are found on the method level or class level, the `GetAttribute` method notifies the user that no attributes were found and displays the name of the method or class that doesn't contain the attribute. If an attribute is found, the console displays the `Name`, `Level`, and `Reviewed` fields.

 You can use the members of the `System.Type` class to get the individual methods and members in the passed class. This example first queries the `Type` object to get attribute information for the class level. Next, it uses `System.Type.GetMethods*` to place instances of all methods into an array of `System.Reflection.MemberInfo` objects to retrieve attribute information for the method level. You can also use the `System.Type.GetProperties*` method to check for attributes on the property level or `System.Type.GetConstructors*` to check for attributes on the constructor level.

## Retrieving Attributes from Class Members

In addition to retrieving attributes at the class level, attributes can also be applied to individual members such as methods, properties, and fields. The `GetCustomAttribute` and `GetCustomAttributes` methods can be used to retrieve these attributes.

### Example

The following example demonstrates how to retrieve an attribute applied to a method:

```csharp
using System;
using System.Reflection;

[AttributeUsage(AttributeTargets.Method)]
public class MyAttribute : Attribute
{
    public string Description { get; }
    public MyAttribute(string description) { Description = description; }
}

public class MyClass
{
    [MyAttribute("This is a sample method.")]
    public void MyMethod() { }
}

class AttributeRetrieval
{
    public static void Main()
    {
        // Create an instance of MyClass
        MyClass myClass = new MyClass();

        // Retrieve the method information for MyMethod
        MethodInfo methodInfo = typeof(MyClass).GetMethod("MyMethod");
        MyAttribute attribute = (MyAttribute)Attribute.GetCustomAttribute(methodInfo, typeof(MyAttribute));

        if (attribute != null)
        {
            // Print the description of the method attribute
            Console.WriteLine($"Method Attribute: {attribute.Description}");
        }
        else
        {
            Console.WriteLine("Attribute not found.");
        }
    }
}
```

## See also

- `System.Type`
- `System.Attribute.GetCustomAttribute*`
- `System.Attribute.GetCustomAttributes*`
- Attributes
