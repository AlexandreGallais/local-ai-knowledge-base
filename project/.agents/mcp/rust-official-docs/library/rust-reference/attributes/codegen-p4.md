---
title: "Code generation attributes (part 4 of 5)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/attributes/codegen.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Code generation attributes (part 4 of 5)

Feature     | Implicitly Enables  | Description
------------|---------------------|-------------------
`a`         | `zaamo`, `zalrsc`   | A --- Atomic instructions
`b`         | `zba`, `zbc`, `zbs` | B --- Bit Manipulation instructions
`c`         | `zca`               | C --- Compressed instructions
`d`         | `f`                 | D --- Double-Precision Floating-Point
`f`         | `zicsr`             | F --- Single-Precision Floating-Point
`m`         |                     | M --- Integer Multiplication and Division instructions
`za64rs`    | `za128rs`           | Za64rs --- Platform Behavior: Naturally aligned Reservation sets with ≦ 64 Bytes
`za128rs`   |                     | Za128rs --- Platform Behavior: Naturally aligned Reservation sets with ≦ 128 Bytes
`zaamo`     |                     | Zaamo --- Atomic Memory Operation instructions
`zabha`     | `zaamo`             | Zabha --- Byte and Halfword Atomic Memory Operation instructions
`zacas`     | `zaamo`             | Zacas --- Atomic Compare-and-Swap (CAS) instructions
`zalrsc`    |                     | Zalrsc --- Load-Reserved/Store-Conditional instructions
`zama16b`   |                     | Zama16b --- Platform Behavior: Misaligned loads, stores, and AMOs to main memory regions that do not cross a naturally aligned 16-byte boundary are atomic
`zawrs`     |                     | Zawrs --- Wait-on-Reservation-Set instructions
`zba`       |                     | Zba --- Address Generation instructions
`zbb`       |                     | Zbb --- Basic <example-value>
`zbc`       | `zbkc`              | Zbc --- Carry-less multiplication
`zbkb`      |                     | Zbkb --- Bit Manipulation Instructions for Cryptography
`zbkc`      |                     | Zbkc --- Carry-less multiplication for Cryptography
`zbkx`      |                     | Zbkx --- Crossbar permutations
`zbs`       |                     | Zbs --- Single-bit instructions
`zca`       |                     | Zca --- Compressed instructions: integer part subset
`zcb`       | `zca`               | Zcb --- Simple Code-size Saving Compressed instructions
`zcmop`     | `zca`               | Zcmop --- Compressed May-Be-Operations
`zic64b`    |                     | Zic64b --- Platform Behavior: Naturally aligned 64 byte Cache blocks
`zicbom`    |                     | Zicbom --- Cache-Block Management instructions
`zicbop`    |                     | Zicbop --- Cache-Block Prefetch Hint instructions
`zicboz`    |                     | Zicboz --- Cache-Block Zero instruction
`ziccamoa`  |                     | Ziccamoa --- Platform Behavior: Cacheable and Coherent Main memory supports all basic <example-value> operations
`ziccif`    |                     | Ziccif --- Platform Behavior: Cacheable and Coherent Main memory supports instruction fetch and fetches of naturally aligned power-of-2 sizes up to `min(ILEN,XLEN)` are atomic
`zicclsm`   |                     | Zicclsm --- Platform Behavior: Cacheable and Coherent Main memory supports misaligned load/store accesses
`ziccrse`   |                     | Ziccrse --- Platform Behavior: Cacheable and Coherent Main memory guarantees eventual success on LR/SC sequences
`zicntr`    | `zicsr`             | Zicntr --- Base Counters and Timers
`zicond`    |                     | Zicond --- Integer Conditional Operation instructions
`zicsr`     |                     | Zicsr --- Control and Status Register (CSR) instructions
`zifencei`  |                     | Zifencei --- Instruction-Fetch Fence instruction
`zihintntl`   |                   | Zihintntl --- Non-Temporal Locality Hint instructions
`zihintpause` |                   | Zihintpause --- Pause Hint instruction
`zihpm`     | `zicsr`             | Zihpm --- Hardware Performance Counters
`zimop`     |                     | Zimop --- May-Be-Operations
`zk`        | `zkn`, `zkr`, `zks`, `zkt`, `zbkb`, `zbkc`, `zkbx` | Zk --- Scalar Cryptography
`zkn`       | `zknd`, `zkne`, `zknh`, `zbkb`, `zbkc`, `zkbx`     | Zkn --- NIST Algorithm suite extension
`zknd`      |                                                    | Zknd --- NIST Suite: AES Decryption
`zkne`      |                                                    | Zkne --- NIST Suite: AES Encryption
`zknh`      |                                                    | Zknh --- NIST Suite: Hash Function Instructions
`zkr`       |                                                    | Zkr --- Entropy Source Extension
`zks`       | `zksed`, `zksh`, `zbkb`, `zbkc`, `zkbx`            | Zks --- ShangMi Algorithm Suite
`zksed`     |                                                    | Zksed --- ShangMi Suite: SM4 Block Cipher Instructions
`zksh`      |                                                    | Zksh --- ShangMi Suite: SM3 Hash Function Instructions
`zkt`       |                                                    | Zkt --- Data Independent Execution Latency Subset
`ztso`      |                     | Ztso --- Total Store Ordering

