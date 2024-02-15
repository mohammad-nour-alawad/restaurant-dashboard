import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/productService';
import { addOrder } from '../services/orderService';
import { Product } from '../models/product';
import { CartProduct, Order } from '../models/order';
import Swal from 'sweetalert2';


interface CardItem {
  productId: string,
  quantity: number
}

const AddOrderComp = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CardItem[]>([])


  useEffect(() => {
    const fetchProds = async () => {
      const prods = await getProducts();
      setProducts(prods);
    };

    fetchProds();
  }, [])


  const handleQuantityChange = (id: string, change: number) => {
    setCart(prev => {
      const prod = prev.find(item => item.productId === id);
      if (prod) {
        return prev.map(item => (
          item.productId === id ? { ...item, quantity: Math.max(item.quantity + change, 0) } : item
        ));
      } else {
        return [...prev, { productId: id, quantity: Math.max(0, change) }]
      }
    });
  };
  const renderCards = () => {
    return (
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-sm-12 col-md-6 col-lg-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <div className="quantity-controls">
                  <button className="btn btn-secondary btn-sm mr-2" onClick={() => handleQuantityChange(product.id ?? '', -1)}>-</button>
                  <span className="quantity-value mx-2">{cart.find(item => item.productId === product.id)?.quantity || 0}</span>
                  <button className="btn btn-primary btn-sm ml-2" onClick={() => handleQuantityChange(product.id ?? '', 1)}>+</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };


  const submitOrder = async () => {
    const orderedProds = products.filter(p => (
      cart.some(c => c.productId === p.id && c.quantity > 0)
    )).map(p => {
      const quantity = cart.find(c => c.productId === p.id)?.quantity || 0;
      const prod: CartProduct = {
        product: p,
        quantity
      }
      return prod;
    });

    let total = 0;
    orderedProds.forEach(p => {
      total += p.product.price * (cart.find(c => c.productId === p.product.id)?.quantity || 0);
    });

    const order: Order = {
      date: new Date(),
      total,
      products: orderedProds
    }

    addOrder(order);
  }

  const handleOrderSubmit = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to submit this order?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, submit it!'
    }).then((result) => {
      if (result.isConfirmed) {
        submitOrder();
        Swal.fire(
          'Submitted!',
          'Your order has been submitted successfully.',
          'success'
        );
        setCart([]);
      }
    });
  };
  
  return (
    <>
      <div className="row justify-content-between">
        <div className="col">
          <h2>Add Order</h2>
        </div>
        <div className="col-auto">
          <button onClick={handleOrderSubmit} className='btn btn-primary'>Submit Order</button>
        </div>
      </div>
      <div className='product-cards'>
        {renderCards()}
      </div>
    </>
  );

};

export default AddOrderComp;
