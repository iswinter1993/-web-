import puppeteer from "puppeteer";
import path from "path";
import findChrome from "carlo/lib/find_chrome.js";


//自动创建账号

const main =async (num) => {

console.log(num)
  // 用户配置地址 建议新建空文件夹使用,若想使用本利chrome默认配置也建议复制一份出来引用新地址
  const user_data_dir = path.join(process.cwd(), "/User Data");
  // 小狐狸插件的地址,puppeteer需要指定每个需要引用的扩展本地路径,多个扩展用逗号分隔 `--load-extension=${MetaMask},${其他扩展}`  `--disable-extensions-except=${MetaMask},${其他扩展}`
  const MetaMask = path.join(
    process.cwd(),
    "../AppData/Local/Google/Chrome/User Data/Default/Extensions/nkbihfbeogaeaoehlefnkodbefgpgknn/10.14.6_0"
  );
  const chromePath = await findChrome({})
  const options = {
    //headless为true时，客户端不会打开，使用无头模式；为false时，可打开浏览器界面
    headless: false,
    defaultViewport: null,
    ignoreDefaultArgs: ["--enable-automation"],
    args: [
      "--no-sandbox",
      `--user-data-dir=${user_data_dir}`,
      `--disable-extensions-except=${MetaMask}`,
      `--load-extension=${MetaMask}`,
    ],
    executablePath:chromePath.executablePath, // 本地chrome路径
  };
  console.log('启动chrome...')
  // 启动chrome
  const browser = await puppeteer.launch(options);
  console.log('打开新页面...')
  // 打开新页面
  const metaMaskPage = await browser.newPage()
  // 跳转小狐狸钱包 路径参考小伟哥文章内如何通过页面打开扩展呈现
  console.log('跳转小狐狸...')
  await metaMaskPage.goto('chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html')
  // 登录小狐狸
  console.log('登录小狐狸...')
  //button btn--rounded btn-primary first-time-flow__button
  await metaMaskPage.waitForSelector(".MuiInputBase-input")
  await metaMaskPage.type('input[id=password]', 'as1df1gh', {delay: 20});
  await metaMaskPage.click('.button')
  await sleep(1000)
  // 点击账户
  console.log('点击账户...')
  let elem = await metaMaskPage.waitForSelector("*[class='account-menu__icon']", {
      visible: true,
  });
  await elem.click();
  await sleep(1000)
  // 点击创建账户
  console.log('点击创建账户...')
  elem = await metaMaskPage.waitForXPath("//div[contains(text(), '创建账户')]",{
          visible: true,
  });
  await elem.click();
  await sleep(1000)
  // 输入新的账户名称
  let input = await metaMaskPage.waitForSelector("*[class='new-account-create-form__input']",{
      visible: true,
    });
    let name = 369 * (num + 1)
    let random = Math.random() * 100
    console.log('输入新的账户名称...',`han${name}${random}`)
  await input.type(`han${name}${random}`, {delay: 20});
  // 点击创建按钮
  console.log('点击创建按钮...')
  elem = await metaMaskPage.waitForXPath("//button[contains(text(), '创建')]",{
          visible: true,
  });
  await elem.click();
  await sleep(1000)
  elem = await metaMaskPage.waitForXPath("//img[@class='identicon identicon__image-border']",{
          visible: true,
  });
  await elem.click()
  console.log('创建成功...')
  await sleep(3000)
  // 到这就创建成功了,需要创建多个写个循环就ok
  await browser.close()
};
const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
// main(1)
const getAccount =async (num) => {
    console.log('循环',num,'次')
    for (let index = 0; index < num; index++) {
       await main(index)
    }
}
getAccount(3)
