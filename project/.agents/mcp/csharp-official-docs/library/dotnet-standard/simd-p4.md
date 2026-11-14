---
title: "Use SIMD and hardware intrinsics in .NET (part 4 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/simd.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Use SIMD and hardware intrinsics in .NET (part 4 of 4)

### Load and store vectors safely

For most code, `Vector128.Create(span)` and `System.Runtime.Intrinsics.Vector128.CopyTo*` are the simplest way to move data between a span and a vector, and the JIT keeps them efficient. When you need the lower-level load and store—for example, to walk a buffer by managed reference—prefer the `System.Runtime.Intrinsics.Vector128.LoadUnsafe*` and `System.Runtime.Intrinsics.Vector128.StoreUnsafe*` overloads that take a managed reference and an `nuint` element offset. Unlike the pointer-based `Load`/`Store` overloads, they don't require pinning the buffer, and unlike raw reference arithmetic, they don't need you to manually advance a `ref`. Both alternatives are easy to get wrong in ways that introduce garbage-collector holes or access violations.

So that empty buffers don't throw, get the starting reference from `System.Runtime.InteropServices.MemoryMarshal.GetReference*` (or `System.Runtime.InteropServices.MemoryMarshal.GetArrayDataReference*` for arrays) rather than `ref span[0]`.

> **Important:**
> Offset arithmetic uses unsigned `nuint`. Always check the buffer length before computing an offset such as `buffer.Length - Vector128<int>.Count`. If the buffer is smaller than one vector, that subtraction underflows to a huge value and the loop reads invalid memory.

## Platform-specific hardware intrinsics

When a specific processor instruction gives you an edge that the portable APIs don't expose, reach for the hardware intrinsics in `System.Runtime.Intrinsics.X86`, `System.Runtime.Intrinsics.Arm`, and `System.Runtime.Intrinsics.Wasm`. Each intrinsic class has an `IsSupported` property (also a JIT constant) so you can guard the specialized path and fall back to portable code elsewhere:

```csharp
// Illustrates per-platform lightup. The portable '(vector & mask) == Zero' below
// already lowers optimally, so prefer it unless a specific instruction measurably wins.
public static bool AllBitsClear(Vector128<byte> vector, Vector128<byte> mask)
{
    if (Sse41.IsSupported)
    {
        // x86/x64: a single ptest instruction.
        return Sse41.TestZ(vector, mask);
    }
    else if (AdvSimd.Arm64.IsSupported)
    {
        // Arm64: AND, then reduce the maximum byte across every lane.
        Vector128<byte> anded = AdvSimd.And(vector, mask);
        return AdvSimd.Arm64.MaxAcross(anded).ToScalar() == 0;
    }
    else if (PackedSimd.IsSupported)
    {
        // WebAssembly: AND, then test whether any lane is non-zero.
        return !PackedSimd.AnyTrue(PackedSimd.And(vector, mask));
    }
    else
    {
        // Portable fallback for any other platform.
        return (vector & mask) == Vector128<byte>.Zero;
    }
}
```
The preceding method shows how to light up per-architecture code paths when you want them, but it's deliberately a simple example: you don't actually need it here. The portable expression `(vector & mask) == Vector128<byte>.Zero` already lowers to the optimal instruction on each platform (for example, `ptest` on x86/x64), so it's doing the same work as the hand-written branches, just without the complexity. Reach for explicit intrinsics only when a specific instruction measurably beats what the portable APIs generate.

Hardware intrinsics require a separate implementation per instruction set, so treat them as an optimization for measured hot paths rather than a default. The `Vector128`/`Vector256` APIs already lower to efficient instructions on each platform, and in practice sophisticated per-instruction code doesn't always win. Confirm the difference with a benchmark before committing to the extra maintenance.

## Higher-level math with TensorPrimitives

If you need vectorized math over spans and don't want to write the loops yourself, `System.Numerics.Tensors.TensorPrimitives` provides a large set of numeric operations—element-wise arithmetic, exponentials, and reductions such as dot product and cosine similarity—that are already vectorized internally. It's available in the System.Numerics.Tensors NuGet package.

```csharp
// Computes result = (left * right) + addend over the whole span, vectorized internally.
public static float[] MultiplyAdd(float[] left, float[] right, float[] addend)
{
    float[] result = new float[left.Length];

    TensorPrimitives.Multiply(left, right, result);
    TensorPrimitives.Add(result, addend, result);

    return result;
}

// Higher-level reductions are available too.
public static float CosineSimilarity(float[] left, float[] right) =>
    TensorPrimitives.CosineSimilarity(left, right);
```
For AI and numeric workloads, `TensorPrimitives` often delivers most of the benefit of hand-written SIMD with none of the complexity.

