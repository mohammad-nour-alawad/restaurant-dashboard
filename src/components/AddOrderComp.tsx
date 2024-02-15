import React, {useState, useEffect} from 'react';
import { getProducts } from '../services/productService';
import { addOrder } from '../services/orderService';
import { Product } from '../models/product';
import { CartProduct, Order} from '../models/order';


interface CardItem {
  productId: string,
  quantity: number
}

const AddOrderComp = () => {

  const [products, setProducts] = useState<Product[]> ([]);
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
            item.productId === id ? {...item, quantity: Math.max(item.quantity + change, 0)} : item
          ));    
        }else{
          return [...prev, {productId: id, quantity: Math.max(0, change)}]
        }
    });
  };

  const renderCards = () => {
    return products.map(product => (
      <div key={product.id} className='card'>
        <div className='card-body'>
          <h5 className='card-title'>{product.name}</h5>
          <p className='card-text'>{product.description}</p>
          <div className='quantity-controls'>
            <button onClick={() => handleQuantityChange(product.id ? product.id : '', -1)}>-</button>
            <span>{cart.find(item => item.productId === product.id)?.quantity || 0}</span>
            <button onClick={() => handleQuantityChange(product.id ? product.id : '', +1)}>+</button>
          </div>
        </div>
      </div>
    ));
  };

  const submitOrder = async () => {
    const orderedProds = products.filter( p => (
      cart.some(c => c.productId === p.id && c.quantity > 0)
    )).map(p => {
      const quantity = cart.find(c => c.productId === p.id)?.quantity || 0;
      const prod : CartProduct = {
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

  return (
    <div>
      <h2>Add Order</h2>
      <div className='product-cards'>
        {renderCards()}
      </div>
      <button onClick={submitOrder} className='btn btn-primary'>Submit Order</button>
    </div>
  );
  
};

export default AddOrderComp;
