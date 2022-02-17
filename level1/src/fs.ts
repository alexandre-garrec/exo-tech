import fs from 'fs';
import { UserCart } from './interface/Cart';

export function writeFile(data: any) {
  fs.writeFileSync('output.json', JSON.stringify(data));
}
