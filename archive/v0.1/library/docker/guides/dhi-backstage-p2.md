---
title: "Secure a Backstage application with Docker Hardened Images (part 2 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/guides/dhi-backstage.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Secure a Backstage application with Docker Hardened Images (part 2 of 2)

## Step 4: Remove the shell and the package manager with DHI customizations

The previous steps still use the `-dev` or `-sfw-dev` variant as the runtime image, which includes a shell and package manager. DHI customizations let you start from the base (non-dev) image — which has no shell and no package manager — and add only the runtime libraries and language runtimes your application needs.

> **Important:**
>
> When creating a customization, only add what your application needs at runtime:
>
> - **System packages** - add shared libraries (such as `sqlite-libs`) and
>   language runtimes from the DHI catalog (such as `python-3.14`).
>   Do not add build tools (such as `g++`, `make`, or `python3` from Alpine).
> - **Build tools** - keep these in the `-dev` build stage only. Never add them
>   to the runtime customization.
>
> Language runtimes installed from the DHI hardened package feed are patched and
> tracked in the image SBOM, which is why they are acceptable as system packages.
> Build tools from Alpine or Debian package feeds are not hardened and should
> never appear in the runtime image.

For Backstage, the runtime image needs:

- **sqlite-libs** - the shared library that the compiled `better-sqlite3` native module links against (added as a system package).
- **Python** - if your Backstage plugins or configuration require Python at runtime. Added as the `python-3.14` system package from the DHI catalog. Unlike `python3` installed via `apk`, this package is patched by Docker and tracked in the image SBOM.

Docker will continuously build with SLSA Level 3 compliance and patch these customized images within the guaranteed SLA for CVE patching.

To create the customization, use one of the following methods.

**Docker Hub UI**

After you mirror the Node.js DHI repository to your organization's namespace:

1. Open the mirrored Node.js repository in Docker Hub.
2. Select **Customize** and choose the `node:24-alpine3.23` tag.
3. Under **Packages**, add `sqlite-libs` and `python-3.14`.
4. Create the customization.

For more information, see Customize an image.

**dhictl CLI**

`dhictl` is Docker's command-line tool for managing Docker Hardened Images. It lets you browse the DHI catalog, mirror images, and create customizations directly from your terminal. You can integrate `dhictl` into CI/CD pipelines and infrastructure-as-code workflows. You can install `dhictl` as a standalone binary or as a Docker CLI plugin (`docker dhi`); for installation instructions, see Use the DHI CLI.

Rather than writing the customization YAML by hand, use `dhictl` to scaffold a starting point:

```console
dhictl customization prepare --org YOUR_ORG node 24-alpine3.23 \
    --destination YOUR_ORG/dhi-node \
    --name "backstage" \
    --tag-suffix "_backstage" \
    --output node-backstage.yaml
```

Edit the generated file to add the runtime libraries:

```yaml
name: backstage

source: dhi/node
tag_definition_id: node/alpine-3.23/24

destination: YOUR_ORG/dhi-node
tag_suffix: _backstage

platforms:
  - linux/amd64
  - linux/arm64

contents:
  packages:
    - sqlite-libs
    - python-3.14

accounts:
  root: true
  runs-as: node
  users:
    - name: node
      uid: 1000
  groups:
    - name: node
      gid: 1000

```

Then create the customization:

```console
dhictl customization create --org YOUR_ORG node-backstage.yaml
```

Monitor the build progress using the customization ID from the create output.
To look up the ID, run:

```console
dhictl customization list --org YOUR_ORG
```

Then monitor the build:

```console
dhictl customization build list <customization-id> --org YOUR_ORG
```

Docker builds the customized image on its secure infrastructure and publishes it as `YOUR_ORG/dhi-node:24-alpine3.23_backstage`.

> **Note:**
>
> If your Backstage configuration does not require Python at runtime, you can omit the `python-3.14` from the packages list. The `sqlite-libs` package alone is sufficient to run Backstage with `better-sqlite3`.

### Update the Dockerfile

Update only the final stage of your Dockerfile to use the customized image:

```dockerfile
# Final Stage: create the runtime image
FROM YOUR_ORG/dhi-node:24-alpine3.23_backstage
WORKDIR /app
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/packages/backend/dist/bundle/ ./
CMD ["node", "packages/backend", "--config", "app-config.yaml"]
```

Build this version:

```console
docker build -t backstage:dhi .
```

Since the customization includes only runtime libraries and OCI artifacts — no build tools, no package manager, no shell — the resulting image is distroless:

```console
docker run --rm YOUR_ORG/dhi-node:24-alpine3.23_backstage sh -c "echo hello"
docker: Error response from daemon: ... exec: "sh": executable file not found in $PATH
```

With the Enterprise customization:

- The runtime image is distroless — no shell, no package manager.
- Docker automatically rebuilds your customized image when the base Node.js image or any of its packages receive a security patch.
- The full chain of trust is maintained, including SLSA Build Level 3 provenance.
- Both the Node.js and Python runtimes are tracked in the image SBOM.

Confirm the container no longer has shell access:

```console
docker exec -it <container-id> sh
OCI runtime exec failed: exec failed: unable to start container process: ...
```

Use Docker Debug if you need to troubleshoot a running distroless container.

> **Note:**
>
> If your organization requires FIPS/STIG compliant images, that's also an option in DHI Enterprise.

## Step 5: Verify the results

Compare the DHI-based image against the original using Docker Scout:

```console
docker scout compare backstage:dhi \
    --to backstage:init \
    --platform linux/amd64 \
    --ignore-unchanged
```

A typical comparison across the approaches shows results similar to the following:

| Metric | Original | DHI -dev | DHI -sfw-dev | Enterprise |
|--------|----------|----------|--------------|------------|
| Disk usage | 1.61 GB | 1.72 GB | 1.9 GB | 1.49 GB |
| Content size | 268 MB | 288 MB | 328 MB | 247 MB |
| Shell in runtime | Yes | Yes | Yes | No |
| Package manager | Yes | Yes | Yes | No |
| Non-root default | No | No | No | Yes |
| Socket Firewall | No | No | Yes (build) | Yes (build) / No (runtime) |
| SLSA provenance | No | Base only | Base only | Full (Level 3) |

> **Note:**
>
> The `-sfw-dev` variant is larger because Socket Firewall adds monitoring tooling to the image. The additional size is in the build stages, and the security benefit during `yarn install` outweighs the size increase.

For a more thorough assessment, scan with multiple tools:

```console
trivy image backstage:dhi
grype backstage:dhi
docker scout quickview backstage:dhi
```

Different scanners detect different issues. Running all three gives you the most complete view of your security posture.

## What's next

- Customize an image — complete reference on the Enterprise customization UI.
- Create and build a DHI — learn how to write a DHI definition file, build images locally.
- Use the DHI CLI — manage DHI images, mirrors, and customizations from the command line.
- Migrate to DHI — for applications that work with standard DHI images without additional packages.
- Compare images — evaluate security improvements between your original and hardened images.
- Docker Debug — troubleshoot distroless containers that have no shell.
