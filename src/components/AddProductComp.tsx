import React, {useRef} from 'react';
import { Product } from '../models/product';
import { addProduct } from '../services/productService';


const AddProductComp = () => {


    const nameRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const imageUrlRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newProduct : Product = {
            name: nameRef.current?.value || '',
            price: parseFloat(priceRef.current?.value || '0'),
            description: descriptionRef.current?.value || '',
            imageUrl: imageUrlRef.current?.value || ''
        };


        try{
            await addProduct(newProduct);
            alert('Product added successfully!');
        }
        catch(error){
            console.log(error);
            alert('Failed to add product.');
        }

    };

    return (
        <div>
          <h2>Add Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">Name</label>
              <input type="text" className="form-control" id="productName" name="name" ref={nameRef} required />
            </div>
            <div className="mb-3">
              <label htmlFor="productPrice" className="form-label">Price</label>
              <input type="number" className="form-control" id="productPrice" name="price" ref={priceRef} required />
            </div>
            <div className="mb-3">
              <label htmlFor="productDescription" className="form-label">Description</label>
              <textarea className="form-control" id="productDescription" name="description" ref={descriptionRef} required></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="productImageUrl" className="form-label">Image URL (optional)</label>
              <input type="url" className="form-control" id="productImageUrl" name="imageUrl" ref={imageUrlRef} />
            </div>
            <button type="submit" className="btn btn-primary">Add Product</button>
          </form>
        </div>
      );
};

export default AddProductComp;
