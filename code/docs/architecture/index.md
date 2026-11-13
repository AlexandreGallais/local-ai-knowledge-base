# architecture index

One line per document. Open only the documents your task needs.

- [Modular monolith or microservices](docs/architecture/choose-decomposition.md): When to keep a modular monolith and when to split a service, with module rules and anti-patterns.
- [Structure of a .NET solution](docs/architecture/structure-dotnet-solution.md): Layers or vertical slices, module rules, CQRS written by hand without a mediator library, and when each fits. .NET 10.
- [API contract with OpenAPI](docs/architecture/api-contract-openapi.md): Generate the OpenAPI document at build, generate the Angular client, version the API and normalize errors. ASP.NET Core 10.
- [Real-time push to the browser](docs/architecture/real-time-push.md): SignalR, Server-Sent Events or gRPC, deployment on several replicas, message format and defaults. ASP.NET Core 10.
- [Messaging between services](docs/architecture/messaging.md): When a queue helps, the transactional outbox, idempotent consumers, brokers, and the licenses of .NET bus libraries.
- [.NET service patterns](docs/architecture/dotnet-service-patterns.md): Dependency injection, options, HTTP resilience, logging, telemetry, health, data access and Aspire for a .NET service. .NET 10.
- [Angular application structure](docs/architecture/angular-app-structure.md): Folders by feature, standalone components, state by scope with signals, server data and module boundaries. Angular 22.
- [Angular interface with many changing values](docs/architecture/angular-high-frequency-ui.md): Show many values that change often, with zoneless signals, OnPush, few DOM nodes and measures first. Angular 22.
- [Architecture review checklist](docs/architecture/review-checklist.md): Closed questions of an architecture review, by theme, each answered yes, no or unknown, with the themes to keep.
- [Code review checklist](docs/architecture/code-review-checklist.md): What a reviewer checks that the lint does not, for every change, for C# and .NET, for TypeScript and Angular.
- [Outdated libraries and patterns](docs/architecture/outdated-libraries-and-patterns.md): Libraries that changed license, retired .NET and Angular patterns, and signs of over-engineering, with what to write instead.
