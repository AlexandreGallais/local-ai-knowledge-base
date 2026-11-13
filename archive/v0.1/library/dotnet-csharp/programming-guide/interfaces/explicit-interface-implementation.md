---
title: "Explicit Interface Implementation (part 1 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/programming-guide/interfaces/explicit-interface-implementation.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Explicit Interface Implementation (C# Programming Guide)

If a class implements two interfaces that contain a member with the same signature, then implementing that member on the class will cause both interfaces to use that member as their implementation. In the following example, all the calls to `Paint` invoke the same method. This first sample defines the types:

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

The following sample calls the methods:

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

But you might not want the same implementation to be called for both interfaces. To call a different implementation depending on which interface is in use, you can implement an interface member explicitly. An explicit interface implementation is a class member that is only called through the specified interface. Name the class member by prefixing it with the name of the interface and a period. For example:

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

The class member `IControl.Paint` is only available through the `IControl` interface, and `ISurface.Paint` is only available through `ISurface`. Both method implementations are separate, and neither are available directly on the class. For example:
