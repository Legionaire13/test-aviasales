import React from "react"
import PropTypes from "prop-types"
import "./Filter.scss"

const Filter = ({ filters, onChange }) => {
  const labels = {
    all: "Все",
    zero: "Без пересадок",
    one: "1 пересадка",
    two: "2 пересадки",
    three: "3 пересадки",
  }

  const renderFilter = ({ name, checked }, i) => {
    return (
      <li className="filter__item" key={`option-${i}`}>
        <input
          id={name}
          name={name}
          className={`visually-hidden filter__input ${
            checked ? `filter__input--checked` : ``
          }`}
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        <label className="filter__label" htmlFor={name}>
          {labels[name]}
        </label>
      </li>
    )
  }

  return (
    <ul className="filter list">
      <h2 className="filter__headline">Количество пересадок</h2>
      {filters.map((item, i) => renderFilter(item, i))}
    </ul>
  )
}

Filter.propTypes = {
  filters: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Filter
