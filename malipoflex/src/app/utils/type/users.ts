export interface User {
  member_id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  pin: string;
  national_id: string;
  kra_pin: string;
  next_of_kin: string;
  next_of_kin_id: string;
  date: string;
  status?: string;
}