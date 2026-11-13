---
id: simulation-realtime-deployment
title: Real-time simulation in containers and Kubernetes
topic: simulation
summary: Real-time simulation in containers and Kubernetes, isolating the stepped core, reserving CPUs, and the multicast limits.
tool: none
version: "none"
checked: 2026-11-13
sources: [S1, S2, S3, S4, S5, S6]
license: MIT (own words; facts summarized from the cited sources)
variant: files
---

# Real-time simulation in containers and Kubernetes

Contents: 1. Rule · 2. Published experience · 3. What to write · Sources

## 1. Rule of deployment (stepped core)

Keep the stepped core in one fixed-step process, as simple as possible; let out only data already computed. Split into services what surrounds it (instructor station, scenarios, snapshots, streaming), never the computation loop. Two published experiences go this way; none measured it on a .NET stack. [S3] [S5]

## 2. Published experience (containers and real time)

| Source | Context | Finding | Limit |
| --- | --- | --- | --- |
| NATO MSG-136, 2019 [S1] | "M&S as a Service": HLA federates in containers | The default Docker overlay network does not pass multicast; containers run unchanged under Docker and Kubernetes | No latency figure in the part read |
| Linutronix, 2023 [S2] | Real-time Linux kernel (PREEMPT_RT), cyclictest, one 4-core machine | Container latency almost equal to bare metal (about 23 µs), virtual machines higher (54 µs at most); needs extra Linux capabilities, the Guaranteed class and one physical core per real-time container | One machine; vendor blog |
| CAE, I/ITSEC 2024 [S3] | Virtualized full flight simulator, two containerized applications | Default settings: near 10 % of 100 Hz frames start 1 ms early or late; with exclusive cores, memory alignment, real-time kernel and fixed priority: as bare metal | Relaxed isolation; motion computer not virtualized; no Kubernetes |
| CAE, I/ITSEC 2025 [S4] | Distributed training on Kubernetes, Kafka, HLA and DIS gateways, Angular clients | Direct HLA about 3 ms; through messaging about 9 ms more; each gateway about 2 ms; almost every integration needed field-by-field fixes | Vendor measures |
| Kratzke, Siegfried, 2021 [S5] | Cloud-native simulation | Smaller composable services gain; moving an existing model as it is can raise costs | Read from the abstract |

## 3. What to write for the stepped core (Kubernetes)

- A Pod of class "Guaranteed": requests equal to limits, CPU as a whole number; the `static` CPU manager policy on the node gives it exclusive cores. [S6] See `docs/kubernetes/resources-realtime.md`.
- No multicast across the default container network: use host networking for that Pod or a unicast transport, by decision of the team. [S1]
- Measure frame overruns in the real cluster before any conclusion.

## Sources

- [S1] NATO STO MSG-136, "Modelling and Simulation as a Service, Volume 4: Experimentation Report", 2019, <https://apps.dtic.mil/sti/pdfs/AD1079102.pdf>, read 2026-11-12, summarized.
- [S2] Linutronix, "Containers and Realtime, is that possible? Even with Kubernetes?", 2023-07-06, <https://www.linutronix.de/blog/Containers-and-Realtime-is-that-possible-Even-with-Kubernetes>, read 2026-11-12, summarized.
- [S3] Arbic, Boivin, Giannias, "Leveraging Data Center Architectures for Full Flight Simulators", I/ITSEC 2024, <https://s3.amazonaws.com/amz.xcdsystem.com/44ECEE4F-033C-295C-BAE73278B7F9CA1D_abstract_File18333/StageTwoPaper_24155_0704044225.pdf>, read 2026-11-12, summarized.
- [S4] Krupp, Koch, Labas, Freeman, Bisaccia, "Achieving Distributed Training Through MSaaS", I/ITSEC 2025, <https://s3.amazonaws.com/amz.xcdsystem.com/44ECEE4F-033C-295C-BAE73278B7F9CA1D_abstract_File20450/PaperStage3FinalEdits_25271_0829031500.pdf>, read 2026-11-12, summarized.
- [S5] Kratzke, Siegfried, "Towards cloud-native simulations", Journal of Defense Modeling and Simulation 18(1), 2021, <https://econpapers.repec.org/RePEc:sae:joudef:v:18:y:2021:i:1:p:39-58>, read 2026-11-12, summarized.
- [S6] Kubernetes, "Control CPU Management Policies on the Node", <https://kubernetes.io/docs/tasks/administer-cluster/cpu-management-policies/>, read 2026-11-12, CC BY 4.0, summarized.
