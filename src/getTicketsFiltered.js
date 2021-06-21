export default function getTicketsFiltered(arrOfTickets, filters) {
  let maxStops = 0

  filters.forEach((option) => {
    return option.checked && option.stops > maxStops
      ? (maxStops = option.stops)
      : false
  })

  return [...arrOfTickets].filter((ticket) => {
    const { segments } = ticket
    const [firstSegment, secondSegment] = segments

    return firstSegment.stops.length <= maxStops &&
      secondSegment.stops.length <= maxStops
      ? ticket
      : false
  })
}
