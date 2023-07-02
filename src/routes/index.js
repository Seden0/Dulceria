const {Router}= require('express');
const {db, admin}= require('../firebase');
const router = Router();
const {FieldValue}= require('firebase-admin/firestore');
router.get('/', async(req, res)=>{

    const querySnapshot = await db.collection('users').get()
 
    const usersget = querySnapshot.docs.map(doc=>({
        id:doc.id,
        ...doc.data()
    }))
    res.send(usersget)

    
})

router.post('/create-user', async (req, res)=>{
    
    const user={
        email:req.body.email,
        password:req.body.password,
        name:req.body.name,
        lastname:req.body.lastname,
        phone:req.body.phone,
    }

    //console.log(user)
    console.log(req.body);

    const querySna = await db.collection('users').add({
        name:user.name,
        lastname:user.lastname,
        phone:user.phone,
        email:user.email,
        password:user.password,
    })
    const users= await admin.createUser({
        email:user.email,
        password:user.password,
        emailVerified:false,
        disabled:false
    });
    res.json(users); 
})

router.put('/update/:id', async(req, res) => {
    try {
      const userRef = await db.collection("users").doc(req.params.id)
      .update({
        ...req.body
      });
      console.log(id);
      res.send(userRef);
    } catch(error) {
      res.send(error);
    }
});



router.delete('/delete/:id', async (req, res)=>{
    try{
        const response =await db.collection('users').doc(req.params['id']).delete();
        res.send(response);
    }catch(error){
        res.send(error);
    }
})


//Leer produtos
router.get('/products', async (req, res) => {
    const querySnapshot = await db.collection('Products').get();
    const products =  querySnapshot.docs.map( doc => ({
        id:doc.id,
        ...doc.data()
    }))
 
    console.log(products);
     res.send(products)
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

//entradas de producto
router.post('/products-entry/:id', async(req, res) => {
    try {
      const userRef = db.collection("Products").doc(req.params.id).collection("entradas")
      
      const userIn = db.collection("Products").doc(req.params.id);
      const newP = await userRef.add({...req.body});
      
      const respo= await userIn.set({'cantidad': FieldValue.increment(req.body.cantidad)},{merge:true})
      
      res.send(newP);
    } catch(error) {
      res.send(error);
    }
});

//salidas de productos
router.post('/products-sale/:id', async(req, res) => {
    try {
      const userRef = db.collection("Products").doc(req.params.id).collection("salidas")
      
      const userIn = db.collection("Products").doc(req.params.id);
      const newP = await userRef.add({...req.body});
      
      const respo= await userIn.set({'cantidad': FieldValue.increment(-(req.body.cantidad))},{merge:true})
      
      res.send(newP);
    } catch(error) {
      res.send(error);
    }
});



module.exports = router;

