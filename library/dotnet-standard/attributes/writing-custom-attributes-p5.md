---
title: "Writing Custom Attributes (part 5 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/attributes/writing-custom-attributes.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Writing Custom Attributes (part 5 of 6)

## Declaring Constructors

 Just like traditional classes, attributes are initialized with constructors. The following code fragment illustrates a typical attribute constructor. This public constructor takes a parameter and sets a member variable equal to its value.

 ```csharp
﻿using System;

namespace CustomCodeAttributes
{
    [AttributeUsage(AttributeTargets.All)]
    public class DeveloperAttribute : Attribute
    {
        // Private fields.
        private string name;
        private string level;
        private bool reviewed;

        // This constructor defines two required parameters: name and level.

        public DeveloperAttribute(string name, string level)
        {
            this.name = name;
            this.level = level;
            this.reviewed = false;
        }

        // Define Name property.
        // This is a read-only attribute.

        public virtual string Name
        {
            get {return name;}
        }

        // Define Level property.
        // This is a read-only attribute.

        public virtual string Level
        {
            get {return level;}
        }

        // Define Reviewed property.
        // This is a read/write attribute.

        public virtual bool Reviewed
        {
            get {return reviewed;}
            set {reviewed = value;}
        }
    }
}

namespace CustomCodeAttributes_Examples1
{
    [AttributeUsage(AttributeTargets.All, Inherited = false, AllowMultiple = true)]
    public class DummyAttribute1 : Attribute
    {
    }

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class DummyAttribute2 : Attribute
    {
    }

    // This defaults to Inherited = true.
    public class MyAttribute : Attribute
    {
        //...
    }

    [AttributeUsage(AttributeTargets.Method, Inherited = false)]
    public class YourAttribute : Attribute
    {
        //...
    }

    public class MyClass
    {
        [MyAttribute]
        [YourAttribute]
        public virtual void MyMethod()
        {
            //...
        }
    }

    public class YourClass : MyClass
    {
        // MyMethod will have MyAttribute but not YourAttribute.
        public override void MyMethod()
        {
            //...
        }
    }
}

namespace CustomCodeAttributes_Examples2
{
    //This defaults to AllowMultiple = false.
    public class MyAttribute : Attribute
    {
    }

    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    public class YourAttribute : Attribute
    {
    }

// #if'd out since MyClass will intentionally not compile
#if false
    [Developer("Joan Smith", "1")]

    -or-

    [Developer("Joan Smith", "1", Reviewed = true)]

    public class MyClass
    {
        // This produces an error.
        // Duplicates are not allowed.
        [MyAttribute]
        [MyAttribute]
        public void MyMethod()
        {
            //...
        }

        // This is valid.
        [YourAttribute]
        [YourAttribute]
        public void YourMethod()
        {
            //...
        }
    }
#endif
}

namespace CustomCodeAttributes_Examples3
{
    [AttributeUsage(AttributeTargets.Method)]
    public class MyAttribute : Attribute
    {
        // . . .
    }
}

namespace CustomCodeAttributes_Examples4
{
    public class MyAttribute : Attribute
    {
        private bool myvalue;
        private string myoptional;

        public MyAttribute(bool myvalue)
        {
            this.myvalue = myvalue;
        }

        public bool MyProperty
        {
            get {return this.myvalue;}
            set {this.myvalue = value;}
        }

        public string OptionalParameter
        {
            get {return this.myoptional;}
            set {this.myoptional = value;}
        }
    }

    // One required (positional) and one optional (named) parameter are applied.
    [MyAttribute(false, OptionalParameter = "optional data")]
    public class SomeClass
    {
        //...
    }
    // One required (positional) parameter is applied.
    [MyAttribute(false)]
    public class SomeOtherClass
    {
        //...
    }
}
```

 You can overload the constructor to accommodate different combinations of values. If you also define a property for your custom attribute class, you can use a combination of named and positional parameters when initializing the attribute. Typically, you define all required parameters as positional and all optional parameters as named. In this case, the attribute can't be initialized without the required parameter. All other parameters are optional.

> **Note:**
> In Visual Basic, constructors for an attribute class shouldn't use a `ParamArray` argument.

