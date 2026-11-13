---
title: "Custom role permissions reference"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/security/roles-and-permissions/custom-roles/permissions-reference.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Custom role permissions reference

Custom roles use permissions from organization management, Docker Hub,
billing, licensing, AI Governance, Docker Hardened Images, Docker
Offload, and Docker Cloud Sandboxes. Use the following tables to create
or edit a custom role.

{{- $data := hugo.Data.custom_role_permissions -}}
{{- if not $data.groups -}}
  {{- errorf "custom-role-permissions: no groups found in data/custom_role_permissions.yaml: %s" .Position -}}
{{- end -}}
{{- range $group := $data.groups -}}
  {{- if not $group.name -}}
    {{- errorf "custom-role-permissions: group without a name: %s" $.Position -}}
  {{- end -}}
  {{- if $group.relations }}

## {{ $group.name }}

| Permission | Description |
| :--------- | :---------- |
{{ range $group.relations -}}
  {{- if or (not .name) (not .description) -}}
    {{- errorf "custom-role-permissions: relation %q in group %q needs a name and description: %s" .name $group.name $.Position -}}
  {{- end -}}
| {{ replace .name "|" "\\|" }} | {{ replace .description "|" "\\|" }} |
{{ end -}}
  {{- end -}}
{{- end }}

## Next steps

- Manage custom roles: Create, assign, and delete custom
  roles
- Core roles and permissions:
  Compare built-in Member, Editor, and Owner permissions
