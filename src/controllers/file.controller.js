import FileService from "../services/file.service.js";

class FileController {
  constructor() {
    this.fileService = new FileService();
  }

  async uploadFile(req, res) {
    try {
      const result = await this.fileService.uploadFile(req.user.id, req);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async attachMeta(req, res) {
    try {
      const result = await this.fileService.attachMeta(req.user.id, req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getMeta(req, res) {
    try {
      const result = await this.fileService.getMeta(
        req.user.id,
        req.query.fileName
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default FileController;
