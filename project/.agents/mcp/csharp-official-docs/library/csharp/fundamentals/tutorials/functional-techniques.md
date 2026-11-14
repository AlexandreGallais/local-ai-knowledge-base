---
title: "Tutorial: Combine C# techniques to generate badge labels (part 1 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/fundamentals/tutorials/functional-techniques.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Tutorial: Combine C# techniques to generate badge labels

A meetup needs badge labels in name order. Each attendee requests one or more copies, and each label includes a message for the attendee's role. In this tutorial, you combine small C# techniques to produce the labels without a separate collection of formatted strings.

This tutorial is for developers who know basic C# methods, loops, and collections. You choose where short operations belong, make helper dependencies explicit, and decide when the program produces results. For the reasoning behind these choices, see Building software.

## Prerequisites

- The .NET 10 SDK.
- A text editor and a terminal.

## Start with one label per attendee

1. Create a folder named `BadgeLabels` and a file named `Program.cs` inside it.
1. Copy the complete source in the following section into `Program.cs`. Use this same file for every step and experiment:

```csharp
#define BADGE_SORT
#define BADGE_COPIES
#define BADGE_FORMAT
#define BADGE_COUNT
// #define BADGE_DIAGNOSTICS
// #define BADGE_REPEAT
// #define BADGE_SNAPSHOT

Attendee[] attendees =
[
    new("Ben", "Host", 1),
    new("Ada", "Guest", 2)
];

#if BADGE_SORT
#if BADGE_DIAGNOSTICS
Console.WriteLine("Before query definition.");
#endif
var orderedAttendees = attendees.OrderBy(
#if BADGE_DIAGNOSTICS
    attendee =>
    {
        Console.WriteLine($"Sort key: {attendee.Name}");
        return attendee.Name;
    }, StringComparer.Ordinal);
#else
    attendee => attendee.Name, StringComparer.Ordinal);
#endif
#if BADGE_DIAGNOSTICS
Console.WriteLine("After query definition.");
#endif
#else
var orderedAttendees = attendees;
#endif

#if BADGE_SNAPSHOT
var attendeesToPrint = orderedAttendees.ToList();
#else
var attendeesToPrint = orderedAttendees;
#endif

int passes = 1;
#if BADGE_REPEAT
passes = 2;
#endif

for (int pass = 0; pass < passes; pass++)
{
#if BADGE_COUNT
    int expected = attendees.Sum(attendee => attendee.Copies);
    int printed = 0;
#endif

    foreach (Attendee attendee in attendeesToPrint)
    {
#if BADGE_COPIES
        var labels = CreateLabels(attendee);
#if BADGE_DIAGNOSTICS
        Console.WriteLine($"Sequence created: {attendee.Name}");
#endif
        foreach (string label in labels)
        {
            Console.WriteLine(label);
#if BADGE_COUNT
            printed++;
#endif
        }
#else
        Console.WriteLine($"{attendee.Name} | {attendee.Role}");
#endif
    }

#if BADGE_COUNT
    if (printed != expected)
    {
        throw new InvalidOperationException("Label count doesn't match the request.");
    }

    Console.WriteLine($"Printed {printed} of {expected} requested labels.");
#endif
}

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

record Attendee(string Name, string Role, int Copies);
```
1. At the top of the file, comment out the four active `#define` lines. Leave the three experiment lines commented out, too.
1. From that folder, run the file-based app:

   ```dotnetcli
   dotnet run --file Program.cs
   ```

The program writes:

```output
Ben | Host
Ada | Guest
```

The file contains every stage. From now on, change only the `#define` lines at the top, not method bodies or declarations. A `#if` directive includes code only when its symbol is defined; an `#else` branch supplies the alternative. See Conditional compilation.

Uncomment one additional stage line at each step, and keep the previous stage lines enabled:

