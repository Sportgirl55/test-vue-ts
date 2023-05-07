export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: object;
    [key: string]: any;
  };
  phone: string;
  website: string;
  company: { name: string; catchPhrase: string; bs: string; [key: string]: any };
  [key: string]: any;
}
