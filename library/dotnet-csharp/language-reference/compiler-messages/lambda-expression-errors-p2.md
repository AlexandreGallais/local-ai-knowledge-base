---
title: "Lambda expression errors and warnings (part 2 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/compiler-messages/lambda-expression-errors.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Lambda expression errors and warnings (part 2 of 2)

## Lambda expression parameters and returns

- **CS0748**: *Inconsistent lambda parameter usage; parameter types must be all explicit or all implicit.*
- **CS1065**: *Default values are not valid in this context.*
- **CS1643**: *Not all code paths return a value in anonymous method of type 'type'.*
- **CS1661**: *Cannot convert anonymous method block to type 'type' because the parameter types do not match the delegate parameter types.*
- **CS1662**: *Cannot convert anonymous method block to intended delegate type because some of the return types in the block are not implicitly convertible to the delegate return type.*
- **CS1676**: *Parameter 'number' must be declared with the 'keyword' keyword.*
- **CS1677**: *Parameter 'number' should not be declared with the 'keyword' keyword.*
- **CS1678**: *Parameter 'number' is declared as type 'type1' but should be 'type2'.*
- **CS1688**: *Cannot convert anonymous method block without a parameter list to delegate type 'delegate' because it has one or more out parameters.*
- **CS1731**: *Cannot convert expression to delegate because some of the return types in the block are not implicitly convertible to the delegate return type.*
- **CS1732**: *Expected parameter.*
- **CS8030**: *Anonymous function converted to a void returning delegate cannot return a value.*
- **CS8916**: *Attributes on lambda expressions require a parenthesized parameter list.*
- **CS8934**: *Cannot convert anonymous method to type 'type' because the return type does not match the delegate return type.*
- **CS8975**: *The contextual keyword 'var' cannot be used as an explicit lambda return type.*
- **CS9098**: *Implicitly typed lambda parameter '...' cannot have a default value.*

These errors indicate a problem with a lambda expression parameter or return type declaration. For the full rules on lambda parameter and return types, see lambda expressions, anonymous methods, and the anonymous function expressions section of the C# specification.

> **Note:**
> **CS1731** and **CS1732** are no longer produced by the current version of the C# compiler (Roslyn). They might appear if you're using an older compiler version.

You can correct these errors by using the following guidance:

- Ensure that all parameters in a lambda expression use the same typing style. When a lambda has multiple parameters, each parameter must be either explicitly typed or implicitly typed—you can't mix the two styles in the same parameter list (**CS0748**).
- Add explicit types to any lambda parameter that has a default value. The compiler requires explicit types on parameters with defaults because it must generate a custom delegate type that encodes the default value. Implicitly typed parameters don't provide enough information for the compiler to construct that delegate type (**CS1065**, **CS9098**).
- Remove default parameter values from anonymous methods declared by using the `delegate` operator. Default parameter values are supported only in lambda expressions, not in anonymous methods. Convert the anonymous method to a lambda expression if you need default values (**CS1065**).
- Match the parameter types, `ref`/`out`/`in` modifiers, and parameter count of the lambda or anonymous method to the target delegate type. The compiler performs an exact match of parameter signatures when converting an anonymous function to a delegate: each parameter must have the correct type, and any `ref`, `out`, or `in` modifier must be present exactly when the delegate expects it (**CS1661**, **CS1676**, **CS1677**, **CS1678**).
- Add a parameter list to the anonymous method when the target delegate type has `out` parameters. An anonymous method declared without a parameter list (by using `delegate { }` syntax) can match most delegate types, but the compiler can't synthesize the required `out` parameters implicitly. Declare the parameters explicitly to match the delegate signature (**CS1688**).
- Ensure that all code paths in the lambda or anonymous method return a value when the target delegate type has a non-void return type. Every branch through the body must produce a return value that's implicitly convertible to the delegate's return type (**CS1643**, **CS1662**, **CS1731**, **CS8934**).
- Remove any `return` statement with a value from a lambda or anonymous method that's assigned to a `void`-returning delegate type such as `Action`. Because the delegate's return type is `void`, the body can't return a value (**CS8030**).
- Enclose the parameter list in parentheses when attributes are applied to any lambda parameter. The compiler needs the parenthesized form to distinguish attribute syntax from other expressions. For example, write `([MyAttribute] int x) => x` instead of `[MyAttribute] x => x` (**CS8916**).
- Use a specific type name instead of `var` as the explicit return type of a lambda expression. The keyword `var` is reserved for implicitly typed local variables and can't be used as a lambda return type annotation. Specify the actual return type, or omit the return type and let the compiler infer it (**CS8975**).
- Fix the parameter list so the compiler can recognize it as a valid parameter declaration. This error indicates a malformed parameter list where the compiler expected a parameter identifier but found something else (**CS1732**).

