---
name: explain-code
description: Explain or summarize code written in C, C++, Java or Rust for a reader who knows C# and TypeScript. Covers CMakeLists.txt, Makefile, pom.xml, build.gradle and Cargo.toml. Use when the user asks to explain, read, summarize or review code in C, C++, Java or Rust.
license: MIT
metadata:
  variant: files
  version: "0.1.0"
---

# Explain code in C, C++, Java or Rust

## Rules

1. Explain what the code does. Do not explain what its names suggest.
2. Never invent a definition. When the excerpt does not show something, write "not visible in this excerpt".
3. Give a C# equivalent only when the reading guide gives one.
4. Answer in the language of the question. Keep code and identifiers unchanged.

## Steps

1. Find the language and its version.
   - Use the file extension and the syntax.
   - When a build file exists, read the version there: `target_compile_features` in `CMakeLists.txt`, `maven.compiler.release` in `pom.xml`, `edition` in `Cargo.toml`.

<!-- files:begin id=guides -->

2. Open one reading guide: the guide of that language, from `docs/reading-code/index.md`.
   - Open `c-embedded-idioms.md` too when the code touches registers, bit masks, fixed-point math or interrupt handlers.
   - Open a build-file guide only when the question is about a build file.

<!-- files:end -->

3. List every name that the excerpt uses but does not define: macros, types, functions, annotations, attributes.
   - C and C++: a name in capitals followed by `(` is probably a macro.
   - Rust: `name!(...)`, `#[derive(...)]` and `#[name]` are macros.
   - Java: `@Name` is an annotation. A framework or a code generator may act on it.

<!-- files:begin id=definitions -->

4. Find each definition in the project.
   - Search for the exact name: `#define NAME`, `macro_rules! name`, `class Name`, `struct Name`, `trait Name`, `fn name`.
   - Read only the lines around the match.
   - To see C or C++ code after the preprocessor, run `gcc -E -P <file>` with the same `-D` options and include paths as the build. Read only the part you need.
   - To see Rust code after macro expansion, run `cargo expand <path::to::item>` when `cargo-expand` is installed. The output is a debugging aid. Do not present it as the source code.
   - When you cannot find a definition, add the name to the list "Not visible in this excerpt".

<!-- files:end -->

5. Read the code line by line. For each function, note:
   - its inputs and outputs;
   - its side effects;
   - who owns each resource, and where it is freed or dropped;
   - what happens on an error.
6. Compare names and comments with the code. When they disagree, say so and follow the code.
7. Write the answer in this order:
   1. "What it does": one or two sentences.
   2. "Step by step": the code in execution order.
   3. "C# equivalents": a short table, only for constructs that the reading guide lists.
   4. "False friends": each line that looks like C# but means something else.
   5. "Not visible in this excerpt": each name or fact that you could not check.
8. Check every name in your answer. Each function, type, variable and macro that you mention must appear in the excerpt or in a definition that you read. Remove or correct the others.

## Special cases

- Undefined behavior in C or C++: say that the behavior is undefined. Do not describe a result.
- Overloaded function or template in C++: name the function that is called only when its declaration is visible. Otherwise write "depends on declarations not visible in this excerpt".
- Code inside `#ifdef`, `#if` or `#[cfg(...)]`: say which macro or feature decides. Explain both branches when the build setting is unknown.
- Lombok or Spring annotation in Java: say which members or which objects the annotation creates, as the reading guide lists them.
- Interrupt handler: say that the hardware calls it. Do not call it dead code.

## Example

Question: "Explain this code."

```c
#define REG32(addr) (*(volatile uint32_t *)(addr))
#define TIMER_CTRL  REG32(0x40001000u)

void timer_start(void)
{
    TIMER_CTRL |= 1u << 0;
}
```

Answer:

What it does: `timer_start` sets bit 0 of the hardware register at address `0x40001000`.

Step by step:

1. `REG32(addr)` is a macro. It turns an address into a `volatile` 32-bit object.
2. `TIMER_CTRL` is a macro. It expands to `REG32(0x40001000u)`.
3. `TIMER_CTRL |= 1u << 0;` reads the register, sets bit 0, and writes the register back.

C# equivalents:

| You read | C# equivalent |
| --- | --- |
| `1u << 0`, compound assignment with OR | Same operators, same meaning |
| `volatile uint32_t *` at a fixed address | No equivalent |

False friends:

- `TIMER_CTRL` looks like a variable. It is a macro that reads and writes hardware.

Not visible in this excerpt:

- What bit 0 does. That is in the hardware manual.

## Final check

- Does every name in your answer appear in the excerpt or in a definition that you read?
- Did you write "not visible in this excerpt" for everything that you could not check?
- Did you follow the code where a name or a comment disagreed with it?
- Is your answer in the language of the question?
