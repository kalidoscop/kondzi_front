import { Adresse } from "./adresse";
import { Tel } from "./tel";

export interface Doctor {
  id: string;
  first_name: string;
  last_name: string;
  speciality: string;
  email: string;
  tel: Tel[];
  country: string;
  city: string;
  secteur:string;
  activity:string;
  social:string;
  created_at: string;
  updated_at: string;
  adresse: Adresse[];

}
