import { User } from "../entities/User";
import { UserType } from "../enums";

export const getAdminEmails = async (): Promise<string[]> => {
  const admins = await User.find({
    where: { userType: UserType.Admin },
    select: ["email"],
  });
  const adminEmails = admins.map((a) => a.email);
  return adminEmails;
};
