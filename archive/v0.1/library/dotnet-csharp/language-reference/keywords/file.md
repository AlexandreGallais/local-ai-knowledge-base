---
title: "The file keyword"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/keywords/file.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# The file modifier

The `file` modifier restricts a top-level type's visibility to the file containing its declaration. Source generators most often apply the `file` modifier to types they generate. File-local types provide source generators with a convenient way to avoid name collisions among generated types.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

The `file` modifier declares a file-local type, as in this example:

```csharp
file class HiddenWidget
{
    // implementation
}
```

Any types nested within a file-local type are also only visible within the file containing its declaration. Other types in an assembly can use the same name as a file-local type. Because the file-local type is visible only in the file containing its declaration, these types don't create a naming collision.

A file-local type can't be the return type or parameter type of any member declared in a non-file-local type. A file-local type can't be a field member of a non-file-local type. However, a more visible type can implicitly implement a file-local interface type. The type can also explicitly implement a file-local interface but explicit implementations can only be used within the same file.

The following example shows a public type that uses a file-local type to provide a worker method. In addition, the public type implements a file-local interface implicitly:

```csharp
// In File1.cs:
file interface IWidget
{
    int ProvideAnswer();
}

file class HiddenWidget
{
    public int Work() => 42;
}

public class Widget : IWidget
{
    public int ProvideAnswer()
    {
        var worker = new HiddenWidget();
        return worker.Work();
    }
}
```
In another source file, you can declare types that have the same names as the file-local types. The file-local types aren't visible:

```csharp
// In File2.cs:
// Doesn't conflict with HiddenWidget
// declared in File1.cs
public class HiddenWidget
{
    public void RunTask()
    {
        // omitted
    }
}
```
Member lookup prefers a file-local type declared in the same file over a non-file-local type declared in a different file. This rule ensures that a source generator can rely on member lookup resolving to a file-local type without ambiguity with other type declarations. In the preceding example, all uses of `HiddenWidget` in *File1.cs* resolve to the file-local type declared in *File1.cs*. The file-local declaration of `HiddenWidget` hides the public declaration in *File2.cs*.

## C# language specification

For more information, see Declared accessibility in the C# Language Specification.

## See also

- C# Keywords
- Access Modifiers
- Accessibility Levels
- Modifiers
- public
- protected
- internal
