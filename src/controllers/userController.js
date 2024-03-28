import UserRepository from "../services/repository/userRepository.js"
const userRepo = new UserRepository();
// Controlador para crear un nuevo usuario
const createUserController = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await userRepo.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserByIdController = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userRepo.getUserById(userId);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserByEmailController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userRepo.getUserByEmail(email);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export { createUserController, getUserByIdController, getUserByEmailController };
