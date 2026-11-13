---
title: "Errors and warnings for parameter / argument mismatches"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/compiler-messages/parameter-argument-mismatch.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Parameter and argument mismatch

The compiler generates the following errors when you don't supply an argument for a formal parameter, or when the argument isn't valid for that parameter:

- **CS0182**: *An attribute argument must be a constant expression, `typeof` expression or array creation expression of an attribute parameter type.*
- **CS0591**: *Invalid value for argument to 'attribute' attribute.*
- **CS0599**: *Invalid value for named attribute argument 'argument'.*
- **CS0617**: *'argument' is not a valid named attribute argument. Named attribute arguments must be fields which are not readonly, static, or const, or read-write properties which are public and not static.*
- **CS0633**: *The argument to the 'attribute' attribute must be a valid identifier.*
- **CS0643**: *'argument' duplicate named attribute argument.*
- **CS0655**: *'argument' is not a valid named attribute argument because it is not a valid attribute parameter type.*
- **CS0839**: *Argument missing.*
- **CS1016**: *Named attribute argument expected.*
- **CS1739**: *The best overload for 'method' does not have a parameter named 'parameter'.*
- **CS1740**: *Named argument 'argument' cannot be specified multiple times.*
- **CS1742**: *An array access may not have a named argument specifier.*
- **CS1744**: *Named argument 'argument' specifies a parameter for which a positional argument has already been given.*
- **CS1746**: *The delegate 'delegate' does not have a parameter named 'name'.*
- **CS7036**: *There is no argument given that corresponds to the required parameter 'parameter' of 'method'.*
- **CS8323**: *Named argument 'argument name' is used out-of-position but is followed by an unnamed argument.*
- **CS8324**: *Named argument specifications must appear after all fixed arguments have been specified in a dynamic invocation.*
- **CS8362**: *`__arglist` cannot have an argument of void type.*
- **CS8378**: *`__arglist` cannot have an argument passed by 'in' or 'out'.*
- **CS8905**: *A function pointer cannot be called with named arguments.*
- **CS8943**: *null is not a valid parameter name. To get access to the receiver of an instance method, use the empty string as the parameter name.*
- **CS8944**: *'method' is not an instance method, the receiver or extension receiver parameter cannot be an interpolated string handler argument.*
- **CS8945**: *'parameter name' is not a valid parameter name from 'method'.*
- **CS8948**: *`InterpolatedStringHandlerArgumentAttribute` arguments cannot refer to the parameter the attribute is used on.*
- **CS8949**: *The `InterpolatedStringHandlerArgumentAttribute` applied to parameter 'parameter' is malformed and cannot be interpreted. Construct an instance of 'handler type' manually.*
- **CS8950**: *Parameter 'argument parameter' is an argument to the interpolated string handler conversion on parameter 'handler parameter', but the corresponding argument is specified after the interpolated string expression. Reorder the arguments to move 'argument parameter' before 'handler parameter'.*
- **CS8951**: *Parameter 'argument parameter' is not explicitly provided, but is used as an argument to the interpolated string handler conversion on parameter 'handler parameter'. Specify the value of 'argument parameter' before 'handler parameter'.*
- **CS8964**: *The `CallerArgumentExpressionAttribute` may only be applied to parameters with default values.*
- **CS8965**: *The `CallerArgumentExpressionAttribute` applied to parameter 'parameter' will have no effect because it's self-referential.*
- **CS8966**: *The `CallerArgumentExpressionAttribute` applied to parameter 'parameter' will have no effect because it applies to a member that is used in contexts that do not allow optional arguments.*

## Missing argument

The compiler returns the following general errors when it can't match arguments to all member parameters:

- **CS0839**: *Argument missing.*
- **CS7036**: *There is no argument given that corresponds to the required parameter 'parameter' of 'method'.*

These errors indicate that the compiler can't match the arguments in a method call to the required parameters of the method. Check the following causes:

- You included all necessary arguments.
- The arguments are in the correct order.
- All arguments are the correct type.
- Overload resolution rules chose the method you expected.

You might also see *CS7036* if you wrote overloaded local functions. Local functions can't be overloaded. The compiler only recognizes the first local function with that name. Check if you meant to call a different local function.

These errors often appear with other diagnostics that can help diagnose the correct cause.

## Arguments for attributes

The compiler returns these errors when an argument to an attribute constructor is incorrect:

- **CS0182**: *An attribute argument must be a constant expression, `typeof` expression, or array creation expression of an attribute parameter type.*
- **CS0591**: *Invalid value for argument to 'attribute' attribute.*
- **CS0599**: *Invalid value for named attribute argument 'argument'.*
- **CS0617**: *'argument' is not a valid named attribute argument. Named attribute arguments must be fields which are not readonly, static, or const, or read-write properties which are public and not static.*
- **CS0633**: *The argument to the 'attribute' attribute must be a valid identifier.*
- **CS0643**: *'argument' duplicate named attribute argument.*
- **CS0655**: *'argument' is not a valid named attribute argument because it is not a valid attribute parameter type.*

