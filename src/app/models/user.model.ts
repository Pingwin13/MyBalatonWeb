export interface User {
  id: number;
  username: string;
  email: string;
  name?: string;
  avatar?: string;
  isAdmin?: boolean;
  registrationDate?: Date;
  contributions?: number;
  favoriteLocations?: Array<{ id: number; name: string }>;
}