## Lambda expression delegate type

- **CS0407**: *'method' has the wrong return type.*
- **CS0428**: *Cannot convert method group 'Identifier' to non-delegate type 'type'. Did you intend to invoke the method?*
- **CS0467**: Warning: *Ambiguity between method 'method' and non-method 'non-method'. Using method group.*
- **CS0815**: *Cannot assign 'expression' to an implicitly-typed variable.*
- **CS0828**: *Cannot assign 'expression' to anonymous type property.*
- **CS1660**: *Cannot convert lambda expression to type 'type' because it is not a delegate type.*
- **CS8917**: *The delegate type could not be inferred.*
- **CS8974**: Warning: *Converting method group 'method' to non-delegate type 'type'. Did you intend to invoke the method?*
- **CS9099**: Warning: *The default parameter value does not match in the target delegate type.*
- **CS9100**: Warning: *Parameter has params modifier in lambda but not in target delegate type.*

These errors indicate a problem with the delegate type that the compiler infers or expects for a lambda expression, anonymous method, or method group. For the full rules on delegate conversions, see lambda expressions, anonymous methods, and the anonymous function expressions section of the C# specification.

> **Note:**
> The current version of the C# compiler (Roslyn) doesn't produce **CS0467**. You might see this error if you're using an older compiler version.

You can correct these errors by using the following guidance:

- Ensure that the target type of the assignment or conversion is a delegate type or `System.Linq.Expressions.Expression`. A lambda expression or anonymous method can't be assigned to a non-delegate type such as `object` or an interface. Change the variable's type to a compatible delegate type like `Func<>` or `Action<>`, or use `var` to let the compiler infer the delegate type (**CS1660**).
- Provide enough context for the compiler to determine a single delegate type for the lambda expression. When assigned to `var`, the compiler needs an unambiguous return type and parameter list. When assigned to an anonymous type property, the compiler can't infer a delegate type at all. Assign the lambda to a variable with an explicit delegate type, then use that variable in the anonymous type initializer (**CS0815**, **CS0828**, **CS8917**).
- Match the return type of the method group to the delegate's declared return type. A method group conversion requires the method's return type to be identity-convertible or implicitly convertible to the delegate's return type. Change the method's return type, or change the delegate type to match (**CS0407**).
- Invoke the method instead of assigning the method group when the target type isn't a delegate. If the target type is `string`, `int`, or another non-delegate type, you likely intended to call the method and assign its result. Add parentheses and arguments to invoke the method (**CS0428**, **CS8974**).
- Resolve ambiguity between a method and a non-method member that share the same name. Rename one of the conflicting members, or use a fully qualified reference to remove the ambiguity (**CS0467**).
- Remove the default parameter value or `params` modifier from the lambda when the target delegate type is a standard `Func<>` or `Action<>` type. Default values and `params` modifiers cause the compiler to generate a custom delegate type that doesn't match `Func<>` or `Action<>`. Either use `var` to let the compiler synthesize the correct delegate type, or remove the default value or `params` modifier so the lambda matches the declared delegate type (**CS9099**, **CS9100**).
