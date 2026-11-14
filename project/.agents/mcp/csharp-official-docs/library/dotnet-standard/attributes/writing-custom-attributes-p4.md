---
title: "Writing Custom Attributes (part 4 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/attributes/writing-custom-attributes.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Writing Custom Attributes (part 4 of 6)

### AllowMultiple Property

 The `System.AttributeUsageAttribute.AllowMultiple` property indicates whether multiple instances of your attribute can exist on an element. If set to `true`, multiple instances are allowed. If set to `false` (the default), only one instance is allowed.

 In the following example, `MyAttribute` has a default `System.AttributeUsageAttribute.AllowMultiple*` value of `false`, while `YourAttribute` has a value of `true`:

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

 When multiple instances of these attributes are applied, `MyAttribute` produces a compiler error. The following code example shows the valid use of `YourAttribute` and the invalid use of `MyAttribute`:

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

 If both the `System.AttributeUsageAttribute.AllowMultiple` property and the `System.AttributeUsageAttribute.Inherited` property are set to `true`, a class that's inherited from another class can inherit an attribute and have another instance of the same attribute applied in the same child class. If `System.AttributeUsageAttribute.AllowMultiple*` is set to `false`, the values of any attributes in the parent class will be overwritten by new instances of the same attribute in the child class.

## Declaring the Attribute Class

 After you apply the `System.AttributeUsageAttribute`, start defining the specifics of your attribute. The declaration of an attribute class looks similar to the declaration of a traditional class, as demonstrated by the following code:

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

 This attribute definition demonstrates the following points:

- Attribute classes must be declared as public classes.

- By convention, the name of the attribute class ends with the word **Attribute**. While not required, this convention is recommended for readability. When the attribute is applied, the inclusion of the word Attribute is optional.

- All attribute classes must inherit directly or indirectly from the `System.Attribute` class.

- In Microsoft Visual Basic, all custom attribute classes must have the `System.AttributeUsageAttribute` attribute.
