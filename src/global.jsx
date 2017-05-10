
class GlobalStore {
  constructor() {
    this.bank = 'TCH';
    this.port = 8514;
    this.model = 'settle';
  }

  getBaseUrl() {
    return `http://ach.csie.org:${this.port}/${this.model}/${this.bank}`;
  }
}

const globalStore = new GlobalStore();
export default globalStore;
