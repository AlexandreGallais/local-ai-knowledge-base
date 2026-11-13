---
title: "Node (part 8 of 8)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/core/node-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Node (part 8 of 8)

### `delete` Delete Connect Proxy Path

#### HTTP Request

DELETE /api/v1/nodes/{name}/proxy/{path}

#### Path Parameters

   | Name | Type | Description

       | `name`
       | string
       | name of the NodeProxyOptions

       | `path`
       | string
       | path to the resource

#### Query Parameters

   | Name | Type | Description

       | `path`
       | string
       | Path is the URL path to use for the current proxy request to node.

#### Response

   | Status | Description | Response

       | 200
       | OK
       | string

### `get` Get Connect Proxy

#### HTTP Request

GET /api/v1/nodes/{name}/proxy

#### Path Parameters

   | Name | Type | Description

       | `name`
       | string
       | name of the NodeProxyOptions

#### Query Parameters

   | Name | Type | Description

       | `path`
       | string
       | Path is the URL path to use for the current proxy request to node.

#### Response

   | Status | Description | Response

       | 200
       | OK
       | string

### `get` Get Connect Proxy Path

#### HTTP Request

GET /api/v1/nodes/{name}/proxy/{path}

#### Path Parameters

   | Name | Type | Description

       | `name`
       | string
       | name of the NodeProxyOptions

       | `path`
       | string
       | path to the resource

#### Query Parameters

   | Name | Type | Description

       | `path`
       | string
       | Path is the URL path to use for the current proxy request to node.

#### Response

   | Status | Description | Response

       | 200
       | OK
       | string

### `head` Head Connect Proxy

#### HTTP Request

HEAD /api/v1/nodes/{name}/proxy

#### Path Parameters

   | Name | Type | Description

       | `name`
       | string
       | name of the NodeProxyOptions

#### Query Parameters

   | Name | Type | Description

       | `path`
       | string
       | Path is the URL path to use for the current proxy request to node.

#### Response

   | Status | Description | Response

       | 200
       | OK
       | string

### `head` Head Connect Proxy Path

#### HTTP Request

HEAD /api/v1/nodes/{name}/proxy/{path}

#### Path Parameters

   | Name | Type | Description

       | `name`
       | string
       | name of the NodeProxyOptions

       | `path`
       | string
       | path to the resource

#### Query Parameters

   | Name | Type | Description

       | `path`
       | string
       | Path is the URL path to use for the current proxy request to node.

#### Response

   | Status | Description | Response

       | 200
       | OK
       | string

### `put` Replace Connect Proxy

#### HTTP Request

PUT /api/v1/nodes/{name}/proxy

#### Path Parameters

   | Name | Type | Description

       | `name`
       | string
       | name of the NodeProxyOptions

#### Query Parameters

   | Name | Type | Description

       | `path`
       | string
       | Path is the URL path to use for the current proxy request to node.

#### Response

   | Status | Description | Response

       | 200
       | OK
       | string

### `put` Replace Connect Proxy Path

#### HTTP Request

PUT /api/v1/nodes/{name}/proxy/{path}

#### Path Parameters

   | Name | Type | Description

       | `name`
       | string
       | name of the NodeProxyOptions

       | `path`
       | string
       | path to the resource

#### Query Parameters

   | Name | Type | Description

       | `path`
       | string
       | Path is the URL path to use for the current proxy request to node.

#### Response

   | Status | Description | Response

       | 200
       | OK
       | string
