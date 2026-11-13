---
title: "Writing Custom Attributes (part 6 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/attributes/writing-custom-attributes.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Writing Custom Attributes (part 6 of 6)

## Custom Attribute Example

 This section incorporates the previous information and shows how to design an attribute that documents information about the author of a section of code. The attribute in this example stores the name and level of the programmer, and whether the code has been reviewed. It uses three private variables to store the actual values to save. Each variable is represented by a public property that gets and sets the values. Finally, the constructor is defined with two required parameters:

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

 You can apply this attribute using the full name, `DeveloperAttribute`, or using the abbreviated name, `Developer`, in one of the following ways:

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

 The first example shows the attribute applied with only the required named parameters. The second example shows the attribute applied with both the required and optional parameters.

## See also

- `System.Attribute`
- `System.AttributeUsageAttribute`
- Attributes
- Attribute parameter types
