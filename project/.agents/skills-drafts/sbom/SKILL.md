---
name: sbom
description: "Manual: run only when the user explicitly asks for /sbom. Generates a software bill of materials (CycloneDX or SPDX) of a project or an image, offline, and checks it is complete."
metadata:
  id: SEC-11
  stars: "1"
  nature: process
  mode: B
  wave: V4
  load: manual
---

# SBOM

**Core rule:** generate the SBOM from lockfiles or the built image with an installed tool, offline, in the format the requester asked for.

## Procedure

1. Pick the format (CycloneDX or SPDX) and the target (source tree or image).
   - Check: both written.
2. Generate it with the installed tool: for a tree `syft dir:. -o cyclonedx-json > sbom.json`, for an image `syft <image> -o spdx-json > sbom.json` (or the tool installed here).
   - Check: the file is valid JSON and lists components.
3. Check completeness: compare the component count with the lockfiles' packages.
   - Check: no ecosystem of the project is missing.
4. Store it where the requester wants (release asset, CI artefact).
   - Check: the location is reported.

## This installation

<!-- FILL: what=SBOM tool installed and usable offline; find=command -v syft cyclonedx-npm cyclonedx-py; verify=the tool generates an SBOM of the project without network -->

## Stop and ask the human if

- No SBOM tool is available from the internal mirror.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Write the SBOM by hand." | It will miss transitive dependencies. Use a tool. |
| "One ecosystem is enough." | Projects mix ecosystems; include all. |

## Definition of done

- [ ] SBOM generated offline in the requested format; completeness checked.

## Local completion checklist

- [ ] SBOM tool
