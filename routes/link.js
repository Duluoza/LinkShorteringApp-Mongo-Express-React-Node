const {Router} = require('express');
const auth = require('../middleware/authMiddleware');
const config = require('config');
const shortid = require('shortid');
const Link = require('../models/Link');
const router = Router();

router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get("baseUrl");
        const { from } = req.body;

        const code = shortid.generate();

        const existing = await Link.findOne({ from });

        if(existing) {
            return res.json({ link: existing });
        }

        const to = baseUrl + '/t/' + code;
        const link = new Link ({code, to, from, owner: req.user.userId});

        await link.save();

        res.status(201).json({ link });
    }
    catch (e) {
        res.status(500).json( { message: "Что-то пошло не так" } );
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({ owner: req.user.userId });
        res.json(links);
    }
    catch (e) {
        res.status(500).json( { message: "Что-то пошло не так" } );
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById({_id: req.params.id});
        res.json(link);
    }
    catch (e) {
        res.status(500).json( { message: "Что-то пошло не так" } );
    }
});

module.exports = router;