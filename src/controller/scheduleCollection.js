import Schedule from "../models/Schedule.js";
import User from "../models/users.js";
import Assignment from "../models/Assignment.js";

export const scheduleWasteCollection = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (user.role !== "householder") {
      return res
        .status(401)
        .json({ message: "Only householders can schedule waste collection" });
    }

    const { location, date, loadType, telephone } = req.body;

    const newSchedule = new Schedule({
      householder: userId,
      location,
      date,
      loadType,
      telephone,
    });

    await newSchedule.save();
    return res
      .status(201)
      .json({ message: "Waste collection scheduled successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getHouseholderCollections = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    let collections;

    if (user.role === "householder") {
      collections = await Schedule.find({ householder: userId });
    } else {
      collections = await Schedule.find({});
    }

    return res.status(200).json({ collections });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const assignCollector = async (req, res) => {
  try {
    const adminId = req.user.id;
    const admin = await User.findById(adminId);

    if (admin.role !== "admin") {
      return res
        .status(401)
        .json({ message: "Only admins can assign collectors" });
    }

    const { schedule, collector } = req.body;

    const scheduleData = await Schedule.findById(schedule);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    const collectorData = await User.findById(collector);
    if (!collectorData || collectorData.role !== "collector") {
      return res
        .status(404)
        .json({ message: "Collector not found or not a collector" });
    }

    const newAssignment = new Assignment({
      schedule: schedule,
      collector: collector,
    });

    await newAssignment.save();
    scheduleData.status = "assigned";
    await scheduleData.save();

    return res
      .status(200)
      .json({ message: "Collector assigned successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getAssignedGarbageCollections = async (req, res) => {
  try {
    const collectorId = req.user.id;
    const collector = await User.findById(collectorId);
    if (collector.role !== "collector") {
      return res
        .status(401)
        .json({ message: "Only collectors can view their assignments" });
    }

    const assignments = await Assignment.find({
      collector: collectorId,
    }).populate("schedule");

    return res.status(200).json({ assignments });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
