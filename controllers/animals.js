const { Animal } = require("../sequelize");
const { errorMsg } = require("../msgs/errorsMsg");
const modelName = "Animal";
/* POST method for animal:
Example data in body request:
  {
    "name":"Pinkie",
    "age":12,
    "type":1,
    "direction":"Fossati y Palma, San Antonio"
  }
*/
async function add(req, res, next) {
  try {
    const register = await Animal.create(req.body);
    res.status(200).json(register);
  } catch (error) {
    res.json({ error: error });
  }
}

/*GET method for animals
  fetchs all animals
*/
async function get(req, res, next) {
  try {
    const query = await Animal.findAll();
    res.status(200).json(query);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
/*GET method for animals with id 
fetchs by id
*/
async function getById(req, res, next) {
  try {
    let id = req.params.id;
    const query = await Animal.findOne({ where: { id: id } });
    if (query == null)
      res.status(404).json({
        error: "There is not register with id " + id,
        message: "There was an error",
      });
    res.status(200).json(query);
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "There was an error",
    });
  }
}
/*POST method for update animal with id in url:
example in url, where id is a number:
  baseUrl/api/animal/id
example data in body request, where :
  {
    "name":"pinkie",
    "age":13,
    "type":1
    "direction":"boqueron y fossatti"
  }
*/
async function update(req, res, next) {
  try {
    console.log("entrandooo");
    let data = req.body;
    let id = req.params.id;
    const query = await Animal.findOne({ where: { id: id } });
    console.log(query);
    if (query == null) {
      res.status(404).json({
        error: "There is not register with id " + id,
        message: "There was an error",
      });
      return;
    }
    const dataUpdated = await query.update(data);
    res.status(200).json({ data: dataUpdated });
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "There was an error",
    });
  }
}
/*DELETE metthod to remove data with id:
example in url, where id is a number:
  baseUrl/api/animal/id
*/
async function remove(req, res, next) {
  try {
    let id = req.params.id;
    const result = await Animal.destroy({ where: { id: id } });
    console.log(result);
    if (result === 1) {
      res.status(200).json({ msg: "Deleted succesully", id: id });
      return;
    }
    res.status(404).json({
      error: "There is no register with id " + id,
      message: "There was an error",
    });
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "There was an error",
    });
  }
}

module.exports = { add, get, getById, update, remove };
