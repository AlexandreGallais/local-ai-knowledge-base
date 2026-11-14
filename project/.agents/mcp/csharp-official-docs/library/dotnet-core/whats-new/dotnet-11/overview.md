---
title: "What's new in .NET 11"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/whats-new/dotnet-11/overview.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# What's new in .NET 11

This article describes new features in .NET 11. It was last updated for the general availability (GA) release.

.NET 11 is generally available. You can download .NET 11 here.

## .NET runtime

The .NET 11 runtime includes:

- Updated minimum hardware requirements for x86/x64 and Arm64 architectures, requiring more modern instruction sets to improve performance and reduce maintenance complexity.
- Runtime-native async (Runtime Async), which produces cleaner stack traces and lower overhead. Runtime Async no longer requires `<EnablePreviewFeatures>true</EnablePreviewFeatures>` for projects that target `net11.0`. The runtime libraries themselves are compiled with `runtime-async=on`.
- Runtime Async performance improvements, including JIT compilation of a dedicated runtime-async version of synchronous task-returning methods, async continuations that opt out of `ExecutionContext` capture when no ambient state is in use, and tail-merged suspension points that reduce generated code size.
- Runtime Async tiered compilation, task and value-task factory intrinsics, and implicit tailcall improvements that reduce warm-up allocations and speed up common `await` paths.
- JIT improvements for bounds check elimination, redundant checked context removal, devirtualization, switch expression folding, constant-folding `SequenceEqual`, and redundant branch elimination. There are also new Arm SVE2 intrinsics, improved hardware-intrinsic cost modeling, and a faster `Math.BigMul` on x64 that emits a single `MUL` instruction.
- CoreCLR on WebAssembly now runs the libraries test suite end to end, and the runtime adds AVX-VNNI-512 hardware intrinsics for vectorized multiply-add workloads.
- In-process crash report logging that captures the managed stack trace and runtime state before the process exits, available on mobile platforms as well as Linux and macOS.
- Reliability fixes address native array marshalling, abandoned-mutex reporting for Unix named mutexes shared with older .NET processes, and process-tree termination hangs on macOS.
- NativeAOT faster interface dispatch using a shared dispatch helper, reducing binary size at call sites and improving throughput for interface-heavy workloads.
- SIMD lane construction and composition APIs (`CreateGeometricSequence`, `Zip`, `Unzip`, and the `Concat` family) across `Vector128<T>`, `Vector256<T>`, `Vector512<T>`, `Vector64<T>`, and `Vector<T>`.
- Hardware FP16 instructions for `Half` arithmetic and conversions on x64 and Arm64.
- Advisory file locking that's disabled by default on iOS and tvOS to avoid operating-system termination when an app enters the background, plus reliability fixes for Linux, assembly unloading, and Windows garbage collection.

For more information, see What's new in the .NET 11 runtime.

## .NET libraries

The .NET 11 libraries include new APIs for:

