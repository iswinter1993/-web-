import puppeteer from "puppeteer";
import path from "path";
import findChrome from "carlo/lib/find_chrome.js";

// 打开本地node安装的浏览器

const main =async () => {
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
    ignoreDefaultArgs: ['--disable-extensions'],
    args: [
      "--no-sandbox",
      `--user-data-dir=${user_data_dir}`,
      `--disable-extensions-except=${MetaMask}`,
    //   `--load-extension=${MetaMask}`,
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
 
};
const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
main()