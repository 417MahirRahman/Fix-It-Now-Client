export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "Customer" | "Technician" | "Admin";
  phone?: string;
  address?: string;
  bio?: string | null;
  experienceYears?: number | null;
}

export interface ProfileState {
  success: boolean;
  message: string;
}

export interface TechnicianProfileState {
  success: boolean;
  message: string;
}