| Stage | Active stage symbols |
| --- | --- |
| One label per attendee | None |
| Sort attendees | `BADGE_SORT` |
| Produce copies | `BADGE_SORT`, `BADGE_COPIES` |
| Format messages | `BADGE_SORT`, `BADGE_COPIES`, `BADGE_FORMAT` |
| Verify the count | `BADGE_SORT`, `BADGE_COPIES`, `BADGE_FORMAT`, `BADGE_COUNT` |

The downloaded source enables all four stage symbols, so it runs the final program by default. The other three symbols control optional experiments and stay off during the normal progression. These symbols use a `BADGE_` prefix to avoid SDK-defined symbols such as `TRACE`.

The following excerpts highlight code already in your file. Don't copy them over the complete program.

```csharp
Attendee[] attendees =
[
    new("Ben", "Host", 1),
    new("Ada", "Guest", 2)
];
```
The `Attendee` declaration defines a *record*, a type that groups related data and supplies value-based equality. Each attendee has a `Name`, a `Role`, and a requested number of `Copies`. A record fits this small data model because the program passes attendee data between operations without changing it. For more about this type, see Records.

The fixed input uses an array and a collection expression. In each `new(...)` call, C# infers `Attendee` from the array element type; see Target-typed `new`. Top-level statements let you run the example without writing a `Main` method.

The `foreach` loop reads each attendee, and an interpolated string inserts their values into the output. The loop currently ignores `Copies`.

Keep this small input as you develop the program: Ben requests one copy, and Ada requests two. Only `Guest` and `Host` are supported roles, and copy counts must be positive.

## Sort with a lambda

To put attendees in name order, uncomment `#define BADGE_SORT`. Leave the other symbols commented out. The sort branch defines this query:

```csharp
var orderedAttendees = attendees.OrderBy(
#if BADGE_DIAGNOSTICS
    attendee =>
    {
        Console.WriteLine($"Sort key: {attendee.Name}");
        return attendee.Name;
    }, StringComparer.Ordinal);
#else
    attendee => attendee.Name, StringComparer.Ordinal);
#endif
```
With diagnostics off, the `#else` branch supplies the short lambda. The loop prints the sorted attendees:

```csharp
    foreach (Attendee attendee in attendeesToPrint)
    {
#if BADGE_COPIES
        var labels = CreateLabels(attendee);
#if BADGE_DIAGNOSTICS
        Console.WriteLine($"Sequence created: {attendee.Name}");
#endif
        foreach (string label in labels)
        {
            Console.WriteLine(label);
#if BADGE_COUNT
            printed++;
#endif
        }
#else
        Console.WriteLine($"{attendee.Name} | {attendee.Role}");
#endif
    }
```
Run the same command. The output now puts Ada first:

```output
Ada | Guest
Ben | Host
```

`attendee => attendee.Name` is a *lambda expression*, an unnamed function supplied where code needs behavior. Here, the lambda selects the name to sort by. The lambda stays *inline*, directly in the `OrderBy` call, because it's short and its purpose is clear there. You could extract the selection into a named helper method, but a method name wouldn't explain this one-property selection better. See Lambda expressions.

`OrderBy` is part of *Language Integrated Query (LINQ)*, a set of C# features and .NET APIs for queries over data. See LINQ queries.

This example uses *method syntax*, which calls LINQ methods directly. In contrast, *query syntax* uses C# clauses such as `from`, `orderby`, and `select`:

```csharp
var orderedAttendees =
    from attendee in attendees
    orderby attendee.Name
    select attendee;
```

The compiler translates query syntax into method calls. Query syntax can make a query with several clauses easier to read; method syntax keeps this single sort short and lets you pass a comparer to `OrderBy`. The query-syntax example uses the default string comparer, so it doesn't guarantee the same order across cultures. Keep the method-syntax version for this program. See LINQ method and query syntax.

To keep the output independent of the machine's culture, the sample uses `System.StringComparer.Ordinal` for name comparisons. For the short names here, that order is alphabetical. See Sort data with LINQ.

