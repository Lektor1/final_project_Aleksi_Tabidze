import UserService from "../services/user.service.js";

class UserController {
  constructor(userService) {
    this.userService = new UserService();
  }

  async createUser(req, res) {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async validateUser(req, res) {
    try {
      const isValid = await this.userService.validateUser(req.body);
      res.status(200).json({ valid: isValid });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async loginUser(req, res) {
    try {
      const token = await this.userService.loginUser(req.body);
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  async unregisterUser(req, res) {
    try {
      await this.userService.unregisterUser(req.user.id);
      res.status(200).json({ message: "User unregistered successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default UserController;
