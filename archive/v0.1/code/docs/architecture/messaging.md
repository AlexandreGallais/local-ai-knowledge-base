---
id: architecture-messaging
title: Messaging between services
topic: architecture
summary: When a queue helps, the transactional outbox, idempotent consumers, brokers, and the licenses of .NET bus libraries.
tool: none
version: "none"
checked: 2026-11-13
sources: [S1, S2, S3, S4, S5, S6, S7, S8]
license: MIT (own words; facts summarized from the cited sources)
variant: files
---

# Messaging between services

Contents: 1. When · 2. Outbox and idempotence · 3. Broker · 4. Libraries and licenses · Sources

## 1. When to use a queue (messaging)

- Between services, asynchronous messaging avoids coupling and chatty call chains. [S1]
- Inside a modular monolith, a direct call is enough until you need to decouple in time: long work, recovery after a failure, several subscribers. A queue never replaces a method call.
- The base sets no bus library by default: the choice is made per project, with its license.

## 2. Transactional outbox and idempotent consumers

- Updating the database and publishing a message atomically needs a transactional outbox: the message is written to a table in the same transaction, and a relay publishes it later. [S2]
- The relay can publish twice: every consumer must be idempotent (store the ids of the messages already handled). [S2]
- CQRS with two databases syncs the read side by events, with the same care. [S3]

## 3. Broker (RabbitMQ or Kafka)

The RabbitMQ team writes that "RabbitMQ for queues, Kafka for streams" is outdated: RabbitMQ has replayable streams since 3.9 (2021), Kafka has queues since 4.2 (2026); its advice is to start with RabbitMQ and add Kafka for what only Kafka does (log compaction, tiered storage, Kafka Streams). [S4] Interested single source.

## 4. .NET bus libraries and their licenses (checked 2026-11-12)

| Library | Model | Free use |
| --- | --- | --- |
| MassTransit 9 and later | Commercial license, key required | 100 % discount under one million dollars of revenue and for non-profits; v8 keeps its open license, support until 2026-12-31 [S5] |
| NServiceBus | Commercial: free in development, paid in production | Community tier: 3 endpoints, 10,000 messages per day [S6] |
| Wolverine | MIT; durable inbox and outbox | Paid support offers apart [S7] |
| Rebus | MIT | Commercial module apart (Rebus Pro) [S8] |

Never propose a library of this table without its license and version; if the project already uses it, report it as a risk to decide. MediatR is an in-memory mediator, not a bus: see `docs/dotnet/paid-packages.md`.

## Sources

- [S1] Microsoft, "Microservices architecture style", Azure Architecture Center, <https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/microservices>, read 2026-11-12, summarized.
- [S2] Chris Richardson, "Pattern: Transactional outbox", <https://microservices.io/patterns/data/transactional-outbox.html>, read 2026-11-12, summarized.
- [S3] Microsoft, "CQRS pattern", <https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs>, read 2026-11-12, summarized.
- [S4] RabbitMQ, "RabbitMQ vs. Apache Kafka", documentation 4.3, <https://rabbitmq.com/docs/compare/kafka>, read 2026-11-12, summarized.
- [S5] Massient, "Massient", MassTransit licenses, <https://massient.com/>, read 2026-11-12, summarized.
- [S6] Particular Software, "Licensing", <https://particular.net/licensing>, read 2026-11-12, summarized.
- [S7] Wolverine, home page, <https://wolverinefx.net/>, read 2026-11-12, MIT, summarized.
- [S8] rebus-org, "Rebus", README, <https://github.com/rebus-org/Rebus>, read 2026-11-12, MIT, summarized.
