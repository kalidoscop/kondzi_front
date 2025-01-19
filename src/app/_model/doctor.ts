import { Adresse } from "./adresse";

export interface Doctor {
  id: string;
  first_name: string;
  last_name: string;
  speciality: string;
  email: string;
  tel: string;
  country: string;
  secteur:string;
  activity:string;
  created_at: string;
  updated_at: string;
  adresse: Adresse[];

}
