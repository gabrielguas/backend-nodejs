export default class TicketRepository {
  constructor(dao) {
    this.ticketDAO = dao;
  }

  async createTicket(ticketData) {
    try {
      const newTicket = await this.ticketDAO.createTicket(ticketData);
      return newTicket;
    } catch (error) {
      throw new Error("Error al crear el ticket: " + error.message);
    }
  }

  async getAllTickets() {
    try {
      const tickets = await this.ticketDAO.getAllTickets();
      return tickets;
    } catch (error) {
      throw new Error("Error al obtener los tickets: " + error.message);
    }
  }

  async getTicketByCode(ticketCode) {
    try {
      const ticket = await this.ticketDAO.getTicketByCode(ticketCode);
      return ticket;
    } catch (error) {
      throw new Error(
        "Error al obtener el ticket por código: " + error.message
      );
    }
  }

  async updateTicketByCode(ticketCode, newData) {
    try {
      const updatedTicket = await this.ticketDAO.updateTicketByCode(
        ticketCode,
        newData
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
  }

  async deleteTicketByCode(ticketCode) {
    try {
      const deletedTicket = await this.ticketDAO.deleteTicketByCode(ticketCode);
      if (!deletedTicket) {
        throw new Error("Ticket no encontrado");
      }
      return deletedTicket;
    } catch (error) {
      throw new Error(
        "Error al eliminar el ticket por código: " + error.message
      );
    }
  }
}