The `var` declaration lets the compiler infer the query variable's type. The `orderedAttendees` variable describes a query, not a completed sorted collection. To *enumerate* a sequence means to read its elements one at a time. `OrderBy` reads and sorts all the attendees when `foreach` first requests an element.

## Observe the order of execution

*Deferred execution* means work starts when code enumerates a sequence rather than when code defines the query. See Run a query. Use diagnostic output to see the difference:

1. Keep only `BADGE_SORT` enabled among the stage symbols.
1. Uncomment `#define BADGE_DIAGNOSTICS` at the top of the same file. The diagnostic branches surround the query definition with messages and use a lambda that prints each sort key:

```csharp
#if BADGE_SORT
#if BADGE_DIAGNOSTICS
Console.WriteLine("Before query definition.");
#endif
var orderedAttendees = attendees.OrderBy(
#if BADGE_DIAGNOSTICS
    attendee =>
    {
        Console.WriteLine($"Sort key: {attendee.Name}");
        return attendee.Name;
    }, StringComparer.Ordinal);
#else
    attendee => attendee.Name, StringComparer.Ordinal);
#endif
#if BADGE_DIAGNOSTICS
Console.WriteLine("After query definition.");
#endif
#else
var orderedAttendees = attendees;
#endif
```
1. Run `dotnet run --file Program.cs` again. Before you read the output, predict whether `Sort key:` appears before or after `After query definition.`.

The output is:

```output
Before query definition.
After query definition.
Sort key: Ben
Sort key: Ada
Ada | Guest
Ben | Host
```

No sort keys appear between the two query-definition messages. The lambda runs only when `foreach` requests the first result. Both key <example-value> appear before the first label because `OrderBy` needs every key <example-value> it can determine which attendee comes first. The keys follow the input order, Ben then Ada; the results follow the sorted order, Ada then Ben.

The diagnostic lambda needs both a message and a returned key, so it uses a block statement body with braces and `return`, instead of the original single-expression body.

With diagnostics on, try the two experiment switches in the same file. No changes to the loops or query are needed:

1. Uncomment `#define BADGE_REPEAT` and run again:

   ```output
   Before query definition.
   After query definition.
   Sort key: Ben
   Sort key: Ada
   Ada | Guest
   Ben | Host
   Sort key: Ben
   Sort key: Ada
   Ada | Guest
   Ben | Host
   ```

   The second pass <example-value> the sort. The query variable doesn't cache results.

1. Keep `BADGE_REPEAT` enabled, uncomment `#define BADGE_SNAPSHOT`, and run again:

   ```output
   Before query definition.
   After query definition.
   Sort key: Ben
   Sort key: Ada
   Ada | Guest
   Ben | Host
   Ada | Guest
   Ben | Host
   ```

   The two key <example-value> now appear only once, during `ToList`, before either pass <example-value> labels. Both passes read the stored attendees.

These switches select the sequence to enumerate and the number of passes:

```csharp
#if BADGE_SNAPSHOT
var attendeesToPrint = orderedAttendees.ToList();
#else
var attendeesToPrint = orderedAttendees;
#endif

int passes = 1;
#if BADGE_REPEAT
passes = 2;
#endif
```
*Eager execution* means an operation runs immediately instead of waiting for later enumeration. `System.Linq.Enumerable.ToList*` executes the query immediately and stores its results in a list. Both passes now read the stored attendees without running the sort again. In contrast, defining the `OrderBy` query still defers the sort: it reads and buffers all input only when enumeration begins. Buffering doesn't mean the query executes when you define it. Use a snapshot when you need to reuse results without recalculating them; keep the deferred query when you want each enumeration to read the current input. See Compose queries with cached results.

Before you continue, comment out `BADGE_DIAGNOSTICS`, `BADGE_REPEAT`, and `BADGE_SNAPSHOT` again. Keep `BADGE_SORT` enabled. Run the app to confirm that only the two sorted labels appear.
