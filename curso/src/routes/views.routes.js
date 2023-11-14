import { Router } from "express";

const router = Router()

router.get('/', (req, res) => {
    res.render('index', {msg: "sorete"})
})

router.get('/chat', (req, res) => {
    res.render('chat', {msg: "sorete"})
})

export default router