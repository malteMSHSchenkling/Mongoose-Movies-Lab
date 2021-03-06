const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/celebrity.js');

/* GET all Celebrities */
router.get('/', (req, res, next) => {
    Celebrity.find()
    .then(allCelebsFromDB => {
      console.log({celeb: allCelebsFromDB});
      res.render('celebrities/index.hbs', {celeb: allCelebsFromDB});
    })
    .catch(error => {
      console.log(error);
    });
  });
  
  /* Add new Celebrity Step 2 */
  router.post('/', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    const newCelebrity = new Celebrity({ name, occupation, catchPhrase });
    newCelebrity.save()
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(error => {
      console.log(error);
      res.render('celebrities/new.hbs');
    });
  });
  
  /* Add new Celebrity Step 1 */
  router.get('/new', (req, res, next) => {
      res.render('celebrities/new.hbs');
  });
  
  /* Delete single Celebrity*/
  router.get('/:id/delete', (req, res, next) => {
    Celebrity.findByIdAndRemove({ '_id': req.params.id })
    .then(oneCelebFromDB => {
      console.log({celeb: oneCelebFromDB});
      res.redirect('/celebrities');
    })
    .catch(error => {
      console.log(error);
    });
  });
  
  /* Edit single Celebrity Step 1 */
  router.get('/:id/edit', (req, res, next) => {
    Celebrity.findOne({ '_id': req.params.id })
    .then(oneCelebFromDB => {
      console.log({celeb: oneCelebFromDB});
      res.render('celebrities/edit', {celeb: oneCelebFromDB});
    })
    .catch(error => {
      console.log(error);
    });
  });
  
  /* Edit single Celebrity Step 2 */
  router.post('/:id', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.update({_id: req.params.id}, {$set: { name, occupation, catchPhrase }})
    .then(newCeleb => {
      res.redirect('/celebrities');
    })
    .catch(error => {
      console.log(error);
    });
  })
  
  /* Find single Celebrity */
  router.get('/:id', (req, res, next) => {
    Celebrity.findOne({ '_id': req.params.id })
    .then(oneCelebFromDB => {
      console.log({celeb: oneCelebFromDB});
      res.render('celebrities/show.hbs', {celeb: oneCelebFromDB});
    })
    .catch(error => {
      console.log(error);
    });
  });

module.exports = router;
