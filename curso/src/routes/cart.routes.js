import { Router } from 'express'

const router = Router()

const cart = []

let idCounter = 0

router.post('/', (req, res) => {
    res.status(200).send(req.body)
})

router.get('/:cid', (req, res) => {

})

router.post('/:cid/product/:pid', (req, res) => {

})

export default router