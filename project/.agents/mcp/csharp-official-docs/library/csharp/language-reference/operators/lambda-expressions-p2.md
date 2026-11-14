---
title: "Lambda expressions - Lambda expressions and anonymous functions (part 2 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/operators/lambda-expressions.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Lambda expressions - Lambda expressions and anonymous functions (part 2 of 2)

## Type inference in lambda expressions

When you write lambdas, you often don't need to specify a type for the input parameters. The compiler infers the type based on the lambda body, the parameter types, and other factors described in the C# language specification. For most of the standard query operators, the first input is the type of the elements in the source sequence. If you're querying an `IEnumerable<Customer>`, the input variable is inferred to be a `Customer` object, which means you can access its methods and properties:

```csharp
customers.Where(c => c.City == "London");
```

The general rules for type inference for lambdas are:

- The lambda must contain the same number of parameters as the delegate type.
- Each input parameter in the lambda must be implicitly convertible to its corresponding delegate parameter.
- The return value of the lambda (if any) must be implicitly convertible to the delegate's return type.

## Natural type of a lambda expression

A lambda expression doesn't have a type because the common type system has no intrinsic concept of "lambda expression." However, it's sometimes convenient to speak informally of the "type" of a lambda expression. That informal "type" refers to the delegate type or `System.Linq.Expressions.Expression` type to which the lambda expression is converted.

A lambda expression can have a *natural type*. Instead of requiring you to declare a delegate type, such as `Func<...>` or `Action<...>` for a lambda expression, the compiler infers the delegate type from the lambda expression. For example, consider the following declaration:

```csharp
var parse = (string s) => int.Parse(s);
```

The compiler infers `parse` to be a `Func<string, int>`. The compiler chooses an available `Func` or `Action` delegate, if a suitable one exists. Otherwise, it synthesizes a delegate type. For example, the delegate type is synthesized if the lambda expression has `ref` parameters. When a lambda expression has a natural type, you can assign it to a less explicit type, such as `System.Object` or `System.Delegate`:

```csharp
object parse = (string s) => int.Parse(s);   // Func<string, int>
Delegate parse = (string s) => int.Parse(s); // Func<string, int>
```

Method groups (that is, method names without parameter lists) with exactly one overload have a natural type:

```csharp
var read = Console.Read; // Just one overload; Func<int> inferred
var write = Console.Write; // ERROR: Multiple overloads, can't choose
```

If you assign a lambda expression to `System.Linq.Expressions.LambdaExpression`, or `System.Linq.Expressions.Expression`, and the lambda has a natural delegate type, the expression has a natural type of `System.Linq.Expressions.Expression`1`, with the natural delegate type used as the argument for the type parameter:

```csharp
LambdaExpression parseExpr = (string s) => int.Parse(s); // Expression<Func<string, int>>
Expression parseExpr = (string s) => int.Parse(s);       // Expression<Func<string, int>>
```

Not all lambda expressions have a natural type. Consider the following declaration:

```csharp
var parse = s => int.Parse(s); // ERROR: Not enough type info in the lambda
```

The compiler can't infer a parameter type for `s`. When the compiler can't infer a natural type, you must declare the type:

```csharp
Func<string, int> parse = s => int.Parse(s);
```

## Explicit return type

Typically, the return type of a lambda expression is obvious and inferred. For some expressions, that inference doesn't work:

```csharp
var choose = (bool b) => b ? 1 : "two"; // ERROR: Can't infer return type
```

You can specify the return type of a lambda expression before the input parameters. When you specify an explicit return type, you must parenthesize the input parameters:

```csharp
var choose = object (bool b) => b ? 1 : "two"; // Func<bool, object>
```

## Attributes

You can add attributes to a lambda expression and its parameters. The following example shows how to add attributes to a lambda expression:

```csharp
Func<string?, int?> parse = [ProvidesNullCheck] (s) => (s is not null) ? int.Parse(s) : null;
```

You can also add attributes to the input parameters or return value, as the following example shows:

```csharp
var concat = ([DisallowNull] string a, [DisallowNull] string b) => a + b;
var inc = [return: NotNullIfNotNull(nameof(s))] (int? s) => s.HasValue ? s++ : null;
```

As the preceding examples show, you must parenthesize the input parameters when you add attributes to a lambda expression or its parameters.

> **Important:**
> You invoke lambda expressions through the underlying delegate type. This invocation is different from methods and local functions. The delegate's `Invoke` method doesn't check attributes on the lambda expression. Attributes don't have any effect when the lambda expression is invoked. Attributes on lambda expressions are useful for code analysis, and can be discovered via reflection. One consequence of this decision is that the `System.Diagnostics.ConditionalAttribute` can't be applied to a lambda expression.

## Capture of outer variables and variable scope in lambda expressions

Lambdas can refer to *outer variables*. These *outer variables* are the variables that are in scope in the method that defines the lambda expression, or in scope in the type that contains the lambda expression. If you capture variables in this way, the lambda expression stores them for use even if the variables go out of scope and would normally be garbage collected. You must definitely assign an outer variable before consuming it in a lambda expression. The following example demonstrates these rules:

```csharp
public static class VariableScopeWithLambdas
{
    public class VariableCaptureGame
    {
        internal Action<int>? updateCapturedLocalVariable;
        internal Func<int, bool>? isEqualToCapturedLocalVariable;

