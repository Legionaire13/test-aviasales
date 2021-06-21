import mock from "../mocks/mock_tickets"

export const getTickets = async () => {
  // получаем searchID
  const getSearchId = async () => {
    console.log(`...getting an ID for tickets request`)
    let response
    try {
      response = await fetch(`https://front-test.beta.aviasales.ru/search`)
    } catch (e) {
      console.error(e.error)
    }

    if (!response) return undefined

    const { searchId } = await response.json()
    return searchId
  }

  // получаем массив с билетами
  const getTicketsTotalArr = async (searchId) => {
    console.log(`...getting total array of tickets`)
    let response
    const url = `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`

    try {
      response = await fetch(url)
    } catch (e) {
      console.error(e.error)
    }

    if (response.ok) {
      return !response.stop
        ? ((response = await response.json()),
          (totalTicketsArr = [...totalTicketsArr, ...response.tickets]),
          getTicketsTotalArr(searchId))
        : totalTicketsArr
    }

    if (response.status >= 500) return getTicketsTotalArr(searchId)
  }

  const searchID = await getSearchId()

  // возвращаем макет если не был получен id поиска
  if (!searchID) {
    console.error(`Can't get an searchID from server
     ---> ...mock_tickes.js is loaded`)
    return mock
  }

  let totalTicketsArr = []
  await getTicketsTotalArr(searchID)

  return totalTicketsArr
}

export default getTickets
