import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../services/productService';
import { Product } from '../models/product';
import Swal from 'sweetalert2';


const DeleteProductComp = () => {

  const [products, setProducts] = useState<Product[]>([])
  
  const fetchProds = async () => {
    const prods = await getProducts();
    setProducts(prods);
  };

  useEffect(() => {
    fetchProds();
  }, []);


  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteProduct(id);
        Swal.fire(
          'Deleted!',
          'The product has been deleted.',
          'success'
        );
        fetchProds();
      }
    });
  };

  const renderCards = () => {
    return products.map(product => (
      <div key={product.id} className='card'>
        <div className='card-body'>
          <h5 className='card-title'>{product.name}</h5>
          <p className='card-text'>{product.description}</p>
          {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
          <div className='quantity-controls'>
            <button className="btn btn-danger" onClick={() => handleDelete(product.id ? product.id : '')}>Delete</button>
          </div>
        </div>
      </div>
    ));
  };


  return (
    <div>
      <h2>Delete Product</h2>
      {renderCards()}
    </div>
  );
};

export default DeleteProductComp;