        public void Run(int input)
        {
            int j = 0;

            updateCapturedLocalVariable = x =>
            {
                j = x;
                bool result = j > input;
                Console.WriteLine($"{j} is greater than {input}: {result}");
            };

            isEqualToCapturedLocalVariable = x => x == j;

            Console.WriteLine($"Local variable before lambda invocation: {j}");
            updateCapturedLocalVariable(10);
            Console.WriteLine($"Local variable after lambda invocation: {j}");
        }
    }

    public static void Main()
    {
        var game = new VariableCaptureGame();

        int gameInput = 5;
        game.Run(gameInput);

        int jTry = 10;
        bool result = game.isEqualToCapturedLocalVariable!(jTry);
        Console.WriteLine($"Captured local variable is equal to {jTry}: {result}");

        int anotherJ = 3;
        game.updateCapturedLocalVariable!(anotherJ);

        bool equalToAnother = game.isEqualToCapturedLocalVariable(anotherJ);
        Console.WriteLine($"Another lambda observes a new value of captured variable: {equalToAnother}");
    }
    // Output:
    // Local variable before lambda invocation: 0
    // 10 is greater than 5: True
    // Local variable after lambda invocation: 10
    // Captured local variable is equal to 10: True
    // 3 is greater than 5: False
    // Another lambda observes a new value of captured variable: True
}
```
The following rules apply to variable scope in lambda expressions:

- A variable that you capture isn't garbage collected until the delegate that references it becomes eligible for garbage collection.
- Variables you introduce within a lambda expression aren't visible in the enclosing method.
- A lambda expression can't directly capture an in, ref, or out parameter from the enclosing method.
- A return statement in a lambda expression doesn't cause the enclosing method to return.
- A lambda expression can't contain a goto, break, or continue statement if the target of that jump statement is outside the lambda expression block. It's also an error to have a jump statement outside the lambda expression block if the target is inside the block.

To prevent unintentional capture of local variables or instance state by the lambda, apply the `static` modifier to a lambda expression:

```csharp
Func<double, double> square = static x => x * x;
```
A static lambda can't capture local variables or instance state from enclosing scopes, but it can reference static members and constant definitions.

## C# language specification

For more information, see the Anonymous function expressions section of the C# language specification.

## See also

- Use local function instead of lambda (style rule IDE0039)
- C# operators and expressions
- LINQ (Language-Integrated Query)
- Expression trees
- Choose a local function or lambda expression
- LINQ sample queries
- XQuery sample
