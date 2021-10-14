import React, { useState, useEffect, useCallback } from "react"
import { Filter, TicketList, Logo } from "./components"
import { getTickets, getTicketsFiltered, getTicketsSorted } from "./logic"
import "./App.scss"

const App = () => {
  const initialState = {
    filters: [
      {
        name: "all",
        checked: false,
        stops: 3,
      },
      {
        name: "zero",
        checked: true,
        stops: 0,
      },
      {
        name: "one",
        checked: true,
        stops: 1,
      },
      {
        name: "two",
        checked: true,
        stops: 2,
      },
      {
        name: "three",
        checked: false,
        stops: 3,
      },
    ],
    isCheapest: true,
    loading: false,
    lastReq: null,
  }
  const [appState, setAppState] = useState(initialState)

  const handleFilter = useCallback(
    (e) => {
      e.stopPropagation()

      const updatedFilters =
        e.target.name !== "all"
          ? {
              ...appState,
              filters: appState.filters.map((filter) => {
                if (filter.name === "all") {
                  filter.checked = false
                }

                if (filter.name === e.target.name) {
                  filter.checked = e.target.checked
                }
                return filter
              }),
            }
          : {
              ...appState,
              filters: appState.filters.map((filter) => {
                filter.checked = e.target.checked

                return filter
              }),
            }

      return setAppState(updatedFilters)
    },

    // eslint-disable-next-line
    [appState]
  )

  const handleSorting = useCallback(
    () =>
      setAppState({
        ...appState,
        isCheapest: !appState.isCheapest,
      }),
    [appState]
  )

  const useFetchRequest = (appState) => {
    const [result, setResult] = useState([])
    const { filters, isCheapest, lastReq } = appState
    const requestTimeout = 45000

    useEffect(() => {
      async function fetchRequest() {
        setAppState({ ...appState, loading: true })

        let res

        if (Date.now() - lastReq < requestTimeout) {
          res = JSON.parse(sessionStorage.getItem("tickets"))
        } else {
          res = await getTickets()
          sessionStorage.setItem("tickets", JSON.stringify(res))
        }

        res = getTicketsFiltered(res, filters)
        res = getTicketsSorted(res, isCheapest)
        res.length = 5

        setAppState({ ...appState, loading: false, lastReq: Date.now() })
        setResult(res)
      }

      fetchRequest()

      // eslint-disable-next-line
    }, [filters, isCheapest])

    return result
  }

  return (
    <article className="App">
      <h1 className="visually-hidden">Лучшие варианты перелетов</h1>
      <header className="logo">
        <a href="https://www.aviasales.com">
          <Logo />
        </a>
      </header>
      <main className="main">
        <Filter filters={appState.filters} onChange={handleFilter} />
        <TicketList
          tickets={useFetchRequest(appState)}
          sorting={appState.isCheapest}
          handleSorting={handleSorting}
          loading={appState.loading}
        />
      </main>
    </article>
  )
}

export default App
