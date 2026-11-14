---
title: "using keyword"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/using.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