r[attributes.codegen.target_feature.wasm]
#### `wasm32` or `wasm64`

Safe `#[target_feature]` functions may always be used in safe contexts on Wasm
platforms. It is impossible to cause undefined behavior via the
`#[target_feature]` attribute because attempting to use instructions
unsupported by the Wasm engine will fail at load time without the risk of being
interpreted in a way different from what the compiler expected.

Feature               | Implicitly Enables  | Description
----------------------|---------------------|-------------------
`bulk-memory`         |                     | WebAssembly bulk memory operations proposal
`extended-const`      |                     | WebAssembly extended const expressions proposal
`mutable-globals`     |                     | WebAssembly mutable global proposal
`nontrapping-fptoint` |                     | WebAssembly non-trapping float-to-int conversion proposal
`relaxed-simd`        | `simd128`           | WebAssembly relaxed simd proposal
`sign-ext`            |                     | WebAssembly sign extension operators Proposal
`simd128`             |                     | WebAssembly simd proposal
`multivalue`          |                     | WebAssembly multivalue proposal
`reference-types`     |                     | WebAssembly reference-types proposal
`tail-call`           |                     | WebAssembly tail-call proposal
`wide-arithmetic`     |                     | WebAssembly wide-arithmetic proposal

r[attributes.codegen.target_feature.s390x]
#### `s390x`

On `s390x` targets, use of functions with the `#[target_feature]` attribute follows the above restrictions.

Further documentation on these features can be found in the "Additions to z/Architecture" section of Chapter 1 of the *[z/Architecture Principles of Operation]*.

Feature                                | Implicitly Enables                    | Description
---------------------------------------|---------------------------------------|---------------------
`vector`                               |                                       | 128-bit vector instructions
`vector-enhancements-1`                | `vector`                              | vector enhancements 1
`vector-enhancements-2`                | `vector-enhancements-1`               | vector enhancements 2
`vector-enhancements-3`                | `vector-enhancements-2`               | vector enhancements 3
`vector-packed-decimal`                | `vector`                              | vector packed-decimal
`vector-packed-decimal-enhancement`    | `vector-packed-decimal`               | vector packed-decimal enhancement
`vector-packed-decimal-enhancement-2`  | `vector-packed-decimal-enhancement-2` | vector packed-decimal enhancement 2
`vector-packed-decimal-enhancement-3`  | `vector-packed-decimal-enhancement-3` | vector packed-decimal enhancement 3
`nnp-assist`                           | `vector`                              | nnp assist
`miscellaneous-extensions-2`           |                                       | miscellaneous extensions 2
`miscellaneous-extensions-3`           |                                       | miscellaneous extensions 3
`miscellaneous-extensions-4`           |                                       | miscellaneous extensions 4

r[attributes.codegen.target_feature.info]
### Additional information

r[attributes.codegen.target_feature.remark-cfg]
See the [`target_feature` conditional compilation option] for selectively
enabling or disabling compilation of code based on compile-time settings. Note
that this option is not affected by the `target_feature` attribute, and is
only driven by the features enabled for the entire crate.

