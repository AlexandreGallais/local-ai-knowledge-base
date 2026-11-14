---
title: "Use SIMD and hardware intrinsics in .NET (part 3 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/simd.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Use SIMD and hardware intrinsics in .NET (part 3 of 4)

### Structure the code path

A vectorized method typically fans out into a path per vector width plus a scalar fallback for small inputs and non-accelerated hardware. To use the largest vector the hardware supports, check the widest vector first and work down:

```csharp
// Sums a buffer, choosing the widest vector the hardware and element type support.
public static T Sum<T>(ReadOnlySpan<T> buffer)
    where T : unmanaged, INumberBase<T>
{
    // The widest-first order continues with the Vector512 and Vector256 paths, which belong
    // here ahead of the Vector128 block below. They're identical to it aside from the wider
    // type (for example, Vector512<T> with Vector512.Create and Vector512.Sum), so they're
    // omitted for brevity:
    //
    // if (Vector512.IsHardwareAccelerated && Vector512<T>.IsSupported)
    // {
    //     if (buffer.Length >= Vector512<T>.Count)
    //     {
    //         return SumVector512(buffer);
    //     }
    //     return SumVectorSmall(buffer);
    // }
    //
    // if (Vector256.IsHardwareAccelerated && Vector256<T>.IsSupported)
    // {
    //     if (buffer.Length >= Vector256<T>.Count)
    //     {
    //         return SumVector256(buffer);
    //     }
    //     return SumVectorSmall(buffer);
    // }

    if (Vector128.IsHardwareAccelerated && Vector128<T>.IsSupported)
    {
        if (buffer.Length >= Vector128<T>.Count)
        {
            return SumVector128(buffer);
        }
        return SumVectorSmall(buffer);
    }

    return SumScalar(buffer);
}
```
Each width's outer guard combines `Vector128.IsHardwareAccelerated` (a JIT-time constant for whether the platform accelerates that width) with `Vector128<T>.IsSupported` (whether the element type `T` is valid for that width). Inside a supported block, compare the input length against `Count` to choose between the vectorized path and a small-input fallback. The method is generic over `T`, and the `Vector256` and `Vector512` blocks—identical to the `Vector128` block but using the wider type—are shown commented out for brevity.

There are two distinct fallbacks. A buffer that's too small for even the narrowest vector, but on accelerated hardware, goes to `SumVectorSmall`—an explicit `switch` jump table that handles each possible sub-vector length without a loop:

