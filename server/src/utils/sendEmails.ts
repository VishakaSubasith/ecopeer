// @ts-ignore
import nodemailer from "nodemailer";
import { AppNotification } from "../entities/AppNotification";
import { Job } from "../entities/Job";
import { PaymentTransaction } from "../entities/PaymentTransaction";
import { SolarPowerPlantMaintainer } from "../entities/SolarPowerPlantMaintainer";
// import { getAdminEmails } from "./getEmails";

export const sendEmail = async (
  to: string | string[],
  subject: string,
  text: string,
  html: string,
  bcc?: string | string[]
) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.muumuu-mail.com",
    port: 465,
    secure: true,
    auth: {
      user: "info@ecopeer.net",
      pass: "love2000",
    },
  });

  try {
    await transporter.sendMail({
      sender: "info@ecopeer.net",
      from: "Ecopeer info@ecopeer.net",
      replyTo: "help@ecopeer.net",
      to,
      bcc,
      subject,
      text,
      html,
    });
  } catch (error) {
    console.log(
      `Sending the email to: ${to} bcc: ${bcc} subject: ${subject}
    ${html}
    failed`,
      error
    );
  }
};

// @ts-ignore
export const sendJobOpenEmail = (ownerEmail: string, maintainerEmails: string[], adminEmails: string[],
  jobTitle: string
) => {
  const ownerTemplate = `<p>あなたの仕事 ${jobTitle} は一般に公開されました</p>`;

  // const maintainerTemplate = `<p> 新しい仕事が追加されました ${jobTitle} </p>`;

  const adminTemplate = `<p> 新しい仕事が追加されました ${jobTitle} </p>`;

  const subject = "新しいお仕事が公募されました";
  const text = "新しいお仕事が公募されました";
  sendEmail(ownerEmail, subject, text, ownerTemplate);
  // sendEmail(maintainerEmails, subject, text, maintainerTemplate);
  sendEmail(maintainerEmails, subject, text, adminTemplate);
};

// @ts-ignore
export const sendJobApplicationEmail = (ownerEmail: string, maintainerEmail: string, adminEmails: string[], job: Job, maintainer: SolarPowerPlantMaintainer
) => {
  const ownerTemplate = `No:${job.id}「${job.shortDescription}」に${maintainer.name}さんが${job.budget}円で、応募しました。チャットで詳細を打ち合わせし、発注先を選んでください。`;

  const maintainerTemplate = "仕事に適用";

  // const adminTemplate = "仕事に適用";

  const subject = `No: ${job.id}「${job.title}」に応募がありました`;
  const text = "求人応募";
  sendEmail(ownerEmail, subject, text, ownerTemplate);
  sendEmail(maintainerEmail, subject, text, maintainerTemplate);
  // sendEmail(adminEmails, subject, text, adminTemplate);
};

// @ts-ignore
export const sendUpdateSuggestedPriceEmail = (ownerEmail: string, maintainerEmail: string, adminEmails: string[], job: Job, suggestedPrice: number, maintainer: SolarPowerPlantMaintainer
) => {
  const ownerTemplate = `No:${job.id}「${job.shortDescription}」に${maintainer.name}さんが${suggestedPrice}円で、応募しました。チャットで詳細を打ち合わせし、発注先を選んでください。`;

  const maintainerTemplate = "希望小売価格が更新されました";

  // const adminTemplate = "希望小売価格が更新されました";

  const subject = `No: ${job.id}「${job.title}」に応募がありました`;
  const text = "求人応募";
  sendEmail(ownerEmail, subject, text, ownerTemplate);
  sendEmail(maintainerEmail, subject, text, maintainerTemplate);
  // sendEmail(adminEmails, subject, text, adminTemplate);
};

// @ts-ignore
export const sendJobApplicantSelectedEmail = (ownerEmail: string, maintainerEmail: string, adminEmails: string[], jobId: number, jobTitle: string, maintainerName: string
) => {
  const ownerTemplate = "応募者を選択";

  const maintainerTemplate = `No:${jobId}「${jobTitle}」に${maintainerName}さんが選ばれました。`;

  // const adminTemplate = "応募者を選択";

  const subject = `No:${jobId}「${jobTitle}」で選ばれました`;
  const text = "求職者が選ばれました";
  sendEmail(ownerEmail, subject, text, ownerTemplate);
  sendEmail(maintainerEmail, subject, text, maintainerTemplate);
  // sendEmail(adminEmails, subject, text, adminTemplate);
};

