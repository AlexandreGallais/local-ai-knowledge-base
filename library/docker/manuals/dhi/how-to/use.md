---
title: "Use a Docker Hardened Image (part 1 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/dhi/how-to/use.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Use a Docker Hardened Image

You can use a Docker Hardened Image (DHI) just like any other image on Docker
Hub. DHIs follow the same familiar usage patterns. Pull them with `docker pull`,
reference them in your Dockerfile, and run containers with `docker run`.

The key difference is that DHIs are security-focused and intentionally minimal
to reduce the attack surface. This means some variants don't include a shell or
package manager, and may run as a non-root user by default.

> **Important:**
>
> You must authenticate to the Docker Hardened Images registry (`dhi.io`) to
> pull DHI Community images. You can authenticate using either of the following:
>
> - **Docker ID and password:** Use your Docker Hub username and password. If
>   you don't have a Docker account, create one
>   for free.
> - **Access token:** Use a personal access token
>   (PAT) for personal accounts, or an
>   organization access token
>   (OAT) with your organization
>   namespace as the username.
> - OIDC: In GitHub Actions, use a Docker-issued access token from an
>   OIDC connection
>   with your organization namespace as the username.
>
> Run `docker login dhi.io` to authenticate.

## Considerations when adopting DHIs

Docker Hardened Images are intentionally minimal to improve security. If you're
updating existing Dockerfiles or frameworks to use DHIs, keep in mind that
runtime images don't include shells or package managers, run as non-root users
by default, and may have different configurations than images you're familiar
with.

For a comprehensive checklist of migration considerations and detailed guidance,
see Migrate to Docker Hardened Images.

## Pull, run, and reference DHIs

Docker Hardened Images use different image references depending on your
subscription:

| Subscription        | Image reference            | Authentication        |
|---------------------|----------------------------|-----------------------|
| Community           | `dhi.io/<image>:<tag>`     | `docker login dhi.io` |
| Select & Enterprise | `<your-org>/<image>:<tag>` | `docker login`        |

Select and Enterprise users should mirror repositories to their
Docker Hub organization to access compliance variants and customization
features.

After authenticating, use the image reference in standard Docker commands and
Dockerfiles. For example:

```console
$ docker pull dhi.io/python:3.13
$ docker run --rm dhi.io/python:3.13 python -c "print('Hello from DHI')"
```

```dockerfile
FROM dhi.io/python:3.13
COPY . /app
CMD ["python", "/app/main.py"]
```

For multi-stage builds:
- Use a `-dev` tag for build stages that need a shell or package manager. See
  Use dev variants for framework-based
  applications.
- Use the `static` image for compiled executables with minimal runtime
  dependencies. See Use a static image for compiled
  executables.

To learn how to search for available variants, see Search and evaluate
images.

## Use a DHI in CI/CD pipelines

Docker Hardened Images work just like any other image in your CI/CD pipelines.
You can reference them in Dockerfiles, pull them as part of a pipeline step, or
run containers based on them during builds and tests.

In GitHub Actions, your Docker organization can use an OIDC connection to
authenticate with short-lived Docker access tokens instead of storing an
organization access token (OAT). For a mirrored image on Docker Hub, grant pull access to
`<your-organization-namespace>/<repository>`. Your organization's DHI subscription still
determines access to paid image variants.

See Authenticate with OIDC in GitHub Actions
for an example that reads an image manifest and its private attestations.

Unlike typical container images, DHIs also include signed
attestations such as SBOMs and provenance
metadata. You can incorporate these into your pipeline to support supply chain
security, policy checks, or audit requirements if your tooling supports it.

To strengthen your software supply chain, consider adding your own attestations
when building images from DHIs. This lets you document how the image was built,
verify its integrity, and enable downstream validation and policy enforcement
using tools like Docker Scout.

To learn how to attach attestations during the build process, see Docker Build
Attestations.

### Authenticate with OIDC in GitHub Actions

Use an OIDC connection
to read DHI images and attestations with short-lived Docker access tokens.
Use your Docker organization namespace
as the username and the Docker-issued access token as the password.
The GitHub identity token is exchanged for this access
token. Don't use the GitHub identity token as a registry password.

Configure the connection's rulesets and subject claims
to match your workflow. Repository access depends on the registry you use:

- For free images and their attestations served through `dhi.io`, authenticate
  with your organization namespace and Docker-issued access token.
