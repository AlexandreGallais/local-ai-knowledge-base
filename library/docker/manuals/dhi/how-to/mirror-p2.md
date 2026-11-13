---
title: "Mirror a Docker Hardened Image repository (part 2 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/dhi/how-to/mirror.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Mirror a Docker Hardened Image repository (part 2 of 2)

## Mirror a DHI repository to a third-party registry

After mirroring a DHI repository to your organization on Docker Hub, you can
optionally mirror it to another container registry, such as Amazon ECR, Google
Artifact Registry, GitHub Container Registry, or a private Harbor instance.

You can use any standard workflow to mirror the image, such as the
Docker CLI, Docker Hub Registry
API, third-party registry tools, or CI/CD
automation.

Mirroring an image requires copying both the image and its associated signed
attestations, including SBOMs, provenance, and VEX. Copying only the image does
not preserve these attestations in your destination registry.

The `dhi.io` proxy provides access to DHI catalog images and their associated
attestations. It retrieves image manifests and layers from Docker Hub, and
attestations from `registry.scout.docker.com`.

Customer mirrors and customized images are accessed through your organization's
repositories on Docker Hub. These repositories are not available through
`dhi.io`. The following examples therefore use two source locations:
`docker.io/<your-org>/<repository>` for the image and
`registry.scout.docker.com/<your-org>/<repository>` for its attestations. Both
are copied into the same repository in your destination registry.

To copy both, you can use `regctl`, an
OCI-aware CLI that supports mirroring images along with attached artifacts such
as SBOMs, vulnerability reports, and SLSA provenance. For ongoing synchronization,
you can use `regsync`.

### Automate syncing with webhooks

To keep external registries or systems in sync with your mirrored Docker
Hardened Images, and to receive notifications when updates occur, you can
configure a webhook on the mirrored
repository in Docker Hub. A webhook sends a `POST` request to a URL you define
whenever a new image tag is pushed or updated.

For example, you might configure a webhook to call a CI/CD system at
`https://ci.example.com/hooks/dhi-sync` whenever a new tag is mirrored. The
automation triggered by this webhook can pull the updated image from Docker Hub
and push it to an internal registry such as Amazon ECR, Google Artifact
Registry, or GitHub Container Registry.

Other common webhook use cases include:

- Triggering validation or vulnerability scanning workflows
- Signing or promoting images
- Sending notifications to downstream systems

When a webhook fires, Docker Hub sends the standard webhook
payload. For a
mirrored DHI repository, the payload also includes an additional
`dhi_metadata` object. This object describes what changed between the newly
pushed build and the previous build of the same tag, including vulnerability
fixes, package changes, and configuration changes.

> **Note:**
>
> Docker Hub adds `dhi_metadata` only to pushes on mirrored DHI repositories.
> Webhooks on other repositories deliver the standard payload.

Each DHI build produces a signed changelog attestation. At webhook delivery
time, Docker Hub retrieves the changelog for the pushed image and embeds it in
the payload as `dhi_metadata`.

DHI changelogs are generated per architecture, so `dhi_metadata` is a map
keyed by the architecture-specific manifest digest. A multi-platform image
push contains an entry for each platform that has a changelog. Match the
digest key against the platform you care about instead of assuming a single
entry.

#### `dhi_metadata` fields

Each platform entry contains the following fields.

| Field | Type | Description |
| :---- | :---- | :---- |
| `schema_version` | integer | Version of the `dhi_metadata` schema. |
| `change_categories` | array of strings | High-level summary of what changed in this build. See Change categories. |
| `previous_version` | object | The prior build this one is compared against. Contains `tag` and `digest`. |
| `changes` | object | Detailed diff versus the previous version. See the following table. |

The `changes` object contains:

| Field | Type | Description |
| :---- | :---- | :---- |
| `vulnerabilities_fixed` | array | CVEs resolved in this build. Each entry has `cve_id`, `severity`, `package`, and `fixed_in_version`. |
| `packages_updated` | array | Packages whose version changed. Each entry has `name`, `type`, `old_version`, and `new_version`. |
| `packages_added` | array | Packages added in this build. Each entry has `name`, `type`, and `version`. |
| `packages_removed` | array | Packages removed in this build. Each entry has `name`, `type`, and `version`. |
| `environment_variables_changed` | array | Changes to environment variables. Each entry has `change`, `key`, and `from_value` or `to_value` as applicable. |
| `labels_changed` | array | Changes to image labels, in the same shape as environment variable changes. |
| `configuration_changed` | array | Changes to other image configuration. For example, the entrypoint. |

When a change type has no entries, its array is present but empty, shown as `[]`.

#### Change categories

