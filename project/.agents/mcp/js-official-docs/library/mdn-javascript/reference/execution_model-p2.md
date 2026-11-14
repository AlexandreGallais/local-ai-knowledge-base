---
title: "JavaScript execution model (part 2 of 2)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/execution_model/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# JavaScript execution model (part 2 of 2)

## Agent clusters and memory sharing

Multiple agents can communicate via memory sharing, forming an **agent cluster**. Agents are within the same cluster if and only if they can share memory. Agents not in the same cluster can still exchange information with other protocols, such as `postMessage()`.

When creating an agent (such as by spawning a worker), there are some criteria for whether it's in the same cluster as the current agent, or a new cluster is created. For example, the following pairs of global objects are each within the same agent cluster, and thus can share memory with each other:

- A `Window` object and a dedicated worker that it created.
- A worker (of any type) and a dedicated worker it created.
- A `Window` object A and the `Window` object of a same-origin `iframe` element that A created.
- A `Window` object and a same-origin `Window` object that opened it.
- A `Window` object and a worklet that it created.

The following pairs of global objects are not within the same agent cluster, and thus cannot share memory:

- A `Window` object and a shared worker it created.
- A worker (of any type) and a shared worker it created.
- A `Window` object and a service worker it created.
- A `Window` object A and the `Window` object of an `iframe` element that A created and is cross-origin with A when A's agent cluster is origin-keyed.
- Any two `Window` objects with no opener or ancestor relationship. This holds even if the two `Window` objects are same origin.

For the exact algorithm, check the HTML specification.

### Cross-agent communication and memory model

As aforementioned, agents communicate via memory sharing. On the web, memory is shared via the `postMessage()` method. The using web workers guide provides an overview of this. Typically, data is passed by value only (via structured cloning), and therefore does not involve any concurrency complications. To share memory, one must post a `SharedArrayBuffer` object, which can be simultaneously accessed by multiple agents. Once two agents share access to the same memory via a `SharedArrayBuffer`, they can synchronize executions via the `Atomics` object.

There are two ways to access shared memory: via normal memory access (which is not atomic) and via atomic memory access. The latter is sequentially consistent (which means there is a strict total ordering of events agreed upon by all agents in the cluster), while the former is unordered (which means no ordering exists); JavaScript does not provide operations with other ordering guarantees.

The spec provides the following guidelines for programmers working with shared memory:

> We recommend programs be kept data race free, i.e., make it so that it is impossible for there to be concurrent non-atomic operations on the same memory location. Data race free programs have interleaving semantics where each step in the evaluation semantics of each agent are interleaved with each other. For data race free programs, it is not necessary to understand the details of the memory model. The details are unlikely to build intuition that will help one to better write ECMAScript.
>
> More generally, even if a program is not data race free it may have predictable behavior, so long as atomic operations are not involved in any data races and the operations that race all have the same access size. The simplest way to arrange for atomics not to be involved in races is to ensure that different memory cells are used by atomic and non-atomic operations and that atomic accesses of different sizes are not used to access the same cells at the same time. Effectively, the program should treat shared memory as strongly typed as much as possible. One still cannot depend on the ordering and timing of non-atomic accesses that race, but if memory is treated as strongly typed the racing accesses will not "tear" (bits of their values will not be mixed).

### Concurrency and ensuring forward progress

When multiple agents cooperate, the never-blocking guarantee does not always hold. An agent can become _blocked_, or paused, while waiting for another agent to perform some action. This is different from waiting on a promise in the same agent, because it halts the entire agent and does not allow any other code to run in the meantime—in other words, it cannot make _forward progress_.

To prevent deadlocks, there are some strong restrictions on when and which agents can become blocked.

- Every unblocked agent with a dedicated executing thread eventually makes forward progress.
- In a set of agents that share an executing thread, one agent eventually makes forward progress.
- An agent does not cause another agent to become blocked except via explicit APIs that provide blocking.
- Only certain agents can be blocked. On the web, this includes dedicated workers and shared workers, but not similar-origin windows or service workers.

The agent cluster ensures some level of integrity over the activeness of its agents, in the case of external pauses or terminations:

- An agent may be paused or resumed without its knowledge or cooperation. For example, navigating away from a window may suspend code execution but preserve its state. However, an agent cluster is not allowed to be partially deactivated, to avoid an agent starving because another agent has been deactivated. For example, shared workers are never in the same agent cluster as the creator window or other dedicated workers. This is because a shared worker's lifetime is independent of documents: if a document is deactivated while its dedicated worker holds a lock, the shared worker is blocked from acquiring the lock until the dedicated worker is reactivated, if ever. Meanwhile other workers trying to access the shared worker from other windows will starve.
- Similarly, an agent may be terminated by factors external to the cluster. For example, operating systems or users killing a browser process, or the browser force-terminating one agent because it's using too many resources. In this case, all the agents in the cluster get terminated. (The spec also allows a second strategy, which is an API that allows at least one remaining member of the cluster to identify the termination and the agent that was terminated, but this is not implemented on the web.)

## See also

- Agent communication and coordination
- Event loops in the HTML standard
- What is the Event Loop? in the Node.js docs
