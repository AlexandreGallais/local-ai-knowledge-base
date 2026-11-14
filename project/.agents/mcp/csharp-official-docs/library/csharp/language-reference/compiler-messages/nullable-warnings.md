---
title: "Nullable reference type warnings (part 1 of 3)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/compiler-messages/nullable-warnings.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Nullable reference type warnings

The purpose of nullable warnings is to minimize the chance that your application throws a `System.NullReferenceException` when run. To achieve this goal, the compiler uses static analysis and issues warnings when your code has constructs that might lead to null reference exceptions. You provide the compiler with information for its static analysis by applying type annotations and attributes. These annotations and attributes describe the nullability of arguments, parameters, and members of your types. In this article, you learn different techniques to address the nullable warnings the compiler generates from its static analysis. The techniques described here are for general C# code. Learn to work with nullable reference types and Entity Framework core in Working with nullable reference types.

Nullable reference types, including the operators `?` and `!` are allowed only when the nullable context is set to `enable` or `annotations`. You can set the nullable context using the `Nullable` compiler option in your project file, or using the `#nullable` pragma in your source code.

This article covers the following compiler warnings:

- **CS8597** - *Thrown value may be null.*
- **CS8598** - *The suppression operator is not allowed in this context*
- **CS8600** - *Converting null literal or possible null value to non-nullable type.*
- **CS8601** - *Possible null reference assignment.*
- **CS8602** - *Dereference of a possibly null reference.*
- **CS8603** - *Possible null reference return.*
- **CS8604** - *Possible null reference argument for parameter.*
- **CS8605** - *Unboxing a possibly null value.*
- **CS8607** - *A possible null value may not be used for a type marked with `[NotNull]` or `[DisallowNull]`*
- **CS8608** - *Nullability of reference types in type doesn't match overridden member.*
- **CS8609** - *Nullability of reference types in return type doesn't match overridden member.*
- **CS8610** - *Nullability of reference types in type parameter doesn't match overridden member.*
- **CS8611** - *Nullability of reference types in type parameter doesn't match partial method declaration.*
- **CS8612** - *Nullability of reference types in type doesn't match implicitly implemented member.*
- **CS8613** - *Nullability of reference types in return type doesn't match implicitly implemented member.*
- **CS8614** - *Nullability of reference types in type of parameter doesn't match implicitly implemented member.*
- **CS8615** - *Nullability of reference types in type doesn't match implemented member.*
- **CS8616** - *Nullability of reference types in return type doesn't match implemented member.*
- **CS8617** - *Nullability of reference types in type of parameter doesn't match implemented member.*
- **CS8618** - *Non-nullable variable must contain a non-null value when exiting constructor. Consider declaring it as nullable.*
- **CS8619** - *Nullability of reference types in value doesn't match target type.*
- **CS8620** - *Argument cannot be used for parameter due to differences in the nullability of reference types.*
- **CS8621** - *Nullability of reference types in return type doesn't match the target delegate (possibly because of nullability attributes).*
- **CS8622** - *Nullability of reference types in type of parameter doesn't match the target delegate (possibly because of nullability attributes).*
- **CS8623** - *Explicit application of `System.Runtime.CompilerServices.NullableAttribute` is not allowed.*
- **CS8624** - *Argument cannot be used as an output due to differences in the nullability of reference types.*
- **CS8625** - *Cannot convert null literal to non-nullable reference type.*
- **CS8628** - *Cannot use a nullable reference type in object creation.*
- **CS8629** - *Nullable value type may be null.*
- **CS8631** - *The type cannot be used as type parameter in the generic type or method. Nullability of type argument doesn't match constraint type.*
- **CS8632** - *The annotation for nullable reference types should only be used in code within a `#nullable` annotations context.*
- **CS8633** - *Nullability in constraints for type parameter of method doesn't match the constraints for type parameter of interface method. Consider using an explicit interface implementation instead.*
- **CS8634** - *The type cannot be used as type parameter in the generic type or method. Nullability of type argument doesn't match 'class' constraint.*
- **CS8636** - *Invalid option for `/nullable`; must be `disable`, `enable`, `warnings` or `annotations`*
- **CS8637** - *Expected `enable`, `disable`, or `restore`*
- **CS8639** - *The typeof operator cannot be used on a nullable reference type*
- **CS8643** - *Nullability of reference types in explicit interface specifier doesn't match interface implemented by the type.*
- **CS8644** - *Type does not implement interface member. Nullability of reference types in interface implemented by the base type doesn't match.*
- **CS8645** - *Member is already listed in the interface list on type with different nullability of reference types.*
- **CS8650** - *It is not legal to use nullable reference type 'type?' in an is-type expression; use the underlying type 'type' instead.*
- **CS8651** - *It is not legal to use nullable reference type 'type?' in an as expression; use the underlying type 'type' instead.*
- **CS8655** - *The switch expression does not handle some null inputs (it is not exhaustive).*
- **CS8667** - *Partial method declarations have inconsistent nullability in constraints for type parameter.*
- **CS8669** - *The annotation for nullable reference types should only be used in code within a '#nullable' annotations context. Auto-generated code requires an explicit '#nullable' directive in source.*
- **CS8670** - *Object or collection initializer implicitly dereferences possibly null member.*
- **CS8714** - *The type cannot be used as type parameter in the generic type or method. Nullability of type argument doesn't match 'notnull' constraint.*
- **CS8762** - *Parameter  must have a non-null value when exiting.*
- **CS8763** - *A method marked `[DoesNotReturn]` should not return.*
- **CS8764** - *Nullability of return type doesn't match overridden member (possibly because of nullability attributes).*
- **CS8765** - *Nullability of type of parameter doesn't match overridden member (possibly because of nullability attributes).*
- **CS8766** - *Nullability of reference types in return type of doesn't match implicitly implemented member (possibly because of nullability attributes).*
- **CS8767** - *Nullability of reference types in type of parameter of doesn't match implicitly implemented member (possibly because of nullability attributes).*
- **CS8768** - *Nullability of reference types in return type doesn't match implemented member (possibly because of nullability attributes).*
- **CS8769** - *Nullability of reference types in type of parameter doesn't match implemented member (possibly because of nullability attributes).*
- **CS8770** - *Method lacks `[DoesNotReturn]` annotation to match implemented or overridden member.*
- **CS8774** - *Member must have a non-null value when exiting.*
- **CS8776** - *Member cannot be used in this attribute.*
- **CS8775** - *Member must have a non-null value when exiting.*
- **CS8777** - *Parameter must have a non-null value when exiting.*
- **CS8819** - *Nullability of reference types in return type doesn't match partial method declaration.*
- **CS8824** - *Parameter must have a non-null value when exiting because parameter is non-null.*
- **CS8825** - *Return value must be non-null because parameter is non-null.*
- **CS8847** - *The switch expression does not handle some null inputs (it is not exhaustive). However, a pattern with a 'when' clause might successfully match this value.*

