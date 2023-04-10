const Hero = require("../models/Hero");
const About = require("../models/About");
const Tech = require("../models/Tech");
const List = require("../models/List");
const Tab = require("../models/Tab");
const Job = require("../models/Job");
const Project = require("../models/Project");
const Tool = require("../models/Tool");
const User = require("../models/User");
const fs = require("fs-extra");
const path = require("path");
const bcrypt = require("bcrypt");
module.exports = {
  viewSignin: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      if (req.session.user == null || req.session.user == undefined) {
        res.render("index", { alert });
      } else {
        res.redirect("/admin/dashboard");
      }
    } catch (error) {}
  },
  actionLogin: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username: username });
      if (!user) {
        req.flash("alertMessage", `User ${username} tidak ada!`);
        req.flash("alertStatus", "danger");
        res.redirect("/admin/signin");
      } else {
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
          req.flash(
            "alertMessage",
            `Password yang anda masukkan tidak sesuai!`
          );
          req.flash("alertStatus", "danger");
          res.redirect("/admin/signin");
        } else {
          req.session.user = {
            id: user.id,
            username: user.username,
          };
        }
      }

      res.redirect("/admin/dashboard");
    } catch (error) {
      console.log(error);
    }
  },
  actionLogout: async (req, res) => {
    req.session.destroy();
    res.redirect("/admin/signin");
  },
  viewDashboard: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/dashboard/view_dashboard", {
        alert,
      });
    } catch (error) {}
  },
  viewHero: async (req, res) => {
    try {
      const hero = await Hero.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/hero/view_hero", {
        hero,
        alert,
      });
    } catch (error) {
      res.redirect("/admin/hero");
    }
  },
  addHero: async (req, res) => {
    try {
      const { jobTitle, description, companyName, companyLink } = req.body;
      await Hero.create({ jobTitle, description, companyName, companyLink });
      req.flash("alertMessage", `Successfully add new Hero!`);
      req.flash("alertStatus", `success`);
      res.redirect("/admin/hero");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/hero");
    }
  },
  updateHero: async (req, res) => {
    try {
      const { id, jobTitle, description, companyName, companyLink } = req.body;
      const hero = await Hero.findOne({ _id: id });
      hero.jobTitle = jobTitle;
      hero.description = description;
      hero.companyName = companyName;
      hero.companyLink = companyLink;
      await hero.save();
      req.flash("alertMessage", `Successfully Update Hero with ${id}`);
      req.flash("alertStatus", "success");
      res.redirect("/admin/hero");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/hero");
    }
  },
  deleteHero: async (req, res) => {
    try {
      const { id } = req.body;
      Hero.deleteOne({ _id: id }, (err, res) => {
        err ? console.log(err) : console.log(res);
      });
      req.flash("alertMessage", `Successfully delete Hero with ${id}!`);
      req.flash("alertStatus", "success");
      res.redirect("/admin/hero");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/hero");
    }
  },
  viewAbout: async (req, res) => {
    try {
      const about = await About.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/about/view_about", {
        about,
        alert,
      });
    } catch (error) {
      res.redirect("/admin/about");
    }
  },
  addAbout: async (req, res) => {
    try {
      const { description, company, url } = req.body;
      await About.create({ description, company, url });
      req.flash("alertMessage", `Successfully add new About!`);
      req.flash("alertStatus", `success`);
      res.redirect("/admin/about");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/about");
    }
  },
  updateAbout: async (req, res) => {
    try {
      const { id, description, company, url } = req.body;
      const about = await About.findOne({ _id: id });
      about.description = description;
      about.company = company;
      about.url = url;
      await about.save();
      req.flash("alertMessage", `Successfully Update About with ${id}`);
      req.flash("alertStatus", "success");
      res.redirect("/admin/about");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/about");
    }
  },
  deleteAbout: async (req, res) => {
    try {
      const { id } = req.body;
      About.deleteOne({ _id: id }, (err, res) => {
        err ? console.log(err) : console.log(res);
      });
      req.flash("alertMessage", `Successfully delete About with ${id}!`);
      req.flash("alertStatus", "success");
      res.redirect("/admin/about");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/about");
    }
  },
  viewTech: async (req, res) => {
    try {
      const tech = await Tech.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/tech/view_tech", { tech, alert });
    } catch (error) {
      res.redirect("/admin/tech");
    }
  },
  addTech: async (req, res) => {
    try {
      const { description } = req.body;
      await Tech.create({ description });
      req.flash("alertMessage", `Successfully add new Tech!`);
      req.flash("alertStatus", `success`);
      res.redirect("/admin/tech");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/tech");
    }
  },
  updateTech: async (req, res) => {
    try {
      const { id, description } = req.body;
      const tech = await Tech.findOne({ _id: id });
      tech.description = description;
      await tech.save();
      req.flash("alertMessage", `Successfully Update Tech with id ${id}`);
      req.flash("alertStatus", `success`);
      res.redirect("/admin/tech");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/tech");
    }
  },
  deleteTech: async (req, res) => {
    try {
      const { id } = req.body;
      Tech.deleteOne({ _id: id }, (err, res) => {
        err ? console.log(err) : console.log(res);
      });
      req.flash("alertMessage", `Successfully Delete Tech with id ${id}`);
      req.flash("alertStatus", `success`);
      res.redirect("/admin/tech");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/tech");
    }
  },
  viewList: async (req, res) => {
    try {
      const list = await List.find().populate({
        path: "techId",
        select: "id",
      });
      const tech = await Tech.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/list/view_list", { alert, list, tech });
    } catch (error) {
      res.redirect("/admin/list");
    }
  },
  addList: async (req, res) => {
    try {
      const { name, techId } = req.body;
      const tech = await Tech.findOne({ _id: techId });
      const list = await List.create({ name, techId });
      tech.listId.push({ _id: list._id });
      await tech.save();
      req.flash("alertMessage", `Successfully add new List!`);
      req.flash("alertStatus", `success`);
      res.redirect("/admin/list");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/list");
    }
  },
  updateList: async (req, res) => {
    try {
      const { id, name, techId } = req.body;
      const list = await List.findOne({ _id: id });
      if (list.techId._id !== techId) {
        const oldTech = await Tech.findOne({ _id: list.techId._id });
        const findIndex = oldTech.listId.findIndex((id) => id === id);
        oldTech.listId.shift(findIndex);
        await oldTech.save();
        const newTech = await Tech.findOne({ _id: techId });
        newTech.listId.push({ _id: id });
        await newTech.save();
      }
      list.name = name;
      list.techId = techId;
      await list.save();
      req.flash("alertMessage", `Successfully Update List with id ${id}!`);
      req.flash("alertStatus", `success`);
      res.redirect("/admin/list");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/list");
    }
  },
  deleteList: async (req, res) => {
    try {
      const { id } = req.body;
      List.deleteOne({ _id: id }, (err, res) => {
        err ? console.log(err) : console.log(res);
      });
      req.flash("alertMessage", `Successfully Delete List with id ${id}!`);
      req.flash("alertStatus", `success`);
      res.redirect("/admin/list");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/list");
    }
  },
  viewTab: async (req, res) => {
    try {
      const tab = await Tab.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/tab/view_tab", { alert, tab });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/tab");
    }
  },
  addTab: async (req, res) => {
    try {
      const { label, title, link, company, period } = req.body;
      await Tab.create({ label, title, link, company, period });
      req.flash("alertMessage", "Successfully added new Tab!");
      req.flash("alertStatus", "success");
      res.redirect("/admin/tab");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/tab");
    }
  },
  updateTab: async (req, res) => {
    try {
      const { id, label, title, link, company, period } = req.body;
      const tab = await Tab.findOne({ _id: id });
      tab.label = label;
      tab.title = title;
      tab.link = link;
      tab.company = company;
      tab.period = period;
      await tab.save();
      req.flash("alertMessage", `Successfully Update Tab with id ${id}`);
      req.flash("alertStatus", "success");
      res.redirect("/admin/tab");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/tab");
    }
  },
  deleteTab: async (req, res) => {
    try {
      const { id } = req.body;
      Tab.deleteOne({ _id: id }, (err, res) => {
        err ? console.log(err) : console.log(res);
      });
      req.flash("alertMessage", `Successfully Delete Tab with id ${id}`);
      req.flash("alertStatus", "success");
      res.redirect("/admin/tab");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/tab");
    }
  },
  viewJob: async (req, res) => {
    try {
      const job = await Job.find().populate({
        path: "tabId",
        select: "id",
      });
      const tab = await Tab.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/job/view_job", { alert, job, tab });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/job");
    }
  },
  addJob: async (req, res) => {
    try {
      const { description, tabId } = req.body;
      const tab = await Tab.findOne({ _id: tabId });
      const job = await Job.create({ description, tabId });
      tab.jobId.push({ _id: job._id });
      await tab.save();
      req.flash("alertMessage", `Successfully Added New Job!`);
      req.flash("alertStatus", "success");
      res.redirect("/admin/job");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/job");
    }
  },
  updateJob: async (req, res) => {
    try {
      const { id, description, tabId } = req.body;
      const job = await Job.findOne({ _id: id });
      if (job.tabId._id != tabId) {
        const oldTab = await Tab.findOne({ _id: job.tabId._id });
        const findIndex = oldTab.jobId.findIndex((id) => id === id);
        oldTab.jobId.shift(findIndex);
        await oldTab.save();
        const newTab = await Tab.findOne({ _id: tabId });
        newTab.jobId.push({ _id: id });
        await newTab.save();
      }
      job.description = description;
      job.tabId = tabId;
      await job.save();
      req.flash("alertMessage", `Successfully Update Job with id ${id}!`);
      req.flash("alertStatus", "success");
      res.redirect("/admin/job");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/job");
    }
  },
  deleteJob: async (req, res) => {
    try {
      const { id } = req.body;
      const job = await Job.findOne({ _id: id });
      const tab = await Tab.findOne({ _id: job.tabId._id });
      const findIndex = tab.jobId.findIndex((id) => id === id);
      tab.jobId.shift(findIndex);
      await tab.save();
      Job.deleteOne({ _id: id }, (err, res) => {
        err ? console.log(err) : console.log(res);
      });
      req.flash("alertMessage", `Successfully Delete Job with id ${id}!`);
      req.flash("alertStatus", "success");
      res.redirect("/admin/job");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/job");
    }
  },
  viewProject: async (req, res) => {
    try {
      const project = await Project.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/project/view_project", { alert, project });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/project");
    }
  },
  addProject: async (req, res) => {
    try {
      const { title, detail, github, external } = req.body;
      if (req.file) {
        await Project.create({
          title,
          detail,
          github,
          external,
          imageUrl: `images/${req.file.filename}`,
        });
        req.flash("alertMessage", `Succesfully added new Project!`);
        req.flash("alertStatus", "success");
      } else {
        req.flash("alertMessage", `Please Insert Image!`);
        req.flash("alertStatus", "danger");
      }
      res.redirect("/admin/project");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/project");
    }
  },
  updateProject: async (req, res) => {
    try {
      const { id, title, detail, github, external } = req.body;
      const project = await Project.findOne({ _id: id });
      console.log(project);
      if (req.file) {
        await fs.unlink(path.join(`public/${project.imageUrl}`));
        project.imageUrl = `images/${req.file.filename}`;
      }
      project.title = title;
      project.detail = detail;
      project.github = github;
      project.external = external;
      await project.save();
      req.flash("alertMessage", `Succesfully Update Project with id ${id}!`);
      req.flash("alertStatus", "success");
      res.redirect("/admin/project");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/project");
    }
  },
  deleteProject: async (req, res) => {
    try {
      const { id } = req.body;
      const project = await Project.findOne({ _id: id });
      await fs.unlink(path.join(`public/${project.imageUrl}`));
      Project.deleteOne({ _id: id }, (err, res) => {
        err ? console.log(err) : console.log(res);
      });
      req.flash("alertMessage", `Successfully delete project with ${id}`);
      req.flash("alertStatus", "success");
      res.redirect("/admin/project");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/project");
    }
  },
  viewTool: async (req, res) => {
    try {
      const tool = await Tool.find().populate({
        path: "projectId",
        select: "id title",
      });
      const project = await Project.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/tool/view_tool", { alert, tool, project });
    } catch (error) {
      res.redirect("/admin/tool");
    }
  },
  addTool: async (req, res) => {
    try {
      const { name, projectId } = req.body;
      const project = await Project.findOne({ _id: projectId });
      const tool = await Tool.create({ name, projectId });
      project.toolId.push({ _id: tool._id });
      await project.save();
      req.flash("alertMessage", `Successfully add new tool!`);
      req.flash("alertStatus", `success`);
      res.redirect("/admin/tool");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/tool");
    }
  },
  updateTool: async (req, res) => {
    try {
      const { id, name, projectId } = req.body;
      const tool = await Tool.findOne({ _id: id });
      console.log(tool.projectId);
      console.log(projectId);
      if (Array.isArray(tool.projectId)) {
        for (let i = 0; i < tool.projectId.length; i++) {
          const oldProject = await Project.findOne({
            _id: tool.projectId[i]._id,
          });
          const findIndex = oldProject.toolId.findIndex((id) => id === id);
          oldProject.toolId.shift(findIndex);
          await oldProject.save();
        }
      } else {
        const oldProject = await Project.findOne({
          _id: tool.projectId._id,
        });
        const findIndex = oldProject.toolId.findIndex((id) => id === id);
        oldProject.toolId.shift(findIndex);
        await oldProject.save();
      }
      if (Array.isArray(projectId)) {
        for (let j = 0; j < projectId.length; j++) {
          const newProject = await Project.findOne({ _id: projectId[j] });
          newProject.toolId.push({ _id: id });
          await newProject.save();
        }
      } else {
        const newProject = await Project.findOne({ _id: projectId });
        newProject.toolId.push({ _id: id });
        await newProject.save();
      }
      tool.name = name;
      tool.projectId = projectId;
      await tool.save();
      req.flash("alertMessage", `Successfully Update Tool with id ${id}!`);
      req.flash("alertStatus", `success`);
      res.redirect("/admin/tool");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/tool");
    }
  },
  deleteTool: async (req, res) => {
    try {
      const { id } = req.body;
      Tool.deleteOne({ _id: id }, (err, res) => {
        err ? console.log(err) : console.log(res);
      });
      req.flash("alertMessage", `Successfully Delete Tool with id ${id}!`);
      req.flash("alertStatus", `success`);
      res.redirect("/admin/tool");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/tool");
    }
  },
};
