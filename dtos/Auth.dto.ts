import { CustomerPayload } from "./Customer.dtos";
import { VandorPayLoad } from "./Vandor.dto";

export type AuthPayload = VandorPayLoad | CustomerPayload; // we use type here becaue interface allows for mostly an object while type can be used for unions and tuples etc
