import React from "react"
import PropTypes from "prop-types"
import "./Ticket.scss"

const Ticket = ({ details }) => {
  // data output formatting
  const formatHandler = {
    numbers: new Intl.NumberFormat(`ru-RU`),
    stops: ["Без пересадок", "1 пересадка", "2 пересадки", "3 пересадки"],
    duration: (duration) => {
      const hours = Math.floor(duration / 60)
      const mins = Math.round((duration / 60 - hours) * 60)
      return `${hours}ч ${mins}м`
    },
    time: (departure, duration) => {
      const options = [
        "ru-RU",
        {
          hour: "numeric",
          minute: "numeric",
        },
      ]

      departure = Date.parse(departure)
      const arrival = new Date(departure + duration * 60 * 1000)
      departure = new Date(departure)

      return `${departure.toLocaleString(
        ...options
      )} - ${arrival.toLocaleString(...options)}`
    },
  }

  function renderSegments(arr, i) {
    return arr.map(({ origin, destination, date, stops, duration }, i) => {
      return (
        <table className="ticket__table" key={`id-${i}`}>
          <thead>
            <tr>
              <th className="ticket__col1">
                {origin} - {destination}
              </th>
              <th className="ticket__col2">В пути</th>
              <th className="ticket__col3">
                {formatHandler.stops[stops.length]}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="ticket__col1">
                {formatHandler.time(date, duration)}
              </td>
              <td className="ticket__col2">
                {formatHandler.duration(duration)}
              </td>
              <td className="ticket__col3">{stops.join(", ")}</td>
            </tr>
          </tbody>
        </table>
      )
    })
  }

  const { price, carrier, segments } = details

  return (
    <li>
      <article className="ticket">
        <header className="ticket__header">
          <span className="ticket__price">
            {formatHandler.numbers.format(price)} Р
          </span>
          <img
            className="ticket__logo"
            src={`//pics.avs.io/99/36/{${carrier}}.png`}
            alt="Логотип авиалинии"
          />
        </header>

        <main className="ticket__body">{renderSegments(segments)}</main>
      </article>
    </li>
  )
}

Ticket.propTypes = {
  details: PropTypes.array.isRequired,
}

export default Ticket
