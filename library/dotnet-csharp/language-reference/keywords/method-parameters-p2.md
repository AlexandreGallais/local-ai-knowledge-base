---
title: "Method parameters and modifiers (part 2 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/keywords/method-parameters.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Method parameters and modifiers (part 2 of 3)

## Reference parameters

To pass arguments by reference instead of by value, use one of the following modifiers in a parameter declaration:

- `ref`: Initialize the argument before calling the method. The method can assign a new value to the parameter, but it isn't required to.
- `out`: The calling method doesn't need to initialize the argument before calling the method. The method must assign a value to the parameter.
- `ref readonly`: Initialize the argument before calling the method. The method can't assign a new value to the parameter.
- `in`: Initialize the argument before calling the method. The method can't assign a new value to the parameter. The compiler might create a temporary variable to hold a copy of the argument to `in` parameters.

A parameter that's passed by reference is a *reference variable*. It doesn't have its own value. Instead, it refers to a different variable called its *referent*. You can ref reassign reference variables, which changes their referent.

Members of a class can't have signatures that differ only by `ref`, `ref readonly`, `in`, or `out`. A compiler error occurs if the only difference between two members of a type is that one member has a `ref` parameter and the other member has an `out`, `ref readonly`, or `in` parameter. However, you can overload methods when one method has a `ref`, `ref readonly`, `in`, or `out` parameter and the other method has a parameter that's passed by value, as shown in the following example. In other situations that require signature matching, such as hiding or overriding, `in`, `ref`, `ref readonly`, and `out` are part of the signature and don't match each other.

When a parameter has one of the preceding modifiers, the corresponding argument can have a compatible modifier:

- An argument for a `ref` parameter must include the `ref` modifier.
- An argument for an `out` parameter must include the `out` modifier.
- An argument for an `in` parameter can optionally include the `in` modifier. If the `ref` modifier is used on the argument instead, the compiler issues a warning.
- An argument for a `ref readonly` parameter should include either the `in` or `ref` modifiers, but not both. If neither modifier is included, the compiler issues a warning.

When you use these modifiers, they describe how the argument is used:

- `ref` means the method can read or write the value of the argument.
- `out` means the method sets the value of the argument.
- `ref readonly` means the method reads, but can't write the value of the argument. The argument *should* be passed by reference.
- `in` means the method reads, but can't write the value of the argument. The argument is passed by reference or through a temporary variable.

You can't use the previous parameter modifiers in the following kinds of methods:

- Async methods, which you define by using the async modifier.
- Iterator methods, which include a yield return or `yield break` statement.

Extension members also have restrictions on the use of these argument keywords:

- The `out` keyword can't be used on the first argument of an extension method.
- The `ref` keyword can't be used on the first argument of an extension method when the argument isn't a `struct`, or a generic type not constrained to be a struct.
- The `ref readonly` and `in` keywords can't be used unless the first argument is a `struct`.
- The `ref readonly` and `in` keywords can't be used on any generic type, even when constrained to be a struct.

Properties aren't variables. They're methods. You can't use properties as arguments for `ref` parameters.

### `ref` parameter modifier

To use a `ref` parameter, both the method definition and the calling method must explicitly use the `ref` keyword, as shown in the following example. (Except that the calling method can omit `ref` when making a COM call.)

```csharp
void Method(ref int refArgument)
{
    refArgument = refArgument + 44;
}

int number = 1;
Method(ref number);
Console.WriteLine(number);
// Output: 45
```
You must initialize an argument before you pass it to a `ref` parameter.

### `out` parameter modifier

To use an `out` parameter, both the method definition and the calling method must explicitly use the `out` keyword. For example:

```csharp
int initializeInMethod;
OutArgExample(out initializeInMethod);
Console.WriteLine(initializeInMethod);     // value is now 44

void OutArgExample(out int number)
{
    number = 44;
}
```
You don't need to initialize variables passed as `out` arguments before the method call. However, the called method must assign a value before it returns.

Deconstruct methods declare their parameters with the `out` modifier to return multiple values. Other methods can return value tuples for multiple return values.

You can declare a variable in a separate statement before you pass it as an `out` argument. You can also declare the `out` variable in the argument list of the method call, rather than in a separate variable declaration. `out` variable declarations produce more compact, readable code, and also prevent you from inadvertently assigning a value to the variable before the method call. The following example defines the `number` variable in the call to the Int32.TryParse) method.

```csharp
string numberAsString = "1640";

if (Int32.TryParse(numberAsString, out int number))
    Console.WriteLine($"Converted '{numberAsString}' to {number}");
else
    Console.WriteLine($"Unable to convert '{numberAsString}'");
// The example displays the following output:
//       Converted '1640' to 1640
```
You can also declare an implicitly typed local variable.

### `ref readonly` modifier

The method declaration requires the `ref readonly` modifier. A modifier at the call site is optional. You can use either the `in` or `ref` modifier. The `ref readonly` modifier isn't valid at the call site. The modifier you use at the call site can help describe characteristics of the argument. You can use `ref` only if the argument is a variable and is writable. You can use `in` only when the argument is a variable. The variable might be writable or readonly. You can't add either modifier if the argument isn't a variable but is an expression. The following examples show these conditions. The following method uses the `ref readonly` modifier to indicate that a large struct should be passed by reference for performance reasons:

