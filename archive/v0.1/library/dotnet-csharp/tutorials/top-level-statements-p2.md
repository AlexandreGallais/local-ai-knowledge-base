---
title: "Top-level statements tutorial (part 2 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/tutorials/top-level-statements.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Top-level statements tutorial (part 2 of 2)

## Refactoring for the future

Your program should look like the following code:

```csharp
Console.WriteLine();
foreach(var s in args)
{
    Console.Write(s);
    Console.Write(' ');
}
Console.WriteLine();

for (int i = 0; i < 20; i++)
{
    Console.Write("| -");
    await Task.Delay(50);
    Console.Write("\b\b\b");
    Console.Write("/ \\");
    await Task.Delay(50);
    Console.Write("\b\b\b");
    Console.Write("- |");
    await Task.Delay(50);
    Console.Write("\b\b\b");
    Console.Write("\\ /");
    await Task.Delay(50);
    Console.Write("\b\b\b");
}
Console.WriteLine();

string[] answers =
[
    "It is certain.",       "Reply hazy, try again.",     "Don't count on it.",
    "It is decidedly so.",  "Ask again later.",           "My reply is no.",
    "Without a doubt.",     "Better not tell you now.",   "My sources say no.",
    "Yes – definitely.",    "Cannot predict now.",        "Outlook not so good.",
    "You may rely on it.",  "Concentrate and ask again.", "Very doubtful.",
    "As I see it, yes.",
    "Most likely.",
    "Outlook good.",
    "Yes.",
    "Signs point to yes.",
];

var index = new Random().Next(answers.Length - 1);
Console.WriteLine(answers[index]);
```

The preceding code is reasonable. It works. But it isn't reusable. Now that you have the application working, it's time to pull out reusable parts.

One candidate is the code that displays the waiting animation. That snippet can become a method:

You can start by creating a local function in your file. Replace the current animation with the following code:

```csharp
await ShowConsoleAnimation();

static async Task ShowConsoleAnimation()
{
    for (int i = 0; i < 20; i++)
    {
        Console.Write("| -");
        await Task.Delay(50);
        Console.Write("\b\b\b");
        Console.Write("/ \\");
        await Task.Delay(50);
        Console.Write("\b\b\b");
        Console.Write("- |");
        await Task.Delay(50);
        Console.Write("\b\b\b");
        Console.Write("\\ /");
        await Task.Delay(50);
        Console.Write("\b\b\b");
    }
    Console.WriteLine();
}
```

The preceding code creates a local function inside your main method. That code still isn't reusable. So, extract that code into a class. Create a new file named *utilities.cs* and add the following code:

```csharp
﻿namespace FirstPass
{
    namespace MyNamespace
    {
        public static class Utilities
        {
            public static async Task ShowConsoleAnimation()
            {
                for (int i = 0; i < 20; i++)
                {
                    Console.Write("| -");
                    await Task.Delay(50);
                    Console.Write("\b\b\b");
                    Console.Write("/ \\");
                    await Task.Delay(50);
                    Console.Write("\b\b\b");
                    Console.Write("- |");
                    await Task.Delay(50);
                    Console.Write("\b\b\b");
                    Console.Write("\\ /");
                    await Task.Delay(50);
                    Console.Write("\b\b\b");
                }
                Console.WriteLine();
            }
        }
    }
}
```
A file that has top-level statements can also contain namespaces and types at the end of the file, after the top-level statements. But for this tutorial you put the animation method in a separate file to make it more readily reusable.

Finally, you can clean the animation code to remove some duplication, by using `foreach` loop to iterate through set of animations elements defined in `animations` array.
The full `ShowConsoleAnimation` method after refactor should look similar to the following code:

```csharp
﻿using System;
using System.Threading.Tasks;

namespace MyNamespace;

public static class Utilities
{
    public static async Task ShowConsoleAnimation()
    {
        string[] animations = ["| -", "/ \\", "- |", "\\ /"];
        for (int i = 0; i < 20; i++)
        {
            foreach (string s in animations)
            {
                Console.Write(s);
                await Task.Delay(50);
                Console.Write("\b\b\b");
            }
        }
        Console.WriteLine();
    }
}
```
Now you have a complete application, and you refactored the reusable parts for later use. You can call the new utility method from your top-level statements, as shown in the finished version of the main program:

```csharp
﻿using MyNamespace;

Console.WriteLine();
foreach(var s in args)
{
    Console.Write(s);
    Console.Write(' ');
}
Console.WriteLine();

await Utilities.ShowConsoleAnimation();

string[] answers =
[
    "It is certain.",       "Reply hazy, try again.",     "Don’t count on it.",
    "It is decidedly so.",  "Ask again later.",           "My reply is no.",
    "Without a doubt.",     "Better not tell you now.",   "My sources say no.",
    "Yes – definitely.",    "Cannot predict now.",        "Outlook not so good.",
    "You may rely on it.",  "Concentrate and ask again.", "Very doubtful.",
    "As I see it, yes.",
    "Most likely.",
    "Outlook good.",
    "Yes.",
    "Signs point to yes.",
];

var index = new Random().Next(answers.Length - 1);
Console.WriteLine(answers[index]);
```
The preceding example adds the call to `Utilities.ShowConsoleAnimation`, and adds another `using` directive.

## Summary

Top-level statements make it easier to create simple programs for use to explore new algorithms. You can experiment with algorithms by trying different snippets of code. Once you learned what works, you can refactor the code to be more maintainable.

Top-level statements simplify programs that are based on console apps. These apps include Azure functions, GitHub actions, and other small utilities. For more information, see Top-level statements (C# Programming Guide).
