---
title: "Lock statement errors and warnings"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/compiler-messages/lock-semantics.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Errors and warnings related to the `lock` statement and thread synchronization

There are a few *errors* related to the `lock` statement and thread synchronization:

- **CS0185**: *'type' is not a reference type as required by the lock statement.*
- **CS9217**: *A lock statement on a value of type 'System.Threading.Lock' cannot be used in async methods or async lambda expressions.*

In addition, the compiler might produce the following *warning* related to `lock` statements and thread synchronization:

- **CS9216**: *A value of type `System.Threading.Lock` converted to a different type will use likely unintended monitor-based locking in `lock` statement.*

## lock statement errors

- **CS0185**: *'type' is not a reference type as required by the lock statement.*
- **CS9217**: *A lock statement on a value of type 'System.Threading.Lock' cannot be used in async methods or async lambda expressions.*

These errors indicate that your code violates rules regarding the `lock` the statement:

- The object being `lock`ed must be a reference types. Value types aren't allowed.
- The `lock` statement can't be used with `async` methods or lambda expressions. For this error, you can replace the type of object locked with a different type. The `lock` statement uses the `System.Threading.Monitor` API.

You must update your code to follow the rules of the `lock` statement.

## lock warning

- **CS9216**: *A value of type `System.Threading.Lock` converted to a different type will use likely unintended monitor-based locking in `lock` statement.*

Beginning with C# 13, the `lock` generates specialized code when the target object is a `System.Threading.Lock` object. The compiler generates this warning when you're using a `Lock` object, but your code converts its type to something else. Therefore, the compiler generates the general locking code, not the locking code specific to the `Lock` type. For example:

```csharp
object lockObject = new System.Threading.Lock();

lock (lockObject) // CS9216
{
    // .. Your code
}
```

You should ensure the variable or expression represents the type of the `Lock` object.
