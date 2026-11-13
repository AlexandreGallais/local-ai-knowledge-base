---
title: "Local functions"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/building-software/local-functions.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Local functions

Choose a local function when you want to give helper logic a descriptive name and only one member needs that helper. Compared with a method on the containing type, a local function tells readers that the helper belongs to this operation. Its name lets readers follow the main flow before they inspect the details.

> **Tip:**
> This article teaches practical use of local functions for developers who know how to write methods. For declaration details and diagnostic rules, see Local function declarations.

A *local function* is a named function declared inside another member, such as a method or constructor. Its name is in scope only within that member.

The following shape declares and calls a local function:

```csharp
string CreateMessage(string name)
{
    return AddGreeting(name);

    string AddGreeting(string value) => $"Hello, {value}!";
}
```

`AddGreeting` stays inside `CreateMessage`. Other members of the type can't call it.

## Keep helper logic near its caller

Local functions let the main flow state what happens while helper functions explain individual steps. The following example creates a reading plan. It uses a local function to add one week's assignment at a time.

```csharp
IReadOnlyList<ReadingWeek> plan =
    CreateReadingPlan("The Long Way Home", chapterCount: 10, chaptersPerWeek: 3);

foreach (ReadingWeek week in plan)
{
    Console.WriteLine(
        $"Week {week.Number}: {week.BookTitle}, chapters {week.FirstChapter}-{week.LastChapter}");
}

static IReadOnlyList<ReadingWeek> CreateReadingPlan(
    string bookTitle,
    int chapterCount,
    int chaptersPerWeek)
{
    var plan = new List<ReadingWeek>();
    AddWeek(firstChapter: 1);
    return plan;

    void AddWeek(int firstChapter)
    {
        if (firstChapter > chapterCount)
        {
            return;
        }

        int lastChapter = Math.Min(
            firstChapter + chaptersPerWeek - 1,
            chapterCount);

        plan.Add(new ReadingWeek(
            plan.Count + 1,
            bookTitle,
            firstChapter,
            lastChapter));

        AddWeek(lastChapter + 1);
    }
}
```
A `ReadingWeek` records a week number and the range of chapters assigned for that week. `AddWeek` belongs only to `CreateReadingPlan`, so its local scope communicates that relationship.

You can declare a local function before or after the statements that call it. Place it where readers can follow the main flow without losing context.

## Use parameters or capture local state

A non-static local function can use parameters and local variables from its containing member. This use is called *capture*. In the reading-plan example, `AddWeek` captures:

- `bookTitle`, `chapterCount`, and `chaptersPerWeek` from the `CreateReadingPlan` parameters.
- `plan` from a local variable.

Capture is useful when the helper naturally belongs to the surrounding operation. Keep the captured values few and obvious. If the helper can receive all its data through parameters, consider a `static` local function:

```csharp
static int LastChapter(int firstChapter, int chaptersPerWeek, int chapterCount) =>
    Math.Min(firstChapter + chaptersPerWeek - 1, chapterCount);
```

A static local function can't capture local variables, parameters, or instance state from the containing member. Its parameters make the supplied data explicit, while capture lets a helper use the context of its containing operation.

## Use recursion when the problem repeats itself

*Recursion* occurs when a function calls itself with a smaller part of the problem. `AddWeek` in the example adds one week, then calls itself with the first chapter for the next week.

Every recursive function needs a condition that stops the calls. `AddWeek` stops when `firstChapter` exceeds `chapterCount`:

```csharp
if (firstChapter > chapterCount)
{
    return;
}
```

Local functions work well for recursion because their names are in scope throughout the containing member. Prefer a loop when it expresses the repeated work more directly. Choose recursion when the recursive structure makes the algorithm easier to understand.

## Choose a local function or lambda expression

Local functions and lambda expressions can both use surrounding variables, but they communicate different intent:

| Choose | When |
| --- | --- |
| Local function | The helper benefits from a name, has several statements, needs recursion, or is called from more than one place in the containing member. |
| Lambda expression | You pass short behavior directly to another method or store it in a delegate variable. |

The following code uses both forms:

```csharp
static IEnumerable<string> DescribeShortWeeks(
    IEnumerable<ReadingWeek> plan,
    int maximumChapters)
{
    return plan
        .Where(IsShortWeek)
        .Select(week => $"Week {week.Number}: {week.FirstChapter}-{week.LastChapter}");

    bool IsShortWeek(ReadingWeek week) =>
        week.LastChapter - week.FirstChapter + 1 <= maximumChapters;
}

Console.WriteLine("Short weeks:");
foreach (string description in DescribeShortWeeks(plan, maximumChapters: 2))
{
    Console.WriteLine(description);
}
```
`IsShortWeek` gives the rule passed to `Where` a descriptive name. The lambda passed to `Select` performs one short transformation at its point of use. Both forms supply behavior to another method here. A local function can also be a helper you call directly, as `AddWeek` is in the reading-plan example.

Use a regular method instead of a local function when several members need the helper. Use a lambda instead when the behavior is short and its purpose is clear from the receiving method.

Local functions can also be iterator functions that contain `yield return`. For that use, see Iterators.

## See also

- Building software
- Lambda expressions
- Methods
- Local function compiler diagnostics
- Use local function instead of lambda (style rule IDE0039)
