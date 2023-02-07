const router = require('express').Router();
const { Category, Product } = require('../../models');

// Get all route for /api/categories/
// Try setting finding all categorydata in json including product, send data or catch error response
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Our get route by id, we use findbypk to find the destructured category id including the product model, if not the category data we are looking for, send error and message
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Create new category POST function at api/categories/
// Function will try to create a new category, only when request is made to create, we will then send over the newly created category date over as a response.
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Our delete by id function will delete the category by using the destroy method where tells us the deconstructured location, if the category data does not match, we will send error.
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {id: req.params.id,}
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
