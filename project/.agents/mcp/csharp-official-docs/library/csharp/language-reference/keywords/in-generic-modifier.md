---
title: "in (Generic Modifier)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/in-generic-modifier.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# `in` (Generic Modifier) (C# Reference)

For generic type parameters, use the `in` keyword to allow contravariant type arguments. Use the `in` keyword in generic interfaces and delegates.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

Contravariance enables you to use a less derived type than the type specified by the generic parameter. This feature allows for implicit conversion of classes that implement contravariant interfaces and implicit conversion of delegate types. Reference types support covariance and contravariance in generic type parameters, but value types don't support these features.

You can declare a type as contravariant in a generic interface or delegate only if it defines the type of a method's parameters and not the method's return type. `In`, `ref`, and `out` parameters must be invariant, meaning they're neither covariant nor contravariant.

An interface that has a contravariant type parameter allows its methods to accept arguments of less derived types than those specified by the interface type parameter. For example, in the `System.Collections.Generic.IComparer`1` interface, type T is contravariant. You can assign an object of the `IComparer<Person>` type to an object of the `IComparer<Employee>` type without using any special conversion methods if `Employee` inherits `Person`.

You can assign a contravariant delegate to another delegate of the same type, but with a less derived generic type parameter.

For more information, see Covariance and Contravariance.

## Contravariant generic interface

The following example shows how to declare, extend, and implement a contravariant generic interface. It also shows how you can use implicit conversion for classes that implement this interface.

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
## Contravariant generic delegate

The following example shows how to declare, instantiate, and invoke a contravariant generic delegate. It also shows how you can implicitly convert a delegate type.

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
## C# language specification

For more information, see the C# Language Specification. The language specification is the definitive source for C# syntax and usage.

## See also

- out
- Covariance and Contravariance
- Modifiers
