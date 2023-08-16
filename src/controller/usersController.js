import { UServices } from "../dao/Service/users.service.js";

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
      console.log(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
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
      console.log(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
    }
  };
}
export const userController = new UserController();
