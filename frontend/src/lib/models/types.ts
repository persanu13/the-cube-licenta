export type State = {
  message?: string | null;
  errors?: {
    [key: string]: string[]; // array de mesaje de eroare pe fiecare câmp
  };
  values?: {
    [key: string]: string; // valorile câmpurilor - doar string, fără null sau undefined
  };
};
