export interface ITechnician {
  id: string;
  name: string;
  address?: string;
  experienceYears: number;
  avgRating: number;
  categories: string[];
}

export interface TechnicianCardProps {
  technician: ITechnician;
}
