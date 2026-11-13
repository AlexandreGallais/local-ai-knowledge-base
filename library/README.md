# Official documentation library

The official documentation of the tools, converted to plain Markdown, at a pinned version, cut into
files of 16 KB at most, with one index per tool. The AI opens it only when the documents of the base
do not answer. The core set goes into the export by default.

## Usage

From the root of the repository, with git and network access:

```sh
node scripts/fetch-library.ts                 # every tool
node scripts/fetch-library.ts --tool angular  # one tool, or a comma list
node scripts/check-library.ts                 # headers, index, 16 KB at most, notices
```

## Tools

| Tool | Documentation | Version | License | Core | Size |
| --- | --- | --- | --- | --- | --- |
| [typescript](typescript/index.md) | TypeScript Handbook, reference and release notes | 6.0 | CC-BY-4.0 | yes | 199 files, 1.8 MB |
| [angular](angular/index.md) | Angular documentation (angular.dev) | 22.2 | CC-BY-4.0 | yes | 520 files, 3.9 MB |
| [eslint](eslint/index.md) | ESLint core rules | 10.14 | MIT | yes | 317 files, 1.1 MB |
| [typescript-eslint](typescript-eslint/index.md) | typescript-eslint rules | 8.72 | MIT | yes | 169 files, 0.5 MB |
| [angular-eslint](angular-eslint/index.md) | angular-eslint rules for TypeScript and templates | 22.6 | MIT | yes | 121 files, 0.9 MB |
| [rxjs](rxjs/index.md) | RxJS 7 guides and deprecations | 7.8 | Apache-2.0 | yes | 26 files, 0.2 MB |
| [mdn-svg](mdn-svg/index.md) | MDN Web Docs: SVG, geometry, Web Animations, animation frames and pointer events | 2026-11 | CC-BY-SA-2.5 | yes | 1073 files, 2.4 MB |
| [devcontainers](devcontainers/index.md) | Development Container Specification | 2026-11 | CC-BY-4.0 | yes | 24 files, 0.2 MB |
| [node](node/index.md) | Node.js API reference | 26.13 | MIT | no | 374 files, 4.0 MB |
| [dotnet-csharp](dotnet-csharp/index.md) | C# guide and language reference | 11 | CC-BY-4.0 | no | 1527 files, 9.8 MB |
| [dotnet-core](dotnet-core/index.md) | .NET fundamentals, SDK, deployment and breaking changes | 11 | CC-BY-4.0 | no | 2591 files, 9.6 MB |
| [dotnet-standard](dotnet-standard/index.md) | .NET standard library guides | 11 | CC-BY-4.0 | no | 1643 files, 12.7 MB |
| [aspnetcore](aspnetcore/index.md) | ASP.NET Core documentation | 11 | CC-BY-4.0 | no | 2144 files, 12.6 MB |
| [efcore](efcore/index.md) | Entity Framework Core documentation | 11 | CC-BY-4.0 | no | 326 files, 2.9 MB |
| [kubernetes](kubernetes/index.md) | Kubernetes documentation | 1.37 | CC-BY-4.0 | no | 2442 files, 13.4 MB |
| [docker](docker/index.md) | Docker documentation | 2026-11 | Apache-2.0 | no | 1298 files, 7.8 MB |
| [podman](podman/index.md) | Podman command reference | 6.2 | Apache-2.0 | no | 273 files, 1.7 MB |
| [rust-book](rust-book/index.md) | The Rust Programming Language | 2026-11 | MIT OR Apache-2.0 | no | 183 files, 1.3 MB |
