import mongoose from 'mongoose'
import productModel from '../models/product.models.js'


async function seedProducts(){
    
    const seedProducts = [  
        {title: 'Iphones',type:'iphone 11',price : 450,thumbnail : 'https://http2.mlstatic.com/D_NQ_NP_656548-MLA46114829749_052021-O.jpg', code: 'item1',capacity:20},
        {title:"Iphones",type:'iphone 12',price : 850,thumbnail : 'https://m.media-amazon.com/images/I/41xssMLI2DL._AC_.jpg', code: "item2",capacity:20}, 
        {title:"Iphones",type:'iphone 13', price :950, thumbnail :'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6443/6443174_sd.jpg',code:"item3",capacity:20},
        {title:"Iphones",type:'iphone 14', price :1050, thumbnail :'https://www.ventasrosario.com.ar/wp-content/uploads/2022/09/61bK6PMOC3L._AC_SL1500_.jpg',code:"item4",capacity:40},
        {title:"Ipads",type:'Ipad Pro',price : 900,thumbnail : 'https://m.media-amazon.com/images/I/81+N4PFF7jS._AC_SL1500_.jpg',code:"item5",capacity:20},
        {title:"Ipads",type:'Ipad Air',price : 600, thumbnail :'https://carrello.com.ar/ecom/wp-content/uploads/2022/05/ipad-air-select-wifi-pink-202203.jpg',code:"item6",capacity:20} ,
        {title:"Ipads",type:'Ipad Mini',price : 1200,thumbnail : 'https://m.media-amazon.com/images/I/618hKLi2ljL._AC_SL1500_.jpg',code:"item7",capacity:40},
        {title:"Macbook",type:'Macbook Pro',price : 1500,thumbnail : 'https://www.macstation.com.ar/img/productos/2922-2846-2620-1.jpg',code:"item8",capacity:20} ,
        {title:"Macbook",type:'Macbook Air',price : 2000,thumbnail : 'https://mobilestore.ec/wp-content/uploads/2022/07/MacBook-Air-M2-2022-Mght-Mobile-Store-Ecuador.jpg',code:"item9",capacity:20} ,
        {title:"Macbook",type:'Macbook 24', price :3500, thumbnail :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM-5u68LsuGUhTu3xdC47-EV14PICNqWW3LiiAMw05yJUks4RW&usqp=CAc',code:"item10",capacity:20},
        {title:"Watch",type:'Watch Ultra', price :150,thumbnail : 'https://www.mgmstore.com.ar/1479-large_default/Apple-Watch-Ultra-49mm-Titanium.jpg',code:"item11",capacity:20} ,
        {title:"Watch",type:'Watch Serie8', price :100, thumbnail :'https://http2.mlstatic.com/D_NQ_NP_858093-MLA48096508611_112021-O.webp',code:"item12",capacity:20},
        {title:"Watch",type:'Watch nike', price :500, thumbnail :'https://tecnoselect.com/pub/media/catalog/product/cache/33323691697b683682a920cb116273e9/m/i/mght-pure-platinum-black-nike-45mm.jpg',code:"item13",capacity:40 },
        ]
    
        await productModel.insertMany(seedProducts)
        console.log("Productos insertados")

}

export default seedProducts

