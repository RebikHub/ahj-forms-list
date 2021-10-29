import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(10000);

describe('input products', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 250,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  describe('valid input', () => {
    test('should add error-title', async () => {
      await page.goto(baseUrl);
      await page.click('.add-product');
      await page.type('.input-text', '');
      await page.click('.btn-save');
      await page.waitForSelector('.error-title');
    });
    test('should add error-price', async () => {
      await page.goto(baseUrl);
      await page.click('.add-product');
      await page.type('.input-number', '');
      await page.click('.btn-save');
      await page.waitForSelector('.error-price');
    });
  });
});
