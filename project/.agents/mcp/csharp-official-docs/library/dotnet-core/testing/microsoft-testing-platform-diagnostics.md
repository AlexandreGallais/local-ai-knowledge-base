---
title: "Microsoft.Testing.Platform (MTP) diagnostics"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/microsoft-testing-platform-diagnostics.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Diagnostics

These extensions capture evidence during a test run so you can diagnose failures after the fact. Each extension requires an additional NuGet package, as described in each section.

> **Tip:**
> When using Microsoft.Testing.Platform.MSBuild (included transitively by MSTest, NUnit, and xUnit runners), these extensions are auto-registered when you install their NuGet packages — no code changes needed. The manual registration specified in this article is only required if you disabled the auto-generated entry point by setting `<GenerateTestingPlatformEntryPoint>false</GenerateTestingPlatformEntryPoint>`.

For process-level diagnostics, see the related Crash and hang dumps extensions, which collect process dump files when the test host crashes or hangs.

## Video recorder

The video recorder records the screen while your tests run and attaches the captured videos to the test session as artifacts. Recording is opt-in per run and driven by an external `ffmpeg` process, which must be available on the `PATH` or set through an explicit path. This extension requires the Microsoft.Testing.Extensions.VideoRecorder NuGet package.

> **Note:**
> Available in MTP starting with version 2.3.0. This extension is experimental, and its options and output format might change in a future version.

### Manual registration

```csharp
var builder = await TestApplication.CreateBuilderAsync(args);
builder.AddVideoRecorderProvider();
```

### Options

| Option | MTP version | Description |
|---|---|---|
| `--capture-video` | 2.3.0 | Enables screen recording. The optional value controls retention: `on-failure` (default) keeps footage only for failing tests, and `always` keeps footage for every test. |
| `--capture-video-source` | 2.3.0 | Sets the capture source. Valid values are `screen` (default) and `window`. Requires `--capture-video`. |
| `--capture-video-granularity` | 2.3.0 | Sets whether the recorder produces one video per test or one chaptered video for the whole run. Valid values are `test` (default) and `session`. Requires `--capture-video`. |
| `--capture-video-max-duration` | 2.3.0 | Bounds disk usage on long runs by keeping approximately the last N seconds of footage. The value is a positive integer number of seconds. Requires `--capture-video`. |
| `--capture-video-chapters` | 2.3.0 | Sets whether chapter bookmarks are added to the per-session video. Valid values are `on` (default) and `off`. Requires `--capture-video`. |
| `--capture-video-args` | 2.3.0 | Passes extra arguments to the underlying recorder (`ffmpeg`). Requires `--capture-video`. |
