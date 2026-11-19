---
name: simulation-validation
description: "Verifies and validates a simulation - analytic cases, convergence, tolerances, conservation, reproducibility with fixed seeds. Use when a simulation model is created or changed, when results must be trusted for a decision, or when outputs change between runs or versions."
metadata:
  id: SCI-07
  stars: "3"
  nature: process
  mode: A
  wave: V3
  load: auto
---

# Simulation validation

**Core rule:** verification (the model is solved right) and validation (the right model) each need written cases with expected values and tolerances, run automatically.

## Procedure

1. Write verification cases: analytic solutions, limit cases, conserved quantities (energy, mass).
   - Check: each case has an expected value and a tolerance.
2. Check convergence with the step size or mesh (`numerical-methods`).
   - Check: results converge within the tolerance.
3. Write validation cases from reference data (measurements, accepted results) with their source.
   - Check: each comparison has a tolerance agreed with the human.
4. Fix all seeds and record versions (code commit, library versions, inputs).
   - Check: two runs give identical outputs.
5. Turn the cases into automated tests with golden outputs (`golden-file-tests`).
   - Check: the test suite runs them and passes.

## Stop and ask the human if

- Reference data or acceptable tolerances are not given.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "The plot looks right." | Looks are not validation. Compare numbers with tolerances. |
| "Random seed does not matter." | Unfixed seeds make regressions invisible. |

## Definition of done

- [ ] Verification and validation cases automated with tolerances; convergence checked; runs reproducible.
