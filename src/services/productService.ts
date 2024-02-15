import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { Product } from '../models/product';
import db from './firebaseConfig';

export const addProduct = async (product: Product) => {
    try{
        const doc = await addDoc(collection(db,'products'),product);
        console.log(doc.id);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}


export const getProducts = async () : Promise<Product[]> => {
    try{
        const query = await getDocs(collection(db, 'products'));
        const products : Product[] = [] ;
        
        query.forEach((doc) => {
            products.push({id: doc.id, ...doc.data() as Product});
        });
        return products;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}


export const deleteProduct = async(productId : string) : Promise<void> => {
    try{
        await deleteDoc(doc(db, 'products', productId));
    }
    catch (error){
        console.log(error);
        throw error;
    }
}