```csharp
// Sums a buffer smaller than the widest vector. The complete "optimal" shape dispatches on the
// element width so each width uses a switch jump table sized to the number of elements that fit
// in the widest vector (63 for byte, 31 for short, 15 for int/float, 7 for long/double).
private static T SumVectorSmall<T>(ReadOnlySpan<T> buffer)
    where T : unmanaged, INumberBase<T>
{
    // sizeof(T) is a JIT constant, so only the matching branch survives for a given T.
    if (sizeof(T) == 4)
    {
        return SumVectorSmall4(buffer);
    }

    // The 1-, 2-, and 8-byte tables share the shape below, sized for their element width.
    // They're omitted for brevity, so those widths fall back to a scalar loop here:
    //
    // if (sizeof(T) == 1) return SumVectorSmall1(buffer); // switch over lengths 0..63
    // if (sizeof(T) == 2) return SumVectorSmall2(buffer); // switch over lengths 0..31
    // if (sizeof(T) == 8) return SumVectorSmall8(buffer); // switch over lengths 0..7
    return SumScalar(buffer);
}

private static T SumVectorSmall4<T>(ReadOnlySpan<T> buffer)
    where T : unmanaged, INumberBase<T>
{
    Debug.Assert(sizeof(T) == 4);
    Debug.Assert(buffer.Length < Vector512<T>.Count);

    T result = T.Zero;

    // A 4-byte element gives Count == 4/8/16 for Vector128/256/512, so a remainder can be up to
    // 15 elements. The larger cases fold the leftover with the widest vector that fits, using two
    // overlapping loads (one from the start, one from the end) rather than recursing—the shape
    // TensorPrimitives uses. The loads overlap for lengths that aren't an exact multiple of the
    // width, so the tail is masked down to the additive identity before it's summed. That mask is
    // only needed because addition is non-idempotent; an idempotent operation such as a search
    // could fold the overlapping tail in directly.
    switch (buffer.Length)
    {
        // One or two Vector256's worth of data.
        case 15:
        case 14:
        case 13:
        case 12:
        case 11:
        case 10:
        case 9:
        case 8:
        {
            Vector256<T> beg = Vector256.Create(buffer);
            Vector256<T> end = Vector256.Create(buffer.Slice(buffer.Length - Vector256<T>.Count));

            Vector256<T> msk = CreateRemainderMask256<T>(buffer.Length - Vector256<T>.Count);
            end = Vector256.ConditionalSelect(msk, end, Vector256<T>.Zero);

            result = Vector256.Sum(beg + end);
            break;
        }

        // One or two Vector128's worth of data.
        case 7:
        case 6:
        case 5:
        case 4:
        {
            Vector128<T> beg = Vector128.Create(buffer);
            Vector128<T> end = Vector128.Create(buffer.Slice(buffer.Length - Vector128<T>.Count));

            Vector128<T> msk = CreateRemainderMask128<T>(buffer.Length - Vector128<T>.Count);
            end = Vector128.ConditionalSelect(msk, end, Vector128<T>.Zero);

            result = Vector128.Sum(beg + end);
            break;
        }

        // Smaller than a single vector: each case falls through to the next, accumulating one
        // element per label.
        case 3:
        {
            result += buffer[2];
            goto case 2;
        }

        case 2:
        {
            result += buffer[1];
            goto case 1;
        }

        case 1:
        {
            result += buffer[0];
            goto case 0;
        }

        case 0:
        {
            break;
        }
    }

    return result;
}

// Builds a mask whose last `keepLast` lanes are all-bits-set and the rest zero, so an overlapping
// tail load can be folded in without double-counting the lanes the head already covered.
// TensorPrimitives uses an internal table-based helper. The mask is only a bit pattern keyed on
// lane width, so it's built with the same-width integer Indices ([0, 1, 2, ...]) and reinterpreted
// to T: integer comparisons are cheaper than floating-point ones, so a float/double table would
// still compare as int/long rather than in its own element type.
private static Vector256<T> CreateRemainderMask256<T>(int keepLast)
    where T : unmanaged, INumberBase<T>
{
    Debug.Assert(sizeof(T) == 4);

    Vector256<int> firstKept = Vector256.Create(Vector256<int>.Count - keepLast);
    return Vector256.GreaterThanOrEqual(Vector256<int>.Indices, firstKept).As<int, T>();
}

private static Vector128<T> CreateRemainderMask128<T>(int keepLast)
    where T : unmanaged, INumberBase<T>
{
    Debug.Assert(sizeof(T) == 4);

    Vector128<int> firstKept = Vector128.Create(Vector128<int>.Count - keepLast);
    return Vector128.GreaterThanOrEqual(Vector128<int>.Indices, firstKept).As<int, T>();
}
```
`sizeof(T)` is also a JIT-time constant, so `SumVectorSmall` dispatches on the element width to a table sized for the widest vector's worth of elements—the same approach `System.Numerics.Tensors.TensorPrimitives` uses. (When the new memory safety model is enabled, `sizeof(T)` expressions on a type parameter with the `unmanaged` constraint is allowed in safe code.) Only the 4-byte table is shown; the 1-byte, 2-byte, and 8-byte tables share its shape. Its larger cases fold the leftover with a `Vector256` or `Vector128` using two overlapping loads—one from the start, one from the end—so the wider-remainder handling for the omitted `Vector512`/`Vector256` paths lives right in the jump table. The two loads overlap whenever the length isn't an exact multiple of the width, so the tail is masked to the additive identity with `ConditionalSelect` before it's summed. That mask is only needed because addition is non-idempotent; an idempotent operation such as a search could fold the overlapping tail in directly. A buffer on hardware with no vectorization at all falls through to `SumScalar`, an ordinary scalar loop.

### Loop over the input and handle the remainder

To process a buffer larger than a single vector, loop over it a vector at a time, then handle the leftover elements that don't fill a full vector. The robust way to handle that tail is to reprocess the last full vector's worth of elements, overlapping some the loop already handled—which avoids a separate scalar epilogue. Whether that overlap needs correcting depends on the operation.

A **non-idempotent** operation such as a sum would count the overlapping elements twice, so mask them down to the operation's identity before folding them in. Use this when each element must contribute exactly once:

