---
title: "Object class (part 1 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Object.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Object class

Namespace: `System`

```csharp
public class Object
```

Supports all classes in the .NET class hierarchy and provides low-level services to derived classes. This is the ultimate base class of all .NET classes; it is the root of the type hierarchy.

The `Object` class is the ultimate base class of all .NET classes; it is the root of the type hierarchy.

Because all classes in .NET are derived from `Object`, every method defined in the `Object` class is available in all objects in the system. Derived classes can and do override some of these methods, including:

- `Object.Equals`: Supports comparisons between objects.
- `Object.Finalize`: Performs cleanup operations before an object is automatically reclaimed.
- `Object.GetHashCode`: Generates a number corresponding to the value of the object to support the use of a hash table.
- `Object.ToString`: Manufactures a human-readable text string that describes an instance of the class.

Languages typically don't require a class to declare inheritance from `Object` because the inheritance is implicit.

#### Performance considerations

If you're designing a class, such as a collection, that must handle any type of object, you can create class members that accept instances of the `Object` class. However, the process of boxing and unboxing a type carries a performance cost. If you know your new class will frequently handle certain value types you can use one of two tactics to minimize the cost of boxing.

- Create a general method that accepts an `Object` type, and a set of type-specific method overloads that accept each value type you expect your class to frequently handle. If a type-specific method exists that accepts the calling parameter type, no boxing occurs and the type-specific method is invoked. If there is no method argument that matches the calling parameter type, the parameter is boxed and the general method is invoked.
- Design your type and its members to use generics. The common language runtime creates a closed generic type when you create an instance of your class and specify a generic type argument. The generic method is type-specific and can be invoked without boxing the calling parameter.

Although it's sometimes necessary to develop general purpose classes that accept and return `Object` types, you can improve performance by also providing a type-specific class to handle a frequently used type. For example, providing a class that is specific to setting and getting Boolean values eliminates the cost of boxing and unboxing Boolean values.

The following example defines a Point type derived from the `Object` class and overrides many of the virtual methods of the `Object` class. In addition, the example shows how to call many of the static and instance methods of the `Object` class.

_Code sample not included: ~/snippets/csharp/System/Object/Overview/ObjectX.cs._

## Object.Object() constructor

```csharp
public Object ();
```

Initializes a new instance of the `Object` class.

#### Remarks
This constructor is called by constructors in derived classes, but it can also be used to directly create an instance of the `Object` class.
