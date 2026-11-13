---
id: reading-code-build-maven-gradle-cargo
title: Reading pom.xml, build.gradle and Cargo.toml
topic: reading-code
summary: What pom.xml, build.gradle and Cargo.toml say about a Java or Rust project, with versions, dependencies and features.
tool: none
version: "none"
checked: 2026-11-13
sources: [S1, S2, S3, S4, S5]
license: MIT (own words; facts summarized from the sources)
variant: files
---

# Reading pom.xml, build.gradle and Cargo.toml

Contents: 1. pom.xml · 2. build.gradle · 3. Cargo.toml · Sources

## 1. pom.xml (Maven)

| You read | What it says | C# landmark |
| --- | --- | --- |
| `groupId`, `artifactId`, `version`, `packaging` | Identity and output kind (`jar` by default) [S1] | NuGet package identity |
| `parent`; `modules` | Inherited settings; sub-projects built together [S1] | `Directory.Build.props`; solution |
| `properties`, for example `maven.compiler.release` | The Java version targeted [S1] | `TargetFramework` |
| `dependencies` and `scope` (`compile`, `provided`, `runtime`, `test`, `system`); `dependencyManagement` | Libraries and when they serve; central versions [S1] | `PackageReference`; central package management |
| `build` and `plugins`; `profiles` | Build steps, code generation included; variants by environment [S1] | MSBuild targets |

The effective POM, inheritance included, comes from `mvn help:effective-pom`. [S1]

## 2. build.gradle (Gradle)

| You read | What it says | C# landmark |
| --- | --- | --- |
| `plugins { }`; `application { mainClass }` | A Groovy or Kotlin script; plugins add tasks; entry point [S2] | `.csproj`, but it is code |
| `implementation`, `api`, `compileOnly`, `runtimeOnly`, `testImplementation` | `api` is visible to whoever compiles against the library; `implementation` is hidden at compile time [S3] | `PrivateAssets` (close) |
| `libs.guava` | A dependency taken from a version catalog [S2] | Central package management |

## 3. Cargo.toml (Rust)

| You read | What it says | C# landmark |
| --- | --- | --- |
| `[package]`: `name`, `version`, `edition`, `rust-version`, `build` | Identity; language edition (2015 when absent, `cargo new` writes 2024); minimum Rust; build script `build.rs` [S4] | `.csproj` [S5] |
| `[dependencies]`, `[dev-dependencies]`, `[build-dependencies]` | Run, test and build-script libraries [S4] | `PackageReference` |
| `[features]`, `[workspace]`, `[profile.*]`, `[lints]` | Conditional compilation; a set of crates; optimization settings; lint levels [S4] | `DefineConstants`; solution [S5] |

## Sources

- [S1] Apache Software Foundation, "POM Reference", <https://maven.apache.org/pom.html>, read 2026-11-12, summarized.
- [S2] Gradle, "Build File Basics", Gradle 9.9.1, <https://docs.gradle.org/current/userguide/build_file_basics.html>, read 2026-11-12, CC BY-NC-SA 4.0, summarized in own words.
- [S3] Gradle, "The Java Library Plugin", Gradle 9.9.1, <https://docs.gradle.org/current/userguide/java_library_plugin.html>, read 2026-11-12, CC BY-NC-SA 4.0, summarized in own words.
- [S4] Rust project, "The Manifest Format", The Cargo Book, <https://doc.rust-lang.org/cargo/reference/manifest.html>, read 2026-11-12, summarized.
- [S5] Microsoft and contributors, "Rust for C#/.NET Developers", <https://microsoft.github.io/rust-for-dotnet-devs/latest/print.html>, read 2026-11-12, MIT-like license, summarized.
