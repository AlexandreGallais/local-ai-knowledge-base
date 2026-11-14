---
title: "UnsafeAccessorAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/UnsafeAccessorAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UnsafeAccessorAttribute class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class UnsafeAccessorAttribute : Attribute
```

Provides access to an inaccessible member of a specific type.

#### Remarks

You can apply this attribute to an `extern static` method. The implementation of the `extern static` method annotated with this attribute will be provided by the runtime based on the information in the attribute and the signature of the method that the attribute is applied to. The runtime will try to find the matching method or field and forward the call to it. If the matching method or field is not found, the body of the `extern static` method will throw `MissingFieldException` or `MissingMethodException`.

Generic parameters are supported since .NET 9. Generic parameters must match the target in form and index (that is, type parameters must be type parameters and method parameters must be method parameters). The `extern static` method's generic parameters must also exactly match any constraints reflected on the target. If constraints don't match, the method throws `InvalidProgramException`.

For `Method`, `StaticMethod`, `Field`, and `StaticField`, the type of the first argument of the annotated `extern static` method identifies the owning type. Only the specific type defined will be examined for inaccessible members. The type hierarchy is not walked looking for a match.

The value of the first argument is treated as `this` pointer for instance fields and methods.

The first argument must be passed as `ref` for instance fields and methods on structs.

The value of the first argument is not used by the implementation for `static` fields and methods and can be `null`.

The return value for an accessor to a field must be passed as `ref`.

Constructors can be accessed using `Constructor` or `Method`.

A match is determined by comparing metadata signatures as defined in section II.23.2 of ECMA-335. The return type is considered for the signature match. Modreqs and modopts are initially not considered for the signature match. However, if an ambiguity exists ignoring modreqs and modopts, a precise match is attempted. If an ambiguity still exists, `AmbiguousMatchException` is thrown.

By default, the attributed method's name dictates the name of the method/field. This can cause confusion in some cases since language abstractions, like C# local functions, generate mangled IL names. The solution to this is to use the `nameof` mechanism and define the `Name` property.

```csharp

      public class Class
      {
          static void StaticPrivateMethod() { }
          static int StaticPrivateField;
          Class(int i) { PrivateField = i; }
          void PrivateMethod() { }
          int PrivateField;
          int PrivateProperty { get => PrivateField; }
      }

      public void CallStaticPrivateMethod()
      {
          StaticPrivateMethod(null);

          [UnsafeAccessor(UnsafeAccessorKind.StaticMethod, Name = nameof(StaticPrivateMethod))]
          extern static void StaticPrivateMethod(Class c);
      }
      public void GetSetStaticPrivateField()
      {
          ref int f = ref GetSetStaticPrivateField(null);

          [UnsafeAccessor(UnsafeAccessorKind.StaticField, Name = "StaticPrivateField")]
          extern static ref int GetSetStaticPrivateField(Class c);
      }
      public void CallPrivateConstructor()
      {
          Class c1 = PrivateCtor(1);

          Class c2 = (Class)RuntimeHelpers.GetUninitializedObject(typeof(Class));

          PrivateCtorAsMethod(c2, 2);

          [UnsafeAccessor(UnsafeAccessorKind.Constructor)]
          extern static Class PrivateCtor(int i);

          [UnsafeAccessor(UnsafeAccessorKind.Method, Name = ".ctor")]
          extern static void PrivateCtorAsMethod(Class c, int i);

      }
      public void CallPrivateMethod(Class c)
      {
          PrivateMethod(c);

          [UnsafeAccessor(UnsafeAccessorKind.Method, Name = nameof(PrivateMethod))]
          extern static void PrivateMethod(Class c);
      }
      public void GetPrivateProperty(Class c)
      {
          int f = GetPrivateProperty(c);

          [UnsafeAccessor(UnsafeAccessorKind.Method, Name = "get_PrivateProperty")]
          extern static int GetPrivateProperty(Class c);
      }
      public void GetSetPrivateField(Class c)
      {
          ref int f = ref GetSetPrivateField(c);

          [UnsafeAccessor(UnsafeAccessorKind.Field, Name = "PrivateField")]
          extern static ref int GetSetPrivateField(Class c);
      }

      // Generic example
      public class Class<T>
      {
          private T _field;
          private void M(T t) { }
          private void GM<U>(U u) { }
          private void GMWithConstraints<U, V>(U u, V v) where U : V, IEquatable<U> { }
      }

      class Accessors<V>
      {
          [UnsafeAccessor(UnsafeAccessorKind.Field, Name = "_field")]
          public extern static ref V GetSetPrivateField(Class<V> c);

          [UnsafeAccessor(UnsafeAccessorKind.Method, Name = "M")]
          public extern static void CallM(Class<V> c, V v);

          [UnsafeAccessor(UnsafeAccessorKind.Method, Name = "GM")]
          public extern static void CallGM<X>(Class<V> c, X x);

          [UnsafeAccessor(UnsafeAccessorKind.Method, Name = "GMWithConstraints")]
          public extern static void CallGMWithConstraints<X, Y>(Class<V> c, X x, Y y) where X : Y, IEquatable<X>;
      }

      public void AccessGenericType(Class<int> c)
      {
          ref int f = ref Accessors<int>.GetSetPrivateField(c);

          Accessors<int>.CallM(c, 1);

          Accessors<int>.CallGM<string>(c, string.Empty);

          Accessors<int>.CallGMWithConstraints<string, object>(c, string.Empty, new object());
      }
      
```

## UnsafeAccessorAttribute.UnsafeAccessorAttribute(UnsafeAccessorKind) constructor

```csharp
public UnsafeAccessorAttribute (System.Runtime.CompilerServices.UnsafeAccessorKind kind);
```

Instantiates an `UnsafeAccessorAttribute` providing access to a member of kind `UnsafeAccessorKind`.

Parameters:

- `kind`: The kind of the target to which access is provided.

To be added.

## UnsafeAccessorAttribute.Kind property

```csharp
public System.Runtime.CompilerServices.UnsafeAccessorKind Kind { get; }
```

Gets the kind of member to which access is provided.

Returns: To be added.

To be added.

## UnsafeAccessorAttribute.Name property

```csharp
public string? Name { get; set; }
```

Gets or sets the name of the member to which access is provided.

Returns: To be added.

The name defaults to the annotated method name if not specified.
The name must be unset/
```csharp
null
```
for `UnsafeAccessorKind.Constructor`.
