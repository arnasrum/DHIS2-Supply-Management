This project was bootstrapped with [DHIS2 Application Platform](https://github.com/dhis2/app-platform).

## Our app's functionality
This DHIS2 application provides functionalities such as
- An overview of the data about commodity stock
- Dispensing commodities (both singular and bulk)
- Requesting commodities from other clinics
- Stock recountinging for adjustments in stock
- Replenishing commodities for bigger adjustments

## How the app was implemented
Every programme from the navigation bar is placed in it's own folder. Each folder contains at least one `.js` file, in some special cases also a `.css`. 

Most of the API-calls for data fetching and mutation is abstracted by making functions in files that can be found inside the `logicLayer` folder. These can be accessed by beying imported in your `.js` files.

Frequently used JSX components have also been placed in `components` folder and can be reused.

## Missing and not working stuff
==Kanskje kan bli skrevet rett før vi leverer inn.
Da har vi oversikten over hva vi mangler og hva som ikke fungerer.==

## Available Scripts

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


dhis portal script:

### `npx dhis-portal --target=https://data.research.dhis2.org/in5320`
