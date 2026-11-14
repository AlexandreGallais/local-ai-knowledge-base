---
title: "core::hint (part 1 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/hint.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::hint

Hints to compiler that affects how code should be emitted or optimized.

Hints may be compile time or runtime.

## fn unreachable_unchecked

```rust
pub const unsafe fn unreachable_unchecked() -> !
```

Informs the compiler that the site which is calling this function is not
reachable, possibly enabling further optimizations.

# Safety

Reaching this function is *Undefined Behavior*.

As the compiler assumes that all forms of Undefined Behavior can never
happen, it will eliminate all branches in the surrounding code that it can
determine will invariably lead to a call to `unreachable_unchecked()`.

If the assumptions embedded in using this function turn out to be wrong -
that is, if the site which is calling `unreachable_unchecked()` is actually
reachable at runtime - the compiler may have generated nonsensical machine
instructions for this situation, including in seemingly unrelated code,
causing difficult-to-debug problems.

Use this function sparingly. Consider using the `unreachable!` macro,
which may prevent some optimizations but will safely panic in case it is
actually reached at runtime. Benchmark your code to find out if using
`unreachable_unchecked()` comes with a performance benefit.

# Examples

`unreachable_unchecked()` can be used in situations where the compiler
can't prove invariants that were previously established. Such situations
have a higher chance of occurring if those invariants are upheld by
external code that the compiler can't analyze.
```rust
fn prepare_inputs(divisors: &mut Vec<u32>) {
    // Note to future-self when making changes: The invariant established
    // here is NOT checked in `do_computation()`; if this changes, you HAVE
    // to change `do_computation()`.
    divisors.retain(|divisor| *divisor != 0)
}

/// # Safety
/// All elements of `divisor` must be non-zero.
unsafe fn do_computation(i: u32, divisors: &[u32]) -> u32 {
    divisors.iter().fold(i, |acc, divisor| {
        // Convince the compiler that a division by zero can't happen here
        // and a check is not needed below.
        if *divisor == 0 {
            // Safety: `divisor` can't be zero because of `prepare_inputs`,
            // but the compiler does not know about this. We *promise*
            // that we always call `prepare_inputs`.
            unsafe { std::hint::unreachable_unchecked() }
        }
        // The compiler would normally introduce a check here that prevents
        // a division by zero. However, if `divisor` was zero, the branch
        // above would reach what we explicitly marked as unreachable.
        // The compiler concludes that `divisor` can't be zero at this point
        // and removes the - now proven useless - check.
        acc / divisor
    })
}

let mut divisors = vec![2, 0, 4];
prepare_inputs(&mut divisors);
let result = unsafe {
    // Safety: prepare_inputs() guarantees that divisors is non-zero
    do_computation(100, &divisors)
};
assert_eq!(result, 12);

```

While using `unreachable_unchecked()` is perfectly sound in the following
example, as the compiler is able to prove that a division by zero is not
possible, benchmarking reveals that `unreachable_unchecked()` provides
no benefit over using `unreachable!`, while the latter does not introduce
the possibility of Undefined Behavior.

```rust
fn div_1(a: u32, b: u32) -> u32 {
    use std::hint::unreachable_unchecked;

    // `b.saturating_add(1)` is always positive (not zero),
    // hence `checked_div` will never return `None`.
    // Therefore, the else branch is unreachable.
    a.checked_div(b.saturating_add(1))
        .unwrap_or_else(|| unsafe { unreachable_unchecked() })
}

assert_eq!(div_1(7, 0), 7);
assert_eq!(div_1(9, 1), 4);
assert_eq!(div_1(11, u32::MAX), 0);
```

## fn assert_unchecked

```rust
pub const unsafe fn assert_unchecked(cond: bool)
```

Makes a *soundness* promise to the compiler that `cond` holds.

This may allow the optimizer to simplify things, but it might also make the generated code
slower. Either way, calling it will most likely make compilation take longer.

You may know this from other places as
`llvm.assume` or, in C,
`__builtin_assume`.

This promotes a correctness requirement to a soundness requirement. Don't do that without
very good reason.

# Usage

This is a situational tool for micro-optimization, and is allowed to do nothing. Any use
should come with a repeatable benchmark to show the value, with the expectation to drop it
later should the optimizer get smarter and no longer need it.

The more complicated the condition, the less likely this is to be useful. For example,
`assert_unchecked(foo.is_sorted())` is a complex enough value that the compiler is unlikely
to be able to take advantage of it.

