import { z } from "zod";
import { addressSchema, completeAddressSchema } from "../schemas/address.schemas";

type TAddress = z.infer<typeof completeAddressSchema>
type TAddressRequest = z.infer<typeof addressSchema>


export { TAddress, TAddressRequest }