const signale = require('signale');
const puppeteer = require('puppeteer');
const qoa = require('qoa');

const isValidURL = (str) => (
	str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g) !== null
);

const prompt = async () => {
	let input = await qoa.input({
		query: 'Target URL:',
		handle: 'url'
	});
	if (isValidURL(input.url)) {
			return input;
	}
	return await prompt();
}
  
prompt().then(async ({ url }) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	
	signale.pending('Fetching data...');

	await page.goto(url);
	await page
		.screenshot({ path: 'screenshots/example.png' })
		.then(() => {
			signale.success('Operation successful');
		});

	await browser.close();
});