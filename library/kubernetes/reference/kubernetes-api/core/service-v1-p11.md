---
title: "Service (part 11 of 11)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/core/service-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Service (part 11 of 11)

### `post` Create Connect Proxy Path

#### HTTP Request

POST /api/v1/namespaces/{namespace}/services/{name}/proxy/{path}

#### Path Parameters

   | Name | Type | Description

       | `name`
       | string
       | name of the ServiceProxyOptions

       | `namespace`
       | string
       | object name and auth scope, such as for teams and projects

       | `path`
       | string
       | path to the resource

#### Query Parameters

   | Name | Type | Description

       | `path`
       | string
       | Path is the part of URLs that include service endpoints, suffixes, and parameters to use for the current proxy request to service. For example, the whole request URL is http://localhost/api/v1/namespaces/kube-system/services/elasticsearch-logging/_search?q=user:kimchy. Path is _search?q=user:kimchy.

#### Response

   | Status | Description | Response

       | 200
       | OK
       | string

### `delete` Delete Connect Proxy

#### HTTP Request

DELETE /api/v1/namespaces/{namespace}/services/{name}/proxy

#### Path Parameters

   | Name | Type | Description

       | `name`
       | string
       | name of the ServiceProxyOptions

       | `namespace`
       | string
       | object name and auth scope, such as for teams and projects

#### Query Parameters

   | Name | Type | Description

       | `path`
       | string
       | Path is the part of URLs that include service endpoints, suffixes, and parameters to use for the current proxy request to service. For example, the whole request URL is http://localhost/api/v1/namespaces/kube-system/services/elasticsearch-logging/_search?q=user:kimchy. Path is _search?q=user:kimchy.

#### Response

   | Status | Description | Response

       | 200
       | OK
       | string

### `delete` Delete Connect Proxy Path

#### HTTP Request

DELETE /api/v1/namespaces/{namespace}/services/{name}/proxy/{path}

#### Path Parameters

   | Name | Type | Description

       | `name`
       | string
       | name of the ServiceProxyOptions

       | `namespace`
       | string
       | object name and auth scope, such as for teams and projects

       | `path`
       | string
       | path to the resource

#### Query Parameters

   | Name | Type | Description

       | `path`
       | string
       | Path is the part of URLs that include service endpoints, suffixes, and parameters to use for the current proxy request to service. For example, the whole request URL is http://localhost/api/v1/namespaces/kube-system/services/elasticsearch-logging/_search?q=user:kimchy. Path is _search?q=user:kimchy.

#### Response

   | Status | Description | Response

       | 200
       | OK
       | string

### `get` Get Connect Proxy

#### HTTP Request

GET /api/v1/namespaces/{namespace}/services/{name}/proxy

#### Path Parameters

   | Name | Type | Description

       | `name`
       | string
       | name of the ServiceProxyOptions

       | `namespace`
       | string
       | object name and auth scope, such as for teams and projects

#### Query Parameters

   | Name | Type | Description

       | `path`
       | string
       | Path is the part of URLs that include service endpoints, suffixes, and parameters to use for the current proxy request to service. For example, the whole request URL is http://localhost/api/v1/namespaces/kube-system/services/elasticsearch-logging/_search?q=user:kimchy. Path is _search?q=user:kimchy.

#### Response

   | Status | Description | Response

       | 200
       | OK
       | string

### `get` Get Connect Proxy Path

#### HTTP Request

GET /api/v1/namespaces/{namespace}/services/{name}/proxy/{path}

#### Path Parameters

   | Name | Type | Description

       | `name`
       | string
       | name of the ServiceProxyOptions

       | `namespace`
       | string
       | object name and auth scope, such as for teams and projects

       | `path`
       | string
       | path to the resource

#### Query Parameters

   | Name | Type | Description

       | `path`
       | string
       | Path is the part of URLs that include service endpoints, suffixes, and parameters to use for the current proxy request to service. For example, the whole request URL is http://localhost/api/v1/namespaces/kube-system/services/elasticsearch-logging/_search?q=user:kimchy. Path is _search?q=user:kimchy.

#### Response

   | Status | Description | Response

       | 200
       | OK
       | string

### `head` Head Connect Proxy

#### HTTP Request

HEAD /api/v1/namespaces/{namespace}/services/{name}/proxy

#### Path Parameters

   | Name | Type | Description

       | `name`
       | string
       | name of the ServiceProxyOptions

       | `namespace`
       | string
       | object name and auth scope, such as for teams and projects

#### Query Parameters

   | Name | Type | Description

       | `path`
       | string
       | Path is the part of URLs that include service endpoints, suffixes, and parameters to use for the current proxy request to service. For example, the whole request URL is http://localhost/api/v1/namespaces/kube-system/services/elasticsearch-logging/_search?q=user:kimchy. Path is _search?q=user:kimchy.

#### Response

   | Status | Description | Response

       | 200
       | OK
       | string

### `head` Head Connect Proxy Path

#### HTTP Request

HEAD /api/v1/namespaces/{namespace}/services/{name}/proxy/{path}

#### Path Parameters

   | Name | Type | Description

       | `name`
       | string
       | name of the ServiceProxyOptions

       | `namespace`
       | string
       | object name and auth scope, such as for teams and projects

       | `path`
       | string
       | path to the resource

#### Query Parameters

   | Name | Type | Description

       | `path`
       | string
       | Path is the part of URLs that include service endpoints, suffixes, and parameters to use for the current proxy request to service. For example, the whole request URL is http://localhost/api/v1/namespaces/kube-system/services/elasticsearch-logging/_search?q=user:kimchy. Path is _search?q=user:kimchy.

#### Response

   | Status | Description | Response

       | 200
       | OK
       | string

### `put` Replace Connect Proxy

#### HTTP Request

PUT /api/v1/namespaces/{namespace}/services/{name}/proxy

#### Path Parameters

   | Name | Type | Description

       | `name`
       | string
       | name of the ServiceProxyOptions

       | `namespace`
       | string
       | object name and auth scope, such as for teams and projects

#### Query Parameters

   | Name | Type | Description

       | `path`
       | string
       | Path is the part of URLs that include service endpoints, suffixes, and parameters to use for the current proxy request to service. For example, the whole request URL is http://localhost/api/v1/namespaces/kube-system/services/elasticsearch-logging/_search?q=user:kimchy. Path is _search?q=user:kimchy.

#### Response

   | Status | Description | Response

       | 200
       | OK
       | string

### `put` Replace Connect Proxy Path

#### HTTP Request

PUT /api/v1/namespaces/{namespace}/services/{name}/proxy/{path}

#### Path Parameters

   | Name | Type | Description

       | `name`
       | string
       | name of the ServiceProxyOptions

       | `namespace`
       | string
       | object name and auth scope, such as for teams and projects

       | `path`
       | string
       | path to the resource

#### Query Parameters

   | Name | Type | Description

       | `path`
       | string
       | Path is the part of URLs that include service endpoints, suffixes, and parameters to use for the current proxy request to service. For example, the whole request URL is http://localhost/api/v1/namespaces/kube-system/services/elasticsearch-logging/_search?q=user:kimchy. Path is _search?q=user:kimchy.

#### Response

   | Status | Description | Response

       | 200
       | OK
       | string
