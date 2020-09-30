const puppeteer = require('puppeteer');

module.exports = {
  createAccount: async (user, pass) => {
    const browser = await puppeteer.launch({ headless: true }); // default is true

    const page = await browser.newPage();
    await page.goto(
      'https://sshstores.net/create-account-server-ssl-2/Singapore'
    );

    await page.waitForSelector('input[name="username"]');

    const code = await page.evaluate(
      () => document.getElementsByName('code')[0].value
    );

    await page.type('input[name="username"]', user);
    await page.type('input[name="password"]', pass);
    await page.type('input[name="inputcode"]', code);
    await page.keyboard.press('Enter');
    await page.waitFor(2000);

    const response = await page.evaluate(
      () => document.querySelector('.alert').textContent
    );
    let result = '';
    if (response.includes('Success')) {
      const res = await page.evaluate(
        () => document.querySelector('.tag-box').textContent
      );
      result = res;
    } else {
      result = response;
    }
    await browser.close();
    return result;
  }
};