Constructor parameters and public properties of an attribute are restricted to a limited set of types because the runtime must be able to read the attribute values directly from metadata. The valid attribute parameter types are:

- Simple types (C# keyword / Visual Basic keyword / .NET runtime type):

  | C# | Visual Basic | .NET runtime type |
  |----|-------------|-------------------|
  | `bool` | `Boolean` | `System.Boolean` |
  | `byte` | `Byte` | `System.Byte` |
  | `char` | `Char` | `System.Char` |
  | `double` | `Double` | `System.Double` |
  | `float` | `Single` | `System.Single` |
  | `int` | `Integer` | `System.Int32` |
  | `long` | `Long` | `System.Int64` |
  | `short` | `Short` | `System.Int16` |
  | `string` | `String` | `System.String` |

- `System.Type`.
- Enum types that are accessible at the attribute usage site.
- In C#, `object` (when the value is one of the valid attribute argument types or a single-dimensional array of them).
- Single-dimensional arrays of any of the preceding types.

If you define a constructor that accepts a type outside this list, the attribute compiles successfully, but a compiler error occurs when you try to apply it. For more information about what expressions are allowed when applying an attribute, see Apply attributes.

> **Note:**
> The types `sbyte`, `ushort`, `uint`, `ulong`, `decimal`, `nint`, and `nuint` aren't valid attribute parameter types, even though they support literal constants.

The following code example shows how an attribute that uses the previous constructor can be applied using optional and required parameters. It assumes that the attribute has one required Boolean value and one optional string property.

 ```csharp
﻿using System;

namespace CustomCodeAttributes
{
    [AttributeUsage(AttributeTargets.All)]
    public class DeveloperAttribute : Attribute
    {
        // Private fields.
        private string name;
        private string level;
        private bool reviewed;

        // This constructor defines two required parameters: name and level.

        public DeveloperAttribute(string name, string level)
        {
            this.name = name;
            this.level = level;
            this.reviewed = false;
        }

        // Define Name property.
        // This is a read-only attribute.

        public virtual string Name
        {
            get {return name;}
        }

        // Define Level property.
        // This is a read-only attribute.

        public virtual string Level
        {
            get {return level;}
        }

        // Define Reviewed property.
        // This is a read/write attribute.

        public virtual bool Reviewed
        {
            get {return reviewed;}
            set {reviewed = value;}
        }
    }
}

namespace CustomCodeAttributes_Examples1
{
    [AttributeUsage(AttributeTargets.All, Inherited = false, AllowMultiple = true)]
    public class DummyAttribute1 : Attribute
    {
    }

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class DummyAttribute2 : Attribute
    {
    }

    // This defaults to Inherited = true.
    public class MyAttribute : Attribute
    {
        //...
    }

    [AttributeUsage(AttributeTargets.Method, Inherited = false)]
    public class YourAttribute : Attribute
    {
        //...
    }

    public class MyClass
    {
        [MyAttribute]
        [YourAttribute]
        public virtual void MyMethod()
        {
            //...
        }
    }

    public class YourClass : MyClass
    {
        // MyMethod will have MyAttribute but not YourAttribute.
        public override void MyMethod()
        {
            //...
        }
    }
}

namespace CustomCodeAttributes_Examples2
{
    //This defaults to AllowMultiple = false.
    public class MyAttribute : Attribute
    {
    }

    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    public class YourAttribute : Attribute
    {
    }

// #if'd out since MyClass will intentionally not compile
#if false
    [Developer("Joan Smith", "1")]

    -or-

    [Developer("Joan Smith", "1", Reviewed = true)]

    public class MyClass
    {
        // This produces an error.
        // Duplicates are not allowed.
        [MyAttribute]
        [MyAttribute]
        public void MyMethod()
        {
            //...
        }

        // This is valid.
        [YourAttribute]
        [YourAttribute]
        public void YourMethod()
        {
            //...
        }
    }
#endif
}

namespace CustomCodeAttributes_Examples3
{
    [AttributeUsage(AttributeTargets.Method)]
    public class MyAttribute : Attribute
    {
        // . . .
    }
}

namespace CustomCodeAttributes_Examples4
{
    public class MyAttribute : Attribute
    {
        private bool myvalue;
        private string myoptional;

        public MyAttribute(bool myvalue)
        {
            this.myvalue = myvalue;
        }

        public bool MyProperty
        {
            get {return this.myvalue;}
            set {this.myvalue = value;}
        }

        public string OptionalParameter
        {
            get {return this.myoptional;}
            set {this.myoptional = value;}
        }
    }

    // One required (positional) and one optional (named) parameter are applied.
    [MyAttribute(false, OptionalParameter = "optional data")]
    public class SomeClass
    {
        //...
    }
    // One required (positional) parameter is applied.
    [MyAttribute(false)]
    public class SomeOtherClass
    {
        //...
    }
}
```

## Declaring Properties

 If you want to define a named parameter or provide an easy way to return the values stored by your attribute, declare a property. Attribute properties should be declared as public entities with a description of the data type that will be returned. Define the variable that will hold the value of your property and associate it with the `get` and `set` methods. The following code example demonstrates how to implement a property in your attribute:

 ```csharp
﻿using System;

namespace CustomCodeAttributes
{
    [AttributeUsage(AttributeTargets.All)]
    public class DeveloperAttribute : Attribute
    {
        // Private fields.
        private string name;
        private string level;
        private bool reviewed;

        // This constructor defines two required parameters: name and level.

        public DeveloperAttribute(string name, string level)
        {
            this.name = name;
            this.level = level;
            this.reviewed = false;
        }

        // Define Name property.
        // This is a read-only attribute.

        public virtual string Name
        {
            get {return name;}
        }

        // Define Level property.
        // This is a read-only attribute.

        public virtual string Level
        {
            get {return level;}
        }

        // Define Reviewed property.
        // This is a read/write attribute.

        public virtual bool Reviewed
        {
            get {return reviewed;}
            set {reviewed = value;}
        }
    }
}

namespace CustomCodeAttributes_Examples1
{
    [AttributeUsage(AttributeTargets.All, Inherited = false, AllowMultiple = true)]
    public class DummyAttribute1 : Attribute
    {
    }

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class DummyAttribute2 : Attribute
    {
    }

    // This defaults to Inherited = true.
    public class MyAttribute : Attribute
    {
        //...
    }

    [AttributeUsage(AttributeTargets.Method, Inherited = false)]
    public class YourAttribute : Attribute
    {
        //...
    }

    public class MyClass
    {
        [MyAttribute]
        [YourAttribute]
        public virtual void MyMethod()
        {
            //...
        }
    }

    public class YourClass : MyClass
    {
        // MyMethod will have MyAttribute but not YourAttribute.
        public override void MyMethod()
        {
            //...
        }
    }
}

namespace CustomCodeAttributes_Examples2
{
    //This defaults to AllowMultiple = false.
    public class MyAttribute : Attribute
    {
    }

    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    public class YourAttribute : Attribute
    {
    }

// #if'd out since MyClass will intentionally not compile
#if false
    [Developer("Joan Smith", "1")]

    -or-

    [Developer("Joan Smith", "1", Reviewed = true)]

    public class MyClass
    {
        // This produces an error.
        // Duplicates are not allowed.
        [MyAttribute]
        [MyAttribute]
        public void MyMethod()
        {
            //...
        }

        // This is valid.
        [YourAttribute]
        [YourAttribute]
        public void YourMethod()
        {
            //...
        }
    }
#endif
}

namespace CustomCodeAttributes_Examples3
{
    [AttributeUsage(AttributeTargets.Method)]
    public class MyAttribute : Attribute
    {
        // . . .
    }
}

namespace CustomCodeAttributes_Examples4
{
    public class MyAttribute : Attribute
    {
        private bool myvalue;
        private string myoptional;

        public MyAttribute(bool myvalue)
        {
            this.myvalue = myvalue;
        }

        public bool MyProperty
        {
            get {return this.myvalue;}
            set {this.myvalue = value;}
        }

        public string OptionalParameter
        {
            get {return this.myoptional;}
            set {this.myoptional = value;}
        }
    }

    // One required (positional) and one optional (named) parameter are applied.
    [MyAttribute(false, OptionalParameter = "optional data")]
    public class SomeClass
    {
        //...
    }
    // One required (positional) parameter is applied.
    [MyAttribute(false)]
    public class SomeOtherClass
    {
        //...
    }
}
```
