---
title: "Audit record reference (part 2 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/governance/reference/audit-records.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Audit record reference (part 2 of 2)

## Sample record

The following sample shows a request that a deny rule blocked:

```json
{
  "audit_event_id": "032d5bf2-6be0-484c-9fd1-296680bb9af4",
  "timestamp": "2026-10-22T21:15:32.674118Z",
  "schema_version": "1.228.0",
  "category": "AUDIT_CATEGORY_EVALUATION",
  "decision": "AUDIT_DECISION_DENY",
  "username": "jordandoe",
  "user_email": "jordandoe@example.com",
  "audit_session_id": "d038717d-e86d-48c5-abbb-19b7f14c37c8",
  "agent": "shell",
  "sandbox_id": "my-sandbox",
  "resource_id": "example.com:443",
  "policy_rule": "local:fa56f4d3-7f16-4144-af84-caa7917b2387",
  "policy_id": "f588126a-8323-47d5-b099-b3d184055733",
  "policy_type": "AllowList:V0",
  "policy_source": "local",
  "policy_denial_code": "POLICY_DENIAL_CODE_POLICY_DENY",
  "org_id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
  "org_name": "Acme Inc",
  "os": "windows",
  "app_version": "v0.48.0",
  "client_name": "sbx",
  "hostname": "host-machine",
  "deny_reason": [
    "denied: rule \"local:fa56f4d3-7f16-4144-af84-caa7917b2387\" matched op(action=net:connect:tcp, resource=net:domain:example.com:443)"
  ],
  "enforcement_mode": "audit",
  "action_type": "network_egress",
  "network_egress": { "destination_port": "443", "protocol": "tcp" }
}
```

The following sample shows a user approving an HTTP request that required
approval:

```json
{
  "audit_event_id": "3c1f6a2e-8b47-4d0a-9e55-2f7b1d6c9a04",
  "timestamp": "2026-09-25T17:42:08.114502Z",
  "schema_version": "1.216.0",
  "category": "AUDIT_CATEGORY_EVALUATION",
  "decision": "AUDIT_DECISION_APPROVAL_ALLOW",
  "username": "jordandoe",
  "user_email": "jordandoe@example.com",
  "org_id": "9f8e7d6c-5b4a-3210-fedc-ba9876543210",
  "org_name": "Acme Inc",
  "audit_session_id": "8a3bc076-79d0-4502-baf3-cc6ad35fb578",
  "resource_id": "api.example.com:443",
  "os": "macos",
  "app_version": "v0.46.0",
  "client_name": "sbx",
  "hostname": "host-machine",
  "approval": {
    "approval_request_id": "b7e2c9d1-4f60-4a8e-93c2-5d1e8f7a6b30",
    "grant_scope": "AUDIT_APPROVAL_GRANT_SCOPE_PERSISTENT"
  },
  "action_type": "http_request",
  "http_request": {
    "method": "HTTP_METHOD_POST",
    "host": "api.example.com",
    "port": "443",
    "path": "/v1/items"
  },
  "agent": "claude"
}
```
