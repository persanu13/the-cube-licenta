export type State = {
  succes?: boolean;
  message?: string | null;
  errors?: {
    [key: string]: string[]; // array de mesaje de eroare pe fiecare câmp
  };
  values?: {
    [key: string]: string | number; // valorile câmpurilor - doar string, fără null sau undefined
  };
};
