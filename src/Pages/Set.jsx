import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import pokemon from 'pokemontcgsdk'

function Set() {
  const [cards, setCards] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { setId } = useParams()

  useEffect( () => {
    const cardsPerPage = 12
    const query = {
      q: `set.id:${setId}`,
      pageSize: cardsPerPage,
      page: currentPage
    }
    pokemon.card.where(query)
      .then(result => {
        setCards(result.data)
        const numPages = Math.ceil(result.totalCount / cardsPerPage)
        setTotalPages(numPages)
        document.title = `Pokemon TCG | ${result.data[0].set.name} `
        const previousBtn = document.querySelector('.page-btn.previous')
        const nextBtn = document.querySelector('.page-btn.next')
        
        if (numPages > 1 && currentPage !== numPages && currentPage === 1) { // if on 1st page of many
          previousBtn.classList.add('disabled')
          nextBtn.classList.remove('disabled')
        } else if (numPages > 1 && currentPage === numPages) { // on last page of many
          previousBtn.classList.remove('disabled')
          nextBtn.classList.add('disabled')
        } else if (numPages > 1 && currentPage > 1 && currentPage < numPages) { // if on middle page of many
          previousBtn.classList.remove('disabled')
          nextBtn.classList.remove('disabled')
        } else if (numPages === 1 && currentPage === 1) { // if only 1 page
          previousBtn.classList.add('disabled')
          nextBtn.classList.add('disabled')
        }
      })
      }, [currentPage])

  function handlePaginate(e) {
    const value = parseInt(e.target.dataset.pageValue)
    setCurrentPage(prevPage => prevPage + value)
  }

  return (
    <main>
      <h1>{cards && cards[0]?.set?.name}</h1>
      <div id="set-grid">
        {cards && cards.map(card => {
          return (
            <div className={`card ${card.rarity}`} data-card-id={card.id} key={card.id}>
              <img src={card.images.small} alt={card.name} />
              <h4>{card.name}</h4>
            </div>
          )
        })}
      </div>
      <div className="pagination">
        <button data-page-value={-1} className="page-btn previous" onClick={handlePaginate}>Previous</button>
        <span className="current-page">{currentPage}</span> of <span className="total-pages">{totalPages}</span>
        <button data-page-value={1} className="page-btn next" onClick={handlePaginate}>Next</button>
      </div>
    </main>
  )
}

export default Set