```csharp
public static void ForceByRef(ref readonly OptionStruct thing)
{
    // elided
}
```
You can call the method by using the `ref` or `in` modifier. If you omit the modifier, the compiler issues a warning. When the argument is an expression, not a variable, you can't add the `in` or `ref` modifiers, so you should suppress the warning:

```csharp
ForceByRef(in options);
ForceByRef(ref options);
ForceByRef(options); // Warning! variable should be passed with `ref` or `in`
ForceByRef(new OptionStruct()); // Warning, but an expression, so no variable to reference
```
If the variable is a `readonly` variable, you must use the `in` modifier. The compiler issues an error if you use the `ref` modifier instead.

The `ref readonly` modifier indicates that the method expects the argument to be a variable rather than an expression that isn't a variable. Examples of expressions that aren't variables are constants, method return values, and properties. If the argument isn't a variable, the compiler issues a warning.

### `in` parameter modifier

The `in` modifier is required in the method declaration but unnecessary at the call site.

```csharp
var largeStruct = new LargeStruct { Value1 = 42, Value2 = 3.14, Value3 = "Hello" };

// Using 'in' avoids copying the large struct and prevents modification
ProcessLargeStruct(in largeStruct);
Console.WriteLine($"Original value unchanged: {largeStruct.Value1}");

// Without 'in', the struct would be copied (less efficient for large structs)
ProcessLargeStructByValue(largeStruct);
Console.WriteLine($"Original value still unchanged: {largeStruct.Value1}");

void ProcessLargeStruct(in LargeStruct data)
{
    // Can read the values
    Console.WriteLine($"Processing: {data.Value1}, {data.Value2}, {data.Value3}");
    
    // Uncomment the following line to see error CS8331
    // data.Value1 = 99; // Compilation error: cannot assign to 'in' parameter
}

void ProcessLargeStructByValue(LargeStruct data)
{
    // This method receives a copy of the struct
    Console.WriteLine($"Processing copy: {data.Value1}, {data.Value2}, {data.Value3}");
    
    // Modifying the copy doesn't affect the original
    data.Value1 = 99;
}
```
The `in` modifier enables the compiler to create a temporary variable for the argument and pass a readonly reference to that argument. The compiler always creates a temporary variable when the argument must be converted, when there's an implicit conversion from the argument type, or when the argument is a value that isn't a variable. For example, when the argument is a literal value, or the value returned from a property accessor. When your API requires that the argument be passed by reference, choose the `ref readonly` modifier instead of the `in` modifier.

You can gain performance optimization by defining methods with `in` parameters. Some `struct` type arguments might be large in size, and when you call methods in tight loops or critical code paths, the cost of copying those structures is substantial. Declare `in` parameters to specify that you can safely pass arguments by reference because the called method doesn't modify the state of that argument. Passing those arguments by reference avoids the (potentially) expensive copy. You explicitly add the `in` modifier at the call site to ensure the argument is passed by reference, not by value. Explicitly using `in` has the following two effects:

- Specifying `in` at the call site forces the compiler to select a method defined with a matching `in` parameter. Otherwise, when two methods differ only in the presence of `in`, the by value overload is a better match.
- By specifying `in`, you declare your intent to pass an argument by reference. The argument used with `in` must represent a location that can be directly referred to. The same general rules for `out` and `ref` arguments apply: You can't use constants, ordinary properties, or other expressions that produce values. Otherwise, omitting `in` at the call site informs the compiler that it's fine to create a temporary variable to pass by read-only reference to the method. The compiler creates a temporary variable to overcome several restrictions with `in` arguments:
  - A temporary variable allows compile-time constants as `in` parameters.
  - A temporary variable allows properties, or other expressions for `in` parameters.
  - A temporary variable allows arguments where there's an implicit conversion from the argument type to the parameter type.

In all the preceding instances, the compiler creates a temporary variable that stores the value of the constant, property, or other expression.

The following code illustrates these rules:

```csharp
static void Method(in int argument)
{
    // implementation removed
}

Method(5); // OK, temporary variable created.
Method(5L); // CS1503: no implicit conversion from long to int
short s = 0;
Method(s); // OK, temporary int created with the value 0
Method(in s); // CS1503: cannot convert from in short to in int
int i = 42;
Method(i); // passed by readonly reference
Method(in i); // passed by readonly reference, explicitly using `in`
```

Now, suppose another method using by-value arguments was available. The results change as shown in the following code:

```csharp
static void Method(int argument)
{
    // implementation removed
}

static void Method(in int argument)
{
    // implementation removed
}

Method(5); // Calls overload passed by value
Method(5L); // CS1503: no implicit conversion from long to int
short s = 0;
Method(s); // Calls overload passed by value.
Method(in s); // CS1503: cannot convert from in short to in int
int i = 42;
Method(i); // Calls overload passed by value
Method(in i); // passed by readonly reference, explicitly using `in`
```

The only method call where the argument is passed by reference is the final one.

> **Note:**
> The preceding code uses `int` as the argument type for simplicity. Because `int` is no larger than a reference in most modern machines, there's no benefit to passing a single `int` as a readonly reference.
