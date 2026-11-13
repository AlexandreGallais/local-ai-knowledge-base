---
title: "Extension architecture"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/extensions/extensions-sdk/architecture/_index.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Extension architecture

Extensions are applications that run inside the Docker Desktop. They're packaged as Docker images, distributed
through Docker Hub, and installed by users either through the Marketplace within the Docker Desktop Dashboard or the
Docker Extensions CLI.

Extensions can be composed of three (optional) components:
- A frontend (or User Interface): A web application displayed in a tab of the dashboard in Docker Desktop
- A backend: One or many containerized services running in the Docker Desktop VM
- Executables: Shell scripts or binaries that Docker Desktop copies on the host when installing the extension

An extension doesn't necessarily need to have all these components, but at least one of them depending on the extension features.
To configure and run those components, Docker Desktop uses a `metadata.json` file. See the
metadata section for more details.

## The frontend

The frontend is basically a web application made from HTML, Javascript, and CSS. It can be built with a simple HTML
file, some vanilla Javascript or any frontend framework, such as React or Vue.js.

When Docker Desktop installs the extension, it extracts the UI folder from the extension image, as defined by the
`ui` section in the `metadata.json`. See the ui metadata section for more details.

Every time users click on the **Extensions** tab, Docker Desktop initializes the extension's UI as if it was the first time. When they navigate away from the tab, both the UI itself and all the sub-processes started by it (if any) are terminated.

The frontend can invoke `docker` commands, communicate with the extension backend, or invoke extension executables
deployed on the host, through the Extensions SDK.

> **Tip:**
>
> The `docker extension init` generates a React based extension. But you can still use it as a starting point for
> your own extension and use any other frontend framework, like Vue, Angular, Svelte, etc. or event stay with
> vanilla Javascript.

Learn more about building a frontend for your extension.

## The backend

Alongside a frontend application, extensions can also contain one or many backend services. In most cases, the Extension does not need a backend, and features can be implemented just by invoking docker commands through the SDK. However, there are some cases when an extension requires a backend
	service, for example:
- To run long-running processes that must outlive the frontend
- To store data in a local database and serve them back with a REST API
- To store the extension state, like when a button starts a long-running process, so that if you navigate away
  from the extension and come back, the frontend can pick up where it left off
- To access specific resources in the Docker Desktop VM, for example by mounting folders in the compose
file

> **Tip:**
>
> The `docker extension init` generates a Go backend. But you can still use it as a starting point for
> your own extension and use any other language like Node.js, Python, Java, .Net, or any other language and framework.

Usually, the backend is made of one container that runs within the Docker Desktop VM. Internally, Docker Desktop creates
a Docker Compose project, creates the container from the `image` option of the `vm` section of the `metadata.json`, and
attaches it to the Compose project. See the `vm` metadata section for more details.

In some cases, a `compose.yaml` file can be used instead of an `image`. This is useful when the backend container
needs more specific options, such as mounting volumes or requesting capabilities
that can't be expressed just with a Docker image. The `compose.yaml` file can also be used to add multiple containers
needed by the extension, like a database or a message broker.
Note that, if the Compose file defines many services, the SDK can only contact the first of them.

> **Note:**
>
> In some cases, it is useful to also interact with Docker Engine from the backend.
> See How to use the Docker socket from the backend.

To communicate with the backend, the Extension SDK provides functions to make `GET`,
`POST`, `PUT`, `HEAD`, and `DELETE` requests from the frontend. Under the hood, the communication is done through a socket
or named pipe, depending on the operating system. If the backend was listening to a port, it would be difficult to
prevent collision with other applications running on the host or in a container already. Also, some users are
running Docker Desktop in constrained environments where they can't open ports on their machines.

Finally, the backend can be built with any technology, as long as it can run in a container and listen on a socket.

Learn more about adding a backend to your extension.

## Executables

In addition to the frontend and the backend, extensions can also contain executables. Executables are binaries or shell scripts
that are installed on the host when the extension is installed. The frontend can invoke them with the extension SDK.

These executables are useful when the extension needs to interact with a third-party CLI tool, like AWS, `kubectl`, etc.
Shipping those executables with the extension ensure that the CLI tool is always available, at the right version, on
the users' machine.

When Docker Desktop installs the extension, it copies the executables on the host as defined by the `host` section in
the `metadata.json`. See the `host` metadata section for more details.

However, since they're executed on the users' machine, they have to be available to the platform they're running on.
For example, if you want to ship the `kubectl` executable, you need to provide a different version for Windows, Mac,
and Linux. Multi arch images will also need to include binaries built for the right arch (AMD / ARM)

See the host metadata section for more details.

Learn how to invoke host binaries.
