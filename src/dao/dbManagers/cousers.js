import coursesModel from "../Models/courses.js";

export default class Courses {
  constructor() {
    console.log("trabajando con base de datos");
  }

  getAll = async () => {
    let courses = await coursesModel.find().lean();
    return courses;
  };
  saveCourses = async (course) => {
    let result = await coursesModel.create(course);
    return result;
  };
}
