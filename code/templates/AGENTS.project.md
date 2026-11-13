# AGENTS.project.md

The rules of this project. The base never writes this file: an update of the base keeps it as it
is. Keep it short: 40 lines at most, English, short imperative sentences.

## Tools and versions

- Angular 22, TypeScript 6.0, Node.js 24 in the dev container.
- .NET 10 for the server; C# 14.
- Kubernetes 1.36 on the cluster; Gateway API, no Ingress.

## Commands

| Task | Command |
| --- | --- |
| Run the server locally | `dotnet run --project src/Server` |
| Run the user interface | `npm start` |

## Conventions

- Name a feature folder after the equipment family, in kebab-case.
- Put the synoptic symbol classes in `src/app/synoptics/symbols/`.
- Validate manifests with the Kubernetes schemas of version 1.36.
