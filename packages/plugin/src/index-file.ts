import { TypescriptFile } from "@protobuf-ts/plugin-framework";

export class IndexFile extends TypescriptFile {
  constructor(filename: string) {
    super(filename)
  }

  getHeader(): string {
    return "/* eslint-disable */\n"
  }

  getContent(): string {
    return this.getHeader() + super.getContent()
  }
}