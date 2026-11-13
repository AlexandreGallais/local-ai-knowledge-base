# F17 trial on the workstation

What to play on the workstation for the three criteria of F17 that only a person can see. About 20
minutes.

## 1. The agent, in agent mode

If the coding assistant has an agent mode, start it with: "Load the skill `explain-equipment`.
Follow it exactly." Then ask in French:

> Comment fonctionne une vanne à commande hydraulique, et comment la modéliser ?

Expected: the real working first (fluid pressure on a piston, fail-safe position, hand back-up),
then the model (order, ramp over `travelTimeS`, no motion without pressure, `failPosition` on
pressure loss), then a table of properties from the card (`isOpenCommanded`, `isOpen`, `isClosed`,
`isHydraulicPressureAvailable`, `isHandOperated`, `travelTimeS`, `failPosition`), then the documents
used. The answer is in French; names stay in English.

## 2. The same question with the skill alone

In a normal session, ask the same question. Expected: the AI loads `explain-equipment` from the
`## Skills` table and answers in the same form.

In the chat (model "Simulation and naval equipment", after the push of F16), the same question gets
the same form, with a `Sources:` line.

## 3. Freeze and restore

Ask:

> Que doit faire un modèle pour supporter le gel et la reprise d'une séance ?

Expected: the AI opens `docs/simulation/index.md`, then `training-functions.md` (and possibly
`time-management.md`), cites them, and tells "run" from "restore" apart.

## Results

| Test | Result (ok / not ok) | Notes |
| --- | --- | --- |
| Agent mode: real working, model, properties, documents |  |  |
| Skill alone: same form |  |  |
| Chat model: same form, `Sources:` line |  |  |
| Freeze and restore answered from the simulation documents |  |  |
