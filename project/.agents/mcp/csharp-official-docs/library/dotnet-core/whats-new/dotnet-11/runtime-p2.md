---
title: "What's new in .NET 11 runtime (part 2 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/whats-new/dotnet-11/runtime.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# What's new in .NET 11 runtime (part 2 of 3)

## JIT improvements

- **Bounds check elimination:** The just-in-time (JIT) compiler now eliminates bounds checks for the common pattern where an index plus a constant is compared against a length, such as `i + cns < len`. It also eliminates more redundant bounds checks for index-from-end access (for example, `values[^1]`). These improvements reduce redundant checks in tight loops and improve throughput for array and span operations.
- **Redundant checked context removal:** The JIT can now prove and remove redundant checked arithmetic contexts—for example, when a value is already known to be in range. This optimization eliminates unnecessary overflow checks in generated code.
- **Switch expression folding:** Multi-target `switch` expressions now fold into simpler branchless checks when the targets are a small set of constants, for example `x is 0 or 1 or 2 or 3 or 4`.
- **Faster uint-to-float/double casts:** Casting `uint` to `float` or `double` is faster on pre-AVX-512 x86 hardware.
- **SVE2 intrinsics:** New Arm SVE2 (Scalable Vector Extension 2) intrinsics are available: `ShiftRightLogicalNarrowingSaturate(Even|Odd)`. These expand the set of vectorized operations available on Arm hardware that supports SVE2.
- **`Math.BigMul` on x64:** `Math.BigMul(long, long, out long)` is now significantly faster on x64. The JIT generates a single `MUL r/m64` instruction when both operands are 64-bit values and the caller requests the high half of the result, eliminating the previous helper call.
- **Single-IG prolog restriction removed:** The JIT no longer requires the function prolog to fit in a single instruction group (IG). Complex prologues with many saved registers, large stack allocations, or runtime-async state setup no longer trigger fallback paths.
- **`SELECT(cond, cns, cns)` folding:** The JIT now folds conditional selects whose two branches both produce the same constant into just that constant—for example, `condition ? 42 : 42` becomes `42`. This fold eliminates unnecessary comparisons that can appear after earlier optimizations unify branches.
- **AVX-VNNI-512 intrinsics:** `System.Runtime.Intrinsics.X86.AvxVnni.V512` exposes 512-bit forms of the `AVX-VNNI` multiply-add intrinsics on CPUs with `AVX512-VNNI` support.
- **Saturating floating-point conversions:** Unchecked `float` and `double` conversions to small integer types now saturate to type bounds instead of wrapping through intermediate truncation.
- **ARM64 `Vector<T>` by reference for SVE:** When the runtime is compiled with ARM SVE support, `Vector<T>` values are passed by reference rather than by value, aligning with the ARM calling convention for scalable types and enabling better code generation for SVE-intensive code.

For better performance and code quality, .NET 11 adds several more JIT optimizations:

### Constant-folding SequenceEqual

The JIT can now fold a `string.Equals` or `ReadOnlySpan<T>.SequenceEqual` call whose operands are both compile-time constants, replacing the byte-by-byte comparison with the constant `true` or `false` result. This matters most after inlining, when a caller passes another literal to a helper that compares against a known string. When `IsAdmin` is inlined into a caller that passes `"Guest"`, the JIT sees `"Guest" == "Admin"` and folds it to `false`:

```csharp
static bool IsAdmin(string role) => role == "Admin";
```

The optimization applies to string literals, `const string` fields, and UTF-8 literals (for example, `"PNG"u8`).

### Devirtualization improvements

The JIT can now devirtualize generic virtual methods, including non-shared generic virtual methods and shared generic virtual methods that don't require a runtime lookup. Default interface methods declared on generic interfaces can now be devirtualized as well.

In addition, the result of `Activator.CreateInstance<T>()` is now treated as having an exact type, allowing the JIT to devirtualize subsequent calls made on the returned object.

These improvements unlock further downstream optimizations such as inlining and constant folding, reducing runtime dispatch overhead and improving performance. For example:

```csharp
IfaceGeneric<string> caller = new Caller<string>();
Iface obj = Activator.CreateInstance<Impl>();
caller.DefaultImpl(obj, "test"); // Can be optimized down to Console.WriteLine("test")

interface Iface
{
    void GenericMethod<T>(T value);
}

interface IfaceGeneric<T>
{
    void DefaultImpl(Iface obj, T value) => obj.GenericMethod(value);
}

class Impl : Iface
{
    public void GenericMethod<T>(T value) => Console.WriteLine(value);
}

class Caller<T> : IfaceGeneric<T>
{
}
```