```csharp
// Sums a buffer with an unrolled vector loop plus a masked, jump-table remainder.
private static T SumVector128<T>(ReadOnlySpan<T> buffer)
    where T : unmanaged, INumberBase<T>
{
    Debug.Assert(Vector128.IsHardwareAccelerated && Vector128<T>.IsSupported);
    Debug.Assert(buffer.Length >= Vector128<T>.Count);

    // Preload the last full vector, overlapping the tail. Any sub-vector remainder is folded in
    // from here (masked) by case 0 of the switch below, so the loop never falls out to a separate
    // scalar tail—the same shape TensorPrimitives uses.
    Vector128<T> end = Vector128.Create(buffer.Slice(buffer.Length - Vector128<T>.Count));

    // A production implementation would also align the buffer to a vector boundary and, for
    // very large inputs, use non-temporal loads/stores so the data doesn't evict useful
    // cache lines. Both are omitted here; see TensorPrimitives for a complete treatment.

    Vector128<T> sum = Vector128<T>.Zero;

    // Only pay for the four independent accumulators when there's enough data to unroll;
    // smaller payloads skip straight to the remainder below. Four vectors per iteration lets
    // the accumulators pipeline; Vector128.Create reads the first Vector128<T>.Count elements.
    if (buffer.Length >= Vector128<T>.Count * 4)
    {
        Vector128<T> sum0 = Vector128<T>.Zero;
        Vector128<T> sum1 = Vector128<T>.Zero;
        Vector128<T> sum2 = Vector128<T>.Zero;
        Vector128<T> sum3 = Vector128<T>.Zero;

        do
        {
            sum0 += Vector128.Create(buffer);
            sum1 += Vector128.Create(buffer.Slice(Vector128<T>.Count));
            sum2 += Vector128.Create(buffer.Slice(Vector128<T>.Count * 2));
            sum3 += Vector128.Create(buffer.Slice(Vector128<T>.Count * 3));

            buffer = buffer.Slice(Vector128<T>.Count * 4);
        }
        while (buffer.Length >= Vector128<T>.Count * 4);

        // Combine pairwise so the two independent adds can pipeline.
        sum = (sum0 + sum1) + (sum2 + sum3);
    }

    // Split the remainder into its full vectors and a sub-vector tail. The full vectors fall
    // through the jump table; the tail lands in case 0, where the preloaded end is masked so only
    // the trailing elements the full vectors didn't already cover are added.
    (int blocks, int trailing) = Math.DivRem(buffer.Length, Vector128<T>.Count);

    switch (blocks)
    {
        case 3:
        {
            sum += Vector128.Create(buffer.Slice(Vector128<T>.Count * 2));
            goto case 2;
        }

        case 2:
        {
            sum += Vector128.Create(buffer.Slice(Vector128<T>.Count));
            goto case 1;
        }

        case 1:
        {
            sum += Vector128.Create(buffer);
            goto case 0;
        }

        case 0:
        {
            Vector128<T> msk = CreateRemainderMask128<T>(trailing);
            sum += Vector128.ConditionalSelect(msk, end, Vector128<T>.Zero);
            break;
        }
    }

    // Horizontally add the lanes into a single scalar.
    return Vector128.Sum(sum);
}
```
This version guards the unrolled loop with an `if`, so small payloads skip the four accumulators entirely and fall straight to the remainder. When there's enough data, a `do`/`while` accumulates four vectors per iteration into independent accumulators—which lets the processor pipeline the additions—and combines them pairwise. A `switch` jump table then folds in the remaining zero-to-three full vectors and, in `case 0`, the sub-vector tail: it reuses a full vector preloaded from the end of the buffer, overlapping the elements already processed, and masks that overlap down to the additive identity with `ConditionalSelect` so the tail stays vectorized instead of falling out to a scalar loop. As before, `Vector128.Create` reads `Vector128<T>.Count` elements from the span. The JIT elides the span's bounds check for typical access patterns, so `Create` is a fine default even in a hot loop; `LoadUnsafe` (covered next) is the lower-level alternative for when you walk the buffer by managed reference. For very large inputs, a complete implementation would also align the buffer and use non-temporal loads and stores to avoid evicting useful cache lines—both omitted here and covered fully by `TensorPrimitives`.

An **idempotent** operation such as searching for a value can reprocess the overlap harmlessly, so it folds the last vector in directly with no mask:

```csharp
// Idempotent search that re-processes the final vector instead of a scalar loop.
public static bool Contains(ReadOnlySpan<int> buffer, int searched)
{
    Debug.Assert(Vector128.IsHardwareAccelerated);

    Vector128<int> values = Vector128.Create(searched);
    ReadOnlySpan<int> remaining = buffer;

    while (remaining.Length >= Vector128<int>.Count)
    {
        if (Vector128.EqualsAny(Vector128.Create(remaining), values))
        {
            return true;
        }
        remaining = remaining.Slice(Vector128<int>.Count);
    }

    if (remaining.IsEmpty)
    {
        return false;
    }

    // A partial vector remains. When the buffer holds at least one full vector,
    // re-check the last one (overlapping the tail); otherwise scan the few elements directly.
    if (buffer.Length >= Vector128<int>.Count)
    {
        Vector128<int> tail = Vector128.Create(buffer.Slice(buffer.Length - Vector128<int>.Count));
        return Vector128.EqualsAny(tail, values);
    }

    foreach (int value in remaining)
    {
        if (value == searched)
        {
            return true;
        }
    }

    return false;
}
```
> **Warning:**
> Mishandling the remainder is a common source of bugs. A loop that reads past the end of the buffer produces non-deterministic results and can crash. The runtime's test suite uses a `BoundedMemory` helper that places a no-access page immediately after the buffer, so any out-of-bounds read throws an `System.AccessViolationException` during testing. Always cover the remainder logic, including buffers whose length isn't a multiple of the vector width.
