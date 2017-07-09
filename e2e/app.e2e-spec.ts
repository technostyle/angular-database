import { TaskPage } from './app.po';

describe('task App', () => {
  let page: TaskPage;

  beforeEach(() => {
    page = new TaskPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
