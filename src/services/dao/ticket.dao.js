import TicketModel from "./ticketModel.js";

// Crear un nuevo ticket
const createTicket = async (ticketData) => {
  try {
    const newTicket = await TicketModel.create(ticketData);
    return newTicket;
  } catch (error) {
    throw new Error("Error al crear el ticket: " + error.message);
  }
};

// Obtener todos los tickets
const getAllTickets = async () => {
  try {
    const tickets = await TicketModel.find();
    return tickets;
  } catch (error) {
    throw new Error("Error al obtener los tickets: " + error.message);
  }
};

// Obtener un ticket por su código
const getTicketByCode = async (ticketCode) => {
  try {
    const ticket = await TicketModel.findOne({ code: ticketCode });
    return ticket;
  } catch (error) {
    throw new Error("Error al obtener el ticket por código: " + error.message);
  }
};

// Actualizar un ticket por su código
const updateTicketByCode = async (ticketCode, newData) => {
  try {
    const updatedTicket = await TicketModel.findOneAndUpdate(
      { code: ticketCode },
      newData,
      { new: true }
    );
    if (!updatedTicket) {
      throw new Error("Ticket no encontrado");
    }
    return updatedTicket;
  } catch (error) {
    throw new Error(
      "Error al actualizar el ticket por código: " + error.message
    );
  }
};

// Eliminar un ticket por su código
const deleteTicketByCode = async (ticketCode) => {
  try {
    const deletedTicket = await TicketModel.findOneAndDelete({
      code: ticketCode,
    });
    if (!deletedTicket) {
      throw new Error("Ticket no encontrado");
    }
    return deletedTicket;
  } catch (error) {
    throw new Error("Error al eliminar el ticket por código: " + error.message);
  }
};

export {
  createTicket,
  getAllTickets,
  getTicketByCode,
  updateTicketByCode,
  deleteTicketByCode,
};
