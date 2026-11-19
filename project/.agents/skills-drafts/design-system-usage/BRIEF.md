# BRIEF: design-system-usage  (FE-10, 2 stars, V3)

## Final frontmatter (do not change)

```yaml
name: design-system-usage
description: "Uses the components and design tokens of the internal design system instead of ad hoc CSS. Use when building or changing UI, choosing a colour, spacing, font or component, or when a screen does not match the design system."
metadata:
  id: FE-10
  stars: "2"
  nature: reference
  mode: C
  wave: V3
  load: auto
```

## Goal

A reference of the team's design system - where it is, its components, tokens and usage rules - so the agent builds screens from it.

## Questions the skill must answer

1. Where is the design system (package, folder, version)?
2. Which components exist and when to use each?
3. Which tokens (colours, spacing, typography) and how are they referenced in code?
4. What is forbidden (raw colours, overriding component styles)?
5. How are new components requested or added?

## Where to look (files, commands, people)

- package.json for the design system package and its version
- the design system's documentation in the repository or its package README
- the human: usage rules and the contact for new components

## Required sections

- Core rule in the first 10 lines.
- Procedure with an Action and a Check per step, or a reference table with the commands.
- Stop and ask the human if; Common mistakes; Definition of done.

## Acceptance tests

- Trigger: loads on "build the settings page", "which colour for an error message?", "the button does not look like the others"; does not load on "fix the API call", "write a migration", "explain flexbox".
- Paired task: build a form screen; with the skill it uses design system components and tokens only (grep finds no raw colour).

## Human input required (yes/no, what)

Yes: the design system's location, rules and owner.
