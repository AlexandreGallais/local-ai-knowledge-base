---
title: "Generating Reference Documentation for a Release (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/contribute/generate-ref-docs/release-generation.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Generating Reference Documentation for a Release (part 2 of 2)

## Generate the configuration API reference

`genref` reads the Go configuration types of each component from the `k8s.io`
staging modules. It has no `replace` directives, so the requirements alone decide
which release you document:

```shell
cd <rdocs-base>/genref
STAGING=v0.${K8S_RELEASE#*.}
OLD=$(go mod edit -json | jq -r '.Require[] | select(.Path=="k8s.io/api") | .Version')

# every k8s.io module pinned to the previous release
go get $(go mod edit -json | jq -r --arg v "$OLD" --arg s "$STAGING" \
  '.Require[] | select(.Version==$v and (.Path|startswith("k8s.io/"))) | .Path + "@" + $s')

go mod tidy
go mod edit -go=$(go list -m -f '{{.GoVersion}}' k8s.io/api)
go mod tidy
```

Selecting by the old version picks up the staging modules and leaves
`k8s.io/klog/v2`, `k8s.io/gengo`, and the other independent repositories alone.
Check what moved:

```shell
git diff go.mod
```

Also update the release in the `externalPackages` link target in
`genref/config.yaml`, which points readers at the published API reference.

### Check for new API versions

`genref` generates one page for each entry in `genref/config.yaml`, and each
entry names a Go package and a path that ends in an API version:

```yaml
  - name: kubelet-config
    title: Kubelet Configuration (v1)
    package: k8s.io/kubelet
    path: config/v1
```

A component that starts serving a new version of its configuration API adds a
version directory in its Go source. List the version directories of a component
to see what exists in this release:

```shell
cd <rdocs-base>/genref
go mod download
ls "$(go list -m -f '{{.Dir}}' k8s.io/kubelet)/config"
```

To compare every entry in `config.yaml` against the source at once, run:

```shell
awk '$1=="package:"{pkg=$2} $1=="path:"{print pkg, $2}' config.yaml | sort -u |
while read -r pkg path; do
  dir=$(go list -m -f '{{.Dir}}' "$pkg" 2>/dev/null) || continue
  parent=$(dirname "$path")
  for v in $(find "$dir/$parent" -maxdepth 1 -mindepth 1 -type d -name 'v[0-9]*'); do
    grep -q "path: $parent/$(basename "$v")\$" config.yaml ||
      echo "$pkg $parent/$(basename "$v")"
  done
done | sort -u
```

Each line is a candidate, not a gap to fill: several older versions are left out
on purpose, and the comments in `config.yaml` record why. Add an entry when a
component serves a version that readers configure, and keep the entry for an
older version while the component still serves it.

### Build and copy the pages

```shell
cd <rdocs-base>
make copyconfigapi
```

`genref` writes the generated pages to `genref/output/md/`, and the target sorts
them as it copies: most go to `content/en/docs/reference/config-api/`, the metrics
APIs go to `content/en/docs/reference/external-api/`, because the project defines
them but does not serve them from the API server, and the pages the website does
not publish are skipped.

Check both sections in the preview, and confirm that no page you published for
the previous release disappeared:

```shell
cd <web-base>
git status content/en/docs/reference/config-api/ content/en/docs/reference/external-api/
```

See Pull requests for what to open for this set.

## Summary

| Reference set | Generator in `<rdocs-base>` | Target | Output in `<web-base>` |
| --- | --- | --- | --- |
| Kubernetes API, HTML | `gen-apidocs` | `make copyapi` | `static/docs/reference/generated/kubernetes-api/v/` |
| Kubernetes API, Markdown | `gen-apidocs` | `make copyapimd` | `content/en/docs/reference/kubernetes-api/` |
| Components | `gen-compdocs` | `make copycomp-core` | `content/en/docs/reference/command-line-tools-reference/` |
| kubectl | `gen-compdocs` | `make copycomp-kubectl` | `content/en/docs/reference/kubectl/generated/` |
| kubeadm | `gen-compdocs` | `make copycomp-kubeadm` | `content/en/docs/reference/setup-tools/kubeadm/generated/` |
| Configuration APIs | `genref` | `make copyconfigapi` | `content/en/docs/reference/config-api/`, `content/en/docs/reference/external-api/` |

Each copy target builds first. To build every set without copying anything into
your website clone, run `make api apimd comp configapi`.

### Pull requests

Each reference set gets its own website pull request, six in all, and the
generator side takes three. Open a website pull request together with the
`reference-docs` pull request it needs, and hold the website one until that
merges.

| Reference set | Pull request to `kubernetes-sigs/reference-docs` | Pull request to `kubernetes/website` |
| --- | --- | --- |
| Kubernetes API, HTML | `gen-apidocs/config/<version>/`, the configuration and the specification: one pull request for both API sets | `Update the Kubernetes API reference for v` |
| Kubernetes API, Markdown | the same `gen-apidocs` pull request | `Update the generated API reference pages for v` |
| Components | `gen-compdocs/go.mod` and `go.sum`: one pull request for the components, kubectl, and kubeadm sets | `Update the component reference for v` |
| kubectl | the same `gen-compdocs` pull request | `Update the kubectl reference for v` |
| kubeadm | the same `gen-compdocs` pull request | `Update the kubeadm reference for v` |
| Configuration APIs | `genref/go.mod`, `genref/config.yaml`, and `genref/output/md/`: one pull request | `Update the configuration API reference for v` |

In each website pull request, say how you generated the output, so that a
reviewer can reproduce it:

```text
Regenerated the kubectl reference for v{{< skew currentVersionAddMinor 1 >}}.0.

- Generated with `make copycomp-kubectl` from kubernetes-sigs/reference-docs at commit <commit>
- Generator changes: kubernetes-sigs/reference-docs#<pull request>
- Generated files only, with no hand edits
```

For the two API reference sets, add how you produced the OpenAPI specification,
because the generated output does not show it: `generated from source with
make updateapispec-enums-from-source`, or `generated in a local clone with
KUBE_OPENAPI_SPEC_KEEP_ENUMS=true`.

**Caution:**
Do not hand-edit generated pages. The next release overwrites the edit. Fix the
wording in the upstream project
or in the generator instead.

## What's next

* Generating Reference Documentation for the Kubernetes API
* Generating Reference Documentation for Configuration APIs
* Generating Reference Pages for Kubernetes Components and Tools
* Generating Reference Documentation for kubectl Commands
* Generating Reference Documentation for Metrics
* Contributing to the Upstream Kubernetes Code
* Docs role handbook
  in `kubernetes/sig-release`
