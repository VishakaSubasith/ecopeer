export enum JobStatus {
  Draft = "DRAFT",
  Registered = "REGISTERED",
  Open = "OPEN",
  TempPayment = "TEMP_PAYMENT",
  WaitingForCompletion = "WAITING_COMPLETION",
  OrdererEvaluation = "ORDER_EREVALUATION",
  ContractorEvaluation = "CONTRACTOR_EVALUATION",
  Completed = "COMPLETED",
  Expired = "EXPIRED",
}

export enum UserType {
  Unregistered = "UNREGISTERED",
  Unverified = "UNVERIFIED",
  PendingProfile = "PENDING_PROFILE",
  Owner = "OWNER",
  Maintainer = "MAINTAINER",
  OwnerMaintainer = "OWNER_MAINTAINER",
  Admin = "ADMIN",
}

export enum AccountType {
  Free = "FREE",
  Paid = "PAID",
}

export enum PaymentStatus {
  Pending = "PENDING",
  Proccessing = "PROCCESSING",
  Failed = "FAILED",
  Successful = "SUCCESSFUL",
}

export enum OwnerType {
  Individual = "INDIVIDUAL",
  Corporate = "CORPORATE",
  ManagementCompany = "MANAGEMENT_COMPANY",
}
