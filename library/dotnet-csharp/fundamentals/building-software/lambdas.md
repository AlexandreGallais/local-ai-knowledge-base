---
title: "Lambda expressions"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/building-software/lambdas.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Lambda expressions

Choose a lambda expression when you want to pass a short operation to another method and the operation is clearest beside the call that uses it. An inline rule shows readers how you select or transform items; a named method lets them follow the operation's purpose before they inspect its details.

> **Tip:**
> This article teaches practical choices for developers who know C# methods and collections. For the complete lambda syntax and rules, see the lambda expressions reference.

A *lambda expression* is an unnamed function that you write where another piece of code needs behavior.

The following lambda accepts a session and returns whether the session has open seats:

```csharp
session => session.Registered < session.Capacity
```

The `=>` operator separates the parameters on the left from the body on the right. Read it as "goes to."

## Pass behavior to a method

Many .NET APIs accept a delegate, which is a type that represents behavior with a particular parameter list and return type. A lambda provides that behavior. For an introduction to delegate types such as `Func` and `Action`, see Lambda expressions, delegates, and events.

The following example works with workshop sessions. A `WorkshopSession` contains a title, duration, capacity, and registration count.

```csharp
int maximumMinutes = 60;

var shortSessions = sessions
    .Where(session => session.DurationMinutes <= maximumMinutes)
    .OrderBy(session => session.Title);

foreach (WorkshopSession session in shortSessions)
{
    Console.WriteLine(session.Title);
}
```
The first lambda tells `Where` which sessions to keep. The second tells `OrderBy` which value to sort by. The methods receive behavior without knowing the details of either rule.

## Choose a parameter form

Choose the shortest parameter form that stays clear:

```csharp
session => session.DurationMinutes <= 60
```

For one parameter, omit parentheses when the compiler can infer the type. Use empty parentheses for no parameters:

```csharp
() => DateTime.Now
```

Use parentheses for two or more parameters:

```csharp
(left, right) => left + right
```

Usually, the method that receives the lambda supplies enough information for the compiler to infer parameter types. Write explicit types when inference needs help or when the types improve clarity:

```csharp
(WorkshopSession session) => session.Title
```

The lambda expressions reference covers parameter modifiers, attributes, default values, and other specialized forms.

## Choose an expression or statement body

Use an *expression lambda* when one expression calculates the result:

```csharp
session => session.Registered < session.Capacity
```

Use a *statement lambda* when the operation needs more than one statement. Enclose the body in braces, and include `return` when the lambda returns a value:

```csharp
var descriptions = sessions.Select(session =>
{
    int seatsLeft = session.Capacity - session.Registered;
    string availability = seatsLeft > 0 ? $"{seatsLeft} seats left" : "full";
    return $"{session.Title}: {availability}";
});

Console.WriteLine(string.Join(Environment.NewLine, descriptions));
```
Keep statement lambdas brief. When the body needs several steps or the same logic appears more than once, give the behavior a descriptive name with a local function or regular method.

## Capture values from the surrounding scope

A lambda can use a variable declared in the surrounding method. This use is called *capture*. In the first example, the selection lambda captures `maximumMinutes`:

```csharp
int maximumMinutes = 60;
var shortSessions = sessions.Where(
    session => session.DurationMinutes <= maximumMinutes);
```

Capture helps a short rule use local context. The lambda captures the variable itself, not a copy of its value. If the variable changes before the lambda runs, the lambda sees the current value.

Make the needed context easy to identify. If a lambda doesn't need surrounding state, add `static` to prevent accidental capture and make that independence visible to readers:

```csharp
var openSessions = sessions.Where(
    static session => session.Registered < session.Capacity);
```

A static lambda can use its parameters, values it declares, constants, and static members. It can't use local variables or instance state from the surrounding code.

## Choose a lambda, method group, or local function

Several C# forms can supply behavior to a delegate parameter:

- Use a **lambda expression** for short behavior that reads clearly beside the call.
- Use a **method group** when an existing method has the required signature and its name explains the behavior.
- Use a **local function** when the containing member needs reusable named logic, recursion, or a body that's too large for an inline lambda.
- Use a **regular method** when multiple members need the behavior.

A *method group* is a method name without its argument list. The compiler converts the matching method to the required delegate type:

```csharp
var openSessions = sessions.Where(HasOpenSeats);

foreach (WorkshopSession session in openSessions)
{
    Console.WriteLine($"Open: {session.Title}");
}

static bool HasOpenSeats(WorkshopSession session) =>
    session.Registered < session.Capacity;
```
`Where(HasOpenSeats)` communicates the same rule as `Where(session => HasOpenSeats(session))` with less code. The method name tells readers what the rule tests; an inline comparison shows how it tests that rule. Keep the lambda wrapper when it adds an argument, combines operations, or makes the call clearer.

For a detailed local comparison, see Local functions.

## See also

- Building software
- Local functions
- Lambda expressions reference
- Lambda expressions, delegates, and events
- LINQ
