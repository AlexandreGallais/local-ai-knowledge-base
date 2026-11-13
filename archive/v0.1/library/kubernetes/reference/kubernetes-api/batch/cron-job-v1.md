---
title: "CronJob (part 1 of 8)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/batch/cron-job-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# CronJob

`apiVersion: batch/v1`

`import "k8s.io/api/batch/v1"`

## CronJob {#CronJob}

CronJob represents the configuration of a single cron job.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

       | `spec` *CronJobSpec
       | Specification of the desired behavior of a cron job, including the schedule. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

       | `status`CronJobStatus
       | Current status of a cron job. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

## CronJobSpec {#CronJobSpec}

CronJobSpec describes how the job execution will look like and when it will actually run.

   | Field | Description

       | `concurrencyPolicy`string
       | Specifies how to treat concurrent executions of a Job. Valid values are:  - "Allow" (default): allows CronJobs to run concurrently; - "Forbid": forbids concurrent runs, skipping next run if previous run hasn't finished yet; - "Replace": cancels currently running job and replaces it with a new onePossible enum values: - `"Allow"` allows CronJobs to run concurrently. - `"Forbid"` forbids concurrent runs, skipping next run if previous hasn't finished yet. - `"Replace"` cancels currently running job and replaces it with a new one.

       | `failedJobsHistoryLimit`integer
       | The number of failed finished jobs to retain. Value must be non-negative integer. Defaults to 1.

       | `jobTemplate` *JobTemplateSpec
       | Specifies the job that will be created when executing a CronJob.

       | `schedule` *string
       | The schedule in Cron format, see https://en.wikipedia.org/wiki/Cron.

       | `startingDeadlineSeconds`integer
       | Optional deadline in seconds for starting the job if it misses scheduled time for any reason.  Missed jobs executions will be counted as failed ones.

       | `successfulJobsHistoryLimit`integer
       | The number of successful finished jobs to retain. Value must be non-negative integer. Defaults to 3.

       | `suspend`boolean
       | This flag tells the controller to suspend subsequent executions, it does not apply to already started executions.  Defaults to false.

       | `timeZone`string
       | The time zone name for the given schedule, see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones. If not specified, this will default to the time zone of the kube-controller-manager process. The set of valid time zone names and the time zone offset is loaded from the system-wide time zone database by the API server during CronJob validation and the controller manager during execution. If no system-wide time zone database can be found a bundled version of the database is used instead. If the time zone name becomes invalid during the lifetime of a CronJob or due to a change in host configuration, the controller will stop creating new new Jobs and will create a system event with the reason UnknownTimeZone. More information can be found in https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/#time-zones

## CronJobStatus {#CronJobStatus}

CronJobStatus represents the current state of a cron job.

   | Field | Description

       | `active`ObjectReference array
       | A list of pointers to currently running jobs.

       | `lastScheduleTime`Time
       | Information when was the last time the job was successfully scheduled.

       | `lastSuccessfulTime`Time
       | Information when was the last time the job successfully completed.

## CronJobList {#CronJobList}

CronJobList is a collection of cron jobs.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *CronJob array
       | items is the list of CronJobs.

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

## JobTemplateSpec {#JobTemplateSpec}

JobTemplateSpec describes the data a Job should have when created from a template

   | Field | Description

       | `metadata`ObjectMeta
       | Standard object's metadata of the jobs created from this template. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

       | `spec`JobSpec
       | Specification of the desired behavior of the job. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
