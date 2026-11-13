---
title: "Lambda expression errors and warnings (part 1 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/compiler-messages/lambda-expression-errors.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Errors and warnings when using lambda expressions and anonymous functions

Several *errors* relate to declaring and using lambda expressions and anonymous methods:

- **CS0407**: *'method' has the wrong return type.*
- **CS0428**: *Cannot convert method group 'Identifier' to non-delegate type 'type'. Did you intend to invoke the method?*
- **CS0748**: *Inconsistent lambda parameter usage; parameter types must be all explicit or all implicit.*
- **CS0815**: *Cannot assign 'expression' to an implicitly-typed variable.*
- **CS0828**: *Cannot assign 'expression' to anonymous type property.*
- **CS0837**: *The first operand of an 'is' or 'as' operator may not be a lambda expression, anonymous method, or method group.*
- **CS1065**: *Default values are not valid in this context.*
- **CS1621**: *The yield statement cannot be used inside an anonymous method or lambda expression.*
- **CS1628**: *Cannot use `in` `ref` or `out` parameter inside an anonymous method, lambda expression, or query expression.*
- **CS1632**: *Control cannot leave the body of an anonymous method or lambda expression.*
- **CS1643**: *Not all code paths return a value in anonymous method of type 'type'.*
- **CS1660**: *Cannot convert lambda expression to type 'type' because it is not a delegate type.*
- **CS1661**: *Cannot convert anonymous method block to type 'type' because the parameter types do not match the delegate parameter types.*
- **CS1662**: *Cannot convert anonymous method block to intended delegate type because some of the return types in the block are not implicitly convertible to the delegate return type.*
- **CS1673**: *Anonymous methods, lambda expressions, and query expressions inside structs cannot access instance members of 'this'.*
- **CS1676**: *Parameter 'number' must be declared with the 'keyword' keyword.*
- **CS1677**: *Parameter 'number' should not be declared with the 'keyword' keyword.*
- **CS1678**: *Parameter 'number' is declared as type 'type1' but should be 'type2'.*
- **CS1686**: *Local variable or its members cannot have their address taken and be used inside an anonymous method or lambda expression.*
- **CS1688**: *Cannot convert anonymous method block without a parameter list to delegate type 'delegate' because it has one or more out parameters.*
- **CS1706**: *Expression cannot contain anonymous methods or lambda expressions.*
- **CS1731**: *Cannot convert expression to delegate because some of the return types in the block are not implicitly convertible to the delegate return type.*
- **CS1732**: *Expected parameter.*
- **CS1764**: *Cannot use fixed local inside an anonymous method, lambda expression, or query expression.*
- **CS8030**: *Anonymous function converted to a void returning delegate cannot return a value.*
- **CS8175**: *Cannot use ref local inside an anonymous method, lambda expression, or query expression.*
- **CS8820**: *A static anonymous function cannot contain a reference to 'variable'.*
- **CS8821**: *A static anonymous function cannot contain a reference to 'this' or 'base'.*
- **CS8916**: *Attributes on lambda expressions require a parenthesized parameter list.*
- **CS8917**: *The delegate type could not be inferred.*
- **CS8934**: *Cannot convert anonymous method to type 'type' because the return type does not match the delegate return type.*
- **CS8975**: *The contextual keyword `var` cannot be used as an explicit lambda return type.*
- **CS9098**: *Implicitly typed lambda parameter '...' cannot have a default value.*

In addition, several *warnings* relate to declaring and using lambda expressions:

- **CS0467**: *Ambiguity between method 'method' and non-method 'non-method'. Using method group.*
- **CS1911**: *Access to member through a 'base' keyword from an anonymous method, lambda expression, query expression, or iterator results in unverifiable code.*
- **CS8971**: *InterpolatedStringHandlerArgument has no effect when applied to lambda parameters and will be ignored at the call site.*
- **CS8974**: *Converting method group 'method' to non-delegate type 'type'. Did you intend to invoke the method?*
- **CS9099**: *The default parameter value does not match in the target delegate type.*
- **CS9100**: *Parameter has params modifier in lambda but not in target delegate type.*

The compiler also produces the following *informational* message:

- **CS9236**: *Compiling requires binding the lambda expression at least count times. Consider declaring the lambda expression with explicit parameter types, or if the containing method call is generic, consider using explicit type arguments.*

## Syntax limitations in lambda expressions

