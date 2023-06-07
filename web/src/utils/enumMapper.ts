import { JobStatus, PaymentStatus } from "../generated/graphql";

export const convertJobStatus = (jobStatus: JobStatus) => {
  let convertedStatus = "";
  switch (jobStatus) {
    case JobStatus.Completed:
      convertedStatus = "完了";
      break;
    case JobStatus.ContractorEvaluation:
      convertedStatus = "受注者評価";
      break;
    case JobStatus.Draft:
      convertedStatus = "下書保存中";
      break;
    case JobStatus.Open:
      convertedStatus = "公募中";
      break;
    case JobStatus.OrdererEvaluation:
      convertedStatus = "発注者評価";
      break;
    case JobStatus.Registered:
      convertedStatus = "登録済";
      break;
    case JobStatus.TempPayment:
      convertedStatus = "仮払";
      break;
    case JobStatus.WaitingForCompletion:
      convertedStatus = "仕事完了連絡待ち";
      break;
    case JobStatus.Expired:
      convertedStatus = "期限切れ";
      break;

    default:
      break;
  }

  return convertedStatus;
};

export const convertTransactionStatus = (transactionStatus: PaymentStatus) => {
  let convertedStatus = "";
  switch (transactionStatus) {
    case PaymentStatus.Pending:
      convertedStatus = "保留中";
      break;
    case PaymentStatus.Proccessing:
      convertedStatus = "成功";
      break;
    case PaymentStatus.Failed:
      convertedStatus = "失敗";
      break;
    case PaymentStatus.Successful:
      convertedStatus = "Successful";
      break;
    default:
      break;
  }
  return convertedStatus;
};
