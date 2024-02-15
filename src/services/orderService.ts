import { addDoc, collection, getDocs } from "firebase/firestore";
import { Order } from "../models/order";
import db from "./firebaseConfig";


export const addOrder = async (order: Order) => {
    try{
        const doc = await addDoc(collection(db,'orders'), order);
        console.log(doc.id);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}


export const getOrders = async () : Promise<Order[]> => {
    try{
        const query = await getDocs(collection(db, 'orders'));
        const orders : Order[] = [] ;
        
        query.forEach((doc) => {
            orders.push({id: doc.id, ...doc.data() as Order});
        });
        return orders;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}