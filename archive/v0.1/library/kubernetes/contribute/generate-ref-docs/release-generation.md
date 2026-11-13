---
title: "Generating Reference Documentation for a Release (part 1 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/contribute/generate-ref-docs/release-generation.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

This page shows how to regenerate every set of Kubernetes reference documentation
for a new release, and how to divide the generated output into pull requests that
reviewers can handle one at a time.

Work through the sections in order. Each reference set has its own section that
builds it, copies it into your website clone, and ends with a page to check, so
you can finish one set before you start the next. The summary at the
end lists every target, its output, and the pull requests to open.

**Note:**
The Release Team Docs Lead and the Docs shadows run this process during a release
cycle. The
Docs role handbook
in `kubernetes/sig-release` covers the rest of that role. If the handbook gains
its own steps for generating reference documentation, update this page to match.

## Set up the local repositories

You need local clones of `kubernetes/website` and `kubernetes-sigs/reference-docs`.

If you have not already forked and cloned `kubernetes/website`, see
Work from a local clone.
Clone `reference-docs`:

```shell
git clone https://github.com/kubernetes-sigs/reference-docs
```

The remaining steps refer to your `kubernetes/website` clone as `<web-base>` and
your `reference-docs` clone as `<rdocs-base>`.

## Set build variables

Set these in your shell. They apply to every `make` command in the steps that
follow.

```shell
export K8S_WEBROOT=<your-path-to>/website     # your website clone (<web-base>)
export K8S_RELEASE={{< skew currentVersionAddMinor 1 >}}.0
```

Set `K8S_RELEASE` to a full release version, such as `.0`
or `.0-rc.1`. The build targets derive the versioned
directory name, such as `v`, from the
major and minor version.

## Create the versioned directories

Run this in `<rdocs-base>`:

```shell
make createversiondirs
```

This creates the configuration directory for the new release under
`gen-apidocs/config/`, copying `config.yaml` from the previous release.

You rarely need to edit that file. The settings that change with every release,
the API groups and the list of resources, are empty in it: the build targets on
this page pass `--auto-detect`, so the generator reads them from `swagger.json`.
What stays in the file is operation naming and exclusion, which follows the API
machinery rather than the API surface.

When the generated reference looks wrong, fix the cause
upstream where you
can: descriptions and deprecation notices come from Go comments in
`kubernetes/kubernetes`, and a fix there reaches every reader of that API. Edit
`config.yaml` only for what the generator alone decides, such as an untitled
operation (`operation_categories`), an endpoint that the reference should not
publish (`excluded_operations`), or a group whose operation IDs spell it
differently from its resources (`operation_group_map`). Each entry is carried
into every later release, so keep the file lean.

## Fetch the OpenAPI specification

The API reference generator reads `gen-apidocs/config/<version>/swagger.json`.
The specification that `kubernetes/kubernetes` commits omits the allowed values
of enumerated fields, so a reference built from it omits them too.
It's better to generate a reference that does list allowed values, so you
take some additional steps to make that happen.

Choose one of the following two options.

### Option 1: Generate the specification from source

Use this option unless you cannot meet the requirements below. It needs no
`kubernetes/kubernetes` clone of your own, it leaves any clone you already have
untouched, and it produces a specification that includes enum values.

```shell
make updateapispec-enums-from-source
```

The target shallow-clones `kubernetes/kubernetes` at tag `v$K8S_RELEASE` into a
temporary directory, runs the upstream `hack/update-openapi-spec.sh` there with
enum values kept, copies the resulting specification into the versioned
configuration directory, checks that it contains enum values, and removes the
checkout. Beyond the tools in the prerequisites, it needs:

* `jq`, `curl`, and `openssl` on your `PATH`
* network access, to clone the tag and to download Go modules and etcd
* free TCP ports 2379 and 8050

The upstream script starts etcd on port 2379 and a temporary API server on port
8050; set `ETCD_PORT` or `API_PORT` if either is taken. It downloads its own copy
of etcd and builds `kube-apiserver`, so expect the first run to take several
minutes.

