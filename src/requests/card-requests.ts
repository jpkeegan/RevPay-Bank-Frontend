
export type Card = {
    cardNumber: number
    accountId: number
    credit: boolean
    cardId: number
}
const url = "http://127.0.0.1:8080/";

export async function addCard(newCard: Card):Promise<Card>{
    const httpResponse = await fetch(url + "cards", {
        method:"POST",
        body:JSON.stringify(newCard),
        headers:{"Content-Type":"application/json"}
    });
    const card: Card = await httpResponse.json();
    return card;
}
    
export async function updateCard(existingCard:Card):Promise<Card>{
    const httpResponse = await fetch(url + "cards", {
        method:"PUT",
        body:JSON.stringify(existingCard),
        headers:{"Content-Type":"application/json"}
    });
    const updatedCard : Card = await httpResponse.json();
    return updatedCard;
}

export async function getAllCards():Promise<Card[]>{
    const httpResponse = await fetch(url + "cards");
    const cards : Card[] = await httpResponse.json();
    return cards;
}

export async function getAllCardsbyaccountId(accountId: number):Promise<Card[]>{
    const httpResponse = await fetch(url + "cards/account/" + accountId);
    const cards : Card[] = await httpResponse.json();
    console.log("resposnse is " + httpResponse)
    return cards;
}

export async function getCardById(cardId: number):Promise<Card>{
    const httpResponse = await fetch(url + "cards/" + cardId);
    const card : Card = await httpResponse.json();
    console.log(card)
    return card;
}

  
export async function deleteCard(cardId: number): Promise<boolean> {
    try {
      const httpResponse = await fetch(url + "cards/" + cardId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      //alert( "'" + httpResponse.status + "'")
      if (httpResponse.status === 204) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  