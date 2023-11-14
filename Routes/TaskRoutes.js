import express from "express"
import { createTask, getAllTask, getTaskByName, updateTaskStatus } from "../Controllers/taskController.js"

const taskRouter = express.Router()

taskRouter.route("/createtask").post(createTask)

taskRouter.route("/updatetask").put(updateTaskStatus)

taskRouter.route("/gettask/:assignedto").get(getTaskByName)

taskRouter.route("/gettask").get(getAllTask)

export default taskRouter