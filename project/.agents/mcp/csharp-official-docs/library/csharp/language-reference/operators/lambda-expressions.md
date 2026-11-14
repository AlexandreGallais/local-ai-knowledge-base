---
title: "Lambda expressions - Lambda expressions and anonymous functions (part 1 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/operators/lambda-expressions.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Lambda expressions and anonymous functions

Use a *lambda expression* to create an anonymous function. Use the lambda declaration operator `=>` to separate the lambda's parameter list from its body.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

A lambda expression can be any of the following two forms:

- Expression lambda that has an expression as its body:

  ```csharp
  (input-parameters) => expression
  ```

- Statement lambda that has a statement block as its body:

  ```csharp
  (input-parameters) => { <sequence-of-statements> }
  ```

To create a lambda expression, specify input parameters (if any) on the left side of the lambda operator and an expression or a statement block on the other side.

You can convert any lambda expression to a delegate type. The types of its parameters and return value define the delegate type to which a lambda expression can be converted. If a lambda expression doesn't return a value, convert it to one of the `Action` delegate types. If it returns a value, convert it to one of the `Func` delegate types. For example, convert a lambda expression that has two parameters and returns no value to an `System.Action`2` delegate. Convert a lambda expression that has one parameter and returns a value to a `System.Func`2` delegate. In the following example, the lambda expression `x => x * x`, which specifies a parameter named `x` and returns the value of `x` squared, is assigned to a variable of a delegate type:

```csharp
Func<int, int> square = x => x * x;
Console.WriteLine(square(5));
// Output:
// 25
```
You can also convert expression lambdas to the expression tree types, as the following example shows:

```csharp
System.Linq.Expressions.Expression<Func<int, int>> e = x => x * x;
Console.WriteLine(e);
// Output:
// x => (x * x)
```
Use lambda expressions in any code that requires instances of delegate types or expression trees. One example is the argument to the `System.Threading.Tasks.Task.Run(System.Action)` method to pass the code that should be executed in the background. You can also use lambda expressions when you write LINQ in C#, as the following example shows:

```csharp
int[] numbers = { 2, 3, 4, 5 };
var squaredNumbers = numbers.Select(x => x * x);
Console.WriteLine(string.Join(" ", squaredNumbers));
// Output:
// 4 9 16 25
```
When you use method-based syntax to call the `System.Linq.Enumerable.Select*` method in the `System.Linq.Enumerable` class, for example in LINQ to Objects and LINQ to XML, the parameter is a delegate type `System.Func`2`. When you call the `System.Linq.Queryable.Select*` method in the `System.Linq.Queryable` class, for example in LINQ to SQL, the parameter type is an expression tree type `Expression<Func<TSource,TResult>>`. In both cases, you can use the same lambda expression to specify the parameter value. That makes the two `Select` calls to look similar although in fact the type of objects created from the lambdas is different.

## Expression lambdas

A lambda expression with an expression on the right side of the `=>` operator is called an *expression lambda*. An expression lambda returns the result of the expression and takes the following basic form:

```csharp
(input-parameters) => expression
```

The body of an expression lambda can consist of a method call. However, when you create expression trees that a query provider evaluates, limit method calls to those methods that the query provider translates to its format. Different query providers have varying capabilities. For example, many SQL-based providers can translate methods like `System.String.StartsWith*` into appropriate SQL expressions such as `LIKE`. If a query provider doesn't recognize a method call, it can't translate or execute the expression.

## Statement lambdas

A statement lambda resembles an expression lambda except that its statements are enclosed in braces:

```csharp
(input-parameters) => { <sequence-of-statements> }
```

The body of a statement lambda can consist of any number of statements. However, in practice, typically there are no more than two or three.

```csharp
Action<string> greet = name =>
{
    string greeting = $"Hello {name}!";
    Console.WriteLine(greeting);
};
greet("World");
// Output:
// Hello World!
```
You can't use statement lambdas to create expression trees.

## Input parameters of a lambda expression

Enclose input parameters of a lambda expression in parentheses. Specify zero input parameters by using empty parentheses:

```csharp
Action line = () => Console.WriteLine();
```
If a lambda expression has only one input parameter, you can omit the parentheses:

```csharp
Func<double, double> cube = x => x * x * x;
```
Separate two or more input parameters with commas:

```csharp
Func<int, int, bool> testForEquality = (x, y) => x == y;
```
The compiler typically infers the types for parameters to lambda expressions, which is called an *implicitly typed parameter list*. You can specify the types explicitly, which is called an *explicitly typed parameter list*. The following example shows an explicitly typed parameter list:

```csharp
Func<int, string, bool> isTooLong = (int x, string s) => s.Length > x;
```
Input parameter types must be all explicit or all implicit. Otherwise, a CS0748 compiler error occurs. Before C# 14, you must include the explicit type on a parameter if it has any modifiers, such as `ref` or `out`. In C# 14, that restriction is removed. However, you must still declare the type if you use the `params` modifier.

Use discards to specify two or more input parameters of a lambda expression that aren't used in the expression:

```csharp
Func<int, int, int> constant = (_, _) => 42;
```
Lambda discard parameters can be useful when you use a lambda expression to provide an event handler.

> **Note:**
> For backwards compatibility, if only a single input parameter is named `_`, the compiler treats `_` as the name of that parameter  within that lambda expression.

You can provide *default values* for explicitly typed parameter lists. The syntax and the restrictions on default parameter values are the same as for methods and local functions. The following example declares a lambda expression with a default parameter, then calls it once by using the default and once with two explicit parameters:

```csharp
var IncrementBy = (int source, int increment = 1) => source + increment;

