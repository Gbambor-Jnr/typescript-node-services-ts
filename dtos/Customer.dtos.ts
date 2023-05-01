import { IsEmail, IsEmpty, Length } from "class-validator";

export class CreateCustomerInput {
  @IsEmail()
  email: string;

  // @IsEmpty()
  @Length(7, 12)
  phone: string;

  //@IsEmpty()
  @Length(6, 12) //go to typescript config //StrictpropertyInitialization:false  at number 90 and experimentalDecorators:true at number 17 uncomment to stop this error
  password: string;
}

export class CustomerLoginInputs {
  @IsEmail()
  email: string;

  @Length(7, 12)
  password: string;
}

export interface CustomerPayload {
  _id: string;
  email: string;
  verified: boolean;
}

export class EditCustomerProfileInputs {
  @Length(3, 16)
  firstName: string;

  @Length(3, 16)
  lastName: string;

  @Length(5, 20)
  address: string;
}
