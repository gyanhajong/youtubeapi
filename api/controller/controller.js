const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const db = require("../models/models");

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

// Retrieve all Videos from the database.
exports.findAll = (req, res) => {

    const { page, size, title, desc } = req.query;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    
    if(desc) condition.desc = { $regex: new RegExp(desc), $options: "i" };

    const { limit, offset } = getPagination(page, size);
  
    db.paginate(condition, { offset, limit })
      .then((data) => {
        res.send({
          totalPages: data.totalPages,
          currentPage: data.page - 1,
          pageInfo: {
              totalResults: data.totalDocs,
              resultsPerPage: limit
          },
          items: data.docs
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving videos.",
        });
      });
};