---
title: "Nullable reference type warnings (part 3 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/compiler-messages/nullable-warnings.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Nullable reference type warnings (part 3 of 3)

## Mismatch in nullability declaration

Many warnings indicate nullability mismatches between signatures for methods, delegates, or type parameters.

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
- **CS8619** - *Nullability of reference types in value doesn't match target type.*
- **CS8620** - *Argument cannot be used for parameter due to differences in the nullability of reference types.*
- **CS8621** - *Nullability of reference types in return type doesn't match the target delegate (possibly because of nullability attributes).*
- **CS8622** - *Nullability of reference types in type of parameter doesn't match the target delegate (possibly because of nullability attributes).*
- **CS8624** - *Argument cannot be used as an output due to differences in the nullability of reference types.*
- **CS8631** - *The type cannot be used as type parameter in the generic type or method. Nullability of type argument doesn't match constraint type.*
- **CS8633** - *Nullability in constraints for type parameter of method doesn't match the constraints for type parameter of interface method. Consider using an explicit interface implementation instead.*
- **CS8634** - *The type cannot be used as type parameter in the generic type or method. Nullability of type argument doesn't match 'class' constraint.*
- **CS8643** - *Nullability of reference types in explicit interface specifier doesn't match interface implemented by the type.*
- **CS8644** - *Type does not implement interface member. Nullability of reference types in interface implemented by the base type doesn't match.*
- **CS8645** - *Member is already listed in the interface list on type with different nullability of reference types.*
- **CS8667** - *Partial method declarations have inconsistent nullability in constraints for type parameter.*
- **CS8714** - *The type cannot be used as type parameter in the generic type or method. Nullability of type argument doesn't match 'notnull' constraint.*
- **CS8764** - *Nullability of return type doesn't match overridden member (possibly because of nullability attributes).*
- **CS8765** - *Nullability of type of parameter doesn't match overridden member (possibly because of nullability attributes).*
- **CS8766** - *Nullability of reference types in return type of doesn't match implicitly implemented member (possibly because of nullability attributes).*
- **CS8767** - *Nullability of reference types in type of parameter of doesn't match implicitly implemented member (possibly because of nullability attributes).*
- **CS8768** - *Nullability of reference types in return type doesn't match implemented member (possibly because of nullability attributes).*
- **CS8769** - *Nullability of reference types in type of parameter doesn't match implemented member (possibly because of nullability attributes).*
- **CS8819** - *Nullability of reference types in return type doesn't match partial method declaration.*

The following code demonstrates *CS8764*:

```csharp
public class B
{
    public virtual string GetMessage(string id) => string.Empty;
}
public class D : B
{
    public override string? GetMessage(string? id) => default;
}
```
The preceding example shows a `virtual` method in a base class and an `override` with different nullability. The base class returns a non-nullable string, but the derived class returns a nullable string. If the `string` and `string?` are reversed, it would be allowed because the derived class is more restrictive. Similarly, parameter declarations should match. Parameters in the override method can allow null even when the base class doesn't.

Other situations can generate these warnings. You have a mismatch in an interface method declaration and the implementation of that method. Or a delegate type and the expression for that delegate differ. A type parameter and the type argument differ in nullability.

To fix these warnings, update the appropriate declaration.

## Code doesn't match attribute declaration

The preceding sections discussed how you can use Attributes for nullable static analysis to inform the compiler about the null semantics of your code. The compiler warns you if the code doesn't adhere to the promises of that attribute:

- **CS8607** - *A possible null value may not be used for a type marked with `[NotNull]` or `[DisallowNull]`*
- **CS8763** - *A method marked `[DoesNotReturn]` should not return.*
- **CS8770** - *Method lacks `[DoesNotReturn]` annotation to match implemented or overridden member.*
- **CS8774** - *Member must have a non-null value when exiting.*
- **CS8775** - *Member must have a non-null value when exiting.*
- **CS8776** - *Member cannot be used in this attribute.*
- **CS8777** - *Parameter must have a non-null value when exiting.*
- **CS8824** - *Parameter must have a non-null value when exiting because parameter is non-null.*
- **CS8825** - *Return value must be non-null because parameter is non-null.*

Consider the following method:

```csharp
public bool TryGetMessage(int id, [NotNullWhen(true)] out string? message)
{
    message = null;
    return true;

}
```
The compiler produces a warning because the `message` parameter is assigned `null` *and* the method returns `true`. The `NotNullWhen` attribute indicates that shouldn't happen.

To address these warnings, update your code so it matches the expectations of the attributes applied. You can change the attributes, or the algorithm.

## Exhaustive switch expression

Switch expressions must be *exhaustive*, meaning that all input values must be handled. Even for non-nullable reference types, the `null` value must be accounted for. The compiler issues warnings when the null value isn't handled:

- **CS8655** - *The switch expression does not handle some null inputs (it is not exhaustive).*
- **CS8847** - *The switch expression does not handle some null inputs (it is not exhaustive). However, a pattern with a 'when' clause might successfully match this value.*

The following example code demonstrates this condition:

```csharp
int AsScale(string status) =>
    status switch
    {
        "Red" => 0,
        "Yellow" => 5,
        "Green" => 10,
        { } => -1
    };
```
The input expression is a `string`, not a `string?`. The compiler still generates this warning. The `{ }` pattern handles all non-null values, but doesn't match `null`. To address these errors, you can either add an explicit `null` case, or replace the `{ }` with the `_` (discard) pattern. The discard pattern matches null in addition to any other value.
