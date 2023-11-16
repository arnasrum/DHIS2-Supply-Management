export async function log(putItem, action) {
    const postQuery = "http://localhost:9999/api/dataStore/IN5320-27/" + action;
    // Tech debt pls no judge...
    let errorVariable;
    await fetch(postQuery)
        .then(response => response.json())
        .then(response => {
            fetch(postQuery, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(
                    [
                        ...response, 
                        putItem,
                    ]),
            })
        })
        .then(() => {throw new Error("test")})
        .catch((error) => {
            errorVariable = error;
        });
    return errorVariable;
}