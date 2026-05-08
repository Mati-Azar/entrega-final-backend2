import userModel from "../models/user.model.js";

class UserDAO {
  static async createUser(email, password) {
    console.log(email);
    return await userModel.create({ email, password });
  }

  static async findUserByEmail(email) {
    return await userModel.findOne({ email });
  }

  static async findUserById(id) {
    return await userModel.findById(id);
  }

  static async findOrCreateUser(email) {
    const user = await UserDAO.findUserByEmail(email);
    if (user) return user;
    return await UserDAO.createUser(email, "Test1234!");
  }
}

export default UserDAO;
