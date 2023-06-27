const { Router } = require('express');
const {db} = require('../firebase');
const { clientSecret } = require('firebase-tools/lib/api');

const router = Router();

//Leer produtos
router.get('/products', async (req, res) => {
    const querySnapshot = await db.collection('products').get();
    const products =  querySnapshot.docs.map( doc => ({
     id: doc.id,
     nombre_p: doc.data().nombre_p,
     descripcion: doc.data().descripcion,
     marca_p: doc.data().marca_p,
     cantidad_p: doc.data().cantidad_p,
     tipo: doc.data().tipo,
     almacenar: doc.data().almacenar,
     responsable: doc.data().responsable
    }))
 
    console.log(products);
     res.send('Hola')
 })

 //Agregar productos
router.post('/new-products', async (req, res) => {
    const { nombre_p, descripcion, marca_p, cantidad_p, tipo, almacenar, responsable} = req.body
   //Se envia hacia la BD
    await db.collection('products').add({
    nombre_p, 
    descripcion, 
    marca_p, 
    cantidad_p, 
    tipo, 
    almacenar, 
    responsable
    })
    //De vuelvo cliente
    res.send('Se agrego nuevo producto');
    
})

//Editar productos mediante ID
router.get('/edit-products/:id', async (req, res) => {

    console.log(req.params.id);

    const doc = await db.collection('products').doc(req.params.id).get()

    console.log({
        id: doc.id,
        nombre_p: doc.data().nombre_p,
        descripcion: doc.data().descripcion,
        marca_p: doc.data().marca_p,
        cantidad_p: doc.data().cantidad_p,
        tipo: doc.data().tipo,
        almacenar: doc.data().almacenar,
        responsable: doc.data().responsable
    });
    res.send('Editar producto');
})

//Eliminar producto
router.get('/delete-products/:id', async (req, res) =>{
    await db.collection('products').doc(req.params.id).delete()
    res.send('Producto eliminado');
})

//Actualizar producto por ID 
router.post('/update-products/:id', async (req, res) => {
    
    const {id} = req.params;

   await db.collection('products').doc(id).update(req.body)

    res.send('Producto actualizado');
})

 module.exports = router;