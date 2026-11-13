---
title: "Resolve pattern matching errors and warnings (part 2 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/compiler-messages/pattern-matching-warnings.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Resolve pattern matching errors and warnings (part 2 of 2)

## Type pattern errors

- **CS8116**: *It is not legal to use nullable type in a pattern; use the underlying type instead.*
- **CS8117**: *Invalid operand for pattern match; value required, but found expression.*
- **CS8121**: *An expression of source type cannot be handled by a pattern of target type.*
- **CS8208**: *It is not legal to use the type 'dynamic' in a pattern.*
- **CS8508**: *The syntax 'var' for a pattern is not permitted to refer to a type, but `var` type is in scope here.*
- **CS8513**: *The name '\_' refers to the type `_`, not the discard pattern. Use '@\_' for the type, or 'var \_' to discard.*
- **CS8521**: *Pattern-matching is not permitted for pointer types.*
- **CS8781**: *Relational patterns may not be used for a value of type.*
- **CS8782**: *Relational patterns may not be used for a floating-point NaN.*
- **CS8978**: *'...' cannot be made nullable.*
- **CS9060**: *Cannot use a numeric constant or relational pattern on '...' because it inherits from or extends 'INumberBase<T>'. Consider using a type pattern to narrow to a specific numeric type.*
- **CS9372**: *An expression of type cannot be handled by this pattern, see additional errors at this location.*

Use the underlying type instead of the nullable type in patterns (**CS8116**). You can't use a nullable value type like `int?` directly in a type pattern. Instead, use the underlying type (`int`), and the pattern matches both nullable and non-nullable values.

Provide a value as the operand for a pattern match (**CS8117**). The left-hand side of an `is` expression must be a value, not a type, namespace, or method group. Assign the result to a variable first, or use a different expression that produces a value.

Use a pattern type that's compatible with the expression type (**CS8121**). The compiler raises this error when there's no possible conversion between the expression type and the pattern type. For example, you can't match a `string` expression against an `int` type pattern. Change the pattern type to one that's compatible with the expression, or cast the expression to a compatible type.

Don't use `dynamic` as a type in a pattern (**CS8208**). The `dynamic` type isn't supported in pattern matching. Use `object` instead, or cast the value to a specific type before matching.

Rename the type `var` or use an explicit type in the pattern (**CS8508**). When a type named `var` is in scope, the `var` pattern syntax is ambiguous. The compiler can't determine whether you intend to use the `var` pattern or reference the type. Use the fully qualified type name, or rename the type to avoid the conflict.

Use `@_` to reference a type named `_`, or use `var _` for the discard pattern (**CS8513**). When a type named `_` is in scope, the compiler can't determine whether the `_` in a pattern refers to the type or the discard pattern.

Don't use pattern matching with pointer types (**CS8521**). Pointer types aren't supported in pattern matching expressions. Use explicit comparisons or casts instead.

Use a supported type with relational patterns (**CS8781**, **CS8782**). Relational patterns (`<`, `>`, `<=`, `>=`) only work with numeric types that support comparison. They can't be used with NaN values because NaN comparisons always return `false`.

Use the underlying type directly in patterns when working with types that can't be made nullable (**CS8978**). Types like `System.Nullable<T>`, pointer types, and ref struct types can't be made nullable. You must use the base type in your pattern matching logic.

Use type patterns to narrow generic numeric types to specific numeric types before applying numeric constants or relational patterns (**CS9060**). You can't match generic numeric types that implement `INumberBase<T>` directly by using numeric constants or relational patterns. The compiler can't determine which specific numeric type is being matched. You must first narrow the value to a concrete numeric type like `int`, `double`, or `decimal`.

Use the correct pattern form when matching against a union value (**CS9372**). Patterns on a union type apply to the union's `Value` property, not the union value itself. If the compiler reports that a pattern can't handle the expression, check that you're matching against the case types listed in the union declaration. Review the additional errors at the same location for details about which specific pattern is invalid.

