import { Router } from "express";
import Courses from "../dao/dbManagers/carts.js";

const courseManager = new Courses();
const router = Router();

router.get("/", async (req, res) => {
  let courses = await courseManager.getAll();
  res.render({ status: "success", payload: courses });
});

router.post("/", async (req, res) => {
  const { title, description } = req.body;
  let newCourse = {
    title,
    description,
    teacher: "Sin asignar",
    students: [],
  };
  const result = await courseManager.saveCourses(newCourse);
  res.send({ status: "success", payload: result });
});

export default router;
