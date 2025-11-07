/* eslint-disable @typescript-eslint/no-explicit-any */
import { ButtonElement } from "./Buttons/ButtonElement";

type PaginationProps = {
  handleSearch?: (values: any) => void;
  pagination: {
    lastPage?: number;
    firstPage?: number;
    currentPage?: number;
    nextPage?: number;
    previousPage?: number;
  };
  form: any;
};

const Pagination = ({ handleSearch, pagination, form }: PaginationProps) => {
  const pageSize = 10;
  const currentPage = form.getValues("pageIndex") || 1;
  const firstPage = pagination.firstPage ?? 1;
  const lastPage = pagination.lastPage ?? firstPage;
  const nextPage = currentPage < lastPage ? currentPage + 1 : undefined;
  const previousPage = pagination.previousPage ?? nextPage - 1;
  const onPageChange = (page: number | undefined) => {
    if (page !== undefined) {
      form.setValue("pageIndex", page);
      form.setValue("pageSize", pageSize);
      form.setValue("isPagination", true);
      form.handleSubmit(handleSearch)();
    }
  };

  return (
    <div className="container flex mt-3 justify-center">
      <div className="flex gap-1">
        <ButtonElement
          disabled={currentPage === firstPage}
          text="First Page"
          type="button"
          handleClick={() => onPageChange(firstPage)}
        />
        <ButtonElement
          disabled={currentPage === previousPage}
          text="Previous Page"
          type="button"
          handleClick={() => onPageChange(previousPage)}
        />

        <ButtonElement
          disabled={nextPage === undefined}
          text="Next Page"
          type="button"
          handleClick={() => onPageChange(nextPage)}
        />
        <ButtonElement
          disabled={currentPage === lastPage}
          text="Last Page"
          type="button"
          handleClick={() => onPageChange(lastPage)}
        />
      </div>
    </div>
  );
};

export default Pagination;
