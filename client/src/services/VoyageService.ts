import axiosConfig from "../configs/AxiosConfig";

export const getVoyageByInovice = ({ invoiceId }: { invoiceId: string }) : Promise<ResponseSuccessType<VoyageType[]>> =>
  axiosConfig.get(`/voyages/get-by-invoice/${invoiceId}`);