## Test all code paths

Because a vectorized method has several code paths, tests need to cover each one: the `Vector256` path, the `Vector128` path, and the scalar path, each with inputs both large enough and too small to benefit. You can vary the input size in tests, but you can't toggle hardware acceleration at the test level. Instead, control it with environment variables before the process starts:

- Set `DOTNET_EnableAVX2=0` to make `System.Runtime.Intrinsics.Vector256.IsHardwareAccelerated` return `false`.
- Set `DOTNET_EnableHWIntrinsic=0` to disable intrinsics entirely, so `Vector128`, `Vector64`, and `Vector<T>` all report no acceleration.

To exercise every path on a single machine, run the test suite once with no overrides, once with `DOTNET_EnableAVX2=0`, and once with `DOTNET_EnableHWIntrinsic=0`. The alternative is running across enough varied hardware to cover them.

### Instruction-set configuration knobs

Beyond those two, the runtime recognizes a knob per logical grouping of instruction sets, each prefixed with `DOTNET_`. A single knob can cover several related instruction sets—`EnableAVX2`, for instance, gates AVX2 along with BMI1, BMI2, F16C, FMA, LZCNT, and MOVBE. Setting a knob to `0` disables its whole group and everything layered on top of it. Setting it to `1` (the default for most) allows the group, but the hardware must still actually support it—enabling a knob the current CPU lacks is ignored, so you can only ever narrow what's used, never force an unsupported instruction on and break yourself. `DOTNET_EnableHWIntrinsic=0` is the big hammer—it turns off everything down to the base, so `Vector128`, `Vector64`, and `Vector<T>` all report no acceleration and the code falls to its software path.

> **Important:**
> These are diagnostic tools, meant primarily for testing and validation—exercising each code path, reproducing a hardware-specific issue, or confirming a fallback. They aren't designed for general or production use, and they aren't a stability contract. The following set is what .NET 11 recognizes; earlier releases exposed a different set—the baseline and AVX-512 knobs in particular were reconfigured—so confirm the names against the runtime version you target.
>
> These tools also have limits on what they reach. Because they gate JIT decisions, they don't affect code that was already compiled ahead of time through ReadyToRun or Native AOT, and they don't necessarily affect internal routines the runtime and core libraries use themselves. Treat them as a way to steer your own JIT-compiled code, not a global off switch for an instruction set.

The base switch and the width caps apply on every architecture:

| Knob (`DOTNET_` prefix) | Default | Effect |
| --- | --- | --- |
| `EnableHWIntrinsic` | `1` | Master switch for all hardware intrinsics; `0` forces the fully software path. |
| `MaxVectorTBitWidth` | system default | Caps `Vector<T>` to a maximum width in bits; a value below 128 means the system default. |
| `PreferredVectorBitWidth` | system default | Caps the maximum fixed-width vector that reports `IsHardwareAccelerated`, in bits; a value below 128 means the system default. |

The system default for `MaxVectorTBitWidth` can be narrower than the hardware fully supports, so `Vector<T>` doesn't automatically grow to the widest available vector. For example, `Vector512<T>.IsHardwareAccelerated` can be `true` while `Vector<T>` stays 256-bit; set `DOTNET_MaxVectorTBitWidth=512` to opt `Vector<T>` into the wider width.

`PreferredVectorBitWidth` caps the maximum vector width that reports `IsHardwareAccelerated`. Lowering it below what the hardware supports flips the wider widths off: on a machine that supports 512-bit vectors, `DOTNET_PreferredVectorBitWidth=256` makes `Vector512<T>.IsHardwareAccelerated` report `false`. It's a general knob, but only x86/x64 offers widths above 128 today, so that's the only place it has an observable effect.

Each logical grouping of x86/x64 instruction sets also has its own switch:

| Knob (`DOTNET_` prefix) | Default | Gates |
| --- | --- | --- |
| `EnableAVX` | `1` | AVX and dependents |
| `EnableAVX2` | `1` | AVX2, BMI1, BMI2, F16C, FMA, LZCNT, MOVBE, and dependents |
| `EnableAVX512` | `1` | AVX-512 F+BW+CD+DQ+VL and dependents |
| `EnableAVX512BMM` | `1` | AVX-512 BMM |
| `EnableAVX512v2` | `1` | AVX-512 IFMA+VBMI |
| `EnableAVX512v3` | `1` | AVX-512 BITALG+VBMI2+VPOPCNTDQ+VNNI |
| `EnableAVX10v1` | `1` | AVX10.1 |
| `EnableAVX10v2` | `0` | AVX10.2 |
| `EnableAPX` | `0` | APX (extended general-purpose registers) |
| `EnableAES` | `1` | AES, PCLMULQDQ |
| `EnableAVX512VP2INTERSECT` | `1` | AVX-512 VP2INTERSECT |
| `EnableAVXIFMA` | `1` | AVX-IFMA |
| `EnableAVXVNNI` | `1` | AVX-VNNI |
| `EnableAVXVNNIINT` | `1` | VEX AVX-VNNI-INT8 and AVX-VNNI-INT16 |
| `EnableGFNI` | `1` | GFNI |
| `EnableSHA` | `1` | SHA |
| `EnableVAES` | `1` | VAES, VPCLMULQDQ |
| `EnableWAITPKG` | `1` | WAITPKG |
| `EnableX86Serialize` | `1` | X86 SERIALIZE |

On Arm64, each logical grouping of instruction sets has its own switch:

| Knob (`DOTNET_` prefix) | Default | Gates |
| --- | --- | --- |
| `EnableArm64Aes` | `1` | AES |
| `EnableArm64Atomics` | `1` | Large System Extensions (LSE) atomics |
| `EnableArm64Crc32` | `1` | CRC32 |
| `EnableArm64Dczva` | `1` | `DC ZVA` cache-zeroing |
| `EnableArm64Dp` | `1` | Dot Product |
| `EnableArm64Rdm` | `1` | Rounding Doubling Multiply Accumulate (RDM) |
| `EnableArm64Sha1` | `1` | SHA1 |
| `EnableArm64Sha256` | `1` | SHA256 |
| `EnableArm64Rcpc` | `1` | Release-Consistent, processor-consistent ordering (RCpc) |
| `EnableArm64Rcpc2` | `1` | RCpc2 |
| `EnableArm64Cssc` | `0` | Common Short Sequence Compression (CSSC) |
| `EnableArm64Sve` | `1` | Scalable Vector Extension (SVE) |
| `EnableArm64Sve2` | `1` | SVE2 |
| `EnableArm64Sha3` | `1` | SHA3 |
| `EnableArm64Sm4` | `1` | SM4 |
| `EnableArm64SveAes` | `1` | SVE AES |
| `EnableArm64SveSha3` | `1` | SVE SHA3 |
| `EnableArm64SveSm4` | `1` | SVE SM4 |

A knob defaulting to `0` (for example, `EnableAVX10v2` or `EnableArm64Cssc`) gates an instruction set that's still coming online, so it stays off until you opt in.

## Benchmark to confirm the win

Vectorization adds complexity, so measure that it pays off before you keep it. Use BenchmarkDotNet, and use the same environment variables shown previously to compare the scalar, `Vector128`, and `Vector256` implementations in one run. BenchmarkDotNet's disassembly diagnoser can also emit the generated assembly, which is invaluable when tuning high-performance code.

A few things to keep in mind:

- **Larger inputs benefit more.** For small buffers, vectorized code can be slower than scalar code because of setup overhead. Benchmark the input sizes your callers actually use.
- **Speedups are rarely perfect.** A 256-bit vector operating on 32-bit elements won't reliably be 8x faster; memory throughput, alignment, and instruction latency all factor in.
- **Memory alignment affects stability.** Randomized allocation alignment adds noise between runs. You can allocate aligned memory with `System.Runtime.InteropServices.NativeMemory.AlignedAlloc*` for stable results, or enable BenchmarkDotNet's memory randomization to observe the full distribution.

## Best practices

- Reach for the existing higher-level APIs first. `Span<T>`, `string`, LINQ, `TensorPrimitives`, and the tensor types already accelerate many common operations for you—don't hand-roll what's already optimized and tested.
- Start with `Vector128<T>`; it's accelerated on the broadest set of hardware, and you don't need `Vector256<T>` to get a correct, portable implementation. Add wider widths and hardware intrinsics only for measured hot paths.
- Check `IsHardwareAccelerated` and `Count` directly instead of caching them; the JIT turns them into constants.
- Always handle the loop remainder, and account for overlapping source and destination buffers when storing.
- Write edge-case tests first, then a scalar solution, then express that scalar logic with the vector APIs.
- Test every code path (including access violations) and benchmark realistic input sizes before you commit to the added complexity.

## See also

- `System.Runtime.Intrinsics`
- `System.Numerics.Tensors.TensorPrimitives`