For more information about type patterns, see Nullable value types, Patterns, and Generic math.

## List pattern errors

- **CS8979**: *List patterns may not be used for a value of type '...'.*
- **CS8980**: *Slice patterns may only be used once and directly inside a list pattern.*
- **CS8985**: *List patterns may not be used for a value of type '...'. No suitable 'Length' or 'Count' property was found.*
- **CS9013**: *A string 'null' constant is not supported as a pattern for '...'. Use an empty string instead.*

Ensure the type supports the required operations for list patterns.  List patterns require types that are countable and indexable (**CS8979**, **CS8985**). The type must have an accessible `Length` or `Count` property and support indexing. Runtime types that support list patterns include arrays, `List<T>`, `Span<T>`, and other collection types with appropriate members.

Place slice patterns (`..`) directly inside a list pattern. Use them only once per list pattern because they can't appear in nested patterns or outside of list patterns (**CS8980**).

When matching `Span<char>` or `ReadOnlySpan<char>` types, use an empty string `""` instead of a string null constant. The literal `null` isn't supported as a pattern for span types (**CS9013**).

For more information about list pattern requirements and syntax, see List patterns and Patterns.

## Subpattern errors

- **CS8502**: *Matching the tuple type requires subpatterns, but incorrect subpatterns are present.*
- **CS8503**: *A property subpattern requires a reference to the property or field to be matched, e.g. '{{ Name: value }}'*
- **CS8512**: *The name '\_' refers to the constant, not the discard pattern. Use 'var \_' to discard the value, or '@\_' to refer to a constant by that name.*
- **CS8516**: *The name does not identify tuple element.*
- **CS8517**: *The name does not match the corresponding 'Deconstruct' parameter.*
- **CS8522**: *Element names are not permitted when pattern-matching via 'System.Runtime.CompilerServices.ITuple'.*
- **CS8525**: *A variable designator must come after a property pattern.*
- **CS8780**: *A variable may not be declared within a 'not' or 'or' pattern.*
- **CS8918**: *Identifier or a simple member access expected.*

Provide the correct number of subpatterns when matching a tuple type (**CS8502**). The number of subpatterns in a positional pattern must match the number of elements in the tuple type. Add or remove subpatterns to match the tuple's arity.

Include the property or field name in property subpatterns (**CS8503**). Each property subpattern must specify which property or field to match. Use the syntax `{ PropertyName: pattern }` to identify the member.

Use `var _` for the discard pattern or `@_` for a constant named `_` (**CS8512**). When a constant named `_` is in scope, the bare `_` in a `case` label refers to the constant. To use the discard pattern, write `var _` instead.

Use the correct element names in positional patterns for tuples (**CS8516**) and deconstructed types (**CS8517**). When you name subpatterns in a positional pattern, the names must match the tuple element names or the `Deconstruct` method parameter names.

Don't use element names in positional patterns when matching via `ITuple` (**CS8522**). When a type is matched through the `ITuple` interface rather than through a `Deconstruct` method, there are no named elements. Remove the element names from the pattern.

Place the variable designator after the property pattern, not before it (**CS8525**). In a property pattern with a variable designation, the variable name must follow the closing brace of the pattern. For example, write `{ Length: > 0 } s` rather than `s { Length: > 0 }`.

You can't declare variables within `not` or `or` pattern combinators (**CS8780**). Variable declarations in `not` patterns aren't definitely assigned, and variables in `or` patterns are only assigned in one branch. Move the variable declaration outside the pattern combinator.

Use an identifier or a simple member access expression as property names in property patterns and positional subpatterns (**CS8918**). Complex expressions, method calls, or other non-simple member accesses aren't valid as the left-hand side of a property subpattern. Each subpattern name must be a direct property or field name, or a dotted member access path like `Property.SubProperty`.

For more information about subpattern syntax, see Property pattern and Positional pattern.
