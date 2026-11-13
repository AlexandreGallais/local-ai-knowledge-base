---
title: "Namespace alias operator - the `::` is used to access a member of an aliased namespace."
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/operators/namespace-alias-qualifier.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# :: operator - the namespace alias operator

Use the namespace alias qualifier `::` to access a member of an aliased namespace. You can use the `::` qualifier only between two identifiers. The left-hand identifier can be one of a namespace alias, an extern alias, or the `global` alias.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

For example:

- A namespace alias created with a using alias directive:

  ```csharp
  using forwinforms = System.Drawing;
  using forwpf = System.Windows;
  
  public class Converters
  {
      public static forwpf::Point Convert(forwinforms::Point point) => new forwpf::Point(point.X, point.Y);
  }
  ```

- An extern alias.
- The `global` alias, which is the global namespace alias. The global namespace is the namespace that contains namespaces and types that aren't declared inside a named namespace. When used with the `::` qualifier, the `global` alias always references the global namespace, even if there's the user-defined `global` namespace alias.

  The following example uses the `global` alias to access the .NET `System` namespace, which is a member of the global namespace. Without the `global` alias, the user-defined `System` namespace, which is a member of the `MyCompany.MyProduct` namespace, would be accessed:

  ```csharp
  namespace MyCompany.MyProduct.System
  {
      class Program
      {
          static void Main() => global::System.Console.WriteLine("Using global alias");
      }

      class Console
      {
          string Suggestion => "Consider renaming this class";
      }
  }
  ```

  > **Note:**
  > The `global` keyword is the global namespace alias only when it's the left-hand identifier of the `::` qualifier.

You can also use the `.` token to access a member of an aliased namespace. However, the `.` token is also used to access a type member. The `::` qualifier ensures that its left-hand identifier always references a namespace alias, even if there exists a type or namespace with the same name.

## C# language specification

For more information, see the Namespace alias qualifiers section of the C# language specification.

## See also

- C# operators and expressions
