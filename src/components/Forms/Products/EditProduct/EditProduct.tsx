import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';

import ProductForm from '../ProductForm/ProductForm';
import useTreeCategories from '../../../../hooks/useTreeCategories';
import { IGetProductById, IUpdateProduct } from '../../../../interfaces/IProducts';
import { AppDispatch, RootState } from '../../../../store/store';
import { root } from '../../../../api/config';
import { updateProductRequest } from '../../../../store/actions/products.actions';
import { productValidationShema } from '../ProductForm/productFormHelpers';
import { IGetTreeCategoriesResponse, ICharResponse } from '../../../../interfaces/ITreeCategory';
import { getEditCharValuesObject } from './getEditCharValuesObject';

interface ILocation {
  from: { pathname: string };
}

const EditProduct: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<ILocation>();
  const { data: categories } = useTreeCategories();

  const category: IGetTreeCategoriesResponse = useSelector(
    (state: RootState) => state.treeCategories.currentTreeCategory
  );
  const product: IGetProductById = useSelector((state: RootState) => state.products.currentProduct);

  const handleGoBack = () => {
    history.push(location?.state?.from || '/products');
  };

  const [validation, setValidation] = useState(productValidationShema);

  // DELETE IMAGES
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);

  // FORMIK
  const initialValues = {
    name: product ? product.name : '',
    price: product.price ? product.price : '',
    description: product ? product.description : '',
    categoryName: product ? product.category.name : '',
    categoryId: product ? product.category?.id : '',
    files: product ? product.files : {},
    key: product ? product.key : '',
    subForm: {},
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validation,
    onSubmit: (values: IUpdateProduct): void => {
      const { subForm, ...productValues } = values;

      const chars: ICharResponse[] =
        category && category.characteristicGroup.map((group) => group.characteristic).flat(1);

      dispatch(
        updateProductRequest(
          product.id,
          productValues,
          getEditCharValuesObject(chars, product, formik),
          imagesToDelete
        )
      );
      formik.setSubmitting(false);
    },
  });

  // HANDLE IMAGES
  const [images, setImages] = useState<File[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  const imagesFD = new FormData();
  if (images.length) {
    for (let image of images) {
      imagesFD.append('images', image);
    }
    formik.values.files = imagesFD;
  } else {
    formik.values.files = product.files;
  }

  useEffect(() => {
    if (product.files?.length) {
      setImagesPreview(
        product.files
          .filter((file) => !file.name.includes('cropped'))
          .map((file) => `${root}/static/uploads/${file.name}`)
      );
    }
  }, [product.files]);

  const handleImageChange = (fileList: File[]) => {
    setImages((prev) => prev.concat(fileList));

    const mappedFiles = fileList.map((file) => URL.createObjectURL(file));
    setImagesPreview((prev) => prev.concat(mappedFiles));
  };

  const handleDeleteImg = (img, idx) => {
    const imgName = !img.includes('blob') && img.split('/static/uploads/')[1];
    const existingImg = imgName && product.files.filter((file) => file.name.includes(imgName));

    if (existingImg.length) {
      setImagesToDelete(imagesToDelete.concat(existingImg.map((img) => img.name)));
    } else {
      setImages(images.filter((_, imgIdx) => imgIdx !== idx));
    }

    setImagesPreview(imagesPreview.filter((image) => image !== img));
  };

  return (
    <ProductForm
      editMode={true}
      formik={formik}
      handleGoBack={handleGoBack}
      categories={categories}
      handleImageChange={handleImageChange}
      imagesPreview={imagesPreview}
      handleDeleteImg={handleDeleteImg}
      setValidation={setValidation}
    />
  );
};

export default EditProduct;
