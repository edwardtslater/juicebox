const express = require('express');
const { getAllTags, getPostsByTagName } = require('../db');

const tagsRouter = express.Router();


tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  

   next();

});

tagsRouter.get('/', async (req, res) => {
    const tags = await getAllTags();
  
    res.send({
      tags
    });
  });

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
  const tagName = req.params.tagName
  
  try {
  const postsByTagname = await getPostsByTagName(tagName);
    
    res.send({posts });
  
  } catch ({ name, message }) {
    // forward the name and message to the error handler
    {
     console.error({ name, message });
    }
  }
});
  module.exports = tagsRouter;