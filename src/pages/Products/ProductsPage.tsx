import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';

import ProductsTable from '../../components/Tables/Products/ProductsTable';
import AddBtn from '../../components/AddBtn/AddBtn';
import ColumnsBtn from '../../components/ColumnsBtn/ColumnsBtn';
import ColumnsMenu from '../../components/ColumnsMenu/ColumnsMenu';
import useProducts from '../../hooks/useProducts';
import styles from './ProductsPage.module.scss';

enum cols {
  id = 'ID',
  mainImg = 'Головне зображення',
  name = 'Назва',
  price = 'Ціна',
  description = 'Опис',
  categoryName = 'Категорія',
  key = 'URL ключ',
  files = 'Зображення',
  createdAt = 'Створено',
  updatedAt = 'Оновлено',
  notcall = 'Не передзвонювати',
}

let initialActiveColums: string[] = [
  cols.id,
  cols.mainImg,
  cols.name,
  cols.price,
  cols.description,
  cols.categoryName,
  cols.key,
  cols.files,
  cols.createdAt,
  cols.updatedAt,
];

if (localStorage.getItem('PRODUCTS_SETTINGS')) {
  initialActiveColums = localStorage.getItem('PRODUCTS_SETTINGS')!.split(',');
}

const Products: React.FC = () => {
  const location = useLocation();

  const { list, loading, isSearch } = useProducts();

  const [showColumnsMenu, setShowColumnsMenu] = useState<boolean>(false);
  const [activeColumns, setActiveColumns] = useState<string[]>(initialActiveColums);

  let searchValue = '';
  if (sessionStorage.getItem('searchValue')) {
    searchValue = String(sessionStorage.getItem('searchValue'));
  }

  let currentPage = 1;
  if (sessionStorage.getItem('productsCurrentPage')) {
    currentPage = Number(sessionStorage.getItem('productsCurrentPage'));
  }

  localStorage.setItem('PRODUCTS_SETTINGS', activeColumns.toString());

  const handleColumns = (column: string) =>
    activeColumns.includes(column)
      ? setActiveColumns(activeColumns.filter((col) => col !== column))
      : setActiveColumns([...activeColumns, column]);

  return (
    <>
      {loading && <LinearProgress />}

      <div className={styles.container}>
        {showColumnsMenu && (
          <ColumnsMenu
            allColumns={cols}
            activeColumns={activeColumns}
            showColumnsMenu={showColumnsMenu}
            setShowColumnsMenu={setShowColumnsMenu}
            handleColumns={handleColumns}
          />
        )}

        <div className={styles['header-btn-wrapper']}>
          <div className={styles.headerButtons}>
            <Link
              to={{
                pathname: '/product/add',
                state: { from: `${location.pathname}` },
              }}
            >
              <AddBtn title="Додати" handleAdd={undefined} />
            </Link>
            <ColumnsBtn handleClick={() => setShowColumnsMenu(true)} />
          </div>
        </div>
        <div className={styles['table-wrapper']}>
          {list && (
            <ProductsTable
              list={list}
              activeColumns={activeColumns}
              isSearch={isSearch}
              searchValue={searchValue}
              currentPage={currentPage}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
