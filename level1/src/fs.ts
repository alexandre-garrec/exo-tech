import fs from 'fs';
import { UserCart } from './interface/Cart';

export function writeFile(data: Array<UserCart>) {
  fs.writeFileSync('output.json', JSON.stringify(data));
}