Console.WriteLine(IncrementBy(5)); // 6
Console.WriteLine(IncrementBy(5, 2)); // 7
```
You can also declare lambda expressions with `params` arrays or collections as the last parameter in an explicitly typed parameter list:

```csharp
var sum = (params IEnumerable<int> values) =>
{
    int sum = 0;
    foreach (var value in values) 
        sum += value;
    
    return sum;
};

var empty = sum();
Console.WriteLine(empty); // 0

var sequence = new[] { 1, 2, 3, 4, 5 };
var total = sum(sequence);
Console.WriteLine(total); // 15
```
As part of these updates, when a method group that has a default parameter is assigned to a lambda expression, that lambda expression also has the same default parameter. A method group with a `params` collection parameter can also be assigned to a lambda expression.

Lambda expressions with default parameters or `params` collections as parameters don't have natural types that correspond to `Func<>` or `Action<>` types. However, you can define delegate types that include default parameter values:

```csharp
delegate int IncrementByDelegate(int source, int increment = 1);
delegate int SumDelegate(params int[] values);
delegate int SumCollectionDelegate(params IEnumerable<int> values);
```
Or, you can use implicitly typed variables with `var` declarations to define the delegate type. The compiler synthesizes the correct delegate type.

For more information about default parameters on lambda expressions, see the default parameters on lambda expressions feature specification.

## Async lambdas

By using the async and await keywords, you can easily create lambda expressions and statements that incorporate asynchronous processing. For example, the following Windows Forms example contains an event handler that calls and awaits an async method, `ExampleMethodAsync`.

```csharp
public partial class Form1 : Form
{
    public Form1()
    {
        InitializeComponent();
        button1.Click += button1_Click;
    }

    private async void button1_Click(object sender, EventArgs e)
    {
        await ExampleMethodAsync();
        textBox1.Text += "\r\nControl returned to Click event handler.\n";
    }

    private async Task ExampleMethodAsync()
    {
        // The following line simulates a task-returning asynchronous process.
        await Task.Delay(1000);
    }
}
```

You can add the same event handler by using an async lambda. To add this handler, add an `async` modifier before the lambda parameter list, as the following example shows:

```csharp
public partial class Form1 : Form
{
    public Form1()
    {
        InitializeComponent();
        button1.Click += async (sender, e) =>
        {
            await ExampleMethodAsync();
            textBox1.Text += "\r\nControl returned to Click event handler.\n";
        };
    }