- For a mirrored or customized image on Docker Hub, grant pull access to
  `<your-organization-namespace>/<repository>`.
- Direct reads from `registry.scout.docker.com` require access to the referenced
  repository and use your Docker organization namespace in Scout registry paths.

For permission boundaries, see
DHI and Scout compatibility exceptions.

Repository grants can cover an exact repository, all repositories in a namespace
(`namespace/*`), or public Docker Hub repositories (`*/*/public`, with pull access
only). Public access applies across namespaces. It requires the repository to be
public when each read is authorized. It doesn't grant access to private
repositories or remove DHI subscription, FIPS, or Extended Lifecycle Support
requirements.

Grants are additive. Push access includes pull access. An exact pull grant cannot
restrict a matching namespace-wide push grant. To restrict a repository to
pull-only access, remove every matching push grant. The `dhi.io` endpoint accepts
read operations with OIDC credentials. Push grants also authorize supported
uploads to `registry.scout.docker.com`, but don't authorize deletion.

For example ruleset configurations and grant combinations, see
Ruleset examples.

The repository grant also controls direct reads of the image's private
attestations from `registry.scout.docker.com`. Your organization's DHI
subscription also determines access to paid image variants.
Managing customization definitions requires the destination-repository permissions
described in Customize a DHI.

The following workflow uses `regctl` to read a mirrored image manifest and list
its attestations. Set these GitHub Actions repository variables:

- `DOCKER_ORG`: Your Docker organization namespace
- `DOCKER_OIDC_CONNECTION_ID`: Your OIDC connection ID
- `DHI_REPOSITORY`: The mirrored repository name, such as `dhi-node`
- `DHI_TAG`: The image tag, such as `22`

Grant the connection pull access to `DOCKER_ORG/DHI_REPOSITORY`, and ensure its
subject claims match this workflow's `workflow_dispatch` run on your selected
branch. The exchange requests a token with a five-minute lifetime. Run the
registry operations before the token expires. Longer jobs must obtain a fresh
token before further registry operations.

```yaml
name: Read DHI attestations
on:
  workflow_dispatch:

permissions:
  contents: read
  id-token: write

jobs:
  verify:
    runs-on: ubuntu-latest
    env:
      DOCKER_ORG: ${{ vars.DOCKER_ORG }}
      DOCKER_OIDC_CONNECTION_ID: ${{ vars.DOCKER_OIDC_CONNECTION_ID }}
      DHI_REPOSITORY: ${{ vars.DHI_REPOSITORY }}
      DHI_TAG: ${{ vars.DHI_TAG }}
    steps:
      - name: Install regctl
        uses: regclient/actions/regctl-installer@v0.1.0
        with:
          release: v0.8.2
      - name: Exchange the GitHub identity token and sign in
        uses: actions/github-script@v8
        with:
          script: |
            const identityToken = await core.getIDToken('https://identity.docker.com');
            const response = await fetch('https://identity.docker.com/oauth/token', {
              method: 'POST',
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              body: new URLSearchParams({
                grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
                subject_token_type: 'urn:ietf:params:oauth:token-type:id_token',
                subject_token: identityToken,
                connection_id: process.env.DOCKER_OIDC_CONNECTION_ID,
                expires_in: '300'
              })
            });
            if (!response.ok) {
              throw new Error(`Docker token exchange failed: HTTP ${response.status}`);
            }
            const {access_token: token} = await response.json();
            if (typeof token !== 'string' || !token) {
              throw new Error('Docker token exchange returned no access token');
            }
            core.setSecret(token);
            for (const registry of ['docker.io', 'registry.scout.docker.com']) {
              await exec.getExecOutput('regctl', [
                'registry', 'login', registry,
                '--user', process.env.DOCKER_ORG, '--pass-stdin'
              ], {input: token, silent: true});
            }
      - name: Read the manifest and list attestations
        run: |
          regctl manifest get "docker.io/${DOCKER_ORG}/${DHI_REPOSITORY}:${DHI_TAG}"
          regctl artifact list "docker.io/${DOCKER_ORG}/${DHI_REPOSITORY}:${DHI_TAG}" \
            --external "registry.scout.docker.com/${DOCKER_ORG}/${DHI_REPOSITORY}" \
            --platform linux/amd64
      - name: Sign out
        if: always()
        run: |
          regctl registry logout docker.io
          regctl registry logout registry.scout.docker.com
```

