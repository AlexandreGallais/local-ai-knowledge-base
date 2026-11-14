---
title: "Object class (part 3 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Object.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Object class (part 3 of 5)

## Object.Finalize() method

```csharp
~Object ();
```

Allows an object to try to free resources and perform other cleanup operations before it is reclaimed by garbage collection.

The `Object.Finalize` method is used to perform cleanup operations on unmanaged resources held by the current object before the object is destroyed. The method is protected and therefore is accessible only through this class or through a derived class.

#### How finalization works

The `Object` class provides no implementation for the `Object.Finalize` method, and the garbage collector does not mark types derived from `Object` for finalization unless they override the `Object.Finalize` method.

If a type does override the `Object.Finalize` method, the garbage collector adds an entry for each instance of the type to an internal structure called the finalization queue. The finalization queue contains entries for all the objects in the managed heap whose finalization code must run before the garbage collector can reclaim their memory. The garbage collector then calls the `Object.Finalize` method automatically when it discovers that an object is inaccessible, unless the object has been exempted from finalization by a call to the `GC.SuppressFinalize` method.

`Object.Finalize` is automatically called only once on a given instance, unless the object is re-registered by using a mechanism such as `GC.ReRegisterForFinalize` and the `GC.SuppressFinalize` method has not been subsequently called.

`Object.Finalize` operations have the following limitations:

- The exact time when the finalizer executes is undefined. To ensure deterministic release of resources for instances of your class, implement a `Close` method or provide a `IDisposable.Dispose` implementation.
- The finalizers of two objects are not guaranteed to run in any specific order, even if one object refers to the other. That is, if Object A has a reference to Object B and both have finalizers, Object B might have already been finalized when the finalizer of Object A starts.
- The thread on which the finalizer runs is unspecified.

The `Object.Finalize` method might not run to completion or might not run at all under the following exceptional circumstances:

- If another finalizer blocks indefinitely (goes into an infinite loop, tries to obtain a lock it can never obtain, and so on). Because the runtime tries to run finalizers to completion, other finalizers might not be called if a finalizer blocks indefinitely.
- If the process terminates without giving the runtime a chance to clean up. In this case, the runtime's first notification of process termination is a DLL_PROCESS_DETACH notification.

The runtime continues to finalize objects during shutdown only while the number of finalizable objects continues to decrease.

If `Object.Finalize` or an override of `Object.Finalize` throws an exception, and the runtime is not hosted by an application that overrides the default policy, the runtime terminates the process and no active `try`/`finally` blocks or finalizers are executed. This behavior ensures process integrity if the finalizer cannot free or destroy resources.

#### Overriding the Finalize method

You should override `Object.Finalize` for a class that uses unmanaged resources, such as file handles or database connections that must be released when the managed object that uses them is discarded during garbage collection. You shouldn't implement a `Object.Finalize` method for managed objects because the garbage collector releases managed resources automatically.

> **Important:**
> If a `SafeHandle` object is available that wraps your unmanaged resource, the recommended alternative is to implement the dispose pattern with a safe handle and not override `Object.Finalize`. For more information, see The SafeHandle alternative section.

The `Object.Finalize` method does nothing by default, but you should override `Object.Finalize` only if necessary, and only to release unmanaged resources. Reclaiming memory tends to take much longer if a finalization operation runs, because it requires at least two garbage collections. In addition, you should override the `Object.Finalize` method for reference types only. The common language runtime only finalizes reference types. It ignores finalizers on value types.

The scope of the `Object.Finalize` method is `protected`. You should maintain this limited scope when you override the method in your class. By keeping a `Object.Finalize` method protected, you prevent users of your application from calling an object's `Object.Finalize` method directly.

Every implementation of `Object.Finalize` in a derived type must call its base type's implementation of `Object.Finalize`. This is the only case in which application code is allowed to call `Object.Finalize`. An object's `Object.Finalize` method shouldn't call a method on any objects other than that of its base class. This is because the other objects being called could be collected at the same time as the calling object, such as in the case of a common language runtime shutdown.

> **Note:**
> The C# compiler does not allow you to override the `Object.Finalize` method. Instead, you provide a finalizer by implementing a destructor for your class. A C# destructor automatically calls the destructor of its base class.
>
> Visual C++ also provides its own syntax for implementing the `Object.Finalize` method. For more information, see the "Destructors and finalizers" section of How to: Define and Consume Classes and Structs (C++/CLI).

Because garbage collection is non-deterministic, you do not know precisely when the garbage collector performs finalization. To release resources immediately, you can also choose to implement the dispose pattern
and the `IDisposable` interface. The `IDisposable.Dispose` implementation can be called by consumers of your class to free unmanaged resources, and you can use the `Object.Finalize` method to free unmanaged resources in the event that the `IDisposable.Dispose` method is not called.

`Object.Finalize` can take almost any action, including resurrecting an object (that is, making the object accessible again) after it has been cleaned up during garbage collection. However, the object can only be resurrected once; `Object.Finalize` cannot be called on resurrected objects during garbage collection.

#### The SafeHandle alternative

Creating reliable finalizers is often difficult, because you cannot make assumptions about the state of your application, and because unhandled system exceptions such as `OutOfMemoryException` and `StackOverflowException` terminate the finalizer. Instead of implementing a finalizer for your class to release unmanaged resources, you can use an object that is derived from the `SafeHandle` class to wrap your unmanaged resources, and then implement the dispose pattern without a finalizer. .NET provides the following classes in the `Win32` namespace that are derived from `SafeHandle`:

- `SafeFileHandle` is a wrapper class for a file handle.
- `SafeMemoryMappedFileHandle` is a wrapper class for memory-mapped file handles.
- `SafeMemoryMappedViewHandle` is a wrapper class for a pointer to a block of unmanaged memory.
- `SafeNCryptKeyHandle`, `SafeNCryptProviderHandle`, and `SafeNCryptSecretHandle` are wrapper classes for cryptographic handles.
- `SafePipeHandle` is a wrapper class for pipe handles.
- `SafeRegistryHandle` is a wrapper class for a handle to a registry key.
- `SafeWaitHandle` is a wrapper class for a wait handle.

The following example uses the dispose pattern with safe handles instead of overriding the `Object.Finalize` method. It defines a `FileAssociation` class that wraps registry information about the application that handles files with a particular file extension. The two registry handles returned as `out` parameters by Windows RegOpenKeyEx function calls are passed to the `SafeRegistryHandle` constructor. The type's protected `Dispose` method then calls the `SafeRegistryHandle.Dispose` method to free these two handles.

_Code sample not included: ~/snippets/csharp/System/Object/Finalize/finalize_safe.cs._

The following example verifies that the `Object.Finalize` method is called when an object that overrides `Object.Finalize` is destroyed. Note that, in a production application, the `Object.Finalize` method would be overridden to release unmanaged resources held by the object. Also note that the C# example provides a destructor instead of overriding the `Object.Finalize` method.

_Code sample not included: ~/snippets/csharp/System/Object/Finalize/finalize1.cs._

For an additional example that overrides the `Object.Finalize` method, see the `GC.SuppressFinalize` method.

## Object.GetHashCode() method

```csharp
public virtual int GetHashCode ();
```

Serves as the default hash function.

Returns: A hash code for the current object.

The `Object.GetHashCode` method provides a hash code for algorithms that need quick checks of object equality. A hash code is a numeric value that is used to insert and identify an object in a hash-based collection, such as the `Dictionary<T1,T2>` class, the `Hashtable` class, or a type derived from the `DictionaryBase` class.

> **Note:**
> For information about how hash codes are used in hash tables and for some additional hash code algorithms, see the Hash Function entry in Wikipedia.

Two objects that are equal return hash codes that are equal. However, the reverse is not true: equal hash codes do not imply object equality, because different (unequal) objects can have identical hash codes. Furthermore, .NET does not guarantee the default implementation of the `Object.GetHashCode` method, and the value this method returns might differ between .NET implementations and platforms, such as between 32-bit and 64-bit platforms. For these reasons, do not use the default implementation of this method as a unique object identifier for hashing purposes. Two consequences follow from this:

- You should not assume that equal hash codes imply object equality.
- You should never persist or use a hash code outside the application domain in which it was created, because the same object may hash across application domains, processes, and platforms.

> **Warning:**
> A hash code is intended for efficient insertion and lookup in collections that are based on a hash table. A hash code is not a permanent value. For this reason:
>
> - Do not serialize hash code values or store them in databases.
> - Do not use the hash code as the key to retrieve an object from a keyed collection.
> - Do not send hash codes across application domains or processes. In some cases, hash codes may be computed on a per-process or per-application domain basis.
> - Do not use the hash code instead of a value returned by a cryptographic hashing function if you need a cryptographically strong hash. For cryptographic hashes, use a class derived from the `HashAlgorithm` or `KeyedHashAlgorithm` class.
> - Do not test for equality of hash codes to determine whether two objects are equal. (Unequal objects can have identical hash codes.) To test for equality, call the `Object.ReferenceEquals` or `Object.Equals` method.

The `Object.GetHashCode` method can be overridden by a derived type. If `Object.GetHashCode` is not overridden, hash codes for reference types are computed by calling the `Object.GetHashCode` method of the base class, which computes a hash code based on an object's reference; for more information, see `RuntimeHelpers.GetHashCode`. In other words, two objects for which the `Object.ReferenceEquals` method returns `true` have identical hash codes. If value types do not override `Object.GetHashCode`, the `ValueType.GetHashCode` method of the base class uses reflection to compute the hash code based on the values of the type's fields. In other words, value types whose fields have equal values have equal hash codes. For more information about overriding `Object.GetHashCode`, see the "Notes to Inheritors" section.

> **Warning:**
> If you override the `Object.GetHashCode` method, you should also override `Object.Equals`, and vice versa. If your overridden `Object.Equals` method returns `true` when two objects are tested for equality, your overridden `Object.GetHashCode` method must return the same value for the two objects.

If an object that is used as a key in a hash table does not provide a useful implementation of `Object.GetHashCode`, you can specify a hash code provider by supplying an `IEqualityComparer` implementation to one of the overloads of the `Hashtable` class constructor.

#### Examples

One of the simplest ways to compute a hash code for a numeric value that has the same or a smaller range than the `Int32` type is to simply return that value. The following example shows such an implementation for a `Number` structure.

_Code sample not included: ~/snippets/csharp/System/Object/GetHashCode/direct1.cs._

Frequently, a type has multiple data fields that can participate in generating the hash code. One way to generate a hash code is to combine these fields using an `XOR (eXclusive OR)` operation, as shown in the following example.

_Code sample not included: ~/snippets/csharp/System/Object/GetHashCode/xor1.cs._

The previous example returns the same hash code for (n1, n2) and (n2, n1), and so it might generate more collisions than are desirable. On .NET 5+, the recommended solution is to use `HashCode.Combine`. It avoids the symmetry problem and produces a well-distributed hash code without the overhead of creating a `Tuple` object.

_Code sample not included: ~/snippets/csharp/System/Object/GetHashCode/xor2.cs._
