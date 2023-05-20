const Task = require("../models/Task");

const TaskRoutes = require("express").Router();

TaskRoutes.route("/task")
  .get((req, res, next) => {
    Task.aggregate([
      {
        $match: {
          user_id: req?.auth?._id,
          ...(req?.query?.status && { status: req?.query?.status }),
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $project: {
          title: "$title",
          description: "$description",
          status: "$status",
        },
      },
    ])
      .then((data) => {
        return res.send({
          data,
          status: true,
          message: "All task get successfully",
        });
      })
      .catch(next);
  })
  .post((req, res, next) => {
    Task.create({ ...req?.body, status: "active", user_id: req?.auth?._id })
      .then((data) => {
        return res.send({
          status: true,
          message: "Task created successfully!",
          data,
        });
      })
      .catch(next);
  })
  .put((req, res, next) => {
    if (req?.body?._id) {
      Task.findByIdAndUpdate(req?.body?._id, req?.body, {
        new: true,
        runValidators: true,
      })
        .then((data) => {
          if (data) {
            res.send({
              status: true,
              message: "Task updated successfully!",
              data,
            });
          } else {
            next({ status: 400, message: "Task is not Updted" });
          }
        })
        .catch(next);
    } else {
      next({ status: 400, message: "Please, provide task id" });
    }
  })
  .delete((req, res, next) => {
    try {
      if (req?.query?._id) {
        Task.findOneAndDelete({ _id: req?.query?._id }).then((data) => {
          if (data) {
            res.send({ status: true, message: "Task is deleted" });
          } else {
            next({ status: 400, message: "task is not available" });
          }
        });
      } else {
        next({ status: 400, message: "Please, provide Task Id" });
      }
    } catch (error) {
      next(error);
    }
  });

module.exports = TaskRoutes;
