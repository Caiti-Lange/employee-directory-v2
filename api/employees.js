import express from "express";
import employees, {getEmployeeById, addEmployee} from "../db/employees.js"

const employeeRouter = express.Router();

employeeRouter
    .route("/")
    .get((_req, response) => {
        response.send(employees);
    })
    .post((req, res) => {
        if (!req.body) {
            return res.status(400).send("New employees must have a name")
        }

        const newEmployee = addEmployee(req.body);
        res.status(201).send(newEmployee);
    });

employeeRouter.route("/:id").get((req, res) => {
    const { id } = req.params;

    const singleEmployee = getEmployeeById(id);

    if (!singleEmployee) {
        return req.status(404).send({ message: `No employee with the id of ${id}` });
    }

    res.send(singleEmployee);
});

export default employeeRouter;