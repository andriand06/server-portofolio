const Hero = require("../models/Hero");
const About = require("../models/About");
const Tech = require("../models/Tech");
const Tab = require("../models/Tab");
const Project = require("../models/Project");
module.exports = {
  hero: async (req, res) => {
    try {
      const hero = await Hero.find();
      res.status(200).json(hero);
    } catch (error) {
      res.status(404).json({
        error: "Error",
      });
    }
  },
  about: async (req, res) => {
    try {
      const about = await About.find();
      const tech = await Tech.find().populate({
        path: "listId",
        select: "name",
      });
      res.status(200).json({
        details: about,
        techList: tech,
      });
    } catch (error) {
      res.status(404).json({
        error: "Error",
      });
    }
  },
  experience: async (req, res) => {
    try {
      const tab = await Tab.find().populate({
        path: "jobId",
        select: "description",
      });
      res.status(200).json(tab);
    } catch (error) {
      res.status(404).json({
        error: "Error",
      });
    }
  },
  work: async (req, res) => {
    try {
      let { limit } = req.query;
      if (!limit) limit = 2;
      let hasMore = false;
      let projectLength = (await Project.find()).length;
      const project = await Project.find().populate({
        path: "toolId",
        select: "name",
      });
      if (projectLength > project.length) hasMore = true;
      res.status(200).json({
        project,
        hasMore,
      });
    } catch (error) {
      res.status(404).json({
        error: "Error",
      });
    }
  },
};