For a free image served through `dhi.io`, sign in to `dhi.io` and use
`dhi.io/<image>:<tag>` for both commands. Omit `--external` so that image and
attestation reads both use `dhi.io`. Sign out of `dhi.io` when finished.

### Discover attestations with ORAS

You can use ORAS to discover and inspect the attestations
attached to Docker Hardened Images. This is particularly useful in CI/CD
pipelines for supply chain security validation and compliance checks.

For automated workflows, authenticate using an organization access token
(OAT). OATs are owned by the
organization rather than an individual user, making them better suited for CI/CD
pipelines.

To discover attestations with ORAS:

1. Generate an organization access
   token with **Read public
   repositories** scope.

   The following example shows how to discover attestations on DHI community
   images from `dhi.io`. If you're discovering attestations on images mirrored to
   your organization, generate an OAT scoped to read from your mirrored repository
   instead of **Read public repositories**.

2. Sign in to `dhi.io` using your organization namespace as the username and the OAT
   as the password.

   > **Warning:**
   >
   > The following examples export credentials directly on the command line for
   > demonstration purposes. This exposes sensitive tokens in your shell history
   > and process list. In production environments, use secure methods such as
   > reading from files with restricted permissions, environment files loaded
   > at runtime, or secret management tools.

    ```console
    $ oras login dhi.io -u <YOUR_ORGANIZATION_NAMESPACE>
    ```

   Or non-interactively in a CI/CD pipeline, set your organization namespace and token:

   ```console
   $ export DOCKER_ORG="YOUR_ORGANIZATION_NAMESPACE"
   $ export OAT="YOUR_ORGANIZATION_ACCESS_TOKEN"
   $ echo $OAT | oras login dhi.io -u "$DOCKER_ORG" --password-stdin
   ```

3. Discover attestations on a DHI image:

   ```console
   $ oras discover dhi.io/node:24-dev --platform linux/amd64
   ```

   > **Note:**
   >
   > The `--platform` flag is required. Without it, `oras discover` resolves to
   > the multi-arch image index, which returns only an index-level signature
   > rather than the full set of per-platform attestations.

   A successful response lists the attestations attached to the image,
   including SBOMs, provenance, vulnerability reports, and changelog metadata.

## Use a static image for compiled executables

Docker Hardened Images include a `static` image repository designed specifically
for running compiled executables in an extremely minimal and secure runtime.
Unlike a non-hardened `FROM scratch` image, the DHI `static` image includes
attestations and essential packages like `ca-certificates`.

Use a `-dev` or other builder image to compile your binary, then copy the output
into a `static` image:

```dockerfile
FROM dhi.io/golang:1.22-dev AS build
WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 go build -o myapp

FROM dhi.io/static:20230311
COPY --from=build /app/myapp /myapp
ENTRYPOINT ["/myapp"]
```

For more multi-stage build patterns, see the Go migration
example.

## Use dev variants for framework-based applications

If you're building applications with frameworks that require package managers or
build tools (such as Python, Node.js, or Go), use a `-dev` variant during the
development or build stage. These variants include essential utilities like
shells, compilers, and package managers to support local iteration and CI
workflows.

Use `-dev` images in your inner development loop or in isolated CI stages to
maximize productivity. Once you're ready to produce artifacts for production,
switch to a smaller runtime variant to reduce the attack surface and image size.

For detailed multi-stage Dockerfile examples using dev variants, see the
migration examples:
- Go
- Python
- Node.js

## Use Socket Firewall variants to monitor package installations

If you want supply chain protection during dependency installation, use a Socket
Firewall variant in place of the standard `-dev` variant in your build stage.
These variants come with Socket preinstalled to monitor
package manager activity and block malicious packages before they reach your
image.

Two tiers are available. Use `-sfw-dev` for Socket Firewall Free, or
`-sfw-ent-dev` for Socket Firewall Enterprise (requires an API key from Socket).
The runtime stage stays the same regardless of which build stage variant you
use.

```dockerfile
FROM dhi.io/python:3.13-alpine3.23-sfw-dev AS build
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM dhi.io/python:3.13-alpine3.23
COPY --from=build /app /app
CMD ["python", "app.py"]
```

For more information on Socket Firewall variants, see Available image
types.
