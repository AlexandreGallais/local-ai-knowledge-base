---
title: "Deploy services to a swarm (part 1 of 4)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/swarm/services.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Deploy services to a swarm

Swarm services use a declarative model, which means that you define the
desired state of the service, and rely upon Docker to maintain this state. The
state includes information such as (but not limited to):

- The image name and tag the service containers should run
- How many containers participate in the service
- Whether any ports are exposed to clients outside the swarm
- Whether the service should start automatically when Docker starts
- The specific behavior that happens when the service is restarted (such as
  whether a rolling restart is used)
- Characteristics of the nodes where the service can run (such as resource
  constraints and placement preferences)

For an overview of Swarm mode, see Swarm mode key concepts.
For an overview of how services work, see
How services work.

## Create a service

To create a single-replica service with no extra configuration, you only need
to supply the image name. This command starts an Nginx service with a
randomly-generated name and no published ports. This is a naive example, since
you can't interact with the Nginx service.

```console
$ docker service create nginx
```

The service is scheduled on an available node. To confirm that the service
was created and started successfully, use the `docker service ls` command:

```console
$ docker service ls

ID                  NAME                MODE                REPLICAS            IMAGE                                                                                             PORTS
a3iixnklxuem        quizzical_lamarr    replicated          1/1                 docker.io/library/nginx@sha256:41ad9967ea448d7c2b203c699b429abe1ed5af331cd92533900c6d77490e0268
```

Created services do not always run right away. A service can be in a pending
state if its image is unavailable, if no node meets the requirements you
configure for the service, or for other reasons. See
Pending services for more
information.

To provide a name for your service, use the `--name` flag:

```console
$ docker service create --name my_web nginx
```

Just like with standalone containers, you can specify a command that the
service's containers should run, by adding it after the image name. This example
starts a service called `helloworld` which uses an `alpine` image and runs the
command `ping docker.com`:

```console
$ docker service create --name helloworld alpine ping docker.com
```

You can also specify an image tag for the service to use. This example modifies
the previous one to use the `alpine:3.6` tag:

```console
$ docker service create --name helloworld alpine:3.6 ping docker.com
```

For more details about image tag resolution, see
Specify the image version the service should use.

### gMSA for Swarm

> **Note:**
>
> This example only works for a Windows container.

Swarm now allows using a Docker config as a gMSA credential spec - a requirement for Active Directory-authenticated applications. This reduces the burden of distributing credential specs to the nodes they're used on.

The following example assumes a gMSA and its credential spec (called credspec.json) already exists, and that the nodes being deployed to are correctly configured for the gMSA.

To use a config as a credential spec, first create the Docker config containing the credential spec:

```console
$ docker config create credspec credspec.json
```

Now, you should have a Docker config named credspec, and you can create a service using this credential spec. To do so, use the --credential-spec flag with the config name, like this:

```console
$ docker service create --credential-spec="config://credspec" <your image>
```

Your service uses the gMSA credential spec when it starts, but unlike a typical Docker config (used by passing the --config flag), the credential spec is not mounted into the container.

### Create a service using an image on a private registry

If your image is available on a private registry which requires login, use the
`--with-registry-auth` flag with `docker service create`, after logging in. If
your image is stored on `registry.example.com`, which is a private registry, use
a command like the following:

```console
$ docker login registry.example.com

$ docker service  create \
  --with-registry-auth \
  --name my_service \
  registry.example.com/acme/my_image:latest
```

This passes the login token from your local client to the swarm nodes where the
service is deployed, using the encrypted WAL logs. With this information, the
nodes are able to log into the registry and pull the image.

### Provide credential specs for managed service accounts

 In Enterprise Edition 3.0, security is improved through the centralized distribution and management of Group Managed Service Account(gMSA) credentials using Docker config functionality. Swarm now allows using a Docker config as a gMSA credential spec, which reduces the burden of distributing credential specs to the nodes on which they are used.

> **Note:**
>
> This option is only applicable to services using Windows containers.

 Credential spec files are applied at runtime, eliminating the need for host-based credential spec files or registry entries - no gMSA credentials are written to disk on worker nodes. You can make credential specs available to Docker Engine running swarm kit worker nodes before a container starts. When deploying a service using a gMSA-based config, the credential spec is passed directly to the runtime of containers in that service.

 The `--credential-spec` must be in one of the following formats:

 - `file://<filename>`: The referenced file must be present in the `CredentialSpecs` subdirectory in the docker data directory, which defaults to `C:\ProgramData\Docker\` on Windows. For example, specifying `file://spec.json` loads `C:\ProgramData\Docker\CredentialSpecs\spec.json`.
- `registry://<value-name>`: The credential spec is read from the Windows registry on the daemon’s host.
- `config://<config-name>`: The config name is automatically converted to the config ID in the CLI.
The credential spec contained in the specified `config` is used.

 The following simple example retrieves the gMSA name and JSON contents from your Active Directory (AD) instance:

 ```console
$ name="mygmsa"
$ contents="{...}"
$ echo $contents > contents.json
```

Make sure that the nodes to which you are deploying are correctly configured for the gMSA.

 To use a config as a credential spec, create a Docker config in a credential spec file named `credpspec.json`.
 You can specify any name for the name of the `config`.

```console
$ docker config create --label com.docker.gmsa.name=mygmsa credspec credspec.json
```

Now you can create a service using this credential spec. Specify the `--credential-spec` flag with the config name:

```console
$ docker service create --credential-spec="config://credspec" <your image>
```

 Your service uses the gMSA credential spec when it starts, but unlike a typical Docker config (used by passing the --config flag), the credential spec is not mounted into the container.

## Update a service

You can change almost everything about an existing service using the
`docker service update` command. When you update a service, Docker stops its
containers and restarts them with the new configuration.

Since Nginx is a web service, it works much better if you publish port 80
to clients outside the swarm. You can specify this when you create the service,
using the `-p` or `--publish` flag. When updating an existing service, the flag
is `--publish-add`. There is also a `--publish-rm` flag to remove a port that
was previously published.

Assuming that the `my_web` service from the previous section still exists, use
the following command to update it to publish port 80.

```console
$ docker service update --publish-add 80 my_web
```

To verify that it worked, use `docker service ls`:

```console
$ docker service ls

ID                  NAME                MODE                REPLICAS            IMAGE                                                                                             PORTS
4nhxl7oxw5vz        my_web              replicated          1/1                 docker.io/library/nginx@sha256:41ad9967ea448d7c2b203c699b429abe1ed5af331cd92533900c6d77490e0268   *:0->80/tcp
```

For more information on how publishing ports works, see
publish ports.

You can update almost every configuration detail about an existing service,
including the image name and tag it runs. See
Update a service's image after creation.

## Remove a service

To remove a service, use the `docker service remove` command. You can remove a
service by its ID or name, as shown in the output of the `docker service ls`
command. The following command removes the `my_web` service.

```console
$ docker service remove my_web
```