export const sendJobPaymentSuccessfulEmail = async (transactionId: number) => {
  const transaction = await PaymentTransaction.findOneOrFail({
    where: { transactionId },
    relations: [
      "user",
      "user.solarPowerPlantOwner",
      "job",
      "job.approvedApplicant",
      "job.approvedApplicant.user",
    ],
  });

  const maintainerEmail = transaction.job.approvedApplicant.user.email;
  const ownerEmail = transaction.user.email;
  // const adminEmails = await getAdminEmails();

  const jobId = transaction.job.id;
  const jobTitle = transaction.job.title;
  const ownerName = transaction.job.approvedApplicant.name;
  // const maintainerName = transaction.user.solarPowerPlantOwner.nickname;

  const subject = `No:${jobId}「${jobTitle}」で前払が完了しました。`;
  // const adminSubject = `No:${jobId}「${jobTitle}」の前払が完了しました`;

  const text = "仕事の支払いが成功しました";

  const ownerTemplate = "仕事の支払いが成功しました";

  const maintainerTemplate = `No:${jobId}「${jobTitle}」で${ownerName}さんが前払を完了しました。仕事を終了させ、完了報告をして下さい。`;

  // const adminTemplate = `No:${jobId}「${jobTitle}」で前払が完了しました。
  // 発注者（前払者）：${ownerName}さん
  // 受注者：${maintainerName}さん`;

  await AppNotification.create({
    content: `No:${transaction.job.id}「${transaction.job.title}」で${transaction.user.solarPowerPlantOwner.nickname}さんが前払を完了しました。仕事を終了させ、完了報告をして下さい。`,
    user: transaction.job.approvedApplicant.user,
  }).save();

  sendEmail(ownerEmail, subject, text, ownerTemplate);
  sendEmail(maintainerEmail, subject, text, maintainerTemplate);
  // sendEmail(adminEmails, adminSubject, text, adminTemplate);
};

// @ts-ignore
export const sendJobFinishedByMaintainerEmail = (ownerEmail: string, maintainerEmail: string, adminEmails: string[], jobId: number, jobTitle: string, maintainerName: string
) => {
  const subject = `No:${jobId}「${jobTitle}」の仕事の完了報告がありました`;
  // const adminSubject = `No:${jobId}「${jobTitle}」でが仕事完了報告をしました。`;

  const ownerTemplate = `No:${jobId}「${jobTitle}」の仕事の完了報告が${maintainerName}さんからありました。仕事の完了を確認後、発注者評価をしてください。評価後は${maintainerName}さんへ代金が支払われます。`;

  const maintainerTemplate = "完了としてマークされたジョブ";

  // const adminTemplate = `No:${jobId}「${jobTitle}」で${maintainerName}さんが仕事完了報告をしました。`;

  const text = "完了としてマークされたジョブ";
  sendEmail(ownerEmail, subject, text, ownerTemplate);
  sendEmail(maintainerEmail, subject, text, maintainerTemplate);
  // sendEmail(adminEmails, adminSubject, text, adminTemplate);
};

// @ts-ignore
export const sendJobMaintainerRatingCompleteEmail = (maintainerEmail: string, adminEmails: string[], jobId: number, jobTitle: string, maintainerName: string, ownerName: string
) => {
  const subject = `No:${jobId}「${jobTitle}」の発注者が評価しました`;
  // const adminSubject = `No:${jobId}「${jobTitle}」で発注者が評価しました`;

  const maintainerTemplate = `No:${jobId}「${jobTitle}」の発注者が評価しました。受注者評価をしてください。`;

  // const adminTemplate = `No:${jobId}「${jobTitle}」で${ownerName}さんが発注者による評価をしました。${maintainerName}さんへ支払いをして下さい。
  // 受注者（代金受取者）：${maintainerName}さん`;

  const text = "メンテナ評価完了";
  sendEmail(maintainerEmail, subject, text, maintainerTemplate);
  // sendEmail(adminEmails, adminSubject, text, adminTemplate);
};

// @ts-ignore
export const sendJobOwnerRatingCompleteEmail = (ownerEmail: string, maintainerEmail: string, adminEmails: string[],
  jobId: number,
  jobTitle: string
) => {
  const subject = `No:${jobId}「${jobTitle}」の受注者が評価しました`;
  // const adminSubject = `No${jobId}「${jobTitle}」で受注者が評価しました（全完了）`;

  const ownerTemplate = `No:${jobId}「${jobTitle}」の受注者が評価しました。仕事の全ステータスが完了しました。`;

  const maintainerTemplate = "雇用主の評価が完了しました";

  // const adminTemplate = `No${jobId}「${jobTitle}」で、受注者による評価がされ、仕事の全ステータスが完了しました。`;

  const text = "雇用主の評価が完了しました";
  sendEmail(ownerEmail, subject, text, ownerTemplate);
  sendEmail(maintainerEmail, subject, text, maintainerTemplate);
  // sendEmail(adminEmails, adminSubject, text, adminTemplate);
};

export const sendContactUsEmail = (
  name: string,
  email: string,
  classification: string,
  message: string
) => {

  console.log("name===",name)

  const subject = "【お問い合わせ】";
  const siteEmail = "info@ecopeer.net";
  const content = `${name} - ${email} - ${classification} \n ${message}`;
  const htmlContent = `<p>${name} - ${email} - ${classification}</p> <p> ${message} </p>`;

  sendEmail(siteEmail, subject, content, htmlContent,[email,"vishakatest1@gmail.com"]);
};
