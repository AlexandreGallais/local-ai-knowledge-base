# BRIEF: sensitive-data-handling  (SEC-02, 5 stars, V0)

## Final frontmatter (do not change)

```yaml
name: sensitive-data-handling
description: "Applies the organisation's rules on sensitive data. Use before writing code, logs, test data, commit messages, merge requests, notes or MCP queries that could hold names, hosts, credentials, customer or project data, and when the user pastes data from a real system."
metadata:
  id: SEC-02
  stars: "5"
  nature: guardrail
  mode: C
  wave: V0
  load: always
```

## Goal

A guardrail of at most 60 lines that tells the agent what never goes into code, logs, commits, merge requests, MCP queries or notes, and what to do instead (placeholder, fake data, ask). The rules are the organisation's: the human gives them.

## Questions the skill must answer

1. Which kinds of data are sensitive here (people, hosts, network ranges, project names, customer names, credentials, measurements, documents)?
2. Which of them may appear in local files that never leave the machine, and which never anywhere?
3. What replaces a sensitive value in code, tests and examples (placeholder format, fake data generator)?
4. What must the agent do when the user pastes sensitive data?
5. What must the agent do when it finds sensitive data already committed?
6. Which files or folders must never be read or sent to a tool?

## Where to look (files, commands, people)

- The human: the data-handling rules of the organisation. Ask; never guess.
- `.gitignore` and existing secret-scan configuration of the repository.
- Skill `secrets-hygiene` for credentials: do not duplicate it, cross-reference it.

## Required sections

- Core rule in the first 10 lines.
- A table: kind of data, allowed where, replacement.
- Stop and ask the human if; Common mistakes; Definition of done.

## Acceptance tests

- Trigger: loads on "add a log of the request body", "write test data for users", "commit this config"; does not load on "rename this variable", "explain this loop", "fix this typo".
- Paired task: asked to write a test fixture from a pasted real record, the agent with the skill replaces every real value by a placeholder or fake value.

## Human input required (yes/no, what)

Yes: the organisation's list of sensitive data kinds, where each may appear, and the replacement rule. The local author must not write this skill from its own judgement.
