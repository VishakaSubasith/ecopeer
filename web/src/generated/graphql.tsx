import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: any;
};

export enum AccountType {
  Free = 'Free',
  Paid = 'Paid'
}

export type Answer = {
  __typename?: 'Answer';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  question: Question;
  text: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
};

export type AppNotification = {
  __typename?: 'AppNotification';
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  isRead: Scalars['Boolean'];
  updatedAt: Scalars['String'];
  user: User;
};

export type Area = {
  __typename?: 'Area';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  regions: Array<Region>;
  updatedAt: Scalars['String'];
};

export type BasicStatistic = {
  __typename?: 'BasicStatistic';
  jobs: Scalars['Int'];
  powerplants: Scalars['Int'];
  users: Scalars['Int'];
};

export type Channel = {
  __typename?: 'Channel';
  channelsMembers: Array<ChannelsMembers>;
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  messages: Array<Message>;
  updatedAt: Scalars['String'];
};

export type ChannelExtraInfo = {
  __typename?: 'ChannelExtraInfo';
  channel: Channel;
  unReadCount: Scalars['Float'];
};

export type ChannelsMembers = {
  __typename?: 'ChannelsMembers';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  updatedAt: Scalars['String'];
  user: User;
};

export type ChannelsResponse = {
  __typename?: 'ChannelsResponse';
  channelsExtraInfo: Array<ChannelExtraInfo>;
};

export type City = {
  __typename?: 'City';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  name: Scalars['String'];
  region: Region;
  updatedAt: Scalars['String'];
};

export type CreateAnswerInput = {
  questionId: Scalars['Float'];
  text: Scalars['String'];
};

export type CreateMaintainerProfileInput = {
  userId:Scalars['Int'];
  maintainer: MaintainerInput;
  representative: RepresentativeInput;
};

export type CreateOwnerProfileInput = {
  userId:Scalars['Int']
  DOB: Scalars['DateTime'];
  address: Scalars['String'];
  companyName: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  lastName: Scalars['String'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  nickname: Scalars['String'];
  ownerType: OwnerType;
  phoneNumber: Scalars['String'];
};

export type CreateProfileInput = {
  DOB: Scalars['DateTime'];
  address: Scalars['String'];
  companyAddress: Scalars['String'];
  companyIntro: Scalars['String'];
  companyName: Scalars['String'];
  companyPhoneNumber: Scalars['String'];
  gender: Scalars['String'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  maintainer: Scalars['Boolean'];
  name: Scalars['String'];
  owner: Scalars['Boolean'];
  phoneNumber: Scalars['String'];
};

export type CreateQuestionInput = {
  text: Scalars['String'];
  title: Scalars['String'];
};

export type DisassociatePowerPlantInput = {
  powerPlantId: Scalars['Float'];
};

export type DisassociatePowerPlantResponse = {
  __typename?: 'DisassociatePowerPlantResponse';
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export type EmailPasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type FavoriteJobs = {
  __typename?: 'FavoriteJobs';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  job: Job;
  solarPowerPlantMaintainer: SolarPowerPlantMaintainer;
  updatedAt: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FileInfo = {
  __typename?: 'FileInfo';
  createdAt: Scalars['String'];
  encoding?: Maybe<Scalars['String']>;
  filename?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  mimetype?: Maybe<Scalars['String']>;
  storageLocation?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
};

export type IsFavoriteInput = {
  jobId: Scalars['Float'];
};

export type Job = {
  __typename?: 'Job';
  applicationDeadline: Scalars['DateTime'];
  approvedApplicant?: Maybe<SolarPowerPlantMaintainer>;
  budget: Scalars['Float'];
  category: Scalars['String'];
  createdAt: Scalars['String'];
  deletedAt: Scalars['String'];
  endDate: Scalars['DateTime'];
  id: Scalars['Int'];
  jobApplications?: Maybe<Array<JobApplications>>;
  jobFavorites: Array<FavoriteJobs>;
  jobFiles: Array<JobFileInfo>;
  location: Scalars['String'];
  longDescription: Scalars['String'];
  paymentTransactions: Array<PaymentTransaction>;
  shortDescription: Scalars['String'];
  solarPowerPlant: SolarPowerPlant;
  startDate: Scalars['DateTime'];
  status: JobStatus;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type JobApplications = {
  __typename?: 'JobApplications';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  job: Job;
  solarPowerPlantMaintainer: SolarPowerPlantMaintainer;
  suggestedPrice: Scalars['Float'];
  updatedAt: Scalars['String'];
};

export type JobApplicationsResponse = {
  __typename?: 'JobApplicationsResponse';
  jobApplications: Array<JobInfo>;
};

export type JobDeleteAdminInput = {
  jobId: Scalars['Float'];
};

export type JobFileInfo = {
  __typename?: 'JobFileInfo';
  createdAt: Scalars['String'];
  encoding?: Maybe<Scalars['String']>;
  filename: Scalars['String'];
  id: Scalars['Int'];
  job: Job;
  mimetype?: Maybe<Scalars['String']>;
  storageLocation: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type JobInfo = {
  __typename?: 'JobInfo';
  isFavorite: Scalars['Boolean'];
  jobApplication: JobApplications;
};

export type JobInput = {
  applicationDeadline: Scalars['DateTime'];
  budget: Scalars['Float'];
  category: Scalars['String'];
  endDate: Scalars['DateTime'];
  jobImage1?: InputMaybe<Scalars['Upload']>;
  jobImage2?: InputMaybe<Scalars['Upload']>;
  jobImage3?: InputMaybe<Scalars['Upload']>;
  jobImage4?: InputMaybe<Scalars['Upload']>;
  location: Scalars['String'];
  longDescription: Scalars['String'];
  shortDescription: Scalars['String'];
  solarPowerPlantId: Scalars['Float'];
  startDate: Scalars['DateTime'];
  status: Scalars['String'];
  suggestedPrice?: InputMaybe<Scalars['Float']>;
  title: Scalars['String'];
};

export enum JobStatus {
  Completed = 'Completed',
  ContractorEvaluation = 'ContractorEvaluation',
  Draft = 'Draft',
  Expired = 'Expired',
  Open = 'Open',
  OrdererEvaluation = 'OrdererEvaluation',
  Registered = 'Registered',
  TempPayment = 'TempPayment',
  WaitingForCompletion = 'WaitingForCompletion'
}

export type MaintainerInput = {
  address: Scalars['String'];
  intro: Scalars['String'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type MaintainerUpdateInput = {
  address: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  nickname: Scalars['String'];
  phoneNumber: Scalars['String'];
  intro:Scalars['String'];
  lat:Scalars['Float']
  lng:Scalars['Float']
  representative: RepresentativeInput;
};

export type MarkChannelAsReadInput = {
  channelId: Scalars['Float'];
};

export type MarkNotificationAsReadInput = {
  notificationId: Scalars['Float'];
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  isRead: Scalars['Boolean'];
  senderId: Scalars['Float'];
  updatedAt: Scalars['String'];
  uploadedFile?: Maybe<FileInfo>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addApplicant: Job;
  addJobToFavorite: Scalars['Boolean'];
  approveApplicant: PaymentTransaction;
  chatWithOwner: Channel;
  claimPowerPlant: Scalars['Boolean'];
  contactUs: Scalars['Boolean'];
  createAnswer: Question;
  createChannel: Channel;
  createJob: Job;
  createMaintainerProfile: Scalars['Boolean'];
  createOffParty: OffParty;
  createOwnerProfile: Scalars['Boolean'];
  createProfile: UserResponse;
  createQuestion: Question;
  createSeminar: Seminar;
  createSolarPowerPlant: SolarPowerPlant;
  createSolarPowerPlantMaintainer: Scalars['Boolean'];
  createSolarPowerPlantOwner: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  disassociatePowerPlant: DisassociatePowerPlantResponse;
  editJob: Job;
  forceDeleteUser: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  initializeTransaction: InitializeTransactionPayload;
  initializeUserTransaction: UserTransaction;
  jobCompleted: Job;
  jobDeleteAdmin: Scalars['Boolean'];
  jobMarkCompleted: Job;
  login: UserResponse;
  logout: Scalars['Boolean'];
  markAllNotificationsAsRead: Scalars['Boolean'];
  markChannelAsRead: Scalars['Boolean'];
  markNotificationAsRead: Scalars['Boolean'];
  openJob: Job;
  rateMaintainer: Rating;
  rateOwner: Rating;
  register: UserResponse;
  registerJob: Job;
  removeJobFromFavorite: Scalars['Boolean'];
  resetPassword: UserResponse;
  sendMessage: Message;
  startChatWithApprovedApplicant: Channel;
  updateApplicationDeadline: Scalars['Boolean'];
  updateMaintainerInfo: Scalars['Boolean'];
  updateOwnerInfo: Scalars['Boolean'];
  updatePowerplant: Scalars['Boolean'];
  updateSuggestedPrice: JobApplications;
  updateTransactionFailed: PaymentTransaction;
  updateTransactiontProcessing: PaymentTransaction;
  updateTransactiontSucessful: PaymentTransaction;
  updateUserPaymentStatus: UserTransaction;
  updateUserType: Scalars['Boolean'];
  uploadFile: Message;
  verifyEmail: UserResponse;
};


export type MutationAddApplicantArgs = {
  jobId: Scalars['Float'];
};


export type MutationAddJobToFavoriteArgs = {
  jobId: Scalars['Float'];
};


export type MutationApproveApplicantArgs = {
  jobId: Scalars['Float'];
  maintainerId: Scalars['Float'];
};


export type MutationChatWithOwnerArgs = {
  input: ChatWithOwnerInput;
};


export type MutationClaimPowerPlantArgs = {
  powerPlantId: Scalars['Float'];
};


export type MutationContactUsArgs = {
  input: ContactUsInput;
};


export type MutationCreateAnswerArgs = {
  input: CreateAnswerInput;
};


export type MutationCreateChannelArgs = {
  jobId: Scalars['Float'];
  otherUserId: Scalars['Float'];
};


export type MutationCreateJobArgs = {
  input: JobInput;
};


export type MutationCreateMaintainerProfileArgs = {
  input: CreateMaintainerProfileInput;
};


export type MutationCreateOffPartyArgs = {
  input: OffPartyInput;
};


export type MutationCreateOwnerProfileArgs = {
  input: CreateOwnerProfileInput;
};


export type MutationCreateProfileArgs = {
  input: CreateProfileInput;
};


export type MutationCreateQuestionArgs = {
  input: CreateQuestionInput;
};


export type MutationCreateSeminarArgs = {
  input: SeminarInput;
};


export type MutationCreateSolarPowerPlantArgs = {
  input: SolarPowerPlantInput;
};


export type MutationCreateSolarPowerPlantMaintainerArgs = {
  maintainer: MaintainerInput;
  representative: RepresentativeInput;
};


export type MutationCreateSolarPowerPlantOwnerArgs = {
  input: CreateOwnerProfileInput;
};


export type MutationDeleteUserArgs = {
  userId: Scalars['Float'];
};


export type MutationDisassociatePowerPlantArgs = {
  input: DisassociatePowerPlantInput;
};


export type MutationEditJobArgs = {
  input: JobInput;
  jobId: Scalars['Float'];
};


export type MutationForceDeleteUserArgs = {
  input: ForceDeleteUserInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationInitializeTransactionArgs = {
  input: InitializeTransactionInput;
};


export type MutationInitializeUserTransactionArgs = {
  paymentId: Scalars['String'];
};


export type MutationJobCompletedArgs = {
  jobId: Scalars['Float'];
};


export type MutationJobDeleteAdminArgs = {
  input: JobDeleteAdminInput;
};


export type MutationJobMarkCompletedArgs = {
  jobId: Scalars['Float'];
};


export type MutationLoginArgs = {
  input: EmailPasswordInput;
};


export type MutationMarkChannelAsReadArgs = {
  input: MarkChannelAsReadInput;
};


export type MutationMarkNotificationAsReadArgs = {
  input: MarkNotificationAsReadInput;
};


export type MutationOpenJobArgs = {
  jobId: Scalars['Float'];
};


export type MutationRateMaintainerArgs = {
  input: RateMaintainerInput;
};


export type MutationRateOwnerArgs = {
  input: RateOwnerInput;
};


export type MutationRegisterArgs = {
  input: RegistrationInput;
};


export type MutationRegisterJobArgs = {
  jobId: Scalars['Float'];
};


export type MutationRemoveJobFromFavoriteArgs = {
  jobId: Scalars['Float'];
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationSendMessageArgs = {
  channelId: Scalars['Float'];
  content: Scalars['String'];
};


export type MutationStartChatWithApprovedApplicantArgs = {
  input: StartChatWithApprovedApplicantInput;
};


export type MutationUpdateApplicationDeadlineArgs = {
  input: UpdateApplicationDeadlineInput;
};


export type MutationUpdateMaintainerInfoArgs = {
  input: MaintainerUpdateInput;
};


export type MutationUpdateOwnerInfoArgs = {
  input: OwnerUpdateInput;
};


export type MutationUpdatePowerplantArgs = {
  input: SolarPowerPlantUpdateInput;
};


export type MutationUpdateSuggestedPriceArgs = {
  jobId: Scalars['Float'];
  suggestedPrice: Scalars['Float'];
};


export type MutationUpdateTransactionFailedArgs = {
  input: TransactionUpdateInput;
};


export type MutationUpdateTransactiontProcessingArgs = {
  input: TransactionUpdateInput;
};


export type MutationUpdateTransactiontSucessfulArgs = {
  input: TransactionUpdateInput;
};


export type MutationUpdateUserPaymentStatusArgs = {
  paymentStatus: Scalars['String'];
  transactionId: Scalars['String'];
};


export type MutationUpdateUserTypeArgs = {
  userType: Scalars['String'];
};


export type MutationUploadFileArgs = {
  channelId: Scalars['Float'];
  input: Scalars['Upload'];
};


export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};

export type OffParty = {
  __typename?: 'OffParty';
  access: Scalars['String'];
  address: Scalars['String'];
  belongings: Scalars['String'];
  cacellationRules: Scalars['String'];
  clothing: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['String'];
  creator: User;
  dateAndTime: Scalars['DateTime'];
  form: Scalars['String'];
  id: Scalars['Int'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  precautions: Scalars['String'];
  price: Scalars['Float'];
  updatedAt: Scalars['String'];
  venue: Scalars['String'];
};

export type OffPartyInput = {
  access: Scalars['String'];
  address: Scalars['String'];
  belongings: Scalars['String'];
  cacellationRules: Scalars['String'];
  clothing: Scalars['String'];
  content: Scalars['String'];
  dateAndTime: Scalars['DateTime'];
  form: Scalars['String'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  precautions: Scalars['String'];
  price: Scalars['Float'];
  venue: Scalars['String'];
};

export enum OwnerType {
  Corporate = 'Corporate',
  Individual = 'Individual',
  ManagementCompany = 'ManagementCompany'
}

export type OwnerUpdateInput = {
  DOB: Scalars['DateTime'];
  address: Scalars['String'];
  companyName: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  lastName: Scalars['String'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  nickname: Scalars['String'];
  ownerType: OwnerType;
  phoneNumber: Scalars['String'];
};

export type SaveBankDetailsInput = {
  bankName: Scalars['String'];
  branchName: Scalars['String'];
  depositItem: Scalars['String'];
  accountNumber: Scalars['Int'];
  accountHolderKanji: Scalars['String'];
  accountHolderHiragana: Scalars['String'];
  userId: Scalars['Int'];
  bankType: Scalars['String']

};

export type SaveExchangeInformationInput = {
  blogUrl: Scalars['String'];
  twitter: Scalars['String'];
  comment: Scalars['String'];
  interested: Scalars['Int'];
  trouble: Scalars['String'];
  userId: Scalars['Int'];

};
export type UpdateExchangeInformationInput = {
  blogUrl: Scalars['String'];
  twitter: Scalars['String'];
  comment: Scalars['String'];
  interested: Scalars['Int'];
  trouble: Scalars['String'];
  userId: Scalars['Int'];

};
export type UpdateBankDetailsInput = {
  bankName: Scalars['String'];
  branchName: Scalars['String'];
  depositItem: Scalars['String'];
  accountNumber: Scalars['Int'];
  accountHolderKanji: Scalars['String'];
  accountHolderHiragana: Scalars['String'];
  userId: Scalars['Int'];
  bankType: Scalars['String']

};

export type PaginationOptions = {
  cursor?: InputMaybe<UserCursor>;
  limit: Scalars['Float'];
};

export enum PaymentStatus {
  Failed = 'Failed',
  Pending = 'Pending',
  Proccessing = 'Proccessing',
  Successful = 'Successful'
}

export type PaymentTransaction = {
  __typename?: 'PaymentTransaction';
  amount: Scalars['Float'];
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  job: Job;
  status: PaymentStatus;
  transactionId: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  allJobs: Array<Job>;
  approvedJobs: Array<Job>;
  areas: Array<Area>;
  channels: ChannelsResponse;
  currentUserDetails?: Maybe<User>;
  favoriteJobs: Array<FavoriteJobs>;
  getOffParties: Array<OffParty>;
  getSeminars: Array<Seminar>;
  getSubscriptions: Array<UserTransaction>;
  isMaintainerFavoriteJob: Scalars['Boolean'];
  job: Job;
  jobApplications: JobApplicationsResponse;
  jobs: Array<Job>;
  mapOpenJobs: Array<Job>;
  me?: Maybe<User>;
  messageUsers: Array<User>;
  messages: Array<Message>;
  openJobs: Array<Job>;
  ownerJobs: Array<Job>;
  ownerSolarPowerPlants: SolarPowerPlantOwner;
  paymentTransaction: PaymentTransaction;
  paymentTransactions: Array<PaymentTransaction>;
  question: Question;
  questions: Array<Question>;
  ratings: Array<Rating>;
  region: Region;
  regions: Array<Region>;
  searchSolarPowerPlantsByOfficialId: Array<SolarPowerPlant>;
  showApplicants: Job;
  solarPowerPlantMaintainers: Array<SolarPowerPlantMaintainer>;
  solarPowerPlants: Array<SolarPowerPlant>;
  statistics: StatisticsResponse;
  userDetails?: Maybe<User>;
  userNotifications: Array<AppNotification>;
  userRatings: Array<Rating>;
  users: Array<User>;
};


export type QueryIsMaintainerFavoriteJobArgs = {
  input: IsFavoriteInput;
};


export type QueryJobArgs = {
  jobId: Scalars['Float'];
};


export type QueryMessagesArgs = {
  channelId: Scalars['Float'];
};


export type QueryPaymentTransactionArgs = {
  paymentTransactionId: Scalars['String'];
};


export type QueryQuestionArgs = {
  input: QuestionInput;
};


export type QueryRegionArgs = {
  id: Scalars['Float'];
};


export type QuerySearchSolarPowerPlantsByOfficialIdArgs = {
  limit: Scalars['Float'];
  officialId: Scalars['String'];
};


export type QueryShowApplicantsArgs = {
  jobId: Scalars['Float'];
};


export type QueryUserDetailsArgs = {
  userId: Scalars['Float'];
};


export type QueryUserRatingsArgs = {
  input: UserRatingInput;
};


export type QueryUsersArgs = {
  input: UsersFilterInput;
};

export type Question = {
  __typename?: 'Question';
  answers: Array<Answer>;
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  text: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
};

export type QuestionInput = {
  questionId: Scalars['Float'];
};

export type RateMaintainerInput = {
  comment: Scalars['String'];
  jobId: Scalars['Float'];
  rating: Scalars['Float'];
};

export type RateOwnerInput = {
  comment: Scalars['String'];
  jobId: Scalars['Float'];
  rating: Scalars['Float'];
};

export type Rating = {
  __typename?: 'Rating';
  comment: Scalars['String'];
  createdAt: Scalars['String'];
  evaluatee: User;
  evaluator: User;
  id: Scalars['Int'];
  rating: Scalars['Float'];
  updatedAt: Scalars['String'];
};

export type Region = {
  __typename?: 'Region';
  area: Area;
  cities: Array<City>;
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  solarPowerPlants: Array<SolarPowerPlant>;
  updatedAt: Scalars['String'];
};

export type RegistrationInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Representative = {
  __typename?: 'Representative';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  nickname?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
  address:Scalars['String']
};

export type RepresentativeInput = {
  DOB: Scalars['DateTime'];
  address: Scalars['String'];
  companyName: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  lastName: Scalars['String'];
  nickname: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type ResetPasswordInput = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};
export type ChangePassword = {
  newPassword: Scalars['String'];
  userId: Scalars['Int'];
};

export type Seminar = {
  __typename?: 'Seminar';
  access: Scalars['String'];
  address: Scalars['String'];
  belongings: Scalars['String'];
  cacellationRules: Scalars['String'];
  clothing: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['String'];
  creator: User;
  dateAndTime: Scalars['DateTime'];
  form: Scalars['String'];
  id: Scalars['Int'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  precautions: Scalars['String'];
  price: Scalars['Float'];
  updatedAt: Scalars['String'];
  venue: Scalars['String'];
};

export type SeminarInput = {
  access: Scalars['String'];
  address: Scalars['String'];
  belongings: Scalars['String'];
  cacellationRules: Scalars['String'];
  clothing: Scalars['String'];
  content: Scalars['String'];
  dateAndTime: Scalars['DateTime'];
  form: Scalars['String'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  precautions: Scalars['String'];
  price: Scalars['Float'];
  venue: Scalars['String'];
};

export type SolarPowerPlant = {
  __typename?: 'SolarPowerPlant';
  city?: Maybe<City>;
  classification?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  jobs: Array<Job>;
  lat?: Maybe<Scalars['Float']>;
  linked?: Maybe<Scalars['Boolean']>;
  lng?: Maybe<Scalars['Float']>;
  location?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  officialId?: Maybe<Scalars['String']>;
  officialSolarPowerPlantOwner?: Maybe<SolarPowerPlantOwner>;
  region: Region;
  solarPowerPlantOwner?: Maybe<SolarPowerPlantOwner>;
  totalPowerOutput?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['String'];
};

export type SolarPowerPlantInput = {
  cityId: Scalars['Float'];
  classification: Scalars['String'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  location: Scalars['String'];
  name: Scalars['String'];
  officialId?: InputMaybe<Scalars['String']>;
  regionId: Scalars['Float'];
  totalPowerOutput: Scalars['Float'];
};

export type SolarPowerPlantMaintainer = {
  __typename?: 'SolarPowerPlantMaintainer';
  address?: Maybe<Scalars['String']>;
  approvedJobs: Array<Job>;
  createdAt: Scalars['String'];
  favoriteJobs: Array<FavoriteJobs>;
  id: Scalars['Int'];
  intro?: Maybe<Scalars['String']>;
  jobApplications: Array<JobApplications>;
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  name: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  representative: Representative;
  updatedAt: Scalars['String'];
  user: User;
};

export type SolarPowerPlantOwner = {
  __typename?: 'SolarPowerPlantOwner';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  nickname?: Maybe<Scalars['String']>;
  ownerType: OwnerType;
  firstName?:Maybe<Scalars['String']>;
  lastName?:Maybe<Scalars['String']>;
  companyName?:Maybe<Scalars['String']>;
  gender?:Maybe<Scalars['String']>;
  DOB?:Maybe<Scalars['DateTime']>;
  phoneNumber?:Maybe<Scalars['String']>;
  address?:Maybe<Scalars['String']>;
  solarPowerPlants: Array<SolarPowerPlant>;
  updatedAt: Scalars['String'];

  user?: Maybe<User>;
};

export type BankDetails = {
  __typename?: 'BankDetails';
  accountHolderHiragana: Maybe<Scalars['String']>;
  accountHolderKanji: Maybe<Scalars['String']>;
  accountNumber?: Maybe<Scalars['Int']>;
  bankName?: Maybe<Scalars['String']>;
  branchName: Maybe<Scalars['String']>;
  depositItem?:Maybe<Scalars['String']>;
  id?:Maybe<Scalars['Int']>;
  userId?:Maybe<Scalars['Int']>;
  bankType?: Maybe<Scalars['String']>

};

export type ExchangeInformation = {
  __typename?: 'ExchangeInformation';
  blogUrl: Maybe<Scalars['String']>;
  twitter: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
  interested: Maybe<Scalars['String']>;
  trouble?:Maybe<Scalars['String']>;
  id?:Maybe<Scalars['Int']>;
  userId?:Maybe<Scalars['Int']>;

};

export type SolarPowerPlantUpdateInput = {
  lat?: InputMaybe<Scalars['Float']>;
  lng?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  solarPowerPlantId: Scalars['Float'];
};

export type StartChatWithApprovedApplicantInput = {
  jobId: Scalars['Float'];
};

export type StatisticsResponse = {
  __typename?: 'StatisticsResponse';
  statistics: BasicStatistic;
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Message;
  newNotification: AppNotification;
};


export type SubscriptionNewMessageArgs = {
  channelId: Scalars['Float'];
};


export type SubscriptionNewNotificationArgs = {
  userId: Scalars['Float'];
};

export type TransactionUpdateInput = {
  transactionId: Scalars['String'];
};

export type UpdateApplicationDeadlineInput = {
  applicationDeadline: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  jobId: Scalars['Float'];
  startDate: Scalars['DateTime'];
};

export type User = {
  __typename?: 'User';
  accountType: AccountType;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  paymentTransactions: Array<PaymentTransaction>;
  solarPowerPlantMaintainer?: Maybe<SolarPowerPlantMaintainer>;
  solarPowerPlantOwner?: Maybe<SolarPowerPlantOwner>;
  updatedAt: Scalars['String'];
  userTransactions: Array<UserTransaction>;
  userType: UserType;
};

export type UserCursor = {
  createdAt: Scalars['String'];
};

export type UserRatingInput = {
  userId: Scalars['Float'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UserTransaction = {
  __typename?: 'UserTransaction';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  price: Scalars['Float'];
  status: PaymentStatus;
  transactionId: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
};

export enum UserType {
  Admin = 'Admin',
  Maintainer = 'Maintainer',
  Owner = 'Owner',
  OwnerMaintainer = 'OwnerMaintainer',
  PendingProfile = 'PendingProfile',
  Unregistered = 'Unregistered',
  Unverified = 'Unverified'
}

export type UsersFilterInput = {
  pagination: PaginationOptions;
};

export type VerifyEmailInput = {
  token: Scalars['String'];
};

export type ChatWithOwnerInput = {
  jobId: Scalars['Float'];
};

export type ContactUsInput = {
  classification: Scalars['String'];
  email: Scalars['String'];
  message: Scalars['String'];
  name: Scalars['String'];
};

export type ForceDeleteUserInput = {
  userId: Scalars['Float'];
};
export type CheckUserDeleteInput = {
  userId: Scalars['Float'];
};

export type InitializeTransactionInput = {
  jobId: Scalars['Float'];
};

export type InitializeTransactionPayload = {
  __typename?: 'initializeTransactionPayload';
  transaction: PaymentTransaction;
};

export type RegularUserFragment = { __typename?: 'User', id: number, email: string };

export type CreateMaintainerProfileMutationVariables = Exact<{
  input: CreateMaintainerProfileInput;
}>;


export type CreateMaintainerProfileMutation = { __typename?: 'Mutation', createMaintainerProfile: boolean };

export type CreateOwnerProfileMutationVariables = Exact<{
  input: CreateOwnerProfileInput;
}>;


export type CreateOwnerProfileMutation = { __typename?: 'Mutation', createOwnerProfile: boolean };

export type CreateProfileMutationVariables = Exact<{
  input: CreateProfileInput;
}>;


export type CreateProfileMutation = { __typename?: 'Mutation', createProfile: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', userType: UserType, id: number, email: string } | null } };

export type ForceDeleteUserMutationVariables = Exact<{
  input: ForceDeleteUserInput;
}>;


export type ForceDeleteUserMutation = { __typename?: 'Mutation', forceDeleteUser: boolean };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', userType: UserType, id: number, email: string , hasverified: boolean } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  input: RegistrationInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', userType: UserType, id: number, email: string } | null } };

export type VerifyEmailMutationVariables = Exact<{
  input: VerifyEmailInput;
}>;


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', userType: UserType, id: number, email: string } | null } };

export type JobDeleteAdminMutationVariables = Exact<{
  input: JobDeleteAdminInput;
}>;


export type JobDeleteAdminMutation = { __typename?: 'Mutation', jobDeleteAdmin: boolean };

export type ChatWithOwnerMutationVariables = Exact<{
  input: ChatWithOwnerInput;
}>;


export type ChatWithOwnerMutation = { __typename?: 'Mutation', chatWithOwner: { __typename?: 'Channel', id: number } };

export type CreateChannelMutationVariables = Exact<{
  otherUserId: Scalars['Float'];
  jobId: Scalars['Float'];
}>;


export type CreateChannelMutation = { __typename?: 'Mutation', createChannel: { __typename?: 'Channel', id: number } };

export type MarkChannelAsReadMutationVariables = Exact<{
  input: MarkChannelAsReadInput;
}>;


export type MarkChannelAsReadMutation = { __typename?: 'Mutation', markChannelAsRead: boolean };

export type SendMessageMutationVariables = Exact<{
  content: Scalars['String'];
  channelId: Scalars['Float'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'Message', id: number, content: string, senderId: number } };

export type StartChatWithApprovedApplicantMutationVariables = Exact<{
  input: StartChatWithApprovedApplicantInput;
}>;


export type StartChatWithApprovedApplicantMutation = { __typename?: 'Mutation', startChatWithApprovedApplicant: { __typename?: 'Channel', id: number } };

export type UploadFileMutationVariables = Exact<{
  channelId: Scalars['Float'];
  uploadFileInput: Scalars['Upload'];
}>;


export type UploadFileMutation = { __typename?: 'Mutation', uploadFile: { __typename?: 'Message', id: number, content: string, senderId: number, createdAt: string, uploadedFile?: { __typename?: 'FileInfo', id: number, filename?: string | null, storageLocation?: string | null } | null } };

export type AddJobToFavoriteMutationVariables = Exact<{
  jobId: Scalars['Float'];
}>;


export type AddJobToFavoriteMutation = { __typename?: 'Mutation', addJobToFavorite: boolean };

export type RemoveJobFromFavoriteMutationVariables = Exact<{
  jobId: Scalars['Float'];
}>;


export type RemoveJobFromFavoriteMutation = { __typename?: 'Mutation', removeJobFromFavorite: boolean };

export type UpdateApplicationDeadlineMutationVariables = Exact<{
  input: UpdateApplicationDeadlineInput;
}>;


export type UpdateApplicationDeadlineMutation = { __typename?: 'Mutation', updateApplicationDeadline: boolean };

export type MarkAllNotificationsAsReadMutationVariables = Exact<{ [key: string]: never; }>;


export type MarkAllNotificationsAsReadMutation = { __typename?: 'Mutation', markAllNotificationsAsRead: boolean };

export type MarkNotificationAsReadMutationVariables = Exact<{
  input: MarkNotificationAsReadInput;
}>;


export type MarkNotificationAsReadMutation = { __typename?: 'Mutation', markNotificationAsRead: boolean };

export type CreateOffPartyMutationVariables = Exact<{
  input: OffPartyInput;
}>;


export type CreateOffPartyMutation = { __typename?: 'Mutation', createOffParty: { __typename?: 'OffParty', id: number } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePassword;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', userType: UserType, id: number, email: string } | null } };

export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', userType: UserType, id: number, email: string } | null } };

export type InitializeTransactionMutationMutationVariables = Exact<{
  input: InitializeTransactionInput;
}>;


export type InitializeTransactionMutationMutation = { __typename?: 'Mutation', initializeTransaction: { __typename?: 'initializeTransactionPayload', transaction: { __typename?: 'PaymentTransaction', id: number, transactionId: string, amount: number, status: PaymentStatus } } };

export type UpdateTransactionFailedMutationMutationVariables = Exact<{
  input: TransactionUpdateInput;
}>;


export type UpdateTransactionFailedMutationMutation = { __typename?: 'Mutation', updateTransactionFailed: { __typename?: 'PaymentTransaction', id: number, transactionId: string, status: PaymentStatus } };

export type UpdateTransactiontProcessingMutationMutationVariables = Exact<{
  input: TransactionUpdateInput;
}>;


export type UpdateTransactiontProcessingMutationMutation = { __typename?: 'Mutation', updateTransactiontProcessing: { __typename?: 'PaymentTransaction', id: number, transactionId: string, status: PaymentStatus } };

export type UpdateTransactiontSucessfulMutationMutationVariables = Exact<{
  input: TransactionUpdateInput;
}>;


export type UpdateTransactiontSucessfulMutationMutation = { __typename?: 'Mutation', updateTransactiontSucessful: { __typename?: 'PaymentTransaction', id: number, transactionId: string, status: PaymentStatus } };

export type CreateSolarPowerPlantMutationVariables = Exact<{
  input: SolarPowerPlantInput;
}>;


export type CreateSolarPowerPlantMutation = { __typename?: 'Mutation', createSolarPowerPlant: { __typename?: 'SolarPowerPlant', id: number } };

export type DisassociatePowerPlantMutationVariables = Exact<{
  input: DisassociatePowerPlantInput;
}>;


export type DisassociatePowerPlantMutation = { __typename?: 'Mutation', disassociatePowerPlant: { __typename?: 'DisassociatePowerPlantResponse', status: boolean, message: string } };

export type CreateAnswerMutationVariables = Exact<{
  input: CreateAnswerInput;
}>;


export type CreateAnswerMutation = { __typename?: 'Mutation', createAnswer: { __typename?: 'Question', id: number } };

export type CreateQuestionMutationVariables = Exact<{
  input: CreateQuestionInput;
}>;


export type CreateQuestionMutation = { __typename?: 'Mutation', createQuestion: { __typename?: 'Question', id: number } };

export type RateMaintainerMutationVariables = Exact<{
  input: RateMaintainerInput;
}>;


export type RateMaintainerMutation = { __typename?: 'Mutation', rateMaintainer: { __typename?: 'Rating', id: number } };

export type RateOwnerMutationVariables = Exact<{
  input: RateOwnerInput;
}>;


export type RateOwnerMutation = { __typename?: 'Mutation', rateOwner: { __typename?: 'Rating', id: number } };

export type CreateSeminarMutationVariables = Exact<{
  input: SeminarInput;
}>;


export type CreateSeminarMutation = { __typename?: 'Mutation', createSeminar: { __typename?: 'Seminar', id: number } };

export type ContactUsMutationVariables = Exact<{
  input: ContactUsInput;
}>;


export type ContactUsMutation = { __typename?: 'Mutation', contactUs: boolean };

export type UpdateMaintainerInfoMutationVariables = Exact<{
  input: MaintainerUpdateInput;
}>;


export type UpdateMaintainerInfoMutation = { __typename?: 'Mutation', updateMaintainerInfo: boolean };

export type UpdateOwnerInfoMutationVariables = Exact<{
  input: OwnerUpdateInput;
}>;

export type SaveBankDetailsMutationVariables = Exact<{
  input: SaveBankDetailsInput;
}>;
export type SaveExchangeInformationMutationMutationVariables = Exact<{
  input: SaveExchangeInformationInput;
}>;
export type UpdateBankDetailsMutationVariables = Exact<{
  input: UpdateBankDetailsInput;
}>;
export type UpdateExchangeInformationMutationVariables = Exact<{
  input: UpdateExchangeInformationInput;
}>;


export type UpdateOwnerInfoMutation = { __typename?: 'Mutation', updateOwnerInfo: boolean };

export type SaveBankDetailsMutation = { __typename?: 'Mutation', saveBankDetails: { __typename?: 'BankDetailsResponse', errors?: Array<{ __typename?: 'ErrorField', field: string, message: string }> | null, bankDetails?: { __typename?: 'BankDetails', userId:number } | null } };
export type SaveExchangeInformationMutation = { __typename?: 'Mutation', saveExchangeInformation: { __typename?: 'ExchangeInformationResponse', errors?: Array<{ __typename?: 'ErrorField', field: string, message: string }> | null, exchangeInformation?: { __typename?: 'ExchangeInformation', userId:number } | null } };
export type UpdateBankDetailsMutation = { __typename?: 'Mutation', updateBankDetails: boolean };
export type UpdateExchangeInformationMutation = { __typename?: 'Mutation', updateExchangeInformation: boolean };

export type AddApplicantMutationVariables = Exact<{
  jobId: Scalars['Float'];
}>;


export type AddApplicantMutation = { __typename?: 'Mutation', addApplicant: { __typename?: 'Job', id: number } };

export type ApproveApplicantMutationVariables = Exact<{
  maintainerId: Scalars['Float'];
  jobId: Scalars['Float'];
}>;


export type ApproveApplicantMutation = { __typename?: 'Mutation', approveApplicant: { __typename?: 'PaymentTransaction', id: number, transactionId: string } };

export type UpdatePowerplantMutationVariables = Exact<{
  solarPowerPlantId: Scalars['Float'];
  lat?: InputMaybe<Scalars['Float']>;
  lng?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
}>;


export type UpdatePowerplantMutation = { __typename?: 'Mutation', updatePowerplant: boolean };

export type ClaimPowerPlantMutationVariables = Exact<{
  powerPlantId: Scalars['Float'];
}>;


export type ClaimPowerPlantMutation = { __typename?: 'Mutation', claimPowerPlant: boolean };

export type CreateJobMutationVariables = Exact<{
  input: JobInput;
}>;


export type CreateJobMutation = { __typename?: 'Mutation', createJob: { __typename?: 'Job', id: number } };

export type CreateSolarPowerPlantMaintainerMutationVariables = Exact<{
  representativeFirstName: Scalars['String'];
  representativeLastName: Scalars['String'];
  representativeNickName: Scalars['String'];
  representativeGender: Scalars['String'];
  representativeDOB: Scalars['DateTime'];
  representativePhoneNumber: Scalars['String'];
  representativeAddress: Scalars['String'];
  maintainerName: Scalars['String'];
  maintainerIntro: Scalars['String'];
  maintainerPhoneNumber: Scalars['String'];
  maintainerAddress: Scalars['String'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
}>;


export type CreateSolarPowerPlantMaintainerMutation = { __typename?: 'Mutation', createSolarPowerPlantMaintainer: boolean };

export type DeleteUserMutationVariables = Exact<{
  userId: Scalars['Float'];
}>;
export type CheckUserDeleteMutationVariables = Exact<{
  input :CheckUserDeleteInput;
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };
export type CheckUserDeleteMutation = { __typename?: 'Mutation', checkUserCanDelete: boolean };

export type EditJobMutationVariables = Exact<{
  jobId: Scalars['Float'];
  title: Scalars['String'];
  category: Scalars['String'];
  shortDescription: Scalars['String'];
  longDescription: Scalars['String'];
  location: Scalars['String'];
  applicationDeadline: Scalars['DateTime'];
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  budget: Scalars['Float'];
  status: Scalars['String'];
  solarPowerPlantId: Scalars['Float'];
}>;


export type EditJobMutation = { __typename?: 'Mutation', editJob: { __typename?: 'Job', id: number } };

export type InitializeUserTransactionMutationVariables = Exact<{
  paymentId: Scalars['String'];
}>;


export type InitializeUserTransactionMutation = { __typename?: 'Mutation', initializeUserTransaction: { __typename?: 'UserTransaction', id: number, transactionId: string, price: number, status: PaymentStatus, user: { __typename?: 'User', id: number, email: string } } };

export type JobMarkCompletedMutationVariables = Exact<{
  jobId: Scalars['Float'];
}>;


export type JobMarkCompletedMutation = { __typename?: 'Mutation', jobMarkCompleted: { __typename?: 'Job', id: number } };

export type OpenJobMutationVariables = Exact<{
  jobId: Scalars['Float'];
}>;


export type OpenJobMutation = { __typename?: 'Mutation', openJob: { __typename?: 'Job', id: number } };

export type RegisterJobMutationVariables = Exact<{
  jobId: Scalars['Float'];
}>;


export type RegisterJobMutation = { __typename?: 'Mutation', registerJob: { __typename?: 'Job', id: number } };

export type UpdateSuggestedPriceMutationVariables = Exact<{
  jobId: Scalars['Float'];
  suggestedPrice: Scalars['Float'];
}>;


export type UpdateSuggestedPriceMutation = { __typename?: 'Mutation', updateSuggestedPrice: { __typename?: 'JobApplications', id: number } };

export type UpdateUserPaymentStatusMutationVariables = Exact<{
  transactionId: Scalars['String'];
  paymentStatus: Scalars['String'];
}>;


export type UpdateUserPaymentStatusMutation = { __typename?: 'Mutation', updateUserPaymentStatus: { __typename?: 'UserTransaction', id: number, transactionId: string, price: number, status: PaymentStatus, user: { __typename?: 'User', id: number, email: string, accountType: AccountType } } };

export type UpdateUserTypeMutationVariables = Exact<{
  userType: Scalars['String'];
}>;


export type UpdateUserTypeMutation = { __typename?: 'Mutation', updateUserType: boolean };

export type AllJobsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllJobsQuery = { __typename?: 'Query', allJobs: Array<{ __typename?: 'Job', id: number, title: string, category: string, shortDescription: string, longDescription: string, location: string, applicationDeadline: any, startDate: any, endDate: any, budget: number, status: JobStatus, deletedAt: string, solarPowerPlant: { __typename?: 'SolarPowerPlant', id: number, officialId?: string | null, location?: string | null, totalPowerOutput?: number | null, classification?: string | null, lat?: number | null, lng?: number | null, solarPowerPlantOwner?: { __typename?: 'SolarPowerPlantOwner', id: number, nickname?: string | null, user?: { __typename?: 'User', id: number, email: string } | null } | null }, approvedApplicant?: { __typename?: 'SolarPowerPlantMaintainer', id: number, name: string, user: { __typename?: 'User', id: number, email: string } } | null }> };

export type ChannelsQueryVariables = Exact<{ [key: string]: never; }>;


export type ChannelsQuery = { __typename?: 'Query', channels: { __typename?: 'ChannelsResponse', channelsExtraInfo: Array<{ __typename?: 'ChannelExtraInfo', unReadCount: number, channel: { __typename?: 'Channel', id: number, deleted : boolean, channelsMembers: Array<{ __typename?: 'ChannelsMembers', id: number, user: { __typename?: 'User', id: number, email: string, userType: UserType, solarPowerPlantOwner?: { __typename?: 'SolarPowerPlantOwner', id: number, nickname?: string | null } | null, solarPowerPlantMaintainer?: { __typename?: 'SolarPowerPlantMaintainer', id: number, name: string } | null } }> } }> } };

export type MessagesQueryVariables = Exact<{
  channelId: Scalars['Float'];
}>;


export type MessagesQuery = { __typename?: 'Query', messages: Array<{ __typename?: 'Message', id: number, content: string, senderId: number, isRead: boolean, createdAt: string, uploadedFile?: { __typename?: 'FileInfo', id: number, filename?: string | null, storageLocation?: string | null } | null }> };

export type UnReadChannelsQueryVariables = Exact<{ [key: string]: never; }>;


export type UnReadChannelsQuery = { __typename?: 'Query', channels: { __typename?: 'ChannelsResponse', channelsExtraInfo: Array<{ __typename?: 'ChannelExtraInfo', unReadCount: number }> } };

export type FavoriteJobsQueryVariables = Exact<{ [key: string]: never; }>;


export type FavoriteJobsQuery = { __typename?: 'Query', favoriteJobs: Array<{ __typename?: 'FavoriteJobs', id: number, job: { __typename?: 'Job', id: number, title: string, category: string, location: string, applicationDeadline: any, budget: number, status: JobStatus } }> };

export type UserNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserNotificationsQuery = { __typename?: 'Query', userNotifications: Array<{ __typename?: 'AppNotification', id: number, content: string, isRead: boolean }> };

export type GetOffPartyLocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOffPartyLocationsQuery = { __typename?: 'Query', getOffParties: Array<{ __typename?: 'OffParty', id: number, address: string, lat: number, lng: number }> };

export type QuestionQueryVariables = Exact<{
  input: QuestionInput;
}>;


export type QuestionQuery = { __typename?: 'Query', question: { __typename?: 'Question', id: number, title: string, text: string, createdAt: string, user: { __typename?: 'User', id: number, email: string }, answers: Array<{ __typename?: 'Answer', id: number, text: string, user: { __typename?: 'User', id: number, email: string } }> } };

export type QuestionsQueryVariables = Exact<{ [key: string]: never; }>;


export type QuestionsQuery = { __typename?: 'Query', questions: Array<{ __typename?: 'Question', id: number, title: string, text: string, createdAt: string, user: { __typename?: 'User', id: number, email: string } }> };

export type UserRatingsQueryVariables = Exact<{
  input: UserRatingInput;
}>;


export type UserRatingsQuery = { __typename?: 'Query', userRatings: Array<{ __typename?: 'Rating', id: number, rating: number, comment: string, evaluator: { __typename?: 'User', id: number, solarPowerPlantOwner?: { __typename?: 'SolarPowerPlantOwner', id: number, nickname?: string | null } | null, solarPowerPlantMaintainer?: { __typename?: 'SolarPowerPlantMaintainer', id: number, name: string } | null } }> };

export type FormRegionsQueryVariables = Exact<{ [key: string]: never; }>;


export type FormRegionsQuery = { __typename?: 'Query', regions: Array<{ __typename?: 'Region', id: number, name: string, cities: Array<{ __typename?: 'City', id: number, name: string }> }> };

export type GetSeminarLocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSeminarLocationsQuery = { __typename?: 'Query', getSeminars: Array<{ __typename?: 'Seminar', id: number, address: string, lat: number, lng: number }> };

export type ApprovedJobsQueryVariables = Exact<{ [key: string]: never; }>;


export type ApprovedJobsQuery = { __typename?: 'Query', approvedJobs: Array<{ __typename?: 'Job', id: number, title: string, category: string, shortDescription: string, longDescription: string, location: string, applicationDeadline: any, startDate: any, endDate: any, budget: number, status: JobStatus }> };

export type AreasQueryVariables = Exact<{ [key: string]: never; }>;


export type AreasQuery = { __typename?: 'Query', areas: Array<{ __typename?: 'Area', id: number, name: string, regions: Array<{ __typename?: 'Region', id: number, name: string }> }> };

export type GetSubscriptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSubscriptionsQuery = { __typename?: 'Query', getSubscriptions: Array<{ __typename?: 'UserTransaction', id: number, transactionId: string, price: number, status: PaymentStatus, createdAt: string }> };

export type JobQueryVariables = Exact<{
  jobId: Scalars['Float'];
}>;


export type JobQuery = { __typename?: 'Query', job: { __typename?: 'Job', id: number, title: string, category: string, shortDescription: string, longDescription: string, location: string, applicationDeadline: any, startDate: any, endDate: any, budget: number, status: JobStatus, jobFiles: Array<{ __typename?: 'JobFileInfo', id: number, filename: string, storageLocation: string }>, solarPowerPlant: { __typename?: 'SolarPowerPlant', id: number, officialId?: string | null, solarPowerPlantOwner?: { __typename?: 'SolarPowerPlantOwner', id: number, nickname?: string | null, user?: { __typename?: 'User', id: number } | null } | null } } };

export type IsMaintainerFavoriteJobQueryVariables = Exact<{
  input: IsFavoriteInput;
}>;


export type IsMaintainerFavoriteJobQuery = { __typename?: 'Query', isMaintainerFavoriteJob: boolean };

export type MapOpenJobsQueryVariables = Exact<{ [key: string]: never; }>;


export type MapOpenJobsQuery = { __typename?: 'Query', mapOpenJobs: Array<{ __typename?: 'Job', id: number, title: string, category: string, shortDescription: string, longDescription: string, location: string, applicationDeadline: any, startDate: any, endDate: any, budget: number, status: JobStatus, solarPowerPlant: { __typename?: 'SolarPowerPlant', id: number, officialId?: string | null, location?: string | null, totalPowerOutput?: number | null, classification?: string | null, lat?: number | null, lng?: number | null } }> };

export type JobApplicationsQueryVariables = Exact<{ [key: string]: never; }>;


export type JobApplicationsQuery = { __typename?: 'Query', jobApplications: { __typename?: 'JobApplicationsResponse', jobApplications: Array<{ __typename?: 'JobInfo', isFavorite: boolean, jobApplication: { __typename?: 'JobApplications', id: number, suggestedPrice: number, job: { __typename?: 'Job', id: number, title: string, category: string, shortDescription: string, longDescription: string, location: string, applicationDeadline: any, startDate: any, endDate: any, budget: number, status: JobStatus } } }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', userType: UserType, id: number, email: string } | null };

export type MessageUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type MessageUsersQuery = { __typename?: 'Query', messageUsers: Array<{ __typename?: 'User', id: number, email: string, userType: UserType, solarPowerPlantOwner?: { __typename?: 'SolarPowerPlantOwner', id: number, nickname?: string | null } | null, solarPowerPlantMaintainer?: { __typename?: 'SolarPowerPlantMaintainer', id: number, name: string } | null }> };

export type NewUsersQueryVariables = Exact<{
  input: UsersFilterInput;
}>;


export type NewUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, email: string, userType: UserType, accountType: AccountType, createdAt: string, solarPowerPlantOwner?: { __typename?: 'SolarPowerPlantOwner', id: number, nickname?: string | null } | null, solarPowerPlantMaintainer?: { __typename?: 'SolarPowerPlantMaintainer', id: number, name: string } | null }> };

export type OpenJobsQueryVariables = Exact<{ [key: string]: never; }>;


export type OpenJobsQuery = { __typename?: 'Query', openJobs: Array<{ __typename?: 'Job', id: number, title: string, shortDescription: string, category: string, location: string, startDate: any, applicationDeadline: any, budget: number, status: JobStatus, solarPowerPlant: { __typename?: 'SolarPowerPlant', id: number, officialId?: string | null, region: { __typename?: 'Region', id: number }, solarPowerPlantOwner?: { __typename?: 'SolarPowerPlantOwner', user?: { __typename?: 'User', id: number } | null } | null }, jobApplications?: Array<{ __typename?: 'JobApplications', id: number, suggestedPrice: number, solarPowerPlantMaintainer: { __typename?: 'SolarPowerPlantMaintainer', id: number, user: { __typename?: 'User', id: number } } }> | null }> };

export type OwnerJobsQueryVariables = Exact<{ [key: string]: never; }>;


export type OwnerJobsQuery = { __typename?: 'Query', ownerJobs: Array<{ __typename?: 'Job', id: number, title: string, category: string, shortDescription: string, location: string, startDate: any, applicationDeadline: any, budget: number, status: JobStatus, solarPowerPlant: { __typename?: 'SolarPowerPlant', id: number, officialId?: string | null }, approvedApplicant?: { __typename?: 'SolarPowerPlantMaintainer', id: number, name: string } | null }> };

export type OwnerSolarPowerPlantsQueryVariables = Exact<{ [key: string]: never; }>;
export type SolarPowerPlantsQueryOwnerVariables = Exact<{ [key: string]: never; }>;


export type OwnerSolarPowerPlantsQuery = { __typename?: 'Query', ownerSolarPowerPlants: { __typename?: 'SolarPowerPlantOwner', id: number, nickname?: string | null, solarPowerPlants: Array<{ __typename?: 'SolarPowerPlant', id: number, officialId?: string | null, name: string, location?: string | null, classification?: string | null, totalPowerOutput?: number | null, lat?: number | null, lng?: number | null, linked?: boolean | null }> } };
export type SolarPowerPlantsOwnerQuery = { __typename?: 'Query', solarPowerPlantsOwners: Array<{ __typename?: 'SolarPowerPlantOwner', id: number, nickname?: string | null, lat?: number, lng?:number, user:{id:number} }> };

export type PaymentTransactionsQueryVariables = Exact<{ [key: string]: never; }>;


export type PaymentTransactionsQuery = { __typename?: 'Query', paymentTransactions: Array<{ __typename?: 'PaymentTransaction', id: number, transactionId: string, amount: number, status: PaymentStatus, user: { __typename?: 'User', email: string }, job: { __typename?: 'Job', id: number, approvedApplicant?: { __typename?: 'SolarPowerPlantMaintainer', id: number, user: { __typename?: 'User', id: number, email: string } } | null } }> };

export type PaymentTransactionQueryVariables = Exact<{
  paymentTransactionId: Scalars['String'];
}>;


export type PaymentTransactionQuery = { __typename?: 'Query', paymentTransaction: { __typename?: 'PaymentTransaction', id: number, transactionId: string, amount: number, status: PaymentStatus } };

export type UserPaymentQueryVariables = Exact<{ [key: string]: never; }>;


export type UserPaymentQuery = { __typename?: 'Query', currentUserDetails?: { __typename?: 'User', id: number, paymentTransactions: Array<{ __typename?: 'PaymentTransaction', id: number, transactionId: string, amount: number, status: PaymentStatus, job: { __typename?: 'Job', id: number, title: string } }> } | null };

export type RegionQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type RegionQuery = { __typename?: 'Query', region: { __typename?: 'Region', id: number, name: string, cities: Array<{ __typename?: 'City', id: number, name: string, lat: number, lng: number }>, solarPowerPlants: Array<{ __typename?: 'SolarPowerPlant', id: number, officialId?: string | null, name: string, location?: string | null, totalPowerOutput?: number | null, classification?: string | null, lat?: number | null, lng?: number | null, linked?: boolean | null, solarPowerPlantOwner?: { __typename?: 'SolarPowerPlantOwner', id: number, nickname?: string | null } | null, jobs: Array<{ __typename?: 'Job', id: number, title: string, category: string }> }> } };

export type SearchSolarPowerPlantsByOfficialIdQueryVariables = Exact<{
  officialId: Scalars['String'];
  limit: Scalars['Float'];
}>;


export type SearchSolarPowerPlantsByOfficialIdQuery = { __typename?: 'Query', searchSolarPowerPlantsByOfficialId: Array<{ __typename?: 'SolarPowerPlant', id: number, officialId?: string | null, name: string, location?: string | null, totalPowerOutput?: number | null, classification?: string | null, lat?: number | null, lng?: number | null, linked?: boolean | null, solarPowerPlantOwner?: { __typename?: 'SolarPowerPlantOwner', id: number, nickname?: string | null, user?: { __typename?: 'User', id: number, email: string } | null } | null }> };

export type ShowApplicantsQueryVariables = Exact<{
  jobId: Scalars['Float'];
}>;


export type ShowApplicantsQuery = { __typename?: 'Query', showApplicants: { __typename?: 'Job', id: number, title: string, category: string, status: JobStatus, budget: number, jobApplications?: Array<{ __typename?: 'JobApplications', id: number, suggestedPrice: number, solarPowerPlantMaintainer: { __typename?: 'SolarPowerPlantMaintainer', id: number, name: string, intro?: string | null, phoneNumber?: string | null, address?: string | null, user: { __typename?: 'User', id: number } } }> | null } };

export type SolarPowerPlantMaintainersQueryVariables = Exact<{ [key: string]: never; }>;
export type ExchangeInformationQueryVariables = Exact<{ [key: string]: never; }>;


export type SolarPowerPlantMaintainersQuery = { __typename?: 'Query', solarPowerPlantMaintainers: Array<{ __typename?: 'SolarPowerPlantMaintainer', id: number, name: string, intro?: string | null, phoneNumber?: string | null, address?: string | null, lat: number, lng: number, user:{id?:number} }> };

export type SolarPowerPlantsQueryVariables = Exact<{ [key: string]: never; }>;


export type SolarPowerPlantsQuery = { __typename?: 'Query', solarPowerPlants: Array<{ __typename?: 'SolarPowerPlant', id: number, officialId?: string | null, location?: string | null, totalPowerOutput?: number | null, linked?: boolean | null }> };

export type StatisticsQueryVariables = Exact<{ [key: string]: never; }>;


export type StatisticsQuery = { __typename?: 'Query', statistics: { __typename?: 'StatisticsResponse', statistics: { __typename?: 'BasicStatistic', jobs: number, powerplants: number, users: number } } };

export type UserDetailsQueryVariables = Exact<{
  userId: Scalars['Float'];
}>;
export type GetBankDetailsQueryVariables = Exact<{
  userId: Scalars['Float'];
}>;

export type GetExchangeInformationQueryVariables = Exact<{
  userId: Scalars['Float'];
}>;


export type UserDetailsQuery = { __typename?: 'Query', userDetails?: { __typename?: 'User', id: number, email: string, userType: UserType, accountType: AccountType, solarPowerPlantOwner?: { __typename?: 'SolarPowerPlantOwner', id: number, ownerType?: string|null, companyName?: string|null, firstName?: string | null, lastName?: string | null, nickname?: string | null, gender?: string | null, DOB?: string | null, phoneNumber?: string | null, address?: string | null, lat: number, lng: number} | null, solarPowerPlantMaintainer?: { __typename?: 'SolarPowerPlantMaintainer', id: number, name: string, phoneNumber?: string | null, address?: string | null, lat: number, lng: number, representative: { __typename?: 'Representative', id: number, nickname?: string | null } } | null } | null };

export type GetBankDetailsDetailsQuery = { __typename?: 'Query', getBankDetailsByUserId?: { __typename?: 'BankDetails', id: number, bankName: string, branchName: string, depositItem: string, accountNumber:number, accountHolderKanji:string, accountHolderHiragana:string,userId:number}| null };

export type GetExchangeInformationQuery = { __typename?: 'Query', getExchangeInformationByUserId?: { __typename?: 'ExchangeInformation', id: number, blogUrl: string, twitter: string, comment: string, interested:string, trouble:string,userId:number}| null };

export type UsersQueryVariables = Exact<{
  input: UsersFilterInput;
}>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, email: string, userType: UserType, accountType: AccountType, solarPowerPlantOwner?: { __typename?: 'SolarPowerPlantOwner', id: number, nickname?: string | null } | null, solarPowerPlantMaintainer?: { __typename?: 'SolarPowerPlantMaintainer', id: number, name: string } | null }> };

export type NewMessageSubscriptionVariables = Exact<{
  channelId: Scalars['Float'];
}>;


export type NewMessageSubscription = { __typename?: 'Subscription', newMessage: { __typename?: 'Message', id: number, content: string, senderId: number, isRead: boolean, createdAt: string, uploadedFile?: { __typename?: 'FileInfo', id: number, filename?: string | null, storageLocation?: string | null } | null } };

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  email
}
    `;

export const ChangePasswordFragmentDoc = gql`
    fragment RegularUser on User {
  id
  email
}
    `;

export const CreateMaintainerProfileDocument = gql`
    mutation CreateMaintainerProfile($input: CreateMaintainerProfileInput!) {
  createMaintainerProfile(input: $input)
}
    `;

export function useCreateMaintainerProfileMutation() {
  return Urql.useMutation<CreateMaintainerProfileMutation, CreateMaintainerProfileMutationVariables>(CreateMaintainerProfileDocument);
};
export const CreateOwnerProfileDocument = gql`
    mutation CreateOwnerProfile($input: CreateOwnerProfileInput!) {
  createOwnerProfile(input: $input)
}
    `;

export function useCreateOwnerProfileMutation() {
  return Urql.useMutation<CreateOwnerProfileMutation, CreateOwnerProfileMutationVariables>(CreateOwnerProfileDocument);
};
export const CreateProfileDocument = gql`
    mutation CreateProfile($input: CreateProfileInput!) {
  createProfile(input: $input) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
      userType
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useCreateProfileMutation() {
  return Urql.useMutation<CreateProfileMutation, CreateProfileMutationVariables>(CreateProfileDocument);
};
export const ForceDeleteUserDocument = gql`
    mutation ForceDeleteUser($input: forceDeleteUserInput!) {
  forceDeleteUser(input: $input)
}
    `;

export function useForceDeleteUserMutation() {
  return Urql.useMutation<ForceDeleteUserMutation, ForceDeleteUserMutationVariables>(ForceDeleteUserDocument);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(input: {email: $email, password: $password}) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
      userType
      hasverified
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($input: RegistrationInput!) {
  register(input: $input) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
      userType
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const VerifyEmailDocument = gql`
    mutation VerifyEmail($input: VerifyEmailInput!) {
  verifyEmail(input: $input) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
      userType
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useVerifyEmailMutation() {
  return Urql.useMutation<VerifyEmailMutation, VerifyEmailMutationVariables>(VerifyEmailDocument);
};
export const JobDeleteAdminDocument = gql`
    mutation JobDeleteAdmin($input: JobDeleteAdminInput!) {
  jobDeleteAdmin(input: $input)
}
    `;

export function useJobDeleteAdminMutation() {
  return Urql.useMutation<JobDeleteAdminMutation, JobDeleteAdminMutationVariables>(JobDeleteAdminDocument);
};
export const ChatWithOwnerDocument = gql`
    mutation ChatWithOwner($input: chatWithOwnerInput!) {
  chatWithOwner(input: $input) {
    id
  }
}
    `;

export function useChatWithOwnerMutation() {
  return Urql.useMutation<ChatWithOwnerMutation, ChatWithOwnerMutationVariables>(ChatWithOwnerDocument);
};
export const CreateChannelDocument = gql`
    mutation CreateChannel($otherUserId: Float!, $jobId: Float!) {
  createChannel(otherUserId: $otherUserId, jobId: $jobId) {
    id
  }
}
    `;

export function useCreateChannelMutation() {
  return Urql.useMutation<CreateChannelMutation, CreateChannelMutationVariables>(CreateChannelDocument);
};
export const MarkChannelAsReadDocument = gql`
    mutation MarkChannelAsRead($input: MarkChannelAsReadInput!) {
  markChannelAsRead(input: $input)
}
    `;

export function useMarkChannelAsReadMutation() {
  return Urql.useMutation<MarkChannelAsReadMutation, MarkChannelAsReadMutationVariables>(MarkChannelAsReadDocument);
};
export const SendMessageDocument = gql`
    mutation SendMessage($content: String!, $channelId: Float!) {
  sendMessage(content: $content, channelId: $channelId) {
    id
    content
    senderId
  }
}
    `;

export function useSendMessageMutation() {
  return Urql.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument);
};
export const StartChatWithApprovedApplicantDocument = gql`
    mutation StartChatWithApprovedApplicant($input: StartChatWithApprovedApplicantInput!) {
  startChatWithApprovedApplicant(input: $input) {
    id
  }
}
    `;

export function useStartChatWithApprovedApplicantMutation() {
  return Urql.useMutation<StartChatWithApprovedApplicantMutation, StartChatWithApprovedApplicantMutationVariables>(StartChatWithApprovedApplicantDocument);
};
export const UploadFileDocument = gql`
    mutation uploadFile($channelId: Float!, $uploadFileInput: Upload!) {
  uploadFile(channelId: $channelId, input: $uploadFileInput) {
    id
    content
    senderId
    createdAt
    uploadedFile {
      id
      filename
      storageLocation
    }
  }
}
    `;

export function useUploadFileMutation() {
  return Urql.useMutation<UploadFileMutation, UploadFileMutationVariables>(UploadFileDocument);
};
export const AddJobToFavoriteDocument = gql`
    mutation AddJobToFavorite($jobId: Float!) {
  addJobToFavorite(jobId: $jobId)
}
    `;

export function useAddJobToFavoriteMutation() {
  return Urql.useMutation<AddJobToFavoriteMutation, AddJobToFavoriteMutationVariables>(AddJobToFavoriteDocument);
};
export const RemoveJobFromFavoriteDocument = gql`
    mutation RemoveJobFromFavorite($jobId: Float!) {
  removeJobFromFavorite(jobId: $jobId)
}
    `;

export function useRemoveJobFromFavoriteMutation() {
  return Urql.useMutation<RemoveJobFromFavoriteMutation, RemoveJobFromFavoriteMutationVariables>(RemoveJobFromFavoriteDocument);
};
export const UpdateApplicationDeadlineDocument = gql`
    mutation UpdateApplicationDeadline($input: UpdateApplicationDeadlineInput!) {
  updateApplicationDeadline(input: $input)
}
    `;

export function useUpdateApplicationDeadlineMutation() {
  return Urql.useMutation<UpdateApplicationDeadlineMutation, UpdateApplicationDeadlineMutationVariables>(UpdateApplicationDeadlineDocument);
};
export const MarkAllNotificationsAsReadDocument = gql`
    mutation MarkAllNotificationsAsRead {
  markAllNotificationsAsRead
}
    `;

export function useMarkAllNotificationsAsReadMutation() {
  return Urql.useMutation<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>(MarkAllNotificationsAsReadDocument);
};
export const MarkNotificationAsReadDocument = gql`
    mutation MarkNotificationAsRead($input: MarkNotificationAsReadInput!) {
  markNotificationAsRead(input: $input)
}
    `;

export function useMarkNotificationAsReadMutation() {
  return Urql.useMutation<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>(MarkNotificationAsReadDocument);
};
export const CreateOffPartyDocument = gql`
    mutation CreateOffParty($input: OffPartyInput!) {
  createOffParty(input: $input) {
    id
  }
}
    `;

export function useCreateOffPartyMutation() {
  return Urql.useMutation<CreateOffPartyMutation, CreateOffPartyMutationVariables>(CreateOffPartyDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const ResetPasswordDocument = gql`
    mutation ResetPassword($input: ResetPasswordInput!) {
  resetPassword(input: $input) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
      userType
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useResetPasswordMutation() {
  return Urql.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument);
};

export const ChangePasswordDocument = gql`
    mutation ChangePassword($input: ChangePasswordInput!) {
  changePassword(input: $input) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
      userType
    }
  }
}
    ${ChangePasswordFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};

export const InitializeTransactionMutationDocument = gql`
    mutation initializeTransactionMutation($input: initializeTransactionInput!) {
  initializeTransaction(input: $input) {
    transaction {
      id
      transactionId
      amount
      status
    }
  }
}
    `;

export function useInitializeTransactionMutationMutation() {
  return Urql.useMutation<InitializeTransactionMutationMutation, InitializeTransactionMutationMutationVariables>(InitializeTransactionMutationDocument);
};
export const UpdateTransactionFailedMutationDocument = gql`
    mutation UpdateTransactionFailedMutation($input: TransactionUpdateInput!) {
  updateTransactionFailed(input: $input) {
    id
    transactionId
    status
  }
}
    `;

export function useUpdateTransactionFailedMutationMutation() {
  return Urql.useMutation<UpdateTransactionFailedMutationMutation, UpdateTransactionFailedMutationMutationVariables>(UpdateTransactionFailedMutationDocument);
};
export const UpdateTransactiontProcessingMutationDocument = gql`
    mutation UpdateTransactiontProcessingMutation($input: TransactionUpdateInput!) {
  updateTransactiontProcessing(input: $input) {
    id
    transactionId
    status
  }
}
    `;

export function useUpdateTransactiontProcessingMutationMutation() {
  return Urql.useMutation<UpdateTransactiontProcessingMutationMutation, UpdateTransactiontProcessingMutationMutationVariables>(UpdateTransactiontProcessingMutationDocument);
};
export const UpdateTransactiontSucessfulMutationDocument = gql`
    mutation UpdateTransactiontSucessfulMutation($input: TransactionUpdateInput!) {
  updateTransactiontSucessful(input: $input) {
    id
    transactionId
    status
  }
}
    `;

export function useUpdateTransactiontSucessfulMutationMutation() {
  return Urql.useMutation<UpdateTransactiontSucessfulMutationMutation, UpdateTransactiontSucessfulMutationMutationVariables>(UpdateTransactiontSucessfulMutationDocument);
};
export const CreateSolarPowerPlantDocument = gql`
    mutation CreateSolarPowerPlant($input: SolarPowerPlantInput!) {
  createSolarPowerPlant(input: $input) {
    id
  }
}
    `;

export function useCreateSolarPowerPlantMutation() {
  return Urql.useMutation<CreateSolarPowerPlantMutation, CreateSolarPowerPlantMutationVariables>(CreateSolarPowerPlantDocument);
};
export const DisassociatePowerPlantDocument = gql`
    mutation disassociatePowerPlant($input: DisassociatePowerPlantInput!) {
  disassociatePowerPlant(input: $input) {
    status
    message
  }
}
    `;

export function useDisassociatePowerPlantMutation() {
  return Urql.useMutation<DisassociatePowerPlantMutation, DisassociatePowerPlantMutationVariables>(DisassociatePowerPlantDocument);
};
export const CreateAnswerDocument = gql`
    mutation CreateAnswer($input: CreateAnswerInput!) {
  createAnswer(input: $input) {
    id
  }
}
    `;

export function useCreateAnswerMutation() {
  return Urql.useMutation<CreateAnswerMutation, CreateAnswerMutationVariables>(CreateAnswerDocument);
};
export const CreateQuestionDocument = gql`
    mutation CreateQuestion($input: CreateQuestionInput!) {
  createQuestion(input: $input) {
    id
  }
}
    `;

export function useCreateQuestionMutation() {
  return Urql.useMutation<CreateQuestionMutation, CreateQuestionMutationVariables>(CreateQuestionDocument);
};
export const RateMaintainerDocument = gql`
    mutation RateMaintainer($input: RateMaintainerInput!) {
  rateMaintainer(input: $input) {
    id
  }
}
    `;

export function useRateMaintainerMutation() {
  return Urql.useMutation<RateMaintainerMutation, RateMaintainerMutationVariables>(RateMaintainerDocument);
};
export const RateOwnerDocument = gql`
    mutation RateOwner($input: RateOwnerInput!) {
  rateOwner(input: $input) {
    id
  }
}
    `;

export function useRateOwnerMutation() {
  return Urql.useMutation<RateOwnerMutation, RateOwnerMutationVariables>(RateOwnerDocument);
};
export const CreateSeminarDocument = gql`
    mutation CreateSeminar($input: SeminarInput!) {
  createSeminar(input: $input) {
    id
  }
}
    `;

export function useCreateSeminarMutation() {
  return Urql.useMutation<CreateSeminarMutation, CreateSeminarMutationVariables>(CreateSeminarDocument);
};
export const ContactUsDocument = gql`
    mutation contactUs($input: contactUsInput!) {
  contactUs(input: $input)
}
    `;

export function useContactUsMutation() {
  return Urql.useMutation<ContactUsMutation, ContactUsMutationVariables>(ContactUsDocument);
};
export const UpdateMaintainerInfoDocument = gql`
    mutation UpdateMaintainerInfo($input: MaintainerUpdateInput!) {
  updateMaintainerInfo(input: $input)
}
    `;

export function useUpdateMaintainerInfoMutation() {
  return Urql.useMutation<UpdateMaintainerInfoMutation, UpdateMaintainerInfoMutationVariables>(UpdateMaintainerInfoDocument);
};




export const SaveBankDetailsDocument = gql`
    mutation SaveBankDetails($input: SaveBankDetailsInput!) {
  saveBankDetails(input: $input){
     errors {
      field
      message
    }

  }
} `;
export const UpdateBankDetailsDocument = gql`
    mutation UpdateBankDetails($input: UpdateBankDetailsInput!) {
  updateBankDetails(input: $input){
     errors {
      field
      message
    }

  }
} `;

export function useSaveBankDetailsMutation() {
  return Urql.useMutation<SaveBankDetailsMutation, SaveBankDetailsMutationVariables>(SaveBankDetailsDocument);
};

export const SaveExchangeInformationDocument = gql`
    mutation SaveExchangeInformation($input: SaveExchangeInformationInput!) {
  saveExchangeInformation(input: $input){
     errors {
      field
      message
    }

  }
} `;
export const UpdateExchangeInformationDocument = gql`
    mutation UpdateExchangeInformation($input: UpdateExchangeInformationInput!) {
  updateExchangeInformation(input: $input){
     errors {
      field
      message
    }

  }
} `;
export function useSaveExchangeInformationMutation() {
  return Urql.useMutation<SaveExchangeInformationMutation, SaveExchangeInformationMutationMutationVariables>(SaveExchangeInformationDocument);
};

export function useUpdateBankDetailsMutation() {
  return Urql.useMutation<UpdateBankDetailsMutation, UpdateBankDetailsMutationVariables>(UpdateBankDetailsDocument);
};

export function useUpdateExchangeInformationMutation() {
  return Urql.useMutation<UpdateExchangeInformationMutation, UpdateExchangeInformationMutationVariables>(UpdateExchangeInformationDocument);
};


export const UpdateOwnerInfoDocument = gql`
    mutation UpdateOwnerInfo($input: OwnerUpdateInput!) {
  updateOwnerInfo(input: $input)
}
    `;

export function useUpdateOwnerInfoMutation() {
  return Urql.useMutation<UpdateOwnerInfoMutation, UpdateOwnerInfoMutationVariables>(UpdateOwnerInfoDocument);
};

export const AddApplicantDocument = gql`
    mutation AddApplicant($jobId: Float!) {
  addApplicant(jobId: $jobId) {
    id
  }
}
    `;

export function useAddApplicantMutation() {
  return Urql.useMutation<AddApplicantMutation, AddApplicantMutationVariables>(AddApplicantDocument);
};
export const ApproveApplicantDocument = gql`
    mutation ApproveApplicant($maintainerId: Float!, $jobId: Float!) {
  approveApplicant(maintainerId: $maintainerId, jobId: $jobId) {
    id
    transactionId
  }
}
    `;

export function useApproveApplicantMutation() {
  return Urql.useMutation<ApproveApplicantMutation, ApproveApplicantMutationVariables>(ApproveApplicantDocument);
};
export const UpdatePowerplantDocument = gql`
    mutation updatePowerplant($solarPowerPlantId: Float!, $lat: Float, $lng: Float, $name: String) {
  updatePowerplant(
    input: {solarPowerPlantId: $solarPowerPlantId, lat: $lat, lng: $lng, name: $name}
  )
}
    `;

export function useUpdatePowerplantMutation() {
  return Urql.useMutation<UpdatePowerplantMutation, UpdatePowerplantMutationVariables>(UpdatePowerplantDocument);
};
export const ClaimPowerPlantDocument = gql`
    mutation claimPowerPlant($powerPlantId: Float!) {
  claimPowerPlant(powerPlantId: $powerPlantId)
}
    `;

export function useClaimPowerPlantMutation() {
  return Urql.useMutation<ClaimPowerPlantMutation, ClaimPowerPlantMutationVariables>(ClaimPowerPlantDocument);
};
export const CreateJobDocument = gql`
    mutation createJob($input: JobInput!) {
  createJob(input: $input) {
    id
  }
}
    `;

export function useCreateJobMutation() {
  return Urql.useMutation<CreateJobMutation, CreateJobMutationVariables>(CreateJobDocument);
};
export const CreateSolarPowerPlantMaintainerDocument = gql`
    mutation createSolarPowerPlantMaintainer($representativeFirstName: String!, $representativeLastName: String!, $representativeNickName: String!, $representativeGender: String!, $representativeDOB: DateTime!, $representativePhoneNumber: String!, $representativeAddress: String!, $maintainerName: String!, $maintainerIntro: String!, $maintainerPhoneNumber: String!, $maintainerAddress: String!, $lat: Float!, $lng: Float!) {
  createSolarPowerPlantMaintainer(
    representative: {companyName: $maintainerName, firstName: $representativeFirstName, lastName: $representativeLastName, nickname: $representativeNickName, gender: $representativeGender, DOB: $representativeDOB, phoneNumber: $representativePhoneNumber, address: $representativeAddress}
    maintainer: {name: $maintainerName, intro: $maintainerIntro, phoneNumber: $maintainerPhoneNumber, address: $maintainerAddress, lat: $lat, lng: $lng}
  )
}
    `;

export function useCreateSolarPowerPlantMaintainerMutation() {
  return Urql.useMutation<CreateSolarPowerPlantMaintainerMutation, CreateSolarPowerPlantMaintainerMutationVariables>(CreateSolarPowerPlantMaintainerDocument);
};
export const DeleteUserDocument = gql`
    mutation deleteUser($userId: Float!) {
  deleteUser(userId: $userId)
}
    `;

export function useDeleteUserMutation() {
  return Urql.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument);
};

export const CheckUserDeleteDocument = gql`
    mutation checkUserCanDelete($input: forceDeleteUserInput!) {
  checkUserCanDelete(input: $input)
}
    `;

export function useCheckUserDeleteMutation() {
  return Urql.useMutation<CheckUserDeleteMutation, CheckUserDeleteMutationVariables>(CheckUserDeleteDocument);
};








export const EditJobDocument = gql`
    mutation editJob($jobId: Float!, $title: String!, $category: String!, $shortDescription: String!, $longDescription: String!, $location: String!, $applicationDeadline: DateTime!, $startDate: DateTime!, $endDate: DateTime!, $budget: Float!, $status: String!, $solarPowerPlantId: Float!) {
  editJob(
    jobId: $jobId
    input: {title: $title, category: $category, shortDescription: $shortDescription, longDescription: $longDescription, location: $location, applicationDeadline: $applicationDeadline, startDate: $startDate, endDate: $endDate, budget: $budget, status: $status, solarPowerPlantId: $solarPowerPlantId}
  ) {
    id
  }
}
    `;

export function useEditJobMutation() {
  return Urql.useMutation<EditJobMutation, EditJobMutationVariables>(EditJobDocument);
};
export const InitializeUserTransactionDocument = gql`
    mutation InitializeUserTransaction($paymentId: String!) {
  initializeUserTransaction(paymentId: $paymentId) {
    id
    transactionId
    price
    status
    user {
      id
      email
    }
  }
}
    `;

export function useInitializeUserTransactionMutation() {
  return Urql.useMutation<InitializeUserTransactionMutation, InitializeUserTransactionMutationVariables>(InitializeUserTransactionDocument);
};
export const JobMarkCompletedDocument = gql`
    mutation JobMarkCompleted($jobId: Float!) {
  jobMarkCompleted(jobId: $jobId) {
    id
  }
}
    `;

export function useJobMarkCompletedMutation() {
  return Urql.useMutation<JobMarkCompletedMutation, JobMarkCompletedMutationVariables>(JobMarkCompletedDocument);
};
export const OpenJobDocument = gql`
    mutation OpenJob($jobId: Float!) {
  openJob(jobId: $jobId) {
    id
  }
}
    `;

export function useOpenJobMutation() {
  return Urql.useMutation<OpenJobMutation, OpenJobMutationVariables>(OpenJobDocument);
};
export const RegisterJobDocument = gql`
    mutation RegisterJob($jobId: Float!) {
  registerJob(jobId: $jobId) {
    id
  }
}
    `;

export function useRegisterJobMutation() {
  return Urql.useMutation<RegisterJobMutation, RegisterJobMutationVariables>(RegisterJobDocument);
};
export const UpdateSuggestedPriceDocument = gql`
    mutation UpdateSuggestedPrice($jobId: Float!, $suggestedPrice: Float!) {
  updateSuggestedPrice(jobId: $jobId, suggestedPrice: $suggestedPrice) {
    id
  }
}
    `;

export function useUpdateSuggestedPriceMutation() {
  return Urql.useMutation<UpdateSuggestedPriceMutation, UpdateSuggestedPriceMutationVariables>(UpdateSuggestedPriceDocument);
};
export const UpdateUserPaymentStatusDocument = gql`
    mutation UpdateUserPaymentStatus($transactionId: String!, $paymentStatus: String!) {
  updateUserPaymentStatus(
    transactionId: $transactionId
    paymentStatus: $paymentStatus
  ) {
    id
    transactionId
    price
    status
    user {
      id
      email
      accountType
    }
  }
}
    `;

export function useUpdateUserPaymentStatusMutation() {
  return Urql.useMutation<UpdateUserPaymentStatusMutation, UpdateUserPaymentStatusMutationVariables>(UpdateUserPaymentStatusDocument);
};
export const UpdateUserTypeDocument = gql`
    mutation updateUserType($userType: String!) {
  updateUserType(userType: $userType)
}
    `;

export function useUpdateUserTypeMutation() {
  return Urql.useMutation<UpdateUserTypeMutation, UpdateUserTypeMutationVariables>(UpdateUserTypeDocument);
};
export const AllJobsDocument = gql`
    query AllJobs {
  allJobs {
    id
    title
    category
    shortDescription
    longDescription
    location
    applicationDeadline
    startDate
    endDate
    budget
    status
    deletedAt
    solarPowerPlant {
      id
      officialId
      location
      totalPowerOutput
      classification
      lat
      lng
      solarPowerPlantOwner {
        id
        nickname
        user {
          id
          email
        }
      }
    }
    approvedApplicant {
      id
      name
      user {
        id
        email
      }
    }
  }
}
    `;

export function useAllJobsQuery(options?: Omit<Urql.UseQueryArgs<AllJobsQueryVariables>, 'query'>) {
  return Urql.useQuery<AllJobsQuery>({ query: AllJobsDocument, ...options });
};
export const ChannelsDocument = gql`
    query Channels {
  channels {
    channelsExtraInfo {
      channel {
        id
        deleted
        channelsMembers {
          id
          user {
            id
            email
            userType
            solarPowerPlantOwner {
              id
              nickname
            }
            solarPowerPlantMaintainer {
              id
              name
              representative {
                nickname
              }
            }
          }
        }
      }
      unReadCount
    }
  }
}
    `;

export function useChannelsQuery(options?: Omit<Urql.UseQueryArgs<ChannelsQueryVariables>, 'query'>) {
  return Urql.useQuery<ChannelsQuery>({ query: ChannelsDocument, ...options });
};
export const MessagesDocument = gql`
    query Messages($channelId: Float!) {
  messages(channelId: $channelId) {
    id
    content
    senderId
    isRead
    createdAt
    uploadedFile {
      id
      filename
      storageLocation
    }
  }
}
    `;

export function useMessagesQuery(options: Omit<Urql.UseQueryArgs<MessagesQueryVariables>, 'query'>) {
  return Urql.useQuery<MessagesQuery>({ query: MessagesDocument, ...options });
};
export const UnReadChannelsDocument = gql`
    query UnReadChannels {
  channels {
    channelsExtraInfo {
      unReadCount
    }
  }
}
    `;

export function useUnReadChannelsQuery(options?: Omit<Urql.UseQueryArgs<UnReadChannelsQueryVariables>, 'query'>) {
  return Urql.useQuery<UnReadChannelsQuery>({ query: UnReadChannelsDocument, ...options });
};
export const FavoriteJobsDocument = gql`
    query FavoriteJobs {
  favoriteJobs {
    id
    job {
      id
      title
      category
      location
      applicationDeadline
      budget
      status
    }
  }
}
    `;

export function useFavoriteJobsQuery(options?: Omit<Urql.UseQueryArgs<FavoriteJobsQueryVariables>, 'query'>) {
  return Urql.useQuery<FavoriteJobsQuery>({ query: FavoriteJobsDocument, ...options });
};
export const UserNotificationsDocument = gql`
    query userNotifications {
  userNotifications {
    id
    content
    isRead
  }
}
    `;

export function useUserNotificationsQuery(options?: Omit<Urql.UseQueryArgs<UserNotificationsQueryVariables>, 'query'>) {
  return Urql.useQuery<UserNotificationsQuery>({ query: UserNotificationsDocument, ...options });
};
export const GetOffPartyLocationsDocument = gql`
    query GetOffPartyLocations {
  getOffParties {
    id
    address
    lat
    lng
  }
}
    `;

export function useGetOffPartyLocationsQuery(options?: Omit<Urql.UseQueryArgs<GetOffPartyLocationsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetOffPartyLocationsQuery>({ query: GetOffPartyLocationsDocument, ...options });
};
export const QuestionDocument = gql`
    query Question($input: QuestionInput!) {
  question(input: $input) {
    id
    title
    text
    createdAt
    user {
      id
      email
    }
    answers {
      id
      text
      user {
        id
        email
      }
    }
  }
}
    `;

export function useQuestionQuery(options: Omit<Urql.UseQueryArgs<QuestionQueryVariables>, 'query'>) {
  return Urql.useQuery<QuestionQuery>({ query: QuestionDocument, ...options });
};
export const QuestionsDocument = gql`
    query Questions {
  questions {
    id
    title
    text
    createdAt
    user {
      id
      email
    }
  }
}
    `;

export function useQuestionsQuery(options?: Omit<Urql.UseQueryArgs<QuestionsQueryVariables>, 'query'>) {
  return Urql.useQuery<QuestionsQuery>({ query: QuestionsDocument, ...options });
};
export const UserRatingsDocument = gql`
    query UserRatings($input: UserRatingInput!) {
  userRatings(input: $input) {
    id
    rating
    comment
    evaluator {
      id
      solarPowerPlantOwner {
        id
        nickname
      }
      solarPowerPlantMaintainer {
        id
        name
      }
    }
  }
}
    `;

export function useUserRatingsQuery(options: Omit<Urql.UseQueryArgs<UserRatingsQueryVariables>, 'query'>) {
  return Urql.useQuery<UserRatingsQuery>({ query: UserRatingsDocument, ...options });
};
export const FormRegionsDocument = gql`
    query FormRegions {
  regions {
    id
    name
    cities {
      id
      name
    }
  }
}
    `;

export function useFormRegionsQuery(options?: Omit<Urql.UseQueryArgs<FormRegionsQueryVariables>, 'query'>) {
  return Urql.useQuery<FormRegionsQuery>({ query: FormRegionsDocument, ...options });
};
export const GetSeminarLocationsDocument = gql`
    query GetSeminarLocations {
  getSeminars {
    id
    address
    lat
    lng
  }
}
    `;

export function useGetSeminarLocationsQuery(options?: Omit<Urql.UseQueryArgs<GetSeminarLocationsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSeminarLocationsQuery>({ query: GetSeminarLocationsDocument, ...options });
};
export const ApprovedJobsDocument = gql`
    query approvedJobs {
  approvedJobs {
    id
    title
    category
    shortDescription
    longDescription
    location
    applicationDeadline
    startDate
    endDate
    budget
    status
  }
}
    `;

export function useApprovedJobsQuery(options?: Omit<Urql.UseQueryArgs<ApprovedJobsQueryVariables>, 'query'>) {
  return Urql.useQuery<ApprovedJobsQuery>({ query: ApprovedJobsDocument, ...options });
};
export const AreasDocument = gql`
    query areas {
  areas {
    id
    name
    regions {
      id
      name
    }
  }
}
    `;

export function useAreasQuery(options?: Omit<Urql.UseQueryArgs<AreasQueryVariables>, 'query'>) {
  return Urql.useQuery<AreasQuery>({ query: AreasDocument, ...options });
};
export const GetSubscriptionsDocument = gql`
    query GetSubscriptions {
  getSubscriptions {
    id
    transactionId
    price
    status
    createdAt
  }
}
    `;

export function useGetSubscriptionsQuery(options?: Omit<Urql.UseQueryArgs<GetSubscriptionsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSubscriptionsQuery>({ query: GetSubscriptionsDocument, ...options });
};
export const JobDocument = gql`
    query Job($jobId: Float!) {
  job(jobId: $jobId) {
    id
    title
    category
    shortDescription
    longDescription
    location
    applicationDeadline
    startDate
    endDate
    budget
    status
    jobFiles {
      id
      filename
      storageLocation
    }
    solarPowerPlant {
      id
      officialId
      solarPowerPlantOwner {
        id
        nickname
        user {
          id
        }
      }
    }
  }
}
    `;

export function useJobQuery(options: Omit<Urql.UseQueryArgs<JobQueryVariables>, 'query'>) {
  return Urql.useQuery<JobQuery>({ query: JobDocument, ...options });
};
export const IsMaintainerFavoriteJobDocument = gql`
    query IsMaintainerFavoriteJob($input: IsFavoriteInput!) {
  isMaintainerFavoriteJob(input: $input)
}
    `;

export function useIsMaintainerFavoriteJobQuery(options: Omit<Urql.UseQueryArgs<IsMaintainerFavoriteJobQueryVariables>, 'query'>) {
  return Urql.useQuery<IsMaintainerFavoriteJobQuery>({ query: IsMaintainerFavoriteJobDocument, ...options });
};
export const MapOpenJobsDocument = gql`
    query MapOpenJobs {
  mapOpenJobs {
    id
    title
    category
    shortDescription
    longDescription
    location
    applicationDeadline
    startDate
    endDate
    budget
    status
    solarPowerPlant {
      id
      officialId
      location
      totalPowerOutput
      classification
      lat
      lng
    }
  }
}
    `;

export function useMapOpenJobsQuery(options?: Omit<Urql.UseQueryArgs<MapOpenJobsQueryVariables>, 'query'>) {
  return Urql.useQuery<MapOpenJobsQuery>({ query: MapOpenJobsDocument, ...options });
};
export const JobApplicationsDocument = gql`
    query JobApplications {
  jobApplications {
    jobApplications {
      jobApplication {
        id
        suggestedPrice
        job {
          id
          title
          category
          shortDescription
          longDescription
          location
          applicationDeadline
          startDate
          endDate
          budget
          status
        }
      }
      isFavorite
    }
  }
}
    `;

export function useJobApplicationsQuery(options?: Omit<Urql.UseQueryArgs<JobApplicationsQueryVariables>, 'query'>) {
  return Urql.useQuery<JobApplicationsQuery>({ query: JobApplicationsDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
    userType
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const MessageUsersDocument = gql`
    query messageUsers {
  messageUsers {
    id
    email
    userType
    solarPowerPlantOwner {
      id
      nickname
    }
    solarPowerPlantMaintainer {
      id
      name
    }
  }
}
    `;

export function useMessageUsersQuery(options?: Omit<Urql.UseQueryArgs<MessageUsersQueryVariables>, 'query'>) {
  return Urql.useQuery<MessageUsersQuery>({ query: MessageUsersDocument, ...options });
};
export const NewUsersDocument = gql`
    query NewUsers($input: UsersFilterInput!) {
  users(input: $input) {
    id
    email
    solarPowerPlantOwner {
      id
      nickname
    }
    solarPowerPlantMaintainer {
      id
      name
    }
    userType
    accountType
    createdAt
  }
}
    `;

export function useNewUsersQuery(options: Omit<Urql.UseQueryArgs<NewUsersQueryVariables>, 'query'>) {
  return Urql.useQuery<NewUsersQuery>({ query: NewUsersDocument, ...options });
};
export const OpenJobsDocument = gql`
    query OpenJobs {
  openJobs {
    id
    title
    shortDescription
    category
    solarPowerPlant {
      id
      officialId
      region {
        id
      }
      solarPowerPlantOwner {
        user {
          id
        }
      }
    }
    jobApplications {
      id
      solarPowerPlantMaintainer {
        id
        user {
          id
        }
      }
      suggestedPrice
    }
    location
    startDate
    applicationDeadline
    budget
    status
  }
}
    `;

export function useOpenJobsQuery(options?: Omit<Urql.UseQueryArgs<OpenJobsQueryVariables>, 'query'>) {
  return Urql.useQuery<OpenJobsQuery>({ query: OpenJobsDocument, ...options });
};
export const OwnerJobsDocument = gql`
    query OwnerJobs {
  ownerJobs {
    id
    title
    category
    shortDescription
    location
    startDate
    applicationDeadline
    budget
    status
    solarPowerPlant {
      id
      officialId
    }
    approvedApplicant {
      id
      name
    }
  }
}
    `;

export function useOwnerJobsQuery(options?: Omit<Urql.UseQueryArgs<OwnerJobsQueryVariables>, 'query'>) {
  return Urql.useQuery<OwnerJobsQuery>({ query: OwnerJobsDocument, ...options });
};
export const OwnerSolarPowerPlantsDocument = gql`
    query ownerSolarPowerPlants {
  ownerSolarPowerPlants {
    id
    nickname
    solarPowerPlants {
      id
      officialId
      name
      location
      classification
      totalPowerOutput
      lat
      lng
      linked
    }
  }
}
    `;

export function useOwnerSolarPowerPlantsQuery(options?: Omit<Urql.UseQueryArgs<OwnerSolarPowerPlantsQueryVariables>, 'query'>) {
  return Urql.useQuery<OwnerSolarPowerPlantsQuery>({ query: OwnerSolarPowerPlantsDocument, ...options });
};
export const SolarPowerPlantsOwnerDocument = gql`
    query solarPowerPlantsOwners {
    
  solarPowerPlantsOwners {
  
  id
  ownerType
  companyName
  firstName
  lastName
  nickname
  address
  lat
  lng
      user {
      id
    }
  
  }
}
    `;

export function useSolarPowerPlantsOwnerQuery(options?: Omit<Urql.UseQueryArgs<SolarPowerPlantsQueryOwnerVariables>, 'query'>) {
  return Urql.useQuery<SolarPowerPlantsOwnerQuery>({ query: SolarPowerPlantsOwnerDocument, ...options });
};
export const PaymentTransactionsDocument = gql`
    query PaymentTransactions {
  paymentTransactions {
    id
    transactionId
    amount
    status
    user {
      email
    }
    job {
      id
      approvedApplicant {
        id
        user {
          id
          email
        }
      }
    }
  }
}
    `;

export function usePaymentTransactionsQuery(options?: Omit<Urql.UseQueryArgs<PaymentTransactionsQueryVariables>, 'query'>) {
  return Urql.useQuery<PaymentTransactionsQuery>({ query: PaymentTransactionsDocument, ...options });
};
export const PaymentTransactionDocument = gql`
    query PaymentTransaction($paymentTransactionId: String!) {
  paymentTransaction(paymentTransactionId: $paymentTransactionId) {
    id
    transactionId
    amount
    status
  }
}
    `;

export function usePaymentTransactionQuery(options: Omit<Urql.UseQueryArgs<PaymentTransactionQueryVariables>, 'query'>) {
  return Urql.useQuery<PaymentTransactionQuery>({ query: PaymentTransactionDocument, ...options });
};
export const UserPaymentDocument = gql`
    query UserPayment {
  currentUserDetails {
    id
    paymentTransactions {
      id
      transactionId
      amount
      status
      job {
        id
        title
      }
    }
  }
}
    `;

export function useUserPaymentQuery(options?: Omit<Urql.UseQueryArgs<UserPaymentQueryVariables>, 'query'>) {
  return Urql.useQuery<UserPaymentQuery>({ query: UserPaymentDocument, ...options });
};
export const RegionDocument = gql`
    query Region($id: Float!) {
  region(id: $id) {
    id
    name
    cities {
      id
      name
      lat
      lng
    }
    solarPowerPlants {
      id
      officialId
      name
      location
      totalPowerOutput
      classification
      lat
      lng
      linked
      solarPowerPlantOwner {
        id
        nickname
      }
      jobs {
        id
        title
        category
      }
    }
  }
}
    `;

export function useRegionQuery(options: Omit<Urql.UseQueryArgs<RegionQueryVariables>, 'query'>) {
  return Urql.useQuery<RegionQuery>({ query: RegionDocument, ...options });
};
export const SearchSolarPowerPlantsByOfficialIdDocument = gql`
    query searchSolarPowerPlantsByOfficialId($officialId: String!, $limit: Float!) {
  searchSolarPowerPlantsByOfficialId(officialId: $officialId, limit: $limit) {
    id
    officialId
    name
    location
    totalPowerOutput
    classification
    lat
    lng
    linked
    solarPowerPlantOwner {
      id
      nickname
      user {
        id
        email
      }
    }
  }
}
    `;

export function useSearchSolarPowerPlantsByOfficialIdQuery(options: Omit<Urql.UseQueryArgs<SearchSolarPowerPlantsByOfficialIdQueryVariables>, 'query'>) {
  return Urql.useQuery<SearchSolarPowerPlantsByOfficialIdQuery>({ query: SearchSolarPowerPlantsByOfficialIdDocument, ...options });
};
export const ShowApplicantsDocument = gql`
    query ShowApplicants($jobId: Float!) {
  showApplicants(jobId: $jobId) {
    id
    title
    category
    status
    budget
    jobApplications {
      id
      suggestedPrice
      solarPowerPlantMaintainer {
        id
        name
        intro
        phoneNumber
        address
        user {
          id
        }
      }
    }
  }
}
    `;

export function useShowApplicantsQuery(options: Omit<Urql.UseQueryArgs<ShowApplicantsQueryVariables>, 'query'>) {
  return Urql.useQuery<ShowApplicantsQuery>({ query: ShowApplicantsDocument, ...options });
};
export const SolarPowerPlantMaintainersDocument = gql`
    query solarPowerPlantMaintainers {
  solarPowerPlantMaintainers {
    id
    name
    intro
    phoneNumber
    address
    lat
    lng
    user {
    id
    }
  }
}
    `;

export function useSolarPowerPlantMaintainersQuery(options?: Omit<Urql.UseQueryArgs<SolarPowerPlantMaintainersQueryVariables>, 'query'>) {
  return Urql.useQuery<SolarPowerPlantMaintainersQuery>({ query: SolarPowerPlantMaintainersDocument, ...options });
};
export const ExchangeInformationDocument = gql`
    query getExchangeInformations {
  getExchangeInformations {
    userId
    comment
  }
}
    `;

export function useExchangeQuery(options?: Omit<Urql.UseQueryArgs<ExchangeInformationQueryVariables>, 'query'>) {
  return Urql.useQuery<SolarPowerPlantMaintainersQuery>({ query: ExchangeInformationDocument, ...options });
};


export const SolarPowerPlantsDocument = gql`
    query solarPowerPlants {
  solarPowerPlants {
    id
    officialId
    location
    totalPowerOutput
    linked
  }
}
    `;

export function useSolarPowerPlantsQuery(options?: Omit<Urql.UseQueryArgs<SolarPowerPlantsQueryVariables>, 'query'>) {
  return Urql.useQuery<SolarPowerPlantsQuery>({ query: SolarPowerPlantsDocument, ...options });
};
export const StatisticsDocument = gql`
    query Statistics {
  statistics {
    statistics {
      jobs
      powerplants
      users
    }
  }
}
    `;

export function useStatisticsQuery(options?: Omit<Urql.UseQueryArgs<StatisticsQueryVariables>, 'query'>) {
  return Urql.useQuery<StatisticsQuery>({ query: StatisticsDocument, ...options });
};
export const UserDetailsDocument = gql`
    query UserDetails($userId: Float!) {
  userDetails(userId: $userId) {
    id
    email
    userType
    accountType
    solarPowerPlantOwner {
      id
      ownerType
      companyName
      firstName
      lastName
      nickname
      gender
      DOB
      phoneNumber
      address
      lat
      lng
    }
    solarPowerPlantMaintainer {
      id
      name
      phoneNumber
      address
      lat
      lng
      intro
      representative {
        id
        nickname
        companyName
        firstName
        lastName
        nickname
        gender
        DOB
        phoneNumber
        address
        
      }
    }
  }
}
    `;

export function useUserDetailsQuery(options: Omit<Urql.UseQueryArgs<UserDetailsQueryVariables>, 'query'>) {
  return Urql.useQuery<UserDetailsQuery>({ query: UserDetailsDocument, ...options });
};


export const getBankDetailsDocument = gql`
    query GetBankDetails($userId: Float!) {
  getBankDetailsByUserId(userId: $userId) {
    id
    bankName
    branchName
    depositItem
    accountNumber
    accountHolderKanji
    accountHolderHiragana
    userId
    bankType
   
  }
}
    `;

export function useGetBankDetailsQuery(options: Omit<Urql.UseQueryArgs<GetBankDetailsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetBankDetailsDetailsQuery>({ query: getBankDetailsDocument, ...options });
};

export const getExchangeInformationDocument = gql`
    query GetExchangeInformation($userId: Float!) {
  getExchangeInformationByUserId(userId: $userId) {
    id
    blogUrl
    twitter
    comment
    interested
    trouble
    userId
   
  }
}
    `;

export function useGetExchangeInformationQuery(options: Omit<Urql.UseQueryArgs<GetExchangeInformationQueryVariables>, 'query'>) {
  return Urql.useQuery<GetExchangeInformationQuery>({ query: getExchangeInformationDocument, ...options });
};

export const UsersDocument = gql`
    query Users($input: UsersFilterInput!) {
  users(input: $input) {
    id
    email
    solarPowerPlantOwner {
      id
      nickname
      
    }
    solarPowerPlantMaintainer {
      id
      name
    }
    userType
    accountType
    withdrawal
  }
}
    `;

export function useUsersQuery(options: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'>) {
  return Urql.useQuery<UsersQuery>({ query: UsersDocument, ...options });
};
export const NewMessageDocument = gql`
    subscription NewMessage($channelId: Float!) {
  newMessage(channelId: $channelId) {
    id
    content
    senderId
    isRead
    createdAt
    uploadedFile {
      id
      filename
      storageLocation
    }
  }
}
    `;

export function useNewMessageSubscription<TData = NewMessageSubscription>(options: Omit<Urql.UseSubscriptionArgs<NewMessageSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<NewMessageSubscription, TData>) {
  return Urql.useSubscription<NewMessageSubscription, TData, NewMessageSubscriptionVariables>({ query: NewMessageDocument, ...options }, handler);
};