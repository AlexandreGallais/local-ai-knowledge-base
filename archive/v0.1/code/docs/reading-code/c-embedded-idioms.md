---
id: reading-code-c-embedded-idioms
title: C embedded idioms
topic: reading-code
summary: Bit-fields, volatile, fixed-point Q format, memory-mapped registers and interrupt handlers in embedded C. C23.
tool: c
version: "C23"
checked: 2026-11-12
sources: [S18, S43, S44, S45, S46, S47]
license: MIT (own words and own examples; facts summarized from the sources)
variant: files
---

# C embedded idioms

Contents: 1. Bit masks and bit-fields · 2. volatile · 3. Fixed-point numbers · 4. Memory-mapped registers · 5. Interrupt handlers · 6. Pitfalls · Sources

## 1. Bit masks and bit-fields (embedded C)

Embedded code packs several small values into one integer. It does this in two ways.

Bit masks use the operators `|`, `&`, `~` and `<<`. They mean the same as in C#. [unverified]

```c
#define FLAG_READY (1u << 0)
#define FLAG_ERROR (1u << 3)

status |= FLAG_READY;          /* set bit 0 */
status &= ~FLAG_ERROR;         /* clear bit 3 */
if (status & FLAG_ERROR) { }   /* test bit 3 */
```

A bit-field is a struct member with a width in bits. [S18]

```c
struct Status {
    unsigned ready : 1;   /* 1 bit */
    unsigned mode  : 3;   /* 3 bits */
    unsigned       : 4;   /* 4 unnamed bits: padding */
};
```

- An unnamed bit-field is padding. An unnamed bit-field of width 0 makes the next member start on a new `int` boundary. [S18]
- You cannot take the address of a bit-field. [S18]
- The compiler decides the order of the bits, the sign of a plain `int` bit-field, and whether a field can cross two storage units. [S18]
- Never say which physical bit a field uses, unless the compiler and the target are known.
- C# equivalent: masks on an integer, or a `[Flags]` enum. C# has no bit-field syntax.

## 2. volatile (embedded C)

`volatile` tells the compiler that a value can change outside the code it sees. The compiler must read the value again at each use. It must not keep a cached copy. [S45]

Code uses `volatile` for three kinds of variables: [S45]

- A hardware register mapped in memory.
- A global variable that an interrupt handler changes.
- A global variable that several tasks share.

```c
volatile uint8_t *status_reg;   /* pointer to volatile data */
uint8_t * volatile cursor;      /* volatile pointer to ordinary data */
```

Read these declarations from right to left. [S45]

- `volatile` does not make an operation atomic. `counter++` on a `volatile` variable is still a read, an add and a write. [unverified]
- C# equivalent: C# has a `volatile` keyword for fields shared between threads. The hardware use has no C# equivalent.

## 3. Fixed-point numbers (Q format)

Code without floating-point hardware stores real numbers in integers. The format Qm.n means: `n` bits hold the fraction. The stored integer is the real value multiplied by 2 to the power `n`. [S46]

- Example with `n` = 8: the stored integer 384 means 384 / 256 = 1.5. [S46]
- Two conventions exist. The TI convention does not count the sign bit in `m`. The ARM convention counts it. [S46]
- "Q15" in 16 bits covers about -1 to just under +1. [S46]
- Addition: add the stored integers. Both must have the same `n`. [S46]
- Multiplication: the raw product has `2n` fraction bits. The code shifts it right by `n` bits. It uses a wider type for the product. It adds a rounding constant before the shift. It saturates the result. [S46]

```c
int16_t q15_mul(int16_t a, int16_t b)
{
    int32_t wide = (int32_t)a * b;   /* product in a wider type */
    wide += 1 << 14;                 /* rounding constant */
    return (int16_t)(wide >> 15);    /* back to Q15; no saturation here */
}
```

