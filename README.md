This project was bootstrapped with [DHIS2 Application Platform](https://github.com/dhis2/app-platform).

## Our app's functionality
This DHIS2 application provides functionalities such as:
- An overview of Life-Saving commodities data from our clinic
- Dispensing commodities (both single values and in bulk)
- Requesting commodities from nearby clinics
- Stock recount for adjustments in stock
- Replenishing commodities for when receiving monthly deliveries (store manager)

## How the app was implemented
Each component visible from the navigation bar is placed in it's own folder.  Each folder contains at least one '.js' file, and if necessary, a '.css' file. We decided to place components in separate folders with names representing the functionality. The main reason for this was to organize and structure our project, so we could easily identify which components belonged where. We also have a components folder for shared components, such as InputTable. InputTable is used in three of the components, so we found it natural to extract the component and make it reusable. 

Most of the API-calls for data fetching and mutation is abstracted by making functions in files that can be found inside the 'logicLayer' folder. There is an own file for data queries (API constants) and for API calls and mutations. These can be accessed by being imported in your '.js' files.

When we started the actual implementation, we decided to first make some sketches, so we all had a shared vision of the apps design and functionality. We divided the pages between us, and created a backlog to keep track of who was working on what, and what was to be done next. We focused on developing the front end first, followed by the logic. As we worked on the project and learned more about developing in React, we discovered better practices to follow in our implementation, such as increasing the focus on modularizing components that could be reused several places. 

## Missing functionality/implementations
The InputTable component is not working optimally when receiving inputs that are not numbers. If you enter a letter and press submit, the form resets, but nothing happens. If you insert a number, and then in a different column try to insert a letter, you are notified that the input is invalid, but if you press "Submit", the form resets again, and nothing happens. This is not ideal, and with more time, we would implement a solution for this.

We do also not have a depending request table. This was something that we wanted to implement, but sadly didn’t have time to do.

## Available Scripts

dhis portal script:

### `npx dhis-portal --target=https://data.research.dhis2.org/in5320`

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner and runs all available tests found in `/src`.<br />

See the section about [running tests](https://platform.dhis2.nu/#/scripts/test) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
A deployable `.zip` file can be found in `build/bundle`!

See the section about [building](https://platform.dhis2.nu/#/scripts/build) for more information.

### `yarn deploy`

Deploys the built app in the `build` folder to a running DHIS2 instance.<br />
This command will prompt you to enter a server URL as well as the username and password of a DHIS2 user with the App Management authority.<br/>
You must run `yarn build` before running `yarn deploy`.<br />

See the section about [deploying](https://platform.dhis2.nu/#/scripts/deploy) for more information.

## Learn More

You can learn more about the platform in the [DHIS2 Application Platform Documentation](https://platform.dhis2.nu/).

You can learn more about the runtime in the [DHIS2 Application Runtime Documentation](https://runtime.dhis2.nu/).

To learn React, check out the [React documentation](https://reactjs.org/).

