---
title: "Customize a Docker Hardened Image or chart (part 4 of 4)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/dhi/how-to/customize.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Customize a Docker Hardened Image or chart (part 4 of 4)

## Customize a DHI Helm chart

You can customize DHI Helm charts to meet your organization's specific needs.
Using the Docker Hub web interface or the DHI CLI, you can modify the image and
chart references to point to the default images and charts on `dhi.io`, mirrored
images, or customized images and charts you've created. This lets you create a
custom, securely-built chart with references to images and charts stored in
Docker Hub. DHI securely packages customized Helm charts that reference your
repositories by default.

To customize references, an organization owner must mirror the
DHI chart repository to your organization on Docker Hub. References that point
to `dhi.io` don't need a mirror. To point a reference to a mirrored image, a
customized image, or a customized chart, your organization also needs a mirror
of that repository.

You can create one chart customization per Helm chart repository. This is
different from image customizations, where you can create multiple
customizations per repository. If you need to make changes, you can edit your
existing customization. Alternatively, you can mirror the same Helm chart
repository again and add a new customization to the new mirror.

> **Note:**
>
> You can customize Docker Hardened Image charts like any other Helm chart using
> standard Helm tools and practices, such as a `values.yaml` file, outside of
> Docker Hub. The following instructions describe how to customize the
> references for the chart using Docker Hub or the DHI CLI.

To customize a Docker Hardened Image Helm chart after it has been mirrored:

1. Sign in to Docker Hub.
1. Select **My Hub**.
1. In the namespace drop-down, select your organization that has a mirrored DHI
   repository.
1. Select **Hardened Images** > **Manage** > **Mirrored Helm charts**.
1. For the mirrored DHI repository you want to customize, select the **Name**.
1. Select the **Customizations** tab.
1. Select **Create customization**.

   At this point, the on-screen instructions will guide you through the
   customization process. You can continue with the following steps for more
   details.

1. Select the Helm chart version you want to customize, then select **Next**.

   You can customize one Helm chart version at a time.

1. In the **Helm chart references** step, set the **Source** for each
   dependency of the chart:

   - **DHI registry (dhi.io)**: The chart pulls the default version of the
     dependency from `dhi.io`.
   - **Mirrored / customized**: The chart pulls the dependency from a
     repository in your organization. Select the **Repository**, then select a
     **Version** from **Customized versions** or **Mirrored versions**. This
     option is available when your organization has a mirror of the
     dependency's repository. Subcharts can only use customized versions.

   If you select a version with a different distribution than the dependency's
   default, Docker Hub shows a warning because the mismatch might cause issues
   when you use the chart.

1. Enter a customization name.

   Docker Hub uses the name as a suffix for the customized tags. For example,
   the name `Testing` adds the suffix `-testing`.

1. Select **Next**, review the customization, and create it.

### Helm chart customization YAML file

When using the CLI, Helm chart customizations use the same `prepare` / `create`
workflow as image customizations, but the configuration section uses
`variable_mappings` instead of image fields.

Run `prepare` with the chart repository and tag definition to generate a
scaffold. The scaffold lists every variable of the chart pointing at `dhi.io`,
with the other options commented out.

```console
$ docker dhi customization prepare redis-chart redis/helm/23 \
    --destination my-org/dhi-redis-chart \
    --name "my redis" \
    --org my-org \
    > customization.yaml
```

Use `variable_mappings` to set where each reference in the chart points.
The following example for the Redis chart keeps two references on `dhi.io`,
points one at a customized image, and points one at a mirrored image:

```yaml
name: my redis

targets:
  - destination: my-org/dhi-redis-chart
    tag_definition_id: redis/helm/23

variable_mappings:
  # Keep the chart's default image from dhi.io.
  - variable_name: BASH_REFERENCE
  - variable_name: KUBECTL_REFERENCE

  # Point at a customized image.
  - variable_name: REDIS_EXPORTER_REFERENCE
    repository: my-org/dhi-redis-exporter
    customization_id: "<redis-exporter-customization-id>"

  # Point at a mirrored image.
  - variable_name: REDIS_REFERENCE
    repository: my-org/dhi-redis
    tag_definition_id: redis/debian-13/8.10-compat
```

| Field | Description |
|:---|:---|
| `variable_mappings[].variable_name` | The chart variable to set. List every variable of the chart once, and don't change the names. A variable with only a name points at `dhi.io`. |
| `variable_mappings[].repository` | The repository in your organization to pull from. The namespace defaults to your organization if you leave it out. Required with `tag_definition_id` or `customization_id`. |
| `variable_mappings[].tag_definition_id` | The tag definition of the mirrored image to use. Set either this or `customization_id`, not both. Subcharts can't use a tag definition. |
| `variable_mappings[].customization_id` | The ID of the customization to use. Set either this or `tag_definition_id`, not both. |

Helm chart customizations support a single target.

Customizations created with `reference_mappings` can still be edited using
`reference_mappings`, but you can't convert them to `variable_mappings`. To use
`variable_mappings`, create a customization.

## Monitor customization builds

After creating a customization, you can track build status and view logs
through Docker Hub or the DHI CLI.

**Docker Hub**

1. Sign in to Docker Hub.
2. Select **My Hub**.
3. In the namespace drop-down, select your organization.
4. Select **Hardened Images** > **Manage**.
5. Select the **Customizations** tab.

**CLI**

List builds for a customization:

```console
$ docker dhi customization build list <customization-id> --org my-org
```

Get details of a specific build:

```console
$ docker dhi customization build get <customization-id> <build-id> --org my-org
```

View build logs:

```console
$ docker dhi customization build logs <customization-id> <build-id> --org my-org
```

## Edit or delete a customization

**Docker Hub**

1. Sign in to Docker Hub.
2. Select **My Hub**.
3. In the namespace drop-down, select your organization that has a mirrored repository.
4. Select **Hardened Images** > **Manage**.
5. Select **Customizations**.

6. For the customized DHI repository you want to manage, select the menu icon in the far right column.
   From here, you can:

   - **Edit**: Edit the customization.
   - **Create new**: Create a new customization based on the source repository.
   - **Delete**: Delete the customization.

7. Follow the on-screen instructions to complete the edit or deletion.

**CLI**

To edit a customization, update your YAML file and run:

```console
$ docker dhi customization edit my-customization.yaml --org my-org
```

The YAML file must include the `id` field to identify which customization to
update. To find the ID, run `docker dhi customization list --org my-org`.

To delete a customization by ID:

```console
$ docker dhi customization delete <id> --org my-org
$ docker dhi customization delete <id> --org my-org --force
```

The `--force` flag skips the confirmation prompt.
