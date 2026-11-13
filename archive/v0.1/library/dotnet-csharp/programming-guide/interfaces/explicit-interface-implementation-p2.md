---
title: "Explicit Interface Implementation (part 2 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/programming-guide/interfaces/explicit-interface-implementation.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Explicit Interface Implementation (part 2 of 3)

```csharp
﻿using System;

namespace interfaces
{
    public class InterfaceSnippets
    {
        public static void TestInterfaces()
        {
            InheritMultipleInterfaces.MultipleInterfaceMethods();
            MultipleExplicitImplementation.CallExplicitImplementation();
            DefaultInterfaceMethods.CallDefaultImplementation();
        }

        private static class InheritMultipleInterfaces
        {
            public interface IControl
            {
                void Paint();
            }
            public interface ISurface
            {
                void Paint();
            }
            public class SampleClass : IControl, ISurface
            {
                // Both ISurface.Paint and IControl.Paint call this method.
                public void Paint()
                {
                    Console.WriteLine("Paint method in SampleClass");
                }
            }

            public static void MultipleInterfaceMethods()
            {
                SampleClass sample = new SampleClass();
                IControl control = sample;
                ISurface surface = sample;

                // The following lines all call the same method.
                sample.Paint();
                control.Paint();
                surface.Paint();
                
                // Output:
                // Paint method in SampleClass
                // Paint method in SampleClass
                // Paint method in SampleClass
            }
        }

        private static class MultipleExplicitImplementation
        {
            public interface IControl
            {
                void Paint();
            }
            public interface ISurface
            {
                void Paint();
            }
            public class SampleClass : IControl, ISurface
            {
                void IControl.Paint()
                {
                    System.Console.WriteLine("IControl.Paint");
                }
                void ISurface.Paint()
                {
                    System.Console.WriteLine("ISurface.Paint");
                }
            }

            public static void CallExplicitImplementation()
            {
                SampleClass sample = new SampleClass();
                IControl control = sample;
                ISurface surface = sample;

                // The following lines all call the same method.
                //sample.Paint(); // Compiler error.
                control.Paint();  // Calls IControl.Paint on SampleClass.
                surface.Paint();  // Calls ISurface.Paint on SampleClass.
                
                // Output:
                // IControl.Paint
                // ISurface.Paint
           }
        }

        private static class NameCollisions
        {
            interface ILeft
            {
                int P { get;}
            }
            interface IRight
            {
                int P();
            }

            class Middle : ILeft, IRight
            {
                public int P() { return 0; }
                int ILeft.P { get { return 0; } }
            }
        }

        private static class DefaultInterfaceMethods
        {
            public interface IControl
            {
                void Paint() => Console.WriteLine("Default Paint method");
            }
            public class SampleClass : IControl
            {
                // Paint() is inherited from IControl.
            }
            public static void CallDefaultImplementation()
            {
                var sample = new SampleClass();
                //sample.Paint();// "Paint" isn't accessible.
                var control = sample as IControl;
                control.Paint();
            }
        }
    }
}
```

Explicit implementation is also used to resolve cases where two interfaces each declare different members of the same name such as a property and a method. To implement both interfaces, a class has to use explicit implementation either for the property `P`, or the method `P`, or both, to avoid a compiler error. For example:

