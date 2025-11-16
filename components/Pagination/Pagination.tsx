'use client';

import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={currentPage - 1}
      onPageChange={(selectedItem) => onPageChange(selectedItem.selected + 1)}
      previousLabel="Prev"
      nextLabel="Next"
      containerClassName={styles.pagination}
      activeClassName={styles.active}
      pageClassName={styles.page}
      previousClassName={styles.page}
      nextClassName={styles.page}
      disabledClassName={styles.disabled}
    />
  );
}
