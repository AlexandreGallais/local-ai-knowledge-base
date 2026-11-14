---
title: "The using directive: Import types from a namespace (part 2 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/using-directive.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# The using directive: Import types from a namespace (part 2 of 2)

## Qualified alias member

The namespace alias qualifier, `::` provides explicit access to the global namespace or other using aliases that other entities might hide.

The `global::` ensures that the namespace lookup for the namespace following the `::` token is relative to the global namespace. Otherwise, the token must resolve to a using alias, and the token <example-value> the `::` must resolve to a type in that aliased namespace. The following example shows both forms:

```csharp
using S = System.Net.Sockets;

class A
{
    public static int x;
}

class C
{
    public void F(int A, object S)
    {
        // Use global::A.x instead of A.x
        global::A.x += A;

        // Using ::, S must resolve to a namespace alias:
        S::Socket s = S as S::Socket;

        // In this form, if S were a class, it would be a compile-time error:
        S.Socket s1 = S as S.Socket;
    }
}
```
## C# language specification

For more information, see Using directives in the C# Language Specification. The language specification is the definitive source for C# syntax and usage.

For more information on the *global using* modifier, see Global using directives.

## See also

- C# keywords
- Organize types with namespaces
- Style rule IDE0005 - Remove unnecessary 'using' directives
- Style rule IDE0065 - 'using' directive placement
- `using` statement
