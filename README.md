<div align="center">
    <h3 align="center">Slow Analysis Tool</h3>
    <p align="center">
    A tool for teachers and students to create "slow reveal" projects based on existing data visualizations.
    </p>
</div>

## About The Project

[![Slow Analysis Screen Shot][product-screenshot]](https://web.eecs.umich.edu/~mjguz/slow-analysis/)

This tool is used to generate a "slow reveal" carousel for the analysis of charts and graphs. 

## Getting Started

First time setup:

1. If you are already using nvm (node version maanger)

Use the following command to set your node version

```bash
nvm use
```

If you aren't using nvm, you should, or you can install Node.js 16.5.0 from https://nodejs.org/en/. Just make sure you uninstall any existing node installations first.

2. Install required packages

All you have to do is run this command inside the project directory

```bash
npm install
```

That should be all the setup you need.

## Running the service

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Then, open your localhost at port 3000

http://localhost:3000/

##  Building the service

To build the service, run the following command:

```bash
npm run export
```

This will create a static version of the site in the `out` directory. You can then deploy this directory to the eecs server.

## Testing the service

To run the tests, run the following command:

```bash
npm run cypress
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


[project-screenshot]: images/screenshot.png