To keep the temporary checkout and the generation log for troubleshooting:

```shell
KEEP_TMP=1 make updateapispec-enums-from-source
```

### Option 2: Generate the specification in a local clone

Use this option when you already have a `kubernetes/kubernetes` clone and do
not want a second one. You skip cloning, but still run the same generator as
Option 1, and it modifies your clone.

Commit or stash any existing changes in your clone before continuing.
Replace the path below with your local clone path, then check out the release
tag:

```shell
export K8S_ROOT="<your-path-to>/kubernetes"
cd "$K8S_ROOT"
git checkout "v$K8S_RELEASE"
```

Then run `hack/update-openapi-spec.sh` with `KUBE_OPENAPI_SPEC_KEEP_ENUMS=true`
to regenerate `api/openapi-spec/swagger.json`. This requires the tools and free
ports described in Option 1:

```shell
KUBE_OPENAPI_SPEC_KEEP_ENUMS=true hack/update-openapi-spec.sh
```

**Note:**
Without `KUBE_OPENAPI_SPEC_KEEP_ENUMS=true`, the specification carries no enum
values, and the published API reference omits the possible values of every
enumerated field.

Copy the regenerated specification from your clone's working tree into the
versioned configuration directory created earlier. Replace `<rdocs-base>`
with the path to your `reference-docs` clone:

```shell
cd "<rdocs-base>"
cp "$K8S_ROOT/api/openapi-spec/swagger.json" \
  gen-apidocs/config/v{{< skew currentVersionAddMinor 1 "_" >}}/swagger.json
```

After copying, restore the regenerated files in your clone. The script rewrote
`swagger.json` and the OpenAPI v3 files under `api/openapi-spec/` with enum
values kept, so they no longer match what `kubernetes/kubernetes` commits. You
only need the copy you just made, and restoring the files leaves your clone
clean, so you can switch back to your own branch:

```shell
git -C "$K8S_ROOT" checkout -- api/openapi-spec
```

### Check the specification

Whichever option you use, you can check a specification for enum values at any
time:

```shell
./hack/verify-enum-swagger.sh gen-apidocs/config/<version>/swagger.json
```

## Start the local preview

Start the preview once, in a second terminal, and leave it running. Hugo reloads
each page as the copy targets replace it, so you can check each reference set as
soon as you generate it.

```shell
cd <web-base>
git submodule update --init --recursive --depth 1   # if not already done
make container-serve
```

Hugo serves the preview at `http://localhost:1313/`.

**Note:**
Start each set from an up-to-date branch in `<web-base>`, generate it, check it in
the preview, and commit it. Pull requests lists what to open for
each set, when to open it, and how to describe it.

## Generate the Kubernetes API reference

`gen-apidocs` builds this set, the HTML API reference, from the OpenAPI
specification you fetched. The build output goes to `gen-apidocs/build/html/`
before the target copies it.

```shell
cd <rdocs-base>
make copyapi
```

The target writes two files to `<web-base>`:

```
static/docs/reference/generated/kubernetes-api/v{{< skew currentVersionAddMinor 1 >}}/index.html
static/docs/reference/generated/kubernetes-api/v{{< skew currentVersionAddMinor 1 >}}/js/navData.js
```

Check `/docs/reference/generated/kubernetes-api/v/` in the
preview. Open a resource such as Pod and search the page for
`Possible enum values`, which confirms that the specification carried the enum
values through.

See Pull requests for what to open for this set.

## Generate the API reference pages in Markdown

`gen-apidocs` also builds this set, the Markdown API reference that Hugo renders
as regular pages, from the same specification. The build output goes to
`gen-apidocs/build/markdown/`.

```shell
cd <rdocs-base>
make copyapimd
```

The target replaces `<web-base>/content/en/docs/reference/kubernetes-api/` and
keeps the `_index.md` that people maintain by hand.

Check `/docs/reference/kubernetes-api/` in the preview. Compare the number of
generated pages with the previous release:

```shell
find <web-base>/content/en/docs/reference/kubernetes-api -name '*.md' | wc -l
```

