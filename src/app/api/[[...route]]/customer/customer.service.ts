import * as customerRepo from "~/repository/costumer";
import * as customerType from "~/type/customer";
import pagination, { type TQueryPage } from "~/utils/pagination";

export const getsCustomer = async ({ page, perPage }: TQueryPage) => {
  const orderPagination = await pagination({
    page,
    perPage,
    getData: customerRepo.getsCustomer,
    getDataCount: () => customerRepo.getCustamerCount(),
  });

  return orderPagination;
};

export const getOrder = async (id: string) => {
  const customer = await customerRepo.getCustamerFirst(id);
  return customer;
};

export const updateCustamer = async (update: customerType.UpdateCustomerProps,) => {
  const customer = await customerRepo.updateCustamer(update);

  return customer;
};

