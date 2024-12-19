import ShareService from "../services/share.service.js";

class ShareController {
  constructor() {
    this.shareService = new ShareService();
  }

  async generateShareLink(req, res) {
    try {
      const result = await this.shareService.generateShareLink(
        req.user.id,
        req.query.fileName
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async downloadFile(req, res) {
    try {
      await this.shareService.downloadFile(req.params.token, res);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default ShareController;
