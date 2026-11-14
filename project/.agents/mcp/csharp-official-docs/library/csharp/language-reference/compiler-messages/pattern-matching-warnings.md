---
title: "Resolve pattern matching errors and warnings (part 1 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/compiler-messages/pattern-matching-warnings.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Resolve errors and warnings in pattern matching expressions

This article covers the following compiler errors and warnings:

- **CS8116**: *It is not legal to use nullable type in a pattern; use the underlying type instead.*
- **CS8117**: *Invalid operand for pattern match; value required, but found expression.*
- **CS8119**: *The switch expression must be a value; found expression.*
- **CS8120**: *The switch case is unreachable. It has already been handled by a previous case or it is impossible to match.*
- **CS8121**: *An expression of source type cannot be handled by a pattern of target type.*
- **CS8208**: *It is not legal to use the type 'dynamic' in a pattern.*
- **CS8502**: *Matching the tuple type requires noted subpatterns, but incorrect subpatterns are present.*
- **CS8503**: *A property subpattern requires a reference to the property or field to be matched, e.g. '{{ Name: value }}'*
- **CS8504**: *Pattern missing*
- **CS8505**: *A default literal 'default' is not valid as a pattern. Use another literal (e.g. '0' or 'null') as appropriate. To match everything, use a discard pattern '\_'.*
- **CS8506**: *No best type was found for the switch expression.*
- **CS8508**: *The syntax 'var' for a pattern is not permitted to refer to a type, but `var` type is in scope here.*
- **CS8509**: *The switch expression does not handle all possible values of its input type (it is not exhaustive). For example, the pattern '...' is not covered.*
- **CS8510**: *The pattern is unreachable. It has already been handled by a previous arm of the switch expression or it is impossible to match.*
- **CS8512**: *The name '\_' refers to the constant, not the discard pattern. Use 'var \_' to discard the value, or '@\_' to refer to a constant by that name.*
- **CS8513**: *The name '\_' refers to the type `_`, not the discard pattern. Use '@\_' for the type, or 'var \_' to discard.*
- **CS8515**: *Parentheses are required around the switch governing expression.*
- **CS8516**: *The name does not identify a tuple element '{1}'.*
- **CS8517**: *The name does not match the corresponding 'Deconstruct' parameter.*
- **CS8518**: *An expression of this type can never match the provided pattern.*
- **CS8519**: *The given expression never matches the provided pattern.*
- **CS8520**: *The given expression always matches the provided constant.*
- **CS8521**: *Pattern-matching is not permitted for pointer types.*
- **CS8522**: *Element names are not permitted when pattern-matching via 'System.Runtime.CompilerServices.ITuple'.*
- **CS8523**: *The discard pattern is not permitted as a case label in a switch statement. Use 'case var \_:' for a discard pattern, or 'case @\_:' for a constant named '\_'.*
- **CS8524**: *The switch expression does not handle some values of its input type (it is not exhaustive) involving an unnamed enum value.*
- **CS8525**: *A variable designator must come after a property pattern.*
- **CS8780**: *A variable may not be declared within a 'not' or 'or' pattern.*
- **CS8781**: *Relational patterns may not be used for a value of this type.*
- **CS8782**: *Relational patterns may not be used for a floating-point NaN.*
- **CS8793**: *The given expression always matches the provided pattern.*
- **CS8794**: *An expression of type '{0}' always matches the provided pattern.*
- **CS8846**: *The switch expression does not handle all possible values of its input type (it is not exhaustive). For example, this pattern is not covered. However, a pattern with a 'when' clause might successfully match this value.*
- **CS8918**: *Identifier or a simple member access expected.*
- **CS8978**: *'...' cannot be made nullable.*
- **CS8979**: *List patterns may not be used for a value of type '...'.*
- **CS8980**: *Slice patterns may only be used once and directly inside a list pattern.*
- **CS8985**: *List patterns may not be used for a value of type '...'. No suitable 'Length' or 'Count' property was found.*
- **CS9013**: *A string 'null' constant is not supported as a pattern for '...'. Use an empty string instead.*
- **CS9060**: *Cannot use a numeric constant or relational pattern on '...' because it inherits from or extends 'INumberBase<T>'. Consider using a type pattern to narrow to a specific numeric type.*
- **CS9134**: *A switch expression arm does not begin with a 'case' keyword.*
- **CS9135**: *A constant value of type is expected*
- **CS9336**: *The pattern is redundant.*
- **CS9337**: *The pattern is too complex to analyze for redundancy.*
- **CS9344**: *The '==' operator is not supported in a pattern.*
- **CS9345**: *The '!=' operator is not supported in a pattern. Use 'not' to represent a negated pattern.*
- **CS9372**: *An expression of type cannot be handled by this pattern, see additional errors at this location.*

## Switch expression syntax errors

