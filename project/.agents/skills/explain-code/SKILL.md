---
name: explain-code
description: Use when the user asks to explain, read or summarize code in C, C++, Java or Rust, or one of their build files (CMakeLists.txt, Makefile, pom.xml, build.gradle, Cargo.toml) - an explanation for a reader who knows TypeScript and C#.
---

# Explain code in C, C++, Java or Rust

## Rules

1. Explain what the code does. Do not explain what its names suggest.
2. Never invent a definition. When the excerpt does not show something, write "not visible in this excerpt".
3. Give a TypeScript or C# equivalent only when the meaning is the same. Else say "no equivalent".
4. Answer in the language of the question. Keep code and identifiers unchanged.

## Steps

1. Find the language and its version from the file extension, the syntax and the build file:
   `target_compile_features` in `CMakeLists.txt`, `maven.compiler.release` in `pom.xml`, `edition` in `Cargo.toml`.
2. List every name that the excerpt uses but does not define: macros, types, functions, annotations, attributes.
   - C and C++: a name in capitals followed by `(` is probably a macro.
   - Rust: `name!(...)`, `#[derive(...)]` and `#[name]` are macros.
   - Java: `@Name` is an annotation. A framework or a code generator may act on it.
3. Find each definition in the project: search the exact name (`#define NAME`, `macro_rules! name`,
   `class Name`, `struct Name`, `trait Name`, `fn name`), then read only the lines around the match.
4. Read the code line by line. For each function, note its inputs and outputs, its side effects, who owns
   each resource and where it is freed, and what happens on an error.
5. Compare names and comments with the code. When they disagree, say so and follow the code.
6. Write the answer in this order:
   1. "What it does": one or two sentences.
   2. "Step by step": the code in execution order.
   3. "Equivalents": a short table, only where the meaning is the same.
   4. "False friends": each line that looks like TypeScript or C# but means something else.
   5. "Not visible in this excerpt": each name or fact you could not check.
7. Check every name in your answer: it must appear in the excerpt or in a definition you read.

## Special cases

- Undefined behavior in C or C++: say that the behavior is undefined. Do not describe a result.
- C++ overload or template: name the function called only when its declaration is visible.
- Code inside `#ifdef`, `#if` or `#[cfg(...)]`: say which macro or feature decides; explain both branches when unknown.
- `volatile` and a fixed address: a hardware register. Each read and write reaches the device.
- Interrupt handler: the hardware calls it. Do not call it dead code.

## Example

Question: "Explain this code."

```c
#define REG32(addr) (*(volatile uint32_t *)(addr))
#define TIMER_CTRL  REG32(0x40001000u)

void timer_start(void) { TIMER_CTRL |= 1u << 0; }
```

Wrong: "It starts a timer variable."

Right:

- What it does: `timer_start` sets bit 0 of the hardware register at address `0x40001000`.
- Step by step: `REG32` turns an address into a `volatile` 32-bit object; `TIMER_CTRL` expands to
  `REG32(0x40001000u)`; `|= 1u << 0` reads the register, sets bit 0 and writes it back.
- False friends: `TIMER_CTRL` looks like a variable. It is a macro that reads and writes hardware.
- Not visible in this excerpt: what bit 0 does. That is in the hardware manual.

## Final check

- Does every name in your answer appear in the excerpt or in a definition you read?
- Did you write "not visible in this excerpt" for everything you could not check?
- Is your answer in the language of the question?