`change_categories` gives a quick, machine-readable summary of the build.

| Value | Meaning |
| :---- | :---- |
| `vulnerability_fix` | The build resolves one or more CVEs. See `changes.vulnerabilities_fixed`. |
| `version_upgrade` | One or more packages changed version. See `changes.packages_updated`. |
| `other` | The build has package, environment variable, label, or configuration changes that don't fall into either category above. |

A build can have more than one category. For example, a build that fixes a CVE
and also bumps a package version returns both `vulnerability_fix` and
`version_upgrade`. A build with no changes at all returns an empty array.

#### Example: vulnerability fix and version upgrade

The following excerpt shows the `dhi_metadata` object from a webhook payload
for a push to a mirrored DHI repository. The example is trimmed to a single
platform and a subset of changes for readability. A real payload contains one
`dhi_metadata` entry per architecture.

```json
{
  ...
  "dhi_metadata": {
    "sha256:04639747b6d72bcf1d0322f2a5b122ee76d963e31bb4a070891b25f15a5001c5": {
      "schema_version": 1,
      "change_categories": ["vulnerability_fix", "version_upgrade"],
      "previous_version": {
        "tag": "2-compat-fips-dev",
        "digest": "sha256:1738aa35838f520431c898b85d7cd60da71d8f997965287db4f3be27c1df32a1"
      },
      "changes": {
        "vulnerabilities_fixed": [
          {
            "cve_id": "CVE-2019-9192",
            "severity": "low",
            "package": "glibc",
            "fixed_in_version": "2.41-12+deb13u4+dhi0"
          },
          {
            "cve_id": "CVE-2018-20796",
            "severity": "low",
            "package": "glibc",
            "fixed_in_version": "2.41-12+deb13u4+dhi0"
          }
        ],
        "packages_updated": [
          {
            "name": "glibc",
            "type": "deb",
            "old_version": "2.41-12+deb13u4",
            "new_version": "2.41-12+deb13u4+dhi0"
          },
          {
            "name": "libc6",
            "type": "deb",
            "old_version": "2.41-12+deb13u4",
            "new_version": "2.41-12+deb13u4+dhi0"
          }
        ],
        "packages_added": [],
        "packages_removed": [],
        "environment_variables_changed": [],
        "labels_changed": [
          {
            "change": "changed",
            "key": "com.docker.dhi.chain-id",
            "from_value": "sha256:4567092c648d813b8c4c60c7d100fc34df817dd5cb4c7968e9a5c43bafb9e7a5",
            "to_value": "sha256:62d4e2090951e812a87fb599db362677f72dee095f85889ea56df63c0999b02a"
          }
        ],
        "configuration_changed": []
      }
    }
  }
}
```

#### Example: version bump with no CVEs

When a build only bumps package versions, `change_categories` contains
`version_upgrade` and `vulnerabilities_fixed` is empty.

```json
{
  ...
  "dhi_metadata": {
    "sha256:2982980b6bb3cdedafa9377bcc37405c20ed48702deef11faf13ec99d596057d": {
      "schema_version": 1,
      "change_categories": ["version_upgrade"],
      "previous_version": {
        "tag": "5-fips-dev",
        "digest": "sha256:81355a1301ecc5f78dd87b68a284642d7b6bfbd86f3a37f3932fad7ecf1141e6"
      },
      "changes": {
        "vulnerabilities_fixed": [],
        "packages_updated": [
          {
            "name": "sqlite3",
            "type": "deb",
            "old_version": "3.46.1-7+deb13u2+dhi0",
            "new_version": "3.46.1-7+deb13u2+dhi1"
          }
        ],
        "packages_added": [],
        "packages_removed": [],
        "environment_variables_changed": [],
        "labels_changed": [],
        "configuration_changed": []
      }
    }
  }
}
```

### Example mirroring with `regctl`

The following example shows how to mirror a specific tag of a Docker Hardened
Image from Docker Hub to another registry, along with its associated
attestations using `regctl`. You must install
`regctl` first.

The example assumes you have mirrored the DHI repository to your organization's
namespace on Docker Hub as described in the previous section. You can apply the
same steps to a non-mirrored image by updating the `SRC_ATT_REPO` and
`SRC_REPO` variables accordingly.

