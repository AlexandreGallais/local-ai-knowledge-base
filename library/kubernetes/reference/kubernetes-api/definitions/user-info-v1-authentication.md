---
title: "UserInfo"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/definitions/user-info-v1-authentication.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# UserInfo

`apiVersion: authentication.k8s.io/v1`

`import "k8s.io/api/authentication/v1"`

## UserInfo {#UserInfo}

UserInfo holds the information about the user needed to implement the user.Info interface.

   | Field | Description

       | `extra`object
       | extra is any additional information provided by the authenticator.

       | `groups`string array
       | groups is the names of groups this user is a part of.

       | `uid`string
       | uid is a unique value that identifies this user across time. If this user is deleted and another user by the same name is added, they will have different UIDs.

       | `username`string
       | username is the name that uniquely identifies this user among all active users.