    private async Task ExampleMethodAsync()
    {
        // The following line simulates a task-returning asynchronous process.
        await Task.Delay(1000);
    }
}
```

For more information about how to create and use async methods, see Asynchronous Programming with async and await.

## Lambda expressions and tuples

The C# language provides built-in support for tuples. You can provide a tuple as an argument to a lambda expression, and your lambda expression can also return a tuple. In some cases, the C# compiler uses type inference to determine the types of tuple elements.

You define a tuple by enclosing a comma-delimited list of its components in parentheses. The following example uses tuple with three components to pass a sequence of numbers to a lambda expression, which doubles each value and returns a tuple with three components that contains the result of the multiplications.

```csharp
Func<(int, int, int), (int, int, int)> doubleThem = ns => (2 * ns.Item1, 2 * ns.Item2, 2 * ns.Item3);
var numbers = (2, 3, 4);
var doubledNumbers = doubleThem(numbers);
Console.WriteLine($"The set {numbers} doubled: {doubledNumbers}");
// Output:
// The set (2, 3, 4) doubled: (4, 6, 8)
```
Ordinarily, the fields of a tuple are named `Item1`, `Item2`, and so on. You can, however, define a tuple with named components, as the following example does.

```csharp
Func<(int n1, int n2, int n3), (int, int, int)> doubleThem = ns => (2 * ns.n1, 2 * ns.n2, 2 * ns.n3);
var numbers = (2, 3, 4);
var doubledNumbers = doubleThem(numbers);
Console.WriteLine($"The set {numbers} doubled: {doubledNumbers}");
```
For more information about C# tuples, see Tuple types.

## Lambdas with the standard query operators

LINQ to Objects, among other implementations, uses an input parameter whose type is one of the `System.Func`1` family of generic delegates. These delegates use type parameters to define the number and type of input parameters, and the return type of the delegate. `Func` delegates are useful for encapsulating user-defined expressions that are applied to each element in a set of source data. For example, consider the `System.Func`2` delegate type:

```csharp
public delegate TResult Func<in T, out TResult>(T arg)
```

You instantiate the delegate as a `Func<int, bool>` instance where `int` is an input parameter and `bool` is the return value. The return value is always specified in the last type parameter. For example, `Func<int, string, bool>` defines a delegate with two input parameters, `int` and `string`, and a return type of `bool`. The following `Func` delegate, when invoked, returns a Boolean value that indicates whether the input parameter is equal to five:

```csharp
Func<int, bool> equalsFive = x => x == 5;
bool result = equalsFive(4);
Console.WriteLine(result);   // False
```
You can also supply a lambda expression when the argument type is an `System.Linq.Expressions.Expression`1`, for example in the standard query operators that the `System.Linq.Queryable` type defines. When you specify an `System.Linq.Expressions.Expression`1` argument, the lambda is compiled to an expression tree.

The following example uses the `System.Linq.Enumerable.Count*` standard query operator:

```csharp
int[] numbers = { 5, 4, 1, 3, 9, 8, 6, 7, 2, 0 };
int oddNumbers = numbers.Count(n => n % 2 == 1);
Console.WriteLine($"There are {oddNumbers} odd numbers in {string.Join(" ", numbers)}");
```
The compiler can infer the type of the input parameter, or you can specify it explicitly. This particular lambda expression counts those integers (`n`) which when divided by two have a remainder of 1.

The following example produces a sequence that contains all elements in the `numbers` array that precede the 9, because that's the first number in the sequence that doesn't meet the condition:

```csharp
int[] numbers = { 5, 4, 1, 3, 9, 8, 6, 7, 2, 0 };
var firstNumbersLessThanSix = numbers.TakeWhile(n => n < 6);
Console.WriteLine(string.Join(" ", firstNumbersLessThanSix));
// Output:
// 5 4 1 3
```
The following example specifies multiple input parameters by enclosing them in parentheses. The method returns all the elements in the `numbers` array until it finds a number whose value is less than its ordinal position in the array:

```csharp
int[] numbers = { 5, 4, 1, 3, 9, 8, 6, 7, 2, 0 };
var firstSmallNumbers = numbers.TakeWhile((n, index) => n >= index);
Console.WriteLine(string.Join(" ", firstSmallNumbers));
// Output:
// 5 4
```
You don't use lambda expressions directly in query expressions, but you can use them in method calls within query expressions, as the following example shows:

```csharp
var numberSets = new List<int[]>
{
    new[] { 1, 2, 3, 4, 5 },
    new[] { 0, 0, 0 },
    new[] { 9, 8 },
    new[] { 1, 0, 1, 0, 1, 0, 1, 0 }
};

var setsWithManyPositives = 
    from numberSet in numberSets
    where numberSet.Count(n => n > 0) > 3
    select numberSet;

foreach (var numberSet in setsWithManyPositives)
{
    Console.WriteLine(string.Join(" ", numberSet));
}
// Output:
// 1 2 3 4 5
// 1 0 1 0 1 0 1 0
```
