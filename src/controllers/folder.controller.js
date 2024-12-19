import FolderService from "../services/folder.service.js";

class FolderController {
  constructor() {
    this.folderService = new FolderService();
  }

  async listUserSpace(req, res) {
    try {
      const space = await this.folderService.listUserSpace(req.user.id);
      res.status(200).json(space);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async createUserSpace(req, res) {
    try {
      const result = await this.folderService.createUserSpace(
        req.user.id,
        req.body
      );
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteUserFile(req, res) {
    try {
      const result = await this.folderService.deleteUserFile(
        req.user.id,
        req.body
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default FolderController;
