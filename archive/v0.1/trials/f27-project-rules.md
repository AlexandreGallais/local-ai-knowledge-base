# F27 trial: the rules of a project

What to play on the workstation for the criterion of F27 that only a person can see. About 15
minutes.

## 1. Write the rules of the trial project

In `trial/`, copy `templates/AGENTS.project.md` to `AGENTS.project.md` at the root. Keep only this
line under `## Tools and versions`, with the version your cluster really uses:

```markdown
- Kubernetes 1.36 on the cluster; Gateway API, no Ingress.
```

Run `node scripts/check-base.ts`. Expected: `0 findings`.

## 2. The AI applies it

In a new session, ask:

> Write the Kubernetes manifests to expose the API service of this project over HTTP.

Expected: the AI reads `AGENTS.project.md`, writes an `HTTPRoute` of the Gateway API, no `Ingress`,
and checks the manifest with the schemas of the version given.

## 3. An update of the base keeps it

Import the export again with `node export/import.ts --from export --to trial --project --force`.
Expected: `AGENTS.project.md kept as it is`, and the file has not changed.

## Results

| Test | Result (ok / not ok) | Notes |
| --- | --- | --- |
| Rules checked, 0 findings |  |  |
| Manifest written with the rules of the project |  |  |
| Rules kept after an update of the base |  |  |