```csharp
﻿using System;

namespace interfaces
{
    public class InterfaceSnippets
    {
        public static void TestInterfaces()
        {
            InheritMultipleInterfaces.MultipleInterfaceMethods();
            MultipleExplicitImplementation.CallExplicitImplementation();
            DefaultInterfaceMethods.CallDefaultImplementation();
        }

        private static class InheritMultipleInterfaces
        {
            public interface IControl
            {
                void Paint();
            }
            public interface ISurface
            {
                void Paint();
            }
            public class SampleClass : IControl, ISurface
            {
                // Both ISurface.Paint and IControl.Paint call this method.
                public void Paint()
                {
                    Console.WriteLine("Paint method in SampleClass");
                }
            }

            public static void MultipleInterfaceMethods()
            {
                SampleClass sample = new SampleClass();
                IControl control = sample;
                ISurface surface = sample;

                // The following lines all call the same method.
                sample.Paint();
                control.Paint();
                surface.Paint();
                
                // Output:
                // Paint method in SampleClass
                // Paint method in SampleClass
                // Paint method in SampleClass
            }
        }

        private static class MultipleExplicitImplementation
        {
            public interface IControl
            {
                void Paint();
            }
            public interface ISurface
            {
                void Paint();
            }
            public class SampleClass : IControl, ISurface
            {
                void IControl.Paint()
                {
                    System.Console.WriteLine("IControl.Paint");
                }
                void ISurface.Paint()
                {
                    System.Console.WriteLine("ISurface.Paint");
                }
            }

            public static void CallExplicitImplementation()
            {
                SampleClass sample = new SampleClass();
                IControl control = sample;
                ISurface surface = sample;

                // The following lines all call the same method.
                //sample.Paint(); // Compiler error.
                control.Paint();  // Calls IControl.Paint on SampleClass.
                surface.Paint();  // Calls ISurface.Paint on SampleClass.
                
                // Output:
                // IControl.Paint
                // ISurface.Paint
           }
        }

        private static class NameCollisions
        {
            interface ILeft
            {
                int P { get;}
            }
            interface IRight
            {
                int P();
            }

            class Middle : ILeft, IRight
            {
                public int P() { return 0; }
                int ILeft.P { get { return 0; } }
            }
        }

        private static class DefaultInterfaceMethods
        {
            public interface IControl
            {
                void Paint() => Console.WriteLine("Default Paint method");
            }
            public class SampleClass : IControl
            {
                // Paint() is inherited from IControl.
            }
            public static void CallDefaultImplementation()
            {
                var sample = new SampleClass();
                //sample.Paint();// "Paint" isn't accessible.
                var control = sample as IControl;
                control.Paint();
            }
        }
    }
}
```

An explicit interface implementation doesn't have an access modifier since it isn't accessible as a member of the type it's defined in. Instead, it's only accessible when called through an instance of the interface. If you specify an access modifier for an explicit interface implementation, you get compiler error CS0106. For more information, see `interface` (C# Reference).

You can define an implementation for members declared in an interface. If a class inherits a method implementation from an interface, that method is only accessible through a reference of the interface type. The inherited member doesn't appear as part of the public interface. The following sample defines a default implementation for an interface method:

```csharp
﻿using System;

namespace interfaces
{
    public class InterfaceSnippets
    {
        public static void TestInterfaces()
        {
            InheritMultipleInterfaces.MultipleInterfaceMethods();
            MultipleExplicitImplementation.CallExplicitImplementation();
            DefaultInterfaceMethods.CallDefaultImplementation();
        }

        private static class InheritMultipleInterfaces
        {
            public interface IControl
            {
                void Paint();
            }
            public interface ISurface
            {
                void Paint();
            }
            public class SampleClass : IControl, ISurface
            {
                // Both ISurface.Paint and IControl.Paint call this method.
                public void Paint()
                {
                    Console.WriteLine("Paint method in SampleClass");
                }
            }

            public static void MultipleInterfaceMethods()
            {
                SampleClass sample = new SampleClass();
                IControl control = sample;
                ISurface surface = sample;

                // The following lines all call the same method.
                sample.Paint();
                control.Paint();
                surface.Paint();
                
                // Output:
                // Paint method in SampleClass
                // Paint method in SampleClass
                // Paint method in SampleClass
            }
        }

        private static class MultipleExplicitImplementation
        {
            public interface IControl
            {
                void Paint();
            }
            public interface ISurface
            {
                void Paint();
            }
            public class SampleClass : IControl, ISurface
            {
                void IControl.Paint()
                {
                    System.Console.WriteLine("IControl.Paint");
                }
                void ISurface.Paint()
                {
                    System.Console.WriteLine("ISurface.Paint");
                }
            }

            public static void CallExplicitImplementation()
            {
                SampleClass sample = new SampleClass();
                IControl control = sample;
                ISurface surface = sample;

                // The following lines all call the same method.
                //sample.Paint(); // Compiler error.
                control.Paint();  // Calls IControl.Paint on SampleClass.
                surface.Paint();  // Calls ISurface.Paint on SampleClass.
                
                // Output:
                // IControl.Paint
                // ISurface.Paint
           }
        }

        private static class NameCollisions
        {
            interface ILeft
            {
                int P { get;}
            }
            interface IRight
            {
                int P();
            }

            class Middle : ILeft, IRight
            {
                public int P() { return 0; }
                int ILeft.P { get { return 0; } }
            }
        }

        private static class DefaultInterfaceMethods
        {
            public interface IControl
            {
                void Paint() => Console.WriteLine("Default Paint method");
            }
            public class SampleClass : IControl
            {
                // Paint() is inherited from IControl.
            }
            public static void CallDefaultImplementation()
            {
                var sample = new SampleClass();
                //sample.Paint();// "Paint" isn't accessible.
                var control = sample as IControl;
                control.Paint();
            }
        }
    }
}
```

The following sample invokes the default implementation:
