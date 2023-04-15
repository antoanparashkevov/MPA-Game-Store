const router = require('express').Router();

const { getAll, create, getById, deleteById, edit, buyGame } = require("../services/gameService");
const { hasUser } = require("../middlewares/guard");
const parseError = require('../util/errorParser');

router.get('/catalog', async (req, res) => {
    const games = await getAll();
    
    res.render('catalog', {
        title: 'Catalog Page',
        games
    })
})

router.get('/create', hasUser(), (req, res) => {
    res.render('create', {
        title: 'Create Page'
    })
})

router.post('/create', hasUser(), async (req, res) => {
    const formData = req.body;
    formData.price = Number(formData.price);
    formData.owner = req.user._id;
    // console.log('formData (create) >>> ', formData)
    
    try {
        await create(formData)
        res.redirect('/game/catalog')
        
    } catch ( error ) {
        const errors = parseError(error)
        
        res.render('create', {
            title: 'Create Page',
            body: formData,
            errors
        })
    }
})

router.get('/:id/details', async (req, res) => {
    try {
        const game = await getById(req.params.id);
        
        if ( req.user ) {
            if( game.owner.toString() === req.user._id ) {
                game.isOwner = true;
            }
            if( game.boughtBy.map( u => u.toString()).includes(req.user._id.toString())) {
                game.alreadyBought = true;
            }
        }

        res.render('details', {
            title: game['name'],
            game
        })
        
    } catch ( error ) {
        const errors = parseError(error);
        
        res.render('details', {
            title: 'Details page',
            errors
        })
    }
})

router.get('/:id/edit', hasUser(), async (req, res) => {

    try {
        const game = await getById(req.params.id);

        if( game.owner.toString() !== req.user._id ) {
            return res.redirect('/auth/login')
        }

        res.render('edit', {
            title: 'Edit Game',
            game
        })
    } catch ( error ) {
        const errors = parseError(error);

        res.render('edit', {
            title: 'Edit Game',
            errors
        })
    }
})

router.post('/:id/edit', hasUser(), async (req, res) => {
    const formData = req.body;
    formData.price = Number(formData.price);
    
    // console.log('formData (edit) >>> ', formData)

    try {
        const game = await getById(req.params.id);
        
        if( game.owner.toString() !== req.user._id ) {
            return res.redirect('/auth/login')
        }
        
        if( Object.values(formData).some(v => !v) ) {
            throw new Error('All fiels are required!');
        }
        
        await edit(req.params.id, formData)
        res.redirect(`/game/${req.params.id}/details`)

    } catch ( error ) {
        const errors = parseError(error)

        res.render('edit', {
            title: 'Edit Page',
            game: {
                ...formData,
                _id: req.params.id
            },
            errors
        })
    }
})

router.get('/:id/delete', hasUser(), async (req, res) => {
    const game = await getById(req.params.id);
    
    if( game.owner.toString() !== req.user._id ) {
        return res.redirect('/auth/login')
    }

    await deleteById(req.params.id);
    res.redirect('/game/catalog')
   
})

router.get('/:id/buy', hasUser(), async (req, res) => {
    const game = await getById(req.params.id);
    
    try {

        if( game.owner.toString() === req.user._id ) {
            game.isOwner = true;
            throw new Error('You cannot buy your own game!')
        }

        await buyGame(req.params.id, req.user._id);
        res.redirect(`/game/${req.params.id}/details`);
    } catch ( error ) {
        const errors = parseError(error);
        
        res.render('details', {
            title: 'Details Page',
            errors,
            game
        })
    }
   
})


module.exports = router;