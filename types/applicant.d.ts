type GetApplicantList = {
  id: string;
  full_name: string;
  email: string;
  phone_number: BigInteger;
  address: string;
  company_type: string;
  company_name: string;
  company_address: string;
  company_kbli: BigInteger;
  company_phone_number: BigInteger;
  company_fax_number: BigInteger;
  company_authorized_capital: BigInteger;
  company_paid_up_capital: BigInteger;
  company_executives: string;
  // Tambahan untuk file (image)
  photo?: string;
  ktp?: string;
  kk?: string;
  npwp?: string;
  logs?: [];
};
