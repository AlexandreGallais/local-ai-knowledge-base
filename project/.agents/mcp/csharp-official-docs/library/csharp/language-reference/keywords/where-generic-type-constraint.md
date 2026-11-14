---
title: "where (generic type constraint) (part 1 of 3)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/where-generic-type-constraint.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# where (generic type constraint) (C# Reference)

In a generic definition, use the `where` clause to specify constraints on the types that you use as arguments for type parameters in a generic type, method, delegate, or local function. You can specify interfaces, base classes, or require a generic type to be a reference, value, or unmanaged type. These constraints declare capabilities that the type argument must have. Place the `where` clause after any declared base class or implemented interfaces.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

For example, you can declare a generic class, `AGenericClass`, such that the type parameter `T` implements the `System.IComparable`1` interface:

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
> **Note:**
> For more information on the where clause in a query expression, see where clause.

The `where` clause can also include a base class constraint. The base class constraint states that a type to use as a type argument for that generic type has the specified class as a base class, or is that base class. If you use the base class constraint, it must appear before any other constraints on that type parameter. Some types are disallowed as a base class constraint: `System.Object`, `System.Array`, and `System.ValueType`. The following example shows the types that you can specify as a base class:

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
In a nullable context, the compiler enforces the nullability of the base class type. If the base class is non-nullable (for example `Base`), the type argument must be non-nullable. If the base class is nullable (for example `Base?`), the type argument can be either a nullable or non-nullable reference type. The compiler issues a warning if the type argument is a nullable reference type when the base class is non-nullable.

The `where` clause can specify that the type is a `class` or a `struct`. The `struct` constraint removes the need to specify a base class constraint of `System.ValueType`. The `System.ValueType` type can't be used as a base class constraint. The following example shows both the `class` and `struct` constraints:

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
In a nullable context, the `class` constraint requires a type to be a non-nullable reference type. To allow nullable reference types, use the `class?` constraint, which allows both nullable and non-nullable reference types.

The `where` clause can include the `notnull` constraint. The `notnull` constraint limits the type parameter to non-nullable types. The type can be a value type or a non-nullable reference type. The `notnull` constraint is available for code compiled in a `nullable enable` context. Unlike other constraints, if a type argument violates the `notnull` constraint, the compiler generates a warning instead of an error. Warnings are only generated in a `nullable enable` context.

The addition of nullable reference types introduces a potential ambiguity in the meaning of `T?` in generic methods. If `T` is a `struct`, `T?` is the same as `System.Nullable`1`. However, if `T` is a reference type, `T?` means that `null` is a valid value. The ambiguity arises because overriding methods can't include constraints. The new `default` constraint resolves this ambiguity. Add it when a base class or interface declares two overloads of a method, one that specifies the `struct` constraint, and one that doesn't have either the `struct` or `class` constraint applied:

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
Use the `default` constraint to specify that your derived class overrides the method without the constraint in your derived class, or explicit interface implementation. It's only valid on methods that override base methods, or explicit interface implementations:

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
> **Important:**
> You can use generic declarations that include the `notnull` constraint in a nullable oblivious context, but the compiler doesn't enforce the constraint.
