export type KYCStatus = "none" | "pending" | "verified" | "rejected";

export type UserProfile = {
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  country?: string;
  city?: string;
  postalCode?: string;
  address?: string;
  avatarUrl?: string;
};

export type User = {
  id: string;
  email: string;
  profile: UserProfile;
  kycStatus: KYCStatus;
  createdAt: string;
};
