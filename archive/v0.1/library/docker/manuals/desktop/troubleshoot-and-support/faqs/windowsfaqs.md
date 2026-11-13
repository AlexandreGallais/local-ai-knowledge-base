---
title: "FAQs for Docker Desktop for Windows"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/troubleshoot-and-support/faqs/windowsfaqs.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# FAQs for Docker Desktop for Windows

### Can I use VirtualBox alongside Docker Desktop?

Yes, you can run VirtualBox along with Docker Desktop if you have enabled the Windows Hypervisor Platform feature on your machine.

### Why is Windows 10 or Windows 11 required?

Docker Desktop uses the Windows Hyper-V features. While older Windows versions have Hyper-V, their Hyper-V implementations lack features critical for Docker Desktop to work.

### Can I run Docker Desktop on Windows Server?

No, running Docker Desktop on Windows Server is not supported.

### How do symlinks work on Windows?

Docker Desktop supports two types of symlinks: Windows native symlinks and symlinks created inside a container.

The Windows native symlinks are visible within the containers as symlinks, whereas symlinks created inside a container are represented as mfsymlinks. These are regular Windows files with a special metadata. Therefore the symlinks created inside a container appear as symlinks inside the container, but not on the host.

### File sharing with Kubernetes and WSL 2

Docker Desktop mounts the Windows host filesystem under `/run/desktop` inside the container running Kubernetes.
See the Stack Overflow post for an example of how to configure a Kubernetes Persistent Volume to represent directories on the host.

### How do I add custom CA certificates?

You can add trusted Certificate Authorities (CAs) to your Docker daemon to verify registry server certificates, and client certificates, to authenticate to registries.

Docker Desktop supports all trusted Certificate Authorities (CAs) (root or
intermediate). Docker recognizes certs stored under Trust Root
Certification Authorities or Intermediate Certification Authorities.

Docker Desktop creates a certificate bundle of all user-trusted CAs based on
the Windows certificate store, and appends it to Moby trusted certificates. Therefore, if an enterprise SSL certificate is trusted by the user on the host, it is trusted by Docker Desktop.

To learn more about how to install a CA root certificate for the registry, see
Verify repository client with certificates
in the Docker Engine topics.

### How do I add client certificates?

You can add your client certificates
in `~/.docker/certs.d/<MyRegistry>:<Port>/client.cert` and
`~/.docker/certs.d/<MyRegistry>:<Port>/client.key`. You do not need to push your certificates with `git` commands.

When the Docker Desktop application starts, it copies the
`~/.docker/certs.d` folder on your Windows system to the `/etc/docker/certs.d`
directory inside the Docker Desktop Linux VM.

You need to restart Docker Desktop after making any changes to the keychain
or to the `~/.docker/certs.d` directory in order for the changes to take effect.

The registry cannot be listed as an insecure registry (see
Docker Daemon). Docker Desktop ignores
certificates listed under insecure registries, and does not send client
certificates. Commands like `docker run` that attempt to pull from the registry
produce error messages on the command line, as well as on the registry.

To learn more about how to set the client TLS certificate for verification, see
Verify repository client with certificates
in the Docker Engine topics.
