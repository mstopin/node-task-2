import { readFile, writeFile } from 'fs/promises';

export abstract class FileDatabaseRepository<T> {
  private readonly PATH: string;

  constructor() {
    const path = process.env['FILE_DATABASE_PATH'];
    if (!path) {
      throw new Error('File database path not specified');
    }

    this.PATH = path;
  }

  protected async readData(): Promise<T> {
    const fileContent = await readFile(this.PATH);

    return JSON.parse(fileContent.toString()) as T;
  }

  protected async saveData(data: T): Promise<void> {
    const fileContent = JSON.stringify(data);

    await writeFile(this.PATH, fileContent);
  }
}
