import { PrismaClient } from '../app/generated/prisma'
import fs from 'fs';

const prisma = new PrismaClient()

const parsedPlaces = JSON.parse(fs.readFileSync('./data/locations.geojson', 'utf-8'));
const parsedLibraries = JSON.parse(fs.readFileSync('./data/CPL.json', 'utf-8'));


const places = parsedPlaces.features.map((feature: any) => {
    const [longitude, latitude] = feature.geometry.coordinates;

    return {
        name: feature.properties.Name,
        lat: latitude,
        lng: longitude,
        placeType: 'cafe'
    }
});

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

const combinedPlaces = [...places, ...libraries]

async function main() {
    for (const l of combinedPlaces) {
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