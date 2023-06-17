const { Router } = require('express');
const {db} = require('../firebase');

const router = Router();

router.get('/', async (req, res) => {
    const querySnapshot = await db.collection('products').get();
    const products =  querySnapshot.docs.map( doc => ({
     id: doc.id,
     nombre_p: doc.data().nombre_p,
     descripcion: doc.data().descripcion,
     marca_p: doc.data().marca_p,
     catidad_p: doc.data().cantidad_p,
     tipo: doc.data().tipo,
     almacenar: doc.data().almacenar,
     responsable: doc.data().responsable,
     categoria: {
        nombre_c: doc.nombre_c,
     }
    }))
 
    console.log(products);
     res.send('Hola')
 })
 

 module.exports = router;