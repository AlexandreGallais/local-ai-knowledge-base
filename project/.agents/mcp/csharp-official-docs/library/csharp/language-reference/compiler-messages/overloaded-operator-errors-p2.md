---
title: "Resolve errors and warnings related to operator declarations and overflow (part 2 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/compiler-messages/overloaded-operator-errors.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Resolve errors and warnings related to operator declarations and overflow (part 2 of 2)

## Boolean and short-circuit operators

- **CS0215**: *The return type of operator true or false must be bool.*
- **CS0216**: *The operator requires a matching operator to also be defined.*
- **CS0217**: *In order to be applicable as a short-circuit operator, a user-defined logical operator must have the same return type as the type of its 2 parameters.*
- **CS0218**: *The type must contain declarations of operator true and operator false.*

The C# language requires specific pairings and signatures for Boolean operators and short-circuit evaluation. For the full rules, see true and false operators, Boolean logical operators, and User-defined conditional logical operators in the C# specification.

- Change the return type of `operator true` and `operator false` to `bool` (**CS0215**). These operators determine whether a value is logically true or false, so the language requires them to return `bool`.
- Define the matching paired operator (**CS0216**). The language requires certain operators to be declared in pairs: `operator ==` with `operator !=`, `operator <` with `operator >`, `operator <=` with `operator >=`, and `operator true` with `operator false`.
- Change the return type of the user-defined `&` or `|` operator to match both parameter types (**CS0217**). For short-circuit evaluation (`&&` and `||`), the compiler requires the `&` or `|` operator's return type, both parameter types, and the containing type to all be the same type.
- Add both `operator true` and `operator false` declarations to the type (**CS0218**). The compiler rewrites `&&` and `||` using `operator true`, `operator false`, and the corresponding `&` or `|` operator, so all three must be present for short-circuit evaluation to work.

## Checked operators

- **CS9023**: *Operator can't be made checked*
- **CS9024**: *Operator can't be made unchecked*
- **CS9025**: *Checked operator requires a matching non-checked version to also be declared*
- **CS9027**: *Unexpected keyword 'unchecked'*

The `checked` and `unchecked` keywords can only be applied to specific operator declarations. For the full rules, see Arithmetic operators and Operators in the C# language specification.

- Remove the `checked` or `unchecked` keyword from an unsupported operator (**CS9023**, **CS9024**). Only the arithmetic operators `+`, `-`, `*`, `/`, `++`, `--`, and explicit conversion operators support checked and unchecked variants. Other operators, such as comparison or equality operators, don't have distinct overflow behavior and can't be marked checked or unchecked.
- Add a matching non-checked version of the operator (**CS9025**). A `checked` operator provides the overflow-throwing behavior, but the compiler also needs the corresponding unchecked version to use in `unchecked` contexts and as the default when neither context is specified.
- Remove the `unchecked` keyword from the invalid position (**CS9027**). The `unchecked` keyword in an operator declaration is only valid as part of the operator syntax (for example, `public static explicit operator unchecked int(MyType t)`). Placing it elsewhere in the declaration causes a syntax error.

## Interface and inheritance requirements

- **CS9311**: *Type doesn't implement interface member. The type can't implement member because one of them isn't an operator*
- **CS9312**: *Type can't override inherited member because one of them isn't an operator*
- **CS9313**: *Overloaded compound assignment operator takes one parameter*

The compiler enforces strict matching between operator declarations and the interface members or base class members they implement or override. For the full rules, see Operator overloading and Interfaces.

- Change the implementing member to an operator declaration that matches the interface's operator member, or change the interface member to a method if the implementing member is a method (**CS9311**). An operator can only implement an interface member that's also declared as an operator—you can't satisfy an operator contract with a regular method, or vice versa.
- Change the overriding member to an operator declaration that matches the base class's operator member, or change the base class member to a method if the derived class member is a method (**CS9312**). Like interface implementation, an override must match the kind of member being overridden—an operator can't override a non-operator member.
- Change the compound assignment operator declaration to accept exactly one parameter (**CS9313**). Compound assignment operators are instance members where the left operand is implicitly `this`, so you only declare the right-hand operand as a parameter.

## Equality operators

- **CS0659**: *'class' overrides Object.Equals(object o) but does not override Object.GetHashCode()*
- **CS0660**: *Type defines operator == or operator != but doesn't override Object.Equals(object o)*
- **CS0661**: *Type defines operator == or operator != but doesn't override Object.GetHashCode()*

The compiler requires that equality-related overrides and operator definitions stay in sync. When you override `System.Object.Equals*` or define `operator ==` / `operator !=`, you must also provide the related overrides. For the full rules, see Implement equality yourself when a type can't be a record and Equality operators.

