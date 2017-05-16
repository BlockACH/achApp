
class GlobalStore {
  constructor() {
    this.bank = 'TCH';
    this.port = 8514;
    this.explorerPort = 9999;
    this.model = 'settle';
  }

  getBaseUrl() {
    return `http://ach.csie.org:${this.port}/${this.model}/${this.bank}`;
  }

  getExplorerBaseUrl() {
    return `http://ach.csie.org:${this.explorerPort}`;
  }
}

const globalStore = new GlobalStore();
export default globalStore;
