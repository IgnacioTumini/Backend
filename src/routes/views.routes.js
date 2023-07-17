import { Router } from "express";


const router = Router();

//chatbox
router.get("/chat", (req, res) => {
  res.render("chat");
});

/*
router.get("/students", async (req, res) => {
  const { page = 1 } = req.query;
  const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } =
    await productsModel.paginate({}, { limit: 10, page, lean: true });
  const students = docs;
  res.render("students", {
    students,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
  });
});
*/
export default router;
