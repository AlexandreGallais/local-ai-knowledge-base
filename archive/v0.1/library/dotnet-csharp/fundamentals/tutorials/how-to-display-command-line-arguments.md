---
title: "How to display command-line arguments"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/tutorials/how-to-display-command-line-arguments.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to display command-line arguments

Arguments provided to an executable on the command line are accessible in top-level statements or through an optional parameter to `Main`. The arguments are provided in the form of an array of strings. Each element of the array contains one argument. White-space between arguments is removed. For example, consider these command-line invocations of a fictitious executable:

|Input on command line|Array of strings passed to Main|
|----------------------------|-------------------------------------|
|**executable.exe a b c**|"a" "b" "c"|
|**executable.exe one two**|"one" "two"|
|**executable.exe "one two" three**|"one two" "three"|

> **Note:**
> When you are running an application in Visual Studio, you can specify command-line arguments in the Debug Page, Project Designer.

## Example

 This example displays the command-line arguments passed to a command-line application. The output shown is for the first entry in the table above.

```csharp
﻿// The Length property provides the number of array elements.
Console.WriteLine($"parameter count = {args.Length}");

for (int i = 0; i < args.Length; i++)
{
    Console.WriteLine($"Arg[{i}] = [{args[i]}]");
}

/* Output (assumes 3 cmd line args):
    parameter count = 3
    Arg[0] = [a]
    Arg[1] = [b]
    Arg[2] = [c]
*/
```
## See also

* System.CommandLine overview
* Tutorial: Get started with System.CommandLine
