
//add productos - add carrito

document.querySelector("btn btn-primary" ).addEventListener('click',()=>{

    
    fetch("http://localhost:8080/carts/:id/productos/:id_prod")
            .then((response) => response.json())
            .then((data) => console.log(data));
    
    }
)
