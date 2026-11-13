---
title: "podman-ps.1 (part 1 of 2)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-ps.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-ps.1

% podman-ps 1

## NAME
podman\-ps - Print out information about containers

## SYNOPSIS
**podman ps** [*options*]

**podman container ps** [*options*]

**podman container list** [*options*]

**podman container ls** [*options*]

## DESCRIPTION
**podman ps** lists the running containers on the system. Use the **--all** flag to view
all the containers information.  By default it lists:

 * container id
 * the name of the image the container is using
 * the COMMAND the container is executing
 * the time the container was created
 * the status of the container
 * port mappings the container is using
 * alternative names for the container

## OPTIONS

#### **--all**, **-a**

Show all the containers, default is only running containers.

Note: Podman shares containers storage with other tools such as Buildah and CRI-O. In some cases these `external` containers might also exist in the same storage. Use the `--external` option to see these external containers. External containers show the 'storage' status.

#### **--external**

Display external containers that are not controlled by Podman but are stored in containers storage.  These external containers are generally created via other container technology such as Buildah or CRI-O and may depend on the same container images that Podman is also using.  External containers are denoted with either a 'buildah' or 'storage' in the COMMAND and STATUS column of the ps output.

The **restart-policy**, **volume**, **health**, and **annotation** filters are not applicable for external containers.

#### **--format**=*format*

Pretty-print containers to JSON or using a Go template

Valid placeholders for the Go template are listed below:

| **Placeholder**    | **Description**                              |
|--------------------|----------------------------------------------|
| .AutoRemove        | If true, containers are removed on exit      |
| .CIDFile           | Container ID File                            |
| .Command           | Quoted command used                          |
| .Created ...       | Creation time for container, Y-M-D H:M:S     |
| .CreatedAt         | Creation time for container (same as above)  |
| .CreatedHuman      | Creation time, relative                      |
| .ExitCode          | Container exit code                          |
| .Exited            | "true" if container has exited               |
| .ExitedAt          | Time (epoch seconds) that container exited   |
| .ExposedPorts ...  | Map of exposed ports on this container       |
| .ID                | Container ID                                 |
| .Image             | Image Name/ID                                |
| .ImageID           | Image ID                                     |
| .IsInfra           | "true" if infra container                    |
| .Label *string*    | Specified label of the container             |
| .Labels            | All the labels assigned to the container     |
| .Mounts            | Volumes mounted in the container             |
| .Names             | Name of container                            |
| .Networks          | Show all networks connected to the container |
| .Pid               | Process ID on host system                    |
| .Pod               | Pod the container is associated with (SHA)   |
| .PodName           | PodName of the container                     |
| .Ports             | Forwarded and exposed ports                  |
| .Restarts          | Display the container restart count          |
| .RunningFor        | Time elapsed since container was started     |
| .Size              | Size of container                            |
| .StartedAt         | Time (epoch seconds) the container started   |
| .State             | Human-friendly description of ctr state      |
| .Status            | Status of container                          |

#### **--help**, **-h**

Print usage statement

#### **--last**, **-n**

Print the n last created containers (all states)

#### **--latest**, **-l**

Show the latest container created (all states) (This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines)

#### **--namespace**, **--ns**

Display namespace information

#### **--no-trunc**

Do not truncate the output (default *false*).

#### **--noheading**

Omit the table headings from the listing of containers.

#### **--pod**, **-p**

Display the pods the containers are associated with

#### **--quiet**, **-q**

Print the numeric IDs of the containers only

#### **--size**, **-s**

Display the total file size

#### **--sort**=*created*

Sort by command, created, id, image, names, pod, runningfor, size, or status",
Note: Choosing size sorts by size of rootFs, not alphabetically like the rest of the options

#### **--sync**

Force a sync of container state with the OCI runtime.
In some cases, a container's state in the runtime can become out of sync with Podman's state.
This updates Podman's state based on what the OCI runtime reports.
Forcibly syncing is much slower, but can resolve inconsistent state issues.

#### **--watch**, **-w**

Refresh the output with current containers on an interval in seconds.
