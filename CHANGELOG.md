# Changelog

All notable changes of this base. The format follows Keep a Changelog; versions follow Semantic
Versioning.

## [Unreleased]

## [0.1.0] - 2026-11-13

The first version of the base, ready for its trial on a workstation (`trials/README.md`).

### Added

- Foundation: `code/AGENTS.md` with its rules, check commands, skill triggers and a map of topics;
  one index per topic; the document template; French summaries for people; `scripts/check-base.ts`,
  which checks the size of `AGENTS.md`, skills, documents, sources, links and section references.
- Project rules: `AGENTS.project.md` at the root of a project, never written by an update of the
  base, and its template.
- Heavy files: the skill `read-heavy-file` and `extract.ts` for Office, OpenDocument, Adobe XD,
  Sketch, Visio, draw.io, notebooks, JSON and archives; commands for PDF and OCR.
- Writing code: lint and format rules for TypeScript and Angular (`lint-typescript`) and for C#
  (`analyze-csharp`), with their configurations and strict format switches.
- Versions: what changed in Angular 17 to 22, TypeScript 5.0 to 7.0, RxJS 7, Node.js 22 to 26, C# 10
  to 15, .NET 6 to 11, ASP.NET Core and EF Core; the packages that became paid; `look-up-api`;
  `scripts/check-versions.ts` and the update procedure.
- Tests: the topics `dotnet-testing` and `angular-testing` and the skill `write-tests`.
- Containers: Docker, Podman, dev containers and Kubernetes, the templates and
  `check-container-change`.
- Domain: synoptic rules, the property naming convention, the symbol component, the equipment
  catalogs (fluids, electrical, fire, propulsion, instrumentation) with French to English indexes;
  simulation principles and architecture; the agent `explain-equipment`.
- Architecture and review: the topic `architecture` and the agents `architecture-review` and
  `code-review`.
- Reading code: guides for C, C++, Java and Rust, and `explain-code`.
- Git: `write-commit-message`, `choose-version`, `name-branch`.
- Authoring: `write-agents-md`, `write-skill`, `write-agent`, `write-base-document`,
  `write-chat-model`.
- Official documentation: `library/`, 18 sources at pinned versions (TypeScript, Angular, ESLint and
  its plugins, RxJS, MDN on SVG and animation, Dev Containers, Node.js, C#, .NET, ASP.NET Core, EF
  Core, Kubernetes, Docker, Podman, the Rust book), cut into files of 16 KB at most, one index per
  tool; `scripts/fetch-library.ts` and `scripts/check-library.ts`; `THIRD_PARTY_NOTICES.md`.
- Chat profile: four subject models and a commit assistant; the chat variant of each skill and the
  knowledge of each subject, generated at export; `adapters/open-webui/push.ts`.
- Adapters: OpenCode 1.x and 2.x (heavy files refused to the read tool, three agents) and a docs
  server on trial (`adapters/mcp/docs-server.ts`).
- Delivery: `scripts/export.ts` and `import.ts` carry the base by copy and paste, in parts of 500 KB
  at most; the library goes as compressed parts; `export/` holds the export of this version.
- Checks before publishing: `scripts/check-public.ts`; evaluation protocol in `evaluation/`; trial
  guides in `trials/`.