- Add an override of `System.Object.GetHashCode*` when you override `System.Object.Equals*` (**CS0659**). Hash-based collections like `System.Collections.Generic.Dictionary`2` and `System.Collections.Generic.HashSet`1` rely on the contract that two objects that are equal must return the same hash code. Without a matching `GetHashCode` override, objects that compare as equal might hash to different buckets, causing lookups and deduplication to fail silently.
- Add an override of `System.Object.Equals*` when you define `operator ==` or `operator !=` (**CS0660**). Code that calls `Equals` directly—including many framework APIs, LINQ methods, and collection operations—won't use your custom operator. Without a consistent `Equals` override, the same two objects might be considered equal by `==` but not by `Equals`, leading to unpredictable behavior.
- Add an override of `System.Object.GetHashCode*` when you define `operator ==` or `operator !=` (**CS0661**). Like **CS0659**, you need `GetHashCode` to be consistent with your equality semantics. If `operator ==` considers two objects equal but they return different hash codes, hash-based collections won't function correctly.

## Overflow and underflow errors

- **CS0031**: *Constant value 'value' cannot be converted to a 'type'*
- **CS0220**: *The operation overflows at compile time in checked mode*
- **CS0221**: *Constant value 'value' cannot be converted to a 'type' (use 'unchecked' syntax to override)*
- **CS0463**: *Evaluation of the decimal constant expression failed with error: 'error'*
- **CS0543**: *'enumeration' : the enumerator value is too large to fit in its type*
- **CS0594**: *Floating-point constant is outside the range of type 'type'*
- **CS0652**: *Comparison to integral constant is useless; the constant is outside the range of type 'type'*
- **CS1021**: *Integral constant is too large*
- **CS8778**: *Constant value 'value' may overflow 'type' at runtime (use 'unchecked' syntax to override)*
- **CS8973**: *The operation may overflow at runtime (use 'unchecked' syntax to override)*

The compiler evaluates constant expressions at compile time and reports errors or warnings when a value exceeds the valid range of its target type. For the full rules, see checked and unchecked statements and Integral types.

- Change the constant value to one that fits within the target type's range, or change the target to a larger numeric type (**CS0031**). The compiler can't implicitly narrow a constant that doesn't fit—for example, assigning `256` to a `byte` (range 0–255) produces this error. If the truncation is intentional, use an explicit cast in an `unchecked` context.
- Correct the arithmetic in the constant expression so the result fits the target type, or wrap the expression in an unchecked context to allow silent overflow (**CS0220**). The compiler evaluates the entire constant expression at compile time in a checked context by default, so intermediate or final results that exceed the type's range cause this error.
- Change the constant value or target type so the conversion is valid, or wrap the expression in an `unchecked` context if you intentionally want the truncated result (**CS0221**). Unlike **CS0220**, this error applies to explicit constant conversions where the source value doesn't fit the destination type.
- Simplify or break apart the `decimal` constant expression so it stays within the range and precision of the `decimal` type (**CS0463**). The `decimal` type has a maximum value of approximately $7.9 \times 10^{28}$ and 28–29 significant digits, and the compiler evaluates the full expression at compile time.
- Change the enum member value to one that fits in the enum's underlying type, or change the underlying type to a larger integral type (**CS0543**). By default, enums use `int` as the underlying type. If a member's value exceeds the underlying type's range, specify a larger type like `long`.
- Change the floating-point constant to a value within the range of the target type, or use a higher-precision type like `double` instead of `float` (**CS0594**). The `float` type supports values up to approximately $3.4 \times 10^{38}$, and `double` supports up to approximately $1.7 \times 10^{308}$.
- Remove or correct the comparison so the constant is within the range of the variable's type (**CS0652**). Comparing a `byte` variable to `300`, for example, can never be true, so the compiler warns that the comparison is useless. This warning often indicates a logic error or a mismatch between the variable type and the intended range of values.
- Use a larger numeric type or split the value across multiple operations (**CS1021**). This error occurs when an integer literal exceeds the range of even the largest integral type (`ulong`, up to $1.8 \times 10^{19}$). For values beyond that range, consider using `System.Numerics.BigInteger`.
- Wrap the expression in an `unchecked` context to suppress the warning, or change the value to fit within the target type's range (**CS8778**). This warning indicates a constant conversion that might lose data at runtime—the compiler can't prove the overflow will definitely happen, but it identifies the risk.
- Wrap the expression in an `unchecked` context to suppress the warning, or restructure the arithmetic to avoid potential overflow (**CS8973**). This warning is similar to **CS8778** but applies to arithmetic operations rather than conversions—the compiler detects that the operation might overflow at runtime.
