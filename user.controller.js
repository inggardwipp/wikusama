//load model user
const userModel = require(`../models/index`).user;

//load joi
const joi = require(`joi`);

//load Op from sequelize
const { Op } = require("sequelize");

//oad md5 library
const md5 = require(`md5`);

//create a val function
let validateUser = async (input) => {
  //make rules of val
  let rules = joi.object().keys({
    nama_user: joi.string().required(),
    role: joi.string().validate(`kasir`, `admin`, `manager`),
    username: joi.string().required(),
    password: joi.string().min(8),
  });

  //process validation
  let { error } = rules.validate(input);

  //check error val
  if (error) {
    let message = error.details.map((item) => item.message).join(",");
    return {
      status: false,
      message: message,
    };
  }

  return {
    status: trie,
  };
};

//create func to get all user
exports.getUser = async (request, response) => {
  try {
    //get all user using model
    let result = await userModel.findAll();

    //give a response
    return response.json({
      status: true,
      data: result,
    });
  } catch (error) {
    return response.json({
      status: false,
      message: error.message,
    });
  }
};
//create func to find user
exports.findUser = async (request, response) => {
  try {
    //get keyword of search
    let keyword = request.body.keyword;

    //get user based on keyword using model
    let result = await userModel.findAll({
      where: {
        [Op.or]: {
          nama_user: {
            [Op.substring]: keyword,
          },
          role: {
            [Op.substring]: keyword,
          },
          username: {
            [Op.substring]: keyword,
          },
        },
      },
    });

    //give a response
    return response.json({
      status: true,
      data: result,
    });
  } catch (error) {
    return response.json({
      status: false,
      message: error.message,
    });
  }
};

//create func to add user
exports.addUser = async (request, response) => {
  try {
    //val a req
    let resultValidation = validateUser(request.body);
    if (resultValidation.status === false) {
      return response.json({
        status: false,
        message: resultValidation.message,
      });
    }

    //convert pw to md5
    request.body.password = md5(request.body.password);

    //execute insert user using model
    await userModel.create(request.body);

    //give a response
    return response.json({
      status: true,
      message: `Data user berhasil ditambahkan`,
    });
  } catch (error) {
    return response.json({
      status: false,
      message: error.message,
    });
  }
};
//create func to update user
exports.updateUser = async (request, response) => {
  try {
    //get id user
    let id_user = request.params.id_user;

    //val a req body
    let resultValidation = validateUser(request.body);

    //check result val
    if (resultValidation.status === false) {
      return response.json({
        status: false,
        message: resultValidation.message,
      });
    }

    //convert pass to md5 if exist
    if (request.body.password) {
      request.body.password = md5(request.body.password);
    }

    //execute update user using model
    await userModel.update(request.body, { where: { id_user: id_user } });

    //give a response
    return response.json({
      status: true,
      message: `Data user telah diubah`,
    });
  } catch (error) {
    return response.json({
      status: false,
      message: error.message,
    });
  }
};

//create func to delete user
exports.deleteUser = async (request, response) => {
  try {
    //get id user
    let id_user = request.params.id_user;

    //execute delete user using model
    await userModel.destroy({
      where: { id_user: id_user },
    });

    //give a response
    return response.json({
      status: true,
      message: `Data user telah dimusnahkan`,
    });
  } catch (error) {
    return response.json({
      status: false,
      message: error.message,
    });
  }
};
