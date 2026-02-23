export interface PassportGuest {
  id: number;
  prefix: string;
  lastName: string;
  firstName: string;
  middleName: string;
  gender: string;
  dob: string;
  nationality: string;
  passportFile?: File | null;
  passportFileName?: string;
  passport?: string; // S3 URL returned from upload
}