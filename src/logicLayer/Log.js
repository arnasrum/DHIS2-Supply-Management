export async function log(putItem, action) {
    /**
     * Logs data to the data store api
     * 
     * args:
     *     putItem: an object to be posted after being stringified by JSON
     *     action: the name of the file in which to be uppdated in the data store
     * 
     * throws:
     *     Error: an error describing a failed fetch
     */
    const postQuery = "http://localhost:9999/api/dataStore/IN5320-27/" + action;
    let response = await fetch(postQuery)
    response = await response.json()
    response = await fetch(postQuery, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(
            [
                ...response, 
                ...putItem,
            ]),
    })
}