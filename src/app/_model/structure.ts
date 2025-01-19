import { Adresse } from './adresse';
import { Hour } from './hour';
import { Network } from './network';

export interface Structure {
  id: string;
  name: string;
  domaine: string;
  manager_name: string;
  manager_title: string;
  tel: string;
  email: string;
  opening_hours: string;
  activity: string;
  created_at: string;
  updated_at: string;
  type: string;
  country: string;
  assurance:string;
  flagship_activity:string;
  is_garde:boolean;
  adresse: Adresse[];
  network: Network[];
  hours: Hour[]
}
