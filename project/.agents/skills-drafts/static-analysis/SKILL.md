---
name: static-analysis
description: "Runs static analysers locally - clang-tidy, cppcheck, SpotBugs, Roslyn analyzers, Semgrep - and fixes their findings by priority. Use when asked for a static analysis, when CI reports analyser findings, before a security-sensitive merge, or when adding an analyser to a project."
metadata:
  id: TST-07
  stars: "3"
  nature: process
  mode: B
  wave: V3
  load: auto
---

# Static analysis

**Core rule:** run the project's configured analysers on the changed code, fix findings by severity, and suppress a finding only with a written reason.

## Procedure

1. Find the configured analysers: `.clang-tidy`, `cppcheck` options in build files, SpotBugs in `pom.xml` or Gradle, analyzers in `.csproj` or `Directory.Build.props`, `.semgrep.yml`.
   - Check: each analyser and its config file are listed.
2. Run them as the project does (commands below), on changed files first.
   - Check: a list of findings with file, line, rule.
3. Fix by severity: errors and security findings first.
   - Check: the analyser no longer reports them.
4. Suppress a false positive with the tool's inline mechanism and a reason.
   - Check: each suppression has a comment explaining why.

| Language | Command (adjust to the project) |
| --- | --- |
| C, C++ | `clang-tidy -p build <files>`, `cppcheck --enable=warning,style <dir>` |
| Java | `mvn spotbugs:check` or `gradle spotbugsMain` |
| C# | `dotnet build -warnaserror` (analyzers run in the build) |
| Several | `semgrep --config <rules> <dir>` with local rules only |

## This installation

<!-- FILL: what=analysers installed and their versions; find=command -v clang-tidy cppcheck semgrep and the build plugins; verify=each runs on one file and prints results -->

<!-- FILL: what=exact analysis commands used in CI; find=grep -n -E 'clang-tidy|cppcheck|spotbugs|semgrep|warnaserror' .gitlab-ci.yml; verify=the same command runs locally -->

## Stop and ask the human if

- An analyser is not on the internal mirror, or a finding needs a design change.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Suppress to get green." | Silent suppressions hide real bugs. Fix or explain. |
| "Run on the whole repo first." | Start with changed files; old findings flood the output. |

## Definition of done

- [ ] Analysers run; findings fixed by severity; suppressions explained.

## Local completion checklist

- [ ] Installed analysers
- [ ] CI analysis commands
