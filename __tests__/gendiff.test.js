import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';
import * as fs from 'fs';
import genDiff from '../bin/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const mustBe = fs.readFileSync('./__fixtures__/mustBe.txt', 'utf-8');

test('compare 2 json files', () => {
  const pathToFile1 = getFixturePath('file1.json');
  const pathToFile2 = getFixturePath('file2.json');
  expect(genDiff(pathToFile1, pathToFile2))
    .toBe(mustBe);
});
test('compare 2 yaml files', () => {
  const pathToFile1 = getFixturePath('file1.yaml');
  const pathToFile2 = getFixturePath('file2.yaml');
  expect(genDiff(pathToFile1, pathToFile2))
    .toBe(mustBe);
});
