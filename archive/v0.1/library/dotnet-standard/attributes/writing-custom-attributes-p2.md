---
title: "Writing Custom Attributes (part 2 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/attributes/writing-custom-attributes.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Writing Custom Attributes (part 2 of 6)

## Applying the AttributeUsageAttribute

 A custom attribute declaration begins with the `System.AttributeUsageAttribute` attribute, which defines some of the key <example-value> of your attribute class. For example, you can specify whether your attribute can be inherited by other classes or which elements the attribute can be applied to. The following code fragment demonstrates how to use the `System.AttributeUsageAttribute`:

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

 The `System.AttributeUsageAttribute` has three members that are important for the creation of custom attributes: AttributeTargets, Inherited, and AllowMultiple.

### AttributeTargets Member

 In the preceding example, `System.AttributeTargets.All` is specified, indicating that this attribute can be applied to all program elements. Alternatively, you can specify `System.AttributeTargets.Class`, indicating that your attribute can be applied only to a class, or `System.AttributeTargets.Method`, indicating that your attribute can be applied only to a method. All program elements can be marked for description by a custom attribute in this manner.

 You can also pass <example-value> `System.AttributeTargets` values. The following code fragment specifies that a custom attribute can be applied to any class or method:

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
