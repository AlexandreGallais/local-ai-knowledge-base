---
title: "extern modifier (part 1 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/keywords/extern.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# extern (C# Reference)

Use the `extern` modifier to declare a method that's implemented externally. A common use of the `extern` modifier is with the `DllImport` attribute when you use Interop services to call into unmanaged code. In this case, you must also declare the method as `static`, as shown in the following example:

```csharp
[DllImport("avifil32.dll")]
private static extern void AVIFileInit();
```

You can also use the `extern` keyword to define an external assembly alias. By using this alias, you can reference different versions of the same component from within a single assembly. For more information, see extern alias.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

It's an error to use the abstract and `extern` modifiers together to modify the same member. Using the `extern` modifier means that the method is implemented outside the C# code, whereas using the `abstract` modifier means that the method implementation isn't provided in the class.

The `extern` keyword has more limited uses in C# than in C++. To compare the C# keyword with the C++ keyword, see Using extern to Specify Linkage in the C++ Language Reference.

In this example, the program receives a string from the user and displays it inside a message box. The program uses the `MessageBox` method imported from the User32.dll library.