If you use the `System.AttributeUsageAttribute` on your attribute definition, ensure the allowed values aren't mutually exclusive. Check that the type and order of arguments to the attribute are correct. Ensure the text of string arguments is valid. For many attributes, the argument must be a valid C# identifier. Arguments to attribute constructors must be compile-time constants. Therefore, you can only use types that support literal constants. In addition, the following types that support literal constants are disallowed as attribute parameters:

- sbyte
- ushort
- uint
- ulong
- decimal

You can't specify repeated named arguments with the same parameter name. You can only set accessible properties when you initialize an attribute. You can't set private properties.

## Named and optional parameters and arguments

The compiler issues the following errors for incorrect use of named and optional arguments:

- **CS1016**: *Named attribute argument expected.*
- **CS1739**: *The best overload for 'method' does not have a parameter named 'parameter'.*
- **CS1740**: *Named argument 'argument' cannot be specified multiple times.*
- **CS1742**: *An array access may not have a named argument specifier.*
- **CS1744**: *Named argument 'argument' specifies a parameter for which a positional argument has already been given.*
- **CS1746**: *The delegate 'delegate' does not have a parameter named 'name'.*
- **CS8323**: *Named argument 'argument name' is used out-of-position but is followed by an unnamed argument.*
- **CS8324**: *Named argument specifications must appear after all fixed arguments have been specified in a dynamic invocation.*
- **CS8905**: *A function pointer cannot be called with named arguments.*

Check for the following causes of these errors:

- The parameter name of the named argument is incorrect.
- The chosen overload doesn't have a parameter matching the named argument.
- A parameter name is repeated on more than one argument.
- An out-of-position named argument is followed by a positional argument. In C# 7.2 and later, a named argument can precede positional arguments only when it's in the parameter's correct position. Otherwise, move all positional arguments before it or reorder the named argument to its matching parameter position (**CS8323**).
- Named arguments aren't allowed for array index parameters.

## Variable argument lists

The compiler returns these errors for invalid arguments in an `__arglist` expression:

- **CS8362**: *`__arglist` cannot have an argument of void type.*
- **CS8378**: *`__arglist` cannot have an argument passed by 'in' or 'out'.*

Pass only expressions that produce a value, either by value or with `ref`. Replace a `void`-returning invocation with an expression that has a value (**CS8362**). Remove `in` or `out`, or change the called API so the argument can be passed by value or by `ref` (**CS8378**).

## Interpolated string handler

The compiler returns the following errors when you specify an interpolated string handler incorrectly.

- **CS8943**: *null is not a valid parameter name. To get access to the receiver of an instance method, use the empty string as the parameter name.*
- **CS8944**: *'method' is not an instance method, the receiver or extension receiver parameter cannot be an interpolated string handler argument.*
- **CS8945**: *'parameter name' is not a valid parameter name from 'method'.*
- **CS8948**: *`InterpolatedStringHandlerArgumentAttribute` arguments cannot refer to the parameter the attribute is used on.*
- **CS8949**: *The `InterpolatedStringHandlerArgumentAttribute` applied to parameter 'parameter' is malformed and cannot be interpreted. Construct an instance of 'handler type' manually.*
- **CS8950**: *Parameter 'argument parameter' is an argument to the interpolated string handler conversion on parameter 'handler parameter', but the corresponding argument is specified after the interpolated string expression. Reorder the arguments to move 'argument parameter' before 'handler parameter'.*
- **CS8951**: *Parameter 'argument parameter' is not explicitly provided, but is used as an argument to the interpolated string handler conversion on parameter 'handler parameter'. Specify the value of 'argument parameter' before 'handler parameter'.*

An interpolated string handler is a pattern-based construct. It's important to get the pattern correct. Consult the C# language specification section on custom interpolated string expression handlers, or follow the tutorial on building an interpolated string handler.

## Caller debugging information

The compiler issues the following error when you use the `System.Runtime.CompilerServices.CallerArgumentExpressionAttribute` incorrectly:

- **CS8964**: *The `CallerArgumentExpressionAttribute` may only be applied to parameters with default values.*

The compiler also issues the following warnings when you use the `CallerArgumentExpressionAttribute` incorrectly:

- **CS8965**: *The `CallerArgumentExpressionAttribute` applied to parameter 'parameter' will have no effect because it's self-referential.*
- **CS8966**: *The `CallerArgumentExpressionAttribute` applied to parameter 'parameter' will have no effect because it applies to a member that is used in contexts that do not allow optional arguments.*

Any parameter you annotate with the `CallerArgumentExpression` attribute must have a default value.
