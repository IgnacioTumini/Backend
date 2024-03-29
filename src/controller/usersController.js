import { UServices } from "../dao/Models/Service/users.service.js";
import { logger } from "../utils/logs/logger.js";

class UserController {
  getAll = async (req, res) => {
    let users = await UServices.getAll();
    if (!users)
      return res.status(500).send({
        status: "error",
        error: "Couldn't get users due to internal error",
      });
    res.send({ status: "success", payload: users });
  };
  getAllRender = async (req, res) => {
    try {
      const users = await UServices.getAll();

      return res.status(200).render("users", { users });
    } catch (error) {
      console.log(error);
    }
  };
  create = async (req, res) => {
    let { first_name, last_name, email, age, role, password } = req.body;
    if (!first_name || !last_name || !email || !age || !role)
      return res
        .status(400)
        .send({ status: "error", error: "Incomplete values" });
    let result = await UServices.create({
      first_name,
      last_name,
      email,
      age,
      role,
      gender,
      password,
    });
    if (!result)
      return res.status(500).send({ status: "success", payload: result });
    res.send({ status: "success", payload: result });
  };
  updateRole = async (req, res) => {
    try {
      const uid = req.params.uid;
      const userUpdateRole = await UServices.updateRole(uid);
      return res.status(201).json({
        payload: userUpdateRole,
      });
    } catch (error) {
      logger.error(error);
    }
  };
  update = async (req, res) => {
    try {
      const { id } = req.params;
      const { firstName, lastName, email } = req.body;
      try {
        const userUptaded = await UServices.update(
          id,
          firstName,
          lastName,
          email
        );
        if (userUptaded.matchedCount > 0) {
          return res.status(201).json({
            status: "success",
            msg: "user update",
            payload: {},
          });
        } else {
          return res.status(404).json({
            status: "error",
            msg: "user not found",
            payload: {},
          });
        }
      } catch (e) {
        return res.status(500).json({
          status: "error",
          msg: "db server error while updating user",
          payload: {},
        });
      }
    } catch (e) {
      logger.error(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
    }
  };
  async getUserById(id) {
    const user = await UServices.getUserById(id);
    return user;
  }

  deleteInactive = async (req, res) => {
    try {
      let result = await UServices.deleteInactive();
      console.log(result);
      res.redirect("/users");
    } catch (e) {
      logger.error("error en controller de USERS, funcion de userManager");
      res.send("Error, vuelve a intentarlo");
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await UServices.delete(id);
      if (result?.deletedCount > 0) {
        return res.status(200).json({
          status: "success",
          msg: "user deleted",
          payload: {},
        });
      } else {
        return res.status(404).json({
          status: "error",
          msg: "user not found",
          payload: {},
        });
      }
    } catch (e) {
      logger.error(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
    }
  };
}
export const userController = new UserController();
