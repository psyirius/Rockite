export default defineBackground(() => {
  browser.action.onClicked.addListener(() => {
    browser.tabs.create({
      // @ts-ignore
      url: browser.runtime.getURL('app.html')
    });
  });
});
