export interface CreateProjectInterface {
  title: string;
  description?: string;
  totalSpent: number;
}

export interface ProjectInterface {
  _id: string;
  title: string;
  description?: string;
  expanses: ExpansesInterface[];
  totalSpent: number;
}

export interface ExpansesInterface {
  _id: string;
  title: string;
  spent: number;
}