- **CS8119**: *The switch expression must be a value; found expression.*
- **CS8504**: *Pattern missing*
- **CS8505**: *A default literal 'default' is not valid as a pattern. Use another literal (e.g. '0' or 'null') as appropriate. To match everything, use a discard pattern '\_'.*
- **CS8506**: *No best type was found for the switch expression.*
- **CS8515**: *Parentheses are required around the switch governing expression.*
- **CS8523**: *The discard pattern is not permitted as a case label in a switch statement. Use 'case var \_:' for a discard pattern, or 'case @\_:' for a constant named '\_'.*
- **CS9134**: *A switch expression arm does not begin with a 'case' keyword.*
- **CS9135**: *A constant value of type is expected*
- **CS9344**: *The '==' operator is not supported in a pattern.*
- **CS9345**: *The '!=' operator is not supported in a pattern. Use 'not' to represent a negated pattern.*

Provide a value as the governing expression of a `switch` statement or expression (**CS8119**). The governing expression must produce a value. Types, namespaces, method groups, and `void`-returning methods aren't valid. Use an expression that evaluates to a value.

Provide a pattern where one is expected (**CS8504**). A switch arm or `is` expression requires a pattern after the appropriate syntax. Ensure you include a valid pattern expression.

Don't use the `default` literal as a pattern (**CS8505**). The `default` keyword isn't valid in pattern matching. Use a specific literal value like `0` or `null` instead, or use the discard pattern `_` to match any value.

Specify an explicit type for the switch expression result when the compiler can't deduce the best type from the arms (**CS8506**). This error occurs when the arms return values of different types that don't share a common type the compiler can infer automatically, such as method groups or lambdas. Assign the result to an explicitly typed variable instead of using `var`.

Enclose the governing expression of a `switch` statement in parentheses and the body in curly braces (**CS8515**). The `switch` statement requires parentheses around the expression being evaluated and curly braces around the body. This error occurs when either the parentheses or curly braces are missing.

Use `case var _:` instead of the bare discard `_` as a case label in a `switch` statement (**CS8523**). The bare discard pattern isn't allowed in switch statements because of ambiguity with a constant named `_`. Use `case var _:` for a discard, or `case @_:` to match a constant named `_`.

Remove the `case` keyword from switch expression arms. Switch expressions use a different syntax than switch statements (**CS9134**). In switch expressions, each arm consists of a pattern followed by the `=>` token and an expression, without the `case` keyword that'<example-value>'t be used as patterns. The compiler needs to know the exact values at compile time to generate the appropriate matching code.

Use relational pattern operators (`<`, `>`, `<=`, `>=`) or the `not` keyword instead of `==` and `!=` operators in patterns (**CS9344**, **CS9345**). The equality and inequality operators aren't supported in pattern syntax. Use a constant pattern for equality, and the `not` keyword for inequality.

For more information about the correct syntax, see Switch expression.

## Pattern completeness and redundancy

- **CS8120**: *The switch case is unreachable. It has already been handled by a previous case or it is impossible to match.*
- **CS8509**: *The switch expression does not handle all possible values of its input type (it is not exhaustive). For example, the pattern '...' is not covered.*
- **CS8510**: *The pattern is unreachable. It has already been handled by a previous arm of the switch expression or it is impossible to match.*
- **CS8518**: *An expression of type can never match the provided pattern.*
- **CS8519**: *The given expression never matches the provided pattern.*
- **CS8520**: *The given expression always matches the provided constant.*
- **CS8524**: *The switch expression does not handle some values of its input type (it is not exhaustive) involving an unnamed enum value. For example, the noted pattern is not covered.*
- **CS8793**: *The given expression always matches the provided pattern.*
- **CS8794**: *An expression of type always matches the provided pattern.*
- **CS8846**: *The switch expression does not handle all possible values of its input type (it is not exhaustive). For example, the noted pattern is not covered. However, a pattern with a 'when' clause might successfully match this value.*
- **CS9336**: *The pattern is redundant.*
- **CS9337**: *The pattern is too complex to analyze for redundancy.*

Reorder or remove unreachable case labels in `switch` statements (**CS8120**). A `case` label is unreachable when a previous case already handles all values that the later case would match. This situation occurs when a more general pattern appears before a more specific one, or when the pattern is impossible to match for the input type.

Add switch arms that handle all possible input values to create exhaustive switch expressions (**CS8509**, **CS8524**, **CS8846**). Switch expressions must cover every possible value of the input type. Otherwise, the compiler can't guarantee that the expression produces a result for all inputs. The compiler warns separately for unnamed enum values (**CS8524**) and for cases where a `when` clause might match an otherwise-unhandled value (**CS8846**). Use the discard pattern (`_`) as a final catch-all arm to match any remaining values that you don't need to handle explicitly.

Reorder or remove unreachable switch expression arms (**CS8510**). Like **CS8120** for `switch` statements, this error indicates that a switch expression arm is unreachable because a previous arm already handles all values that the later arm would match.

Review patterns that can never match or always match the input (**CS8518**, **CS8519**, **CS8520**, **CS8793**, **CS8794**). These diagnostics indicate that the compiler can determine at compile time whether a pattern always or never matches. An always-matching pattern is redundant, and a never-matching pattern is dead code. Both can indicate logic errors.

Review patterns that the compiler identifies as redundant. Redundant patterns can indicate a logic error where you meant to use `not` or different logical operators (**CS9336**). Simplify complex patterns that are too difficult for the compiler to analyze for redundancy. Break them down into simpler, more maintainable expressions (**CS9337**).

For more information about exhaustiveness requirements and pattern optimization, see Switch expression, Switch statement, and Patterns.
