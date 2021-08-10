/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
  

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      
      return Promise.reject({ message: payload.error });
    }
    return payload.data;

  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/**
 * Retrieves all existing reservation.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

export async function listReservations(params, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}

//RETURNS SPECIFIC RESERVATION
export async function readReservation(reservation_id, signal) {
  const url = new URL(`${API_BASE_URL}/reservations/${reservation_id}`);

  return await fetchJson(url, { headers, signal }, [])
  .then(formatReservationDate)
    .then(formatReservationTime);
}

//CREATES NEW RESERVATION
export async function postReservation(newRes, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({data: newRes}),
    signal
  };
  return await fetchJson(url, options, {})
};

//LISTS ALL EXISTING TABLES
export async function listTables(signal) {
  const url = new URL(`${API_BASE_URL}/tables`);

  return await fetchJson(url, { headers, signal }, []);
};

//CREATES NEW TABLE
export async function postNewTable(newTable, signal) {
  const url = new URL(`${API_BASE_URL}/tables`);

  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({data: newTable}),
    signal
  };

  return await fetchJson(url, options, {});
};

//ADDS RESERVATION ID TO TABLE
export async function reserveTable(reservedTable, signal) {
  const url = new URL(`${API_BASE_URL}/tables/${reservedTable.table_id}/seat`)
  
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({data: {reservation_id: reservedTable.reservation_id}}),
    signal
  };

  return await fetchJson(url, options, {});
};

//REMOVES RESERVATION ID FROM TABLE
export async function freeUpTable(tableId, signal) {
  const url = new URL(`${API_BASE_URL}/tables/${tableId}/seat`);

  const options = {
    method: "DELETE",
    headers,
    signal
  };

  return await fetchJson(url, options, {});
};

//CHANGES RESERVATION STATUS
export async function updateReservationStatus(reservation_id, newStatus, signal) {
  const url = new URL(`${API_BASE_URL}/reservations/${reservation_id}/status`);

  const options = {
    method:"PUT",
    body: JSON.stringify({data: {status: newStatus}}),
    headers,
    signal
  };

  return await fetchJson(url, options, {});
};

//RETURNS SPECIFIC TABLE DATA
export async function readTable(table_id, signal) {
  const url = new URL(`${API_BASE_URL}/tables/${table_id}`);
  
  return await fetchJson(url, { headers, signal }, []);
};

//RETURNS LIST OF TABLES WHICH HAVE PHONE NUMBERS THAT MATCH INPUT
export async function findReservationByMobileNumber(mobile_number, signal) {
  const url = new URL(`${API_BASE_URL}/reservations?mobile_number=${mobile_number}`);

  return await fetchJson(url, { headers, signal }, [])
  .then(formatReservationDate)
  .then(formatReservationTime);
};

//EDITS RESERVATION
export async function updateReservation(updatedReservation, signal) {
  const url = new URL(`${API_BASE_URL}/reservations/${updatedReservation.reservation_id}/edit`);

  const options = {
    method: "PUT",
    headers,
    signal,
    body: JSON.stringify({data: updatedReservation})
  };

  return await fetchJson(url, options, []);
};

//CANCELS RESERVATION
export async function cancelReservation(reservation_id, signal) {
  const url = new URL(`${API_BASE_URL}/reservations/${reservation_id}/status`);

  const options = {
    method: "PUT",
    headers,
    signal,
    body: JSON.stringify({data: {status: "cancelled"}})
  };

  return await fetchJson(url, options, []);
};
