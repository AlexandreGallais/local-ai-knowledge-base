---
title: "Resource constraints (part 1 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/containers/resource_constraints.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Resource constraints

By default, a container has no resource constraints and can use as much of a
given resource as the host's kernel scheduler allows. Docker provides ways
to control how much memory, or CPU a container can use, setting runtime
configuration flags of the `docker run` command. This section provides details
on when you should set such limits and the possible implications of setting them.

Many of these features require your kernel to support Linux capabilities. To
check for support, you can use the
`docker info` command. If a capability
is disabled in your kernel, you may see a warning at the end of the output like
the following:

```console
WARNING: No swap limit support
```

Consult your operating system's documentation for enabling them. See also the
Docker Engine troubleshooting guide
for more information.

## Understand the risks of running out of memory

It's important not to allow a running container to consume too much of the
host machine's memory. On Linux hosts, if the kernel detects that there isn't
enough memory to perform important system functions, it throws an `OOME`, or
`Out Of Memory Exception`, and starts killing processes to free up
memory. Any process is subject to killing, including Docker and other important
applications. This can effectively bring the entire system down if the wrong
process is killed.

Docker attempts to mitigate these risks by adjusting the OOM priority on the
Docker daemon so that it's less likely to be killed than other processes
on the system. The OOM priority on containers isn't adjusted. This makes it more
likely for an individual container to be killed than for the Docker daemon
or other system processes to be killed. You shouldn't try to circumvent
these safeguards by manually setting `--oom-score-adj` to an extreme negative
number on the daemon or a container, or by setting `--oom-kill-disable` on a
container.

For more information about the Linux kernel's OOM management, see
Out of Memory Management.

You can mitigate the risk of system instability due to OOME by:

- Perform tests to understand the memory requirements of your application
  before placing it into production.
- Ensure that your application runs only on hosts with adequate resources.
- Limit the amount of memory your container can use, as described below.
- Be mindful when configuring swap on your Docker hosts. Swap is slower than
  memory but can provide a buffer against running out of system memory.
- Consider converting your container to a
  service, and using service-level constraints
  and node labels to ensure that the application runs only on hosts with enough
  memory

### Limit a container's access to memory

Docker can enforce hard or soft memory limits.

- Hard limits let the container use no more than a fixed amount of memory.
- Soft limits let the container use as much memory as it needs unless certain
  conditions are met, such as when the kernel detects low memory or contention on
  the host machine.

Some of these options have different effects when used alone or when more than
one option is set.

Most of these options take a positive integer, followed by a suffix of `b`, `k`,
`m`, `g`, to indicate bytes, kilobytes, megabytes, or gigabytes.

| Option                 | Description                                                                                                                                                                                                                                                                                                                                                                                     |
| :--------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-m` or `--memory=`    | The maximum amount of memory the container can use. If you set this option, the minimum allowed value is `6m` (6 megabytes). That is, you must set the value to at least 6 megabytes.                                                                                                                                                                                                           |
| `--memory-swap`\*      | The amount of memory this container is allowed to swap to disk. See `--memory-swap` details.                                                                                                                                                                                                                                                                          |
| `--memory-swappiness`  | By default, the host kernel can swap out a percentage of anonymous pages used by a container. You can set `--memory-swappiness` to a value between 0 and 100, to tune this percentage. See `--memory-swappiness` details.                                                                                                                                       |
| `--memory-reservation` | Allows you to specify a soft limit smaller than `--memory` which is activated when Docker detects contention or low memory on the host machine. If you use `--memory-reservation`, it must be set lower than `--memory` for it to take precedence. Because it is a soft limit, it doesn't guarantee that the container doesn't exceed the limit.                                                |
| `--oom-kill-disable`   | By default, if an out-of-memory (OOM) error occurs, the kernel kills processes in a container. To change this behavior, use the `--oom-kill-disable` option. Only disable the OOM killer on containers where you have also set the `-m/--memory` option. If the `-m` flag isn't set, the host can run out of memory and the kernel may need to kill the host system's processes to free memory. |

For more information about cgroups and memory in general, see the documentation
for Memory Resource Controller.

### `--memory-swap` details

`--memory-swap` is a modifier flag that only has meaning if `--memory` is also
set. Using swap allows the container to write excess memory requirements to disk
when the container has exhausted all the RAM that's available to it. There is a
performance penalty for applications that swap memory to disk often.

Its setting can have complicated effects:

- If `--memory-swap` is set to a positive integer, then both `--memory` and
  `--memory-swap` must be set. `--memory-swap` represents the total amount of
  memory and swap that can be used, and `--memory` controls the amount used by
  non-swap memory. So if `--memory="300m"` and `--memory-swap="1g"`, the
  container can use 300m of memory and 700m (`1g - 300m`) swap.

- If `--memory-swap` is set to `0`, the setting is ignored, and the value is
  treated as unset.

- If `--memory-swap` is set to the same value as `--memory`, and `--memory` is
  set to a positive integer, **the container doesn't have access to swap**.
  See
  Prevent a container from using swap.

- If `--memory-swap` is unset, and `--memory` is set, the container can use
  as much swap as the `--memory` setting, if the host has swap
  memory configured. For instance, if `--memory="300m"` and `--memory-swap` is
  not set, the container can use 600m in total of memory and swap.

- If `--memory-swap` is explicitly set to `-1`, the container is allowed to use
  unlimited swap, up to the amount available on the host system.

- Inside the container, tools like `free` report the host's available swap, not what's available inside the container. Don't rely on the output of `free` or similar tools to determine whether swap is present.

#### Prevent a container from using swap

If `--memory` and `--memory-swap` are set to the same value, this prevents
containers from using any swap. This is because `--memory-swap` is the amount of
combined memory and swap that can be used, while `--memory` is only the amount
of physical memory that can be used.

### `--memory-swappiness` details

- A value of 0 turns off anonymous page swapping.
- A value of 100 sets all anonymous pages as swappable.
- By default, if you don't set `--memory-swappiness`, the value is
  inherited from the host machine.
