type GetPackageList = {
  id: string;
  title: string;
  price: number;
  description: string;
  package_list?: {
    bonus_name: string;
  }[];
};
