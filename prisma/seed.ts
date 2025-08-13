import { PrismaClient } from '../app/generated/prisma'
import fs from 'fs';

const prisma = new PrismaClient()

const parsedLibraries = JSON.parse(fs.readFileSync('./data/CPL.json', 'utf-8'));

const libraries = parsedLibraries.map((lib: any) => {
  const [latitude, longitude] = lib.LOCATION
  .replace(/[()]/g, '') // remove parentheses
  .split(',')
  .map((coord: string) => parseFloat(coord.trim()));

  return {
    name: "CPL - " + lib.BRANCH,
    description: "Chicago Public Library",
    link: lib.WEBSITE,
    placeType: 'library',
    lat: latitude,
    lng: longitude
  }
});

async function main() {
    for (const l of libraries) {
      console.log('Seeding location:', l.name);
      console.log(JSON.stringify(l, null, 2));
        await prisma.place.create({
            data: l
        })
        console.log(l);
    }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })