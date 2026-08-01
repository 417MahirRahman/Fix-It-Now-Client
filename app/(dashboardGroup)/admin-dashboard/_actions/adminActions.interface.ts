export interface IUser {
  id: string;
  name: string;
  email: string;
  role: "Customer" | "Technician" | "Admin";
  status: "Active" | "Banned";
  phone: string;
  address: string;
}

export interface UpdateStatusState {
  success: boolean;
  message: string;
}
