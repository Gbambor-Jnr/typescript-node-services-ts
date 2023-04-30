import { VandorPayLoad } from "./Vandor.dto";

export type AuthPayload = VandorPayLoad; // we use type here becaue interface allows for mostly an object while type can be used for unions and tuples etc
