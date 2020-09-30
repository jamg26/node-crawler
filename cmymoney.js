const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: false }); // default is true
  const page = await browser.newPage();
  await page.goto('https://cmymoney.xyz/');
  await page.type('#username', 'jamg');
  await page.type('#password', 'jamuel26');
  await page.evaluate(() => dologin());
  await page.waitFor(3000);
  await page.evaluate(() => doarea(2));
  await page.waitFor(3000);
  let num1, num2, num3;

  let jam = true;

  while (jam) {
    try {
      const cimg1 = await page.evaluate(
        () => document.querySelector('#cimg1').innerHTML
      );

      const cimg2 = await page.evaluate(
        () => document.querySelector('#cimg2').innerHTML
      );

      const cimg3 = await page.evaluate(
        () => document.querySelector('#cimg3').innerHTML
      );

      for (x = 1; x <= 9; x++) {
        if (cimg1.includes(`${x}.png`)) num1 = x;
      }

      for (x = 1; x <= 9; x++) {
        if (cimg2.includes(`${x}.png`)) num2 = x;
      }

      for (x = 1; x <= 9; x++) {
        if (cimg3.includes(`${x}.png`)) num3 = x;
      }

      console.log(num1, num2, num3);

      await page.keyboard.type(`${num1}${num2}${num3}`);

      await page.evaluate(() => dosub());
    } catch (error) {
      await page.goBack();
      await page.reload();
    }
  }

  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();
