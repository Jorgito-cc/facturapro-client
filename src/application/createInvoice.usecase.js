import { createInvoiceApi } from "../infrastructure/invoice.api";

export const createInvoiceUseCase = async (invoice) => {
  return await createInvoiceApi(invoice);
};