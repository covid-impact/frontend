const {Builder,By,Key,util} = require("selenium-webdriver");
const webdriver = require("selenium-webdriver");
const firefox = require('selenium-webdriver/firefox');
const options = new firefox.Options();

const localhost = "http://localhost:5000";
options.setPreference("security.sandbox.content.level", 5);
//timeout 20s
jest.setTimeout(20000);
let driver = new webdriver.Builder().forBrowser("firefox").setFirefoxOptions(options).build();

beforeAll(async () => {
  await driver.get(localhost);
})
afterAll(async () => {
  driver.quit();
})

describe("Test webpage with firefox", () =>{
  describe("Check webpage title", () =>{
    it ("check title is covidf",async ()=>{
      var title = await driver.getTitle();
      expect(title).toEqual("covidf");
    })
  });
  describe("Check covidHome page", () =>{

    it ("search with US as keyword in covidHome page",async ()=>{
      await driver.findElement(By.className("searchbar--input")).sendKeys("US",Key.RETURN);
      driver.findElement(By.className("heading")).getText().then(textValue =>{
        expect(textValue).toEqual("Australia");
      });
    });

  });

  describe("Check covidWorld page", () =>{
    it ("check url correct",async ()=>{
      await driver.findElement(By.name("covidWorldMenu")).click();
      let currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).toEqual(localhost+"/world");
    });

  });

  describe("Check covidCity page", () =>{
    it ("check url correct",async ()=>{
      await driver.findElement(By.name("covidCityMenu")).click();
      let currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).toEqual(localhost+"/city");
    });

  });

  describe("Check finance page", () =>{
    it ("check url correct",async ()=>{
      await driver.findElement(By.name("financeMenu")).click();
      let currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).toEqual(localhost+"/finance");
    });

  });

  describe("Check financeWorld page", () =>{
    it ("check url correct",async ()=>{
      await driver.findElement(By.name("financeWorldMenu")).click();
      let currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).toEqual(localhost+"/finance/world");
    });

  });

  describe("Check financeCity page", () =>{
    it ("check url correct",async ()=>{
      await driver.findElement(By.name("financeCityMenu")).click();
      let currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).toEqual(localhost+"/finance/city");
    });
    it ("stores stock company over different pages", async ()=>{
      //search
      await driver.findElement(By.className("searchbar--input")).sendKeys("ACTIAM",Key.RETURN);
      //switch page
      await driver.findElement(By.name("financeWorldMenu")).click();
      //see if its still the same stock company
      driver.findElement(By.className("heading")).getText().then(textValue =>{
        expect(textValue.include("ACTIAM")===true).toBeTruthy();
      });
    });
  });
})