- When you see `(a * b) >> 15`, explain it as a fixed-point multiplication, not as a division by 32768.
- C# equivalent: none built in. It is a scaled integer, not `decimal` and not `double`.

## 4. Memory-mapped registers (C and Rust)

A hardware register sits at a fixed address. The code reads and writes it through a pointer to `volatile` data. [S45]

```c
#define TIMER_BASE 0x40001000u                               /* example address */
#define TIMER_CTRL (*(volatile uint32_t *)(TIMER_BASE + 0x00u))

TIMER_CTRL |= 1u << 0;    /* writes to the hardware, not to RAM */
```

- `TIMER_CTRL` looks like a variable. It is a macro that reads and writes hardware.
- Some code uses a struct pointer instead, for example `SCB->VTOR` in CMSIS. [S47]
- The excerpt does not say what a bit does. That is in the hardware manual. Say "not visible in this excerpt".

In embedded Rust, a generated crate gives one object per register: [S43]

- `read()` returns the fields.
- `write(...)` sets the fields you name and puts the others back to their default value.
- `modify(...)` changes only the fields you name.
- `Peripherals::take()` returns an `Option`: each peripheral has exactly one owner.

## 5. Interrupt handlers (CMSIS and Rust)

An interrupt handler is a function that the hardware calls. No code calls it. [S47]

```c
volatile uint32_t tick_count;        /* shared with the main code */

void SysTick_Handler(void)           /* the name is fixed by the vector table */
{
    tick_count++;
}
```

- In CMSIS, the startup file holds the vector table. Core handlers have fixed names such as `SysTick_Handler`. Device handlers end with `_IRQHandler`. [S47]
- The default handlers are weak. A function with the same name replaces the default. [S47]
- `NVIC_EnableIRQ` turns a device interrupt on. `NVIC_SetPriority` sets its priority: a lower value means a higher priority. [S47]
- A variable shared between a handler and the main code is declared `volatile`. [S45]
- In embedded Rust, a handler has the attribute `#[interrupt]` and the name of the interrupt. Other code cannot call it. [S44]
- A handler must clear the cause of the interrupt. If it does not, the handler can run again without end. [S44]
- C# equivalent: an event handler that the runtime calls. There is no closer match.

## 6. Pitfalls (reading embedded C)

- A handler with no caller is not dead code. [S47]
- Never merge two reads of a `volatile` object into one in your explanation. Each read is real. [S45]
- The layout of a bit-field depends on the compiler. [S18]
- The value of a fixed-point integer depends on its Q format. If the format is not shown, ask for it. [S46]
- Handler names and startup files in this document follow CMSIS for Arm Cortex-M. Other targets use other names. [unverified]

## Sources

- [S18] Microsoft, "C Bit Fields", updated 2023-07-26, <https://learn.microsoft.com/en-us/cpp/c-language/c-bit-fields>, read 2026-11-12, CC BY 4.0, summarized.
- [S43] Rust Embedded, "Memory Mapped Registers", The Embedded Rust Book, <https://docs.rust-embedded.org/book/start/registers.html>, read 2026-11-12, license not stated, summarized.
- [S44] Rust Embedded, "Interrupts", The Embedded Rust Book, <https://docs.rust-embedded.org/book/start/interrupts.html>, read 2026-11-12, license not stated, summarized.
- [S45] N. Jones, "How to Use C's volatile Keyword", Barr Group, 2001, <https://barrgroup.com/blog/how-use-cs-volatile-keyword>, read 2026-11-12, license not stated, summarized.
- [S46] Wikipedia, "Q (number format)", <https://en.wikipedia.org/wiki/Q_(number_format)>, read 2026-11-12, CC BY-SA 4.0, summarized.
- [S47] Arm, "Interrupts and Exceptions (NVIC)", CMSIS-Core, CMSIS 6, <https://arm-software.github.io/CMSIS_6/latest/Core/group__NVIC__gr.html>, read 2026-11-12, license not stated, summarized.
