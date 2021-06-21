export default function getTicketsSorted(filteredTickets, condition) {
  function sortByPrice(filteredTickets) {
    return [...filteredTickets].sort((t1, t2) => t1.price - t2.price)
  }

  function sortByDuration(filteredTickets) {
    return [...filteredTickets].sort(
      (t1, t2) => t1.segments[0].duration - t2.segments[0].duration
    )
  }

  return condition
    ? sortByPrice(filteredTickets)
    : sortByDuration(filteredTickets)
}
