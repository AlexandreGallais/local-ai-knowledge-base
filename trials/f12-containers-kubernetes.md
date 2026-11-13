# F12 trial on the workstation

What to play on the workstation for the two criteria of F12 that only a person can see, and the
points the research left to check. About 45 minutes.

## 1. Prepare the dev container (once)

1. In a trial project (the one of F8 or F9), copy `templates/containers/devcontainer/` as
   `.devcontainer/`.
2. Put the Linux binaries of `hadolint`, `kubeconform`, `kube-linter` and `helm` in
   `.devcontainer/tools/`, from wherever your team gets its tools.
3. Put the Kubernetes JSON schemas of the cluster version in `.devcontainer/kubernetes-schemas/`.
4. Set `ASSISTANT_PACKAGE` in `devcontainer.json` to the npm package of the coding assistant, with
   its version.
5. Build and open the dev container. `onCreateCommand` must print the four tool versions.

To check on the way:

- `kubeconform -v` prints the version (else change the creation command to the right flag).
- Node.js copied from the Node.js image runs in the .NET image: `node --version`, `npm --version`.
- `devcontainer read-configuration --workspace-folder .` from the host: it needs a container engine.
- The NGINX image runs as UID 101: `docker run --rm docker.io/nginx/nginx-unprivileged:<version> id -u`.
- `.hadolint.yaml`: DL3008 is shown as info and does not fail; DL3009 and DL3015 fail.

## 2. The templates pass the tools

In the dev container, from a copy of `templates/containers/`:

```sh
hadolint dotnet.Dockerfile angular.Dockerfile devcontainer/Dockerfile
kubeconform -strict -summary -schema-location '/opt/kubernetes-schemas/{{ .ResourceKind }}{{ .KindSuffix }}.json' deployment.yaml
kube-linter lint deployment.yaml
```

Expected: no error. Note every warning of `kube-linter` in the results table.

## 3. The faulty templates are refused

Save this file as `bad.Dockerfile`, then run `hadolint bad.Dockerfile`:

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet
WORKDIR app
ADD publish/ /app
CMD dotnet App.dll
```

Expected codes: DL3006 (no tag), DL3000 (relative `WORKDIR`), DL3020 (`ADD`), DL3025 (`CMD` not
in JSON form).

Save this file as `bad.yaml`, then run kubeconform with the same options as above:

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 2
---
apiVersion: v1
kind: Service
metadata:
  name: api
spec:
  selector:
    app: api
  ports:
    - port: 80
      targetPort: 8080
      protocl: TCP
```

Expected: the Deployment is refused (no schema for `extensions/v1beta1`), the Service is refused
for the unknown field `protocl` (`-strict`).

## 4. The AI writes a .NET Dockerfile

In a new session in the trial project, ask:

> Write the Dockerfile of the API project `Api`, for .NET 10.

Expected: two stages (`sdk` then `aspnet`), `USER $APP_UID`, `EXPOSE 8080`, `ENTRYPOINT` in JSON
form, and the AI runs `hadolint` on its own, then gives the result with a `Not checked:` line.

## Results

| Test | Result (ok / not ok) | Notes |
| --- | --- | --- |
| Dev container built, four tools found |  |  |
| hadolint passes on the three Dockerfile templates |  |  |
| kubeconform and kube-linter pass on `deployment.yaml` |  |  |
| `bad.Dockerfile` refused with DL3006, DL3000, DL3020, DL3025 |  |  |
| `bad.yaml` refused by kubeconform |  |  |
| AI: multi-stage, non-root, port 8080 |  |  |
| AI: runs hadolint on its own |  |  |
