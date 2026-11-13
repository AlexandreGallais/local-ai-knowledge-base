---
title: "Tutorial: Combine C# techniques to generate badge labels (part 2 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/tutorials/functional-techniques.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Tutorial: Combine C# techniques to generate badge labels (part 2 of 2)

## Produce the requested copies with an iterator

To expand each attendee into the requested number of labels, uncomment `#define BADGE_COPIES` alongside `BADGE_SORT`. The loop now selects the `BADGE_COPIES` branch shown earlier and calls the iterator already in the file:

```csharp
#if BADGE_COPIES
static IEnumerable<string> CreateLabels(Attendee attendee)
{
#if BADGE_DIAGNOSTICS
    Console.WriteLine($"Iterator started: {attendee.Name}");
#endif
    ArgumentOutOfRangeException.ThrowIfNegativeOrZero(attendee.Copies);

#if BADGE_FORMAT
    string message = attendee.Role switch
    {
        "Guest" => "Welcome!",
        "Host" => "Ask me for help",
        _ => throw new ArgumentException(
            $"Unsupported role: {attendee.Role}.", nameof(attendee))
    };
#endif

    for (int copy = 1; copy <= attendee.Copies; copy++)
    {
#if BADGE_FORMAT
        yield return FormatLabel(
            attendee.Name, attendee.Role, message, copy, attendee.Copies);
#else
        yield return $"{attendee.Name} | {attendee.Role} [{copy}/{attendee.Copies}]";
#endif
    }

#if BADGE_FORMAT
    static string FormatLabel(
        string name, string role, string message, int copy, int total) =>
        $"{name} | {role} | {message} [{copy}/{total}]";
#endif
}
#endif
```
Run the app again:

```output
Ada | Guest [1/2]
Ada | Guest [2/2]
Ben | Host [1/1]
```

`CreateLabels` is an *iterator*, a function that produces sequence elements one at a time. Its `System.Collections.Generic.IEnumerable`1` return type, written as `IEnumerable<string>`, represents a sequence of strings. Each `yield return` supplies one label to the inner `foreach` loop, which prints it before requesting the next label. See Iterators.

The `for` loop counts copies from 1 through `attendee.Copies`. One attendee produces as many strings as `Copies` requests. A collection would also work, but the caller only needs each label once. The iterator avoids a separate label collection and keeps the copy-number loop together. The outer and inner `foreach` loops separate attendee order from label production; the caller remains responsible for printing.

Calling `CreateLabels(attendee)` doesn't run its body. Like the LINQ query, the iterator uses deferred execution. The inner `foreach` starts that work, including the positive-copy check. A new enumeration runs the iterator again. Unlike `OrderBy`, which reads and sorts all attendees before its first result, this iterator supplies a label without creating the remaining labels.

To observe the iterator's order of execution, uncomment `#define BADGE_DIAGNOSTICS` again. Keep `BADGE_REPEAT` and `BADGE_SNAPSHOT` off. Diagnostics now show both the sort and the iterator:

```output
Before query definition.
After query definition.
Sort key: Ben
Sort key: Ada
Sequence created: Ada
Iterator started: Ada
Ada | Guest [1/2]
Ada | Guest [2/2]
Sequence created: Ben
Iterator started: Ben
Ben | Host [1/1]
```

For each attendee, the sequence-created message appears before the iterator-started message and the labels. Creating the sequence doesn't enter the iterator body; requesting its first element does. Comment out `BADGE_DIAGNOSTICS` again before you continue.

The same experiment controls remain available in the later stages. `BADGE_REPEAT` enumerates the attendees twice and creates each attendee's label sequence again. `BADGE_SNAPSHOT` caches only the sorted attendees, not label strings, so it prevents another sort but doesn't prevent the iterator from running again on each pass.

The `System.ArgumentOutOfRangeException.ThrowIfNegativeOrZero*` check reports invalid input instead of silently producing no labels. An *exception* reports a failure that interrupts normal execution; see Create and throw exceptions. Here, an invalid copy count stops the program instead of silently skipping that attendee.

## Calculate a message and name the formatting step

Each role needs a different message. Uncomment `#define BADGE_FORMAT`, and leave `BADGE_SORT` and `BADGE_COPIES` enabled. The same iterator now includes the message calculation:

```csharp
#if BADGE_FORMAT
    string message = attendee.Role switch
    {
        "Guest" => "Welcome!",
        "Host" => "Ask me for help",
        _ => throw new ArgumentException(
            $"Unsupported role: {attendee.Role}.", nameof(attendee))
    };
#endif
```
It also selects the `yield return FormatLabel(...)` branch and includes this local helper:

```csharp
#if BADGE_FORMAT
    static string FormatLabel(
        string name, string role, string message, int copy, int total) =>
        $"{name} | {role} | {message} [{copy}/{total}]";
#endif
```
Run the app again:

