const {Router, query}= require('express');
const {db, admin}= require('../firebase');



const router = Router();

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

 module.exports= router;