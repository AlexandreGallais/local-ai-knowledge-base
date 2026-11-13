---
title: "where (generic type constraint) (part 2 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/keywords/where-generic-type-constraint.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# where (generic type constraint) (part 2 of 3)

```csharp
﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace Keywords
{
    public class AGenericClass<T> where T : IComparable<T> { }

    public class UsingEnum<T> where T : System.Enum { }

    public class UsingDelegate<T> where T : System.Delegate { }

    public class Multicaster<T> where T : System.MulticastDelegate { }

    class MyClass<T, U>
        where T : class
        where U : struct
    { }

    class UnManagedWrapper<T>
        where T : unmanaged
    { }

#nullable enable
    class NotNullContainer<T>
        where T : notnull
    {
    }
#nullable restore

    public class MyGenericClass<T> where T : IComparable<T>, new()
    {
        // The following line is not possible without new() constraint:
        T item = new T();
    }

    public class GenericRefStruct<T> where T : allows ref struct
    {
        // Scoped is allowed because T might be a ref struct
        public void M(scoped T parm)
        {

        }
    }

    public interface IMyInterface { }

    namespace CodeExample
    {
        class Dictionary<TKey, TVal>
            where TKey : <example-value><TKey>
            where TVal : IMyInterface
        {
            public void Add(TKey key, TVal val) { }
        }
    }
    public class Container
    {
        public void MyMethod<T>(T t) where T : IMyInterface { }

        delegate T MyDelegate<T>() where T : new();
    }

    public interface IEmployee
    {
    }

    public abstract class B
    {
        public void M<T>(T? item) where T : struct { }
        public abstract void M<T>(T? item);

    }

    public class D : B
    {
        // Without the "default" constraint, the compiler tries to override the first method in B
        public override void M<T>(T? item) where T : default { }
    }
}
```
The `where` clause can also include an `unmanaged` constraint. The `unmanaged` constraint limits the type parameter to types known as unmanaged types. The `unmanaged` constraint makes it easier to write low-level interop code in C#. This constraint enables reusable routines across all unmanaged types. The `unmanaged` constraint can't be combined with the `class` or `struct` constraint. The `unmanaged` constraint enforces that the type must be a `struct`:

```csharp
﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace Keywords
{
    public class AGenericClass<T> where T : IComparable<T> { }

    public class UsingEnum<T> where T : System.Enum { }

    public class UsingDelegate<T> where T : System.Delegate { }

    public class Multicaster<T> where T : System.MulticastDelegate { }

    class MyClass<T, U>
        where T : class
        where U : struct
    { }

    class UnManagedWrapper<T>
        where T : unmanaged
    { }

#nullable enable
    class NotNullContainer<T>
        where T : notnull
    {
    }
#nullable restore

    public class MyGenericClass<T> where T : IComparable<T>, new()
    {
        // The following line is not possible without new() constraint:
        T item = new T();
    }

    public class GenericRefStruct<T> where T : allows ref struct
    {
        // Scoped is allowed because T might be a ref struct
        public void M(scoped T parm)
        {

        }
    }

    public interface IMyInterface { }

    namespace CodeExample
    {
        class Dictionary<TKey, TVal>
            where TKey : <example-value><TKey>
            where TVal : IMyInterface
        {
            public void Add(TKey key, TVal val) { }
        }
    }
    public class Container
    {
        public void MyMethod<T>(T t) where T : IMyInterface { }

        delegate T MyDelegate<T>() where T : new();
    }

    public interface IEmployee
    {
    }

    public abstract class B
    {
        public void M<T>(T? item) where T : struct { }
        public abstract void M<T>(T? item);

    }

    public class D : B
    {
        // Without the "default" constraint, the compiler tries to override the first method in B
        public override void M<T>(T? item) where T : default { }
    }
}
```
The `where` clause can also include a constructor constraint, `new()`. That constraint makes it possible to create an instance of a type parameter by using the `new` operator. The new() Constraint lets the compiler know that any type argument supplied must have an accessible parameterless constructor. For example:

```csharp
﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace Keywords
{
    public class AGenericClass<T> where T : IComparable<T> { }

    public class UsingEnum<T> where T : System.Enum { }

    public class UsingDelegate<T> where T : System.Delegate { }

    public class Multicaster<T> where T : System.MulticastDelegate { }

    class MyClass<T, U>
        where T : class
        where U : struct
    { }

    class UnManagedWrapper<T>
        where T : unmanaged
    { }

#nullable enable
    class NotNullContainer<T>
        where T : notnull
    {
    }
#nullable restore

    public class MyGenericClass<T> where T : IComparable<T>, new()
    {
        // The following line is not possible without new() constraint:
        T item = new T();
    }

    public class GenericRefStruct<T> where T : allows ref struct
    {
        // Scoped is allowed because T might be a ref struct
        public void M(scoped T parm)
        {

        }
    }

    public interface IMyInterface { }

    namespace CodeExample
    {
        class Dictionary<TKey, TVal>
            where TKey : <example-value><TKey>
            where TVal : IMyInterface
        {
            public void Add(TKey key, TVal val) { }
        }
    }
    public class Container
    {
        public void MyMethod<T>(T t) where T : IMyInterface { }

        delegate T MyDelegate<T>() where T : new();
    }

    public interface IEmployee
    {
    }

    public abstract class B
    {
        public void M<T>(T? item) where T : struct { }
        public abstract void M<T>(T? item);

    }

    public class D : B
    {
        // Without the "default" constraint, the compiler tries to override the first method in B
        public override void M<T>(T? item) where T : default { }
    }
}
```
The `new()` constraint appears last in the `where` clause, unless it's followed by the `allows ref struct` anti-constraint. The `new()` constraint can't be combined with the `struct` or `unmanaged` constraints. All types satisfying those constraints must have an accessible parameterless constructor, making the `new()` constraint redundant.

This anti-constraint declares that the type argument for `T` can be a `ref struct` type. For example:

```csharp
﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace Keywords
{
    public class AGenericClass<T> where T : IComparable<T> { }

    public class UsingEnum<T> where T : System.Enum { }

    public class UsingDelegate<T> where T : System.Delegate { }

    public class Multicaster<T> where T : System.MulticastDelegate { }

    class MyClass<T, U>
        where T : class
        where U : struct
    { }

    class UnManagedWrapper<T>
        where T : unmanaged
    { }

#nullable enable
    class NotNullContainer<T>
        where T : notnull
    {
    }
#nullable restore

    public class MyGenericClass<T> where T : IComparable<T>, new()
    {
        // The following line is not possible without new() constraint:
        T item = new T();
    }

    public class GenericRefStruct<T> where T : allows ref struct
    {
        // Scoped is allowed because T might be a ref struct
        public void M(scoped T parm)
        {

        }
    }

    public interface IMyInterface { }

    namespace CodeExample
    {
        class Dictionary<TKey, TVal>
            where TKey : <example-value><TKey>
            where TVal : IMyInterface
        {
            public void Add(TKey key, TVal val) { }
        }
    }
    public class Container
    {
        public void MyMethod<T>(T t) where T : IMyInterface { }

        delegate T MyDelegate<T>() where T : new();
    }

    public interface IEmployee
    {
    }

    public abstract class B
    {
        public void M<T>(T? item) where T : struct { }
        public abstract void M<T>(T? item);

    }

    public class D : B
    {
        // Without the "default" constraint, the compiler tries to override the first method in B
        public override void M<T>(T? item) where T : default { }
    }
}
```
The generic type or method must obey ref safety rules for any instance of `T` because it might be a `ref struct`. The `allows ref struct` clause can't be combined with the `class` or `class?` constraint. The `allows ref struct` anti-constraint must follow all constraints for that type argument.

With multiple type parameters, use one `where` clause for each type parameter, for example:

```csharp
﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace Keywords
{
    public class AGenericClass<T> where T : IComparable<T> { }

    public class UsingEnum<T> where T : System.Enum { }

    public class UsingDelegate<T> where T : System.Delegate { }

    public class Multicaster<T> where T : System.MulticastDelegate { }

    class MyClass<T, U>
        where T : class
        where U : struct
    { }

    class UnManagedWrapper<T>
        where T : unmanaged
    { }

#nullable enable
    class NotNullContainer<T>
        where T : notnull
    {
    }
#nullable restore

    public class MyGenericClass<T> where T : IComparable<T>, new()
    {
        // The following line is not possible without new() constraint:
        T item = new T();
    }

    public class GenericRefStruct<T> where T : allows ref struct
    {
        // Scoped is allowed because T might be a ref struct
        public void M(scoped T parm)
        {

        }
    }

    public interface IMyInterface { }

    namespace CodeExample
    {
        class Dictionary<TKey, TVal>
            where TKey : <example-value><TKey>
            where TVal : IMyInterface
        {
            public void Add(TKey key, TVal val) { }
        }
    }
    public class Container
    {
        public void MyMethod<T>(T t) where T : IMyInterface { }

        delegate T MyDelegate<T>() where T : new();
    }

    public interface IEmployee
    {
    }

    public abstract class B
    {
        public void M<T>(T? item) where T : struct { }
        public abstract void M<T>(T? item);

    }

    public class D : B
    {
        // Without the "default" constraint, the compiler tries to override the first method in B
        public override void M<T>(T? item) where T : default { }
    }
}
```
You can also attach constraints to type parameters of generic methods, as shown in the following example:

```csharp
﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace Keywords
{
    public class AGenericClass<T> where T : IComparable<T> { }

    public class UsingEnum<T> where T : System.Enum { }

    public class UsingDelegate<T> where T : System.Delegate { }

    public class Multicaster<T> where T : System.MulticastDelegate { }

    class MyClass<T, U>
        where T : class
        where U : struct
    { }

    class UnManagedWrapper<T>
        where T : unmanaged
    { }

#nullable enable
    class NotNullContainer<T>
        where T : notnull
    {
    }
#nullable restore

    public class MyGenericClass<T> where T : IComparable<T>, new()
    {
        // The following line is not possible without new() constraint:
        T item = new T();
    }

    public class GenericRefStruct<T> where T : allows ref struct
    {
        // Scoped is allowed because T might be a ref struct
        public void M(scoped T parm)
        {

        }
    }

    public interface IMyInterface { }

    namespace CodeExample
    {
        class Dictionary<TKey, TVal>
            where TKey : <example-value><TKey>
            where TVal : IMyInterface
        {
            public void Add(TKey key, TVal val) { }
        }
    }
    public class Container
    {
        public void MyMethod<T>(T t) where T : IMyInterface { }

        delegate T MyDelegate<T>() where T : new();
    }

    public interface IEmployee
    {
    }

    public abstract class B
    {
        public void M<T>(T? item) where T : struct { }
        public abstract void M<T>(T? item);

    }

    public class D : B
    {
        // Without the "default" constraint, the compiler tries to override the first method in B
        public override void M<T>(T? item) where T : default { }
    }
}
```
The syntax to describe type parameter constraints on delegates is the same as that of methods:

```csharp
﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace Keywords
{
    public class AGenericClass<T> where T : IComparable<T> { }

    public class UsingEnum<T> where T : System.Enum { }

    public class UsingDelegate<T> where T : System.Delegate { }

    public class Multicaster<T> where T : System.MulticastDelegate { }

    class MyClass<T, U>
        where T : class
        where U : struct
    { }

    class UnManagedWrapper<T>
        where T : unmanaged
    { }

#nullable enable
    class NotNullContainer<T>
        where T : notnull
    {
    }
#nullable restore

    public class MyGenericClass<T> where T : IComparable<T>, new()
    {
        // The following line is not possible without new() constraint:
        T item = new T();
    }

    public class GenericRefStruct<T> where T : allows ref struct
    {
        // Scoped is allowed because T might be a ref struct
        public void M(scoped T parm)
        {

        }
    }

    public interface IMyInterface { }

    namespace CodeExample
    {
        class Dictionary<TKey, TVal>
            where TKey : <example-value><TKey>
            where TVal : IMyInterface
        {
            public void Add(TKey key, TVal val) { }
        }
    }
    public class Container
    {
        public void MyMethod<T>(T t) where T : IMyInterface { }

        delegate T MyDelegate<T>() where T : new();
    }

    public interface IEmployee
    {
    }

    public abstract class B
    {
        public void M<T>(T? item) where T : struct { }
        public abstract void M<T>(T? item);

    }

    public class D : B
    {
        // Without the "default" constraint, the compiler tries to override the first method in B
        public override void M<T>(T? item) where T : default { }
    }
}
```
For information on generic delegates, see Generic Delegates.

For details on the syntax and use of constraints, see Constraints on Type Parameters.

## C# language specification

 For more information, see the C# Language Specification. The language specification is the definitive source for C# syntax and usage.
