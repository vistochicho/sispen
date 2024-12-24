type GetPackageList = {
  id: string;
  plan: string;
  price: number;
  description: string;
  benefits?: string[{ id: string; name: string }];
  status: string;
};
