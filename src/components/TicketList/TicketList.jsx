import React from "react"
import { Ticket, Loader } from "../index"
import PropTypes from "prop-types"
import "./TicketList.scss"

const TicketList = ({ tickets, sorting, handleSorting, loading }) => {
  return (
    <div className="tickets">
      <h2 className="tickets__headline visually-hidden" tabIndex="0">
        Сортировка билетов по цене и быстроте доставки
      </h2>

      <ul className="tickets__button-list">
        <li className="tickets__list-item">
          <button
            className={`tickets__button tickets__button--left ${
              sorting ? `tickets__button--active` : ``
            }`}
            onClick={handleSorting}>
            Самый дешевый
          </button>
        </li>
        <li className="tickets__list-item">
          <button
            className={`tickets__button tickets__button--right ${
              sorting ? `` : `tickets__button--active`
            }`}
            onClick={handleSorting}>
            Самый быстрый
          </button>
        </li>
      </ul>

      <h3 className="visually-hidden">Список билетов</h3>
      <ul className="tickets__list">
        {loading ? (
          <Loader />
        ) : (
          tickets.map((ticket, i) => <Ticket details={ticket} key={`t${i}`} />)
        )}
      </ul>
    </div>
  )
}

TicketList.propTypes = {
  tickets: PropTypes.array.isRequired,
  sorting: PropTypes.bool.isRequired,
  handleSorting: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default TicketList
