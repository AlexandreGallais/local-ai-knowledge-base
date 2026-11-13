---
title: "podman pod clone pod-name (part 3 of 5)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-pod-clone.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman pod clone pod-name (part 3 of 5)

### `SubUIDMap=name`
<< else >>
#### **--subuidname**=*name*
<< endif >>

Run the container in a new user namespace using the map with _name_ in the _/etc/subuid_ file.
When running rootless, the user needs the necessary permissions to use the mapping. See **subuid**(5).
This flag conflicts with << '**UserNS=**' if is_quadlet else '**--userns**' >> and << '**UIDMap=**' if is_quadlet else '**--uidmap**' >>.
Together with << '**UIDMap=**' if is_quadlet else '**--uidmap**' >> it acts as if << '**UIDMap=**' if is_quadlet else '**--uidmap**' >> was passed with all mappings of the _name_ user in _/etc/subuid_.

<< if is_quadlet >>
### `Sysctl=name=value`
<< else >>
#### **--sysctl**=*name=value*
<< endif >>

Configure namespaced kernel parameters <<at runtime|for all containers in the pod>>.

For the IPC namespace, the following sysctls are allowed:

- kernel.msgmax
- kernel.msgmnb
- kernel.msgmni
- kernel.sem
- kernel.shmall
- kernel.shmmax
- kernel.shmmni
- kernel.shm_rmid_forced
- Sysctls beginning with fs.mqueue.\*

Note: <<if using the **--ipc=host** option|if the ipc namespace is not shared within the pod>>, the above sysctls are not allowed.

For the network namespace, only sysctls beginning with net.\* are allowed.

Note: <<if using the **--network=host** option|if the network namespace is not shared within the pod>>, the above sysctls are not allowed.

#### **--uts**=*how*

Sets the configuration for UTS namespaces when handling `RUN` instructions.
The configured value can be "" (the empty string) or "container" to indicate that a new UTS namespace to be created, or it can be "host" to indicate that the UTS namespace in which `podman` itself is being run is reused, or it can be the path to a UTS namespace which is already in use by another process.

<< if is_quadlet >>
