const {Builder,By,Key,util} = require("selenium-webdriver");
const firefox = require('selenium-webdriver/firefox');
const options = new firefox.Options();

options.setPreference("security.sandbox.content.level", 5);
async function example()
{
let driver = await new Builder.forBrowser("firefox").build();
await driver.get("http://google.com");
await driver.findElement(By.name("q").sendKeys("Selenium",Key.RETURN));
}
describe("Test open", () =>{
  /*
  it ("run example",async ()=>{
    example();
  });
  */
  it ("search with US as keyword",async ()=>{
    //timeout 20s
    jest.setTimeout(20000);
    let driver = await new Builder().forBrowser("firefox").setFirefoxOptions(options).build();
    await driver.get("http://localhost:5000");
    /*
    driver.wait(function(){
      util(titleIs("covidf"));
    },10000);
    */
    var title = await driver.getTitle();
    expect(title).toEqual("covidf");
    await driver.findElement(By.className("searchbar--input")).sendKeys("US",Key.RETURN);
    driver.findElement(By.className("heading")).getText().then(textValue =>{
      assert.equal('Australia', textValue);
    });
    driver.quit();
  });
})
