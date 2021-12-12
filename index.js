const puppeteer = require("puppeteer-core");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://typing-speed-test.aoeu.eu/");
  await page.waitForSelector(".nextword");

  const words = await page.evaluate(() => {
    const wordElements = document.querySelectorAll(".nextword");
    const wordList = [document.querySelector(".currentword").innerText];
    console.log(wordList);
    wordElements.forEach((word) => {
      wordList.push(word.innerText);
    });
    console.log(words);
    return wordList;
  });
  for (let i = 1; i < words.length; i++) { 
    await page.type("#input", words[i]);
    //press space 
    await page.keyboard.press(String.fromCharCode(32));
  }
})();
