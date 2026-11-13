---
id: simulation-distributed-simulation
title: HLA, DIS and DDS
topic: simulation
summary: HLA (IEEE 1516-2025), DIS (IEEE 1278.1-2012) and DDS 1.4, their terms, services and when to use each.
tool: none
version: "none"
checked: 2026-11-13
sources: [S1, S2, S3, S4, S5, S6, S7]
license: MIT (own words; facts summarized from the cited sources)
variant: files
---

# HLA, DIS and DDS

Contents: 1. Compared · 2. What each brings · 3. When to use · Sources

## 1. HLA, DIS and DDS compared

| Criterion | HLA (IEEE 1516-2025) | DIS (IEEE 1278.1-2012) | DDS 1.4 |
| --- | --- | --- | --- |
| What it links | Simulators and tools (federates) in a federation, through a RTI | Platform simulators, in real time | The applications of one system |
| Data model | Set by the federation (FOM, XML), modular | Fixed: 72 message types (PDUs) in 13 families | Typed topics |
| Time | Time management services: regulating or constrained federate, lookahead, time advance request and grant | Real time; dead reckoning between two messages | Not in the pages read |
| Freeze, save | Synchronization points, federation save and restore | Start, resume, stop, freeze messages | Not in the pages read |
| Transport | Depends on the RTI (TCP or multicast) | UDP broadcast, multicast | Peer-to-peer publish-subscribe, discovery, quality of service |
| Bodies | IEEE, SISO | IEEE, SISO | OMG |

Sources: [S1] [S2] [S3] [S4] [S5] [S6]. HLA and DIS texts are paid and were not read.

## 2. What each one brings (distributed simulation)

- HLA: seven service groups (federation, declaration, object, ownership, time, data distribution, support) and ten rules; recommended by NATO (STANAG 4603); HLA 4 approved by IEEE in early 2025, with security, scaling and cloud readiness announced. [S1] [S2]
- DIS: from SIMNET; a fixed object model where each simulator broadcasts the state of its entities (Entity State, Fire, Detonation); the RPR FOM maps DIS messages to HLA classes; dead reckoning predicts a position from the last known state and cuts traffic. [S2] [S3] [S4]
- DDS: data-centric middleware; each application reads and writes a local data space, synchronized peer to peer; quality of service sets reliability, liveliness, filtering and deadlines. [S5] [S6]
- Known limit of HLA: no interface for end-to-end deadlines nor system priorities; its callback wait is a source of non-determinism; research adds fixed-priority scheduling, memory locking and CPU affinity for hard real time. [S7]

## 3. When to use each (distributed simulation)

| Need | Choice |
| --- | --- |
| Link the simulator to those of other teams or nations, with a common logical time | HLA |
| Exchange positions and events with existing simulators in real time, without logical time | DIS |
| Distribute data between applications of one system, with delivery guarantees | DDS |
| Let the models of one simulator talk, in one process | None: a function call and a table of variables |

## Sources

- [S1] SISO, "HLA 4 Approved by IEEE", 2025-03-11, <https://www.sisostandards.org/news/695782/HLA-4-Approved-by-IEEE.htm>, read 2026-11-12, summarized.
- [S2] Wikipedia, "High Level Architecture", <https://en.wikipedia.org/wiki/High_Level_Architecture>, read 2026-11-12, CC BY-SA 4.0, summarized.
- [S3] Wikipedia, "Distributed Interactive Simulation", <https://en.wikipedia.org/wiki/Distributed_Interactive_Simulation>, read 2026-11-12, CC BY-SA 4.0, summarized.
- [S4] Wikipedia, "Dead reckoning", <https://en.wikipedia.org/wiki/Dead_reckoning>, read 2026-11-12, CC BY-SA 4.0, summarized.
- [S5] DDS Foundation (OMG), "What is DDS?", <https://www.dds-foundation.org/what-is-dds-3/>, read 2026-11-12, summarized.
- [S6] OpenDDS Foundation, "Introduction to DDS", <https://opendds.readthedocs.io/en/master/devguide/introduction_to_dds.html>, read 2026-11-12, summarized.
- [S7] Adelantado, Siron, Chaudron, "Towards an HLA Run-time Infrastructure with Hard Real-time Capabilities", paper 10E-SIW-011, <https://cdimage.debian.org/mirror/gnu.org/savannah/certi/papers/10E-SIW-011.pdf>, read 2026-11-12, summarized.
