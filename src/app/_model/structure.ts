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
  assurance:string;
  flagship_activity:string;
  adresse: Adresse[];
  network: Network[];
  hours: Hour[]
}
