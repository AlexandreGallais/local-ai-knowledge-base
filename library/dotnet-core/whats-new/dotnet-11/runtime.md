---
title: "What's new in .NET 11 runtime (part 1 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/whats-new/dotnet-11/runtime.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# What's new in the .NET 11 runtime

This article describes new features in the .NET runtime for .NET 11. It was last updated for the general availability (GA) release.

## Updated minimum hardware requirements

The minimum hardware requirements for .NET 11 have been updated to require more modern instruction sets on both x86/x64 and Arm64 architectures. Additionally, the ReadyToRun (R2R) compilation targets have been updated to take advantage of newer hardware capabilities.

### Arm64 requirements

For Apple, there's no change to the minimum hardware or the ReadyToRun target. The Apple M1 chips are approximately equivalent to `armv8.5-a` and provide support for at least the `AdvSimd` (NEON), `CRC`, `DOTPROD`, `LSE`, `RCPC`, `RCPC2`, and `RDMA` instruction sets.

For Linux, there's no change to the minimum hardware. .NET continues to support devices such as Raspberry Pi that might only provide support for the `AdvSimd` instruction set. The ReadyToRun target has been updated to include the `LSE` instruction set, which might result in additional jitting overhead if you launch an application.

For Windows, the baseline is updated to require the `LSE` instruction set. This is required by Windows 11 and by all Arm64 CPUs officially supported by Windows 10. Additionally, it's inline with the Arm SBSA (Server Base System Architecture) requirements. The ReadyToRun target has been updated to be `armv8.2-a + RCPC`, which provides support for at least `AdvSimd`, `CRC`, `LSE`, `RCPC`, and `RDMA`, and covers the majority of hardware officially supported.

| OS      | Previous JIT/AOT minimum | New JIT/AOT minimum | Previous R2R target | New R2R target   |
|---------|--------------------------|---------------------|---------------------|------------------|
| Apple   | Apple M1                 | (No change)         | Apple M1            | (No change)      |
| Linux   | armv8.0-a                | (No change)         | armv8.0-a           | armv8.0-a + LSE  |
| Windows | armv8.0-a                | armv8.0-a + LSE     | armv8.0-a           | armv8.2-a + RCPC |

### x86/x64 requirements

For all three operating systems (Apple, Linux, and Windows), the baseline is updated from `x86-64-v1` to `x86-64-v2`. This changes the hardware from only guaranteeing `CMOV`, `CX8`, `SSE`, and `SSE2` to also guaranteeing `CX16`, `POPCNT`, `SSE3`, `SSSE3`, `SSE4.1`, and `SSE4.2`. This guarantee is required by Windows 11 and by all x86/x64 CPUs officially supported on Windows 10. It includes all chips still officially supported by Intel and AMD, with the last older chips having gone out of support around 2013.

The ReadyToRun target has been updated to `x86-64-v3` for Windows and Linux, which additionally includes the `AVX`, `AVX2`, `BMI1`, `BMI2`, `F16C`, `FMA`, `LZCNT`, and `MOVBE` instruction sets. The ReadyToRun target for Apple remains unchanged.

| OS      | Previous JIT/AOT minimum | New JIT/AOT minimum | Previous R2R target | New R2R target |
|---------|--------------------------|---------------------|---------------------|----------------|
| Apple   | x86-64-v1                | x86-64-v2           | x86-64-v2           | (No change)    |
| Linux   | x86-64-v1                | x86-64-v2           | x86-64-v2           | x86-64-v3      |
| Windows | x86-64-v1                | x86-64-v2           | x86-64-v2           | x86-64-v3      |

### Impact

Starting with .NET 11, .NET fails to run on older hardware and might print a message similar to the following:

> The current CPU is missing one or more of the baseline instruction sets.

For ReadyToRun-capable assemblies, there might be additional startup overhead on some supported hardware that doesn't meet the expected support for a typical device.

### Reason for change

.NET supports a broad range of hardware, often above and beyond the minimum hardware requirements put in place by the underlying operating system. This support adds significant complexity to the codebase, particularly for much older hardware that's unlikely to still be in use. Additionally, it defines a "lowest common denominator" that AOT targets must default to, which can, in some scenarios, lead to reduced performance.

The update to the minimum baseline was made to reduce the maintenance complexity of the codebase and to better align with the documented (and often enforced) hardware requirements of the underlying operating system.

For more information, see Minimum hardware requirements updated.

## Runtime Async

.NET 11 introduces runtime-native async (Runtime Async V2), a significant step toward replacing compiler-generated async state machines with runtime-managed suspension and resumption. Instead of the compiler emitting state-machine classes, the runtime itself tracks async execution, producing cleaner stack traces, better debuggability, and lower overhead.

To enable Runtime Async in a project that targets `net11.0`, add the following property to your project file:

```xml
<PropertyGroup>
  <Features>runtime-async=on</Features>
</PropertyGroup>
```

A `net11.0` project no longer requires `<EnablePreviewFeatures>true</EnablePreviewFeatures>` to use Runtime Async.

The .NET runtime libraries themselves are compiled with `runtime-async=on`. The runtime libraries no longer contain compiler-generated state machines and rely entirely on runtime-provided async. This makes it possible to migrate an entire app (with only library dependencies) to the new model, and it provides broad functional and performance validation of the feature. The product team welcomes any reports—positive or negative—about throughput and library size changes you observe.

.NET 11 also includes two additional improvements:

- **Covariant `Task` → `Task<T>` overrides:** When a derived class returns `Task<T>` for a base method that returns `Task`, the runtime now generates a void-returning thunk that bridges the calling convention difference, so virtual dispatch works for both flavors. The same fix applies to NativeAOT.
- **Inlining in crossgen2:** Restrictions that prevented runtime-async methods from being inlined during ReadyToRun (R2R) compilation have been removed. All async tests pass with both crossgen2 and composite R2R, and inlining of await-less async calls (the synchronous fast path) is confirmed end-to-end.

> **Note:**
> The `DOTNET_RuntimeAsync` and `UNSUPPORTED_RuntimeAsync` environment variables that previously controlled runtime-async behavior have been removed. To opt out of runtime-async per project, set `<UseRuntimeAsync>false</UseRuntimeAsync>` in your project file instead of relying on the environment variable.

### Cleaner live stack traces

The most visible improvement is in *live stack traces*—what profilers, debuggers, and `new StackTrace()` see during execution. With compiler-generated async, each async method produces multiple frames from state-machine infrastructure. With Runtime Async, the actual methods appear directly on the call stack.

```csharp
// To enable runtime async, add the following to your .csproj:
//   <Features>runtime-async=on</Features>

await OuterAsync();

static async Task OuterAsync()
{
    await Task.CompletedTask;
    await MiddleAsync();
}

static async Task MiddleAsync()
{
    await Task.CompletedTask;
    await InnerAsync();
}

static async Task InnerAsync()
{
    await Task.CompletedTask;
    Console.WriteLine(new StackTrace(fNeedFileInfo: true));
}
```
**Without `runtime-async`—13 frames, state-machine infrastructure visible:**

```text
   at Program.<<Main>$>g__InnerAsync|0_2() in Program.cs:line 24
   at System.Runtime.CompilerServices.AsyncMethodBuilderCore.Start[TStateMachine](...)
   at Program.<<Main>$>g__InnerAsync|0_2()
   at Program.<<Main>$>g__MiddleAsync|0_1() in Program.cs:line 14
   at System.Runtime.CompilerServices.AsyncMethodBuilderCore.Start[TStateMachine](...)
   at Program.<<Main>$>g__MiddleAsync|0_1()
   at Program.<<Main>$>g__OuterAsync|0_0() in Program.cs:line 8
   at System.Runtime.CompilerServices.AsyncMethodBuilderCore.Start[TStateMachine](...)
   at Program.<<Main>$>g__OuterAsync|0_0()
   at Program.<Main>$(String[] args) in Program.cs:line 3
   at System.Runtime.CompilerServices.AsyncMethodBuilderCore.Start[TStateMachine](...)
   at Program.<Main>$(String[] args)
   at Program.<Main>(String[] args)
```

**With `runtime-async`—5 frames, the real call chain:**

```text
   at Program.<<Main>$>g__InnerAsync|0_2() in Program.cs:line 24
   at Program.<<Main>$>g__MiddleAsync|0_1() in Program.cs:line 14
   at Program.<<Main>$>g__OuterAsync|0_0() in Program.cs:line 8
   at Program.<Main>$(String[] args) in Program.cs:line 3
   at Program.<Main>(String[] args)
```

> **Note:**
> Exception stack traces (from `catch (Exception ex)`) already look the same with or without Runtime Async, because existing `ExceptionDispatchInfo` cleanup in compiler-generated code handles that case. The improvement is in what you see *during* live execution.

This improvement benefits anything that inspects the live execution stack, including profiling tools, diagnostic logging, and the debugger call stack window.

### NativeAOT and ReadyToRun support

Runtime Async supports NativeAOT and ReadyToRun compilation. This extends the feature beyond JIT-compiled code to ahead-of-time compiled scenarios. The runtime also reuses continuation objects more aggressively and avoids saving unchanged locals, reducing allocation pressure in async-heavy code.

### Debugging improvements

Breakpoints now bind correctly inside runtime-async methods, and the debugger can step through `await` boundaries without jumping into compiler-generated infrastructure.

### Runtime Async performance improvements

Runtime Async includes several performance improvements:

- **JIT async support:** The JIT compiles a dedicated runtime-async version of a synchronous, task-returning method rather than delegating through a thunk. The JIT turns the method's tail calls into runtime-async calls and awaits the task that would otherwise be returned, eliminating an extra layer of indirection.
- **Tail-merged suspension points:** The JIT tail-merges async suspension points so generated code is smaller.
- **Cached continuations:** Continuations used for runtime-async callable task thunks are cached and reused.
- **Pooled methods opt out:** Methods that are already pooled opt out of runtime-async, avoiding redundant work.
- **Tiered async compilation:** Async versions now flow through tiered compilation, so hot async methods get tier 1 optimizations after warm-up.
- **Task and ValueTask factory intrinsics:** The JIT recognizes common factories, such as `Task.FromResult`, `Task.CompletedTask`, and `ValueTask.FromResult`, and folds them into faster async paths.
- **Tail-await optimizations:** Implicit tailcalls from async methods are enabled again when the method directly returns another async result, and `await Task.Yield()` avoids extra allocations in runtime-async paths.

#### Async continuations without ExecutionContext

Async continuations can now opt out of `ExecutionContext` capture and restore. `ExecutionContext` carries ambient state—such as `AsyncLocal<T>` values—across `await` points. Every `Task` continuation previously captured a snapshot of the context and restored it before running, even when no `AsyncLocal<T>` state was in use and the restore was a no-op.

The runtime now detects when a continuation has nothing to restore and skips the capture/restore cycle entirely. `Task`, `Task<T>`, `ValueTask`, and `ValueTask<T>` all benefit from this change, as does the runtime-async implementation path. Applications that use `ConfigureAwait(false)` and `AsyncLocal<T>` sparingly see reduced overhead in high-throughput async code paths.
