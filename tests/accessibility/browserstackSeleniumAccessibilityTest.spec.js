const {Builder,By,Key,util} = require("selenium-webdriver");
const webdriver = require("selenium-webdriver");
const firefox = require('selenium-webdriver/firefox');
import browserstackConfig from "./browserstackConfig.js";
//temp test
/*
var USERNAME = "chongho1";
var AUTOMATE_KEY = "BFWrzUvVB6a4RmYnxcBq";
var browserstackURL = 'https://' + USERNAME + ':' + AUTOMATE_KEY + '@hub-cloud.browserstack.com/wd/hub';
*/
const url = "https://covidf.netlify.app/";

//timeout 20s
jest.setTimeout(20000);
let driver;

async function checktitle()
{
  var title = await driver.getTitle();
  expect(title).toEqual("COVID Finance");
}
let browserstackURL=browserstackConfig.browserstackURL;

describe("Test accessibility Test", () =>{

  afterAll(async () => {
    driver.quit();
  });

  describe("win10 chrome ", () =>{
    it ("check title is covidf",async ()=>{
      var capabilities = {
        'os' : 'Windows',
        'os_version' : '10',
        'browserName' : 'Chrome',
        'browser_version' : '80',
        'name' : "covidf win10 chrome accessibility Test"
      }
      driver = new webdriver.Builder().usingServer(browserstackURL).withCapabilities(capabilities).build();
      driver.get(url).then(async()=>{
        await checktitle();
      });
    });
  });

  describe("android ", () =>{
    it ("check title is covidf",async ()=>{
      var capabilities = {
        'browserName': 'android',
        'device': 'Samsung Galaxy Note 10',
        'realMobile': 'true',
        'os_version': '9.0',
        'name' : "android9.0 Test"
      }
      driver = new webdriver.Builder().
                      usingServer(browserstackURL).
                      withCapabilities(capabilities).
                      build();
      driver.get(url).then(async()=>{
        await checktitle();
      });
    });
  });

  describe("ios ", () =>{
    it ("check title is covidf",async ()=>{
      var capabilities = {
        'browserName': 'iPhone',
        'device': 'iPhone XS',
        'realMobile': 'true',
        'os_version': '13',
        'name' : "ios13 Test"
      }
      driver = new webdriver.Builder().
                      usingServer(browserstackURL).
                      withCapabilities(capabilities).
                      build();
      driver.get(url).then(async()=>{
        await checktitle();
      });
    });
  });

  describe("MacOS Chrome ", () =>{
    it ("check title is covidf",async ()=>{
      var capabilities = {
        'os' : 'OS X',
        'os_version' : 'Catalina',
        'browserName' : 'Chrome',
        'browser_version' : '80',
        'name' : "MacOS Catalina Chrome Test"
      }
      driver = new webdriver.Builder().
                      usingServer(browserstackURL).
                      withCapabilities(capabilities).
                      build();
      driver.get(url).then(async()=>{
        await checktitle();
      });
    });
  });

  describe("MacOS Firefox ", () =>{
    it ("check title is covidf",async ()=>{
      var capabilities = {
        'os' : 'OS X',
        'os_version' : 'Catalina',
        'browserName' : 'Firefox',
        'browser_version' : '70',
        'name' : "MacOS Catalina Firefox Test"
      }
      driver = new webdriver.Builder().
                      usingServer(browserstackURL).
                      withCapabilities(capabilities).
                      build();
      driver.get(url).then(async()=>{
        await checktitle();
      });
    });
  });

  describe("MacOS Safari ", () =>{
    it ("check title is covidf",async ()=>{
      var capabilities = {
        'os' : 'OS X',
        'os_version' : 'Catalina',
        'browserName' : 'Safari',
        'browser_version' : '13.1',
        'name' : "MacOS Catalina Safari Test"
      }
      driver = new webdriver.Builder().
                      usingServer(browserstackURL).
                      withCapabilities(capabilities).
                      build();
      driver.get(url).then(async()=>{
        await checktitle();
      });
    });
  });

  describe("win10 Edge ", () =>{
    it ("check title is covidf",async ()=>{
      var capabilities = {
        'os' : 'Windows',
        'os_version' : '10',
        'browserName' : 'Edge',
        'browser_version' : '80',
        'name' : "win10 Edge Test"
      }
      driver = new webdriver.Builder().
                      usingServer(browserstackURL).
                      withCapabilities(capabilities).
                      build();
      driver.get(url).then(async()=>{
        await checktitle();
      });
    });
  });

  describe("win10 Firefox ", () =>{
    it ("check title is covidf",async ()=>{
      var capabilities = {
        'os' : 'Windows',
        'os_version' : '10',
        'browserName' : 'Firefox',
        'browser_version' : '70',
        'name' : "win10 Firefox Test"
      }
      driver = new webdriver.Builder().
                      usingServer(browserstackURL).
                      withCapabilities(capabilities).
                      build();
      driver.get(url).then(async()=>{
        await checktitle();
      });
    });
  });


});
