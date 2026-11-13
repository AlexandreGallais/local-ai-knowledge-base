---
title: "Pod (part 24 of 24)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/core/pod-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Pod (part 24 of 24)

### `get` Get Connect Proxy

#### HTTP Request

GET /api/v1/namespaces/{namespace}/pods/{name}/proxy

#### Path Parameters

   | Name | Type | Description

       | `name`
       | string
       | name of the PodProxyOptions

       | `namespace`
       | string
       | object name and auth scope, such as for teams and projects

#### Query Parameters

   | Name | Type | Description

       | `path`
       | string
       | Path is the URL path to use for the current proxy request to pod.

#### Response

   | Status | Description | Response

       | 200
       | OK
       | string

### `get` Get Connect Proxy Path

#### HTTP Request

GET /api/v1/namespaces/{namespace}/pods/{name}/proxy/{path}

#### Path Parameters

   | Name | Type | Description

       | `name`
       | string
       | name of the PodProxyOptions

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
       | Path is the URL path to use for the current proxy request to pod.

#### Response

   | Status | Description | Response

       | 200
       | OK
       | string

### `head` Head Connect Proxy

#### HTTP Request

HEAD /api/v1/namespaces/{namespace}/pods/{name}/proxy

#### Path Parameters

   | Name | Type | Description

       | `name`
       | string
       | name of the PodProxyOptions

       | `namespace`
       | string
       | object name and auth scope, such as for teams and projects

#### Query Parameters

   | Name | Type | Description

       | `path`
       | string
       | Path is the URL path to use for the current proxy request to pod.

#### Response

   | Status | Description | Response

       | 200
       | OK
       | string

### `head` Head Connect Proxy Path

#### HTTP Request

HEAD /api/v1/namespaces/{namespace}/pods/{name}/proxy/{path}

#### Path Parameters

   | Name | Type | Description

       | `name`
       | string
       | name of the PodProxyOptions

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
       | Path is the URL path to use for the current proxy request to pod.

#### Response

   | Status | Description | Response

       | 200
       | OK
       | string

### `put` Replace Connect Proxy

#### HTTP Request

PUT /api/v1/namespaces/{namespace}/pods/{name}/proxy

#### Path Parameters

   | Name | Type | Description

       | `name`
       | string
       | name of the PodProxyOptions

       | `namespace`
       | string
       | object name and auth scope, such as for teams and projects

#### Query Parameters

   | Name | Type | Description

       | `path`
       | string
       | Path is the URL path to use for the current proxy request to pod.

#### Response

   | Status | Description | Response

       | 200
       | OK
       | string

### `put` Replace Connect Proxy Path

#### HTTP Request

PUT /api/v1/namespaces/{namespace}/pods/{name}/proxy/{path}

#### Path Parameters

   | Name | Type | Description

       | `name`
       | string
       | name of the PodProxyOptions

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
       | Path is the URL path to use for the current proxy request to pod.

#### Response

   | Status | Description | Response

       | 200
       | OK
       | string

### `get` Read Log

#### HTTP Request

GET /api/v1/namespaces/{namespace}/pods/{name}/log

#### Path Parameters

   | Name | Type | Description

       | `name`
       | string
       | name of the Pod

       | `namespace`
       | string
       | object name and auth scope, such as for teams and projects

#### Query Parameters

   | Name | Type | Description

       | `container`
       | string
       | The container for which to stream logs. Defaults to only container if there is one container in the pod.

       | `follow`
       | boolean
       | Follow the log stream of the pod. Defaults to false.

       | `insecureSkipTLSVerifyBackend`
       | boolean
       | insecureSkipTLSVerifyBackend indicates that the apiserver should not confirm the validity of the serving certificate of the backend it is connecting to.  This will make the HTTPS connection between the apiserver and the backend insecure. This means the apiserver cannot verify the log data it is receiving came from the real kubelet.  If the kubelet is configured to verify the apiserver's TLS credentials, it does not mean the connection to the real kubelet is vulnerable to a man in the middle attack (e.g. an attacker could not intercept the actual log data coming from the real kubelet).

       | `limitBytes`
       | integer
       | If set, the number of bytes to read from the server before terminating the log output. This may not display a complete final line of logging, and may return slightly more or slightly less than the specified limit.

       | `pretty`
       | string
       | If 'true', then the output is pretty printed. Defaults to 'false' unless the user-agent indicates a browser or command-line HTTP tool (curl and wget).

       | `previous`
       | boolean
       | Return previous terminated container logs. Defaults to false.

       | `sinceSeconds`
       | integer
       | A relative time in seconds before the current time from which to show logs. If this value precedes the time a pod was started, only logs since the pod start will be returned. If this value is in the future, no logs will be returned. Only one of sinceSeconds or sinceTime may be specified.

       | `stream`
       | string
       | Specify which container log stream to return to the client. Acceptable values are "All", "Stdout" and "Stderr". If not specified, "All" is used, and both stdout and stderr are returned interleaved. Note that when "TailLines" is specified, "Stream" can only be set to nil or "All".

       | `tailLines`
       | integer
       | If set, the number of lines from the end of the logs to show. If not specified, logs are shown from the creation of the container or sinceSeconds or sinceTime. Note that when "TailLines" is specified, "Stream" can only be set to nil or "All".

       | `timestamps`
       | boolean
       | If true, add an RFC3339 or RFC3339Nano timestamp at the beginning of every line of log output. Defaults to false.