- `System.Diagnostics.Process` expansion with run-and-capture helpers, fire-and-forget launches, `Microsoft.Win32.SafeHandles.SafeProcessHandle` lifecycle methods, tighter handle control, new `System.Diagnostics.ProcessStartInfo.StartSuspended` for suspended starts, `System.Diagnostics.Process.TryGetProcessById(System.Int32,System.Diagnostics.Process@)` for safe process lookup, and `System.Diagnostics.Process.Signal(System.Runtime.InteropServices.PosixSignal)` with `System.Diagnostics.ProcessExitStatus` for signaling processes and inspecting how they exited.
- Compression, including improved Base64 APIs, new methods for ZIP archive entries, Zstandard compression in `System.IO.Compression`, CRC32 validation when reading ZIP entries, and a `Reset()` method on the streamless Deflate, ZLib, and GZip encoders and decoders. Zstandard dictionary training returns raw bytes that you pass to `System.IO.Compression.ZstandardDictionary.Create*`.
- New numeric APIs, including IEEE 754 decimal floating-point types (`System.Numerics.Decimal32`, `System.Numerics.Decimal64`, and `System.Numerics.Decimal128`), `System.Numerics.INumberBase`1.TryParsePartial*` for delimiter-aware parsing, and generic `System.Numerics.Complex`1`.
- The `System.Numerics.Tensors` package updates shape alignment and rejects unsupported overlapping storage layouts.
- System.Text.Json improvements, including C# and F# union support, JSON Lines (JSONL) output, expanded polymorphism and source generation, new naming and ignore controls, and built-in numeric converters and collection contracts.
- Built-in OpenTelemetry metrics for `Microsoft.Extensions.Caching.Memory.MemoryCache`.
- Union scaffolding (`UnionAttribute` and `IUnion`) in `System.Runtime.CompilerServices`.
- Tar archive format selection and GNU sparse format 1.0 support.
- `Console` support for the `FORCE_COLOR` environment variable.
- TLS handshake hardening, certificate-validation alerts on Linux, channel binding validation on Unix, and an experimental caller-driven TLS session API (`TlsBufferSession` and `TlsSocketSession`).
- Networking additions, including HTTP request-body compression wrappers, configurable HTTP connection eviction, and typed DNS record resolution APIs on Windows, Linux, and macOS through `System.Net.Dns` and the new `System.Net.DnsResolver` class.
- HTTP/2 automatic downgrade for Windows authentication.
- LINQ join improvements, including `FullJoin` and tuple-returning `Join` and `GroupJoin` overloads, across `System.Linq.Enumerable`, `System.Linq.Queryable`, and `System.Linq.AsyncEnumerable`.
- A new `System.Security.Cryptography.X25519DiffieHellman` class for X25519 key <example-value>, and unpadded AES Key Wrap support (`EncryptKeyWrap`/`DecryptKeyWrap`) on `System.Security.Cryptography.Aes`.
- Generic overloads on `System.Random` — `NextInteger<T>` and `NextBinaryFloat<T>` — that work with any numeric generic type.
- `System.Collections.Generic.EqualityComparer`1.Create*` factory method that creates a comparer from a key selector.
- `System.Net.Quic.QuicStream.Priority` for HTTP/3 stream prioritization.
- Video MIME type constants in `System.Net.Mime.MediaTypeNames.Video`.
- Four new `Stream` types (`ReadOnlyMemoryStream`, `WritableMemoryStream`, `ReadOnlySequenceStream`, `StringStream`) that wrap in-memory data without copying.
- `System.Collections.BitArray` constructors that accept `ReadOnlySpan<bool>`, `ReadOnlySpan<byte>`, and `ReadOnlySpan<int>`.
- Asynchronous validation in `System.ComponentModel.DataAnnotations` via `AsyncValidationAttribute`, `IAsyncValidatableObject`, and new `Validator.ValidateObjectAsync` methods, along with asynchronous `Microsoft.Extensions.Options` validation through `IAsyncStartupValidator`.
- Activity tracing configuration using rules in `Microsoft.Extensions.Diagnostics`, enabling declarative control of `Activity` tracing without wiring up `ActivityListener` instances manually.
- Cross-lane vector operations including `CreateGeometricSequence`, `Zip`, `Unzip`, and the `Concat` family on `Vector128<T>`, `Vector256<T>`, `Vector512<T>`, `Vector64<T>`, and `Vector<T>`.
- Incremental Concise Binary Object Representation (CBOR) reading with `System.Formats.Cbor.CborReader`.
- Experimental composite Module-Lattice-Based Key-Encapsulation Mechanism (ML-KEM) and Hybrid Public Key <example-value> (HPKE) APIs, plus ML-KEM recipient support in `System.Security.Cryptography.Pkcs.EnvelopedCms`.
- Hybrid Public Key <example-value> support includes managed implementations for supported suites, and asynchronous JSON Lines serialization streams entries without buffering each full entry.
- `ValidationAttribute.FormatMessage` for formatting validation messages with attribute-specific arguments.
- `SocketsHttpHandler.InitialHttp2MaxConcurrentStreams` to limit initial HTTP/2 concurrency before the server's `SETTINGS` frame arrives.
- More accurate IEEE decimal transcendental functions on `System.Numerics.Decimal32`, `System.Numerics.Decimal64`, and `System.Numerics.Decimal128`, and renamed `MemoryCache` metric attributes.

For more information, see What's new in the .NET 11 libraries.

## .NET SDK

The .NET 11 SDK includes:

- Smaller SDK installers on Linux and macOS through assembly deduplication, with additional savings by skipping crossgen for `DotnetTools`-only assemblies.
- Improved CA1873 code analyzer with reduced noise and clearer diagnostic messages.
- Support for creating and editing solution filters (`.slnf`) from the `dotnet sln` CLI.
- File-based app support for `#:include` to split apps across multiple files and to include compiled DLL references directly, plus Native AOT build-output reuse and `dotnet format` support for file-based apps.
- A new `dotnet run -e` option to pass <example-value> variables from the command line.
- `dotnet watch` improvements, including Aspire app-host integration, automatic crash recovery, and device selection for MAUI and mobile projects.
- OpenTelemetry replaces Application Insights for CLI telemetry.
- NativeAOT CLI entry point that serves the full command surface—including `--help` for all built-in commands and tool/external-command launches—out-of-process from the AOT path, skipping managed CLI startup.
- NativeAOT CLI and the MSBuild server are now enabled by default.
- `dotnet test` improvements, including `--no-dependencies`, `DOTNET_TEST_RUNNER` environment variable, `--use-current-runtime`, `--test-modules` exclusion patterns, per-assembly test counts, and live display of in-flight tests.
- `dotnet test` support for Android, iOS, macOS, and Mac Catalyst test projects, with device selection and new `androidtest`, `iostest`, `macostest`, and `maccatalysttest` templates.
- Additional `dotnet test` run-level options, including `--timeout`, `--maximum-failed-tests`, `--results-directory-layout per-module`, and an experimental affected-test workflow, along with traversal-project support, JSON output for `--list-tests`, and artifact post-processing for multi-module runs.
- Built-in test templates support xUnit v3 (defaulting to Microsoft.Testing.Platform) and NUnit with an opt-in `--test-runner` option.
- Multi-architecture container image builds with Podman using the SDK's container publishing support.
- Container publishing now prefers platform-native local runtimes (`wslc` on Windows and `container` on macOS) before Docker and Podman, produces reproducible image digests through `SOURCE_DATE_EPOCH`, and skips redundant layer uploads when the target manifest already exists.
- Native AOT publishing keeps optimized publishing opt-in, and `dotnet watch` restores automatic browser refresh for static server-side rendered Blazor pages that use WebAssembly or Auto interactivity.
- TypeScript compilation outputs from Razor Class Libraries now integrate correctly with the Static Web Assets pipeline.
- `dotnet format` limits `.editorconfig` discovery in folder mode to the ancestor directories of included files.
- The `dotnet` CLI no longer suppresses the MSBuild build server when `DOTNET_CLI_USE_MSBUILD_SERVER` is unset, and the OTLP telemetry exporter activates on any standard `OTEL_EXPORTER_OTLP_*` environment variable.
- Concurrent .NET tool installation, update, and removal operations no longer race with one another.
- Quoted values in file-based `#:property` directives and trailing `Name=Value` item metadata on `#:package`, `#:project`, and `#:ref` directives.
- MSBuild property expansion in launch-profile `commandLineArgs` values when you use `dotnet run`.
- Faster MSBuild wildcard matching during project evaluation.
- A `--min-publish-age-hours` option on `dotnet nuget add source` and `dotnet nuget update source` to set the minimum package publication age.

For more information, see What's new in the SDK for .NET 11.

## ASP.NET Core

For information about what's new in ASP.NET Core, see What's new in ASP.NET Core for .NET 11.

## C# 15

C# 15 is the default language version for projects that target .NET 11 and includes these features:

- Collection expression arguments
- Union types
- Closed hierarchies
- Extension indexers
- Labeled `break` and `continue`
- Memory safety

For information about new C# features, see What's new in C# 15.

## EF Core

See What's new in EF Core for .NET 11.

## Extensions libraries

See dotnet/extensions release notes.

## Windows Forms

See What's new in Windows Forms for .NET 11.

## WPF

See What's new in WPF in .NET 11.

## See also

- What's new in .NET 10
