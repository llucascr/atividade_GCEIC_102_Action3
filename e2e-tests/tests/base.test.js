const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { tiraFoto, waitVisible, clearAndType, pause } = require('./exg/utils');
const runExgTests = require('./exg');

const BASE_URL = process.env.APP_URL || 'http://localhost:3000';

async function main() {
  const opts = new chrome.Options();
  opts.addArguments(
    '--headless=new',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--window-size=1280,800',
    '--disable-gpu'
  );

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(opts)
    .build();
  await driver.manage().setTimeouts({ implicit: 5000, pageLoad: 15000 });

  try {
    // === Cenário 1: login com erro ===
    await driver.get(BASE_URL + '/login');
    await tiraFoto(driver, 'Pagina Entrada');

    await driver.findElement(By.id('username')).sendKeys('Adm');
    await driver.findElement(By.id('password')).sendKeys('admin');
    await tiraFoto(driver, 'Valores Digitados');

    await driver.findElement(By.id('loginForm')).submit();
    await pause(800);
    await tiraFoto(driver, 'Submit form com erro');

    const errMsg = await driver.findElement(By.css('.erro')).getText();
    if (!errMsg.includes('invalidos')) throw new Error(`Falhou : ${errMsg}`);

    // === Cenário 2: login válido + EXG ===
    await clearAndType(driver, By, 'username', 'usuario1');
    await clearAndType(driver, By, 'password', '1234');
    await driver.findElement(By.id('loginForm')).submit();

    await waitVisible(driver, By, until, By.id('nav-dashboard'), 10000);
    await tiraFoto(driver, 'Login OK');

    await runExgTests({ driver, By, until, tiraFoto });
  } finally {
    if (driver) await driver.quit();
  }
}

main().catch(err => {
  console.error('Erro fatal', err);
  process.exit(1);
});