#### Response

   | Status | Description | Response

       | 200
       | OK
       | string

### `get` Get Connect Exec

#### HTTP Request

GET /api/v1/namespaces/{namespace}/pods/{name}/exec

#### Path Parameters

   | Name | Type | Description

       | `name`
       | string
       | name of the PodExecOptions

       | `namespace`
       | string
       | object name and auth scope, such as for teams and projects

#### Query Parameters

   | Name | Type | Description

       | `command`
       | string
       | Command is the remote command to execute. argv array. Not executed within a shell.

       | `container`
       | string
       | Container in which to execute the command. Defaults to only container if there is only one container in the pod.

       | `stderr`
       | boolean
       | Redirect the standard error stream of the pod for this call.

       | `stdin`
       | boolean
       | Redirect the standard input stream of the pod for this call. Defaults to false.

       | `stdout`
       | boolean
       | Redirect the standard output stream of the pod for this call.

       | `tty`
       | boolean
       | TTY if true indicates that a tty will be allocated for the exec call. Defaults to false.

#### Response

   | Status | Description | Response

       | 200
       | OK
       | string

### `post` Create Connect Exec

#### HTTP Request

POST /api/v1/namespaces/{namespace}/pods/{name}/exec

#### Path Parameters

   | Name | Type | Description

       | `name`
       | string
       | name of the PodExecOptions

       | `namespace`
       | string
       | object name and auth scope, such as for teams and projects

#### Query Parameters

   | Name | Type | Description

       | `command`
       | string
       | Command is the remote command to execute. argv array. Not executed within a shell.

       | `container`
       | string
       | Container in which to execute the command. Defaults to only container if there is only one container in the pod.

       | `stderr`
       | boolean
       | Redirect the standard error stream of the pod for this call.

       | `stdin`
       | boolean
       | Redirect the standard input stream of the pod for this call. Defaults to false.

       | `stdout`
       | boolean
       | Redirect the standard output stream of the pod for this call.

       | `tty`
       | boolean
       | TTY if true indicates that a tty will be allocated for the exec call. Defaults to false.

#### Response

   | Status | Description | Response

       | 200
       | OK
       | string

### `get` Get Connect Attach

#### HTTP Request

GET /api/v1/namespaces/{namespace}/pods/{name}/attach

#### Path Parameters

   | Name | Type | Description

       | `name`
       | string
       | name of the PodAttachOptions

       | `namespace`
       | string
       | object name and auth scope, such as for teams and projects

#### Query Parameters

   | Name | Type | Description

       | `container`
       | string
       | The container in which to execute the command. Defaults to only container if there is only one container in the pod.

       | `stderr`
       | boolean
       | Stderr if true indicates that stderr is to be redirected for the attach call. Defaults to true.

       | `stdin`
       | boolean
       | Stdin if true, redirects the standard input stream of the pod for this call. Defaults to false.

       | `stdout`
       | boolean
       | Stdout if true indicates that stdout is to be redirected for the attach call. Defaults to true.

       | `tty`
       | boolean
       | TTY if true indicates that a tty will be allocated for the attach call. This is passed through the container runtime so the tty is allocated on the worker node by the container runtime. Defaults to false.

#### Response

   | Status | Description | Response

       | 200
       | OK
       | string

### `post` Create Connect Attach

#### HTTP Request

POST /api/v1/namespaces/{namespace}/pods/{name}/attach

#### Path Parameters

   | Name | Type | Description

       | `name`
       | string
       | name of the PodAttachOptions

       | `namespace`
       | string
       | object name and auth scope, such as for teams and projects

#### Query Parameters

   | Name | Type | Description

       | `container`
       | string
       | The container in which to execute the command. Defaults to only container if there is only one container in the pod.

       | `stderr`
       | boolean
       | Stderr if true indicates that stderr is to be redirected for the attach call. Defaults to true.

       | `stdin`
       | boolean
       | Stdin if true, redirects the standard input stream of the pod for this call. Defaults to false.

       | `stdout`
       | boolean
       | Stdout if true indicates that stdout is to be redirected for the attach call. Defaults to true.

       | `tty`
       | boolean
       | TTY if true indicates that a tty will be allocated for the attach call. This is passed through the container runtime so the tty is allocated on the worker node by the container runtime. Defaults to false.

#### Response

   | Status | Description | Response

       | 200
       | OK
       | string
