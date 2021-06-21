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
    <div className="filter">
      <h2
        className="filter__headline"
        tabIndex="0"
        aria-label="Выберите допустимое количество пересадок">
        Количество пересадок
      </h2>
      <ul className="filter__list list">
        {filters.map((item, i) => renderFilter(item, i))}
      </ul>
    </div>
  )
}

Filter.propTypes = {
  filters: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Filter
