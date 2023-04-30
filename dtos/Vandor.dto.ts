//dto means data transfer object
export interface CreateVandorInput {
  name: string;
  ownerName: string;
  foodType: [string];
  pinCode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

export interface VandorLoginInputs {
  email: string;
  password: string;
}

export interface VandorPayLoad {
  _id: string;
  email: string;
  name: string;
  foodTypes: [string];
}

export interface EditedVandorInput {
  phone: string;
  name: string;
  foodType: [string];
  address: string;
}
