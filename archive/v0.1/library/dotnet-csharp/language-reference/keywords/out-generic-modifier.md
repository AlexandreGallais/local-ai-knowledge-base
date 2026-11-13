---
title: "out keyword (generic modifier)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/keywords/out-generic-modifier.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# out (generic modifier) (C# Reference)

For generic type parameters, the `out` keyword specifies that the type parameter is covariant. Use the `out` keyword in generic interfaces and delegates.

Covariance enables you to use a more derived type than the generic parameter specifies. This feature allows for implicit conversion of classes that implement covariant interfaces and implicit conversion of delegate types. Covariance and contravariance support reference types, but they don't support value types.

An interface with a covariant type parameter enables its methods to return more derived types than those specified by the type parameter. For example, because in .NET, in `System.Collections.Generic.IEnumerable`1`, type T is covariant, you can assign an object of the `IEnumerable<string>` type to an object of the `IEnumerable<object>` type without using any special conversion methods.

You can assign a covariant delegate to another delegate of the same type, but with a more derived generic type parameter.

For more information, see Covariance and Contravariance.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

The following example shows how to declare, extend, and implement a covariant generic interface. It also shows how to use implicit conversion for classes that implement a covariant interface.

```csharp
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows;
using System.Windows.Controls;

namespace n1
{
    // Contravariant interface.
    interface IContravariant<in A> { }

    // Extending contravariant interface.
    interface IExtContravariant<in A> : IContravariant<A> { }

    // Implementing contravariant interface.
    class Sample<A> : IContravariant<A> { }

    class Program
    {
        static void Test()
        {
            IContravariant<Object> iobj = new Sample<Object>();
            IContravariant<String> istr = new Sample<String>();

            // You can assign iobj to istr because
            // the IContravariant interface is contravariant.
            istr = iobj;
        }
    }

    class Sample
    {
    // Contravariant delegate.
    public delegate void DContravariant<in A>(A argument);

    // Methods that match the delegate signature.
    public static void SampleControl(Control control)
    { }
    public static void SampleButton(Button button)
    { }

    public void Test()
    {

        // Instantiating the delegates with the methods.
        DContravariant<Control> dControl = SampleControl;
        DContravariant<Button> dButton = SampleButton;

        // You can assign dControl to dButton
        // because the DContravariant delegate is contravariant.
        dButton = dControl;

        // Invoke the delegate.
        dButton(new Button());
    }
    }
}

namespace n2
{
    // Covariant interface.
    interface ICovariant<out R> { }

    // Extending covariant interface.
    interface IExtCovariant<out R> : ICovariant<R> { }

    // Implementing covariant interface.
    class Sample<R> : ICovariant<R> { }

    class Program
    {
        static void Test()
        {
            ICovariant<Object> iobj = new Sample<Object>();
            ICovariant<String> istr = new Sample<String>();

            // You can assign istr to iobj because
            // the ICovariant interface is covariant.
            iobj = istr;
        }
    }

    class Sample
    {
    // Covariant delegate.
    public delegate R DCovariant<out R>();

    // Methods that match the delegate signature.
    public static Control SampleControl()
    { return new Control(); }

    public static Button SampleButton()
    { return new Button(); }

    public void Test()
    {
        // Instantiate the delegates with the methods.
        DCovariant<Control> dControl = SampleControl;
        DCovariant<Button> dButton = SampleButton;

        // You can assign dButton to dControl
        // because the DCovariant delegate is covariant.
        dControl = dButton;

        // Invoke the delegate.
        dControl();
    }
    }
}
```
In a generic interface, declare a type parameter covariant if it satisfies the following conditions:

- You use the type parameter only as a return type of interface methods and don't use it as a type of method arguments.

  > **Note:**
  > There's one exception to this rule. If a covariant interface has a contravariant generic delegate as a method parameter, you can use the covariant type as a generic type parameter for this delegate. For more information about covariant and contravariant generic delegates, see Variance in Delegates and Using Variance for Func and Action Generic Delegates.

- You don't use the type parameter as a generic constraint for the interface methods.

The following example shows how to declare, instantiate, and invoke a covariant generic delegate. It also shows how to implicitly convert delegate types.

```csharp
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows;
using System.Windows.Controls;

namespace n1
{
    // Contravariant interface.
    interface IContravariant<in A> { }

    // Extending contravariant interface.
    interface IExtContravariant<in A> : IContravariant<A> { }

    // Implementing contravariant interface.
    class Sample<A> : IContravariant<A> { }

    class Program
    {
        static void Test()
        {
            IContravariant<Object> iobj = new Sample<Object>();
            IContravariant<String> istr = new Sample<String>();

            // You can assign iobj to istr because
            // the IContravariant interface is contravariant.
            istr = iobj;
        }
    }

    class Sample
    {
    // Contravariant delegate.
    public delegate void DContravariant<in A>(A argument);

    // Methods that match the delegate signature.
    public static void SampleControl(Control control)
    { }
    public static void SampleButton(Button button)
    { }

    public void Test()
    {

        // Instantiating the delegates with the methods.
        DContravariant<Control> dControl = SampleControl;
        DContravariant<Button> dButton = SampleButton;

        // You can assign dControl to dButton
        // because the DContravariant delegate is contravariant.
        dButton = dControl;

        // Invoke the delegate.
        dButton(new Button());
    }
    }
}

namespace n2
{
    // Covariant interface.
    interface ICovariant<out R> { }

    // Extending covariant interface.
    interface IExtCovariant<out R> : ICovariant<R> { }

    // Implementing covariant interface.
    class Sample<R> : ICovariant<R> { }

    class Program
    {
        static void Test()
        {
            ICovariant<Object> iobj = new Sample<Object>();
            ICovariant<String> istr = new Sample<String>();

            // You can assign istr to iobj because
            // the ICovariant interface is covariant.
            iobj = istr;
        }
    }

    class Sample
    {
    // Covariant delegate.
    public delegate R DCovariant<out R>();

    // Methods that match the delegate signature.
    public static Control SampleControl()
    { return new Control(); }

    public static Button SampleButton()
    { return new Button(); }

    public void Test()
    {
        // Instantiate the delegates with the methods.
        DCovariant<Control> dControl = SampleControl;
        DCovariant<Button> dButton = SampleButton;

        // You can assign dButton to dControl
        // because the DCovariant delegate is covariant.
        dControl = dButton;

        // Invoke the delegate.
        dControl();
    }
    }
}
```
In a generic delegate, declare a type covariant if you use it only as a method return type and not for method arguments.

## C# language specification

For more information, see the C# Language Specification. The language specification is the definitive source for C# syntax and usage.

## See also

- Variance in Generic Interfaces
- in
- Modifiers