```output
Ada | Guest | Welcome! [1/2]
Ada | Guest | Welcome! [2/2]
Ben | Host | Ask me for help [1/1]
```

The `switch` expression calculates the message once per attendee, before the copy loop. An expression fits because each role selects one value to assign to `message`. An `if`/`else` chain or a `switch` statement would work, but would repeat the assignment in each branch.

*Pattern matching* tests an expression against a specified pattern. Here, `attendee.Role` is the input expression, and the constant patterns `"Guest"` and `"Host"` test its evaluated value to select the matching message. The discard pattern `_` matches any other role and throws an exception, so unsupported roles don't receive a misleading default message. See Pattern matching.

The `nameof` operator supplies the parameter name `attendee` to the exception. Unlike a hard-coded string, that name stays correct if you rename the parameter with a refactoring tool.

`FormatLabel` is a *local function*, a named function declared inside another function. Because only `CreateLabels` needs the formatting operation, its placement inside `CreateLabels` limits the helper to the operation that uses it. A private member method on a class would make the helper available to other members of that class. Choose that broader scope if several operations need the same formatting operation. See Local functions.

The name `FormatLabel` lets you follow the copy loop without reading the formatting details. Keeping the interpolated string directly in `yield return` would also work, as it did in the previous step. The name becomes more useful now that a label includes a role-specific message. The helper's `=>` expression body returns the one formatted string.

All formatting inputs arrive through parameters. A non-static local function could *capture*, or use, variables from its surrounding scope. The `static` modifier prevents that capture, so its dependencies stay explicit. See Parameters and captured state.

Because `CreateLabels` is still an iterator, the role check also runs only when enumeration starts. For this controlled input, those checks belong with label production. The program doesn't promise to validate all attendees before it prints any labels.

## Verify the total and run the complete program

To compare actual label production with the requested count, uncomment `#define BADGE_COUNT`. All four stage symbols are now enabled. Leave the three experiment symbols commented out for the normal final output.

The count setup runs before the attendee loop:

```csharp
#if BADGE_COUNT
    int expected = attendees.Sum(attendee => attendee.Copies);
    int printed = 0;
#endif
```
`Sum` uses eager execution to add the copy counts from the input array. Unlike `OrderBy`, it returns one number, not a sequence to enumerate later. Its lambda, `attendee => attendee.Copies`, selects the copy count inline. As with the name selection, a separate helper method wouldn't clarify this short expression. A loop with an accumulator would also work; `Sum` states directly that you want a total. See Common LINQ methods.

The `printed++` increment in the label loop increases the counter only when the loop receives a label. After that loop, the `if` statement compares that count with the requested total and throws an exception if they differ:

```csharp
#if BADGE_COUNT
    if (printed != expected)
    {
        throw new InvalidOperationException("Label count doesn't match the request.");
    }

    Console.WriteLine($"Printed {printed} of {expected} requested labels.");
#endif
```
You've reached the default configuration of the complete program you copied at the start. No methods or declarations needed to change:

```csharp
#define BADGE_SORT
#define BADGE_COPIES
#define BADGE_FORMAT
#define BADGE_COUNT
// #define BADGE_DIAGNOSTICS
// #define BADGE_REPEAT
// #define BADGE_SNAPSHOT
```
Run it with `dotnet run --file Program.cs`. The output is:

```output
Ada | Guest | Welcome! [1/2]
Ada | Guest | Welcome! [2/2]
Ben | Host | Ask me for help [1/1]
Printed 3 of 3 requested labels.
```

The input array is already in memory. `Sum` reads it immediately, `OrderBy` sorts it when the attendee loop begins, and `CreateLabels` produces strings as the inner loop advances. The program never builds a separate collection of labels. For broader query guidance, see LINQ and collections.

To revisit the diagnostics with the final program, enable `BADGE_DIAGNOSTICS` alone among the experiment symbols. The output is:

```output
Before query definition.
After query definition.
Sort key: Ben
Sort key: Ada
Sequence created: Ada
Iterator started: Ada
Ada | Guest | Welcome! [1/2]
Ada | Guest | Welcome! [2/2]
Sequence created: Ben
Iterator started: Ben
Ben | Host | Ask me for help [1/1]
Printed 3 of 3 requested labels.
```

If you also enable `BADGE_REPEAT`, each pass checks and reports its own count. With `BADGE_SNAPSHOT` enabled, the sort keys appear only once, but the iterator messages, labels, and count report still appear on each pass. Comment out the experiment symbols to restore the normal final output.

## Summary

Each technique serves a different part of the same task:

- **Lambdas and LINQ** select names and copy counts inline for the sort and total.
- **An iterator** expresses custom one-to-many production and leaves label consumption to the caller.
- **A `switch` expression** calculates a role-specific value and makes unsupported roles explicit.
- **A local function** names the formatting step, limits its scope, and states its inputs.

Choose these forms when their scope, dependencies, and order of execution fit the operation. A direct loop, a shared method, or a completed collection can fit other callers better.
