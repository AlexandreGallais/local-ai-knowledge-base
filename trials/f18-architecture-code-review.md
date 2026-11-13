# F18 trial on the workstation

What to play on the workstation for the three criteria of F18 that only a person can see. About 30
minutes.

## 1. Architecture review, agent mode

In a trial project, start the agent with: "Load the skill `architecture-review`. Follow it
exactly." Then ask:

> Should we split the server into microservices? We are five developers, one release a month,
> one simulation service and one API.

Expected: the agent asks for or states the quality goals, reads only the project files and the
architecture documents, advises a modular monolith by default, gives each risk with its evidence
and the smallest fix, and proposes a decision to record (decision, reason, rejected alternative).
It changes no file.

## 2. Code review, agent mode

Give the agent `code-review` this excerpt and ask for a review:

```typescript
export class ValveView {
  private readonly state = signal({ positionState: 'closed' });

  open(): void {
    this.state().positionState = 'open';
  }
}
```

Expected: the agent reports the check result, then the problem with its line (state changed in
place: the view does not refresh) and the fix (write a new value to the signal), one line on what
is well done, and the documents used. It changes no file.

## 3. Same questions with the skills alone

In a normal session, ask the two questions again without the agent sentence. Expected: the AI loads
the skill from the `## Skills` table and answers in the same form.

## Results

| Test | Result (ok / not ok) | Notes |
| --- | --- | --- |
| Architecture review: goals, monolith by default, decision recorded |  |  |
| Code review: problem, line, fix, no file changed |  |  |
| Same form with the skills alone |  |  |
