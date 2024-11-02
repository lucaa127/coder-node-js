const socket = io('',{});

socket.on('server:product-data', data => {

const arrData = [];
arrData.push(...data);
    //dataToTable(...arrData);

render(arrData)

});

function deleteProduct(prod_id){   
    fetch(`/api/products/${prod_id}`, {
        method: 'DELETE'
      })
        .then(response => response.text())
        .catch(err => console.error(err))
        .finally(
            socket.emit('client:delete-product', prod_id)
        );
        
    }

const form = document.querySelector('#form');
form.addEventListener('submit', e => {
    e.preventDefault()

    const data = {title: form[0].value, price: form[1].value, description: form[2].value, category: form[3].value};
    form.reset();
    socket.emit('client:product-data', data);

});

function render(data) {   
    const prod_table = data.map((prod)=>{
        return `<tr>
        <td>${prod.title}</td>
        <td>${prod.price}</td>
        <td>${prod.description}</td>
        <td onclick="deleteProduct(${prod.idNumber})"> X </td> 
        </tr>`;
    }).join('');  
    document.querySelector('#tabla').innerHTML = prod_table;
}


function test(id){
    console.log(id)
    
}

