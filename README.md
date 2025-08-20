This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Installing Dependencies

First, before we do anything, we need to make sure we have all the packages installed. Navigate to the project in your
favorite IDE, open the terminal, and run the following command:
```bash
npm install
```

This should install all the required packages.


### Environment Files

Next, make sure you have the proper environment files. They should be called .env.local and .env. 

You don't need to change anything in here. Put them in the main project/parent directory.

### Finishing Database Setup

Before we can run the project, we need to finish the last bit of database setup. Run the following command:


```bash
npx prisma generate
```

Once this completes, we can run the project.

### Running the Project

Finally, we can run the project using one of the following commands:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then, we can access it via your browser. Go to the URL bar, and type
"localhost:3000"

You should now see the map. If you don't, it means there was an error during setup. Do not hesistate to reach out if you
have any problems.

## Next.js Documentation

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!


