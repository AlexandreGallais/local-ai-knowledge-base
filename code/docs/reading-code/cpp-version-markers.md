---
id: reading-code-cpp-version-markers
title: C++ version markers
topic: reading-code
summary: Syntax markers that date a C++ excerpt, from C++11 to C++23, to find the oldest standard it needs.
tool: cpp
version: "C++23"
checked: 2026-11-13
sources: [S1, S2]
license: MIT (own words; facts summarized from the sources)
variant: files
---

# C++ version markers

Contents: 1. Markers · 2. How to use · Sources

## 1. Markers by standard (C++11 to C++23)

| Standard | Markers |
| --- | --- |
| C++11 | `auto`, lambdas, `nullptr`, `enum class`, range `for`, `constexpr`, `override` and `final`, `= default` and `= delete`, `noexcept`, move and `&&`, variadic templates, raw strings |
| C++14 | Generic lambdas, binary literals, return type deduction, `[[deprecated]]` |
| C++17 | Structured bindings, `if constexpr`, `if (init; cond)`, nested namespaces `A::B`, `inline` variables, `[[nodiscard]]`, class template argument deduction |
| C++20 | Concepts, coroutines, `<=>` comparison, designated initializers, `consteval`, `constinit`, `using enum`, `std::span`, text formatting, `std::jthread` |
| C++23 | Deducing `this`, `if consteval`, multi-index `operator[]`, `std::expected`, `std::to_underlying`, `std::unreachable`, the `stacktrace` library |

Source: [S1]. C++23 is the published standard (ISO/IEC 14882:2024); C++26 is in progress. [S2]

## 2. How to use the markers (dating an excerpt)

- The newest marker found gives the oldest standard the excerpt needs.
- The build file gives the real standard: `target_compile_features` or `CMAKE_CXX_STANDARD` in `CMakeLists.txt` (`docs/reading-code/build-cmake-make.md`).
- No marker found: say that the excerpt could be C++98 or later.

## Sources

- [S1] Anthony Calandra, "modern-cpp-features", <https://github.com/AnthonyCalandra/modern-cpp-features>, read 2026-11-12, MIT, summarized.
- [S2] Standard C++ Foundation, "The Standard", <https://isocpp.org/std/the-standard>, read 2026-11-12, summarized.
