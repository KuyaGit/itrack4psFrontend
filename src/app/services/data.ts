export interface accountuser {
  accountuser_id : number;
  email : string;
  password : string;
  account_type : number;
}

export interface accoundetails {
  accoundetails_id : number;
  fName : string;
  lName : string;
  address : string;
  schoolName : string;
  householdNumber : string;
  profilePic : string;
}

export interface child_beneficiary{
  child_id : number;
  accoundetails_id : number;
  schoolName : string;
  beneficiary_status : number;
  fName: string;
  lName: string;
  birthdate: string;
  snhcourse: string;
  collegecourse: string;
  other_status: string;
  profile_piclink: string;
}