r[attributes.codegen.target_feature.remark-rt]
Whether a feature is enabled can be checked at runtime using a platform-specific macro from the standard library, for instance [`is_x86_feature_detected`] or [`is_aarch64_feature_detected`].

> **Note:**
> `rustc` has a default set of features enabled for each target and CPU. The CPU may be chosen with the [`-C target-cpu`] flag. Individual features may be enabled or disabled for an entire crate with the [`-C target-feature`] flag.

r[attributes.codegen.track_caller]
## The `track_caller` attribute

r[attributes.codegen.track_caller.allowed-positions]
The `track_caller` attribute may be applied to any function with `"Rust"` ABI
with the exception of the entry point `fn main`.

r[attributes.codegen.track_caller.traits]
When applied to functions and methods in trait declarations, the attribute applies to all implementations. If the trait provides a
default implementation with the attribute, then the attribute also applies to override implementations.

r[attributes.codegen.track_caller.extern]
When applied to a function in an `extern` block the attribute must also be applied to any linked
implementations, otherwise undefined behavior results. When applied to a function which is made
available to an `extern` block, the declaration in the `extern` block must also have the attribute,
otherwise undefined behavior results.

r[attributes.codegen.track_caller.behavior]
### Behavior

Applying the attribute to a function `f` allows code within `f` to get a hint of the [`Location`] of
the "topmost" tracked call that led to `f`'s invocation. At the point of observation, an
implementation behaves as if it walks up the stack from `f`'s frame to find the nearest frame of an
*unattributed* function `outer`, and it returns the [`Location`] of the tracked call in `outer`.

```rust
#[track_caller]
fn f() {
    println!("{}", std::panic::Location::caller());
}
```

> **Note:**
> `core` provides [`core::panic::Location::caller`] for observing caller locations. It wraps the [`core::intrinsics::caller_location`] intrinsic implemented by `rustc`.

> **Note:**
> Because the resulting `Location` is a hint, an implementation may halt its walk up the stack early. See Limitations for important caveats.

#### Examples

When `f` is called directly by `calls_f`, code in `f` observes its callsite within `calls_f`:

```rust
# #[track_caller]
# fn f() {
#     println!("{}", std::panic::Location::caller());
# }
fn calls_f() {
    f(); // <-- f() prints this location
}
```

When `f` is called by another attributed function `g` which is in turn called by `calls_g`, code in
both `f` and `g` observes `g`'s callsite within `calls_g`:

```rust
# #[track_caller]
# fn f() {
#     println!("{}", std::panic::Location::caller());
# }
#[track_caller]
fn g() {
    println!("{}", std::panic::Location::caller());
    f();
}

fn calls_g() {
    g(); // <-- g() prints this location twice, once itself and once from f()
}
```

When `g` is called by another attributed function `h` which is in turn called by `calls_h`, all code
in `f`, `g`, and `h` observes `h`'s callsite within `calls_h`:

```rust
# #[track_caller]
# fn f() {
#     println!("{}", std::panic::Location::caller());
# }
# #[track_caller]
# fn g() {
#     println!("{}", std::panic::Location::caller());
#     f();
# }
#[track_caller]
fn h() {
    println!("{}", std::panic::Location::caller());
    g();
}

fn calls_h() {
    h(); // <-- prints this location three times, once itself, once from g(), once from f()
}
```

And so on.

r[attributes.codegen.track_caller.limits]
### Limitations

r[attributes.codegen.track_caller.hint]
This information is a hint and implementations are not required to preserve it.

r[attributes.codegen.track_caller.decay]
In particular, coercing a function with `#[track_caller]` to a function pointer creates a shim which
appears to observers to have been called at the attributed function's definition site, losing actual
caller information across virtual calls. A common example of this coercion is the creation of a
trait object whose methods are attributed.

> **Note:**
> The aforementioned shim for function pointers is necessary because `rustc` implements `track_caller` in a codegen context by appending an implicit parameter to the function ABI, but this would be unsound for an indirect call because the parameter is not a part of the function's type and a given function pointer type may or may not refer to a function with the attribute. The creation of a shim hides the implicit parameter from callers of the function pointer, preserving soundness.

r[attributes.codegen.instruction_set]
