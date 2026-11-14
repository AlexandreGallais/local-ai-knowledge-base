# Official documentation library

The official documentation of the tools, at a pinned version, as its authors wrote it: each file is
copied unchanged, in its own format. An API reference that lives in the comments of the source code
is taken from those comments. `<tool>.index.md` lists the files of each tool. The AI searches them
with the tools of the brick, then reads one section.

## Usage

From the root of the repository, with git and network access:

```sh
node scripts/fetch-library.ts                 # every tool
node scripts/fetch-library.ts --tool angular  # one tool, or a comma list
node scripts/check-library.ts                 # every file indexed, every license and notice
```

## Tools

| Tool | Documentation | Version | License | Size |
| --- | --- | --- | --- | --- |
| [java-se](java-se.index.md) | Java SE API: the java.base and java.net.http modules, from the Javadoc of OpenJDK | 25 | GPL-2.0-only WITH Classpath-exception-2.0 | 1220 files, 11.6 MB |
| [gradle](gradle.index.md) | Gradle User Manual: build scripts, dependencies, tasks, plugins | 9.9 | Apache-2.0 | 342 files, 4.3 MB |
| [maven](maven.index.md) | Maven documentation: the POM, the build lifecycle, dependencies, plugins, guides | 2026-11 | Apache-2.0 | 284 files, 2.1 MB |
