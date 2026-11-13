---
title: "Resolve errors and warnings related to local functions"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/compiler-messages/local-function-errors.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Resolve errors and warnings related to local functions

This article covers the following compiler errors and warnings:

- **CS8108**: *Cannot pass <example-value> with dynamic type to params parameter 'parameter' of local function 'method'.*
- **CS8112**: *Local function 'method' must declare a body because it is not marked 'static extern'.*
- **CS8321**: *The local function 'method' is declared but never used*
- **CS8421**: *A static local function cannot contain a reference to 'variable'.*
- **CS8422**: *A static local function cannot contain a reference to 'this' or 'base'.*

Local functions were added in C# 7.0. They let you declare helper methods inside another member. The diagnostics in this article cover local function declarations, calls, usage, and the extra capture restrictions for `static` local functions.

## Local function bodies

- **CS8112**: *Local function 'method' must declare a body because it is not marked 'static extern'.*

A local function declaration must include a body unless the local function is declared `static extern`. Add a block body or an expression body to the local function. If the implementation is supplied externally, mark the local function `static extern` and ensure the declaration follows the rules for external methods.

## Params parameters and dynamic arguments

- **CS8108**: *Cannot pass <example-value> with dynamic type to params parameter 'parameter' of local function 'method'.*

A local function call can't pass a `dynamic` argument to a `params` parameter. Convert the value to the element type or array type expected by the `params` parameter before the call. You can also store the values in an explicitly typed array and pass that array to the local function.

## Unused local functions

- **CS8321**: *The local function 'method' is declared but never used*

The compiler reports this warning when you declare a local function but no reachable code calls it. Remove the unused local function, or call it from the enclosing member. If you intend to use the local function in a future change, keep it out of the source until it's needed.

## Static local functions can't capture state

- **CS8421**: *A static local function cannot contain a reference to 'variable'.*
- **CS8422**: *A static local function cannot contain a reference to 'this' or 'base'.*

A `static` local function can't capture state from the enclosing scope. It can't reference enclosing local variables, parameters, instance members through `this`, or `this` itself. Pass each value the local function needs as a parameter (**CS8421**, **CS8422**). If the local function must capture variables or instance state from the enclosing scope, remove the `static` modifier.

The following example shows references that cause **CS8422**:

```csharp
public class C
{
    private int counter = 1;

    public void IncreaseCounter()
    {
        static void LocalFunc(int addition)
        {
            this.counter += addition;   // CS8422
            base.ToString();            // CS8422

            counter += addition;        // CS8422: implicit this
            ToString();                 // CS8422: implicit base
        }

        LocalFunc(10);
    }
}
```

To fix **CS8422**, pass the required instance data to the local function, move the helper outside the instance context, or remove `static` when the local function must access instance state.

## Related diagnostics

- For more information about local functions in expression trees, see Some expressions are prohibited in expression trees in C# compiler messages.
- For more information about local functions with generic type parameters, see Resolve errors and warnings related to generic type parameters and type arguments in C# compiler messages.
- For more information about attributes on local functions, see Resolve errors and warnings that involve attribute declaration and attribute use in your code in C# compiler messages.
- For more information about captured variables in anonymous functions, see Lambda expression errors and warnings in C# compiler messages.
- For more information about captures in constructors and primary constructors, see Resolve errors related to constructor declarations and module initializers in C# compiler messages.
