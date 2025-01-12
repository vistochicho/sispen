export interface GetMenuItem {
  id: string;
  name: string;
  icon: string;
  path?: string | null;
  subMenu?: { name: string; path: string }[];
}
