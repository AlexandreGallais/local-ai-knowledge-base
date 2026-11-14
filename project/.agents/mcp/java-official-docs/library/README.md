# Official documentation library

The official documentation of the tools, converted to plain Markdown, at a pinned version, cut into
files of 16 KB at most, with one index per tool. The AI searches it with the docs tools of the base,
then reads one section.

## Usage

From the root of the repository, with git and network access:

```sh
node scripts/fetch-library.ts                 # every tool
node scripts/fetch-library.ts --tool angular  # one tool, or a comma list
node scripts/check-library.ts                 # headers, index, 16 KB at most, notices
```

## Tools

| Tool | Documentation | Version | License | Size |
| --- | --- | --- | --- | --- |
| [java-se](java-se/index.md) | Java SE API: the java.base and java.net.http modules, from the Javadoc of OpenJDK | 25 | GPL-2.0-only WITH Classpath-exception-2.0 | 1587 files, 11.1 MB |
