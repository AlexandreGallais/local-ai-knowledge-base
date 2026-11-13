# F16 trial on the workstation

What to play on the workstation for the two criteria of F16 that only a person can see. About one
hour. The script was tested against a fake server only (Open WebUI 0.13.3 endpoints).

## 1. Before the push (once, by an administrator)

1. Note the version of Open WebUI (`/api/version`). The script is written for 0.13.3; another
   version may need changes: note any error.
2. Create the group of the team, and give it access to the base model.
3. Create an API key for the account that carries the import. One account only: skill names are
   unique on the instance.

## 2. The push

From the base imported on the workstation (F7): the import rebuilds `chat/skills/`,
`chat/knowledge/` and `adapters/open-webui/manifest.json`.

```sh
export OPEN_WEBUI_URL="<instance address>"
export OPEN_WEBUI_TOKEN="<API key>"
export OPEN_WEBUI_BASE_MODEL="<id of the base model>"
export OPEN_WEBUI_SHARE="group:<group name>"
node adapters/open-webui/push.ts --dry-run
node adapters/open-webui/push.ts
```

Expected: one line per skill, knowledge base and model, then `Done.`; run it a second time: nothing
is created twice, unchanged files are not sent again.

## 3. Seen by a member of the group

Log in as a member of the group, not as the administrator: the five models, their knowledge bases
and their skills are visible and usable, with no manual change.

## 4. Ten questions per model

Ask each question in a new chat with the model. Count a success when the answer comes from the
knowledge and the last line `Sources:` names a document of the knowledge. Expected: 8 out of 10 at
least per model. Below 8, set `OPEN_WEBUI_MODE=legacy`, push again, and play the ten questions
again.

TypeScript and Angular:

1. Should I still write `standalone: true` on a component in Angular 22?
2. How do I write an input with a signal?
3. What replaces `*ngIf`?
4. How do I end a subscription with the component?
5. Why does my code fail with `noUncheckedIndexedAccess`?
6. What does Angular 22 change for services?
7. Can Angular 22 use TypeScript 7?
8. What replaces `toPromise()` in RxJS 7?
9. Which Node.js versions does Angular 22 accept?
10. What does `STRICT_FORMAT=0` change?

C# and .NET:

1. Which C# version does `net8.0` allow?
2. Why does CA2016 fail my build?
3. Can I add MediatR to the project?
4. How do I log without CA2254?
5. What replaces Swashbuckle in ASP.NET Core 10?
6. What changed for `Contains` in EF Core 8?
7. How do I fix CS8618?
8. What is the `field` keyword of C# 14?
9. How do I switch on strict formatting?
10. Which .NET versions are still supported?

Containers and Kubernetes:

1. Which port does an ASP.NET Core image listen on?
2. Why does my Service have no endpoints?
3. Which `apiVersion` for an Ingress?
4. Why does Podman refuse `FROM nginx`?
5. Where do I put `npm ci` in a dev container?
6. What does `OOMKilled` with code 137 mean?
7. How do I check a manifest without a cluster?
8. How do I reserve whole CPU cores for a real-time process?
9. Which folder of `dist/` do I copy for an Angular image?
10. How do I go back to the previous Deployment revision?

Simulation and naval:

1. Which properties for a motorized butterfly valve?
2. What is the English name of "déclencheur manuel", and its properties?
3. How does a pressure relief valve work, and how do I model it?
4. How do I name a high-high pressure limit?
5. Which colours for open and closed on a synoptic?
6. How fast does an unacknowledged alarm flash?
7. How does a controllable-pitch propeller work?
8. What are the four positions of a circuit breaker?
9. How does a submarine ballast tank fill and empty?
10. What is the law of a valve flow coefficient?

## Results

| Model | Successes out of 10 | Mode | Notes |
| --- | --- | --- | --- |
| TypeScript and Angular |  |  |  |
| C# and .NET |  |  |  |
| Containers and Kubernetes |  |  |  |
| Simulation and naval |  |  |  |
| Commit assistant (F6 trial) |  |  |  |
