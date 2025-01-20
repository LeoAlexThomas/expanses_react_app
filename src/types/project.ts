import { CustomSelectOptions } from "./common";
import { UserInterface } from "./user";

export interface CreateProjectInterface {
  title: string;
  description?: string;
  totalSpent: number;
  memberIds: CustomSelectOptions[];
}

export interface CreateExpanseInterface {
  title: string;
  spent: number;
  date: string;
  isCompleted: boolean;
  projectId: string;
}

export interface ProjectInterface {
  _id: string;
  title: string;
  description?: string;
  expanses: ExpanseInterface[];
  members: UserInterface[];
  owner: UserInterface;
  totalSpent: number;
}

export interface ExpanseInterface {
  _id: string;
  title: string;
  spent: number;
  date: string;
  isCompleted: boolean;
  projectId: string;
  owner: UserInterface;
}
