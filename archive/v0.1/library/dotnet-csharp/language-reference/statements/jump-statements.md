---
title: "Jump statements - break, continue, return, and goto (part 1 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/statements/jump-statements.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Jump statements - `break`, `continue`, `return`, and `goto`

The jump statements unconditionally transfer control. The `break` statement terminates the closest enclosing iteration statement or `switch` statement, or an enclosing labeled iteration or `switch` statement. The `continue` statement starts a new iteration of the closest enclosing iteration statement, or an enclosing labeled iteration statement. The `return` statement terminates execution of the function in which it appears and returns control to the caller. The `goto` statement transfers control to a statement that is marked by a label.

For information about the `throw` statement that throws an exception and unconditionally transfers control as well, see The `throw` statement section of the Exception-handling statements article.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

## The `break` statement

The `break` statement terminates the closest enclosing iteration statement (that is, `for`, `foreach`, `while`, or `do` loop) or `switch` statement. The `break` statement transfers control to the statement that follows the terminated statement, if any.

```csharp
int[] numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
foreach (int number in numbers)
{
    if (number == 3)
    {
        break;
    }

    Console.Write($"{number} ");
}
Console.WriteLine();
Console.WriteLine("End of the example.");
// Output:
// 0 1 2 
// End of the example.
```
In nested loops, the `break` statement terminates only the innermost loop that contains it, as the following example shows:

```csharp
for (int outer = 0; outer < 5; outer++)
{
    for (int inner = 0; inner < 5; inner++)
    {
        if (inner > outer)
        {
            break;
        }

        Console.Write($"{inner} ");
    }
    Console.WriteLine();
}
// Output:
// 0
// 0 1
// 0 1 2
// 0 1 2 3
// 0 1 2 3 4
```
Starting in C# 15, a `break` statement can optionally specify a label that identifies an enclosing loop or `switch` statement to exit. Place the label directly on the target construct, as in `outer: for (...)`, then use `break outer;` from within a nested construct to transfer control to the statement that follows the labeled construct, as the following example shows:

```csharp
string[,] stockChecks =
{
    { "Clear", "Clear", "Clear" },
    { "Clear", "Blocked", "Clear" },
    { "Clear", "Clear", "Clear" }
};

outer: for (int aisle = 0; aisle < stockChecks.GetLength(0); aisle++)
{
    for (int bay = 0; bay < stockChecks.GetLength(1); bay++)
    {
        Console.WriteLine($"Checking aisle {aisle}, bay {bay}.");

        if (stockChecks[aisle, bay] == "Blocked")
        {
            Console.WriteLine("Blocked bay found. Stop the inspection.");
            break outer;
        }
    }
}
// Output:
// Checking aisle 0, bay 0.
// Checking aisle 0, bay 1.
// Checking aisle 0, bay 2.
// Checking aisle 1, bay 0.
// Checking aisle 1, bay 1.
// Blocked bay found. Stop the inspection.
```
When you use the `switch` statement inside a loop, a `break` statement at the end of a switch section transfers control only out of the `switch` statement. The loop that contains the `switch` statement is unaffected, as the following example shows:

```csharp
double[] measurements = [-4, 5, 30, double.NaN];
foreach (double measurement in measurements)
{
    switch (measurement)
    {
        case < 0.0:
            Console.WriteLine($"Measured value is {measurement}; too low.");
            break;

        case > 15.0:
            Console.WriteLine($"Measured value is {measurement}; too high.");
            break;

        case double.NaN:
            Console.WriteLine("Failed measurement.");
            break;

        default:
            Console.WriteLine($"Measured value is {measurement}.");
            break;
    }
}
// Output:
// Measured value is -4; too low.
// Measured value is 5.
// Measured value is 30; too high.
// Failed measurement.
```
## The `continue` statement

The `continue` statement starts a new iteration of the closest enclosing iteration statement (that is, `for`, `foreach`, `while`, or `do` loop), as the following example shows:

```csharp
for (int i = 0; i < 5; i++)
{
    Console.Write($"Iteration {i}: ");
    
    if (i < 3)
    {
        Console.WriteLine("skip");
        continue;
    }
    
    Console.WriteLine("done");
}
// Output:
// Iteration 0: skip
// Iteration 1: skip
// Iteration 2: skip
// Iteration 3: done
// Iteration 4: done
```
Starting in C# 15, a `continue` statement can optionally specify a label that identifies an enclosing iteration statement to continue. The target must be a loop; `continue` doesn't target a `switch` statement. Place the label directly on the target loop, as in `outer: for (...)`, then use `continue outer;` from within a nested construct to start the next iteration of that loop, as the following example shows:

```csharp
string[][] dailyRoutes =
[
    ["North", "West"],
    ["South", "Bridge closed", "East"],
    ["Central", "Harbor"]
];

outer: for (int day = 0; day < dailyRoutes.Length; day++)
{
    Console.WriteLine($"Day {day + 1}:");

    foreach (string route in dailyRoutes[day])
    {
        if (route == "Bridge closed")
        {
            Console.WriteLine("  Bridge closed; move to the next day.");
            continue outer;
        }

        Console.WriteLine($"  Schedule the {route} route.");
    }

    Console.WriteLine("  All routes scheduled.");
}
// Output:
// Day 1:
//   Schedule the North route.
//   Schedule the West route.
//   All routes scheduled.
// Day 2:
//   Schedule the South route.
//   Bridge closed; move to the next day.
// Day 3:
//   Schedule the Central route.
//   Schedule the Harbor route.
//   All routes scheduled.
```
For both labeled `break` and labeled `continue`, only the statement immediately nested in a labeled statement has that label. For example, in `a: b: while (...)`, the `while` statement is labeled `b`, not `a`.

Labeled jump statements often replace a Boolean flag that propagates a break or continue outward through nested loops, or a `goto` that jumps past the loops. The IDE0410 style rule detects those patterns and offers a labeled `break` or `continue` as a clearer replacement.