> **Note:**
> The static analysis can't always deduce in what order, in a specific scenario, methods are accessed, and whether the method completes successfully without throwing an exception. Those known pitfalls are well described in Known pitfalls section.

You address almost all warnings using one of five techniques:

- Configuring the nullable context.
- Adding necessary null checks.
- Adding or removing `?` or `!` nullable annotations.
- Adding attributes that describe null semantics.
- Initializing variables correctly.

If you're new to using nullable reference types, the overview of nullable reference types provides a background on what nullable reference types solve and how they work to provide warnings to possible mistakes in your code. You can also check the guidance on migrating to nullable reference types to learn more about enabling nullable reference types in an existing project.

## Configure nullable context

The following warnings indicate that you haven't set the nullable context correctly:

- **CS8632** - *The annotation for nullable reference types should only be used in code within a `#nullable` annotations context.*
- **CS8636** - *Invalid option for `/nullable`; must be `disable`, `enable`, `warnings` or `annotations`*
- **CS8637** - *Expected `enable`, `disable`, or `restore`*
- **CS8668** - *Expected `warnings`, `annotations`, or end of directive*
- **CS8669** - *The annotation for nullable reference types should only be used in code within a '#nullable' annotations context. Auto-generated code requires an explicit '#nullable' directive in source.*

To set the nullable context correctly, you have two options:

1. **Project-level configuration**: Add the `<Nullable>` element to your project file:

      ```xml
   <PropertyGroup>
       <Nullable>enable</Nullable>
   </PropertyGroup>
   ```

2. **File-level configuration**: Use `#nullable` preprocessor directives in your source code:

   ```csharp
   #nullable enable
   ```

The nullable context has two independent flags that control different aspects:

- **Annotation flag**: Controls whether you can use `?` to declare nullable reference types and `!` to suppress individual warnings.
- **Warning flag**: Controls whether the compiler emits nullability warnings

In generated code, add an explicit `#nullable` directive to the generated source before you use nullable annotations (**CS8669**). Project-level nullable settings might not apply to generated source files.

For detailed information about nullable contexts and migration strategies, see:

- Nullable reference types
- Update a codebase with nullable reference types

## Incorrect annotation syntax

These errors and warnings indicate that usage of the `!` or `?` annotation is incorrect.

- **CS8598** - *The suppression operator is not allowed in this context*
- **CS8623** - *Explicit application of `System.Runtime.CompilerServices.NullableAttribute` is not allowed.*
- **CS8628** - *Cannot use a nullable reference type in object creation.*
- **CS8639** - *The typeof operator cannot be used on a nullable reference type*
- **CS8650** - *It is not legal to use nullable reference type 'type?' in an is-type expression; use the underlying type 'type' instead.*
- **CS8651** - *It is not legal to use nullable reference type 'type?' in an as expression; use the underlying type 'type' instead.*

The `?` annotation in a declaration indicates that the variable might be null. It doesn't indicate a different runtime type. Both the following declarations are the same runtime type:

```csharp
string s1 = "a string";
string? s2 = "another string";
```

The `?` is a hint to the compiler on the expectation for null values.

The `!` annotation on an expression indicates that you know the expression is safe and should be assumed to be not null.

- You must use these annotations, not the `System.Runtime.CompilerServices.NullableAttribute` in your code.
- Because the `?` is an annotation, not a type, you can't use it with `typeof`, `new`, `is`, or `as` expressions. Use the underlying nonnullable reference type in `is` and `as` expressions because nullable annotations have no runtime representation (**CS8650**, **CS8651**).
- The `!` operator can't be applied to a variable expression or a method group.
- The `!` operator can't be applied to the left of a member access operator, such as `obj.Field!.Method()`.
