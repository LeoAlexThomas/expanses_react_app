export interface CreateProjectInterface {
  title: string;
  description?: string;
  totalSpent: number;
}

export interface CreateExpanseInterface {
  title: string;
  spent: number;
  projectId: string;
}

export interface ProjectInterface {
  _id: string;
  title: string;
  description?: string;
  expanses: ExpanseInterface[];
  totalSpent: number;
}

export interface ExpanseInterface {
  _id: string;
  title: string;
  spent: number;
}