1. Set environment variables for your specific environment. Replace the
   placeholders with your actual values.

   In this example, you authenticate as your Docker organization using an
   organization access token
   (OAT). The OAT must have at
   least pull access to every DHI repository you want to mirror. Only
   repositories in the token's scope are accessible. Alternatively, you can
   authenticate as a Docker Hub user with a personal access token
   (PAT) that has `read only` access.

   > **Warning:**
   >
   > The following examples export credentials directly on the command line for
   > demonstration purposes. This exposes sensitive tokens in your shell history
   > and process list. In production environments, use secure methods such as
   > reading from files with restricted permissions, environment files loaded
   > at runtime, or secret management tools.

   ```console
   $ export DOCKER_ORG="YOUR_DOCKER_ORG"
   $ export DOCKER_OAT="YOUR_DOCKER_OAT"
   $ export DEST_REG="registry.example.com"
   $ export DEST_REPO="mirror/dhi-python"
   $ export DEST_REG_USERNAME="YOUR_DESTINATION_REGISTRY_USERNAME"
   $ export DEST_REG_TOKEN="YOUR_DESTINATION_REGISTRY_TOKEN"
   $ export SRC_REPO="docker.io/${DOCKER_ORG}/dhi-python"
   $ export SRC_ATT_REPO="registry.scout.docker.com/${DOCKER_ORG}/dhi-python"
   $ export TAG="3.13-alpine3.21"
   ```

2. Sign in via `regctl` to Docker Hub, the Scout registry that contains
   the attestations, and your destination registry.

   ```console
   $ echo $DOCKER_OAT | regctl registry login -u "$DOCKER_ORG" --pass-stdin docker.io
   $ echo $DOCKER_OAT | regctl registry login -u "$DOCKER_ORG" --pass-stdin registry.scout.docker.com
   $ echo $DEST_REG_TOKEN | regctl registry login -u "$DEST_REG_USERNAME" --pass-stdin "$DEST_REG"
   ```

3. Mirror the image and attestations using `--referrers` and referrer endpoints:

   ```console
   $ regctl image copy \
        "${SRC_REPO}:${TAG}" \
        "${DEST_REG}/${DEST_REPO}:${TAG}" \
        --referrers \
        --referrers-src "${SRC_ATT_REPO}" \
        --referrers-tgt "${DEST_REG}/${DEST_REPO}" \
        --force-recursive
   ```

4. Verify that artifacts were preserved.

   First, get a digest for a specific tag and platform. For example, `linux/amd64`.

   ```console
   DIGEST="$(regctl manifest head "${DEST_REG}/${DEST_REPO}:${TAG}" --platform linux/amd64)"
   ```

   List attached artifacts (SBOM, provenance, VEX, vulnerability reports).

   ```console
   $ regctl artifact list "${DEST_REG}/${DEST_REPO}@${DIGEST}"
   ```

   Or, list attached artifacts with `docker scout`.

   ```console
   $ docker scout attest list "registry://${DEST_REG}/${DEST_REPO}@${DIGEST}"
   ```

### Example ongoing mirroring with `regsync`

`regsync` automates pulling from your organizations mirrored DHI repositories on
Docker Hub and pushing to your external registry including attestations. It
reads a YAML configuration file and can filter tags.

The following example uses a `regsync.yaml` file that syncs Node 24 and Python
3.12 Debian 13 variants, excluding Alpine and Debian 12.

```yaml
version: 1
# Optional: inline creds if not relying on prior CLI logins
# creds:
#   - registry: docker.io
#     user: <your-docker-org>
#     pass: "{{file \"/run/secrets/docker_oat\"}}"
#   - registry: registry.scout.docker.com
#     user: <your-docker-org>
#     pass: "{{file \"/run/secrets/docker_oat\"}}"
#   - registry: registry.example.com
#     user: <service-user>
#     pass: "{{file \"/run/secrets/dest_token\"}}"

sync:
  - source: docker.io/<your-org>/dhi-node
    target: registry.example.com/mirror/dhi-node
    type: repository
    fastCopy: true
    referrers: true
    referrerSource: registry.scout.docker.com/<your-org>/dhi-node
    referrerTarget: registry.example.com/mirror/dhi-node
    tags:
      allow: [ "24.*" ]
      deny: [ ".*alpine.*", ".*debian12.*" ]

  - source: docker.io/<your-org>/dhi-python
    target: registry.example.com/mirror/dhi-python
    type: repository
    fastCopy: true
    referrers: true
    referrerSource: registry.scout.docker.com/<your-org>/dhi-python
    referrerTarget: registry.example.com/mirror/dhi-python
    tags:
      allow: [ "3.12.*" ]
      deny: [ ".*alpine.*", ".*debian12.*" ]
```

To do a dry run with the configuration file, you can run the following command.
You must install `regsync` first.

```console
$ regsync check -c regsync.yaml
```

To run the sync with the configuration file:

```console
$ regsync once -c regsync.yaml
```

## What next

After mirroring, see Pull a DHI to learn how to pull and use mirrored images.
