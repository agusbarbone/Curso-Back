import { Router } from 'express'
import { uploader } from '../uploader.js'
import { ProductController } from '../dao/controllers/product.controller.mdb.js'

const router = Router()
const controller = new ProductController()

router.get('/', async (req, res) => {
    try {
        const products = await controller.getProducts()
    res.status(200).send({ status: 'OK', data: products })
    } catch (error) {
        res.status(400).json({ error:'TE TIRO ERROR PORQUE USAS EL GAREN CON IGNITE ', message: error})

    }
})

router.post('/', uploader.single('thumbnail'), async (req, res) => {
 try {
       // if (!req.file) return res.status(400).send({ status: 'FIL', data: 'No se pudo subir el archivo' })

       const { title, description, price, code, stock } = req.body
       if (!title || !description || !price || !code || !stock) {
           return res.status(400).send({ status: 'ERR', data: 'Faltan campos obligatorios' })
       }
   
       const newContent = {
           title,
           description,
           price,
           // el obj req.file está disponible porque estamos utilizando Multer como middleware,
           // mediante el objeto uploader que estamos importando e inyectando.
           // thumbnail: req.file.filename,
           code,
           stock
       }
   
       const result = await controller.addProduct(newContent)
       res.status(200).send({ status: 'OK', data: result })
 } catch (error) {
    res.status(400).json({ error:'TE TIRO ERROR PORQUE USAS EL GAREN CON IGNITE ', message: error})
 }
})

export default router
