---
title: "StorageVersionMigration (part 1 of 6)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/storagemigration/storage-version-migration-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# StorageVersionMigration

`apiVersion: storagemigration.k8s.io/v1`

`import "k8s.io/api/storagemigration/v1"`

## StorageVersionMigration {#StorageVersionMigration}

StorageVersionMigration represents a migration of stored data to the latest storage version.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | Standard object metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

       | `spec`StorageVersionMigrationSpec
       | Specification of the migration.

       | `status`StorageVersionMigrationStatus
       | Status of the migration.

## StorageVersionMigrationSpec {#StorageVersionMigrationSpec}

Spec of the storage version migration.

   | Field | Description

       | `resource` *GroupResource
       | The resource that is being migrated. The migrator sends requests to the endpoint serving the resource. Immutable.

## StorageVersionMigrationStatus {#StorageVersionMigrationStatus}

Status of the storage version migration.

   | Field | Description

       | `conditions`Condition arraypatch strategy: merge on key `type`
       | The latest available observations of the migration's current state.

       | `resourceVersion`string
       | ResourceVersion to compare with the GC cache for performing the migration. This is the current resource version of given group, version and resource when kube-controller-manager first observes this StorageVersionMigration resource.

## StorageVersionMigrationList {#StorageVersionMigrationList}

StorageVersionMigrationList is a collection of storage version migrations.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *StorageVersionMigration array
       | Items is the list of StorageVersionMigration

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | Standard list metadata More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
