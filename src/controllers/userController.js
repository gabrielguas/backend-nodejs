import UserDAO from '../services/dao/user.dao.js'

// Controlador para crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await UserDAO.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req,res) => {
  try{
    const userId = req.params.id;
    const user = await UserDAO.getUserById(userId);
    res.status(201).json(user)
  }catch(error){
    res.status(500).json({ message: error.message })
  }
}

const getUserByEmail = async (req,res) => {
  try{
  const { email } = req.body;
  const user = await UserDAO.getUserByEmail(email)
  res.status(201).json(user)
  }catch(error){
    res.status(500).json({ message: error.message })
  }
}
export { createUser, getUserById, getUserByEmail }