Here the JIT can determine the exact implementation behind both interface calls, devirtualize them, inline through the call chain, and ultimately fold the code down to the equivalent of `Console.WriteLine("test")`.

### Eliminating bounds checks after an empty-span guard

The JIT now picks up the `length != 0` assertion from an empty-span check and uses it to prove the bounds check on the first element succeeds:

```csharp
if (!span.IsEmpty && span[0] == value)
{
    // The bounds check on span[0] is now eliminated.
}
```

### Redundant branch and test elimination

When an outer predicate is already implied by an inner branch, the JIT now removes the redundant outer check. Similarly, when code assigns a value in a conditional and then immediately tests it, the second test is eliminated:

```csharp
if (x > 0)
{
    if (x > 1) S();  // The outer x > 0 check is folded away.
}

int y = condition ? 1 : 2;
if (y == 1) A(); else B();  // The y == 1 test is eliminated;
                             // each branch of the ternary goes directly to A() or B().
```

These optimizations are most visible after inlining, where guards from different methods land in the same compiled body.

## Hardware intrinsics and code generation

.NET 11 includes several new hardware intrinsics and code generation improvements:

- **Hardware FP16 instructions for `Half` arithmetic and conversions:** The JIT uses hardware FP16 instructions for `System.Half` arithmetic and conversions when the processor supports them. On x64, arithmetic uses AVX10.1, while conversions between `Half` and `float` can use F16C (available on most AVX2-capable hardware). On Arm64, arithmetic uses the optional FP16 instruction set, while conversions between `Half` and `float` or `double` use baseline Arm64 instructions. The optimization requires no application changes and preserves the existing ABI representation of `Half`.
- **Better cost modeling for x86/x64 SIMD:** The JIT's floating-point execution and size costs previously reflected x87-era assumptions. Updated costs that reflect modern SSE/AVX hardware let the JIT make better decisions about hoisting and common subexpression elimination (CSE) around SIMD code.
- **Faster `DotProduct` on AVX:** Lowering for `Vector128.Dot`-style operations now emits a `mul + permute + add` sequence instead of `vdpps`/`vdppd` when AVX is available, which is consistently faster.
- **Faster `IndexOfAnyAsciiSearcher` on Arm64:** Arm64 versions of `Vector*.Count`, `IndexOf`, and `LastIndexOf` no longer route through `ExtractMostSignificantBits`, yielding a 5–50% improvement in workloads that use these APIs in their core loop.
- **Arm64 `ToScalar` for 64-bit integers:** `ToScalar` on `Vector*<long>` and `Vector*<ulong>` now uses `fmov` instead of `umov`, which is shorter and faster on most cores.
- **SVE `CreateWhile` API expansion:** `CreateWhile` gains signed, `double`, and `single` variants alongside the existing unsigned ones, completing the predicate-generation surface for SVE loops.
- **New SVE2 and Arm64 instruction-set detection:** The runtime now reports `SVE_AES`, `SVE_SHA3`, `SVE_SM4`, `SHA3`, and `SM4` as separate instruction sets, allowing `Sve2*.IsSupported` queries for those features on capable hardware.
- **AVX10 detection fix:** The CPUID-bit cache for AVX10 was being overwritten by a later query, which could cause AVX10 to be misreported on capable hardware. This is now fixed.

## ReadyToRun improvements

`Comparer<T>.Default` and `EqualityComparer<T>.Default` are now specialized in ReadyToRun (R2R) images. Previously, the default comparers used reflection that R2R couldn't see ahead of time, causing callers to fall back to the JIT. R2R now generates a specialized helper in the image—mirroring the NativeAOT approach—and benchmarks show up to a 20× improvement for collections operations that rely on the default comparer.

## VM improvements

- **Cached interface dispatch on non-JIT platforms:** On platforms that lack JIT support, such as iOS, interface dispatch was falling back to an expensive generic fixup path. Cached dispatch yields up to 200x improvements in interface-heavy code on these targets.
- **`Guid.NewGuid()` on Linux:** `System.Guid.NewGuid` on Linux now uses the `getrandom()` syscall with batch caching instead of reading from `/dev/urandom`, yielding approximately 12% throughput improvement for GUID generation.

## WebAssembly improvements

Browser and WebAssembly support has several improvements:

- **WebCIL payload loading:** The runtime can now load WebCIL payloads directly, improving compatibility with browser-based deployment scenarios.
- **Better debugging symbols:** Symbol and stack trace quality for WebAssembly debugging has improved, making it easier to diagnose issues in browser-hosted .NET apps.
- **`float[]`, `Span<float>`, and `ArraySegment<float>` marshaling:** `float[]`, `Span<float>`, and `ArraySegment<float>` are now marshaled more directly across JavaScript boundaries, reducing overhead for interop-heavy code.

.NET includes improvements to CoreCLR-on-WebAssembly:

- **WebCIL V1 is the default for CoreCLR WASM builds:** The shared WebCIL header gains a `TableBase` field (28 → 32 bytes). Both Mono and CoreCLR readers accept V0 and V1. Crossgen2's `WasmObjectWriter` produces V1 directly, and CoreCLR-flavored WASM SDK builds default `WasmWebcilVersion` to `V1`.
- **Native re-link works for CoreCLR WASM apps:** A full Emscripten-based pipeline replaces the previous stub targets. Re-linking `dotnet.native.wasm` from the runtime pack and including custom native code via `NativeFileReference` now works.
- **JavaScript minification in Release builds:** Browser CoreCLR Release builds ship minified JavaScript.
- **NativeAOT publish for WASM no longer drops package satellites:** Satellite assemblies from NuGet packages are now passed to ILC and pruned from the publish output, fixing localization for AOT-published apps that depend on packages such as `System.CommandLine`.

CoreCLR on WebAssembly now runs the libraries test suite end to end.

## Platform support for more than 1024 CPUs

The .NET runtime can now initialize on machines with more than 1024 logical processors. Previously, `sched_getaffinity` was called with the default `cpu_set_t` (capped at 1024), causing initialization to fail on high-core-count servers. The runtime now allocates the CPU set dynamically. The GC retains its 1024-heap limit, but the CPU count limit is removed.

## In-process crash report logging

A new in-process crash reporting mechanism captures diagnostic information from within the crashing process before it terminates. Previously, crash diagnostics were collected by an out-of-process monitor. While the out-of-process approach is safe, it can miss information that's only available inside the dying process. The new in-process path logs the managed stack trace, module list, and key <example-value> state to a well-known path before the process exits.

This capability originated on mobile platforms and is now also available on Linux and macOS. When `DOTNET_DbgEnableMiniDump` isn't enabled, set `DOTNET_EnableCrashReport=1` or `DOTNET_EnableCrashReportOnly=1` to select the in-process reporter. Existing `createdump` behavior remains in place when minidumps are enabled.

## NativeAOT: faster interface dispatch

NativeAOT now uses a dispatch helper for interface method calls. Instead of a direct fat-pointer call sequence, the runtime routes interface dispatch through a shared helper that can be patched to the correct implementation after the call site warms up. This reduces the binary size of interface call sites and improves throughput on workloads with many interface method calls.

Generic virtual method dispatch also uses the shared dispatch-cell infrastructure, which improves both monomorphic and polymorphic call performance. In addition, `System.Reflection.Assembly.GetCallingAssembly` now works on NativeAOT when stack trace data is available.

## SIMD lane construction and composition

`System.Runtime.Intrinsics` now includes lane construction and composition APIs for hardware vector types. The new APIs let you construct a vector from individually specified lanes and extract or reorder lanes between vectors. This enables precise, portable control over SIMD vector element placement without falling back to platform-specific intrinsics.

The new methods fall into a few families:

- **Patterned construction:** `CreateGeometricSequence`, `CreateAlternatingSequence`, and `CreateHarmonicSequence` build a vector from a starting value and a rule.
- **Interleave and de-interleave:** `Zip`, `ZipLower`/`ZipUpper`, `Unzip`, `UnzipEven`/`UnzipOdd`.
- **Rearrange:** The `Concat` family (`ConcatLowerLower`, `ConcatLowerUpper`, `ConcatUpperLower`, `ConcatUpperUpper`) and `Reverse`.

```csharp
using System.Runtime.Intrinsics;

// {1, 2, 4, 8} — each lane is the previous lane times two
Vector128<int> powers = Vector128.CreateGeometricSequence(1, 2);

// Interleave two vectors lane-by-lane
(Vector128<int> lower, Vector128<int> upper) =
    Vector128.Zip(Vector128.Create(1), Vector128.Create(2));
```

These APIs are available on `Vector128<T>`, `Vector256<T>`, `Vector512<T>`, `Vector64<T>`, and `Vector<T>`. They're building blocks for image processing, audio digital signal processing (DSP), and other SIMD-intensive workloads that need fine-grained control over vector element layout.
