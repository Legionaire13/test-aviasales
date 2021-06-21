export const getTicketsSorted = (filteredTickets, condition) => {
  const sortByPrice = (filteredTickets) => {
    return filteredTickets.sort((t1, t2) => t1.price - t2.price)
  }

  const sortByDuration = (filteredTickets) => {
    return filteredTickets.sort(
      (t1, t2) => t1.segments[0].duration - t2.segments[0].duration
    )
  }

  return condition
    ? sortByPrice(filteredTickets)
    : sortByDuration(filteredTickets)
}

export default getTicketsSorted
