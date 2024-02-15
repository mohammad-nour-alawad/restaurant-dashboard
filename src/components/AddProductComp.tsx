import React, {useRef} from 'react';
import { Product } from '../models/product';
import { addProduct } from '../services/productService';
import styles from '../styles/AddProductForm.module.css';
import Swal from 'sweetalert2';

const AddProductComp = () => {


    const nameRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const imageUrlRef = useRef<HTMLInputElement>(null);


    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
    
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to add this product?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, add it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const newProduct : Product = {
            name: nameRef.current?.value || '',
            price: parseFloat(priceRef.current?.value || '0'),
            description: descriptionRef.current?.value || '',
            imageUrl: imageUrlRef.current?.value || ''
          };
          await addProduct(newProduct);
          Swal.fire(
            'Added!',
            'Your product has been added.',
            'success'
          ).then(()=>{
            if (nameRef.current) nameRef.current.value = '';
            if (priceRef.current) priceRef.current.value = '';
            if (descriptionRef.current) descriptionRef.current.value = '';
            if (imageUrlRef.current) imageUrlRef.current.value = '';
          });
        }
      });
    };
    return (
      <div className={styles.formContainer}>
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="productName" className={`form-label ${styles.customLabel}`}>Name</label>
            <input type="text" className={`form-control ${styles.customInput}`} id="productName" name="name" ref={nameRef} required />
          </div>
          <div className="mb-3">
            <label htmlFor="productPrice" className={`form-label ${styles.customLabel}`}>Price</label>
            <input type="number" className={`form-control ${styles.customInput}`} id="productPrice" name="price" ref={priceRef} required />
          </div>
          <div className="mb-3">
            <label htmlFor="productDescription" className={`form-label ${styles.customLabel}`}>Description</label>
            <textarea className={`form-control ${styles.customInput}`} id="productDescription" name="description" ref={descriptionRef} required></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="productImageUrl" className={`form-label ${styles.customLabel}`}>Image URL (optional)</label>
            <input type="url" className={`form-control ${styles.customInput}`} id="productImageUrl" name="imageUrl" ref={imageUrlRef} />
          </div>
          <button type="submit" className={`btn ${styles.customSubmitBtn}`}>Add Product</button>
        </form>
      </div>
    );
    
};

export default AddProductComp;
