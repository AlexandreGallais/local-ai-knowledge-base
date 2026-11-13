---
id: reading-code-cpp-for-csharp-readers
title: C++ for C# readers
topic: reading-code
summary: RAII, smart pointers, move, templates and overloads in C++, each marked same meaning, false friend or no equivalent.
tool: cpp
version: "C++23"
checked: 2026-11-13
sources: [S1, S2, S3, S4, S5, S6, S7, S8]
license: MIT (own words and own examples; facts summarized from the sources)
variant: files
---

# C++ for C# readers

Contents: 1. Lifetime and ownership · 2. Templates and overloads · 3. Modern syntax · 4. Pitfalls · Sources

Kind: "same meaning" reads as in C#; "false friend" looks like C# but means something else; "no equivalent" has no C# counterpart. Read the false friends first. C++23 is the published standard (ISO/IEC 14882:2024). [S8]

## 1. Lifetime and ownership (C++)

| You read | Meaning | C# equivalent | Kind |
| --- | --- | --- | --- |
| A local object whose destructor `~T()` frees a resource | RAII: the resource is released when the scope ends, even on an exception [S1] [S2] | `using` and `Dispose`, but automatic | no equivalent |
| `std::unique_ptr<T>` | One owner only; it moves, it never copies [S2] | None; the garbage collector has no such role | no equivalent |
| `std::shared_ptr<T>` | Reference counting; the object dies with its last owner, at once [S2] | A plain C# reference, but destruction is immediate | false friend |
| `std::weak_ptr<T>` | Observes without owning; breaks cycles [S2] | `WeakReference<T>` | same meaning |
| `p.get()` | A raw pointer lent to an old API; ownership does not change [S2] | — | no equivalent |
| `T&&` in a signature | Rvalue reference: marks a move constructor or move assignment [S3] | None | no equivalent |
| `std::move(x)` | A cast: it moves nothing; the move happens in the constructor called; `x` stays valid but emptied [S3] | None | false friend |

## 2. Templates and overloads (C++)

| You read | Meaning | C# equivalent | Kind |
| --- | --- | --- | --- |
| `template<typename T>` | Code checked at each instantiation, for each type [S4] | `class Foo<T>`: substitution at run time, operations limited by constraints [S4] | false friend |
| `template<int N>`; `template<> struct X<int>` | A value parameter; a specialization: another implementation for one type [S4] | None [S4] | no equivalent |
| Two functions with the same name | Overload chosen by rank: exact match, promotion, standard conversion, user conversion, ellipsis; ambiguity is an error [S5] | C# overloads, other rules | false friend |
| A same-named function in a derived class | It hides every overload of the base class, unless it overrides a virtual function [S5] | — | false friend |

The function a C++ call reaches depends on declarations: name it only when they are visible in the excerpt.

## 3. Modern syntax (C++)

| You read | Meaning | C# equivalent | Kind |
| --- | --- | --- | --- |
| `auto x = …;`; `for (auto& e : v)` | Deduced type; range loop [S1] | `var`; `foreach` | same meaning |
| `[…](int x) { … }` | Lambda; the brackets list what is captured [S1] [S6] | C# lambda, implicit capture | same meaning |
| `constexpr` | Constant computed at compile time [S1] | `const` | same meaning |
| `std::string_view`, `std::span` | A view without copy or ownership [S1] [S6] | `ReadOnlySpan<char>`, `Span<T>` | same meaning |
| `std::variant`, `std::optional`, `std::expected` | Safe union; value or nothing; value or error (C++23) [S1] [S6] | No native union; `T?` | no equivalent |
| `import` (C++20) | Module: in time it replaces headers [S7] | `using` | same meaning |

To date an excerpt by its syntax, see `docs/reading-code/cpp-version-markers.md`.

## 4. Pitfalls (reading C++)

- A missing destructor call does not exist: the end of scope runs it. Say where each resource is released.
- After `std::move(x)`, do not describe `x` as unchanged nor as destroyed: it is valid and emptied.
- Overloads and templates: when the declarations are not in the excerpt, write "depends on declarations not visible in this excerpt".
- The C++ Core Guidelines cannot be copied into a public base: describe in own words.

## Sources

- [S1] Microsoft, "Welcome back to C++, Modern C++", 2026, <https://learn.microsoft.com/en-us/cpp/cpp/welcome-back-to-cpp-modern-cpp>, read 2026-11-12, CC BY 4.0, summarized.
- [S2] Microsoft, "Smart pointers (Modern C++)", 2026, <https://learn.microsoft.com/en-us/cpp/cpp/smart-pointers-modern-cpp>, read 2026-11-12, CC BY 4.0, summarized.
- [S3] Microsoft, "Move Constructors and Move Assignment Operators (C++)", <https://learn.microsoft.com/en-us/cpp/cpp/move-constructors-and-move-assignment-operators-cpp>, read 2026-11-12, CC BY 4.0, summarized.
- [S4] Microsoft, "Differences Between C++ Templates and C# Generics", <https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/generics/differences-between-cpp-templates-and-csharp-generics>, read 2026-11-12, CC BY 4.0, summarized.
- [S5] Microsoft, "Function overloading", <https://learn.microsoft.com/en-us/cpp/cpp/function-overloading>, read 2026-11-12, CC BY 4.0, summarized.
- [S6] Anthony Calandra, "modern-cpp-features", <https://github.com/AnthonyCalandra/modern-cpp-features>, read 2026-11-12, MIT, summarized.
- [S7] Microsoft, "Header files (C++)", <https://learn.microsoft.com/en-us/cpp/cpp/header-files-cpp>, read 2026-11-12, CC BY 4.0, summarized.
- [S8] Standard C++ Foundation, "The Standard", <https://isocpp.org/std/the-standard>, read 2026-11-12, summarized.
