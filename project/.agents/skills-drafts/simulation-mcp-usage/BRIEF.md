# BRIEF: simulation-mcp-usage  (SCI-06, 4 stars, V2)

## Final frontmatter (do not change)

```yaml
name: simulation-mcp-usage
description: "Uses the simulation documentation server and the simulation tools of this installation - concepts, APIs (FMI, Modelica, SimPy, SciPy), typical scenarios and limits. Use when working on simulation code, FMU, Modelica models, ODE solvers or co-simulation, or when choosing which simulation library or document to consult."
metadata:
  id: SCI-06
  stars: "4"
  nature: reference
  mode: C
  wave: V2
  load: auto
```

## Goal

A reference that tells the agent what the simulation-official-docs server holds, which library to use for which simulation task in this team, and how to query it, so it never invents a solver option or an FMI call.

## Questions the skill must answer

1. Which sources and versions does simulation-official-docs hold (library/sources.json of the brick)?
2. Which simulation libraries and tools are installed in the dev container (FMPy, SciPy, SimPy, python-control, OpenModelica, Octave, Scilab)?
3. For the team's typical tasks (run an FMU, integrate an ODE, discrete-event model, control loop), which library and which documented function?
4. Which queries return the right section first for each task?
5. What does the team's simulation code look like (folders, conventions)?

## Where to look (files, commands, people)

- .agents/mcp/simulation-official-docs/README.md and library/sources.json
- live calls of simulation-official-docs_search_docs and simulation-official-docs_read_doc
- python3 -c 'import fmpy, scipy, simpy' and the versions of each tool
- the human: the team's simulation tasks and conventions

## Required sections

- Core rule in the first 10 lines.
- Procedure with an Action and a Check per step, or a reference table with the commands.
- Stop and ask the human if; Common mistakes; Definition of done.

## Acceptance tests

- Trigger: loads on "run this FMU and plot the output", "which solver for this stiff ODE?", "how do I write a Modelica connector?"; does not load on "fix the CSS of the dashboard", "rename the branch", "write a commit message".
- Paired task: run a sample FMU with given inputs; with the skill the agent uses the documented FMPy call and the result file matches the reference within tolerance.

## Human input required (yes/no, what)

Yes: the team's typical simulation tasks and which libraries are approved.
