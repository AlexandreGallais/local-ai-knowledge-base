---
title: "using keyword"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/keywords/using.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# using (C# reference)

The `using` keyword has two major uses:

- The `using` statement defines a scope at the end of which an object is disposed:
```csharp
string filePath = "example.txt";
string textToWrite = "Hello, this is a test message!";

// Use the using statement to ensure the StreamWriter is properly disposed of
using (StreamWriter writer = new StreamWriter(filePath))
{
    writer.WriteLine(textToWrite);
}
```
- The `using` directive creates an alias for a namespace or imports types defined in other namespaces:
```csharp
using System;
using System.IO;
```
## See also

- C# keywords
