import { Api } from "./Api";
import { apiCredentials } from "../utils/consts";

class CardsService extends Api {
  constructor() {
    super(apiCredentials);
  }

  getAllCards() {
    return super.get("/cards");
  }

  addNewCard(cardData) {
    return super.post("/cards", cardData);
  }

  deleteCard(cardId) {
    return super.delete(`/cards/${cardId}`);
  }

  setLikeActive(cardId) {
    if (!cardId) {
      console.warn("[cardId] is lost somewhere!");
    }
    return super.put(`/cards/${cardId}/likes`);
  }
  setLikeInActive(cardId) {
    if (!cardId) {
      console.warn("[cardId] is lost somewhere!");
    }
    return super.delete(`/cards/${cardId}/likes`);
  }
}

export const cardService = new CardsService(apiCredentials);
