export interface Ong {
  id?: string;
  name: string;
  email: string;
  whatsapp: string;
  city: string;
  uf: string;
}

export const initialOng = {
  name: '',
  email: '',
  whatsapp: '',
  city: '',
  uf: ''
}

export interface Incident {
  id?: Number;
  title: string;
  description: string;
  value: string;
}

export const initialIncident = {
  title: '',
  description: '',
  value: ''
}