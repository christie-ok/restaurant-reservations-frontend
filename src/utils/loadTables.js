import {listTables} from "./api";

export function loadTables(setTables, setReservationsError) {
    const abortController = new AbortController();
    setReservationsError(null);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setReservationsError)
    return () => abortController.abort();
  };

