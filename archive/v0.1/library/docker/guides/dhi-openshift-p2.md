---
title: "Use Docker Hardened Images with Red Hat OpenShift (part 2 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/guides/dhi-openshift.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Use Docker Hardened Images with Red Hat OpenShift (part 2 of 2)

## Deploy DHI Helm charts on OpenShift

DHI provides pre-configured Helm charts for popular applications. When deploying
these charts on OpenShift, you may need to adjust security context settings.

### Inspect chart values first

Before installing, check what security context values the chart exposes:

```console
helm registry login dhi.io

helm show values oci://dhi.io/<chart-name> --version <version> | grep -A 20 securityContext
```

The available value paths vary by chart, so always check `values.yaml` before
setting overrides.

### Install with OpenShift overrides

The following example shows a typical installation pattern. Adjust the `--set`
paths based on what `helm show values` returns for your specific chart:

```console
helm install my-release oci://dhi.io/<chart-name> \
    --version <version> \
    --set "<example-value>" \
    -f openshift-values.yaml
```

Create an `openshift-values.yaml` with security context overrides appropriate
for your chart:

```yaml
# Example — adjust keys based on `helm show values` output
podSecurityContext:
  runAsNonRoot: true
  seccompProfile:
    type: RuntimeDefault

securityContext:
  allowPrivilegeEscalation: false
  capabilities:
    drop:
      - ALL
```

> **Note:**
>
> DHI Helm chart value paths are not standardized across charts. For example,
> one chart may use `image.imagePullSecrets`, while another uses
> `global.imagePullSecrets`. Always consult the specific chart’s documentation
> or `values.yaml`.

## Verify your deployment

After deploying a DHI image to OpenShift, verify the security configuration.

### Check the assigned SCC

```console
oc get pods -o 'custom-columns=NAME:.metadata.name,SCC:.metadata.annotations.openshift\.io/scc'
```

Runtime DHI images should show `restricted-v2` (or `nonroot` if you configured
it).

### Check the running UID

```console
oc exec <pod-name> -- id
```

With the `restricted-v2` SCC, you should see output like:

```text
uid=1000650000 gid=0(root) groups=0(root),1000650000
```

The UID is from the project’s allocated range, and the primary GID is always 0
(root group). With the `nonroot` SCC and `runAsUser: 65532`, you would see
`uid=65532`.

### Confirm the image is distroless

```console
oc exec <pod-name> -- sh -c "echo hello"
```

For runtime (non-dev) DHI images, this command should fail with an error
indicating that `sh` was not found in `$PATH`. The exact error format varies
between CRI-O versions.

### Scan the deployed image

Use Docker Scout to verify the security posture of the deployed image (run this
from your local machine, not on the cluster):

```console
docker scout cves YOUR_ORG/dhi-nginx:1.29-alpine3.23
docker scout quickview YOUR_ORG/dhi-nginx:1.29-alpine3.23
```

## Common issues and solutions

**Pod fails to start with “container has runAsNonRoot and image has group or
user ID set to root.”** This happens when deploying a DHI `-dev` variant with
the default `restricted-v2` SCC. Either use the runtime variant instead, or
grant the `anyuid` SCC to the service account.

**Application cannot write to a directory.** The arbitrary UID assigned by
OpenShift doesn’t have write permissions. This is the most common issue with DHI
on OpenShift. All writable paths must be owned by GID 0 with group write
permissions. Fix this in the build stage:
`chgrp -R 0 /path && chmod -R g=u /path`, then `COPY --chown=<UID>:0` into the
runtime stage.

**Application fails with “user not found” or “no matching entries in passwd
file.”** Some applications require a valid `/etc/passwd` entry. OpenShift 4.x
automatically injects the arbitrary UID into `/etc/passwd` in most cases. If
your application still fails, use the passwd-injection pattern (requires a `-dev`
variant) or use the `nonroot` SCC to run with the image’s built-in UID.

**Pod fails to bind to port 80 or 443.** Ports lower than 1024 require root
privileges. DHI images use unprivileged ports by default (for example, Nginx
uses 8080). Configure your OpenShift Service to map the external port to the
container’s unprivileged port:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-dhi
spec:
  ports:
    - port: 80
      targetPort: 8080
  selector:
    app: nginx-dhi
```

**ImagePullBackOff with “unauthorized: authentication required.”** Verify the
pull secret is correctly configured and linked to the service account. Check
with `oc get secret <example-value>` and `oc describe sa default`.

**Dockerfile build fails with “exec: not found” in runtime stage.** You are
using `RUN` in a distroless runtime stage. DHI runtime images have no shell, so
`RUN` commands cannot execute. Move all `RUN` commands to the `-dev` build stage
and use `COPY --chown` to transfer results.

## DHI and OpenShift compatibility summary

|Feature                      |DHI runtime                      |DHI `-dev`          |DHI with Enterprise customization|
|-----------------------------|---------------------------------|--------------------|---------------------------------|
|Default SCC (`restricted-v2`)|Yes, with GID 0 permissions      |Requires `anyuid`   |Yes, with GID 0 permissions      |
|Non-root by default          |Yes (UID 65532)                  |No (root)           |Yes (configurable UID)           |
|Arbitrary UID support        |Yes, with `chown <UID>:0`        |Yes                 |Yes, with `chown <UID>:0`        |
|Distroless (no shell)        |Yes — no `RUN` in Dockerfile     |No                  |Yes — no `RUN` in Dockerfile     |
|Unprivileged ports           |Yes (higher than 1024)                 |Configurable        |Yes (higher than 1024)                 |
|SLSA Build Level 3           |Yes                              |Yes                 |Yes                              |
|Debug on cluster             |`oc debug` / ephemeral containers|`oc exec` with shell|`oc debug` / ephemeral containers|

## What’s next

- Use an image in Kubernetes — general DHI Kubernetes deployment guide.
- Customize an image — add packages to DHI images using Enterprise customization.
- Debug a container — troubleshoot distroless containers with Docker Debug (local development).
- Managing SCCs — Red Hat’s reference documentation on Security Context Constraints.
- Creating images for OpenShift — Red Hat’s guidelines for building OpenShift-compatible container images.