There's also no need to `assert_unchecked` basic <example-value> of things.  For example, the
compiler already knows the range of `count_ones`, so there is no benefit to
`let n = u32::count_ones(x); assert_unchecked(n <= u32::BITS);`.

`assert_unchecked` is logically equivalent to `if !cond { unreachable_unchecked(); }`. If
ever you are tempted to write `assert_unchecked(false)`, you should instead use
`unreachable_unchecked()` directly.

# Safety

`cond` must be `true`. It is immediate UB to call this with `false`.

# Example

```rust
use core::hint;

/// # Safety
///
/// `p` must be nonnull and valid
pub unsafe fn next_value(p: *const i32) -> i32 {
    // SAFETY: caller invariants guarantee that `p` is not null
    unsafe { hint::assert_unchecked(!p.is_null()) }

    if p.is_null() {
        return -1;
    } else {
        // SAFETY: caller invariants guarantee that `p` is valid
        unsafe { *p + 1 }
    }
}
```

Without the `assert_unchecked`, the above function produces the following with optimizations
enabled:

```
next_value:
        test    rdi, rdi
        je      .LBB0_1
        mov     eax, dword ptr [rdi]
        inc     eax
        ret
.LBB0_1:
        mov     eax, -1
        ret
```rust

Adding the assertion allows the optimizer to remove the extra check:

```
next_value:
        mov     eax, dword ptr [rdi]
        inc     eax
        ret
```rust

This example is quite unlike anything that would be used in the real world: it is redundant
to put an assertion right next to code that checks the same thing, and dereferencing a
pointer already has the builtin assumption that it is nonnull. However, it illustrates the
kind of changes the optimizer can make even when the behavior is less obviously related.

## fn spin_loop

```rust
pub fn spin_loop()
```

Emits a machine instruction to signal the processor that it is running in
a busy-wait spin-loop ("spin lock").

Upon receiving the spin-loop signal the processor can optimize its behavior by,
for example, saving power or switching hyper-threads.

This function is different from `thread::yield_now` which directly
yields to the system's scheduler, whereas `spin_loop` does not interact
with the operating system.

A common use case for `spin_loop` is implementing bounded optimistic
spinning in a CAS loop in synchronization primitives. To avoid problems
like priority inversion, it is strongly recommended that the spin loop is
terminated after a finite amount of iterations and an appropriate blocking
syscall is made.

**Note**: On platforms that do not support receiving spin-loop hints this
function does not do anything at all.

# Examples

```
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Arc;
use std::{hint, thread};

// A shared atomic value that threads will use to coordinate
let live = Arc::new(AtomicBool::new(false));

// In a background thread we'll eventually set the value
let bg_work = {
    let live = live.clone();
    thread::spawn(move || {
        // Do some work, then make the value live
        do_some_work();
        live.store(true, Ordering::Release);
    })
};

// Back on our current thread, we wait for the value to be set
while !live.load(Ordering::Acquire) {
    // The spin loop is a hint to the CPU that we're waiting, but probably
    // not for very long
    hint::spin_loop();
}

// The value is now set
# fn do_some_work() {}
do_some_work();
bg_work.join()?;
# Ok::<(), Box<dyn core::any::Any + Send + 'static>>(())
```rust

`thread::yield_now`: ../../std/thread/fn.yield_now.html

## fn black_box

```rust
pub const fn black_box<T>(dummy: T) -> T
```

An identity function that *__hints__* to the compiler to be maximally pessimistic about what
`black_box` could do.

Unlike `std::convert::identity`, a Rust compiler is encouraged to assume that `black_box` can
use `dummy` in any possible valid way that Rust code is allowed to without introducing undefined
behavior in the calling code. This property makes `black_box` useful for writing code in which
certain optimizations are not desired, such as benchmarks.

Note however, that `black_box` is only (and can only be) provided on a "best-effort" basis. The
extent to which it can block optimisations may vary depending upon the platform and code-gen
backend used. Programs cannot rely on `black_box` for *correctness*, beyond it behaving as the
identity function. As such, it **must not be relied upon to control critical program behavior.**
This also means that this function does not offer any guarantees for cryptographic or security
purposes.

This limitation is not specific to `black_box`; there is no mechanism in the entire Rust
language that can provide the guarantees required for constant-time cryptography.
(There is also no such mechanism in LLVM, so the same is true for every other LLVM-based compiler.)

# When is this useful?

While not suitable in those mission-critical cases, `black_box`'s functionality can generally be
relied upon for benchmarking, and should be used there. It will try to ensure that the
compiler doesn't optimize away part of the intended test code based on context. For
example:

```rust
fn contains(haystack: &[&str], needle: &str) -> bool {
    haystack.iter().any(|x| x == &needle)
}

pub fn benchmark() {
    let haystack = vec!["abc", "def", "ghi", "jkl", "mno"];
    let needle = "ghi";
    for _ in 0..10 {
        contains(&haystack, needle);
    }
}
```

The compiler could theoretically make optimizations like the following:

- The `needle` and `haystack` do not change, move the call to `contains` outside the loop and
  delete the loop
- Inline `contains`
- `needle` and `haystack` have values known at compile time, `contains` is always true. Remove
  the call and replace with `true`
- Nothing is done with the result of `contains`: delete this function call entirely
- `benchmark` now has no purpose: delete this function

It is not likely that all of the above happens, but the compiler is definitely able to make some
optimizations that could result in a very inaccurate benchmark. This is where `black_box` comes
in:

```rust
use std::hint::black_box;

// Same `contains` function.
fn contains(haystack: &[&str], needle: &str) -> bool {
    haystack.iter().any(|x| x == &needle)
}

pub fn benchmark() {
    let haystack = vec!["abc", "def", "ghi", "jkl", "mno"];
    let needle = "ghi";
    for _ in 0..10 {
        // Force the compiler to run `contains`, even though it is a pure function whose
        // results are unused.
        black_box(contains(
            // Prevent the compiler from making assumptions about the input.
            black_box(&haystack),
            black_box(needle),
        ));
    }
}
```

This essentially tells the compiler to block optimizations across any calls to `black_box`. So,
it now:

- Treats both arguments to `contains` as unpredictable: the body of `contains` can no longer be
  optimized based on argument values
- Treats the call to `contains` and its result as volatile: the body of `benchmark` cannot
  optimize this away

This makes our benchmark much more realistic to how the function would actually be used, where
arguments are usually not known at compile time and the result is used in some way.

# How to use this

In practice, `black_box` serves two purposes:

1. It prevents the compiler from making optimizations related to the value returned by `black_box`
2. It forces the value passed to `black_box` to be calculated, even if the return value of `black_box` is unused

```rust
use std::hint::black_box;

let zero = 0;
let five = 5;

// The compiler will see this and remove the `* five` call, because it knows that multiplying
// any integer by 0 will result in 0.
let c = zero * five;

// Adding `black_box` here disables the compiler's ability to reason about the first operand in the multiplication.
// It is forced to assume that it can be any possible number, so it cannot remove the `* five`
// operation.
let c = black_box(zero) * five;
```

While most cases will not be as clear-cut as the above example, it still illustrates how
`black_box` can be used. When benchmarking a function, you usually want to wrap its inputs in
`black_box` so the compiler cannot make optimizations that would be unrealistic in real-life
use.

```rust
use std::hint::black_box;

// This is a simple function that increments its input by 1. Note that it is pure, meaning it
// has no side-effects. This function has no effect if its result is unused. (An example of a
// function *with* side-effects is `println!()`.)
fn increment(x: u8) -> u8 {
    x + 1
}

// Here, we call `increment` but discard its result. The compiler, seeing this and knowing that
// `increment` is pure, will eliminate this function call entirely. This may not be desired,
// though, especially if we're trying to track how much time `increment` takes to execute.
let _ = increment(black_box(5));

// Here, we force `increment` to be executed. This is because the compiler treats `black_box`
// as if it has side-effects, and thus must compute its input.
let _ = black_box(increment(black_box(5)));
```

There may be additional situations where you want to wrap the result of a function in
`black_box` to force its execution. This is situational though, and may not have any effect
(such as when the function returns a zero-sized type such as `()` unit).

Note that `black_box` has no effect on how its input is treated, only its output. As such,
expressions passed to `black_box` may still be optimized:

```rust
use std::hint::black_box;

// The compiler sees this...
let y = black_box(5 * 10);

// ...as this. As such, it will likely simplify `5 * 10` to just `50`.
let _0 = 5 * 10;
let y = black_box(_0);
```

In the above example, the `5 * 10` expression is considered distinct from the `black_box` call,
and thus is still optimized by the compiler. You can prevent this by moving the multiplication
operation outside of `black_box`:

```rust
use std::hint::black_box;

// No assumptions can be made about either operand, so the multiplication is not optimized out.
let y = black_box(5) * black_box(10);
```

During constant evaluation, `black_box` is treated as a no-op.