See Pull requests for what to open for this set.

## Generate the component reference

`gen-compdocs` builds from `k8s.io/kubernetes` and from the `k8s.io` staging
modules that `go.mod` pins with `replace` directives. `go get` updates the first
and leaves the rest, so move the whole set at once:

```shell
cd <rdocs-base>/gen-compdocs
STAGING=v0.${K8S_RELEASE#*.}
go get k8s.io/kubernetes@v$K8S_RELEASE
KK=$(go list -m -f '{{.Dir}}' k8s.io/kubernetes)

# every staging module of this release
for m in $(awk '/=> \.\/staging\/src\//{print $1}' "$KK/go.mod"); do
  go mod edit -replace="$m=$m@$STAGING" -require="$m@$STAGING"
done

# entries left from a release with a different set of staging modules
for m in $(go mod edit -json | jq -r '.Replace[].Old.Path'); do
  grep -q "$m => ./staging/src/$m" "$KK/go.mod" ||
    go mod edit -dropreplace="$m" -droprequire="$m"
done

go mod tidy
go mod edit -go=$(go list -m -f '{{.GoVersion}}' k8s.io/kubernetes)
go mod tidy
```

**Note:**
If `go get` or `go mod tidy` reports `unknown revision` or a 404 from
`sum.golang.org` for a `k8s.io` module, the staging modules for this release are
not published yet. They follow the `kubernetes/kubernetes` tag by some hours.
Check with:

```shell
git ls-remote --tags https://github.com/kubernetes/api.git "v0.${K8S_RELEASE#*.}"
```

An empty result means you wait. This applies to the configuration API reference
as well. The two API reference sets read only the OpenAPI specification, so you
can generate those meanwhile.

The loops read the module set from `kubernetes/kubernetes`, because releases add
and remove staging modules and `go.mod` can still list ones from an older
release. The `go` directive comes last: while old modules are still in the graph,
`go mod tidy` raises it again.

Check what moved:

```shell
git diff go.mod
```

Every `k8s.io` requirement, every `replace`, and the `go` directive should now
name the new release. Requirements outside the staging set, such as
`k8s.io/klog/v2` and the Goldmark packages, keep their own versions.

Then build and copy the core component pages:

```shell
cd <rdocs-base>
make copycomp-core
```

`gen-compdocs` writes every component page to `gen-compdocs/build/`, and the
target copies `kube-apiserver.md`, `kube-controller-manager.md`,
`kube-scheduler.md`, `kube-proxy.md`, and `kubelet.md` from there to
`<web-base>/content/en/docs/reference/command-line-tools-reference/`.

Check `/docs/reference/command-line-tools-reference/` in the preview.

See Pull requests for what to open for this set.

**Note:**
The component reference, kubectl, and kubeadm are three separate pull requests,
even though `gen-compdocs` produces all three. Each `copycomp-*` target rebuilds
every component page first, which takes a few minutes. To build once and copy all
three sets, run `make copycomp`, then split the result into three branches.

## Generate the kubectl reference

The kubectl pages come from the same `gen-compdocs` build as the component
reference, and belong in their own pull request.

```shell
cd <rdocs-base>
make copycomp-kubectl
```

The target writes `kubectl.md` and a directory for each subcommand to
`<web-base>/content/en/docs/reference/kubectl/generated/`, and keeps the
`_index.md` that people maintain by hand.

Check `/docs/reference/kubectl/generated/` in the preview, and open a subcommand
page such as `kubectl apply`.

See Pull requests for what to open for this set.

## Generate the kubeadm reference

The kubeadm pages also come from `gen-compdocs`, and belong in their own pull
request.

```shell
cd <rdocs-base>
make copycomp-kubeadm
```

The target writes `kubeadm.md` and a directory for each subcommand to
`<web-base>/content/en/docs/reference/setup-tools/kubeadm/generated/`, and keeps
the `_index.md` and `README.md` that people maintain by hand.

Check `/docs/reference/setup-tools/kubeadm/generated/` in the preview.

See Pull requests for what to open for this set.
