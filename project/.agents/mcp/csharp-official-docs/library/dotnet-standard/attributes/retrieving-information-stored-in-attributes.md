---
title: "Retrieving Information Stored in Attributes (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/attributes/retrieving-information-stored-in-attributes.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Retrieving Information Stored in Attributes

Retrieving a custom attribute is a simple process. First, declare an instance of the attribute you want to retrieve. Then, use the `System.Attribute.GetCustomAttribute*` method to initialize the new attribute to the value of the attribute you want to retrieve. Once the new attribute is initialized, you can use its properties to get the values.

> **Important:**
> This article describes how to retrieve attributes for code loaded into the execution context. To retrieve attributes for code loaded into the reflection-only context, you must use the `System.Reflection.CustomAttributeData` class, as shown in How to: Load Assemblies into the Reflection-Only Context.

 This section describes the following ways to retrieve attributes:

- Retrieving a single instance of an attribute

- Retrieving multiple instances of an attribute applied to the same scope

- Retrieving multiple instances of an attribute applied to different scopes

## Retrieving a Single Instance of an Attribute

 In the following example, the `DeveloperAttribute` (described in the previous section) is applied to the `MainApp` class on the class level. The `GetAttribute` method uses `GetCustomAttribute` to retrieve the values stored in `DeveloperAttribute` on the class level before displaying them to the console.

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

 The execution of the preceding program displays the following text:

```console
The Name Attribute is: Joan Smith.
The Level Attribute is: 42.
The Reviewed Attribute is: True.
```

 If the attribute isn't found, the `GetCustomAttribute` method initializes `MyAttribute` to a null value. This example checks `MyAttribute` for such an instance and notifies the user if the attribute isn't found. If `DeveloperAttribute` isn't found in the class scope, the console displays the following message:

```console
The attribute was not found.
```

 The preceding example assumes that the attribute definition is in the current namespace. Remember to import the namespace in which the attribute definition resides if it isn't in the current namespace.

## Retrieving Multiple Instances of an Attribute Applied to the Same Scope

In the preceding example, the class to inspect and the specific attribute to find are passed to the `System.Attribute.GetCustomAttribute*` method. That code works well if only one instance of an attribute is applied on the class level. However, if multiple instances of an attribute are applied on the same class level, the `GetCustomAttribute` method doesn't retrieve all the information. In cases where multiple instances of the same attribute are applied to the same scope, you can use `System.Attribute.GetCustomAttributes*` method to place all instances of an attribute into an array. For example, if two instances of `DeveloperAttribute` are applied on the class level of the same class, the `GetAttribute` method can be modified to display the information found in both attributes. To apply multiple attributes on the same level, the attribute must be defined with the `AllowMultiple` property set to `true` in the `System.AttributeUsageAttribute` class.

 The following code example shows how to use the `GetCustomAttributes` method to create an array that references all instances of `DeveloperAttribute` in any given class. The code then outputs the values of all the attributes to the console.

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

 If no attributes are found, this code alerts the user. Otherwise, the information contained in both instances of `DeveloperAttribute` is displayed.
