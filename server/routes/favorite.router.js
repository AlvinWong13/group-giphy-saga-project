const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  const sqlText = `
    SELECT "favorites".id, "favorites".image_url, "category".name 
        FROM "favorites"
        JOIN "category" ON "favorites".category_id = "category".id
        ORDER BY "favorites".id DESC;
    `;
  pool.query(sqlText)
    .then((result) => {
      console.log(result.rows);
      
      res.send(result.rows);
    }).catch(err => {
      console.log('ERROR selecting favorites', err);
      res.sendStatus(500)
    })
});

// add a new favorite
router.post('/', (req, res) => {
  const newFavorite = req.body;
  const sqlText = `
      INSERT INTO "favorites" ("image_url") 
        VALUES($1);
      `;
  pool.query(sqlText, [newFavorite.image_url])
  .then((result) => {
    res.sendStatus(200);
  }).catch(err => {
    console.log('Error adding new Favorite', err);
    res.sendStatus(500);
  })
});

// update given favorite with a category id
router.put('/:favId', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  const newCategory = req.body.categoryId;
  const favoriteItem = req.params.id;
  const sqlText = `
      UPDATE "favorites"
        SET "category_id"= $1
        WHERE "favorites".id = $2
      `;
  pool.query(sqlText, [newCategory, favoriteItem])
  .then(() => {res.sendStatus(200);
  }).catch(err => {
    console.log('error changing category', err);
    res.sendStatus(500);
  });
});

// delete a favorite
router.delete('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