- **CS0837**: *The first operand of an `is` or `as` operator may not be a lambda expression, anonymous method, or method group.*
- **CS1621**: *The `yield` statement cannot be used inside an anonymous method or lambda expression.*
- **CS1628**: *Cannot use `in`, `ref`, or `out` parameter inside an anonymous method, lambda expression, or query expression.*
- **CS1632**: *Control cannot leave the body of an anonymous method or lambda expression.*
- **CS1673**: *Anonymous methods, lambda expressions, and query expressions inside structs cannot access instance members of `this`.*
- **CS1686**: *Local variable or its members cannot have their address taken and be used inside an anonymous method or lambda expression.*
- **CS1706**: *Expression cannot contain anonymous methods or lambda expressions.*
- **CS1764**: *Cannot use fixed local inside an anonymous method, lambda expression, or query expression.*
- **CS1911**: Warning: *Access to member through a 'base' keyword from an anonymous method, lambda expression, query expression, or iterator results in unverifiable code.*
- **CS8175**: *Cannot use ref local inside an anonymous method, lambda expression, or query expression.*
- **CS8820**: *A static anonymous function cannot contain a reference to 'variable'.*
- **CS8821**: *A static anonymous function cannot contain a reference to 'this' or 'base'.*
- **CS8971**: Warning: *InterpolatedStringHandlerArgument has no effect when applied to lambda parameters and will be ignored at the call site.*
- **CS9236**: Informational: *Compiling requires binding the lambda expression at least count times. Consider declaring the lambda expression with explicit parameter types, or if the containing method call is generic, consider using explicit type arguments.*

The compiler prohibits certain C# constructs inside lambda expressions and anonymous methods. These restrictions exist because the compiler transforms lambdas and anonymous methods into delegate invocations or expression trees, and some constructs can't be represented in those forms. For more information, see the anonymous function expressions section of the C# specification.

You can correct these errors by using the following guidance:

- Move any `yield return` or `yield break` statement out of the lambda body and into the enclosing iterator method, or convert the lambda to a local function, which supports `yield` statements (**CS1621**).
- Avoid referencing `in`, `ref`, or `out` parameters from the enclosing method inside the lambda body. When the lambda captures these parameters, the reference semantics of `ref`-like parameters can't be preserved. Copy the value to a local variable and use that local instead, or convert the lambda to a local function (**CS1628**).
- Remove any `break`, `goto`, or `continue` statement that transfers control out of the lambda body. Control flow statements must target labels or loops within the same lambda body (**CS1632**).
- In a `struct` type, avoid referencing instance members through `this` inside a lambda expression, anonymous method, or query expression. Because the compiler captures `this` by value in a `struct`, mutations inside the lambda don't affect the original instance. Extract the needed member values into local variables before the lambda, or convert to a local function, which can access `this` directly (**CS1673**).
- Don't take the address of a local variable that the lambda also captures. The compiler moves captured variables to a heap-allocated closure object, making their address unstable. Separate the address-taking logic from the lambda, or use a local function instead (**CS1686**).
- Move the lambda expression or anonymous method out of the containing expression that prohibits it. Some expressions, such as attribute constructors, don't support lambda expressions or anonymous methods as arguments (**CS1706**).
- Don't use a `fixed` local variable inside a lambda body. The pinning guarantee of the `fixed` statement applies only to the enclosing scope, not to the closure that the compiler generates (**CS1764**).
- Don't use a `ref` local inside a lambda body. Like `ref` parameters, `ref` locals can't be captured in the closure the compiler generates for the lambda. Assign the value to a non-`ref` local variable, or convert the lambda to a local function (**CS8175**).
- Don't use a lambda expression, anonymous method, or method group as the first operand of the `is` or `as` operator. These constructs don't have a type that can be tested at run time. Assign the expression to a variable first, then test the variable (**CS0837**).
- Remove the `static` modifier from the lambda, or remove the reference to the captured variable. A `static` lambda explicitly prohibits capturing local variables, parameters, or `this` to avoid unintended closure allocations. If you need to reference outer variables, remove the `static` modifier. If you want to keep heap allocation minimal, pass the values as parameters to the lambda (**CS8820**, **CS8821**).
- Remove the `System.Runtime.CompilerServices.InterpolatedStringHandlerArgumentAttribute` from the lambda parameter, or move the logic to a method where the attribute is honored. The compiler ignores this attribute on lambda parameters because lambda invocations don't use the same interpolated string handler lowering as regular method calls (**CS8971**).
- Avoid calling a virtual member through the `base` keyword inside a lambda or anonymous method. The compiler generates a non-virtual call through a helper method, which produces unverifiable code. Consider extracting the `base` call into a separate method and calling that method from the lambda instead (**CS1911**).
- Reduce the complexity of overloaded method calls that accept lambda expressions, or add explicit type information. When the compiler must bind a lambda expression multiple times to resolve overloads, it emits this informational diagnostic. Declaring the lambda with explicit parameter types, or providing explicit type arguments on the generic method call, reduces the number of binding passes the compiler must perform (**CS9236**).
