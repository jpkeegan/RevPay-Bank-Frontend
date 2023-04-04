import { useState, useEffect, SetStateAction } from "react";
import { Card, addCard, updateCard, deleteCard, getAllCards, getCardById, getAllCardsbyaccountId } from "../requests/card-requests"
import visaImage from '../images/burj.jpeg';
import mastercardImage from '../images/pandora.jpeg';
import amexImage from '../images/visa-ny.jpeg';
import discoverImage from '../images/discover-ei.png';
import visa_Image from '../images/visa.jpg';
import '../components/styles.css'



export function CardManagement() {
  const [cards, setCards] = useState<Card[]>([]);


  const [newCard, setNewCard] = useState<Card>({ cardNumber: 0, accountId: 0, credit: false, cardId: 0 });
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const currentUserId =  Number(localStorage.getItem("accountId"));

  const fetchCards = async () => {
    //console.log(currentUserId + " ppp ");
    if (currentUserId !== null) {
      const cards = await getAllCardsbyaccountId(currentUserId);
      console.log(cards + " ppp ");
      setCards(cards);
      setCardOrder(cards.map((card) => card.accountId.toString()));
    } else {
      // handle the case where currentUserId is null
    }
  };
  
  useEffect(() => {
    fetchCards();
  }, []);
  
  
  

  const handleNewCardChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setNewCard((prev) => ({ ...prev, [name]: value }));

  };


  const handleEditCardChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setEditingCard((prev) => ({ ...prev!, [name]: value }));

  };



  const handleEditButtonClick = async (accountId: number) => {
    const card = await getCardById(accountId);
    setEditingCard(card);
  };
  

  const handleDeleteButtonClickOld = async (accountId: number) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      const deleted = await deleteCard(accountId);
      setCards((prevCards) => prevCards.filter((card) => card.accountId !== accountId));
      if (deleted) {
        await fetchCards();
        setCards((prevCards) => prevCards.filter((card) => card.accountId !== accountId));
      }
    }
  };

  const handleDeleteButtonClick = async (accountId: number) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      const deleted = await deleteCard(accountId);
      if (deleted) {
        await fetchCards();
        setCards((prevCards) => prevCards.filter((card) => card.accountId !== accountId));
      }
    }
  };
  

  
  const handleEditCardSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingCard) return;
  
    const updatedCard = {
      ...editingCard,
      accountId: currentUserId, // update the accountId field with the current user ID
    };
    
    const updated = await updateCard(updatedCard);
    if (!updated) return;
  
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.cardId === updated.cardId ? updated : card
      )
    );
    setEditingCard(null);
  };
  
  function isValidCardNumber(cardNumber: number): boolean {
    return !isNaN(cardNumber) && cardNumber > 0;
  }


  
  const handleNewCardSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    let { cardNumber, accountId, credit } = newCard; 
     // Validate the Card Number
     if (!isValidCardNumber(cardNumber)) {
      alert("Card Number should be a number greater than 0");
      return;
    }
  
    const addedCard = await addCard({
      cardNumber, accountId, credit,
      cardId: 0
    });
    setCards((prev) => [...prev, addedCard]);

   

    console.log("current user id is - " + currentUserId)

    if (currentUserId) {
      // Use the current user's ID to create a new card
      setNewCard({ cardNumber: 0, accountId: currentUserId, credit: false, cardId: 0 });
    } else {
      // Handle the case where there is no current user ID in local storage
      console.log("No current user ID found");
    }
  
   // setNewCard({ cardNumber: 0, accountId: 0, credit: false , cardId: 0});
  };

  
  const [currentPage, setCurrentPage] = useState<number>(1);
  const cardsPerPage = 5;

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const currentCards = cards.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );
  const pageNumbers = [];

for (let i = 1; i <= Math.ceil(cards.length / cardsPerPage); i++) {
  pageNumbers.push(i);
}

const [hoveredCard, setHoveredCard] = useState<number | null>(null);

const [cardOrder, setCardOrder] = useState<string[]>([]);


const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
  const target = event.target as HTMLDivElement;
  target.style.transform = 'scale(1.05)';
};

const handleMouseOut = (event: React.MouseEvent<HTMLDivElement>) => {
  const target = event.target as HTMLDivElement;
  target.style.transform = 'scale(1)';
};

const handleClickold = (event: React.MouseEvent<HTMLDivElement>, accountId: string) => {
  setCardOrder((prevOrder) => [accountId, ...prevOrder.filter((id) => id !== accountId)]);
};

useEffect(() => {
  setCardOrder(cards.map((card) => card.accountId.toString()));
}, [cards]);




const handleClick_W = (event: React.MouseEvent<HTMLDivElement>, accountId: string) => {
  setCardOrder((prevOrder) => [accountId, ...prevOrder.filter((id) => id !== accountId)]);
  setHoveredCard(parseInt(accountId)); // Convert the accountId to a number and set the state
  
};


const cardImages = {
  visa: visaImage,
  mastercard: mastercardImage,
  amex: amexImage,
  discover: discoverImage,
  default: amexImage
};


const getCardImage = (cardNumber: string): string => {
  // Check if the card number starts with a valid prefix
  if (/^4/.test(cardNumber)) {
    return cardImages.visa;
  } else if (/^5[1-5]/.test(cardNumber)) {
    return cardImages.mastercard;
  } else if (/^1/.test(cardNumber)) {
    return cardImages.discover;
  } else if (/^2/.test(cardNumber)) {
    return cardImages.visa;
  } else if (/^3/.test(cardNumber)) {
    return cardImages.default;
  } else {
    // Default image for unknown card types
    return cardImages.default;
  }
};


  const handleCardHover = (cardId: SetStateAction<number | null>) => {
    setHoveredCard(cardId);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };



const handleCardClick_Wold = (accountId: string) => {
  const newCardOrder = cardOrder.filter((cardIndex) => cardIndex !== accountId);
  setCardOrder([accountId, ...newCardOrder]);
};

const [selectedCard, setSelectedCard] = useState<number | null>(null);

const handleCardClick = (cardId: number | null) => {
  setSelectedCard(cardId);
};
  
  return <>
      <div>
      <h4>Card Management</h4>
      <h5>Add Card</h5>
      <form onSubmit={handleNewCardSubmit}>
        <label>
          Card Number:
          {/* <input type="number" id = "name" name="cardNumber" value={newCard.cardNumber} onChange={handleNewCardChange} required /> */}
          <input type="number" id="name" name="cardNumber" defaultValue={parseInt("000000000000")} onChange={handleNewCardChange} required />


        </label>
        {/* <label>
          Account ID:
          <input type="number" name="accountId" value={newCard.accountId} onChange={handleNewCardChange} required />

        </label> */}
        <label>
          Credit:
          <select name="credit" value={newCard.credit.toString()} onChange={handleNewCardChange} required>
            <option value={false.toString()}>No</option>
            <option value={true.toString()}>Yes</option>
          </select>

        </label>
        <button type="submit">Add Card</button>
      </form>
      <h5>Edit Card</h5>
      {editingCard && (
        <form onSubmit={handleEditCardSubmit}>
          <label>
            Card Number:
            <input
              type="number"
              name="cardNumber"
              value={editingCard.cardNumber}
              onChange={handleEditCardChange}
              readOnly
            />
          </label>
          {/* <label>
            Account ID:
            <input
              type="number"
              name="accountId"
              value={editingCard.accountId}
              onChange={handleEditCardChange}
              required
            />
          </label> */}
          <label>
            Credit:
            <select name="credit" value={editingCard.credit.toString()} onChange={handleEditCardChange} required>
              <option value={false.toString()}>No</option>
              <option value={true.toString()}>Yes</option>
            </select>


          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditingCard(null)}>Cancel</button>
        </form>
      )}
      <h5>Card List</h5>

    <div>
      {/* <table>
        <thead>
          <tr>
            <th>Card Number</th>
            <th>Card ID</th> 
            <th>Credit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCards.map((card) => (
            <tr key={card.accountId}>
              <td>{card.cardNumber}</td>
              <td>{card.cardId}</td> 
              <td>{card.credit ? "Yes" : "No"}</td>
              <td>
              <button type="button" onClick={() => handleEditButtonClick(card.cardId)}>
                  Edit
                </button>
                <button type="button" onClick={() => handleDeleteButtonClick(card.cardId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

 {/* <div style={{ position: "relative" }}>
    {cardOrder.map((accountId: string, index: number) => {
      const card = cards.find(
        (card) => card.accountId.toString() === accountId
      );
      if (!card) return null;

      const cardImage = getCardImage(card.cardNumber.toString());

      return (
        <div
          key={card.cardId}
          style={{
            position: "absolute",
            top: `${index * 40}px`,
            left: `${index * 20}px`,
            transform: "rotate(-10deg)",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
            padding: "20px",
            borderRadius: "10px",
            background: "white",
            zIndex: cards.length - index,
            backgroundImage: `url(${cardImage})`,
            backgroundSize: "cover",
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onClick={(event) =>
            handleClick(event, card.accountId.toString())
          }
        >
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <img src={"/card-images/" + cardImage} alt="card icon" style={{ marginRight: "10px", height: "30px" }} />
            <div>{hoveredCard === card.accountId ? card.cardNumber.toString().padStart(16, "0").replace(/(.{4})/g, "$1 ") : ""}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button onClick={() => handleEditButtonClick(card.cardId)}>View/Edit</button>
            <button onClick={() => handleDeleteButtonClick(card.cardId)}>Delete</button>
          </div>
        </div>
      );
    })}
  </div>  */}

 <div className="credit-card-list">
      {cards.map((card, index) => (
        <div
          key={card.cardId}
          className={`credit-card ${hoveredCard === card.cardId ? "hovered" : ""}`}
          onMouseEnter={() => handleCardHover(card.cardId)}
          onMouseLeave={handleCardLeave}
        >
          <div className="credit-card__background"
          style={{ backgroundImage: `url(${getCardImage(card.cardNumber.toString())})` }}
        >

         
          <div className="credit-card__content">
          <img src={getCardImage(card.cardNumber.toString())} alt="card icon" />

            <div className="credit-card__number">{hoveredCard === card.cardId ? card.cardNumber.toString().padStart(16, "0").replace(/(.{4})/g, "$1 ") : ""}</div>
            <div className="credit-card__buttons">
              <button className="credit-card__button" onClick={() => handleEditButtonClick(card.cardId)}>View/Edit</button>
              <button className="credit-card__button" onClick={() => handleDeleteButtonClick(card.cardId)}>Delete</button>
            </div>
          </div>
        </div>
        </div>
      ))}
    </div> 
     
      {/* <div>
        {pageNumbers.map((pageNumber) => (
             
          <button
        key={pageNumber}
        onClick={() => setCurrentPage(pageNumber)}
        style={{
          color: currentPage === pageNumber ? 'green' : 'inherit',
          fontWeight: currentPage === pageNumber ?  'bold' : 'inherit',
          backgroundColor: currentPage === pageNumber ? 'yellow' : 'white' 
        }}
      >
          {pageNumber}
        </button>
        ))}
      </div> */}
      </div>
      </div>
    </>
  }